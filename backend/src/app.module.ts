import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { BinderyModule } from './bindery/bindery.module';
import { PressesModule } from './presses/presses.module';
import { BindingJobsModule } from './binding-jobs/binding-jobs.module';
import { PressMaintenanceModule } from './press-maintenance/press-maintenance.module';
import { FinishingChecklistModule } from './finishing-checklists/finishing-checklists.module';
import { ServiceRatesModule } from './service-rates/service-rates.module';
import { MaterialOrdersModule } from './material-orders/material-orders.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    AuthModule,
    BinderyModule,
    PressesModule,
    BindingJobsModule,
    PressMaintenanceModule,
    FinishingChecklistModule,
    ServiceRatesModule,
    MaterialOrdersModule,
    DashboardModule,
  ],
})
export class AppModule {}
