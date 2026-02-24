import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Local dev ke liye base '/' rakho, production ke liye jo tune set kiya hai
  base: process.env.NODE_ENV === 'production' ? "/SmashFIT-frontend" : "/",
  
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://smashfit-backend.onrender.com', // Naya Render URL
        changeOrigin: true,
        secure: true, // Render https use karta hai toh ise true rakho
      },
    },
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      "Cross-Origin-Embedder-Policy": "unsafe-none",
    },
  },
});