import { SortType } from '../types/sort-type.type';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AmenityType } from '../types/amenity-type.dto';
import { ConstructionType } from '../types/construction-type.dto';
import { ListingType } from '../types/listing-type.dto';

export class GetAllQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(ListingType)
  type?: ListingType;

  @IsOptional()
  minPrice?: number;

  @IsOptional()
  maxPrice?: number;

  @IsOptional()
  @IsEnum(ConstructionType)
  constructionType?: ConstructionType;

  @IsOptional()
  minSurfaceArea?: number;

  @IsOptional()
  maxSurfaceArea?: number;

  @IsOptional()
  minYear?: number;

  @IsOptional()
  maxYear?: number;

  @IsOptional()
  minBedrooms?: number;

  @IsOptional()
  maxBedrooms?: number;

  @IsOptional()
  minBathrooms?: number;

  @IsOptional()
  maxBathrooms?: number;

  @IsOptional()
  minOtherRooms?: number;

  @IsOptional()
  maxOtherRooms?: number;

  @IsOptional()
  minFloors?: number;

  @IsOptional()
  maxFloors?: number;

  @IsOptional()
  amenities?: AmenityType[];

  @IsOptional()
  @IsEnum(SortType)
  sort?: SortType;
}
