"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorService = void 0;
const common_1 = require("@nestjs/common");
let CalculatorService = class CalculatorService {
    async calculateAffordability(calculateAffordabilityBodyDto) {
        const { monthlyIncome, monthlyDebt, availableFunds } = calculateAffordabilityBodyDto;
        const easyDTI = 0.25;
        const stretchDTI = 0.35;
        const difficultDTI = 0.45;
        const disposableIncome = monthlyIncome - monthlyDebt;
        if (disposableIncome <= 0) {
            throw new common_1.BadRequestException('Debt exceeds or equals income. Adjust inputs.');
        }
        const easyHousingPayment = disposableIncome * easyDTI;
        const stretchHousingPayment = disposableIncome * stretchDTI;
        const difficultHousingPayment = disposableIncome * difficultDTI;
        const interestRate = 5 / 100 / 12;
        const loanTermMonths = 30 * 12;
        const calculateLoanAmount = (monthlyPayment) => {
            return ((monthlyPayment * (1 - Math.pow(1 + interestRate, -loanTermMonths))) /
                interestRate);
        };
        const easyLoanAmount = calculateLoanAmount(easyHousingPayment);
        const stretchLoanAmount = calculateLoanAmount(stretchHousingPayment);
        const difficultLoanAmount = calculateLoanAmount(difficultHousingPayment);
        const easyMax = Math.round(easyLoanAmount + availableFunds);
        const stretchMax = Math.round(stretchLoanAmount + availableFunds);
        const difficultMax = Math.round(difficultLoanAmount + availableFunds);
        return {
            easy: [0, easyMax],
            stretch: [easyMax, stretchMax],
            difficult: [stretchMax, difficultMax],
        };
    }
};
exports.CalculatorService = CalculatorService;
exports.CalculatorService = CalculatorService = __decorate([
    (0, common_1.Injectable)()
], CalculatorService);
//# sourceMappingURL=calculator.service.js.map