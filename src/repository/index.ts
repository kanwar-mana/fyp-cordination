import axios from "axios";

const baseDomain = "http://localhost:5000/api";
const baseURL = `${baseDomain}`;

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export default apiClient;
