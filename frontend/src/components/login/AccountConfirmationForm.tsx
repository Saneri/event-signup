import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { confirmRegistration } from "../../auth/auth";
import FormError from "../common/FormError";

type Props = {
  emailToConfirm: string;
};

const AccountConfirmationForm = (props: Props) => {
  const { emailToConfirm } = props;

  const navigate = useNavigate();

  type Confirmation = {
    code: string;
  };

  const initialValues = {
    code: "",
  };

  const validationSchema = yup.object({
    code: yup.string().required(),
  });

  const submitForm = async (values: Confirmation) => {
    try {
      await confirmRegistration(emailToConfirm, values.code);
      navigate("/login");
    } catch (error) {
      alert((error as Error).message || JSON.stringify(error));
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
        <label className="my-1">Confirmation code</label>
        <Input type="text" name="code" onChange={formik.handleChange} />
        <FormError error={formik.errors.code} />
        <Button className="mt-2" type="submit">
          Confirm email
        </Button>
      </form>
    </div>
  );
};

export default AccountConfirmationForm;
