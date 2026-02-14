import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/workingtime/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "マラソン栄養管理",
        short_name: "栄養管理",
        description: "マラソンランナー向け栄養管理PWAアプリ",
        theme_color: "#2563eb",
        background_color: "#f8fafc",
        display: "standalone",
        orientation: "portrait",
        scope: "/workingtime/",
        start_url: "/workingtime/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
