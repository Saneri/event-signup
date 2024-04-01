import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: URL,
});

export default instance;
