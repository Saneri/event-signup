import { Link } from "react-router-dom";
import { formatDateAndTime } from "../../utils/date";
import { Event } from "../types";
import { Button } from "@/components/ui/button";

type Props = {
  event: Event;
};

const Card = (props: Props) => {
  const { id, name, datetime } = props.event;

  return (
    <div className="flex flex-col justify-between p-4 bg-gray-200 rounded shadow w-96">
      <div>
        <div className="text-xl font-bold">{name}</div>
        <div>
          <b>Time:</b> {formatDateAndTime(datetime)}
        </div>
      </div>
      <div className="mt-10">
        <Link to={`/events/${id}`}>
          <Button>Show</Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
