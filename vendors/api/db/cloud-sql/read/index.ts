// import { parseQueryData } from '../utils';
import loggin = require('../../../../logger');
import Query from '../entity/query';
import queryBuilder from './helpers/queryBuilder';

const readQuery = async (connection: any, queryData: object) => {
  try {
    const buildedQuery: any = connection.getRepository(Query).createQueryBuilder();
    const data = await queryBuilder.builder(queryData, buildedQuery);
    return data;
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

// const readFilteredQuery = async (connection: any, filter: any) => {
//   try {
//     const buildedQuery: any = connection.getRepository(Query).createQueryBuilder();
//     const data = await queryBuilder.builder(filter, buildedQuery);
//     return data;
//   } catch (error) {
//     loggin.error(error);
//     return { error };
//   }
// };
export { readQuery, readOneQuery };
