import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { GlazeCategory, GlazeStatus } from '@prisma/client';

export class CreateGlazeChecklistDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(GlazeCategory)
  category?: GlazeCategory;

  @IsOptional()
  @IsString()
  zone?: string;

  @IsDateString()
  scheduledAt: string;

  @IsOptional()
  @IsEnum(GlazeStatus)
  status?: GlazeStatus;
}

export class UpdateGlazeChecklistDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(GlazeCategory)
  category?: GlazeCategory;

  @IsOptional()
  @IsString()
  zone?: string;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @IsOptional()
  @IsEnum(GlazeStatus)
  status?: GlazeStatus;
}
