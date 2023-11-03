import axios, { AxiosInstance } from "axios";

export const API: AxiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});
