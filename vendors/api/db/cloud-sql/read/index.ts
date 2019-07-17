// import { parseQueryData } from '../utils';
import loggin = require('../../../../logger');
import Query from '../entity/query';
import queryBuilder from './helpers/queryBuilder';

const readQuery = async (connection: any, queryData: object) => {
  try {
    const buildedQuery: any = connection
      .getRepository(Query)
      .createQueryBuilder('entity');
    const filteredData = await queryBuilder.builder(queryData, buildedQuery);
    return filteredData;
  } catch (error) {
    loggin.error(error);
    return { error };
  }
};

const readOneQuery = async (connection: any, id: string) => {
  try {
    const queryRepository = connection.getRepository(Query);
    const savedQuerie = await queryRepository.findOne({ id });
    return savedQuerie;
  } catch (error) {
    loggin.error(error);
    return error;
  }
};
export { readQuery, readOneQuery };
