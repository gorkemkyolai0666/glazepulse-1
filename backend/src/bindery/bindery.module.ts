import { Module } from '@nestjs/common';
import { BinderyController } from './bindery.controller';
import { BinderyService } from './bindery.service';

@Module({
  controllers: [BinderyController],
  providers: [BinderyService],
})
export class BinderyModule {}
