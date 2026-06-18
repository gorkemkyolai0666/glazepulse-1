import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGlazeChecklistDto, UpdateGlazeChecklistDto } from './dto/glaze-checklist.dto';

@Injectable()
export class GlazeChecklistService {
  constructor(private prisma: PrismaService) {}

  async list(potteryStudioId: string, params: { page?: number; status?: string }) {
    const page = params.page || 1;
    const limit = 20;
    const where: Record<string, unknown> = { potteryStudioId };
    if (params.status) where.status = params.status;

    const [data, total] = await Promise.all([
      this.prisma.glazeChecklist.findMany({
        where,
        orderBy: { scheduledAt: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.glazeChecklist.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async get(potteryStudioId: string, id: string) {
    const maintenance = await this.prisma.glazeChecklist.findFirst({
      where: { id, potteryStudioId },
    });
    if (!maintenance) throw new NotFoundException('Kort bakım kaydı bulunamadı');
    return maintenance;
  }

  async create(potteryStudioId: string, dto: CreateGlazeChecklistDto) {
    return this.prisma.glazeChecklist.create({
      data: {
        ...dto,
        potteryStudioId,
        scheduledAt: new Date(dto.scheduledAt),
      },
    });
  }

  async update(potteryStudioId: string, id: string, dto: UpdateGlazeChecklistDto) {
    await this.get(potteryStudioId, id);
    const data = { ...dto };
    if (dto.scheduledAt) {
      (data as { scheduledAt?: Date }).scheduledAt = new Date(dto.scheduledAt);
    }
    return this.prisma.glazeChecklist.update({ where: { id }, data });
  }

  async remove(potteryStudioId: string, id: string) {
    await this.get(potteryStudioId, id);
    return this.prisma.glazeChecklist.delete({ where: { id } });
  }
}
