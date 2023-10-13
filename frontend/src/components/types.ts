export type Event = {
  id?: string;
  name: string;
  description: string;
  datetime: string;
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
