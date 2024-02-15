import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import AttendeeForm from "../components/AttendeeForm";
import AttendeeList from "../components/AttendeeList";
import { Event, Attendee } from "../components/types";
import { getEvent } from "../services/events";
import { getAttendees } from "../services/attendees";
import { formatDateAndTime } from "../utils/date";

type Args = LoaderFunctionArgs<{
  id: string;
}>;

export const eventLoader = async (args: Args): Promise<any> => {
  const id: string | undefined = args.params.id;
  if (!id) {
    return Promise.reject();
  }
  return await Promise.all([getEvent(id), getAttendees(id)]);
};

const EventPage = () => {
  const arr = useLoaderData() as (Event | Attendee[] | null)[];
  const event = arr[0] as Event;
  const participants = arr[1] as Attendee[];
  return (
    <div className="m-8 ">
      <h1 className="text-4xl font-extrabold">{event.name}</h1>
      <br />
      <div>{formatDateAndTime(event.datetime)}</div>
      <br />
      <div>{event.description}</div>
      <br />
      <h2>Attendees</h2>
      <AttendeeList participants={participants} />
      <br />
      <div className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <AttendeeForm />
      </div>
    </div>
  );
};

export default EventPage;
