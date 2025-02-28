"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsCleanupModule = void 0;
const common_1 = require("@nestjs/common");
const aws_cleanup_service_1 = require("./aws-cleanup.service");
const aws_module_1 = require("../aws/aws.module");
const listings_module_1 = require("../listings/listings.module");
let AwsCleanupModule = class AwsCleanupModule {
};
exports.AwsCleanupModule = AwsCleanupModule;
exports.AwsCleanupModule = AwsCleanupModule = __decorate([
    (0, common_1.Module)({
        providers: [aws_cleanup_service_1.AwsCleanupService],
        imports: [aws_module_1.AwsModule, listings_module_1.ListingsModule],
    })
], AwsCleanupModule);
//# sourceMappingURL=aws-cleanup.module.js.map