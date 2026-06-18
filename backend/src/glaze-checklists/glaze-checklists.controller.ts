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
import { GlazeChecklistService } from './glaze-checklists.service';
import { CreateGlazeChecklistDto, UpdateGlazeChecklistDto } from './dto/glaze-checklist.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('glaze-checklists')
@UseGuards(JwtAuthGuard)
export class GlazeChecklistController {
  constructor(private glazeChecklistService: GlazeChecklistService) {}

  @Get()
  list(
    @Request() req: { user: { potteryStudioId: string } },
    @Query('page') page?: string,
    @Query('status') status?: string,
  ) {
    return this.glazeChecklistService.list(req.user.potteryStudioId, {
      page: page ? parseInt(page, 10) : undefined,
      status,
    });
  }

  @Get(':id')
  get(@Request() req: { user: { potteryStudioId: string } }, @Param('id') id: string) {
    return this.glazeChecklistService.get(req.user.potteryStudioId, id);
  }

  @Post()
  @HttpCode(201)
  create(
    @Request() req: { user: { potteryStudioId: string } },
    @Body() dto: CreateGlazeChecklistDto,
  ) {
    return this.glazeChecklistService.create(req.user.potteryStudioId, dto);
  }

  @Patch(':id')
  update(
    @Request() req: { user: { potteryStudioId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateGlazeChecklistDto,
  ) {
    return this.glazeChecklistService.update(req.user.potteryStudioId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: { user: { potteryStudioId: string } }, @Param('id') id: string) {
    return this.glazeChecklistService.remove(req.user.potteryStudioId, id);
  }
}
