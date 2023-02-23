import { Participant } from "./types";

type Props = {
  participants: Participant[];
};

const AttendeeList = (props: Props) => {
  const { participants } = props;
  if (!participants?.length) {
    return <div>No participants yet</div>;
  }

  return (
    <ul className="list-disc list-inside">
      {participants.map((participant) => {
        return <li key={participant.name}>{participant.name}</li>;
      })}
    </ul>
  );
};

export default AttendeeList;
