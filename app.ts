import express from "express";
import config from "./config";

async function startServer() {
  const app = express();

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

  app.get("/", (req, res) => res.send("Hello World!"));
}

startServer();
