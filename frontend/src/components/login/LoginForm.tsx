import { useFormik } from "formik";
import * as yup from "yup";
import { signIn } from "../../auth/auth";
import { AuthenticationError } from "./errors";
import Button from "../common/Button";
import FormError from "../common/FormError";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../providers/UserProvider";

type Login = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const { fetchUser } = useUser();

  const initialValues: Login = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const submitForm = async (values: Login) => {
    try {
      const signInOutcome = await signIn(values.username, values.password);
      if (signInOutcome.newPasswordRequired) {
        navigate("/finish-signup", {
          state: { username: values.username },
        });
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AuthenticationError) {
        alert("Incorrect username or password, please try again");
      } else {
        alert("unknown error");
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
  });

  return (
    <div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
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
    </div>
  );
};

export default LoginForm;
