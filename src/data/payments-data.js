import { faker } from "@faker-js/faker";

export const paymentsData = [
  {
    vendorName: faker.name.fullName(),
    paymentsMade: faker.datatype.number(1000),
    paymentsDue: faker.datatype.number(1000),
  },
  {
    vendorName: faker.name.fullName(),
    paymentsMade: faker.datatype.number(1000),
    paymentsDue: faker.datatype.number(1000),
  },
  {
    vendorName: faker.name.fullName(),
    paymentsMade: faker.datatype.number(1000),
    paymentsDue: faker.datatype.number(1000),
  },
  {
    vendorName: faker.name.fullName(),
    paymentsMade: faker.datatype.number(1000),
    paymentsDue: faker.datatype.number(1000),
  },
];
