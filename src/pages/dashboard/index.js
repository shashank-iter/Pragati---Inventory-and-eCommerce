/* Exporting components from the 'pages/dashboard' folder. */
export * from "@/pages/dashboard/home";
export * from "@/pages/dashboard/profile";
export * from "@/pages/dashboard/tables";
export * from "@/pages/dashboard/notifications";
export * from "@/pages/dashboard/product";
// Re-export the default export from "@/pages/dashboard/vendor" as a named export called "Vendor"
export { default as Vendor } from "@/pages/dashboard/vendor";
export { default as Invoices } from "@/pages/dashboard/invoices";
export { default as Orders } from "@/pages/dashboard/orders";
export { default as PaymentReceived } from "@/pages/dashboard/paymentReceived";
