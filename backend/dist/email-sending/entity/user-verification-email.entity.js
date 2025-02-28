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
exports.UserVerification = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let UserVerification = class UserVerification {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, userEmail: { required: true, type: () => String }, token: { required: true, type: () => String }, expirationDate: { required: true, type: () => Date } };
    }
};
exports.UserVerification = UserVerification;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserVerification.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserVerification.prototype, "userEmail", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserVerification.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], UserVerification.prototype, "expirationDate", void 0);
exports.UserVerification = UserVerification = __decorate([
    (0, typeorm_1.Entity)('UserVerification')
], UserVerification);
//# sourceMappingURL=user-verification-email.entity.js.map