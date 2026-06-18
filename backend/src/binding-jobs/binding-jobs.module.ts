import { Module } from '@nestjs/common';
import { BindingJobsController } from './binding-jobs.controller';
import { BindingJobsService } from './binding-jobs.service';

@Module({
  controllers: [BindingJobsController],
  providers: [BindingJobsService],
})
export class BindingJobsModule {}
