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
const http_1 = __importDefault(require("../../../../utils/http"));
const getMany = (filters) => __awaiter(this, void 0, void 0, function* () {
    if (filters) {
        const response = yield http_1.default.get('https://pokeapi.co/api/v2/pokemon');
        return response.data.results;
    }
    new Error('Filter object required');
});
module.exports = {
    getMany,
};
//# sourceMappingURL=getMany.js.map