import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { FiringCategory, FiringRateStatus } from '@prisma/client';

export class CreateFiringRateDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsEnum(FiringCategory)
  rateCategory?: FiringCategory;

  @IsNumber()
  @Min(0)
  basePrice: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  priceMultiplier?: number;

  @IsOptional()
  @IsEnum(FiringRateStatus)
  status?: FiringRateStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateFiringRateDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(FiringCategory)
  rateCategory?: FiringCategory;

  @IsOptional()
  @IsNumber()
  @Min(0)
  basePrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  priceMultiplier?: number;

  @IsOptional()
  @IsEnum(FiringRateStatus)
  status?: FiringRateStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
