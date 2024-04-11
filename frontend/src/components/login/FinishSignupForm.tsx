import { useFormik } from "formik";
import * as yup from "yup";
import { completeNewPasswordChallenge } from "../../auth/auth";
import Button from "../common/Button";
import FormError from "../common/FormError";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../providers/UserProvider";

type FinishSignup = {
  newPassword: string;
  repeatNewPassword: string;
  nickname: string;
};

const FinishSignupForm = () => {
  const navigate = useNavigate();
  const { fetchUser } = useUser();

  const initialValues: FinishSignup = {
    newPassword: "",
    repeatNewPassword: "",
    nickname: "",
  };

  const validationSchema = yup.object({
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

  const submitForm = async (values: FinishSignup) => {
    await completeNewPasswordChallenge(
      values.newPassword,
      values.nickname
    ).catch((err) => alert("error: " + JSON.stringify(err)));
    fetchUser();
    navigate("/");
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
  });

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <label className="my-1">New password</label>
        <input
          className="shadow border rounded py-2 px-3 my-1 text-gray-700"
          type="password"
          name="newPassword"
          onChange={formik.handleChange}
        />
        <FormError error={formik.errors.newPassword} />
        <label className="my-1">Enter new password again</label>
        <input
          className="shadow border rounded py-2 px-3 my-1 text-gray-700"
          type="password"
          name="repeatNewPassword"
          onChange={formik.handleChange}
        />
        <FormError error={formik.errors.repeatNewPassword} />
        <label className="my-1">Nickname</label>
        <input
          className="shadow border rounded py-2 px-3 my-1 text-gray-700"
          type="text"
          name="nickname"
          onChange={formik.handleChange}
        />
        <FormError error={formik.errors.nickname} />
        <Button type="submit">Sign in</Button>
      </form>
    </div>
  );
};

export default FinishSignupForm;
