import axios from "axios";
import { Event } from "../components/types";

const URL = "http://localhost:3001";

export const getEvents = async () => {
  try {
    const res = await axios.get(`${URL}/events`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getEvent = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/events/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const addEvent = async (event: Event) => {
  try {
    const res = await axios.post(`${URL}/events`, event);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
