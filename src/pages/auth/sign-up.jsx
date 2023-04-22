import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import supabase from "./supabaseClient";

export function SignUp() {
  // Initializing formData state with name, email and password fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Function to handle sign up when form is submitted
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Using supabase to sign up with email and password
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            Name: formData.name,
          },
        },
      });
      // Alerting the user's role
      alert(data.user.role);
      console.log(data, error);
    } catch (error) {
      // Alerting the error message
      alert(error.error_description || error.message);
    }
  };

  // Function to handle changes in form input fields
  function handleChange(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <>
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <form>
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              {/* Sign Up title */}
              <Typography variant="h3" color="white">
                Sign Up
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              {/* Name input field */}
              <Input
                label="Name"
                size="lg"
                name="name"
                onChange={handleChange}
              />
              {/* Email input field */}
              <Input
                type="email"
                label="Email"
                size="lg"
                name="email"
                onChange={handleChange}
              />
              {/* Password input field */}
              <Input
                type="password"
                label="Password"
                name="password"
                size="lg"
                onChange={handleChange}
              />
              {/* Terms and Conditions checkbox */}
              <div className="-ml-2.5">
                <Checkbox label="I agree the Terms and Conditions" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              {/* Sign Up button */}
              <Button variant="gradient" fullWidth onClick={handleSignUp}>
                Sign Up
              </Button>
              {/* Sign in link */}
              <Typography variant="small" className="mt-6 flex justify-center">
                Already have an account?
                <Link to="/auth/sign-in">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign in
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}

export default SignUp;
