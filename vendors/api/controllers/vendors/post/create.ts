'use strict';
import config from '../../../../config';
import loggin from '../../../../logger';
import cloudSql from '../../../db/cloud-sql';
import http from '../../../utils/http';
import setHeader from '../../../utils/setAuthHeaders';
import tokenGenerator from '../../../utils/tokenGenerator';

export const create = async (query: any): Promise<any> => {
  try {
    // query -> SHD
    // data should be replace with mapped data
    let data: any;
    data = {
      Cabecera: {
        idTransaccion: query.idTransaccion,
        codigoCanal: query.codigoCanal,
        codigoSucursal: query.codigoSucursal,
        codigoBanco: query.codigoBanco,
        entorno: query.entorno,
        fchPeticion: '2019-06-13 16:19:06',
        idioma: 'es-co',
      },
      CriterioDoc: {
        nroRefRecaudo: query.nroRefRecaudo,
        refAdicional: query.refAdicional,
        valorRecaudar: Number(query.valorRecaudar),
      },
    };

    // data = query

    const token = tokenGenerator.generateToken(data);

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
