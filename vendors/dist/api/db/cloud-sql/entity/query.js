"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Query = class Query {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Query.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Query.prototype, "vendor", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Query.prototype, "invoice", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Query.prototype, "subscription", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Query.prototype, "nature", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Query.prototype, "processor", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Query.prototype, "branch", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Query.prototype, "environment", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Query.prototype, "value", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Query.prototype, "txId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Query.prototype, "sourceDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Query.prototype, "language", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Query.prototype, "reference", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Query.prototype, "resId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Query.prototype, "responseType", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Query.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Query.prototype, "expirationDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Query.prototype, "invoiceStatus", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Query.prototype, "value2", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Query.prototype, "labels", void 0);
Query = __decorate([
    typeorm_1.Entity()
], Query);
exports.default = Query;
//# sourceMappingURL=query.js.map