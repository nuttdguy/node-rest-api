// load enviromental variables before other imports
import * as dotenv from "dotenv";
const envVar = dotenv.config();

if (envVar.error) {
  console.log("Error loading env variables ... exiting");
  process.exit(1);
}

// import rest of app files below
import "reflect-metadata";
import { dataSource } from "./dataSource";
import * as express from "express";
import { logger } from "./logger";
import { root } from "./routes/root";

// create node / express server
const app = express();

// setup app routes
function setupExpress() {
  app.route("/").get(root);
}

function startServer() {
  let port: number;

  // extract the port number from cmd line arg
  const portEnv = process.env.PORT,
    portArg = process.argv[2];
  // parse port arg into number using util
  // helper method in order to validate type is of number
  function isInteger(input: string) {
    return input?.match(/^\d+$/) ?? false;
  }

  port = isInteger(portEnv)
    ? parseInt(portEnv)
    : isInteger(portArg)
    ? parseInt(portArg)
    : 9005;

  app.listen(port, () => {
    logger.info(`HTTP REST API Server running at http://localhost:${port}`);
  });
}

dataSource
  .initialize()
  .then(() => {
    setupExpress();
    startServer();
  })
  .catch((err) => {
    logger.error("App failed to intiialize datasource: ", err);
    process.exit(1);
  });
