'use strict';
import config from '../../../../config';
import loggin from '../../../../logger';
import cloudSql from '../../../db/cloud-sql';
import http from '../../../services/http';
import tokenGenerator from '../../../services/tokenGenerator';

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
    const result2 = await http.post(config.urlBase + '/consultaDoc', data, token);
    return result2.data;
  } catch (error) {
    loggin.error(error);
    return error;
  }
};
