// TODO: create better typings for these DTOs

export type Event = {
  id?: string;
  name: String;
  description: String;
  datetime: String;
};

export type Participant = {
  name: string;
  attending: string;
  answerTime: String;
};
