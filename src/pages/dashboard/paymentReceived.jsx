import { useEffect } from "react";
import Cookies from "js-cookie";

const PaymentReceived = () => {
  useEffect(() => {
    if (!Cookies.get("token")) {
      window.location.href = "/auth/sign-in";
    }
  });
  return <div>Payment Received</div>;
};

export default PaymentReceived;
