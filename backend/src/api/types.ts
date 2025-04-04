export type DynamoEvent = {
    name: string;
    datetime: string;
    description: string;
    expiryTimestamp: string | null;
};

export interface DynamoEventUpdate {
    name?: string;
    datetime?: string;
    description?: string;
    expiryTimestamp?: string;
}

export type Event = {
    name: string | undefined;
    datetime: string | undefined;
    description: string | undefined;
    id: string | undefined;
};

export type EventsGetAllResponsePayload = Event[];

export type EventsGetByIdResponsePayload = Event & {
    admin: boolean;
    invitationKey?: string;
};

export type DynamoAttendee = {
    attending: boolean;
};

export type Attendee = {
    name: string | undefined;
    attending: boolean | undefined;
};
