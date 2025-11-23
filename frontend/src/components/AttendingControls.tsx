import { useState } from "react";

import { Button } from "@/components/ui/button";
import { editAttendee } from "../services/attendees";

type AttendingControlsProps = {
  onAttendingChange: () => void;
  eventId: string;
};

const AttendingControls = ({ onAttendingChange, eventId }: AttendingControlsProps) => {
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
    <div className="flex rounded-md space-x-2 justify-center" role="group">
      <Button onClick={() => handleClick(true)} variant={attending ? "default" : "outline"} disabled={loading}>
        Attending ✅
      </Button>
      <Button onClick={() => handleClick(false)} variant={attending ? "outline" : "default"} disabled={loading}>
        Not attending ❌
      </Button>
    </div>
  );
};

export default AttendingControls;
