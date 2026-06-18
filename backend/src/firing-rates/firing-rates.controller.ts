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
import { FiringRatesService } from './firing-rates.service';
import { CreateFiringRateDto, UpdateFiringRateDto } from './dto/firing-rate.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('firing-rates')
@UseGuards(JwtAuthGuard)
export class FiringRatesController {
  constructor(private firingRatesService: FiringRatesService) {}

  @Get()
  list(
    @Request() req: { user: { potteryStudioId: string } },
    @Query('page') page?: string,
    @Query('status') status?: string,
  ) {
    return this.firingRatesService.list(req.user.potteryStudioId, {
      page: page ? parseInt(page, 10) : undefined,
      status,
    });
  }

  @Get(':id')
  get(@Request() req: { user: { potteryStudioId: string } }, @Param('id') id: string) {
    return this.firingRatesService.get(req.user.potteryStudioId, id);
  }

  @Post()
  @HttpCode(201)
  create(
    @Request() req: { user: { potteryStudioId: string } },
    @Body() dto: CreateFiringRateDto,
  ) {
    return this.firingRatesService.create(req.user.potteryStudioId, dto);
  }

  @Patch(':id')
  update(
    @Request() req: { user: { potteryStudioId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateFiringRateDto,
  ) {
    return this.firingRatesService.update(req.user.potteryStudioId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: { user: { potteryStudioId: string } }, @Param('id') id: string) {
    return this.firingRatesService.remove(req.user.potteryStudioId, id);
  }
}
