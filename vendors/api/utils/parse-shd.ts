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

export = {
  generate,
};
