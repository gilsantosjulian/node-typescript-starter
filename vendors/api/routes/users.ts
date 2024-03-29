'use strict';
import express, { NextFunction, Request, Response, Router } from 'express';
import logging from '../../logger';
import controllers from '../controllers';

const router: Router = express.Router();

router.use(logging.requestLogger);
router.use(logging.errorLogger);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: object = await controllers.usersController.getMany(req);

    res.status(200).send({
      code: 200,
      status: 'success',
      message: null,
      data: response,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

export = router;
