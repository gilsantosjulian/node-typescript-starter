'use strict';

import * as moment from 'moment';
import loggin from '../../logger';

const formatShd = (item: any): object => {
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

const formatDB = (dataShd: any, query: any): object => {
  try {
    return {
      vendor: query.params.vendor_wallet, // vendor wallet
      invoice: dataShd.Documento.nroRefRecaudo, // nroRefRecaudo
      subscription: dataShd.Documento.codigoEAN, // codigoEAN
      nature: query.query.nature, // codigoCanal
      processor: query.query.nature, // codigoBanco
      branch: query.query.nature, // codigoSucursal
      environment: query.query.nature, // entorno
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
    };
  } catch (error) {
    loggin.error(error);
    return error;
  }
};

export = {
  formatShd,
  formatDB,
};
