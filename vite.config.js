// /* eslint-disable no-undef */
// import {defineConfig} from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   rules: {
//     "react/prop-types": 0,
//   },
// });
/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/", // ✅ THIS IS IMPORTANT FOR DEPLOYMENT
  build: {
    outDir: "dist", // ✅ make sure Vercel uses this folder
  },
});
