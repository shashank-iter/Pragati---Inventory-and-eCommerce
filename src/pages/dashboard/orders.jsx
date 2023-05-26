import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  TrashIcon,
  PencilSquareIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import EditCustomerOrder from "./modals/editCustomerOrder";
import supabase from "../auth/supabaseClient";
import { data } from "autoprefixer";

const Orders = () => {
  useEffect(() => {
    if (!Cookies.get("token")) {
      window.location.href = "/auth/sign-in";
    }
  });
  const [customerData, setCustomerData] = useState([]);

  async function fetchOrderDetails() {
    let { data: customer_orders, error } = await supabase
      .from("customer_orders")
      .select("*")
      .ilike("shopID", `%${Cookies.get("email").split("@")[0]}%`);

    console.log(customer_orders);
    setCustomerData(customer_orders);
  }

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-8 flex flex-row p-6 "
          >
            <div className="flex  w-1/2 items-center ">
              <Typography variant="h6" color="white">
                Orders
              </Typography>
            </div>
            <div className="flex  w-1/2 items-center justify-end">
              {/* <AddProduct></AddProduct> */}
              <Cog6ToothIcon className="ml-4 h-8 w-8 text-white" />
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "Order ID",
                    "Order Name",
                    "Customer Name",
                    "Customer Email",
                    "Customer Phone",
                    "Order Value",
                    "Payment Status",
                    "Order Status",
                    "Edit Order",
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-b border-b-blue-gray-100 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customerData.map((item, index) => {
                  const className = `py-3 px-5 `;

                  return (
                    <tr
                      key={item.id}
                      // onClick={() => alert(item.orderData.productName)}
                    >
                      <td className="py-3 px-5 text-left">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {item?.orderData?.orderId}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 text-left">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {item.orderData.orderName}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 text-left">
                        <Typography className={"text-sm font-semibold "}>
                          {item.orderData.customerName}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 text-left">
                        <Typography className="text-sm font-semibold">
                          {item.orderData.customerEmail}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 text-left">
                        <Typography className="text-sm font-semibold">
                          {item.orderData.customerPhone}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 text-left">
                        {/* <EditProduct productData={item} /> */}
                        <Typography className="text-sm font-semibold">
                          {item.orderData.orderValue}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 text-left">
                        <Typography
                          className={`text-sm font-semibold ${
                            item.paymentCompleted === "true"
                              ? "text-green-500"
                              : "text-amber-600"
                          }`}
                        >
                          {item.paymentCompleted === "true"
                            ? "Completed"
                            : "Pending"}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 text-left">
                        <Typography
                          className={`text-sm font-semibold ${
                            item.orderCompleted === "true"
                              ? "text-green-500"
                              : "text-amber-600"
                          }`}
                        >
                          {item.orderCompleted === "true"
                            ? "Completed"
                            : "Pending"}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 text-left">
                        <EditCustomerOrder customerdata={item} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Orders;
