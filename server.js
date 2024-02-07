import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get(`/`, (_, res) => {
  res.status(200).sendFile(path.join(__dirname, "build/index.html"));
});

app.get(`/home`, (_, res) => {
  res.status(200).sendFile(path.join(__dirname, "build/home.html"));
});

app.use(express.static("./build"));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
