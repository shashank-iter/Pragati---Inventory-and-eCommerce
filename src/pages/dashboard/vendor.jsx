import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import supabase from "../auth/supabaseClient";
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
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  TrashIcon,
  PencilSquareIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import AddVendor from "./modals/addVendor";
import AddOrders from "./modals/addOrders";

import { paymentsData, vendorsData } from "@/data";
import { PaymentsTable } from "@/components/vendorPage/PaymentsTable";
import { VendorTable } from "@/components/vendorPage/VendorTable";
import { OrdersTable } from "@/components/vendorPage/OrdersTable";

/**
 * Component that renders the Vendor page with three tabs displaying vendor, payments and orders data.
 * @returns {JSX.Element} The rendered component.
 */
const Vendor = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [paymentsDataTest, setPaymentsDataTest] = useState([]);

  useEffect(() => {
    if (!Cookies.get("token")) {
      window.location.href = "/auth/sign-in";
    }
  });
  // Data for tabs
  const tabsData = [
    {
      label: "Vendors",
      value: "vendors",
      // Vendor table component
      desc: (
        <VendorTable
          headers={["vendor name", "Company Name", "Email", "payments"]}
          data={vendorsData}
        />
      ),
    },
    {
      label: "Payments",
      value: "payments",
      // Payments table component
      desc: (
        <PaymentsTable
          headers={["Vendor name", "payments made", "Due Payments"]}
          data={paymentsDataTest}
        />
      ),
    },
    {
      label: "Orders",
      value: "orders",
      // Orders table component
      desc: (
        <OrdersTable
          headers={[
            "Order No",
            "Order Date",
            "Quantity",
            "Expected Delivery Date",
            "Order Value",
            "Advance Paid",
            "Due Payment",
            "Order Status",
            "Payment Due Date",
          ]}
          data={ordersData}
        />
      ),
    },
  ];

  const [vendorData, setVendorData] = useState([]);

  // async function to fetch data
  async function fetchData() {
    try {
      let { data: vendor_orders, error } = await supabase
        .from("vendor_orders")
        .select("vendorOrderData");

      return vendor_orders;
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * This is an async function that deletes a row from a Supabase table based on the provided ID.
   */
  async function deleteRowById(id) {
    const { data, error } = await supabase
      .from("product_table")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting row:", error);
    } else {
      console.log("Row deleted successfully:", data);
    }
  }

  /**
   * This is a React useEffect hook that fetches data asynchronously and updates state variables.
   */
  useEffect(() => {
    // setIsLoading(true);
    async function fetchVendorData() {
      let fetchedData = await fetchData();

      // extract data from the nested object "vendorOrderData"
      fetchedData = fetchedData.map(({ vendorOrderData }) => vendorOrderData);
      setOrdersData(fetchedData);
      // setPaymentsDataTest(fetchedData);
      // using dot notation
      // const filteredData = fetchedData.map(({vendor, advancePaid, dueAmount}) => {vendor, advancePaid, dueAmount});
      // extract data for  each vendor
      const filteredDataForPayments = fetchedData.map((item) => {
        return {
          vendor: item.vendor,
          advancePaid: item.advancePaid,
          dueAmount: item.dueAmount,
        };
      });
      setPaymentsDataTest(filteredDataForPayments);

      console.log(paymentsDataTest);

      // map over the data print individual product data
      ordersData.map((item, index) => {
        // console.log(item.vendor, item.dueAmount, item.advancePaid);
      });

      // setIsLoading(false);
    }

    fetchVendorData();
  }, []);

  return (
    <div className="mt-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 flex flex-row p-6 "
        >
          <div className="flex  w-1/2 items-center ">
            <Typography variant="h6" color="white">
              Vendors
            </Typography>
          </div>
          <div className="flex w-1/2 items-center justify-end gap-2">
            <AddVendor />
            <AddOrders />
            {/* settings button */}
            <Cog6ToothIcon
              type="button"
              className="h-8 w-8 cursor-pointer text-white hover:text-white/70"
            />
          </div>
        </CardHeader>
        <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
          {/* 'value' is NECESSARY for "Tabs" component, as it chooses the default/initial tab otherwise, it'll show blank */}
          <Tabs value="vendors">
            <TabsHeader className="bg-gray-400">
              {tabsData.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {tabsData.map(({ value, desc }) => (
                <TabPanel value={value} className="overflow-x-auto" key={value}>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default Vendor;
