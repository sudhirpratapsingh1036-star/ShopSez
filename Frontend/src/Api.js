import axios from "axios";

// Use environment variable if available, otherwise hardcode for production
const apiBaseUrl = import.meta.env.VITE_API_URL || "https://shopsez.onrender.com/api/v1";

console.log("🔌 API Base URL:", apiBaseUrl);

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

export default api;
