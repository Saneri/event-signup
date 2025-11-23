import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateAndTime } from "../../utils/date";
import { Event } from "../types";

type Props = {
  event: Event;
};

const EventCard = (props: Props) => {
  const { id, name, datetime } = props.event;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-5 w-5" />
            <span>{formatDateAndTime(datetime)}</span>
          </div>
          <div>
            <Link to={`/events/${id}`}>
              <Button>Show</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
