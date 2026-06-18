import { IsEnum, IsOptional, IsString } from 'class-validator';
import { KilnStatus, KilnType } from '@prisma/client';

export class CreateKilnDto {
  @IsString()
  name: string;

  @IsString()
  zone: string;

  @IsOptional()
  @IsEnum(KilnType)
  kilnType?: KilnType;

  @IsOptional()
  @IsString()
  kilnModel?: string;

  @IsOptional()
  @IsEnum(KilnStatus)
  status?: KilnStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateKilnDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  zone?: string;

  @IsOptional()
  @IsEnum(KilnType)
  kilnType?: KilnType;

  @IsOptional()
  @IsString()
  kilnModel?: string;

  @IsOptional()
  @IsEnum(KilnStatus)
  status?: KilnStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
