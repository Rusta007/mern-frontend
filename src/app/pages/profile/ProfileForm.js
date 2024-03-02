import React, { useState } from "react";
import { Form, Formik } from "formik";
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import { profileValidationSchema } from "../../utils/ValidationSchema";
import { FiEdit } from "react-icons/fi";
import TextInput from "../../common/form/TextInput";
import RadioButton from "../../common/form/RadioButton";
import ProfileUpdated from "./ProfileUpdated";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfileForm({ handleToggle }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(true);
  const [profileUpdated, setProfileUpdated] = useState(false);

  const initialValues = {
    firstName: "",
    email: localStorage.getItem("email") || "",
    age: "",
    mobileNo: "",
    dob: "",
    gender: "",
  };

  const handleProfile = async (values) => {
    try {
      toast.info("Updating...");
      const response = await fetch(
        "https://mern-backend-kxg8.onrender.com/profile/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        // console.log("Profile created successfully");

        setIsEditing(false);
        setProfileUpdated(true);
        handleToggle();
        toast.success("Profile updated successfully");

      } else {
        console.error("Error updating profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        onSubmit={handleProfile}
        validationSchema={profileValidationSchema}
      >
        {() => (
          <Form className="w-full max-w-md shadow-xl px-5 mt-5 bg-white rounded border">
            {profileUpdated ? (
              <ProfileUpdated navigateToProfile={navigate} />
            ) : (
              <>
                <h2 className="text-2xl font-semibold my-4">Profile </h2>
                <div className="">
                  <TextInput
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    label="First Name"
                    disabled={!isEditing}
                  />
                  <TextInput
                    name="email"
                    type="email"
                    placeholder="Enter your e-mail"
                    label="E-mail"
                    disabled={true}
                  />
                  <TextInput
                    name="age"
                    type="number"
                    placeholder="Enter your age"
                    label="Age"
                    disabled={!isEditing}
                  />
                  <TextInput
                    name="mobileNo"
                    type="text"
                    placeholder="Enter your Mobile No."
                    label="Mobile No."
                    disabled={!isEditing}
                  />
                  <TextInput
                    name="dob"
                    type="date"
                    placeholder="Enter your dob"
                    label="Dob"
                    disabled={!isEditing}
                  />
                  <RadioButton name="gender" />
                </div>
                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="bg-[#428777] text-white px-8 py-2 my-4 rounded-md focus:outline-none focus:shadow-outline-blue"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={handleToggle}
                    className="text-[#428777] hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProfileForm;
