import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PressStatus, PressType } from '@prisma/client';

export class CreatePressDto {
  @IsString()
  name: string;

  @IsString()
  zone: string;

  @IsOptional()
  @IsEnum(PressType)
  pressType?: PressType;

  @IsOptional()
  @IsString()
  pressModel?: string;

  @IsOptional()
  @IsEnum(PressStatus)
  status?: PressStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdatePressDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  zone?: string;

  @IsOptional()
  @IsEnum(PressType)
  pressType?: PressType;

  @IsOptional()
  @IsString()
  pressModel?: string;

  @IsOptional()
  @IsEnum(PressStatus)
  status?: PressStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
