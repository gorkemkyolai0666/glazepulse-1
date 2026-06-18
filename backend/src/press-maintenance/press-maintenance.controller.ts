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
import { PressMaintenanceService } from './press-maintenance.service';
import {
  CreatePressMaintenanceDto,
  UpdatePressMaintenanceDto,
} from './dto/press-maintenance.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('press-maintenance')
@UseGuards(JwtAuthGuard)
export class PressMaintenanceController {
  constructor(private pressMaintenanceService: PressMaintenanceService) {}

  @Get()
  list(
    @Request() req: { user: { binderyId: string } },
    @Query('page') page?: string,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
  ) {
    return this.pressMaintenanceService.list(req.user.binderyId, {
      page: page ? parseInt(page, 10) : undefined,
      status,
      priority,
    });
  }

  @Get('urgent')
  urgent(@Request() req: { user: { binderyId: string } }) {
    return this.pressMaintenanceService.urgent(req.user.binderyId);
  }

  @Get(':id')
  get(@Request() req: { user: { binderyId: string } }, @Param('id') id: string) {
    return this.pressMaintenanceService.get(req.user.binderyId, id);
  }

  @Post()
  @HttpCode(201)
  create(
    @Request() req: { user: { binderyId: string } },
    @Body() dto: CreatePressMaintenanceDto,
  ) {
    return this.pressMaintenanceService.create(req.user.binderyId, dto);
  }

  @Patch(':id')
  update(
    @Request() req: { user: { binderyId: string } },
    @Param('id') id: string,
    @Body() dto: UpdatePressMaintenanceDto,
  ) {
    return this.pressMaintenanceService.update(req.user.binderyId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: { user: { binderyId: string } }, @Param('id') id: string) {
    return this.pressMaintenanceService.remove(req.user.binderyId, id);
  }
}
