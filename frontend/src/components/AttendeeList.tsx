import type { Attendee } from "./types";

type Props = {
  participants: Attendee[];
};

const getAttendingEmoji = (attending: boolean | undefined) => {
  if (attending === true) {
    return "✅";
  } else if (attending === false) {
    return "❌";
  } else {
    return "❓";
  }
};

const AttendeeList = (props: Props) => {
  const { participants } = props;
  if (!participants?.length) {
    return <div>No participants yet</div>;
  }

  return (
    <ul className="list-disc list-inside">
      {participants.map((participant) => {
        return (
          <li key={participant.name}>
            {participant.name} {getAttendingEmoji(participant.attending)}
          </li>
        );
      })}
    </ul>
  );
};

export default AttendeeList;
