import { AxiosResponse } from "axios";
import { Event } from "../components/types";
import instance from "./instance";

export const getEvents = async (): Promise<Event[] | null> => {
  try {
    const res = await instance.get("/events");
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getEvent = async (
  id: string,
  key: string | null
): Promise<Event | null> => {
  try {
    const res: AxiosResponse<Event> = await instance.get(`/events/${id}`, {
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
    const res: AxiosResponse<{ eventId: string }> = await instance.post(
      "/events",
      event
    );
    return res.data.eventId;
  } catch (err) {
    console.error(err);
    return null;
  }
};
