import { useNavigate } from "react-router-dom";

import { EventFormValues } from "@/components/types";
import EventForm from "../components/EventForm";
import { addEvent } from "../services/events";

const CreateEventsPage = () => {
  const navigate = useNavigate();

  const initialValues: EventFormValues = {
    name: "",
    datetime: "",
    description: "",
    expiryTimestamp: null,
    hasExpiry: false,
  };

  const onSubmit = async (values: EventFormValues) => {
    const { hasExpiry, ...valuesToSend } = values;
    const eventId = await addEvent(valuesToSend);
    if (!eventId) {
      alert("Failed to create event");
      return;
    }
    navigate(`/events/${eventId}`);
  };

  return (
    <div>
      <EventForm initialValues={initialValues} onSubmit={onSubmit} />
    </div>
  );
};

export default CreateEventsPage;
