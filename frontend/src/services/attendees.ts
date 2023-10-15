import axios, { AxiosResponse } from "axios";
import { Attendee } from "../components/types";

const URL = import.meta.env.VITE_API_URL;

export const getAttendees = async (id: string): Promise<Attendee[] | null> => {
  try {
    const res: AxiosResponse<Attendee[]> = await axios.get(
      `${URL}/attendees/${id}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
