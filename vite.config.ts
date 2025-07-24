import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
  build: {
    outDir: "dist", // Important for Vercel
  },
  plugins: [react()],
  resolve: {
    alias: {
      // '@components': path.resolve(__dirname, './src/components'), etc.
    }
  }
});
