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
const cloud_sql_1 = __importDefault(require("../../../db/cloud-sql"));
const bearerTokenManager_1 = __importDefault(require("../../../utils/bearerTokenManager"));
const jwtManager_1 = __importDefault(require("../../../utils/jwtManager"));
const parse_1 = __importDefault(require("../../../utils/parse"));
exports.create = (query) => __awaiter(this, void 0, void 0, function* () {
    try {
        // query -> SHD
        const data = parse_1.default.formatShd(query);
        const respShd = {
            CabeceraResp: {
                codigoResp: '200',
                severidadResp: 'I',
                descripcionResp: 'Exito',
                idTransaccionOrigen: '823heww912',
                fchRespuesta: '2018-08-21 10:11:00',
                idioma: 'es-co',
            },
            Documento: {
                nroRefRecaudo: '1234784901',
                codigoEAN: '6676532982721',
                refAdicional: 'NA',
                valorRecaudar: '300000',
                fchVencimiento: '2018-08-22',
                estadoDoc: 'Disponible',
                valorConAporte: '315000',
            },
        };
        const token = jwtManager_1.default.sign(data);
        bearerTokenManager_1.default.setBearerToken(token);
        const dataDB = parse_1.default.formatDB(respShd, query);
        // const resultSHDGet = await http.post('/consultaDoc', data);
        // return resultSHDGet.data;
        // Uncoment to use cloudSql, TODO after mappers, http.post and cloudSql have to work together
        const resultCloudSql = yield cloud_sql_1.default.createQuery(dataDB);
        return resultCloudSql;
    }
    catch (error) {
        logger_1.default.error(error);
        return error;
    }
});
//# sourceMappingURL=create.js.map