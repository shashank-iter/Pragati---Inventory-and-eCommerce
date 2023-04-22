import { faker } from "@faker-js/faker";

export const vendorsData = [
  {
    vendorName: faker.name.fullName(),
    companyName: faker.company.name(),
    email: faker.internet.email(),
    payments: faker.datatype.boolean(),
  },
  {
    vendorName: faker.name.fullName(),
    companyName: faker.company.name(),
    email: faker.internet.email(),
    payments: faker.datatype.boolean(),
  },
  {
    vendorName: faker.name.fullName(),
    companyName: faker.company.name(),
    email: faker.internet.email(),
    payments: faker.datatype.boolean(),
  },
  {
    vendorName: faker.name.fullName(),
    companyName: faker.company.name(),
    email: faker.internet.email(),
    payments: faker.datatype.boolean(),
  },
  {
    vendorName: faker.name.fullName(),
    companyName: faker.company.name(),
    email: faker.internet.email(),
    payments: faker.datatype.boolean(),
  },
];
