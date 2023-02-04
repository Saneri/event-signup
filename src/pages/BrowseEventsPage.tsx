import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import EventList from "../components/EventList";
import { getEvents } from "../services/events";

const BrowseEventsPage = () => {
  const { isLoading, error, data } = useQuery("event", getEvents);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred</div>;

  return (
    <div>
      <Link className="flex justify-center" to="/create">
        <button className="shadow border rounded py-2 px-3 my-10 bg-indigo-500 text-white hover:bg-indigo-600 hover:shadow-md active:bg-indigo-700 active:shadow-md transition duration-150 ease-in-out">
          Create new event
        </button>
      </Link>
      <EventList events={data} />
    </div>
  );
};

export default BrowseEventsPage;
