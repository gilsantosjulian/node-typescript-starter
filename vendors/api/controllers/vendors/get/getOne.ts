'use strict';
import loggin from '../../../../logger';
import cloudSql from '../../../db/cloud-sql';

export const getOne = async (id: string): Promise<any> => {
  try {
    const result = await cloudSql.readOneQuery(id);
    return result;
  } catch (error) {
    loggin.error(error);
    return error;
  }
};
