import { defineConfig } from "vite";
import { resolve } from "path";
import autoprefixer from "autoprefixer";
import postcssNested from "postcss-nested";
import handlebars from "vite-plugin-handlebars";

const pageData = {
  "/index.html": {
    button: {
      login: {
        label: "Авторизоваться",
        buttonClass: "solid",
        buttonType: "submit",
      },
      signIn: {
        label: "Нет Аккаунта?",
        buttonClass: "outlined",
        buttonType: "button",
      },
    },
  },
  "/home.html": {
    title: "Sub Page",
  },
};

export default defineConfig({
  build: {
    target: "es2017",
    outDir: "build",
    rollupOptions: {
      input: {
        auth: resolve(__dirname, "home.html"),
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  publicDir: "public",
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/components"),
      context: (pagePath) => pageData[pagePath],
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer, postcssNested],
    },
  },
});
