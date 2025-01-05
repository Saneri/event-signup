import ClipboardJS from "clipboard";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type InvitationLinkProps = {
  invitationKey: string;
};

const InvitationLink = (props: InvitationLinkProps) => {
  useEffect(() => {
    new ClipboardJS("button");
  }, []);

  const invitationLink = `${window.location.href}?key=${props.invitationKey}`;

  return (
    <div>
      <h3>
        Send to following link to anyone you want to invite to this event.
      </h3>
      <div id="link" className="break-all">
        {invitationLink}
      </div>
      <br></br>
      <Button data-clipboard-target="#link">Copy invite link</Button>
    </div>
  );
};

export default InvitationLink;
