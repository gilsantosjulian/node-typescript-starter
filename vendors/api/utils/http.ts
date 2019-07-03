import axios from 'axios';
import Response from 'types/response';
import config from '../../config';
import logging from '../../logger';

const http = axios.create({
  baseURL: config.urlBase,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(request => {
  logging.debug(`API call: ${request.baseURL}${request.url}`);
  return request;
});

const get = (url: string): Promise<Response> => {
  return http.get(url);
};

const post = (requestUrl: string, requestData: any): Promise<Response> => {
  return http.post(requestUrl, requestData);
};

const defaults = http.defaults;

export = {
  get,
  post,
  defaults,
};
