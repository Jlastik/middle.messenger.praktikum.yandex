import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { resolve } from "path";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("./build"));

app.get("/", (_, res) => {
  res.status(200).sendFile(resolve(__dirname, `../build/index.html`));
});
app.get("/home", (_, res) => {
  res.status(200).sendFile(resolve(__dirname, `../build/index.html`));
});
app.get("/registration", (_, res) => {
  res.status(200).sendFile(resolve(__dirname, `../build/index.html`));
});
app.get("/profile", (_, res) => {
  res.status(200).sendFile(resolve(__dirname, `../build/index.html`));
});

app.get("/sign-up", (_, res) => {
  res.status(200).sendFile(resolve(__dirname, `../build/index.html`));
});

app.listen(PORT, function () {
  console.log(`Мессенджер был успешно запущен на порту ${PORT}!`);
});
