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
    const response = await api.post("/auth/sso/callback", { idToken });
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

  // 6. Forgot password
  forgotPassword: async (email: string) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  // 7. Reset password
  resetPassword: async (token: string, newPassword: string) => {
    const response = await api.post("/auth/reset-password", { token, newPassword });
    return response.data;
  },

  // 8. Verify email
  verifyEmail: async (token: string) => {
    const response = await api.post("/auth/verify-email", { token });
    return response.data;
  },

  // 9. Enable MFA
  enableMfa: async () => {
    const response = await api.post("/auth/mfa/enable");
    return response.data;
  },
};
