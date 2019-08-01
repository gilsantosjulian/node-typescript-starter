'use strict';
import loggin from '../../../../../../logger';
import cloudSql from '../../../../../db/cloud-sql';
import bearerTokenManager from '../../../../../utils/bearerTokenManager';
import http from '../../../../../utils/http';
import jwtManager from '../../../../../utils/jwtManager';
import parseJson from '../../../../../utils/parse';
import errorMaper from './utils/errorMaper';

export const create = async (query: any): Promise<any> => {
  try {
    // query -> SHD
    const data: any = parseJson.formatShd(query);

    // comment from here to use SHD response data
    const respShd: any = {
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
        valorRecaudar: query.query.value,
        fchVencimiento: '2018-08-22',
        estadoDoc: 'Disponible',
        valorConAporte: query.query.value,
      },
    };

    const dataDB = parseJson.formatDB(respShd, query);
    const errorCode = String(respShd.CabeceraResp.codigoResp);

    await cloudSql.createQuery(dataDB);
    const result: any = {
      data: dataDB,
      error: errorMaper.mapper(errorCode),
    };
    return result;

    // comment to here, if you want to use SHD response data

    // comment from here if you want to use mock data
    // const token = jwtManager.sign(data);
    // bearerTokenManager.setBearerToken(token);

    // const respShd = await http.post('/consultaDoc', data);

    // const dataDB = parseJson.formatDB(respShd.data, query);
    // const errorCode = String(respShd.data.CabeceraResp.codigoResp);
    // await cloudSql.createQuery(dataDB);

    // const result: any = {
    //   data: dataDB,
    //   error: errorMaper.mapper(errorCode),
    // };
    // return result;
    // comment to here if you want to use mock data
  } catch (error) {
    loggin.error(error);
    return error;
  }
};
