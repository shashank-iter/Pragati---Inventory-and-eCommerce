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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddOrders() {
  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);

  function generateUniqueOrderId() {
    return Math.random().toString(36).substr(2, 9);
  }

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
  const [vendor, setVendor] = useState(null);

  const [vendorList, setVendorList] = useState([]);
  const [orderDate, setOrderDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [paymentDueDate, setPaymentDueDate] = useState(new Date());
  const dataToBeSent = {
    orderNumber: generateUniqueOrderId(),
    orderDate: orderDate,
    orderQuantity: formData.orderQuantity,
    deliveryDate: deliveryDate,
    paymentDueDate: paymentDueDate,
    vendor: vendor,
    orderValue: formData.orderValue,
    orderStatus: formData.orderStatus,
    dueAmount: formData.dueAmount,
    advancePaid: formData.advancePaid,
  };

  /**
   * The function resets the form data by setting all input fields to empty strings.
   */
  const resetFormData = () => {
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from("vendor_orders").insert([
        {
          email: Cookies.get("email"),
          vendorOrderData: dataToBeSent,
          user_id: Cookies.get("uid"),
        },
      ]);
      swal({
        title: "Order Added!",
        text: "Order has been added successfully!",
        icon: "success",
        button: "OK",
      });
      resetFormData(); // Reset the form data after the alert
    } catch (error) {
      swal({
        title: "Error!",
        text: "There was some error in adding the Order. Please try again or contact support.",
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

  async function fetchData() {
    try {
      let { data: vendor_table, error } = await supabase
        .from("vendor_table")
        .select("vendorDetails");
      return vendor_table;
    } catch (error) {
      swal(
        "There was some error in fetching the vendor data. Please try again or contact support."
      );
    }
  }
  useEffect(() => {
    // setIsLoading(true);
    async function fetchVendorData() {
      const fetchedData = await fetchData();
      // console.log("🚀 ~ fetchProductData ~ fetchedData:", fetchedData);
      setVendorList(fetchedData);

      console.log("🚀 ~ fetchProductData ~ fetchedData:");

      // map over the data print individual product data
      // productData.map((item, index) => {
      //   // console.log(item.product_info.productName);
      // });

      // setIsLoading(false);
    }

    fetchVendorData();
  }, []);

  return (
    <Fragment>
      <div className="flex gap-3">
        <Button
          onClick={() => {
            handleOpen("xxl");
          }}
          variant="gradient"
          color="white"
          className="bg-white text-sm sm:text-base"
        >
          Add Order +
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
                  disabled
                />
                <span className="text-sm font-normal text-gray-600">
                  {" "}
                  Order Date
                </span>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
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
                  onChange={handleChange}
                  type="number"
                />
                <span className="text-sm font-normal text-gray-600">
                  {" "}
                  Expected Delivery Date
                </span>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
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
                  onChange={handleChange}
                  type="number"
                />
                <Input
                  className=""
                  size="md"
                  label="Advance Paid"
                  name="advancePaid"
                  onChange={handleChange}
                  type="number"
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
                  dateFormat="dd/MM/yyyy"
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
                  onChange={handleChange}
                  type="number"
                />
                <Input
                  className=""
                  size="md"
                  label="Order Status"
                  name="orderStatus"
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
