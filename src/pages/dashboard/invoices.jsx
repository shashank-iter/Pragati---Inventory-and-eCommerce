import React, { useState } from "react";
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
import { authorsTableData, projectsTableData } from "@/data";
import AddProduct from "./modals/addProduct";
import ChangeProduct from "./modals/changeProduct";
import Cookies from "js-cookie";
import { useEffect } from "react";

// import necessary invoice components
import { uid } from "uid";
import InvoiceModal from "@/components/invoicePage/InvoiceModal";
import incrementString from "@/helpers/incrementString";

import { faker } from "@faker-js/faker";

const Invoices = () => {
  useEffect(() => {
    if (!Cookies.get("token")) {
      window.location.href = "/auth/sign-in";
    }
  });

  // invoice component functions
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState("");
  const [customerName, setCustomerName] = useState("");

  // state to show in invoice
  const [items, setItems] = useState([]);

  // array of items to be shown in invoice
  const boughtItems1 = [
    {
      id: uid(6),
      name: "Ergonomic Fresh Chicken",
      qty: 1,
      price: "1.00",
    },
    {
      id: uid(6),
      name: "Intelligent Wooden Pizza",
      qty: 2,
      price: "3.50",
    },
    {
      id: uid(6),
      name: "Fantastic Plastic Mouse",
      qty: 3,
      price: "2.25",
    },
    {
      id: uid(6),
      name: "Practical Soft Soap",
      qty: 1,
      price: "5.99",
    },
    {
      id: uid(6),
      name: "Incredible Cotton Mouse",
      qty: 4,
      price: "0.99",
    },
    {
      id: uid(6),
      name: "Fantastic Granite Pizza",
      qty: 2,
      price: "7.50",
    },
    {
      id: uid(6),
      name: "Handmade Concrete Chair",
      qty: 1,
      price: "12.99",
    },
    {
      id: uid(6),
      name: "Ergonomic Rubber Chips",
      qty: 1,
      price: "9.99",
    },
    {
      id: uid(6),
      name: "Handcrafted Metal Tuna",
      qty: 2,
      price: "2.50",
    },
    {
      id: uid(6),
      name: "Generic Concrete Pants",
      qty: 3,
      price: "1.75",
    },
    {
      id: uid(6),
      name: "Awesome Steel Towels",
      qty: 1,
      price: "8.99",
    },
  ];

  const boughtItems2 = [];
  for (let index = 0; index < 6; index++) {
    boughtItems2.push({
      id: uid(6),
      name: faker.commerce.product(),
      qty: faker.datatype.number({ min: 1, max: 10 }),
      price: faker.commerce.price(50, 100, 2),
    });
  }

  // customer data
  const customerData = [
    {
      id: uid(6),
      name: "Divyesh Jain",
      address: "Kathmandu",
      invoice: boughtItems1,
    },
    {
      id: uid(6),
      name: "Jennie Erdman",
      address: "Bengaluru",
      invoice: boughtItems2,
    },
  ];

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: uid(6),
        name: "",
        qty: 1,
        price: "1.00",
      },
    ]);
  };

  // calculate subtotal
  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);
  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* table of users with a button to show their respective invoices */}
      <table>
        {/* table header */}
        <thead>
          <tr>
            {["Customer", "id", "address", "Invoice"].map((el) => (
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

        {/* table body */}
        <tbody>
          {customerData.map((customer, index) => {
            const className = `py-3 px-5 `;

            return (
              <tr key={index}>
                <td className="py-3 px-5 text-left">
                  <div className="flex items-center gap-4">
                    <Typography className="text-xs font-normal text-blue-gray-500">
                      {customer.name}
                    </Typography>
                  </div>
                </td>
                <td className="py-3 px-5 text-left">
                  <Typography className={`text-sm font-semibold`}>
                    {customer.id}
                  </Typography>
                </td>
                <td className="py-3 px-5 text-left">
                  <Typography className="text-sm font-semibold">
                    {customer.address}
                  </Typography>
                </td>
                {/* button to show invoice */}
                <td className="py-3 px-5 text-left">
                  <Button
                    variant="filled"
                    color="green"
                    onClick={() => {
                      setCustomerName(customer.name);
                      setItems(customer.invoice);
                      setIsOpen(true);
                    }}
                  >
                    Show Invoice
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* invoice modal */}
      <InvoiceModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        invoiceInfo={{
          invoiceNumber,
          cashierName,
          customerName,
          subtotal,
          taxRate,
          discountRate,
          total,
        }}
        items={items}
        onAddNextInvoice={addNextInvoiceHandler}
        // onAddNextInvoice={() => {}}
      />
    </div>
  );
};

export default Invoices;
