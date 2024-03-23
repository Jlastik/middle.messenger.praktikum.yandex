import { defineConfig } from "vite";
import { resolve } from "path";
import autoprefixer from "autoprefixer";
import postcssNested from "postcss-nested";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  build: {
    target: "es2017",
    outDir: "build",
  },
  resolve: {
    alias: [{ find: "src", replacement: resolve(__dirname, "src/") }],
  },
  publicDir: "public",
  plugins: [handlebars()],
  css: {
    postcss: {
      plugins: [autoprefixer, postcssNested],
    },
  },
});
