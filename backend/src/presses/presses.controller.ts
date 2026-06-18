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
import { PressesService } from './presses.service';
import { CreatePressDto, UpdatePressDto } from './dto/press.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('presses')
@UseGuards(JwtAuthGuard)
export class PressesController {
  constructor(private pressesService: PressesService) {}

  @Get()
  list(
    @Request() req: { user: { binderyId: string } },
    @Query('page') page?: string,
    @Query('status') status?: string,
    @Query('zone') zone?: string,
  ) {
    return this.pressesService.list(req.user.binderyId, {
      page: page ? parseInt(page, 10) : undefined,
      status,
      zone,
    });
  }

  @Get(':id')
  get(@Request() req: { user: { binderyId: string } }, @Param('id') id: string) {
    return this.pressesService.get(req.user.binderyId, id);
  }

  @Post()
  @HttpCode(201)
  create(
    @Request() req: { user: { binderyId: string } },
    @Body() dto: CreatePressDto,
  ) {
    return this.pressesService.create(req.user.binderyId, dto);
  }

  @Patch(':id')
  update(
    @Request() req: { user: { binderyId: string } },
    @Param('id') id: string,
    @Body() dto: UpdatePressDto,
  ) {
    return this.pressesService.update(req.user.binderyId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: { user: { binderyId: string } }, @Param('id') id: string) {
    return this.pressesService.remove(req.user.binderyId, id);
  }
}
