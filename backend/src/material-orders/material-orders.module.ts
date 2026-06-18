import { Module } from '@nestjs/common';
import { MaterialOrdersController } from './material-orders.controller';
import { MaterialOrdersService } from './material-orders.service';

@Module({
  controllers: [MaterialOrdersController],
  providers: [MaterialOrdersService],
})
export class MaterialOrdersModule {}
