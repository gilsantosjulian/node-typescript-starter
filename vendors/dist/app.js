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
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./api/routes"));
const logger_1 = __importDefault(require("./logger"));
const config = require('config');
config_1.loadEnvironmentVariables();
const PORT = config.PORT;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express_1.default();
        app.get('/', routes_1.default.rootRoute);
        app.use('/users', routes_1.default.usersRoute);
        app.use('/vendors', routes_1.default.vendorsRoute);
        app.use((error, req, res, next) => {
            if (error) {
                logger_1.default.error(error);
            }
            res.status(500).send(error.message);
        });
        app.listen(PORT, (err) => {
            if (err) {
                logger_1.default.error(err);
                return;
            }
            logger_1.default.info(`🛡️  Server running on port ${PORT} 🛡️`);
        });
    });
}
startServer();
//# sourceMappingURL=app.js.map