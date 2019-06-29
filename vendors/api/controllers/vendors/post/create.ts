'use strict';
import config from '../../../../config';
import loggin from '../../../../logger';
import cloudSql from '../../../db/cloud-sql';
import http from '../../../services/http';
import tokenGenerator from '../../../services/tokenGenerator';

export const create = async (query: JSON): Promise<any> => {
  try {
    // query -> SHD
    const token = tokenGenerator.generateToken(query);
    const result = await cloudSql.createQuery(query);
    const result2 = await http.post(config.urlBase + '/consultaDoc', query, token);
    return result2;
  } catch (error) {
    loggin.error(error);
    return error;
  }
};
