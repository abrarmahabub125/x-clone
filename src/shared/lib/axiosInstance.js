import axios from "axios";
import { getApiBaseUrl } from "./apiUrl";

export const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});
