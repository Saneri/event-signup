import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import EventList from "../components/EventList";
import { getEvents } from "../services/events";
import { useUser } from "../providers/UserProvider";
import Button from "../components/common/Button";
import { useEffect, useState } from "react";

const BrowseEventsPage = () => {
  const { session } = useUser();
  const [sessionToken, setSessionToken] = useState(
    session?.getAccessToken().getJwtToken()
  );

  const { isLoading, error, data } = useQuery(["event", sessionToken], () => {
    return getEvents(sessionToken ?? "");
  });

  useEffect(() => {
    setSessionToken(session?.getAccessToken().getJwtToken());
  }, [session]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred</div>;

  return (
    <div>
      <Link className="flex justify-center my-10" to="/create">
        <Button>Create new event</Button>
      </Link>
      {data == null ? <h1>No Events yet</h1> : <EventList events={data} />}
    </div>
  );
};

export default BrowseEventsPage;
