'use strict';
import express, { NextFunction, Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';
import logging from '../../logger';
import controllers from '../controllers';
import { byIdValidator, queriesValidator, vendorsValidator } from '../middlewares/index';
const router: Router = express.Router();

router.use(logging.requestLogger);
router.use(logging.errorLogger);

router.get(
  '/:vendor_wallet/invoices/:invoice_id',
  vendorsValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        errorResponse(res, err);
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
  queriesValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        errorResponse(res, err);
      } else {
        const response: any = await controllers.vendorsController.getList(req.query); // TODO generate models and use instead of 'any'
        res.status(200).send({
          entities: response.data,
          pagination: {
            pageSize: parseInt(req.query.pageSize),
            pageNum: parseInt(req.query.page),
            pagesTotal: response.pagesTotal,
          },
          error: {
            code: 0,
            message: 'Success',
          },
        });
      }
    } catch (error) {
      logging.error(error);
      res.status(500).send(error);
    }
  },
);

router.get(
  '/:vendor_wallet/queries/:id',
  byIdValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      errorResponse(res, err);
    } else {
      try {
        const id = req.params.id;
        const response: any = await controllers.vendorsController.getById(id); // TODO generate models and use instead of 'any'

        res.status(200).send({
          entities: response ? response : null,
          error: {
            code: 0,
            message: 'Success',
          },
        });
      } catch (error) {
        logging.error(error);
        res.status(500).send(error);
      }
    }
  },
);

router.post(
  '/:vendor_wallet/invoices/:invoice_id/pay',
  vendorsValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response: any = await controllers.vendorsController.send(req.body);
      res.status(200).send({
        code: 200,
        status: 'success',
        message: null,
        data: response.data,
        error: response.error,
      });
    } catch (error) {
      logging.error(error);
      res.status(500).send(error);
    }
  },
);

const errorResponse = (res: Response, err: any) => {
  return res.status(404).send({
    code: 404,
    status: 'Invalid request format',
    message: 'Request is not formatted correctly.',
    data: err.mapped(),
  });
};

export = router;
