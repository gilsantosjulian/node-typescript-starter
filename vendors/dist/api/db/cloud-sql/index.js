"use strict";
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
const typeorm_1 = require("typeorm");
const logger_1 = __importDefault(require("../../../logger"));
const create_1 = require("./create");
const query_1 = __importDefault(require("./entity/query"));
const read_1 = require("./read");
const QUERY_TABLE = 'queries';
const connectionConfig = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: '3306',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    extra: process.env.INSTANCE_CONNECTION_NAME,
    synchronize: true,
    entities: [query_1.default],
};
const { NODE_ENV, MINKA_ENV } = process.env;
if (NODE_ENV === MINKA_ENV && NODE_ENV !== 'production') {
    connectionConfig.host = process.env.MYSQL_HOST;
}
else {
    // connectionConfig.extra = {
    //   socketPath: `/cloudsql/${config.INSTANCE_CONNECTION_NAME)}`,
    // };
}
let connection = null;
const connectHoc = (fn, data, table) => __awaiter(this, void 0, void 0, function* () {
    try {
        console.log(data);
        if (connection === null) {
            connection = yield typeorm_1.createConnection(connectionConfig);
        }
        return fn(connection, data, table);
    }
    catch (error) {
        logger_1.default.error(`Code: 500 - ${error.message}`);
    }
});
module.exports = {
    createQuery: (queryData) => connectHoc(create_1.createQuery, queryData, QUERY_TABLE),
    readQuery: () => connectHoc(read_1.readQuery, {}, QUERY_TABLE),
    readOneQuery: (id) => connectHoc(read_1.readOneQuery, id, QUERY_TABLE),
};
//# sourceMappingURL=index.js.map