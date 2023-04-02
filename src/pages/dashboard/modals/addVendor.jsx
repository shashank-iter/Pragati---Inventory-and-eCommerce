import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { faker } from "@faker-js/faker";

const contactData = [
  {
    name: faker.name.fullName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.fullName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.fullName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
  },
  {
    name: faker.name.fullName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
  },
];

export default function AddVendor() {
  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);

  const tdClasses = `py-3 px-5`;

  return (
    <Fragment>
      <div className="flex gap-3">
        {/* button which is used to open the dialog box.  */}
        <Button
          onClick={() => handleOpen("xxl")}
          variant="gradient"
          color="white"
          class="bg-black text-sm sm:text-base"
        >
          Add Vendor +
        </Button>
      </div>

      {/* dialog box which is used to add a new vendor.  */}
      <Dialog open={size === "xxl"} size={size || "xxl"} handler={handleOpen}>
        <DialogHeader>Add a new Vendor</DialogHeader>
        <DialogBody divider className=" overflow-y-scroll ">
          <form className="my-2 w-full md:mx-10">
            {/* Vendor Info start */}
            <Typography variant="lead" className="mb-3 font-semibold">
              {" "}
              Vendor Information
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex flex-col gap-4 md:w-1/2">
                {/* Vendor name */}
                <Input type="text" className="" size="md" label="Vendor Name" />
                {/* Email */}
                <Input
                  type="email"
                  className=""
                  size="md"
                  label="Vendor email"
                />
                {/* Website */}
                <Input type="url" className="" size="md" label="Website" />
              </div>
              <div className=" mb-2 flex flex-col gap-4 md:w-1/2">
                {/* Company name */}
                <Input
                  type="text"
                  className=""
                  size="md"
                  label="Company Name"
                />
                {/* Contact Number */}
                <Input
                  type="number"
                  className=""
                  size="md"
                  label="Contact Number"
                />
                {/* Tax Preference */}
                <Select label="Tax Preference">
                  <Option>Taxable</Option>
                  <Option>Non-Taxable</Option>
                </Select>
              </div>
            </div>
            {/* Vendor Info end */}

            {/* Vendor Address start */}
            <Typography variant="lead" className="mb-3 font-semibold">
              {" "}
              Address Informatation
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex w-full flex-col gap-4">
                {/* Address 1 */}
                <Input type="text" className="" size="md" label="Address 1" />
                {/* Address 2 */}
                <Input type="text" className="" size="md" label="Address 2" />

                <div className="grid grid-cols-2 gap-2">
                  {/* City name */}
                  <Input type="text" label="City" />
                  {/* State name */}
                  <Input type="text" label="State" />
                  {/* ZIP/PIN code name */}
                  <Input type="number" label="PIN Code" />
                  {/* Country Name*/}
                  <Input type="text" label="Country" />
                </div>
              </div>
            </div>
            {/* Table to have info of contact persons start */}
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Contact Person Information
            </Typography>
            <table className="w-full min-w-[640px] table-auto">
              {/* table header */}
              <thead>
                <tr>
                  {["name", "Contact No.", "email"].map((title) => (
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
                {contactData.map(({ name, phone, email }, key, arr) => {
                  const tdClasses = `py-3 px-5 ${
                    key === arr.length - 1 ? "" : "border-b border-blue-gray-50"
                  }`;
                  return (
                    <tr key={1}>
                      <td className={tdClasses}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={tdClasses}>
                        <Typography className={`text-sm font-medium`}>
                          {phone}
                        </Typography>
                      </td>
                      <td className={tdClasses}>
                        <Typography className="text-sm font-medium">
                          {email}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* Table to have info of contact persons end */}
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleOpen(null)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
