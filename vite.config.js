import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  rollupOptions: {
    external: [
      "react",
      "nonid",
      "polished",
      "react-dom",
      "react-router-dom",
      "sytled-components",
      "vite-plugin-svgr",
    ],
  },
});
