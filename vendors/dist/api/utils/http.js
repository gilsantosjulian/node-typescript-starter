"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const logger_1 = __importDefault(require("../../logger"));
const http = axios_1.default.create({
    baseURL: config_1.default.urlBase,
    headers: {
        'Content-Type': 'application/json',
    },
});
http.interceptors.request.use(request => {
    logger_1.default.debug(`API call: ${request.baseURL}${request.url}`);
    return request;
});
const get = (url) => {
    return http.get(url);
};
const post = (requestUrl, requestData) => {
    return http.post(requestUrl, requestData);
};
const defaults = http.defaults;
module.exports = {
    get,
    post,
    defaults,
};
//# sourceMappingURL=http.js.map