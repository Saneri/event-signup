import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import EventCard from "./common/EventCard";
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
    <div>
      <Switch
        id="show-past-events"
        checked={showPastEvents}
        onCheckedChange={() => setShowPastEvents(!showPastEvents)}
      />
      <Label htmlFor="show-past-events">Show past events</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents
          .sort((a, b) => b.datetime.localeCompare(a.datetime))
          .map((event) => (
            <EventCard key={event.id} event={event}></EventCard>
          ))}
      </div>
    </div>
  );
};

export default EventList;
