import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { BinderyService } from './bindery.service';
import { UpdateBinderyDto } from './dto/update-bindery.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bindery')
@UseGuards(JwtAuthGuard)
export class BinderyController {
  constructor(private binderyService: BinderyService) {}

  @Get()
  get(@Request() req: { user: { binderyId: string } }) {
    return this.binderyService.get(req.user.binderyId);
  }

  @Patch()
  update(
    @Request() req: { user: { binderyId: string } },
    @Body() dto: UpdateBinderyDto,
  ) {
    return this.binderyService.update(req.user.binderyId, dto);
  }
}
