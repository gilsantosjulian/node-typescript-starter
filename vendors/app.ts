import express, { Request, Response, NextFunction } from 'express';
import { loadEnvironmentVariables } from './config';
import routes from './api/routes';
import logging from './logger';
import bodyParser from 'body-parser';

require('@google-cloud/debug-agent').start({
  allowExpressions: true,
});

loadEnvironmentVariables();

const PORT = process.env.PORT || 3000;

async function startServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', routes.rootRoute);
  app.use('/users', routes.usersRoute);
  app.use('/vendors', routes.vendorsRoute);

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error) {
      logging.error(error);
    }
    res.status(500).send(error.message);
  });

  app.on('listening', (err: any) => {
    if (err) {
      logging.error(err);
      return;
    }
    logging.info(`🛡️  Server running on port ${PORT} 🛡️`);
  });

  app.listen(PORT);
}

startServer();
