import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  BanknotesIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import {
  Home,
  Profile,
  Tables,
  Notifications,
  Product,
  Vendor,
  Invoices,
  Orders,
  PaymentReceived,
} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

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
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "notifactions",
        path: "/notifactions",
        element: <Notifications />,
      },
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
        icon: <DocumentTextIcon {...icon} />,
        name: "invoices",
        path: "/invoices",
        element: <Invoices />,
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "orders",
        path: "/orders",
        element: <Orders />,
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "payment Received",
        path: "/payment received",
        element: <PaymentReceived />,
      },
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
];

export default routes;
