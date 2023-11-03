import * as Yup from "yup";

export const RegisterSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is Required").email("Email not valid"),
  password: Yup.string().required("password is required"),
});
export const LoginSchema = Yup.object({
  email: Yup.string().required("Email is Required").email("Email not valid"),
  password: Yup.string().required("password is required"),
});
