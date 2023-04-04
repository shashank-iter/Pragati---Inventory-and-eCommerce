import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  TrashIcon,
  PencilSquareIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { faker } from "@faker-js/faker";
import AddVendor from "./modals/addVendor";

const vendorTableHeaders = ["vendor name", "Company Name", "Email", "payments"];

const vendorsData = [
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

const Vendor = () => {
  return (
    <div className="mt-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 flex flex-row p-6 "
        >
          <div className="flex  w-1/2 items-center ">
            <Typography variant="h6" color="white">
              Vendors
            </Typography>
          </div>
          <div className="flex w-1/2 items-center justify-end gap-2">
            <AddVendor />
            {/* settings button */}
            <Cog6ToothIcon
              type="button"
              className="h-8 w-8 cursor-pointer text-white hover:text-white/70"
            />
          </div>
        </CardHeader>
        <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            {/* table headers */}
            <thead>
              <tr>
                {vendorTableHeaders.map((title) => (
                  <th
                    key={title}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {title}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            {/* table body */}
            <tbody>
              {vendorsData.map(
                ({ vendorName, companyName, email, payments }, key, arr) => {
                  const tdClasses = `py-3 px-5 ${
                    key === arr.length - 1 ? "" : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={key}>
                      <td className={tdClasses}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {vendorName}
                        </Typography>
                      </td>
                      <td className={tdClasses}>
                        <Typography className={`text-sm font-medium`}>
                          {companyName}
                        </Typography>
                      </td>
                      <td className={tdClasses}>
                        <Typography className="text-sm font-medium">
                          {email}
                        </Typography>
                      </td>
                      <td className={tdClasses}>
                        {payments ? (
                          <span className="block w-12 rounded-md bg-green-400 py-1.5 px-2 text-center text-white">
                            Paid
                          </span>
                        ) : (
                          <span className="block w-12 rounded-md bg-red-400 py-1.5 px-2 text-center text-white">
                            Due
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Vendor;
