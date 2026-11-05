import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
  build: {
    outDir: "dist",
    emptyOutDir: false,
    lib: {
      entry: "src/hero-entry.tsx",
      name: "MangloHero",
      formats: ["iife"],
      fileName: () => "hero-2-1.js",
      cssFileName: "hero-2-1",
    },
  },
});
