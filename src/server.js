import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./router.js";
import { resolve } from "path";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.forEach((route) =>
  app.get(route.path, (_, res) => {
    res.status(200).sendFile(resolve(__dirname, `../build/index.html`));
  }),
);

app.listen(PORT, function () {
  console.log(`Мессенджер был успешно запущен на порту ${PORT}!`);
});
