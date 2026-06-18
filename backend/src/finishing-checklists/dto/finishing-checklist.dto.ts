import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { FinishingCategory, FinishingStatus } from '@prisma/client';

export class CreateFinishingChecklistDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(FinishingCategory)
  category?: FinishingCategory;

  @IsOptional()
  @IsString()
  zone?: string;

  @IsDateString()
  scheduledAt: string;

  @IsOptional()
  @IsEnum(FinishingStatus)
  status?: FinishingStatus;
}

export class UpdateFinishingChecklistDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(FinishingCategory)
  category?: FinishingCategory;

  @IsOptional()
  @IsString()
  zone?: string;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @IsOptional()
  @IsEnum(FinishingStatus)
  status?: FinishingStatus;
}
