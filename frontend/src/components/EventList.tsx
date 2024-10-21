import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import Card from "./common/Card";
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
      <div className="flex flex-wrap justify-center gap-4">
        {filteredEvents
          .sort((a, b) => b.datetime.localeCompare(a.datetime))
          .map((event) => (
            <Card key={event.id} event={event}></Card>
          ))}
      </div>
    </div>
  );
};

export default EventList;
