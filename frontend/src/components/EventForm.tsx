import { useFormik } from "formik";
import * as yup from "yup";
import FormError from "./common/FormError";
import { EventFormValues } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const isNotInThePast = (value: string) => {
  const selectedDatetime = new Date(value);
  const currentDatetime = new Date();
  return selectedDatetime >= currentDatetime;
};

type EventFormProps = {
  initialValues: EventFormValues;
  onSubmit: (values: EventFormValues) => Promise<void>;
};

const EventForm = (props: EventFormProps) => {
  const { initialValues, onSubmit } = props;

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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: onSubmit,
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
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <FormError error={formik.errors.name} />
      <label className="my-1">Date and Time</label>
      <Input
        className="shadow border rounded py-2 px-3 my-1 text-gray-700"
        type="datetime-local"
        name="datetime"
        value={formik.values.datetime}
        onChange={formik.handleChange}
      />
      <FormError error={formik.errors.datetime} />
      <label className="my-1">Description</label>
      <textarea
        className="shadow border rounded py-2 px-3 my-1 text-gray-700"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
      />
      <br />
      <div></div>
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          name="hasExpiry"
          checked={formik.values.hasExpiry}
          onChange={formik.handleChange}
        />
        <label className="my-1">Add link expiration</label>
      </div>
      {formik.values.hasExpiry && (
        <Input
          type="datetime-local"
          name="expiryTimestamp"
          value={formik.values.expiryTimestamp ?? undefined}
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
