import { useState } from "react";
import { editAttendee } from "../services/attendees";
import Button from "./common/Button";

type AttendingControlsProps = {
  onAttendingChange: () => void;
  eventId: string;
};

const AttendingControls = ({
  onAttendingChange,
  eventId,
}: AttendingControlsProps) => {
  const [attending, setAttending] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async (attending: boolean) => {
    setLoading(true);
    const result = await editAttendee(eventId, attending);
    if (result) {
      setAttending(attending);
      onAttendingChange();
    } else {
      alert("Could not change attending status");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col rounded-md shadow-sm" role="group">
      <Button
        type="button"
        onClick={() => handleClick(true)}
        selected={attending === true}
        disabled={loading}
      >
        Attending ✅
      </Button>
      <Button
        type="button"
        onClick={() => handleClick(false)}
        selected={attending === false}
        disabled={loading}
      >
        Not attending ❌
      </Button>
    </div>
  );
};

export default AttendingControls;
