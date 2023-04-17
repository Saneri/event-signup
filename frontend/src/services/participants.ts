import axios, { AxiosResponse } from "axios";
import { Participant, Participants } from "../components/types";

const URL = "http://localhost:3001";

export const getParicipants = async (
  id: number
): Promise<Participant[] | null> => {
  try {
    const res: AxiosResponse<Participants> = await axios.get(
      `${URL}/participants/${id}`
    );
    return res.data.participants;
  } catch (err) {
    console.error(err);
    return [];
  }
};