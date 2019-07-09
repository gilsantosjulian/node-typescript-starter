'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../../../logger"));
const http_1 = __importDefault(require("../../../utils/http"));
const setAuthHeaders_1 = __importDefault(require("../../../utils/setAuthHeaders"));
const jwtModule_1 = __importDefault(require("../../../utils/jwtModule"));
exports.create = (query) => __awaiter(this, void 0, void 0, function* () {
    try {
        // query -> SHD
        // data should be replace with mapped data
        let data;
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
        const token = jwtModule_1.default.sign(data);
        setAuthHeaders_1.default.setHeader(token);
        const resultSHDGet = yield http_1.default.post('/consultaDoc', data);
        return resultSHDGet.data;
        // Uncoment to use cloudSql, TODO after mappers, http.post and cloudSql have to work together
        // const resultCloudSql = await cloudSql.createQuery(query);
        // return resultCloudSql;
    }
    catch (error) {
        logger_1.default.error(error);
        return error;
    }
});
//# sourceMappingURL=create.js.map