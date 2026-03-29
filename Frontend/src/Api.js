import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "https://shopsez.onrender.com/api/v1";

console.log("🔌 API Base URL:", apiBaseUrl);
console.log("🔌 Environment VITE_API_URL:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

export default api;
