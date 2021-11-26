import "./environment";
import express from "express";
import logger from "morgan";
import helmet from "helmet";

import { router } from "./routes";

const app = express();

app.use(logger("common"));
app.use(helmet());
app.use(express.json());

app.use(router);

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server running at PORT: ${process.env.NODE_PORT}`);
});
