import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.config.js";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": `${path.resolve(__dirname, "src")}`,
    },
  },
  plugins: [react(), tailwindcss(), crx({ manifest })],
  server: {
    port: 5173,
    cors: {
      origin: ["chrome-extension://"],
    },
  },
});
