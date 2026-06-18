import { Module } from '@nestjs/common';
import { KilnsController } from './kilns.controller';
import { KilnsService } from './kilns.service';

@Module({
  controllers: [KilnsController],
  providers: [KilnsService],
})
export class KilnsModule {}
