import { oneOf, param, query } from 'express-validator';
import { validateOperators, validateQueryFilters } from './schemas/validateOperators';
import { messages } from './validatorMessages';

export const queries: any = [
  param('vendor_wallet')
    .isIn(['$shd_bogota'])
    .withMessage(messages('vendor_wallet').isIn),
  oneOf([
    query('value')
      .optional()
      .custom(val => validateOperators(val, 17, 'number'))
      .withMessage(messages('value').isIn),
    query('value')
      .optional()
      .not()
      .isEmpty()
      .withMessage(messages('value').isEmpty)
      .isLength({ max: 17 })
      .withMessage(messages('value', 17).isLength)
      .isNumeric()
      .withMessage(messages('value').isNumeric),
  ]),
  oneOf([
    query('invoice')
      .optional()
      .custom(val => validateOperators(val, 11, 'number'))
      .withMessage(messages('invoice').isNumeric),
    query('invoice')
      .optional()
      .not()
      .isEmpty()
      .withMessage(messages('invoice').isEmpty)
      .isLength({ max: 11 })
      .withMessage(messages('invoice', 11).isLength)
      .isNumeric()
      .withMessage(messages('invoice').isNumeric),
  ]),
  query('nature')
    .optional()
    .not()
    .isEmpty()
    .withMessage(messages('nature').isEmpty)
    .isLength({ max: 2 })
    .withMessage(messages('nature', 2).isLength)
    .isNumeric()
    .withMessage(messages('nature').isNumeric),
  query('processor')
    .optional()
    .not()
    .isEmpty()
    .withMessage(messages('processor').isEmpty)
    .isLength({ max: 2 })
    .withMessage(messages('processor', 2).isLength)
    .isNumeric()
    .withMessage(messages('processor').isNumeric),
  query('branch')
    .optional()
    .not()
    .isEmpty()
    .withMessage(messages('branch').isEmpty)
    .isLength({ max: 3 })
    .withMessage(messages('branch', 3).isLength)
    .isNumeric()
    .withMessage(messages('branch').isNumeric),
  query('environment')
    .optional()
    .not()
    .isEmpty()
    .withMessage(messages('environment').isEmpty)
    .isLength({ max: 2 })
    .withMessage(messages('environment', 2).isLength)
    .isNumeric()
    .withMessage(messages('enviroment').isNumeric),
  query('subscription')
    .optional()
    .not()
    .isEmpty()
    .withMessage(messages('subscription').isEmpty)
    .isLength({ max: 13 })
    .withMessage(messages('subscription', 13).isLength)
    .isAlphanumeric()
    .withMessage(messages('subscription').isAlphanumeric),
  query('tx_id')
    .optional()
    .not()
    .isEmpty()
    .withMessage(messages('tx_id').isEmpty)
    .isLength({ max: 10 })
    .withMessage(messages('tx_id', 10).isLength)
    .isAlphanumeric()
    .withMessage(messages('tx_id').isAlphanumeric),
  query('sourceDate')
    .optional()
    .not()
    .isEmpty()
    .withMessage(messages('sourceDate').isEmpty)
    .isLength({ max: 20 })
    .withMessage(messages('sourceDate', 20).isLength)
    .isISO8601()
    .withMessage(messages('sourceDate').invalidDate),
  query('language')
    .optional()
    .not()
    .isEmpty()
    .withMessage(messages('language').isEmpty)
    .isLength({ max: 5 })
    .withMessage(messages('language', 5).isLength)
    .matches(/^([a-z][a-z]\-[a-z][a-z])$/)
    .withMessage(messages('language').invalidLanguage),
  query('reference')
    .optional()
    .isLength({ max: 11 })
    .withMessage(messages('language', 11).isLength)
    .isAlphanumeric()
    .withMessage(messages('language').isAlphanumeric),
  oneOf([
    query('created')
      .optional()
      .custom(val => validateOperators(val, 20, 'date'))
      .withMessage(messages('created').isIn),
    query('created')
      .optional()
      .not()
      .isEmpty()
      .withMessage(messages('created').isEmpty)
      .isLength({ max: 20 })
      .withMessage(messages('created', 20).isLength)
      .isISO8601()
      .withMessage(messages('created').invalidDate),
  ]),
  oneOf([
    query('updated')
      .optional()
      .custom(val => validateOperators(val, 20, 'date'))
      .withMessage(messages('updated').isIn),
    query('updated')
      .optional()
      .not()
      .isEmpty()
      .withMessage(messages('updated').isEmpty)
      .isLength({ max: 20 })
      .withMessage(messages('updated', 20).isLength)
      .isISO8601()
      .withMessage(messages('updated').invalidDate),
  ]),
  query('page')
    .optional()
    .not()
    .isEmpty()
    .withMessage(messages('page').isEmpty)
    .isLength({ max: 11 })
    .withMessage(messages('page', 100).isLength)
    .isNumeric()
    .withMessage(messages('page').isNumeric),
  query('pageSize')
    .optional()
    .not()
    .isEmpty()
    .withMessage(messages('pageSize').isEmpty)
    .isLength({ max: 11 })
    .withMessage(messages('pageSize', 100).isLength)
    .isNumeric()
    .withMessage(messages('pageSize').isNumeric),
  query('select')
    .optional()
    .not()
    .isEmpty()
    .withMessage(messages('select').isEmpty)
    .isLength({ max: 300 })
    .withMessage(messages('select', 100).isLength)
    .matches(/^[a-zA-Z]*(,[a-zA-Z]+)*$/)
    .withMessage(messages('select').invalidSelect)
    .custom(val => validateQueryFilters(val))
    .withMessage(messages('select').invalidParams),
  query('groupBy')
    .optional()
    .not()
    .isEmpty()
    .withMessage(messages('groupBy').isEmpty)
    .isLength({ max: 300 })
    .withMessage(messages('gruopBy', 100).isLength)
    .matches(/^[a-zA-Z]*(,[a-zA-Z]+)*$/)
    .withMessage(messages('groupBy').invalidGroupBy)
    .custom(val => validateQueryFilters(val))
    .withMessage(messages('groupBy').invalidParams),
];
