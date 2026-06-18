import { Module } from '@nestjs/common';
import { PotteryStudioController } from './pottery-studio.controller';
import { PotteryStudioService } from './pottery-studio.service';

@Module({
  controllers: [PotteryStudioController],
  providers: [PotteryStudioService],
})
export class PotteryStudioModule {}
