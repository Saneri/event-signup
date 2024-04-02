import axios from "axios";
import { getCurrentSession } from "../auth/auth";

const URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: URL,
});

instance.interceptors.request.use(async (config) => {
  try {
    const session = await getCurrentSession();
    if (session) {
      const token = session.getAccessToken().getJwtToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

export default instance;
