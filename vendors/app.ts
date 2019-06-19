import express, { Request, Response } from "express";
import config from "./config";
const routes = require("./api/routes");

async function startServer() {
  const app = express();

  app.use("/users", routes.usersRoute);

  app.listen(config.port, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });

  app.get("/", (req: Request, res: Response) => res.send("Hello World!"));
}

startServer();
