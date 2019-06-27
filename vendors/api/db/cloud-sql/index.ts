import { createConnection } from 'typeorm';
import logging from '../../../logger';

import { createQuery } from './create';
import QueryEntity from './entity/query';
import { readOneQuery, readQuery } from './read';

const QUERY_TABLE = 'queries';

const connectionConfig: any = {
  type: 'mysql',
  host: '35.196.100.211',
  port: '3306',
  username: 'root',
  password: 'Lem99xAIiw4tntxi',
  database: 'vendors',
  extra: 'ach-shd-test:us-east1:shd-api-tst',
  synchronize: true,
  entities: [QueryEntity],
};

const { NODE_ENV, MINKA_ENV } = process.env;
if (NODE_ENV === MINKA_ENV && NODE_ENV !== 'production') {
  connectionConfig.host = 'config.MYSQL_HOST';
} else {
  // connectionConfig.extra = {
  //   socketPath: `/cloudsql/${config.INSTANCE_CONNECTION_NAME)}`,
  // };
}

let connection: any = null;
const connectHoc = async (fn: any, data: any, table: string) => {
  try {
    if (connection === null) {
      connection = await createConnection(connectionConfig);
    }
    return fn(connection, data, table);
  } catch (error) {
    logging.error(`Code: 500 - ${error.message}`);
  }
};

export = {
  createQuery: (queryData: object) => connectHoc(createQuery, queryData, QUERY_TABLE),
  readQuery: () => connectHoc(readQuery, {}, QUERY_TABLE),
  readOneQuery: (id: string) => connectHoc(readOneQuery, id, QUERY_TABLE),
};
