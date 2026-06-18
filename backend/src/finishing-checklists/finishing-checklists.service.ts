import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFinishingChecklistDto, UpdateFinishingChecklistDto } from './dto/finishing-checklist.dto';

@Injectable()
export class FinishingChecklistService {
  constructor(private prisma: PrismaService) {}

  async list(binderyId: string, params: { page?: number; status?: string }) {
    const page = params.page || 1;
    const limit = 20;
    const where: Record<string, unknown> = { binderyId };
    if (params.status) where.status = params.status;

    const [data, total] = await Promise.all([
      this.prisma.finishingChecklist.findMany({
        where,
        orderBy: { scheduledAt: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.finishingChecklist.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async get(binderyId: string, id: string) {
    const maintenance = await this.prisma.finishingChecklist.findFirst({
      where: { id, binderyId },
    });
    if (!maintenance) throw new NotFoundException('Kort bakım kaydı bulunamadı');
    return maintenance;
  }

  async create(binderyId: string, dto: CreateFinishingChecklistDto) {
    return this.prisma.finishingChecklist.create({
      data: {
        ...dto,
        binderyId,
        scheduledAt: new Date(dto.scheduledAt),
      },
    });
  }

  async update(binderyId: string, id: string, dto: UpdateFinishingChecklistDto) {
    await this.get(binderyId, id);
    const data = { ...dto };
    if (dto.scheduledAt) {
      (data as { scheduledAt?: Date }).scheduledAt = new Date(dto.scheduledAt);
    }
    return this.prisma.finishingChecklist.update({ where: { id }, data });
  }

  async remove(binderyId: string, id: string) {
    await this.get(binderyId, id);
    return this.prisma.finishingChecklist.delete({ where: { id } });
  }
}
