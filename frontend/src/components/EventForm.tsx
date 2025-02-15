import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addEvent } from "../services/events";
import FormError from "./common/FormError";
import { EventFormValues } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const isNotInThePast = (value: string) => {
  const selectedDatetime = new Date(value);
  const currentDatetime = new Date();
  return selectedDatetime >= currentDatetime;
};

const EventForm = () => {
  const navigate = useNavigate();

  const initialValues: EventFormValues = {
    name: "",
    datetime: "",
    description: "",
    expiryTimestamp: null,
    hasExpiry: false,
  };

  const validationSchema = yup.object({
    name: yup.string().required().min(3),
    datetime: yup
      .string()
      .required()
      .test(
        "is-not-in-the-past",
        "The date and time cannot be in the past",
        isNotInThePast
      ),
  });

  const submitForm = async (values: EventFormValues) => {
    const { hasExpiry, ...valuesToSend } = values;
    const eventId = await addEvent(valuesToSend);
    if (!eventId) {
      alert("Failed to create event");
      return;
    }
    formik.resetForm();
    navigate(`/events/${eventId}`);
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
      <Input
        className="shadow border rounded py-2 px-3 my-1 text-gray-700"
        type="text"
        name="name"
        onChange={formik.handleChange}
      />
      <FormError error={formik.errors.name} />
      <label className="my-1">Date and Time</label>
      <Input
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
      <br />
      <div></div>
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          name="hasExpiry"
          onChange={formik.handleChange}
        />
        <label className="my-1">Add link expiration</label>
      </div>
      {formik.values.hasExpiry && (
        <Input
          type="datetime-local"
          name="expiryTimestamp"
          onChange={formik.handleChange}
        />
      )}
      <Button className="mt-4" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default EventForm;
