import Cookies from "js-cookie";
import { useEffect } from "react";

export default function PayButton() {
  useEffect(() => {
    const rzpPaymentForm = document.getElementById("rzp_payment_form");

    if (!rzpPaymentForm.hasChildNodes()) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.async = true;
      script.dataset.payment_button_id = Cookies.get("buttonid");

      rzpPaymentForm.appendChild(script);
    }
  });

  return (
    <>
      <form id="rzp_payment_form"></form>
    </>
  );
}
