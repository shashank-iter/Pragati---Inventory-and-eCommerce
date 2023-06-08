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
import { uid } from "uid";
import PayButton from "@/layouts/payButton";

export default function BuyProduct({ product: productData }) {
  // console.log(productData);

  async function fetchButtonid() {
    let { data, error } = await supabase
      .from("profiles")
      .select("profileData")
      .ilike("email", `%${Cookies.get("key")}%`);

    Cookies.set("buttonid", data[0].profileData.razorpayButtonId);
  }

  useEffect(() => {
    fetchButtonid();
  }, []);
  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);

  const [formData, setFormData] = useState({
    orderName: productData.productName,
    orderId: uid(6),
    orderValue: productData.sellingPrice,
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    customerEmail: "",
  });

  /**
   * The function resets the form data by setting all input fields to empty strings.
   */
  const resetFormData = () => {
    setFormData({
      orderName: "",
      orderId: "",
      orderValue: "",
      customerName: "",
      customerAddress: "",
      customerPhone: "",
      customerEmail: "",
    });
  };

  const datatobesent = {
    orderName: formData.orderName,
    orderId: formData.orderId,
    orderValue: formData.orderValue,
    customerName: formData.customerName,
    customerAddress: formData.customerAddress,
    customerPhone: formData.customerPhone,
    customerEmail: formData.customerEmail,
  };
  /**
   * This function updates a product's information in a Supabase database.
   */
  const handlePay = async (id, updatedData) => {
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
      const { data, error } = await supabase
        .from("customer_orders")
        .insert([{ orderData: datatobesent, shopID: Cookies.get("key") }]);
      if (error) throw error;
      else {
        swal({
          title: "Order Received! Proceed to Payment",
          text: "Your order has been received. Please proceed to payment.",
          icon: "success",
          button: "OK",
        });
      }

      // Reset the form data after the alert
    } catch (error) {
      swal({
        title: "Error! Order not received.",
        text: "There was some error in placing your order. Please try again or contact support. Please do not proceed to payment.",
        icon: "error",
        button: "OK",
      });
    } finally {
      handleOpen(null);
    }
  };

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
                  readOnly
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
                  readOnly
                />
              </div>
              <Input
                type="number"
                name="orderValue"
                label="Order Value"
                value={formData.orderValue}
                readOnly
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
                  type="number"
                  maxLength={16}
                  name="customerPhone"
                  label="Customer Phone (include country code))"
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
          <div className=" inline px-5 py-2">
            {" "}
            <PayButton />
          </div>
          <PayButton />
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
