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
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import supabase from "@/pages/auth/supabaseClient";
import Cookies from "js-cookie";
import swal from "sweetalert";
import DatePicker from "react-datepicker";

export default function EditVendor({ Data }) {
  const { id: rowId, vendorOrderData: vendorData } = Data;
  // console.log("🚀 ~ EditProduct ~ productInfo:", productInfo);
  // console.log("🚀 ~ EditProduct ~ rowId:", rowId);

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
    // set values of states so as to show existing values in the form and also to set the image path (assists in editing the product details)
    setFormData(vendor);
    setOrderDate(vendorData.orderDate);
    setDeliveryDate(vendorData.deliveryDate);
    setVendor(vendorData.vendor);
    setPaymentDueDate(vendorData.paymentDueDate);
    setVendor(productInfo.vendor);
    setPath(productInfo.image_id);
  }, []);

  // states for select fields
  const [vendor, setVendor] = useState(null);

  const [vendorList, setVendorList] = useState([]);
  const [orderDate, setOrderDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [paymentDueDate, setPaymentDueDate] = useState(new Date());

  const dataToBeSent = {
    orderNumber: formData.orderNumber,
    orderDate: orderDate,
    deliveryDate: deliveryDate,
    paymentDueDate: paymentDueDate,
    vendor: vendor,
    orderValue: formData.orderValue,
    orderStatus: formData.orderStatus,
    dueAmount: formData.dueAmount,
    advancePaid: formData.advancePaid,
  };

  const handleSelectChange = (name, value) => {
    console.log(name, value);
    switch (name) {
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
    setFormData({});
  };

  /**
   * This function updates a product's information in a Supabase database.
   */
  const handleUpdate = async (id, updatedData) => {
    const { data, error } = await supabase
      .from("vendor_orders")
      .update({ vendorOrderData: updatedData })
      .eq("id", id);

    if (error) {
      console.log("Error updating product:", error.message);
    } else {
      console.log("Product updated successfully:", data);
    }
  };

  // console.log("dataToBeSent.image_id" + dataToBeSent.image_id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      handleUpdate(rowId, dataToBeSent);

      swal({
        title: "Product Updated!",
        text: "Product info has been edited successfully!",
        icon: "success",
        button: "OK",
      });
      // resetFormData(); // Reset the form data after the alert
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

  return (
    <Fragment>
      <div className="flex gap-3">
        <Button
          onClick={() => handleOpen("xxl")}
          variant="gradient"
          color="white"
          className="bg-white p-0 text-sm sm:text-base"
        >
          <PencilSquareIcon className="h-6 w-6 text-black" />
        </Button>
      </div>
      <Dialog open={size === "xxl"} size={size || "xxl"} handler={handleOpen}>
        <DialogHeader>Add a new order</DialogHeader>
        <DialogBody divider className=" overflow-y-scroll ">
          <form className="my-2 w-full  md:mx-10  ">
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Order Information
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Input
                  className=""
                  size="md"
                  label="Order Number (auto-generated)"
                  name="orderNumber"
                  value={formData.orderNumber}
                  disabled
                />
                <span className="text-sm font-normal text-gray-600">
                  {" "}
                  Order Date
                </span>
                <DatePicker
                  selected={orderDate}
                  onChange={(date) => setOrderDate(date)}
                />
              </div>
              <div className=" mb-2 flex flex-col gap-4 md:w-1/2">
                <Input
                  className=""
                  size="md"
                  label="Order Quantity"
                  name="orderQuantity"
                  value={formData.orderQuantity}
                  onChange={handleChange}
                />
                <span className="text-sm font-normal text-gray-600">
                  {" "}
                  Expected Delivery Date
                </span>
                <DatePicker
                  selected={deliveryDate}
                  onChange={(date) => setDeliveryDate(date)}
                />
              </div>
            </div>
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Order Details
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Input
                  className=""
                  size="md"
                  label="Order Value"
                  name="orderValue"
                  value={formData.orderValue}
                  onChange={handleChange}
                />
                <Input
                  className=""
                  size="md"
                  label="Advance Paid"
                  name="advancePaid"
                  value={formData.advancePaid}
                  onChange={handleChange}
                />
                <Select
                  value={vendor}
                  label="Vendor"
                  className="flex-col"
                  onChange={(value) => handleSelectChange("vendor", value)}
                >
                  {vendorList.map((item, index) => {
                    return (
                      <Option
                        key={item.vendorDetails.vendorContactNumber}
                        value={item.vendorDetails.vendorName}
                      >
                        {" "}
                        {item.vendorDetails.vendorName}{" "}
                      </Option>
                    );
                  })}
                </Select>
                <span className="text-sm font-normal text-gray-600">
                  {" "}
                  Payment Due Date
                </span>
                <DatePicker
                  selected={paymentDueDate}
                  onChange={(date) => setPaymentDueDate(date)}
                />
              </div>
              <div className=" mb-2 flex flex-col gap-4 md:w-1/2">
                <Input
                  className=""
                  size="md"
                  label="Due Amount"
                  name="dueAmount"
                  value={formData.dueAmount}
                  onChange={handleChange}
                />
                <Input
                  className=""
                  size="md"
                  label="Order Status"
                  name="orderStatus"
                  value={formData.orderStatus}
                  onChange={handleChange}
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
