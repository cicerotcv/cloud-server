import * as dotenv from "dotenv";

let path;

switch (process.env.NODE_ENV) {
  case "development":
    console.log("Loaded development environment settings");
    path = `${__dirname}/../.env.development`;
    break;
  case "production":
    console.log("Loaded production environment settings");
    path = `${__dirname}/../.env.production`;
    break;
  default:
    console.log("Loaded default environment settings");
    path = `${__dirname}/../.env.development`;
}

dotenv.config({ path });
