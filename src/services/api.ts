import axios from "axios";

// Ek master Axios instance bana rahe hain
const api = axios.create({
  baseURL: "https://smashfit-backend.onrender.com/api",
  // baseURL: "http://localhost:5000/api",  // Tera Node.js backend ka address
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

// response interceptor to handle 401 and attempt refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    // only retry once
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      try {
        const refreshRes = await api.post("/auth/refresh");
        const newToken = refreshRes.data?.accessToken;
        if (newToken) {
          localStorage.setItem("accessToken", newToken);
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // refresh failed, force logout
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;