import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addEvent } from "../services/events";
import Button from "./common/Button";
import FormError from "./common/FormError";
import { Event } from "./types";

const EventForm = () => {
  const navigate = useNavigate();

  const initialValues: Event = {
    name: "",
    datetime: "",
    description: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required().min(3),
    datetime: yup.string().required(),
  });

  const submitForm = (values: Event) => {
    addEvent(values);
    formik.resetForm();
    navigate("/");
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
      <label className="my-1">Event Name</label>
      <input
        className="shadow border rounded py-2 px-3 my-1 text-gray-700"
        type="text"
        name="name"
        onChange={formik.handleChange}
      />
      <FormError error={formik.errors.name} />
      <label className="my-1">Date and Time</label>
      <input
        className="shadow border rounded py-2 px-3 my-1 text-gray-700"
        type="datetime-local"
        name="datetime"
        onChange={formik.handleChange}
      />
      <FormError error={formik.errors.datetime} />
      <label className="my-1">Description</label>
      <textarea
        className="shadow border rounded py-2 px-3 my-1 text-gray-700"
        name="description"
        onChange={formik.handleChange}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default EventForm;
