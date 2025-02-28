import { CalculatorService } from './calculator.service';
import { ICalculateAffordabilityBodyDto } from './dto/calculate-affordability-body.dto';
import { ICalculateAffordabilityResponseDto } from './dto/calculate-affordability-response.dto';
export declare class CalculatorController {
    private calculatorService;
    constructor(calculatorService: CalculatorService);
    calculateAffordability(calculateAffordabilityBodyDto: ICalculateAffordabilityBodyDto): Promise<ICalculateAffordabilityResponseDto>;
}
