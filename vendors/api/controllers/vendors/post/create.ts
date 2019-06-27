'use strict';
import loggin from '../../../../logger';
import cloudSql from '../../../db/cloud-sql';

export const create = async (query: object): Promise<any> => {
  try {
    // query -> SHD
    const result = await cloudSql.createQuery(query);
    return result;
  } catch (error) {
    loggin.error(error);
    return error;
  }
};
