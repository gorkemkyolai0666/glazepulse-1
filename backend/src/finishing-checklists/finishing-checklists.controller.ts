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
import { FinishingChecklistService } from './finishing-checklists.service';
import { CreateFinishingChecklistDto, UpdateFinishingChecklistDto } from './dto/finishing-checklist.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('finishing-checklists')
@UseGuards(JwtAuthGuard)
export class FinishingChecklistController {
  constructor(private finishingChecklistService: FinishingChecklistService) {}

  @Get()
  list(
    @Request() req: { user: { binderyId: string } },
    @Query('page') page?: string,
    @Query('status') status?: string,
  ) {
    return this.finishingChecklistService.list(req.user.binderyId, {
      page: page ? parseInt(page, 10) : undefined,
      status,
    });
  }

  @Get(':id')
  get(@Request() req: { user: { binderyId: string } }, @Param('id') id: string) {
    return this.finishingChecklistService.get(req.user.binderyId, id);
  }

  @Post()
  @HttpCode(201)
  create(
    @Request() req: { user: { binderyId: string } },
    @Body() dto: CreateFinishingChecklistDto,
  ) {
    return this.finishingChecklistService.create(req.user.binderyId, dto);
  }

  @Patch(':id')
  update(
    @Request() req: { user: { binderyId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateFinishingChecklistDto,
  ) {
    return this.finishingChecklistService.update(req.user.binderyId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: { user: { binderyId: string } }, @Param('id') id: string) {
    return this.finishingChecklistService.remove(req.user.binderyId, id);
  }
}
