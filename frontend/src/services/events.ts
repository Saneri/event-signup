import { AxiosResponse } from "axios";

import { Event, EventDetails } from "../components/types";
import instance from "./instance";

export const getEvents = async (): Promise<Event[] | null> => {
  try {
    const res: AxiosResponse<Event[]> = await instance.get("/events");
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getEvent = async (id: string, key: string | null): Promise<EventDetails | null> => {
  try {
    const res: AxiosResponse<EventDetails> = await instance.get(`/events/${id}`, {
      params: { key },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/**
 * Creates a new event.
 *
 * @param event - The event to be added with optional expiry time.
 * @returns The ID of the added event, or null if an error occurred.
 */
export const addEvent = async (
  event: Event & {
    expiryTimestamp: string | null;
  }
): Promise<string | null> => {
  try {
    const res: AxiosResponse<{ eventId: string }> = await instance.post("/events", event);
    return res.data.eventId;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const patchEvent = async (id: string, data: Partial<EventDetails>): Promise<boolean> => {
  try {
    await instance.patch(`/events/${id}`, data);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
