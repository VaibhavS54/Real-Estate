import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // local dev port
  },
  resolve: {                                
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // required for Vercel (static output dir)
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // create a separate chunk for react-helmet-async
          if (id.includes("node_modules/react-helmet-async")) {
            return "react-helmet-async";   
          }
        },
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  optimizeDeps: {
    include: ["react-helmet-async"],
  },
});
