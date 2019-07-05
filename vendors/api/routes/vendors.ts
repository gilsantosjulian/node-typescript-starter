'use strict';
import express, { NextFunction, Request, Response, Router } from 'express';
import logging from '../../logger';
import controllers from '../controllers';

const router: Router = express.Router();

router.use(logging.requestLogger);
router.use(logging.errorLogger);

router.get(
  '/:wallet_vendor/invoice/:invoiceId/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response: object = await controllers.vendorsController.create(req.query);
      res.status(200).send({
        code: 200,
        status: 'success',
        message: null,
        data: response,
      });
    } catch (error) {
      logging.error(error);
      res.status(500).send(error);
    }
  },
);

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: object = await controllers.vendorsController.getAll();

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

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const response: object = await controllers.vendorsController.getOne(id);

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
