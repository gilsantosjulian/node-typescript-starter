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
// import { parseQueryData } from '../utils';
const loggin = require("../../../../logger");
const query_1 = __importDefault(require("../entity/query"));
const readQuery = (connection, queryData) => __awaiter(this, void 0, void 0, function* () {
    try {
        const queryRepository = connection.getRepository(query_1.default);
        const savedQueries = yield queryRepository.find();
        return savedQueries;
    }
    catch (error) {
        loggin.error(error);
        return error;
    }
});
exports.readQuery = readQuery;
const readOneQuery = (connection, id) => __awaiter(this, void 0, void 0, function* () {
    try {
        const queryRepository = connection.getRepository(query_1.default);
        const savedQuerie = yield queryRepository.findOne({ id });
        return savedQuerie;
    }
    catch (error) {
        loggin.error(error);
        return error;
    }
});
exports.readOneQuery = readOneQuery;
//# sourceMappingURL=index.js.map