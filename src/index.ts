import express from "express";
import logger from "morgan";
import "./environment";
// import { router } from "./routes";
import crypto from "crypto";
import helmet from "helmet";
import os from "os";

const app = express();

app.use(logger("common"));
app.use(helmet());
app.use(express.json());

app.use("/", (req, res) => {
  let nonce = 1;
  let seed: number = Math.random();

  let hash = crypto.createHash("sha256");

  hash.update(Buffer.from(`${nonce} Hello World ${seed}`));

  while (!hash.digest("hex").startsWith("000")) {
    hash = crypto.createHash("sha256");
    nonce++;
    hash.update(Buffer.from(`${nonce} Hello World ${seed}`));
  }

  return res.json({ host: os.hostname(), nonce: nonce });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at PORT: ${process.env.PORT}`);
});
