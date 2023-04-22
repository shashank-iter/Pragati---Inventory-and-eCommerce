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
import supabase from "./supabaseClient";
import { useState } from "react";

export function SignIn() {
  // Initializing formData state with email and password fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Function to handle sign in when form is submitted
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Using supabase to sign in with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
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
  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };
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
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            {/* Sign In title */}
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            {/* Email input field */}
            <Input
              type="email"
              label="Email"
              name="email"
              onChange={handleChange}
              size="lg"
            />
            {/* Password input field */}
            <Input
              type="password"
              label="Password"
              name="password"
              onChange={handleChange}
              size="lg"
            />
            {/* Remember Me checkbox */}
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            {/* Sign In button */}
            <Button variant="gradient" fullWidth onClick={handleSignIn}>
              Sign In
            </Button>
            {/* Sign up link */}
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
