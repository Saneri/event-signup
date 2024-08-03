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

export const addEvent = async (
  event: Event & {
    expiryTimestamp: string | null;
  }
): Promise<Event | null> => {
  try {
    const res: AxiosResponse<Event> = await instance.post("/events", event);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
