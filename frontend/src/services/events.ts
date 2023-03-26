import axios, { AxiosResponse } from "axios";
import { Event } from "../components/types";

const URL = "http://localhost:3001";

export const getEvents = async (): Promise<Event[] | null> => {
  try {
    const res = await axios.get(`${URL}/events`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getEvent = async (id: number): Promise<Event | null> => {
  try {
    const res: AxiosResponse<Event> = await axios.get(`${URL}/events/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const addEvent = async (event: Event): Promise<Event | null> => {
  try {
    const res: AxiosResponse<Event> = await axios.post(`${URL}/events`, event);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
