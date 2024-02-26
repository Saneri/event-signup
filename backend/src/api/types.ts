export type DynamoEvent = {
    PK: string;
    SK: string;
    name: string;
    datetime: string;
    description: string;
};

export type Event = {
    name: string | undefined;
    datetime: string | undefined;
    description: string | undefined;
    id: string | undefined;
};

export type Attendee = {
    name: string | undefined;
    attending: boolean | undefined;
};
