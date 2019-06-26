import express, { Request, Response } from "express";
import config from "./config";
import routes from "./api/routes";

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

  app.get("/", (req: Request, res: Response) => res.send("Server is working!"));
}

startServer();
