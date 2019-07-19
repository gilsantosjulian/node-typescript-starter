import { oneOf, param, query } from 'express-validator';
import { messages } from './validatorMessages';

export const queries: any = [
  param('vendor_wallet')
    .isIn(['$shd_bogota'])
    .withMessage(messages('vendor_wallet').isIn),
  oneOf([
    query('value')
      .optional()
      .custom((value, { req }) => {
        if (!req.query.value.gt) {
          return false;
        } else {
          const regex = new RegExp(/^-?\d*(\.\d+)?$/);
          return req.query.value.gt.match(regex);
        }
      })
      .withMessage(messages('value').isNumeric),
    query('value')
      .optional()
      .isNumeric()
      .withMessage(messages('value').isNumeric),
  ]),
  oneOf([
    query('invoice')
      .optional()
      .custom((value, { req }) => {
        if (!req.query.value.gt) {
          return false;
        } else {
          const regex = new RegExp(/^\d+$/);
          return req.query.value.gt.match(regex);
        }
      })
      .withMessage(messages('invoice').isNumeric),
    query('invoice')
      .optional()
      .isNumeric()
      .withMessage(messages('invoice').isNumeric),
  ]),
];
