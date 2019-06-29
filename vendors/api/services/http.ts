import axios from 'axios';
import Response from 'types/response';
import logging from '../../logger';

const token = '';

const http = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${token}`,
  },
});

http.interceptors.request.use(request => {
  logging.debug(`API call: ${request.baseURL}${request.url}`);
  return request;
});

const get = (url: string): Promise<Response> => {
  return http.get(url);
};

const post = (url: string, data: object, token: string): Promise<Response> => {
  return http({
    method: 'post',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    data,
  });
};

export = {
  get,
  post,
};
