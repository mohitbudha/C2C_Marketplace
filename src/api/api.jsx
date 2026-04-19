import axios from "axios";

const API = axios.create({
  baseURL: "https://c2c-backend-jn38.onrender.com/api",
});

// Add token automatically if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
