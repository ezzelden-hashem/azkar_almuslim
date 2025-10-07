import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "force-reload-plugin",
      handleHotUpdate({ server, file }) {
        if ([".js", ".jsx", ".ts", ".tsx", ".json"].includes(file)) {
          server.ws.send({
            type: "full-reload",
          });
        }
      },
    },
  ],
  resolve: {
    alias: {
      "#assets": path.resolve(__dirname, "./src/assets"),
      "#components": path.resolve(__dirname, "./src/components"),
      "#content": path.resolve(__dirname, "./src/content"),
      "#context": path.resolve(__dirname, "./src/context"),
      "#hooks": path.resolve(__dirname, "./src/hooks"),
      "#pages": path.resolve(__dirname, "./src/pages"),
      "#routes": path.resolve(__dirname, "./src/routes"),
      "#store": path.resolve(__dirname, "./src/store"),
      "#styles": path.resolve(__dirname, "./src/styles"),
      "#types": path.resolve(__dirname, "./src/types"),
      "#utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  server: {
    open: true,
  },
  assetsInclude: ["src/styles/"],
});
