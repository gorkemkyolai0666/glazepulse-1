import { Module } from '@nestjs/common';
import { PressMaintenanceController } from './press-maintenance.controller';
import { PressMaintenanceService } from './press-maintenance.service';

@Module({
  controllers: [PressMaintenanceController],
  providers: [PressMaintenanceService],
})
export class PressMaintenanceModule {}
