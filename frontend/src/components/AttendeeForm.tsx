import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Button from "./common/Button";
import FormError from "./common/FormError";

const AttendeeForm = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <div className="text-center">You are attending this event</div>;
  }

  const initialValues = {
    name: "",
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required()
      .min(3)
      .matches(/^[A-Za-z\s\-\'\.]*$/, "only letters allowed"),
  });

  const submitForm = () => {
    setSubmitted(true);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => console.log(JSON.stringify(values, null, 2)),
  });

  return (
    <form className="flex flex-col" onSubmit={formik.handleSubmit}>
      <label>Name</label>
      <input
        className="shadow border rounded py-2 px-3 my-1 text-gray-700"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
      ></input>
      <Button type="submit">Attend this event</Button>
      <FormError error={formik.errors.name} />
    </form>
  );
};

export default AttendeeForm;
