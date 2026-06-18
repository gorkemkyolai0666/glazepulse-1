import { Module } from '@nestjs/common';
import { PressesController } from './presses.controller';
import { PressesService } from './presses.service';

@Module({
  controllers: [PressesController],
  providers: [PressesService],
})
export class PressesModule {}
