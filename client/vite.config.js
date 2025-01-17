import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  base: "/",
  resolve: {
    alias: {
      "@": "/src",
      "@redux": "/src/redux",
    },
  },
  esbuild: {
    include: /\.js$/,
    exclude: [],
    loader: "jsx",
  },
});
