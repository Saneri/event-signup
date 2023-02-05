import { useLoaderData } from "react-router-dom";
import { Event } from "../components/types";
import { getEvent } from "../services/events";

type Args = {
  params: {
    id: number;
  };
};

export const eventLoader = async (args: Args) => {
  return getEvent(args.params.id);
};

const EventPage = () => {
  const event: Event = useLoaderData() as Event;

  return (
    <div>
      <div>{event.name}</div>
      <br />
      <div>{new Date(event.datetime).toLocaleDateString("FI-fi")}</div>
      <br />
      <div>{event.description}</div>
    </div>
  );
};

export default EventPage;
