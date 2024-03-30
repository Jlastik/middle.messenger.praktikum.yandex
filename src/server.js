import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./router.js";
import { resolve } from "path";

const app = express();
const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.forEach((route) =>
  app.get(route.path, (_, res) => {
    res.status(200).sendFile(resolve(__dirname, `../build/index.html`));
  }),
);

app.use(express.static("./build"));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
