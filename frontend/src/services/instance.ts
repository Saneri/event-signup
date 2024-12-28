import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

const URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: URL,
});

instance.interceptors.request.use(async (config) => {
  try {
    const session = await fetchAuthSession();
    if (session) {
      const token = session.tokens?.accessToken.toString();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

export default instance;
