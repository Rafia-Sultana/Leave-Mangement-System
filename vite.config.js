import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      "@emotion/react",
      "@emotion/styled",
      "@mui/material",
      "@mui/material/Tooltip",
      "@mui/material/Box",
      "@mui/x-data-grid",
    ],
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    VitePWA({
      manifest: {
        theme_color: "#91d7d7",
        background_color: "#f0decc",
        display: "standalone",
        scope: "/",
        start_url: "/",
        name: "Leave Management System",
        short_name: "LMS",
        description: "testing vite pwa",
        icons: [
          {
            src: "/tiller-logo.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
