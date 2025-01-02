import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CalculatorService } from './calculator.service';
import { ICalculateAffordabilityBodyDto } from './dto/calculate-affordability-body.dto';
import { ICalculateAffordabilityResponseDto } from './dto/calculate-affordability-response.dto';

@Controller('calculator')
@ApiTags('Calculator')
export class CalculatorController {
  constructor(private calculatorService: CalculatorService) {}
  @Post('affordability')
  async calculateAffordability(
    @Body() calculateAffordabilityBodyDto: ICalculateAffordabilityBodyDto,
  ): Promise<ICalculateAffordabilityResponseDto> {
    return this.calculatorService.calculateAffordability(
      calculateAffordabilityBodyDto,
    );
  }
}
