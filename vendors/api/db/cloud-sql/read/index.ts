// import { parseQueryData } from '../utils';
import loggin = require('../../../../logger');
import Query from '../entity/query';

const readQuery = async (connection: any, queryData: object) => {
  try {
    const queryRepository = connection.getRepository(Query);
    const savedQueries = await queryRepository.find();
    return savedQueries;
  } catch (error) {
    loggin.error(error);
    return error;
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
