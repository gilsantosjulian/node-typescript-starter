'use strict';
import loggin from '../../../../logger';
import cloudSql from '../../../db/cloud-sql';

export const getAll = async (queryParams: any) => {
  try {
    const result = await cloudSql.readQuery(queryParams);
    return result;
  } catch (error) {
    loggin.error(error);
    return error;
  }
};
