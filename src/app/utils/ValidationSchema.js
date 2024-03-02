import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const signupValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const profileValidationSchema = Yup.object({
  firstName: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  age: Yup.number()
    .positive("Age must be a positive number")
    .required("Age is required"),
  dob: Yup.date()
    .required("Date of Birth is required")
    .test("is-valid-date", "Please select a date not above 2023", (value) => {
      const selectedDate = new Date(value);
      const maxYear = 2023;
      const selectedYear = selectedDate.getFullYear();
      return selectedYear <= maxYear;
    }),
  mobileNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  gender: Yup.string().required("Please select a gender"),
});
