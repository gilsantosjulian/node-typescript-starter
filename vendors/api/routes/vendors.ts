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
      const response: any = await controllers.vendorsController.getAll(req.query);
      const params: any = req.query;
      if (response.error) {
        res.status(404).send({
          code: 404,
          status: 'Invalid request format',
          message: 'Request is not formatted correctly.',
          data: '',
        });
      } else {
        res.status(200).send({
          entities: response.data,
          pagination: {
            pageSize: parseInt(params.pageSize),
            pageNum: parseInt(params.page),
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const response: any = await controllers.vendorsController.getOne(id);

      res.status(200).send({
        entities: response ? response : null,
        error: {
          code: 0,
          message: 'Success',
        },
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
);

export = router;
