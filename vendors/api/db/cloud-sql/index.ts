import { createConnection } from 'typeorm';
import logging from '../../../logger';

import { createQuery } from './create';
import QueryEntity from './entity/query';
import { readFilteredQuery, readOneQuery, readQuery } from './read';

const QUERY_TABLE = 'queries';

const connectionConfig: any = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: '3306',
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  extra: process.env.INSTANCE_CONNECTION_NAME,
  synchronize: true,
  entities: [QueryEntity],
};

const { NODE_ENV, MINKA_ENV } = process.env;
if (NODE_ENV === MINKA_ENV && NODE_ENV !== 'production') {
  connectionConfig.host = process.env.MYSQL_HOST;
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
  readFilteredQuery: (filter: any) => connectHoc(readFilteredQuery, filter, QUERY_TABLE),
};
