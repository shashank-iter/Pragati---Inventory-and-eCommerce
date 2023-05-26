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

export default function editCustomerOrder({ customerdata }) {
  const {
    paymentCompleted: paymentStatusValue,
    orderCompleted: orderStatusValue,
    orderData: dataToSend,
    id: rowID,
    uniqueCode: uq,
  } = customerdata;
  const [customerData, setCustomerData] = useState([]);
  // console.log("🚀 ~ EditProduct ~ productInfo:", productInfo);
  // console.log("🚀 ~ EditProduct ~ rowId:", rowId);
  console.log(rowID);
  const [size, setSize] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const handleOpen = (value) => setSize(value);

  useEffect(() => {
    // set values of states so as to show existing values in the form and also to set the image path (assists in editing the product details)

    setPaymentStatus();
    setOrderStatus();
  }, []);

  useEffect(() => {
    // set values of states so as to show existing values in the form and also to set the image path (assists in editing the product details)
    setPaymentStatus(paymentStatusValue);
    setOrderStatus(orderStatusValue);
  }, []);

  const handleSelectChange = (name, value) => {
    // console.log(name, value);
    switch (name) {
      case "paymentStatus":
        setPaymentStatus(value);
        break;
      case "orderStatus":
        setOrderStatus(value);
        break;

      default:
        break;
    }
  };

  /**
   * The function resets the form data by setting all input fields to empty strings.
   */
  const resetFormData = () => {
    setPaymentStatus("");
    setOrderStatus("");
  };

  /**
   * This function updates a product's information in a Supabase database.
   */

  // console.log("dataToBeSent.image_id" + dataToBeSent.image_id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //   const { data, error } = await supabase
      //     .from("customer_orders")
      //     .update({
      //     paymentCompleted: "true"
      //     })
      //     .eq("id", rowID);
      const { data, error } = await supabase
        .from("customer_orders")
        .upsert(
          {
            paymentCompleted: paymentStatus,
            orderCompleted: orderStatus,
            id: rowID,
            orderData: dataToSend,
          },
          { onConflict: "id" }
        )
        .select();

      if (error) throw error;
      else {
        console.log(data);
        swal({
          title: "Order Updated!",
          text: "Order has been updated successfully!",
          icon: "success",
          button: "OK",
        });
        resetFormData();
      }
      // Reset the form data after the alert
    } catch (error) {
      console.log(error);
      swal({
        title: "Error!",
        text: "There was some error in updating the Order. Please try again or contact support.",
        icon: "error",
        button: "OK",
      });
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
        <DialogHeader>Update Order Status</DialogHeader>
        <DialogBody divider className=" overflow-y-scroll ">
          <form className="my-2 w-full  md:mx-10  ">
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Order Status
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Select
                  label="Payment Status"
                  className="flex-col"
                  value={paymentStatus}
                  name=""
                  onChange={(value) =>
                    handleSelectChange("paymentStatus", value)
                  }
                >
                  <Option value="true">Completed</Option>
                  <Option value="false">Not Completed</Option>
                </Select>
              </div>
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Select
                  label="Choose Order Status"
                  className="flex-col"
                  value={orderStatus}
                  name=""
                  onChange={(value) => handleSelectChange("orderStatus", value)}
                >
                  <Option value="true">Completed</Option>
                  <Option value="false">Not Completed</Option>
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
