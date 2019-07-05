'use strict';

import * as moment from 'moment';
import loggin from '../../logger';

const generate = (item: any): object => {
  try {
    const currentDate = moment
      .default()
      .locale('America/Bogota')
      .format('YYYY-MM-DD HH:mm:ss');

    return {
      Cabecera: {
        idTransaccion: item.idTransaccion,
        codigoCanal: item.codigoCanal,
        codigoSucursal: item.codigoSucursal,
        codigoBanco: item.codigoBanco,
        entorno: item.entorno,
        fchPeticion: currentDate,
        idioma: 'es-co',
      },
      CriterioDoc: {
        nroRefRecaudo: item.nroRefRecaudo,
        refAdicional: item.refAdicional,
        valorRecaudar: Number(item.valorRecaudar),
        codigoEAN: item.subscription,
      },
    };
  } catch (error) {
    loggin.error(error);
    return error;
  }
};

const db = (data: any): object => {
  try {
    return {
      id: '2341',
      vendor: data.vendor, // vendor wallet
      invoice: data.nroRefRecaudo, // nroRefRecaudo
      subscription: data.codigoEAN, // codigoEAN
      nature: data.codigoCanal, // codigoCanal
      processor: data.codigoBanco, // codigoBanco
      branch: data.codigoSucursal, // codigoSucursal
      environment: data.entorno, // entorno
      value: data.valorRecaudar, // valorRecaudar
      txId: data.idTransaccion, // idTransaccion
      sourceDate: data.fchPeticion, // fchPeticion
      language: data.idioma, // idioma
      reference: data.refAdicional, // refAdicional
      resId: data.codigoResp, // codigoResp
      responseType: data.severidadResp, // severidadResp
      description: data.descripcionResp, // descripcionResp
      expirationDate: data.fchVencimiento, // fchVencimiento
      invoiceStatus: data.estadoDoc, // estadoDoc
      value2: data.valorConAporte, // valorConAporte
      labels: 'object',
    };
  } catch (error) {
    loggin.error(error);
    return error;
  }
};

export = {
  generate,
  db,
};
