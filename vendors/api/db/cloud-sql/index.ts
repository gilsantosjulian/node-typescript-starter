import { createConnection } from 'typeorm';
import logging from '../../../logger';

import { createQuery } from './create';
import QueryEntity from './entity/query';
import { readOneQuery, readQuery } from './read';

const QUERY_TABLE = 'query';

const connectionConfig: any = {
  type: 'mysql',
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  extra: process.env.INSTANCE_CONNECTION_NAME,
  synchronize: true,
  entities: [QueryEntity],
};

if (process.env.NODE_ENV === 'development') {
  connectionConfig.host = process.env.MYSQL_HOST; // FTP connection
} else {
  connectionConfig.extra = {
    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`, // Sockets connection
  };
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
  readQuery: (filter: any) => connectHoc(readQuery, filter, QUERY_TABLE),
  readOneQuery: (id: string) => connectHoc(readOneQuery, id, QUERY_TABLE),
};
