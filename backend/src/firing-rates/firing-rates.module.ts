import { Module } from '@nestjs/common';
import { FiringRatesController } from './firing-rates.controller';
import { FiringRatesService } from './firing-rates.service';

@Module({
  controllers: [FiringRatesController],
  providers: [FiringRatesService],
})
export class FiringRatesModule {}
