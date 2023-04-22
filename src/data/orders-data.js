import { faker } from "@faker-js/faker";

export const ordersData = [
  {
    orderNo: faker.datatype.number(1000),
    orderDate: faker.date.past().toLocaleDateString(),
    quantity: faker.datatype.number(100),
    expectedDeliveryDate: faker.date.future().toLocaleDateString(),
    orderValue: faker.commerce.price(),
    advancePaid: faker.commerce.price(),
    duePayment: faker.commerce.price(),
    orderStatus: "Pending",
    paymentDueDate: faker.date.future().toLocaleDateString(),
  },
  {
    orderNo: faker.datatype.number(1000),
    orderDate: faker.date.past().toLocaleDateString(),
    quantity: faker.datatype.number(100),
    expectedDeliveryDate: faker.date.future().toLocaleDateString(),
    orderValue: faker.commerce.price(),
    advancePaid: faker.commerce.price(),
    duePayment: faker.commerce.price(),
    orderStatus: "Shipped",
    paymentDueDate: faker.date.future().toLocaleDateString(),
  },
  {
    orderNo: faker.datatype.number(1000),
    orderDate: faker.date.past().toLocaleDateString(),
    quantity: faker.datatype.number(100),
    expectedDeliveryDate: faker.date.future().toLocaleDateString(),
    orderValue: faker.commerce.price(),
    advancePaid: faker.commerce.price(),
    duePayment: faker.commerce.price(),
    orderStatus: "Delivered",
    paymentDueDate: faker.date.future().toLocaleDateString(),
  },
  {
    orderNo: faker.datatype.number(1000),
    orderDate: faker.date.past().toLocaleDateString(),
    quantity: faker.datatype.number(100),
    expectedDeliveryDate: faker.date.future().toLocaleDateString(),
    orderValue: faker.commerce.price(),
    advancePaid: faker.commerce.price(),
    duePayment: faker.commerce.price(),
    orderStatus: "Delivered",
    paymentDueDate: faker.date.future().toLocaleDateString(),
  },
  // add more objects here to represent more rows in the table
];
