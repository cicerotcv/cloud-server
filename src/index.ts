import "./environment";
import express from "express";
import helmet from "helmet";
import { consoleLogger, fileLogger } from "./logger";

import { router } from "./routes";

const app = express();

app.use(consoleLogger);
app.use(fileLogger);
app.use(helmet());
app.use(express.json());

app.use(router);

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server running at PORT: ${process.env.NODE_PORT}`);
});
