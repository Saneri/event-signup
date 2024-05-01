import * as yup from "yup";
import FormError from "../common/FormError";
import { useFormik } from "formik";
import Button from "../common/Button";

const RegisterForm = () => {
  type Register = {
    email: string;
  };

  const initialValues = {
    email: "",
  };

  const validationSchema = yup.object({
    email: yup.string().email().required(),
  });

  const submitForm = async (values: Register) => {
    alert("Registering with email: " + values.email);
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
        <Button className="mt-2" type="submit">
          Create a new account
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
