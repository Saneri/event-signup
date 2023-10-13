import Card from "./common/Card";
import { Event } from "./types";

type Props = {
  events: Event[];
};

const EventList = (props: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {props.events
        .sort((a, b) => a.datetime.localeCompare(b.datetime))
        .map((event) => (
          <Card key={event.id} event={event}></Card>
        ))}
    </div>
  );
};

export default EventList;
