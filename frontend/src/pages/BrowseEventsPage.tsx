import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import EventList from "../components/EventList";
import { getEvents } from "../services/events";

const BrowseEventsPage = () => {
  const { isLoading, error, data } = useQuery("event", getEvents);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred</div>;

  return (
    <div className="flex flex-col gap-4">
      <Link className="flex justify-left" to="/create">
        <Button>Create event</Button>
      </Link>
      {data == null || !data.length ? <h1>No Events yet</h1> : <EventList events={data} />}
    </div>
  );
};

export default BrowseEventsPage;
