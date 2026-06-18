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
import { BindingJobsService } from './binding-jobs.service';
import { CreateBindingJobDto, UpdateBindingJobDto } from './dto/binding-job.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('binding-jobs')
@UseGuards(JwtAuthGuard)
export class BindingJobsController {
  constructor(private bindingJobsService: BindingJobsService) {}

  @Get()
  list(
    @Request() req: { user: { binderyId: string } },
    @Query('page') page?: string,
    @Query('status') status?: string,
  ) {
    return this.bindingJobsService.list(req.user.binderyId, {
      page: page ? parseInt(page, 10) : undefined,
      status,
    });
  }

  @Get(':id')
  get(@Request() req: { user: { binderyId: string } }, @Param('id') id: string) {
    return this.bindingJobsService.get(req.user.binderyId, id);
  }

  @Post()
  @HttpCode(201)
  create(
    @Request() req: { user: { binderyId: string } },
    @Body() dto: CreateBindingJobDto,
  ) {
    return this.bindingJobsService.create(req.user.binderyId, dto);
  }

  @Patch(':id')
  update(
    @Request() req: { user: { binderyId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateBindingJobDto,
  ) {
    return this.bindingJobsService.update(req.user.binderyId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: { user: { binderyId: string } }, @Param('id') id: string) {
    return this.bindingJobsService.remove(req.user.binderyId, id);
  }
}
