import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import lovableTagger from 'lovable-tagger'; // Removed as requested

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
  plugins: [
    react(),
    // lovableTagger(), // Removed as requested
  ],
  resolve: {
    alias: {
      // ... your aliases
    },
    esbuild: {
    tsconfig: path.resolve(__dirname, 'tsconfig.json') // explicitly use tsconfig.json
  }
  }
}));
