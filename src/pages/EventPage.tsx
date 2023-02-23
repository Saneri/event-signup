import { useLoaderData } from "react-router-dom";
import AttendeeList from "../components/AttendeeList";
import { Event, Participant } from "../components/types";
import { getEvent } from "../services/events";
import { getParicipants } from "../services/participants";

type Args = {
  params: {
    id: number;
  };
};

export const eventLoader = async (args: Args): Promise<any> => {
  const id: number = args.params.id;
  return await Promise.all([getEvent(id), getParicipants(id)]);
};

const EventPage = () => {
  const arr = useLoaderData() as (Event | Participant[] | null)[];
  const event = arr[0] as Event;
  const participants = arr[1] as Participant[];
  return (
    <div>
      <div>{event.name}</div>
      <br />
      <div>{new Date(event.datetime).toLocaleDateString("FI-fi")}</div>
      <br />
      <div>{event.description}</div>
      <br />
      <h2>Attendees</h2>
      <AttendeeList participants={participants} />
    </div>
  );
};

export default EventPage;
