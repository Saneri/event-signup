import { useState } from "react";
import Card from "./common/Card";
import Toggle from "./common/Toggle";
import { Event } from "./types";

type Props = {
  events: Event[];
};

const EventList = (props: Props) => {
  const now = new Date().toISOString();
  const [showPastEvents, setShowPastEvents] = useState<boolean>(false);

  const filteredEvents = showPastEvents
    ? props.events
    : props.events.filter((event) => event.datetime >= now);

  return (
    <>
      <Toggle
        title="Show past events"
        isOn={showPastEvents}
        onToggle={() => setShowPastEvents(!showPastEvents)}
      />
      <div className="flex flex-wrap justify-center gap-4">
        {filteredEvents
          .sort((a, b) => b.datetime.localeCompare(a.datetime))
          .map((event) => (
            <Card key={event.id} event={event}></Card>
          ))}
      </div>
    </>
  );
};

export default EventList;
