import express, { Request, Response, NextFunction } from 'express';
import { loadEnvironmentVariables } from './config';
import routes from './api/routes';
import logging from './logger';

require('@google-cloud/debug-agent').start({
  allowExpressions: true,
});

const config = require('config');
loadEnvironmentVariables();

const PORT = config.PORT;

async function startServer() {
  const app = express();
  console.log('step 1');
  app.get('/', routes.rootRoute);
  console.log('step 2');
  app.use('/users', routes.usersRoute);
  console.log('step 3');
  app.use('/vendors', routes.vendorsRoute);
  console.log('step 4');

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error) {
      console.log('step 5');
      logging.error(error);
    }
    console.log('step 6');
    res.status(500).send(error.message);
  });
  console.log('step 7');

  app.listen(PORT, (err: any) => {
    if (err) {
      console.log('step 8');
      logging.error(err);
      return;
    }
    logging.info(`🛡️  Server running on port ${PORT} 🛡️`);
  });
}

startServer();
