// There is now event type that is shown in the frontpage (without extra details)
// and event type with more details when the event is opened.
// The separation of these types could be named clearer.

export type Event = {
  id?: string;
  name: string;
  description: string;
  datetime: string;
};

export type EventFormValues = Event & {
  expiryTimestamp: string | null;
  hasExpiry: boolean;
};

export type Attendee = {
  name: string;
  attending: boolean;
};

export type EventDetails = Event & {
  admin: boolean;
  invitationKey?: string;
};
