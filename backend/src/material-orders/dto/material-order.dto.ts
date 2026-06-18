import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { MaterialOrderStatus } from '@prisma/client';

export class CreateMaterialOrderDto {
  @IsString()
  customerName: string;

  @IsString()
  materialType: string;

  @IsOptional()
  @IsString()
  supplierName?: string;

  @IsOptional()
  @IsEnum(MaterialOrderStatus)
  status?: MaterialOrderStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateMaterialOrderDto {
  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsString()
  materialType?: string;

  @IsOptional()
  @IsString()
  supplierName?: string;

  @IsOptional()
  @IsEnum(MaterialOrderStatus)
  status?: MaterialOrderStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
