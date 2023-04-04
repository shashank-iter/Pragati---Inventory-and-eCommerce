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
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Product } from "..";

export default function AddProduct() {
  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);

  return (
    <Fragment>
      <div className="flex gap-3">
        <Button
          onClick={() => handleOpen("xxl")}
          variant="gradient"
          color="white"
          class="bg-black text-sm sm:text-base"
        >
          Add Product +
        </Button>
      </div>
      <Dialog open={size === "xxl"} size={size || "xxl"} handler={handleOpen}>
        <DialogHeader>Add a new product</DialogHeader>
        <DialogBody divider className=" overflow-y-scroll ">
          <form className="my-2 w-full  md:mx-10  ">
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Product Information
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Input className="" size="md" label="Product Name" />
                <Input
                  className="cursor-pointer"
                  size="md"
                  label="Upload Product Image"
                  type="file"
                  icon={<ArrowUpTrayIcon />}
                />
              </div>
              <div className=" mb-2 flex flex-col gap-4 md:w-1/2">
                <Select label="Choose Product Type" className="flex-col ">
                  <Option>Goods</Option>
                  <Option>Service</Option>
                </Select>
                <Select label="Choose Tax Type" className="flex-col ">
                  <Option>Taxable</Option>
                  <Option>Non-Taxable</Option>
                </Select>
              </div>
            </div>
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Tax Rates
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Select label="CGST" className="flex-col ">
                  <Option defaultChecked value="5">
                    5%
                  </Option>
                  <Option value="12">12%</Option>
                  <Option value="18">18%</Option>
                  <Option value="18">28%</Option>
                </Select>
              </div>
              <div className=" mb-2 flex flex-col gap-4 md:w-1/2">
                <Select label="SGST" className="flex-col ">
                  <Option defaultChecked value="5">
                    5%
                  </Option>
                  <Option value="12">12%</Option>
                  <Option value="18">18%</Option>
                  <Option value="18">28%</Option>
                </Select>
              </div>
            </div>
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Additional Information
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Input className="" size="md" label="Dimensions (LxBxH)" />
                <Input className="" size="md" label="Manufacturer" />
                <Input className="" size="md" label="EAN" />
                <Input className="" size="md" label="MPN" />
              </div>
              <div className=" mb-2 flex flex-col gap-4 md:w-1/2">
                <Input className="" size="md" label="Weight" />
                <Input className="" size="md" label="Brand" />
                <Input className="" size="md" label="ISBN" />
                <Input className="" size="md" label="UPC" />
              </div>
            </div>
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Sales Information
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Input className="" size="md" label="Selling Price" />
                <Input className="" size="md" label="Description" />
              </div>
              <div className=" mb-2 flex flex-col gap-4 md:w-1/2">
                <Input className="" size="md" label="Cost Price" />
              </div>
            </div>
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Inventory Details
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Input className="" size="md" label="Opening Stock" />
                <Input className="" size="md" label="Reorder Point" />
              </div>
              <div className=" mb-6 flex flex-col gap-4 md:w-1/2">
                <Select label="Vendor" className="flex-col ">
                  <Option>Chindi Baniya</Option>
                  <Option>Samosa Chor</Option>
                  <Option>Pani Doodhwala</Option>
                </Select>
              </div>
            </div>
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
