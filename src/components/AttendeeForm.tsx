import { Formik } from "formik";
import { useState } from "react";
import Button from "./common/Button";

const AttendeeForm = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <div className="text-center">You are attending this event</div>;
  }

  const initialValues = {
    name: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log("submitted ", values);
        setSubmitting(false);
        resetForm();
        setSubmitted(true);
      }}
    >
      {({ handleSubmit, handleChange }) => (
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            className="shadow border rounded py-2 px-3 my-1 text-gray-700"
            name="name"
            onChange={handleChange}
          ></input>
          <Button type="submit">Attend this event</Button>
        </form>
      )}
    </Formik>
  );
};

export default AttendeeForm;
