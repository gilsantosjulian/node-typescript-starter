"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv = require('dotenv-safe');
// Set the NODE_ENV to 'development' by default
// process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFound = dotenv.config({
    path: path_1.default.join(__dirname + '/.env'),
    sample: path_1.default.join(__dirname + '/.env.example'),
});
if (!envFound) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
const loadEnvironmentVariables = () => {
    if (!envFound) {
        // This error should crash whole process
        throw new Error("⚠️  Couldn't find .env file  ⚠️");
    }
    else {
        const example = process.env.NODE_ENV === 'development' ? './config/.env' : './config/.env.example';
        return dotenv.config({ example });
    }
};
exports.loadEnvironmentVariables = loadEnvironmentVariables;
//# sourceMappingURL=index.js.map