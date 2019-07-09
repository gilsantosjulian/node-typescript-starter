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
exports.getAll = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const result = yield cloud_sql_1.default.readQuery();
        return result;
    }
    catch (error) {
        logger_1.default.error(error);
        return error;
    }
});
//# sourceMappingURL=getAll.js.map