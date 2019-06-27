// import { parseActionData } from '../utils';
import loggin = require('../../../../logger');
import Query from '../entity/query';

const createQuery = async (connection: any, queryData: object) => {
  try {
    /* This is a mock, in only to show how works the entity:
      Here we have to map 'queryData' and fill down query let variable
      let query = new Query();
      query.vendor = 'test';
    */

    const query = new Query();
    query.vendor = 'test';

    const queryRepository = connection.getRepository(Query);
    return queryRepository.save(query).then((query: any) => {
      loggin.info(`Query has been saved. Query id is ${query.id}`);
    });
  } catch (error) {
    loggin.error(error);
    return error;
  }
};
export { createQuery };
