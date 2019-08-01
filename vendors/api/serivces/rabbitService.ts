import http from '../../api/utils/http';
import loggin from '../../logger';
const config = require('config');

const URL = `${config.rabbit.PROTOCOL}://${config.rabbit.HOST}:${config.rabbit.PORT}/queues`;

export const sendQueue = (data: object) => {
  try {
    const response = http.post(URL, data);
    return response;
  } catch (error) {
    loggin.error(error);
    return error;
  }
};
