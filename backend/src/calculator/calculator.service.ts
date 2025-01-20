import { BadRequestException, Injectable } from '@nestjs/common';
import { ICalculateAffordabilityBodyDto } from './dto/calculate-affordability-body.dto';
import { ICalculateAffordabilityResponseDto } from './dto/calculate-affordability-response.dto';

@Injectable()
export class CalculatorService {
  async calculateAffordability(
    calculateAffordabilityBodyDto: ICalculateAffordabilityBodyDto,
  ): Promise<ICalculateAffordabilityResponseDto> {
    const { monthlyIncome, monthlyDebt, availableFunds } =
      calculateAffordabilityBodyDto;

    //dti - debt-to-income
    const easyDTI = 0.25;
    const stretchDTI = 0.35;
    const difficultDTI = 0.45;

    const disposableIncome = monthlyIncome - monthlyDebt;

    if (disposableIncome <= 0) {
      throw new BadRequestException(
        'Debt exceeds or equals income. Adjust inputs.',
      );
    }

    const easyHousingPayment = disposableIncome * easyDTI;
    const stretchHousingPayment = disposableIncome * stretchDTI;
    const difficultHousingPayment = disposableIncome * difficultDTI;

    const interestRate = 5 / 100 / 12; // Monthly interest rate
    const loanTermMonths = 30 * 12; // 30 years in months

    const calculateLoanAmount = (monthlyPayment: number): number => {
      return (
        (monthlyPayment * (1 - Math.pow(1 + interestRate, -loanTermMonths))) /
        interestRate
      );
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
}
