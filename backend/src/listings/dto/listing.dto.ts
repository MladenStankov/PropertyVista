import { IsNumber, IsString } from 'class-validator';
import { ConstructionType } from '../types/construction-type.dto';
import { ListingType } from '../types/listing-type.dto';
import { User } from '../../users/entity/user.entity';
import { ApiHideProperty } from '@nestjs/swagger';

export class ListingDto {
  @IsString()
  description?: string;

  constructionType?: ConstructionType;

  @IsNumber()
  constructionYear?: number;

  @IsNumber()
  price: number;

  @IsNumber()
  livingSurface?: number;

  type: ListingType;

  @ApiHideProperty()
  user?: User;
}
