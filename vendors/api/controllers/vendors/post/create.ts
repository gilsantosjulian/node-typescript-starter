'use strict';
import loggin from '../../../../logger';
import cloudSql from '../../../db/cloud-sql';
import bearerTokenManager from '../../../utils/bearerTokenManager';
import http from '../../../utils/http';
import jwtManager from '../../../utils/jwtManager';
import parseJson from '../../../utils/parse-shd';
import errorMaper from './helpers/errorMaper';

export const create = async (query: any): Promise<any> => {
  try {
    // query -> SHD
    const data: object = parseJson.generate(query);

    const token = jwtManager.sign(data);
    bearerTokenManager.setBearerToken(token);

    const resultSHDGet = await http.post('/consultaDoc', data);
    const errorCode = String(resultSHDGet.data.CabeceraResp.codigoResp);
    const result: any = {
      data: resultSHDGet.data,
      error: errorMaper.mapper(errorCode),
    };
    return result;
    // Uncoment to use cloudSql, TODO after mappers, http.post and cloudSql have to work together
    // const resultCloudSql = await cloudSql.createQuery(query);
    // return resultCloudSql;
  } catch (error) {
    loggin.error(error);
    return error;
  }
};
