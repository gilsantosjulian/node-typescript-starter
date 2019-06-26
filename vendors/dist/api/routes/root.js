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
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("../../logger"));
const router = express_1.default.Router();
router.use(logger_1.default.requestLogger);
router.use(logger_1.default.errorLogger);
router.get('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const response = '🛡️  Server is working 🛡️';
    res.status(200).send({
        code: 200,
        status: 'success',
        message: response,
        data: null,
    });
}));
module.exports = router;
//# sourceMappingURL=root.js.map