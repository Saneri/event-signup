import { useFormik } from "formik";
import * as yup from "yup";
import { signIn } from "../../auth/auth";
import { AuthenticationError, NewPasswordRequiredError } from "./errors";
import Button from "../common/Button";
import FormError from "../common/FormError";

type Login = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const initialValues: Login = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const submitForm = async (values: Login) => {
    signIn(values.username, values.password)
      .then((user) => {
        alert(JSON.stringify(user));
      })
      .catch((error) => {
        if (error instanceof NewPasswordRequiredError) {
          alert("handle new password required");
        } else if (error instanceof AuthenticationError) {
          alert("handle authentication error");
        }
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
  });

  return (
    <form
      className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={formik.handleSubmit}
    >
      <label className="my-1">Username</label>
      <input
        className="shadow border rounded py-2 px-3 my-1 text-gray-700"
        type="text"
        name="username"
        onChange={formik.handleChange}
      />
      <FormError error={formik.errors.username} />
      <label className="my-1">Password</label>
      <input
        className="shadow border rounded py-2 px-3 my-1 text-gray-700"
        type="password"
        name="password"
        onChange={formik.handleChange}
      />
      <FormError error={formik.errors.password} />
      <Button type="submit">Sign in</Button>
    </form>
  );
};

export default LoginForm;
