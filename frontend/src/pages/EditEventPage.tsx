import { useLoaderData, useNavigate } from "react-router-dom";

import EventForm from "@/components/EventForm";
import { EventFormValues } from "@/components/types";
import { patchEvent } from "@/services/events";

const EditEventPage = () => {
  const navigate = useNavigate();
  const eventData = useLoaderData()[0] as EventFormValues;

  const submitForm = async (values: EventFormValues) => {
    const { hasExpiry, ...valuesToSend } = values;
    const success = await patchEvent(eventData.id as string, valuesToSend);
    if (!success) {
      alert("Failed to update event");
      return;
    }
    navigate(`/events/${eventData.id}`);
  };

  return <EventForm initialValues={eventData} onSubmit={submitForm} />;
};

export default EditEventPage;
