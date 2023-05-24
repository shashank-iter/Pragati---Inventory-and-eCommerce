import {
  Card,
  Input,
  Textarea,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import supabase from "../auth/supabaseClient";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import swal from "sweetalert";
export function Profile() {
  useEffect(() => {
    if (!Cookies.get("token")) {
      window.location.href = "/auth/sign-in";
    }
  });

  const [formData, setFormData] = useState({
    // productType: "",
    // taxType: "",
  });

  const [profileData, setProfileData] = useState({});
  async function getProfileData() {
    const { data, error } = await supabase.from("profiles").select("*");
    Cookies.set("gstNumber", data[0].profileData.gstNumber);
    return data;
  }

  useEffect(() => {
    // setIsLoading(true);
    async function fetchProductData() {
      const fetchedData = await getProfileData();
      // console.log("🚀 ~ fetchProductData ~ fetchedData:", fetchedData);
      setFormData(fetchedData[0].profileData);
      console.log(formData);
      console.log("🚀 ~ fetchProductData ~ fetchedData:");

      // map over the data print individual product data
      // productData.map((item, index) => {
      //   // console.log(item.product_info.productName);
      // });

      // setIsLoading(false);
    }
    fetchProductData();
  }, []);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const dataToBeSent = {
    businessName: formData.businessName,
    businessAddress: formData.businessAddress,
    businessPhone: formData.businessPhone,
    businessEmail: formData.businessEmail,
    businessWebsite: formData.businessWebsite,
    gstNumber: formData.gstNumber,
    cinNumber: formData.cinNumber,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("profiles")
        .upsert(
          { user_id: Cookies.get("uid"), profileData: dataToBeSent },
          { onConflict: "user_id" }
        )
        .select();

      if (error) throw error;
      else {
        swal({
          title: "Profile Updated!",
          text: "Profile has been updated successfully!",
          icon: "success",
          button: "OK",
        });
      }
      // Reset the form data after the alert
    } catch (error) {
      console.log(error);
      swal({
        title: "Error!",
        text: "There was some error in updating the profile. Please try again or contact support.",
        icon: "error",
        button: "OK",
      });
    }
  };

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/user.png"
                alt="bruce-mars"
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {Cookies.get("name")}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {Cookies.get("email")}
                </Typography>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-4 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div className="flex flex-col gap-4">
              <Input
                className=""
                size="md"
                label="Business Name"
                name="businessName"
                onChange={handleChange}
                value={formData.businessName}
              />
              <Input
                className=""
                size="md"
                label="GST Number"
                name="gstNumber"
                onChange={handleChange}
                value={formData.gstNumber}
              />
              <Textarea
                className=""
                label="Business Address"
                name="businessAddress"
                onChange={handleChange}
                value={formData.businessAddress}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                className=""
                size="md"
                label="Business Phone"
                type="number"
                name="businessPhone"
                onChange={handleChange}
                value={formData.businessPhone}
              />
              <Input
                className=""
                size="md"
                label="CIN Number"
                name="cinNumber"
                onChange={handleChange}
                value={formData.cinNumber}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                className=""
                size="md"
                label="Business Email"
                name="businessEmail"
                onChange={handleChange}
                value={formData.businessEmail}
              />

              <Input
                className=""
                size="md"
                label="Business Website"
                name="businessWebsite"
                onChange={handleChange}
                value={formData.businessWebsite}
              />
            </div>
          </div>
          <div className="px-4 pb-4">
            <Button
              variant="gradient"
              color="white"
              className="sm:text-b bg-blue-400 text-sm"
              onClick={handleSubmit}
            >
              Update Profile
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
