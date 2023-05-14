import { Fragment, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import supabase from "@/pages/auth/supabaseClient";
import Cookies from "js-cookie";
import swal from "sweetalert";

export default function AddProduct() {
  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);

  const [formData, setFormData] = useState({
    productName: "",

    // productType: "",
    // taxType: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const [productType, setProductType] = useState(null);
  const [taxType, setTaxType] = useState(null);
  const [cgst, setCgst] = useState(null);
  const [sgst, setSgst] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [path, setPath] = useState(null);

  const dataToBeSent = {
    productName: formData.productName,
    productType: productType,
    taxType: taxType,
    cgst: cgst,
    sgst: sgst,
    vendor: vendor,
    dimensions: formData.dimensions,
    manufacturer: formData.manufacturer,
    ean: formData.ean,
    mpn: formData.mpn,
    brand: formData.brand,
    isbn: formData.isbn,
    weight: formData.weight,
    upc: formData.upc,
    sellingPrice: formData.sellingPrice,
    description: formData.description,
    costPrice: formData.costPrice,
    openingStock: formData.openingStock,
    reorderPoint: formData.reorderPoint,
    image_id: path,
  };

  const handleSelectChange = (name, value) => {
    console.log(name, value);
    switch (name) {
      case "productType":
        setProductType(value);
        break;
      case "taxType":
        setTaxType(value);
        break;
      case "cgst":
        setCgst(value);
        break;
      case "sgst":
        setSgst(value);
        break;
      case "vendor":
        setVendor(value);
        break;
      default:
        break;
    }
  };

  /**
   * The function resets the form data by setting all input fields to empty strings.
   */
  const resetFormData = () => {
    setFormData({
      productName: "",
      productType: "",
      taxType: "",
      cgst: "",
      sgst: "",
      vendor: "",
      dimensions: "",
      manufacturer: "",
      ean: "",
      mpn: "",
      brand: "",
      isbn: "",
      weight: "",
      upc: "",
      sellingPrice: "",
      description: "",
      costPrice: "",
      openingStock: "",
      reorderPoint: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from("product_table").insert([
        {
          email: Cookies.get("email"),
          product_info: dataToBeSent,
          user_id: Cookies.get("uid"),
        },
      ]);
      swal({
        title: "Product Added!",
        text: "Product has been added successfully!",
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

  return (
    <Fragment>
      <div className="flex gap-3">
        <Button
          onClick={() => handleOpen("xxl")}
          variant="gradient"
          color="white"
          className="bg-white text-sm sm:text-base"
        >
          Add Product +
        </Button>
      </div>
      <Dialog open={size === "xxl"} size={size || "xxl"} handler={handleOpen}>
        <DialogHeader>Add a new product</DialogHeader>
        <DialogBody divider className=" overflow-y-scroll ">
          <form className="my-2 w-full  md:mx-10  ">
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Product Information
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Input
                  className=""
                  size="md"
                  label="Product Name"
                  name="productName"
                  onChange={handleChange}
                />
                <Input
                  className="cursor-pointer"
                  size="md"
                  label="Upload Product Image"
                  type="file"
                  icon={<ArrowUpTrayIcon />}
                  onChange={uploadImage}
                />
              </div>
              <div className=" mb-2 flex flex-col gap-4 md:w-1/2">
                <Select
                  label="Choose Product Type"
                  className="flex-col"
                  value={productType}
                  name="productType"
                  onChange={(value) => handleSelectChange("productType", value)}
                >
                  <Option value="goods">Goods</Option>
                  <Option value="service">Service</Option>
                </Select>

                <Select
                  label="Choose Tax Type"
                  className="flex-col"
                  value={taxType}
                  name="taxType"
                  onChange={(value) => handleSelectChange("taxType", value)}
                >
                  <Option value="taxable">Taxable</Option>
                  <Option value="nonTaxable">Non-Taxable</Option>
                </Select>
              </div>
            </div>
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Tax Rates
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Select
                  value={cgst}
                  label="CGST"
                  className="flex-col"
                  name="cgst"
                  disabled={taxType === "nonTaxable"}
                  onChange={(value) => handleSelectChange("cgst", value)}
                >
                  <Option defaultChecked value="5">
                    5%
                  </Option>
                  <Option value="12">12%</Option>
                  <Option value="18">18%</Option>
                  <Option value="28">28%</Option>
                </Select>
              </div>
              <div className=" mb-2 flex flex-col gap-4 md:w-1/2">
                <Select
                  value={sgst}
                  label="SGST"
                  className="flex-col"
                  name="sgst"
                  onChange={(value) => handleSelectChange("sgst", value)}
                  disabled={taxType === "nonTaxable"}
                >
                  <Option defaultChecked value="5">
                    5%
                  </Option>
                  <Option value="12">12%</Option>
                  <Option value="18">18%</Option>
                  <Option value="28">28%</Option>
                </Select>
              </div>
            </div>
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Additional Information
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Input
                  className=""
                  size="md"
                  label="Dimensions (LxBxH)"
                  name="dimensions"
                  disabled={productType === "service"}
                  onChange={handleChange}
                />
                <Input
                  className=""
                  size="md"
                  label="Manufacturer"
                  name="manufacturer"
                  disabled={productType === "service"}
                  onChange={handleChange}
                />
                <Input
                  className=""
                  size="md"
                  label="EAN"
                  name="ean"
                  disabled={productType === "service"}
                  onChange={handleChange}
                />
                <Input
                  className=""
                  size="md"
                  label="MPN"
                  name="mpn"
                  disabled={productType === "service"}
                  onChange={handleChange}
                />
              </div>
              <div className=" mb-2 flex flex-col gap-4 md:w-1/2">
                <Input
                  className=""
                  size="md"
                  label="Brand"
                  name="brand"
                  onChange={handleChange}
                />
                <Input
                  className=""
                  size="md"
                  label="ISBN"
                  name="isbn"
                  disabled={productType === "service"}
                  onChange={handleChange}
                />
                <Input
                  className=""
                  size="md"
                  label="Weight"
                  name="weight"
                  disabled={productType === "service"}
                  onChange={handleChange}
                />
                <Input
                  className=""
                  size="md"
                  label="UPC"
                  name="upc"
                  disabled={productType === "service"}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Sales Information
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Input
                  className=""
                  size="md"
                  label="Selling Price"
                  name="sellingPrice"
                  onChange={handleChange}
                />
                <Input
                  className=""
                  size="md"
                  label="Description"
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className=" mb-2 flex flex-col gap-4 md:w-1/2">
                <Input
                  className=""
                  size="md"
                  label="Cost Price"
                  name="costPrice"
                  onChange={handleChange}
                />
              </div>
            </div>
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Inventory Details
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Input
                  className=""
                  size="md"
                  label="Opening Stock"
                  name="openingStock"
                  onChange={handleChange}
                  type="number"
                />
                <Input
                  className=""
                  size="md"
                  label="Reorder Point"
                  name="reorderPoint"
                  onChange={handleChange}
                />
              </div>
              <div className=" mb-6 flex flex-col gap-4 md:w-1/2">
                <Select
                  value={vendor}
                  label="Vendor"
                  className="flex-col"
                  onChange={(value) => handleSelectChange("vendor", value)}
                >
                  <Option value="chindiBaniya">Chindi Baniya</Option>
                  <Option value="samosaChor">Samosa Chor</Option>
                  <Option value="paniDoodhwala">Pani Doodhwala</Option>
                </Select>
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
