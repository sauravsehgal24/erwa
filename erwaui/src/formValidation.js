import * as yup from "yup";

// Login Schema
export const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });
  
  // Registration Schema
  export const registerSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Must contain an uppercase letter")
      .matches(/[0-9]/, "Must contain a number")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  export {loginSchema, registerSchema}