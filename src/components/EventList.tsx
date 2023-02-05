import Card from "./common/Card";
import { Event } from "./types";

type Props = {
  events: Event[] | null;
};

const EventList = (props: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {props.events ? (
        props.events.map((event) => <Card key={event.id} event={event}></Card>)
      ) : (
        <h1>no events yet</h1>
      )}
    </div>
  );
};

export default EventList;
