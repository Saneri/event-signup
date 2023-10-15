import axios from "axios";

const URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_PUBLIC_API_KEY;

const instance = axios.create({
  baseURL: URL,
  headers: {
    "x-api-key": API_KEY,
  },
});

export default instance;
