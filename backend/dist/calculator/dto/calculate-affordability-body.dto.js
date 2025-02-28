"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICalculateAffordabilityBodyDto = void 0;
const openapi = require("@nestjs/swagger");
class ICalculateAffordabilityBodyDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { monthlyIncome: { required: true, type: () => Number }, monthlyDebt: { required: true, type: () => Number }, availableFunds: { required: true, type: () => Number } };
    }
}
exports.ICalculateAffordabilityBodyDto = ICalculateAffordabilityBodyDto;
//# sourceMappingURL=calculate-affordability-body.dto.js.map