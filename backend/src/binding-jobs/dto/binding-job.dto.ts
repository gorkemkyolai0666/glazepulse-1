import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { BindingType, JobStatus } from '@prisma/client';

export class CreateBindingJobDto {
  @IsUUID()
  pressId: string;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @IsOptional()
  @IsEnum(BindingType)
  bindingType?: BindingType;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cashAmount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cardAmount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pageCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  rushFee?: number;

  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateBindingJobDto {
  @IsOptional()
  @IsUUID()
  pressId?: string;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @IsOptional()
  @IsEnum(BindingType)
  bindingType?: BindingType;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cashAmount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cardAmount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pageCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  rushFee?: number;

  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
