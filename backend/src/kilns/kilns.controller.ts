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
import { KilnsService } from './kilns.service';
import { CreateKilnDto, UpdateKilnDto } from './dto/kiln.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('kilns')
@UseGuards(JwtAuthGuard)
export class KilnsController {
  constructor(private kilnsService: KilnsService) {}

  @Get()
  list(
    @Request() req: { user: { potteryStudioId: string } },
    @Query('page') page?: string,
    @Query('status') status?: string,
    @Query('zone') zone?: string,
  ) {
    return this.kilnsService.list(req.user.potteryStudioId, {
      page: page ? parseInt(page, 10) : undefined,
      status,
      zone,
    });
  }

  @Get(':id')
  get(@Request() req: { user: { potteryStudioId: string } }, @Param('id') id: string) {
    return this.kilnsService.get(req.user.potteryStudioId, id);
  }

  @Post()
  @HttpCode(201)
  create(
    @Request() req: { user: { potteryStudioId: string } },
    @Body() dto: CreateKilnDto,
  ) {
    return this.kilnsService.create(req.user.potteryStudioId, dto);
  }

  @Patch(':id')
  update(
    @Request() req: { user: { potteryStudioId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateKilnDto,
  ) {
    return this.kilnsService.update(req.user.potteryStudioId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: { user: { potteryStudioId: string } }, @Param('id') id: string) {
    return this.kilnsService.remove(req.user.potteryStudioId, id);
  }
}
