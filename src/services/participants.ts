import axios, { AxiosResponse } from "axios";
import { Participant } from "../components/types";

export const getParicipants = async (
  id: number
): Promise<Participant[] | null> => {
  try {
    const res: AxiosResponse<Participant[]> = await axios.post(
      `${URL}/participants/${id}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
