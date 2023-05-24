import { Routes, Route } from "react-router-dom";
import routes from "@/routes";
import { Navbar, Footer } from "@/widgets/layout";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

export const StorePages = () => {
  // array of routes
  const navbarRoutes = [
    {
      name: "store",
      path: "/store/milkParlour",
      icon: ShoppingBagIcon,
    },
  ];

  return (
    <div className="min-h-screen px-5">
      <div className="container relative z-40 mx-auto">
        <Navbar routes={navbarRoutes} />
      </div>
      <div className="container"></div>
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "store" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default StorePages;
