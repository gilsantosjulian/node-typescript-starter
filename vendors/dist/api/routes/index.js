'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const root_1 = __importDefault(require("./root"));
const users_1 = __importDefault(require("./users"));
const vendors_1 = __importDefault(require("./vendors"));
module.exports = {
    rootRoute: root_1.default,
    usersRoute: users_1.default,
    vendorsRoute: vendors_1.default,
};
//# sourceMappingURL=index.js.map