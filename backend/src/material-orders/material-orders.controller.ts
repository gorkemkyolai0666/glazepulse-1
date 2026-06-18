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
import { MaterialOrdersService } from './material-orders.service';
import { CreateMaterialOrderDto, UpdateMaterialOrderDto } from './dto/material-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('material-orders')
@UseGuards(JwtAuthGuard)
export class MaterialOrdersController {
  constructor(private materialOrdersService: MaterialOrdersService) {}

  @Get()
  list(
    @Request() req: { user: { binderyId: string } },
    @Query('page') page?: string,
    @Query('status') status?: string,
    @Query('materialType') materialType?: string,
  ) {
    return this.materialOrdersService.list(req.user.binderyId, {
      page: page ? parseInt(page, 10) : undefined,
      status,
      materialType,
    });
  }

  @Get('pending')
  pending(@Request() req: { user: { binderyId: string } }) {
    return this.materialOrdersService.pending(req.user.binderyId);
  }

  @Get(':id')
  get(@Request() req: { user: { binderyId: string } }, @Param('id') id: string) {
    return this.materialOrdersService.get(req.user.binderyId, id);
  }

  @Post()
  @HttpCode(201)
  create(
    @Request() req: { user: { binderyId: string } },
    @Body() dto: CreateMaterialOrderDto,
  ) {
    return this.materialOrdersService.create(req.user.binderyId, dto);
  }

  @Patch(':id')
  update(
    @Request() req: { user: { binderyId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateMaterialOrderDto,
  ) {
    return this.materialOrdersService.update(req.user.binderyId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: { user: { binderyId: string } }, @Param('id') id: string) {
    return this.materialOrdersService.remove(req.user.binderyId, id);
  }
}
