import logger from "morgan";
import fs from "fs";

const LOGGER_FOLDER_NAME = "logs";
const LOGGER_FILE_NAME = "access.log";

const accessLogStream = fs.createWriteStream(
  `${__dirname}/${LOGGER_FOLDER_NAME}/${LOGGER_FILE_NAME}`,
  { flags: "a" }
);
export const consoleLogger = logger("common");
export const fileLogger = logger("common", {
  skip: (req, res) => req.url !== "/",
  stream: accessLogStream
});
