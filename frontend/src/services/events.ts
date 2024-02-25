import { AxiosResponse } from "axios";
import { Event } from "../components/types";
import instance from "./instance";

export const getEvents = async (
  accessToken: string
): Promise<Event[] | null> => {
  try {
    const res = await instance.get("/events", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getEvent = async (id: string): Promise<Event | null> => {
  try {
    const res: AxiosResponse<Event> = await instance.get(`/events/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const addEvent = async (event: Event): Promise<Event | null> => {
  try {
    const res: AxiosResponse<Event> = await instance.post("/events", event);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
