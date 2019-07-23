export const messages = (param: string, length?: number) => {
  const message: any = {
    isIn: `Invalid ${param}`,
    isEmpty: `${param} should not be empty`,
    isLength: length ? `Length of ${param} greater than ${length} characters` : null,
    isNumeric: `${param} should be a number`,
    isOperatorNumeric: `${param} invalid`,
    isAlphanumeric: `${param} should be a alpha-numeric`,
    invalidDate: 'Invalid date format',
    invalidLanguage: 'Invalid language format',
  };
  return message;
};
