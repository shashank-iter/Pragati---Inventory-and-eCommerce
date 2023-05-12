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
  const [taxPreference, setTaxPreference] = useState(null);

  const handleTaxPreferenceChange = (value) => {
    console.log(value);
    setTaxPreference(value);
  };

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
          className="bg-white text-sm sm:text-base"
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
                <Select
                  label="Tax Preference"
                  value={taxPreference}
                  onChange={handleTaxPreferenceChange}
                >
                  <Option value="Taxable">Taxable</Option>
                  <Option value="Non-Taxable">Non-Taxable</Option>
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
            <table className="mb-4 w-full min-w-[640px] table-auto border-collapse">
              {/* table header */}
              <thead>
                <tr>
                  {["name", "Contact No.", "email"].map((title) => (
                    <th
                      key={title}
                      className="border-b border-blue-gray-50 bg-gray-200 py-3 px-5 text-left"
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
                {/* {contactData.map(({ name, phone, email }, key, arr) => {
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
                })} */}

                {/* Map over an array of two elements [1, 2] and return a table row for each element */}
                {[1, 2].map((row) => (
                  // Set the key of the row to the current element being mapped over
                  <tr key={row} className="">
                    <td className=" border border-gray-300">
                      {/* Create an input field for text */}
                      <input
                        className="w-full text-gray-900 focus-visible:outline-none focus-visible:ring-1"
                        type="text"
                        name=""
                        id=""
                      />
                    </td>
                    <td className=" border border-gray-300">
                      {/* Create an input field for numbers */}
                      <input
                        className="w-full text-gray-900 focus-visible:outline-none focus-visible:ring-1"
                        type="number"
                        name=""
                        id=""
                      />
                    </td>
                    <td className=" border border-gray-300">
                      {/* Create an input field for email addresses */}
                      <input
                        className="w-full text-gray-900 focus-visible:outline-none focus-visible:ring-1"
                        type="email"
                        name=""
                        id=""
                      />
                    </td>
                  </tr>
                ))}
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
