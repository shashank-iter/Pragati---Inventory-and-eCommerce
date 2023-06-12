import { useParams } from "react-router-dom";
import { Navbar, Footer } from "@/widgets/layout";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import supabase from "../pages/auth/supabaseClient";
import BuyProduct from "@/components/storePage/buyProduct";

export const StorePages = () => {
  // array of routes
  const imgBaseUrl =
    "https://oukyirdebfesftyvvuou.supabase.co/storage/v1/object/public/productImage/";
  const { key } = useParams();
  // console.log(key);
  Cookies.set("key", key);
  const navbarRoutes = [
    {
      name: "store",
      path: "/store/milkParlour",
      icon: ShoppingBagIcon,
    },
  ];

  const [products, setProducts] = useState([]);
  async function getProducts() {
    try {
      let { data, error } = await supabase
        .from("product_table")
        .select("product_info")
        .ilike("email", `%${Cookies.get("key")}%`);
      if (error) throw error;
      else {
        // console.log(data);
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen px-5">
      <div className="container relative z-40 mx-auto">
        <Navbar routes={navbarRoutes} />
      </div>

      <div className=" py-10 text-center"> E-Stores powered by Pragati </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {products.map((product) => (
              <div
                key={product.product_info.id}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="aspect-w-3 aspect-h-4 sm:aspect-none bg-gray-200 group-hover:opacity-75 sm:h-96">
                  <img
                    src={imgBaseUrl + product.product_info.image_id}
                    alt={product.product_info.productName}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={product.href}>
                      {product.product_info.productName}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500">
                    {product.product_info.description}
                  </p>
                  <div className="flex flex-1 justify-between">
                    {/* <p className="text-sm italic text-gray-500">
                      {product.options}
                    </p> */}
                    <p className="text-base font-medium text-gray-900">
                      {"₹ " + product.product_info.sellingPrice}
                    </p>
                    <BuyProduct product={product["product_info"]} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default StorePages;
