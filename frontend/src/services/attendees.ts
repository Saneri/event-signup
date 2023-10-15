import { AxiosResponse } from "axios";
import { Attendee } from "../components/types";
import instance from "./instance";

const URL = import.meta.env.VITE_API_URL;

export const getAttendees = async (id: string): Promise<Attendee[] | null> => {
  try {
    const res: AxiosResponse<Attendee[]> = await instance.get(
      `${URL}/attendees/${id}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
