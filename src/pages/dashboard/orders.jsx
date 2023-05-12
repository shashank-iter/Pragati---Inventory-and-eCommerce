import React, { useEffect } from "react";
import Cookies from "js-cookie";

const Orders = () => {
  useEffect(() => {
    if (!Cookies.get("token")) {
      window.location.href = "/auth/sign-in";
    }
  });
  return <div>Orders</div>;
};

export default Orders;
