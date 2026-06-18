import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { PotteryStudioService } from './pottery-studio.service';
import { UpdatePotteryStudioDto } from './dto/update-pottery-studio.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pottery-studio')
@UseGuards(JwtAuthGuard)
export class PotteryStudioController {
  constructor(private potteryStudioService: PotteryStudioService) {}

  @Get()
  get(@Request() req: { user: { potteryStudioId: string } }) {
    return this.potteryStudioService.get(req.user.potteryStudioId);
  }

  @Patch()
  update(
    @Request() req: { user: { potteryStudioId: string } },
    @Body() dto: UpdatePotteryStudioDto,
  ) {
    return this.potteryStudioService.update(req.user.potteryStudioId, dto);
  }
}
