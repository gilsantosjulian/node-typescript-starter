'use strict';
import loggin from '../../../../../../logger';
import cloudSql from '../../../../../db/cloud-sql';
import parse from '../../../../../utils/parse';

export const getList = async (queryParams: any) => {
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
    }
    const reqQueryFilters = parse.formatQuery(queryParams);
    const queryResult = await cloudSql.readQuery(reqQueryFilters);
    return {
      data: queryResult[0],
      pagesTotal: Math.ceil(queryResult[1] / queryParams.pageSize),
    };
  } catch (error) {
    loggin.error(error);
    return error;
  }
};

export const getById = async (id: string): Promise<any> => {
  try {
    const result = await cloudSql.readOneQuery(id);
    return result;
  } catch (error) {
    loggin.error(error);
    return error;
  }
};
