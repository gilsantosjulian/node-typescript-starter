import { param, query } from 'express-validator';

const vendors: any = [
  param('vendor_wallet')
    .isIn(['shd_bogota', 'shd'])
    .withMessage('Invalid vendor wallet'),
  param('invoice_id')
    .not()
    .isEmpty()
    .withMessage('invoice_id should not be empty')
    .isLength({ max: 11 })
    .withMessage('Length greater than 11 characters')
    .isNumeric()
    .withMessage('invoice_id should be a number'),
  query('value')
    .not()
    .isEmpty()
    .withMessage('value should not be empty')
    .isLength({ max: 17 })
    .withMessage('Length greater than 17 characters')
    .isNumeric()
    .withMessage('value should be a number'),
  query('nature')
    .not()
    .isEmpty()
    .withMessage('nature should not be empty')
    .isLength({ max: 2 })
    .withMessage('Length greater than 2 characters')
    .isNumeric()
    .withMessage('value should be a number'),
  query('processor')
    .not()
    .isEmpty()
    .withMessage('processor should not be empty')
    .isLength({ max: 2 })
    .withMessage('Length greater than 2 characters')
    .isNumeric()
    .withMessage('processor should be a number'),
  query('branch')
    .not()
    .isEmpty()
    .withMessage('branch should not be empty')
    .isLength({ max: 3 })
    .withMessage('Length greater than 3 characters')
    .isNumeric()
    .withMessage('branch should be a number'),
  query('environment')
    .not()
    .isEmpty()
    .withMessage('environment should not be empty')
    .isLength({ max: 2 })
    .withMessage('Length greater than 2 characters')
    .isNumeric()
    .withMessage('environment should be a number'),
  query('subscription')
    .not()
    .isEmpty()
    .withMessage('subscription should not be empty')
    .isLength({ max: 13 })
    .withMessage('Length greater than 13 characters')
    .isAlphanumeric()
    .withMessage('subscription should be a alpha-numeric'),
  query('tx_id')
    .not()
    .isEmpty()
    .withMessage('tx_id should not be empty')
    .isLength({ max: 10 })
    .withMessage('Length greater than 10 characters')
    .isAlphanumeric()
    .withMessage('tx_id should be a alpha-numeric'),
  query('sourceDate')
    .not()
    .isEmpty()
    .withMessage('sourceDate should not be empty')
    .isLength({ max: 20 })
    .withMessage('Length greater than 20 characters')
    .isISO8601()
    .withMessage('Invalid date format'),
  query('language')
    .not()
    .isEmpty()
    .withMessage('language should not be empty')
    .isLength({ max: 5 })
    .withMessage('Length greater than 5 characters')
    .matches(/^([a-z][a-z]\-[a-z][a-z])$/)
    .withMessage('Invalid language format'),
  query('reference')
    .optional()
    .isLength({ max: 11 })
    .withMessage('Length greater than 11 characters')
    .isAlphanumeric()
    .withMessage('reference should be a alpha-numeric'),
];

export = {
  vendors,
};
