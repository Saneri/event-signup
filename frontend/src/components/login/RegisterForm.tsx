import * as yup from "yup";
import FormError from "../common/FormError";
import { useFormik } from "formik";
import Button from "../common/Button";
import { registerNewUser } from "../../auth/auth";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setEmailToConfirm: Dispatch<SetStateAction<string | undefined>>;
};

const RegisterForm = (props: Props) => {
  type Register = {
    email: string;
    newPassword: string;
    repeatNewPassword: string;
    nickname: string;
  };

  const initialValues = {
    email: "",
    nickname: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  const validationSchema = yup.object({
    email: yup.string().email().required(),
    newPassword: yup
      .string()
      .required()
      .min(8, "Password must be at least 8 characters"),
    repeatNewPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
    nickname: yup.string().required(),
  });

  const submitForm = async (values: Register) => {
    try {
      await registerNewUser(values.email, values.newPassword, values.nickname);
      props.setEmailToConfirm(values.email);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
  });

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <label className="my-1">Email address</label>
        <input
          className="shadow border rounded py-2 px-3 my-1 text-gray-700"
          type="email"
          name="email"
          onChange={formik.handleChange}
        />
        <FormError error={formik.errors.email} />
        <label className="my-1">Nickname</label>
        <input
          className="shadow border rounded py-2 px-3 my-1 text-gray-700"
          type="text"
          name="nickname"
          onChange={formik.handleChange}
        />
        <FormError error={formik.errors.nickname} />
        <label className="my-1">Password</label>
        <input
          className="shadow border rounded py-2 px-3 my-1 text-gray-700"
          type="password"
          name="newPassword"
          onChange={formik.handleChange}
        />
        <FormError error={formik.errors.newPassword} />
        <label className="my-1">Enter password again</label>
        <input
          className="shadow border rounded py-2 px-3 my-1 text-gray-700"
          type="password"
          name="repeatNewPassword"
          onChange={formik.handleChange}
        />
        <FormError error={formik.errors.repeatNewPassword} />
        <Button className="mt-2" type="submit">
          Create a new account
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
