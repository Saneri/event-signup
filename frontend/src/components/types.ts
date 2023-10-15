export type Event = {
  id?: string;
  name: string;
  description: string;
  datetime: string;
};

export type Attendee = {
  name: string;
  attending: boolean;
};
