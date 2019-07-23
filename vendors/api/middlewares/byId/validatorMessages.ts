export const messages = (param: string, length?: number) => {
  return {
    isIn: `Invalid ${param}`,
    isEmpty: `${param} should not be empty`,
    isLength: length ? `Length of ${param} greater than ${length} characters` : null,
    isNumeric: `${param} should be a number`,
  };
};
