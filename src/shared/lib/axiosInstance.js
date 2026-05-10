import axios from "axios";

const isDev = import.meta.env.DEV;

export const axiosInstance = axios.create({
  baseURL: isDev ? "/api" : import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});
