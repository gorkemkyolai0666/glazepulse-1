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
import { ServiceRatesService } from './service-rates.service';
import { CreateServiceRateDto, UpdateServiceRateDto } from './dto/service-rate.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('service-rates')
@UseGuards(JwtAuthGuard)
export class ServiceRatesController {
  constructor(private serviceRatesService: ServiceRatesService) {}

  @Get()
  list(
    @Request() req: { user: { binderyId: string } },
    @Query('page') page?: string,
    @Query('status') status?: string,
  ) {
    return this.serviceRatesService.list(req.user.binderyId, {
      page: page ? parseInt(page, 10) : undefined,
      status,
    });
  }

  @Get(':id')
  get(@Request() req: { user: { binderyId: string } }, @Param('id') id: string) {
    return this.serviceRatesService.get(req.user.binderyId, id);
  }

  @Post()
  @HttpCode(201)
  create(
    @Request() req: { user: { binderyId: string } },
    @Body() dto: CreateServiceRateDto,
  ) {
    return this.serviceRatesService.create(req.user.binderyId, dto);
  }

  @Patch(':id')
  update(
    @Request() req: { user: { binderyId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateServiceRateDto,
  ) {
    return this.serviceRatesService.update(req.user.binderyId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: { user: { binderyId: string } }, @Param('id') id: string) {
    return this.serviceRatesService.remove(req.user.binderyId, id);
  }
}
