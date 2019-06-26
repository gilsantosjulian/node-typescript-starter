"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("../../logger"));
const token = "";
const http = axios_1.default.create({
    baseURL: "",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${token}`
    }
});
http.interceptors.request.use(request => {
    logger_1.default.debug(`API call: ${request.baseURL}${request.url}`);
    return request;
});
const get = (url) => {
    return http.get(url);
};
const post = (url, data) => {
    return http.post(url, data);
};
module.exports = {
    get,
    post
};
//# sourceMappingURL=http.js.map