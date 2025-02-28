import { ICalculateAffordabilityBodyDto } from './dto/calculate-affordability-body.dto';
import { ICalculateAffordabilityResponseDto } from './dto/calculate-affordability-response.dto';
export declare class CalculatorService {
    calculateAffordability(calculateAffordabilityBodyDto: ICalculateAffordabilityBodyDto): Promise<ICalculateAffordabilityResponseDto>;
}
