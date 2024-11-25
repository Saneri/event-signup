import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import EventList from "../components/EventList";
import { getEvents } from "../services/events";
import { Button } from "@/components/ui/button";

const BrowseEventsPage = () => {
  const { isLoading, error, data } = useQuery("event", () => {
    return getEvents();
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred</div>;

  return (
    <div>
      <Link className="flex justify-center my-10" to="/create">
        <Button>Create new event</Button>
      </Link>
      {data == null || !data.length ? (
        <h1>No Events yet</h1>
      ) : (
        <EventList events={data} />
      )}
    </div>
  );
};

export default BrowseEventsPage;
