export type Event = {
  id?: number;
  name: String;
  description: String;
  datetime: Date;
};

export type Participant = {
  name: string;
  attending: number;
  answerTime: Date;
};

export type Participants = {
  id?: number;
  participants: Participant[];
};
