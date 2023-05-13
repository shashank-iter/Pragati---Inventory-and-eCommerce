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
import { useEffect } from "react";
import Cookies from "js-cookie";
import supabase from "../auth/supabaseClient";
import { data } from "autoprefixer";
import { useState } from "react";

async function fetchData() {
  try {
    let { data: product_table, error } = await supabase
      .from("product_table")
      .select("*");
    console.log(product_table);
    productData = product_table;
  } catch (error) {
    console.log(error);
  }
}

export function Product() {
  let productData = [];

  useEffect(() => {
    if (!Cookies.get("token")) {
      window.location.href = "/auth/sign-in";
    }
  });

  fetchData();

  // const { email, password } = formData;

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 flex flex-row p-6 "
        >
          <div className="flex  w-1/2 items-center ">
            <Typography variant="h6" color="white">
              Products
            </Typography>
          </div>
          <div className="flex  w-1/2 items-center justify-end">
            <AddProduct></AddProduct>
            <Cog6ToothIcon className="ml-4 h-8 w-8 text-white" />
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["product name", "units (In Stock)", "Re-order level"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {productData.map((item, index) => {
                const className = `py-3 px-5 ${key === productData.length - 1}
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                return (
                  <tr
                    key={item.id}
                    onClick={() => alert(item.product_info.productName)}
                  >
                    <td>
                      <div className="flex items-center gap-4">
                        {/* <Avatar src={img} alt={item.product_info.productName} size="sm" /> */}
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {item.product_info.productName}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Typography
                        className={`text-sm font-semibold  ${
                          item.product_info.openingStock <= 10
                            ? "text-red-700"
                            : "text-blue-gray-700"
                        }`}
                      >
                        {item.product_info.openingStock}
                      </Typography>
                    </td>
                    <td>
                      <Typography className="text-sm font-semibold">
                        {item.product_info.productName}
                      </Typography>
                    </td>
                    <td>
                      <button>edit</button>
                    </td>
                    {/* <td >
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                          <TrashIcon className="h-5 w-5 text-red-500" />
                          </Typography>
                        </td> */}
                    {/* <td >
                          <Typography
                            as="a"
                            href="#"
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                            
                          </Typography>
                        </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Projects Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["companies", "members", "budget", "completion", ""].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody> */}
      {/* {projectsTableData.map(
                ({ img, name, members, budget, completion }, key) => {
                  const className = `py-3 px-5 ${
                    key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td >
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? "" : "-ml-2.5"
                              }`}
                            />
                          </Tooltip>
                        ))}
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {budget}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="w-10/12">
                          <Typography
                            variant="small"
                            className="mb-1 block text-xs font-medium text-blue-gray-600"
                          >
                            {completion}%
                          </Typography>
                          <Progress
                            value={completion}
                            variant="gradient"
                            color={completion === 100 ? "green" : "blue"}
                            className="h-1"
                          />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          <EllipsisVerticalIcon
                            strokeWidth={2}
                            className="h-5 w-5 text-inherit"
                          />
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )} */}
      {/* </tbody>
          </table>
        </CardBody>
      </Card> */}
    </div>
  );
}

export default Product;
