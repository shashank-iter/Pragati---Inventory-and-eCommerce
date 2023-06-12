import Cookies from "js-cookie";
import supabase from "../auth/supabaseClient";
import { useEffect, useState } from "react";

// const products = [
//   {
//     id: 1,
//     name: 'Basic Tee 8-Pack',
//     href: '#',
//     price: '$256',
//     description: 'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
//     options: '8 colors',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
//     imageAlt: 'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
//   },
//   {
//     id: 2,
//     name: 'Basic Tee',
//     href: '#',
//     price: '$32',
//     description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
//     options: 'Black',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg',
//     imageAlt: 'Front of plain black t-shirt.',
//   },
//   // More products...
// ]
export const MilkParlour = () => {
  // const key = useParams("key");
  // console.log(key);

  const [products, setProducts] = useState([]);
  // const param = new URLSearchParams(location.search);
  // const key = param.get('key');
  //   console.log(key);
  //   const mail = key;
  //   Cookies.set("key", key);
  const imgBaseUrl =
    "https://oukyirdebfesftyvvuou.supabase.co/storage/v1/object/public/productImage/";

  async function getProducts() {
    try {
      let { data, error } = await supabase
        .from("product_table")
        .select("*")
        .ilike("user_id", `%${Cookies.get("key")}%`);
      if (error) throw error;
      else {
        console.log(data);
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
    <>
      <div className=" py-10 text-center">Tshirt Store</div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="aspect-w-3 aspect-h-4 sm:aspect-none bg-gray-200 group-hover:opacity-75 sm:h-96">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="flex flex-1 flex-col justify-end">
                    <p className="text-sm italic text-gray-500">
                      {product.options}
                    </p>
                    <p className="text-base font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
