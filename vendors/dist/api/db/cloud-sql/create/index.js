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
Object.defineProperty(exports, "__esModule", { value: true });
// import { parseActionData } from '../utils';
const loggin = require("../../../../logger");
const query_1 = __importDefault(require("../entity/query"));
const createQuery = (connection, queryData) => __awaiter(this, void 0, void 0, function* () {
    try {
        /* This is a mock, in only to show how works the entity:
          Here we have to map 'queryData' and fill down query let variable
          let query = new Query();
          query.vendor = 'test';
        */
        // const query = new Query();
        // query.vendor = 'test';
        const queryRepository = connection.getRepository(query_1.default);
        return queryRepository.save(queryData).then((query) => {
            loggin.info(`Query has been saved. Query id is ${query.id}`);
        });
    }
    catch (error) {
        loggin.error(error);
        return error;
    }
});
exports.createQuery = createQuery;
//# sourceMappingURL=index.js.map