import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { KilnMaintenanceService } from './kiln-maintenance.service';
import {
  CreateKilnMaintenanceDto,
  UpdateKilnMaintenanceDto,
} from './dto/kiln-maintenance.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('kiln-maintenance')
@UseGuards(JwtAuthGuard)
export class KilnMaintenanceController {
  constructor(private kilnMaintenanceService: KilnMaintenanceService) {}

  @Get()
  list(
    @Request() req: { user: { potteryStudioId: string } },
    @Query('page') page?: string,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
  ) {
    return this.kilnMaintenanceService.list(req.user.potteryStudioId, {
      page: page ? parseInt(page, 10) : undefined,
      status,
      priority,
    });
  }

  @Get('urgent')
  urgent(@Request() req: { user: { potteryStudioId: string } }) {
    return this.kilnMaintenanceService.urgent(req.user.potteryStudioId);
  }

  @Get(':id')
  get(@Request() req: { user: { potteryStudioId: string } }, @Param('id') id: string) {
    return this.kilnMaintenanceService.get(req.user.potteryStudioId, id);
  }

  @Post()
  @HttpCode(201)
  create(
    @Request() req: { user: { potteryStudioId: string } },
    @Body() dto: CreateKilnMaintenanceDto,
  ) {
    return this.kilnMaintenanceService.create(req.user.potteryStudioId, dto);
  }

  @Patch(':id')
  update(
    @Request() req: { user: { potteryStudioId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateKilnMaintenanceDto,
  ) {
    return this.kilnMaintenanceService.update(req.user.potteryStudioId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: { user: { potteryStudioId: string } }, @Param('id') id: string) {
    return this.kilnMaintenanceService.remove(req.user.potteryStudioId, id);
  }
}
