import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  BanknotesIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  InboxArrowDownIcon,
} from "@heroicons/react/24/solid";
import {
  Home,
  Profile,
  Notifications,
  Product,
  Vendor,
  Orders,
  PaymentReceived,
} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { StorePages } from "./layouts";
import Cookies from "js-cookie";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "product",
        path: "/product",
        element: <Product />,
      },
      {
        icon: <BanknotesIcon {...icon} />,
        name: "vendor",
        path: "/vendor",
        element: <Vendor />,
      },
      {
        icon: <ClipboardDocumentListIcon {...icon} />,
        name: "orders",
        path: "/orders",
        element: <Orders />,
      },
      // {
      //   icon: <InboxArrowDownIcon {...icon} />,
      //   name: "payment Received",
      //   path: "/payment received",
      //   element: <PaymentReceived />,
      // },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  // store pages that'll be publicly available
  {
    title: "store pages",
    layout: "store",
    pages: [
      {
        icon: <InboxArrowDownIcon {...icon} />,
        name: "Visit Store",
        path: `/${Cookies.get("email") && Cookies.get("email").split("@")[0]}`,
      },
    ],
  },
];

export default routes;
