import { AxiosResponse } from "axios";

import { Attendee } from "../components/types";
import instance from "./instance";

const URL = import.meta.env.VITE_API_URL;

export const getAttendees = async (id: string): Promise<Attendee[] | null> => {
  try {
    const res: AxiosResponse<Attendee[]> = await instance.get(`${URL}/attendees/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

/**
 * Edits the attendance status of an attendee for a specific event.
 * Backend will know which attendee to edit based on the JWT in the request header.
 * @param eventId - The ID of the event.
 * @param attending - The new attendance status.
 * @returns A promise that resolves to true if the attendee was successfully edited, or false if an error occurs.
 */
export const editAttendee = async (eventId: string, attending: boolean): Promise<boolean> => {
  try {
    await instance.put(`${URL}/attendees/${eventId}`, { attending });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
