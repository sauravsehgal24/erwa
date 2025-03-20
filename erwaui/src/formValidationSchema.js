import * as yup from "yup";

// Login Schema
const signInSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  
  // Registration Schema
  const signUpSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    full_name:yup.string().required("Full Name is required"),
    job:yup.string().required("Job is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Must contain an uppercase letter")
      .matches(/[0-9]/, "Must contain a number")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  export {signInSchema, signUpSchema}