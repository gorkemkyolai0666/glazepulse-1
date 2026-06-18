import { Module } from '@nestjs/common';
import { KilnMaintenanceController } from './kiln-maintenance.controller';
import { KilnMaintenanceService } from './kiln-maintenance.service';

@Module({
  controllers: [KilnMaintenanceController],
  providers: [KilnMaintenanceService],
})
export class KilnMaintenanceModule {}
