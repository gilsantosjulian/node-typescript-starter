'use strict';
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const moment = __importStar(require("moment"));
const logger_1 = __importDefault(require("../../logger"));
const formatShd = (item) => {
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
    }
    catch (error) {
        logger_1.default.error(error);
        return error;
    }
};
const formatDB = (dataShd, query) => {
    try {
        return {
            vendor: query.params.vendor_wallet,
            invoice: dataShd.Documento.nroRefRecaudo,
            subscription: dataShd.Documento.codigoEAN,
            nature: query.query.nature,
            processor: query.query.nature,
            branch: query.query.nature,
            environment: query.query.nature,
            value: dataShd.Documento.valorRecaudar,
            txId: dataShd.CabeceraResp.idTransaccionOrigen,
            sourceDate: query.query.sourceDate,
            language: dataShd.CabeceraResp.idioma,
            reference: dataShd.Documento.refAdicional,
            resId: dataShd.CabeceraResp.codigoResp,
            responseType: dataShd.CabeceraResp.severidadResp,
            description: dataShd.CabeceraResp.descripcionResp,
            expirationDate: dataShd.Documento.fchVencimiento,
            invoiceStatus: dataShd.Documento.estadoDoc,
            value2: dataShd.Documento.valorConAporte,
            labels: 'object',
        };
    }
    catch (error) {
        logger_1.default.error(error);
        return error;
    }
};
module.exports = {
    formatShd,
    formatDB,
};
//# sourceMappingURL=parse.js.map