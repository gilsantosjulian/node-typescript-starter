'use strict';
import * as moment from 'moment';
import config from '../../../../config';
import loggin from '../../../../logger';
import cloudSql from '../../../db/cloud-sql';
import http from '../../../utils/http';
import jwtModule from '../../../utils/jwtModule';
import setHeader from '../../../utils/setAuthHeaders';

export const create = async (query: any): Promise<any> => {
  try {
    // query -> SHD
    // data should be replace with mapped data
    let data: any;
    const currentDate = moment
      .default()
      .locale('America/Bogota')
      .format('YYYY-MM-DD HH:mm:ss');
    data = {
      Cabecera: {
        idTransaccion: query.idTransaccion,
        codigoCanal: query.codigoCanal,
        codigoSucursal: query.codigoSucursal,
        codigoBanco: query.codigoBanco,
        entorno: query.entorno,
        fchPeticion: currentDate,
        idioma: 'es-co',
      },
      CriterioDoc: {
        nroRefRecaudo: query.nroRefRecaudo,
        refAdicional: query.refAdicional,
        valorRecaudar: Number(query.valorRecaudar),
      },
    };

    // data = query

    const token = jwtModule.sign(data);

    setHeader.setHeader(token);

    const resultSHDGet = await http.post('/consultaDoc', data);
    return resultSHDGet.data;
    // Uncoment to use cloudSql, TODO after mappers, http.post and cloudSql have to work together
    // const resultCloudSql = await cloudSql.createQuery(query);
    // return resultCloudSql;
  } catch (error) {
    loggin.error(error);
    return error;
  }
};
