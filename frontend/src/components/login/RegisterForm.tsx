import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import * as yup from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerNewUser } from "../../auth/auth";
import FormError from "../common/FormError";

type Props = {
  setEmailToConfirm: Dispatch<SetStateAction<string | undefined>>;
};

const RegisterForm = (props: Props) => {
  type Register = {
    email: string;
    password: string;
    repeatPassword: string;
    nickname: string;
  };

  const initialValues = {
    email: "",
    nickname: "",
    password: "",
    repeatPassword: "",
  };

  const validationSchema = yup.object({
    email: yup.string().email().required("required field"),
    password: yup
      .string()
      .matches(/[A-Z]/, "Must contain an uppercase character")
      .matches(/[a-z]/, "Must contain a lowercase character")
      .matches(/\d/, "Must contain a number")
      .matches(/[!@#\$%\^&\*()\[\]\{\}\?\-"!@#%&\/\\,><':;\|_~`\+=\.]/, "Must contain a symbol")
      .min(8, "Password must be at least 8 characters")

      .required("required field"),
    repeatPassword: yup
      .string()
      .required("required field")
      .oneOf([yup.ref("password")], "Passwords must match"),
    nickname: yup.string().required("required field"),
  });

  const submitForm = async (values: Register) => {
    try {
      await registerNewUser(values.email, values.password, values.nickname);
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
    <div className="bg-white shadow-md rounded-sm px-8 pt-6 pb-8 mb-4">
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <label className="my-1">Email address</label>
        <Input type="email" name="email" onChange={formik.handleChange} />
        <FormError error={formik.errors.email} />
        <label className="my-1">Nickname</label>
        <Input type="text" name="nickname" onChange={formik.handleChange} />
        <FormError error={formik.errors.nickname} />
        <label className="my-1">Password</label>
        <div className="text-xs">
          <div>must contain atleast:</div>
          <div>1 lowercase</div>
          <div>1 uppercase</div>
          <div>1 number</div>
          <div>1 special character</div>
        </div>
        <Input type="password" name="password" onChange={formik.handleChange} />
        <FormError error={formik.errors.password} />
        <label className="my-1">Enter password again</label>
        <Input type="password" name="repeatPassword" onChange={formik.handleChange} />
        <FormError error={formik.errors.repeatPassword} />
        <Button className="mt-2" type="submit">
          Create a new account
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
