// src/services/auth.service.ts
import api from "./api";

export const authService = {
  // 1. Email/Password Login
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  // 2. Google OAuth Login
  googleLogin: async (idToken: string) => {
    const response = await api.post("/auth/google", { idToken });
    return response.data;
  },

  // 3. Naya User Register karna
  register: async (fullName: string, email: string, password: string) => {
    const response = await api.post("/auth/register", {
      fullName,
      email,
      password,
    });
    return response.data;
  },

  // 4. Get User Profile / verify token
  // this endpoint now expects a bearer token and returns the logged in user
  getProfile: async () => {
    // interceptor will add token automatically
    const response = await api.get("/auth/me");
    return response.data;
  },

  // 5. Logout (clears refresh token on server)
  logout: async () => {
    // backend will remove cookie; we still clear localStorage on frontend
    const response = await api.post("/auth/logout");
    return response.data;
  },
};