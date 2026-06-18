import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBindingJobDto, UpdateBindingJobDto } from './dto/binding-job.dto';

@Injectable()
export class BindingJobsService {
  constructor(private prisma: PrismaService) {}

  async list(binderyId: string, params: { page?: number; status?: string }) {
    const page = params.page || 1;
    const limit = 20;
    const where: Record<string, unknown> = { binderyId };
    if (params.status) where.status = params.status;

    const [data, total] = await Promise.all([
      this.prisma.bindingJob.findMany({
        where,
        orderBy: { scheduledAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          press: { select: { id: true, name: true, zone: true, pressType: true } },
        },
      }),
      this.prisma.bindingJob.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async get(binderyId: string, id: string) {
    const session = await this.prisma.bindingJob.findFirst({
      where: { id, binderyId },
      include: { press: true },
    });
    if (!session) throw new NotFoundException('Ders oturumu bulunamadı');
    return session;
  }

  async create(binderyId: string, dto: CreateBindingJobDto) {
    return this.prisma.bindingJob.create({
      data: {
        ...dto,
        binderyId,
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : new Date(),
      },
      include: { press: true },
    });
  }

  async update(binderyId: string, id: string, dto: UpdateBindingJobDto) {
    await this.get(binderyId, id);
    const data = { ...dto };
    if (dto.scheduledAt) {
      (data as { scheduledAt?: Date }).scheduledAt = new Date(dto.scheduledAt);
    }
    return this.prisma.bindingJob.update({
      where: { id },
      data,
      include: { press: true },
    });
  }

  async remove(binderyId: string, id: string) {
    await this.get(binderyId, id);
    return this.prisma.bindingJob.delete({ where: { id } });
  }
}
