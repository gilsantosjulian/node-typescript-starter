'use strict';

import * as moment from 'moment';
import loggin from '../../logger';

const formatShd = (item: any): any => {
  try {
    console.log(item.query.value, 'item query');
    const currentDate = moment
      .default()
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
    console.log(dataShd, 'dataSHD');
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
