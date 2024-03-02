import React, { useState } from "react";
import TextInput from "../../common/form/TextInput";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signupValidationSchema } from "../../utils/ValidationSchema";

function SignUpPage() {
  const navigate = useNavigate();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const initialValues = {
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSign = async (values) => {
    try {
      toast.info("Signing up...");

      const response = await fetch(
        "https://mern-backend-kxg8.onrender.com/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        toast.success("User created successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        const errorMessage = await response.text();
        toast.error(`Error creating user: ${errorMessage}`);
      }
    } catch (error) {
      toast.error(`Error creating user: ${error.message}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSign}
        validationSchema={signupValidationSchema}
      >
        {() => (
          <Form className="w-full max-w-md shadow-xl py-10 px-5 bg-white rounded border">
            <h2 className="text-2xl font-semibold mb-4">Signup </h2>
            <div className="">
              <TextInput
                name="firstName"
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                label="First Name"
              />
              <TextInput
                name="email"
                id="email"
                type="email"
                placeholder="Enter your e-mail"
                label="E-mail"
              />
              <TextInput
                name="password"
                id="password"
                type="password"
                placeholder="Enter your password"
                label="Password"
              />
              <TextInput
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                label="Confirm Password"
              />
            </div>
            <div className="flex items-center my-2">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
                className="mr-2"
              />
              <label htmlFor="acceptTerms" className="text-sm">
                I accept the Terms and Conditions
              </label>
            </div>
            <button
              type="submit"
              disabled={!acceptTerms}
              className={`${
                acceptTerms
                  ? "bg-[#428777] w-full text-white px-8 py-2 mt-2 rounded-md focus:outline-none focus:shadow-outline-blue"
                  : "bg-gray-300 w-full text-gray-500 cursor-not-allowed px-8 py-2 mt-2 rounded-md focus:outline-none focus:shadow-outline-blue"
              } flex items-center justify-center`}
            >
              Sign Up
            </button>
            <p className="my-4 text-sm">
              {" Already have an account? "}
              <button
                className="text-blue-500"
                onClick={() => {
                  navigate("/");
                }}
              >
                Log In
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default SignUpPage;
