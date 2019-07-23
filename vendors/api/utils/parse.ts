'use strict';

import * as moment from 'moment';
import loggin from '../../logger';

const formatShd = (item: any): any => {
  try {
    const currentDate = moment
      .utc()
      .locale('America/Bogota')
      .format('YYYY-MM-DD HH:mm:ss');

    return {
      Cabecera: {
        idTransaccion: item.query.tx_id,
        codigoCanal: item.query.nature,
        codigoSucursal: item.query.nature,
        codigoBanco: item.query.nature,
        entorno: item.query.nature,
        fchPeticion: currentDate,
        idioma: 'es-co',
      },
      CriterioDoc: {
        nroRefRecaudo: item.params.invoice_id,
        refAdicional: item.query.reference,
        valorRecaudar: Number(item.query.value),
        codigoEAN: item.query.subscription,
      },
    };
  } catch (error) {
    loggin.error(error);
    return error;
  }
};

const formatDB = (dataShd: any, query: any): object => {
  try {
    const currentDate = moment
      .utc()
      .locale('America/Bogota')
      .format('YYYY-MM-DD HH:mm:ss');

    return {
      vendor: query.params.vendor_wallet, // vendor wallet
      invoice: dataShd.Documento.nroRefRecaudo, // nroRefRecaudo
      subscription: dataShd.Documento.codigoEAN, // codigoEAN
      nature: query.query.nature, // codigoCanal
      processor: query.query.processor, // codigoBanco
      branch: query.query.branch, // codigoSucursal
      environment: query.query.environment, // entorno
      value: dataShd.Documento.valorRecaudar, // valorRecaudar
      txId: dataShd.CabeceraResp.idTransaccionOrigen, // idTransaccion
      sourceDate: query.query.sourceDate, // fchPeticion
      language: dataShd.CabeceraResp.idioma, // idioma
      reference: dataShd.Documento.refAdicional, // refAdicional
      resId: dataShd.CabeceraResp.codigoResp, // codigoResp
      responseType: dataShd.CabeceraResp.severidadResp, // severidadResp
      description: dataShd.CabeceraResp.descripcionResp, // descripcionResp
      expirationDate: dataShd.Documento.fchVencimiento, // fchVencimiento
      invoiceStatus: dataShd.Documento.estadoDoc, // estadoDoc
      value2: dataShd.Documento.valorConAporte, // valorConAporte
      labels: 'object',
      created: currentDate,
      updated: currentDate,
    };
  } catch (error) {
    loggin.error(error);
    return error;
  }
};

const formatQuery = (query: any): object => {
  return {
    data: {
      vendor: query.vendor ? query.vendor : null,
      invoice: query.invoice ? query.invoice : null,
      subscription: query.subscription ? query.subscription : null,
      nature: query.nature ? query.nature : null,
      processor: query.processor ? query.processor : null,
      branch: query.branch ? query.branch : null,
      environment: query.environment ? query.environment : null,
      value: query.value ? query.value : null,
      txId: query.txId ? query.txId : null,
      sourceDate: query.sourceDate ? query.sourceDate : null,
      language: query.language ? query.language : null,
      reference: query.reference ? query.reference : null,
      resId: query.resId ? query.resId : null,
      responseType: query.responseType ? query.responseType : null,
      description: query.description ? query.description : null,
      expirationDate: query.expirationDate ? query.expirationDate : null,
      invoiceStatus: query.invoiceStatus ? query.invoiceStatus : null,
      value2: query.value2 ? query.value2 : null,
      labels: query.labels ? query.labels : null,
      created: query.created ? query.created : null,
      updated: query.updated ? query.updated : null,
    },
    filters: {
      select: query.select ? query.select : null,
      page: query.page ? query.page : null,
      groupBy: query.groupBy ? query.groupBy : null,
      pageSize: query.pageSize ? query.pageSize : null,
    },
  };
};

export = {
  formatShd,
  formatDB,
  formatQuery,
};
