import parse from '../../../utils/parse';

const REGEX = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z)?$/;

export const validateOperators = (value: any, length: number, type: string) => {
  if (!value.gt && !value.lt && !value.sort) {
    return false;
  }
  const regexs: any = {
    number: new RegExp(/^-?\d*(\.\d+)?$/),
    date: new RegExp(REGEX),
  };
  const validated = {
    gt: validateKeysOperators(value, regexs[type], 'gt', length),
    lt: validateKeysOperators(value, regexs[type], 'lt', length),
    sortBy: validateKeysOperators(value, regexs[type], 'sort', length),
  };
  return validated.gt && validated.lt && validated.sortBy;
};

const validateKeysOperators = (
  value: any,
  regex: any,
  operator: string,
  length: number,
) => {
  if (value[operator]) {
    try {
      if (operator == 'gt' || operator == 'lt') {
        if (
          value[operator].match(regex) !== null &&
          value[operator].length <= length &&
          value[operator].length > 0
        ) {
          return true;
        }
        return false;
      }
      if (operator == 'sort') {
        if (value[operator] === 'ASC' || value[operator] === 'DESC') { return true; }
        return false;
      }
    } catch {
      return false;
    }
  }
  return true;
};

export const validateQueryFilters = (filterData: string) => {
  const queryParamsArray = filterData.split(',');
  const queryData = parse.formatQuery({});
  let validated = true;
  queryParamsArray.forEach(param => {
    if (!queryData.data.hasOwnProperty(param)) {
      validated = false;
    }
  });
  return validated;
};
