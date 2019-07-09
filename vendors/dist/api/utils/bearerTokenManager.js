"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const http_1 = __importDefault(require("./http"));
const setBearerToken = (token) => {
    deleteBearerToken();
    http_1.default.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const deleteBearerToken = () => {
    delete http_1.default.defaults.headers.common.Authorization;
};
module.exports = {
    setBearerToken,
    deleteBearerToken,
};
//# sourceMappingURL=bearerTokenManager.js.map