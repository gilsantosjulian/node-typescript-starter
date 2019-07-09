"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs = __importStar(require("fs"));
const jwt = __importStar(require("jsonwebtoken"));
const md5_1 = __importDefault(require("md5"));
const config = require('config');
const logger_1 = __importDefault(require("../../logger"));
const jwtSecretKey = fs.readFileSync(process.env.JWT_SECRET, 'utf8');
const iss = 'ConsultaDocumento';
const sub = 'ACHS';
const algorithm = 'RS256';
const sign = (body) => {
    try {
        const date = new Date();
        const jti = md5_1.default(JSON.stringify(body));
        const payload = {
            jti,
            iss,
            sub,
            iat: date.getTime(),
        };
        return jwt.sign(payload, jwtSecretKey, {
            algorithm,
            header: {
                typ: 'jwt',
            },
        });
    }
    catch (error) {
        logger_1.default.error(error);
        return error;
    }
};
const verify = (token, key) => {
    try {
        return jwt.verify(token, key);
    }
    catch (error) {
        logger_1.default.error(error);
        return false;
    }
};
const decode = (token) => {
    try {
        return jwt.decode(token, { complete: true });
    }
    catch (error) {
        logger_1.default.error(error);
        return false;
    }
};
module.exports = {
    sign,
    verify,
    decode,
};
//# sourceMappingURL=jwtManager.js.map