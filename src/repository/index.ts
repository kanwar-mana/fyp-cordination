import axios from "axios";

const baseDomain =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: baseDomain,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export default apiClient;
