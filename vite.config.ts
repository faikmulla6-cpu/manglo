import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // React and Motion publish CommonJS branches that check NODE_ENV at runtime.
  // This bundle runs directly in browsers without a Node.js `process` global.
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
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
