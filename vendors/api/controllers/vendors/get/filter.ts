'use strict';
import loggin from '../../../../logger';
import cloudSql from '../../../db/cloud-sql';

export const filter = async (queryParams: any) => {
  try {
    const result = await cloudSql.readFilteredQuery(queryParams);
    return result;
  } catch (error) {
    loggin.error(error);
    return error;
  }
};
