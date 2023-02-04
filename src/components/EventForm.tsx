import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { addEvent } from "../services/events";
import Button from "./common/Button";

const EventForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    datetime: "",
    description: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        addEvent(values);
        setSubmitting(false);
        resetForm();
        navigate("/");
      }}
    >
      {({ handleSubmit, handleChange }) => (
        <form
          className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <label className="my-1">Event Name</label>
          <input
            className="shadow border rounded py-2 px-3 my-1 text-gray-700"
            type="text"
            name="name"
            onChange={handleChange}
          ></input>
          <label className="my-1">Date and Time</label>
          <input
            className="shadow border rounded py-2 px-3 my-1 text-gray-700"
            type="datetime-local"
            name="datetime"
            onChange={handleChange}
          ></input>
          <label className="my-1">Description</label>
          <textarea
            className="shadow border rounded py-2 px-3 my-1 text-gray-700"
            name="description"
            onChange={handleChange}
          ></textarea>
          <Button type="submit">Submit</Button>
        </form>
      )}
    </Formik>
  );
};

export default EventForm;
