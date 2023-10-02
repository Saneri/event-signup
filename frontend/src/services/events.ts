import axios, { AxiosResponse } from "axios";
import { Event } from "../components/types";

const URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_PUBLIC_API_KEY;

const instance = axios.create({
  baseURL: URL,
  headers: {
    "x-api-key": API_KEY,
  },
});

export const getEvents = async (): Promise<Event[] | null> => {
  try {
    const res = await instance.get("/events");
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getEvent = async (id: number): Promise<Event | null> => {
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
    const res: AxiosResponse<Event> = await axios.post(`${URL}/events`, event);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
