import express, { Request, Response, NextFunction } from 'express';
import config from './config';
import routes from './api/routes';
import logging from './logger';

async function startServer() {
  const app = express();

  app.get('/', routes.rootRoute);
  app.use('/users', routes.usersRoute);
  app.use('/vendors', routes.vendorsRoute);

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error) {
      logging.error(error);
    }
    res.status(500).send(error.message);
  });

  app.listen(config.port, err => {
    if (err) {
      logging.error(err);
      return;
    }
    logging.info(`🛡️  Server running on port ${config.port} 🛡️`);
  });
}

startServer();
