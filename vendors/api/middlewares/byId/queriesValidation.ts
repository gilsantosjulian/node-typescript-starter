import { param, query } from 'express-validator';
import { messages } from './validatorMessages';

export const byId: any = [
  param('vendor_wallet')
    .isIn(['$shd_bogota'])
    .withMessage(messages('vendor_wallet').isIn),
  param('id')
    .isLength({ max: 11 })
    .withMessage(messages('id', 11).isLength)
    .isNumeric()
    .withMessage(messages('value').isNumeric),
];
