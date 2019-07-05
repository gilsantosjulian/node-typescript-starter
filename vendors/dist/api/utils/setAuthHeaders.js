"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const http_1 = __importDefault(require("./http"));
const setHeader = (token) => {
    deleteHeader();
    http_1.default.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const deleteHeader = () => {
    delete http_1.default.defaults.headers.common.Authorization;
};
module.exports = {
    setHeader,
    deleteHeader,
};
//# sourceMappingURL=setAuthHeaders.js.map