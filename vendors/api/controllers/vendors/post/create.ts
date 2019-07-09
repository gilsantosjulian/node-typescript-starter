'use strict';
import loggin from '../../../../logger';
import cloudSql from '../../../db/cloud-sql';
import bearerTokenManager from '../../../utils/bearerTokenManager';
import http from '../../../utils/http';
import jwtManager from '../../../utils/jwtManager';
import parseJson from '../../../utils/parse';

export const create = async (query: any): Promise<any> => {
  try {
    // query -> SHD
    const data: object = parseJson.formatShd(query);

    const respShd: object = {
      CabeceraResp: {
        codigoResp: '200',
        severidadResp: 'I',
        descripcionResp: 'Exito',
        idTransaccionOrigen: '823heww912',
        fchRespuesta: '2018-08-21 10:11:00',
        idioma: 'es-co',
      },
      Documento: {
        nroRefRecaudo: '1234784901',
        codigoEAN: '6676532982721',
        refAdicional: 'NA',
        valorRecaudar: '300000',
        fchVencimiento: '2018-08-22',
        estadoDoc: 'Disponible',
        valorConAporte: '315000',
      },
    };

    const token = jwtManager.sign(data);
    bearerTokenManager.setBearerToken(token);
    const dataDB = parseJson.formatDB(respShd, query);
    // const resultSHDGet = await http.post('/consultaDoc', data);
    // return resultSHDGet.data;
    // Uncoment to use cloudSql, TODO after mappers, http.post and cloudSql have to work together
    const resultCloudSql = await cloudSql.createQuery(dataDB);
    return resultCloudSql;
  } catch (error) {
    loggin.error(error);
    return error;
  }
};
