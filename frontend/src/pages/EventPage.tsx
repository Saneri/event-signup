import { useState } from "react";
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";

import InvitationLink from "@/components/InvitationLink";
import { Button } from "@/components/ui/button";
import AttendeeList from "../components/AttendeeList";
import AttendingControls from "../components/AttendingControls";
import { Attendee, EventDetails } from "../components/types";
import { getAttendees } from "../services/attendees";
import { getEvent } from "../services/events";
import { formatDateAndTime } from "../utils/date";

type Args = LoaderFunctionArgs<{
  id: string;
}>;

export const eventLoader = async (args: Args): Promise<any> => {
  const id: string | undefined = args.params.id;
  if (!id) {
    return Promise.reject();
  }
  // access key (or invitation link) for users who are not yet part of the event
  const key = new URL(args.request.url).searchParams.get("key");

  return await Promise.all([getEvent(id, key), getAttendees(id), id]);
};

const EventPage = () => {
  const arr = useLoaderData() as (EventDetails | Attendee[] | string | null)[];
  const event = arr[0] as EventDetails;
  const [participants, setParticipants] = useState(arr[1] as Attendee[]);
  const eventId = arr[2] as string;
  const navigate = useNavigate();

  const refreshParticipants = async (): Promise<void> => {
    const newParticipants = await getAttendees(eventId);
    setParticipants(newParticipants ?? []);
  };

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
      {event.admin && (
        <div className="flex flex-col gap-2">
          <h2>Admin section</h2>
          {event.invitationKey && <InvitationLink invitationKey={event.invitationKey} />}
          <Button className="w-fit" onClick={() => navigate(`/events/${eventId}/edit`)}>
            Edit event
          </Button>
        </div>
      )}
      <br />
      <div className=" bg-white shadow-md rounded-sm px-8 pt-6 pb-8 mb-4">
        <AttendingControls onAttendingChange={refreshParticipants} eventId={eventId} />
      </div>
    </div>
  );
};

export default EventPage;
