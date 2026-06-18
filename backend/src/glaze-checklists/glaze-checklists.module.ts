import { Module } from '@nestjs/common';
import { GlazeChecklistController } from './glaze-checklists.controller';
import { GlazeChecklistService } from './glaze-checklists.service';

@Module({
  controllers: [GlazeChecklistController],
  providers: [GlazeChecklistService],
})
export class GlazeChecklistModule {}
