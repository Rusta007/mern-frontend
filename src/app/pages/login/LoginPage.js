import React, { useState } from "react";
import { Form, Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextInput from "../../common/form/TextInput";
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../../utils/ValidationSchema";

function LoginPage() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (values) => {
    try {
      toast.info("Logging in...");
      const response = await fetch(
        "https://mern-backend-kxg8.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("email", values.email);
        toast.success("Login Successful");
        setTimeout(() => {
          navigate("/profile");
        }, 1000); 
      } else {
        const error = await response.json();
        toast.error(`${error.message}`);
      }
    } catch (error) {
      // console.error("Authentication failed:", error.message);
      toast.error("Authentication failed");
    }
  };

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validationSchema={loginValidationSchema}
      >
        {() => (
          <Form className="w-full max-w-md shadow-xl py-10 px-5 bg-white rounded border">
            <h2 className="text-2xl font-semibold mb-4">
              Welcome to Login Page
            </h2>
            <div className="">
              <TextInput
                name="email"
                id="email"
                placeholder="Enter your e-mail"
                label="E-mail"
                type="email"
              />
              <TextInput
                name="password"
                id="password"
                type="password"
                placeholder="Enter your password"
                label="Password"
              />
            </div>

            <button
              type="submit"
              className="bg-[#428777] text-white px-10 py-2 my-3 rounded-md focus:outline-none focus:shadow-outline-blue w-full"
            >
              Log In
            </button>

            <p className="mt-4 ml-2 text-sm">
              {"Don't have an account? "}
              <button
                className="text-blue-500"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default LoginPage;
