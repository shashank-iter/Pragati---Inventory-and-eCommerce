import { Fragment, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import supabase from "@/pages/auth/supabaseClient";
import Cookies from "js-cookie";
import swal from "sweetalert";

export default function BuyProduct({ product: productData }) {
  // console.log(productData);

  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);

  const [formData, setFormData] = useState({
    orderName: productData.productName,
    orderId: "",
    orderValue: "",
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    customerEmail: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  // const dataToBeSent = {
  //   productName: formData.productName,
  //   productType: productType,
  //   taxType: taxType,
  //   cgst: cgst,
  //   sgst: sgst,
  //   vendor: vendor,
  //   dimensions: formData.dimensions,
  //   manufacturer: formData.manufacturer,
  //   ean: formData.ean,
  //   mpn: formData.mpn,
  //   brand: formData.brand,
  //   isbn: formData.isbn,
  //   weight: formData.weight,
  //   upc: formData.upc,
  //   sellingPrice: formData.sellingPrice,
  //   description: formData.description,
  //   costPrice: formData.costPrice,
  //   openingStock: formData.openingStock,
  //   reorderPoint: formData.reorderPoint,
  //   image_id: path,
  // };

  /**
   * The function resets the form data by setting all input fields to empty strings.
   */
  const resetFormData = () => {
    setFormData({
      orderName: productData.productName,
      orderId: "",
      orderValue: "",
      customerName: "",
      customerAddress: "",
      customerPhone: "",
      customerEmail: "",
    });
  };

  /**
   * This function updates a product's information in a Supabase database.
   */
  const handleUpdate = async (id, updatedData) => {
    const { data, error } = await supabase
      .from("product_table")
      .update({ product_info: updatedData })
      .eq("id", id);

    if (error) {
      console.log("Error updating product:", error.message);
    } else {
      console.log("Product updated successfully:", data);
    }
  };

  /**
   * This function handles the submission of a form, displays a success or error message using the
   * SweetAlert library, and resets the form data.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // handleUpdate(rowId, dataToBeSent);

      swal({
        title: "Product Updated!",
        text: "Product info has been edited successfully!",
        icon: "success",
        button: "OK",
      });

      resetFormData(); // Reset the form data after the alert
    } catch (error) {
      swal({
        title: "Error!",
        text: "There was some error in adding the product. Please try again or contact support.",
        icon: "error",
        button: "OK",
      });
    } finally {
      handleOpen(null);
    }
  };

  async function uploadImage(e) {
    let file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    let { data, error } = await supabase.storage
      .from("productImage")
      .upload(Cookies.get("uid") + "/" + filePath, file);
    if (error) {
      swal(
        "There was some error in uploading the image. Please try again or contact support."
      );
    }
    setPath(data.path);
  }

  // handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Fragment>
      <div className="flex gap-3">
        {/* Buy button that opens the dialog  */}
        <Button
          onClick={() => {
            console.log();
            handleOpen("xxl");
          }}
          variant="gradient"
          color="blue"
          size="sm"
        >
          Buy
        </Button>
      </div>

      <Dialog open={size === "xxl"} size={size || "xxl"} handler={handleOpen}>
        <DialogHeader>Purchase Product</DialogHeader>
        <DialogBody divider className=" overflow-y-scroll ">
          <form className="my-2 w-full  md:mx-10  ">
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Product Information
            </Typography>
            {/* Order information fields */}
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Input
                  className=""
                  size="md"
                  label="Order Name"
                  name="orderName"
                  disabled
                  value={formData.orderName}
                  onChange={handleInputChange}
                />
              </div>
              <div className=" mb-2 flex flex-col gap-4 md:w-1/2">
                <Input
                  type="text"
                  name="orderId"
                  label="Order ID"
                  value={formData.orderId}
                  onChange={handleInputChange}
                />
              </div>
              <Input
                type="number"
                name="orderValue"
                label="Order Value"
                value={formData.orderValue}
                onChange={handleInputChange}
              />
            </div>

            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              User Information
            </Typography>
            {/* User information fields */}
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                {" "}
                <Input
                  type="text"
                  name="customerName"
                  label="Customer Name"
                  value={formData.customerName}
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  name="customerAddress"
                  label="Customer Address"
                  value={formData.customerAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div className=" mb-2 flex flex-col gap-4 md:w-1/2">
                {" "}
                <Input
                  type="tel"
                  name="customerPhone"
                  label="Customer Phone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                />
                <Input
                  type="email"
                  name="customerEmail"
                  label="Customer Email"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
