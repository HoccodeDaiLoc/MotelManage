import * as yup from "yup";
const basicSchema = yup.object().shape({
  username: yup
    .string()
    .min(5)
    .max(50)
    .required("ít nhất 5 kí tự, nhiều nhất 50 kí tự"),
  email: yup
    .string()
    .email("cần nhập email đúng định dạng")
    .required("cần nhập email đúng định dạng"),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required("ít nhất 5 kí tự, nhiều nhất 50 kí tự"),
});

const Loggin = yup.object().shape({
  username: yup
    .string()
    .min(5)
    .max(50)
    .required("ít nhất 5 kí tự, nhiều nhất 50 kí tự"),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required("ít nhất 5 kí tự, nhiều nhất 50 kí tự"),
});

const UpdatePass = yup.object().shape({
  password: yup.string().min(5).required("Required"),
  newPassword: yup
    .string()
    .min(5)
    .required("Required")
    .notOneOf(
      [yup.ref("password")],
      "New password cannot be the same as current password"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});

export { basicSchema, Loggin, UpdatePass };
