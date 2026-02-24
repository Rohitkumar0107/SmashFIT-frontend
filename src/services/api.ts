// src/services/api.ts
import axios from "axios";

// Ek master Axios instance bana rahe hain
const api = axios.create({
  baseURL: "https://smashfit-backend.onrender.com", // Tera Node.js backend ka address
  withCredentials: true, // 🔥 YE SABSE IMPORTANT HAI! Iske bina backend refresh token wali cookie accept/send nahi karega.
  headers: {
    "Content-Type": "application/json",
  },
});

// attach bearer token automatically if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
