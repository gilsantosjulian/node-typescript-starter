'use strict';
import express, { NextFunction, Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';
import logging from '../../logger';
import controllers from '../controllers';
import dataCheck from '../utils/dataCheck';

const router: Router = express.Router();

router.use(logging.requestLogger);
router.use(logging.errorLogger);

router.get(
  '/:vendor_wallet/invoice/:invoice_id',
  dataCheck.vendors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        res.status(404).send({
          code: 404,
          status: 'Invalid request format',
          message: 'Request is not formatted correctly.',
          data: err.mapped(),
        });
      } else {
        const response: any = await controllers.vendorsController.create(req);
        res.status(200).send({
          code: 200,
          status: 'success',
          message: null,
          data: response.data,
          error: response.error,
        });
      }
    } catch (error) {
      logging.error(error);
      res.status(500).send(error);
    }
  },
);

router.get(
  '/:vendor_wallet/queries',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response: any = await controllers.vendorsController.filter(req.query);
      const params: any = req.query;

      res.status(200).send({
        entities: response,
        pagination: {
          pageSize: params.pageSize,
          pageNum: params.page,
          pagesTotal: 45,
        },
        error: {
          code: 0,
          message: 'Success',
        },
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
