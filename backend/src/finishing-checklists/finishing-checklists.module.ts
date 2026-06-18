import { Module } from '@nestjs/common';
import { FinishingChecklistController } from './finishing-checklists.controller';
import { FinishingChecklistService } from './finishing-checklists.service';

@Module({
  controllers: [FinishingChecklistController],
  providers: [FinishingChecklistService],
})
export class FinishingChecklistModule {}
