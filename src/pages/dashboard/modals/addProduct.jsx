import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";


export default function addProduct(props) {
  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);

  return (
    <Fragment>
     
      <div className="flex gap-3">
        <Button onClick={() => handleOpen("lg")} variant="gradient" color="white" class="text-sm sm:text-base bg-black">
          Add Product +
        </Button>
      </div>
      <Dialog open={size === "lg"} size={size || "lg"} handler={handleOpen}>
        <DialogHeader>Add a new product</DialogHeader>
        <DialogBody divider className="flex flex-row flex-wrap sm:flex-nowrap overflow-y-scroll">
          {/* <div className="px-5 py-2 flex flex-row flex-wrap  gap-y-2 justify-between min-w-[640px]"> */}
            <div className="w-1/2 flex-col justify-start items-start p-2">
            <Input color="purple" label="Input Purple" />
            <Input color="purple" label="Input Purple" />
            </div>
            <div className="w-1/2 flex-col justify-start items-start p-2">
            <Input color="purple" label="Input Purple" className="my-2" />
            <Input color="purple" label="Input Purple" className="my-2"/>
            </div>
          {/* </div> */}
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
