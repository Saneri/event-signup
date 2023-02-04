import { Link } from "react-router-dom";
import { Event } from "../types";
import Button from "./Button";

type Props = {
  event: Event;
};
const Card = (props: Props) => {
  const { id, name, datetime } = props.event;
  const date = new Date(datetime.toString());

  return (
    <div className="flex flex-col justify-between p-4 bg-gray-200 rounded shadow w-96">
      <div>
        <div className="text-xl font-bold">{name}</div>
        <div>
          <b>Time:</b> {date.toLocaleDateString("fi-FI")}{" "}
          {date.toLocaleTimeString("en-EN")}
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
