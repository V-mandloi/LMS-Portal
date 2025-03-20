import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});

export default {
  get: (url) => api.get(url),
  post: (url, data) => api.post(url, data),
};
