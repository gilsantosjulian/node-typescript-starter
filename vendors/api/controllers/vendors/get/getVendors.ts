'use strict';
import loggin from '../../../../logger';
import cloudSql from '../../../db/cloud-sql';

export const getAll = async (queryParams: any) => {
  try {
    if (!queryParams.page || !queryParams.pageSize) {
      if (queryParams.page) {
        queryParams.pageSize = 20;
      } else if (queryParams.pageSize) {
        queryParams.page = 1;
      } else {
        queryParams.pageSize = 20;
        queryParams.page = 1;
      }
    } // TODO generate a validator helper, by now, it's needed here to show pagesTotal

    const queryResult = await cloudSql.readQuery(queryParams);
    return {
      data: queryResult[0],
      pagesTotal: Math.ceil(queryResult[1] / queryParams.pageSize),
    };
  } catch (error) {
    loggin.error(error);
    return error;
  }
};
