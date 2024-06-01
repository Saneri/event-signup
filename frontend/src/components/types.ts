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
