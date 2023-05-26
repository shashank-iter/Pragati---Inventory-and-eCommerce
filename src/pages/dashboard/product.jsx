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
import EditProduct from "./modals/editProduct";
import AddProduct from "./modals/addProduct";
import ChangeProduct from "./modals/changeProduct";
import { useEffect } from "react";
import Cookies from "js-cookie";
import supabase from "../auth/supabaseClient";
import { data } from "autoprefixer";
import { useState } from "react";

export function Product() {
  useEffect(() => {
    if (!Cookies.get("token")) {
      window.location.href = "/auth/sign-in";
    }
  });

  // state to store data of the product to show in the table
  const [productData, setProductData] = useState([]);

  // async function to fetch data
  async function fetchData() {
    try {
      let { data: product_table, error } = await supabase
        .from("product_table")
        .select("*")
        .ilike("email", `%${Cookies.get("email").split("@")[0]}%`);

      return product_table;
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
    async function fetchProductData() {
      const fetchedData = await fetchData();
      // console.log("🚀 ~ fetchProductData ~ fetchedData:", fetchedData);
      setProductData(fetchedData);
      console.log("🚀 ~ fetchProductData ~ fetchedData:");

      // map over the data print individual product data
      // productData.map((item, index) => {
      //   // console.log(item.product_info.productName);
      // });

      // setIsLoading(false);
    }

    fetchProductData();
  }, []);

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
                {[
                  "product name",
                  "units (In Stock)",
                  "Re-order level",
                  "Edit",
                  "Delete",
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
              {productData.map((item, index) => {
                const className = `py-3 px-5 `;

                return (
                  <tr
                    key={item.id}
                    // onClick={() => alert(item.product_info.productName)}
                  >
                    <td className="py-3 px-5 text-left">
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={
                            item.product_info.image_id
                              ? `https://oukyirdebfesftyvvuou.supabase.co/storage/v1/object/public/productImage/${item.product_info.image_id}`
                              : // mood bane to replace the placeholder image with the commented one and have fun ✌️
                                "https://via.placeholder.com/150"
                            // "http://placeskull.com/100/100"
                          }
                          alt={item.product_info.productName}
                          size="sm"
                        />
                        <div>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {item.product_info.productName}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-left">
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
                    <td className="py-3 px-5 text-left">
                      <Typography className="text-sm font-semibold">
                        {item.product_info.productName}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 text-left">
                      <EditProduct productData={item} />
                    </td>
                    <td className="py-3 px-5 text-left">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        <button onClick={() => deleteRowById(item.id)}>
                          <TrashIcon className="h-5 w-5 text-red-500" />
                        </button>
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Product;
