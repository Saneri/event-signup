import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { signIn } from "../../auth/auth";
import { useUser } from "../../providers/UserProvider";
import FormError from "../common/FormError";
import { AuthenticationError } from "./errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      await signIn(values.username, values.password);
      await fetchUser();
      navigate("/");
    } catch (error) {
      if (error instanceof AuthenticationError) {
        alert("Incorrect username or password, please try again");
      } else {
        alert("unknown login error");
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
        <Input type="text" name="username" onChange={formik.handleChange} />
        <FormError error={formik.errors.username} />
        <label className="my-1">Password</label>
        <Input type="password" name="password" onChange={formik.handleChange} />
        <FormError error={formik.errors.password} />
        <Button className="mt-2" type="submit">
          Sign in
        </Button>
      </form>
      <Button className="mt-2" onClick={() => navigate("/register")}>
        Register
      </Button>
    </div>
  );
};

export default LoginForm;
