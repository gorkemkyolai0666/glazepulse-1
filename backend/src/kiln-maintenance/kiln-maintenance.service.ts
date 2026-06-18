import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateKilnMaintenanceDto,
  UpdateKilnMaintenanceDto,
} from './dto/kiln-maintenance.dto';

@Injectable()
export class KilnMaintenanceService {
  constructor(private prisma: PrismaService) {}

  async list(
    potteryStudioId: string,
    params: { page?: number; status?: string; priority?: string },
  ) {
    const page = params.page || 1;
    const limit = 20;
    const where: Record<string, unknown> = { potteryStudioId };
    if (params.status) where.status = params.status;
    if (params.priority) where.priority = params.priority;

    const [data, total] = await Promise.all([
      this.prisma.kilnMaintenance.findMany({
        where,
        orderBy: { reportedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          kiln: { select: { id: true, name: true, zone: true } },
        },
      }),
      this.prisma.kilnMaintenance.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async urgent(potteryStudioId: string) {
    return this.prisma.kilnMaintenance.findMany({
      where: {
        potteryStudioId,
        status: { in: ['open', 'in_progress'] },
        priority: { in: ['high', 'urgent'] },
      },
      include: { kiln: { select: { name: true, zone: true } } },
      orderBy: { reportedAt: 'desc' },
      take: 10,
    });
  }

  async get(potteryStudioId: string, id: string) {
    const maintenance = await this.prisma.kilnMaintenance.findFirst({
      where: { id, potteryStudioId },
      include: { kiln: true },
    });
    if (!maintenance) throw new NotFoundException('Top makinesi bakım kaydı bulunamadı');
    return maintenance;
  }

  async create(potteryStudioId: string, dto: CreateKilnMaintenanceDto) {
    return this.prisma.kilnMaintenance.create({
      data: {
        ...dto,
        potteryStudioId,
        reportedAt: dto.reportedAt ? new Date(dto.reportedAt) : new Date(),
      },
      include: { kiln: true },
    });
  }

  async update(potteryStudioId: string, id: string, dto: UpdateKilnMaintenanceDto) {
    await this.get(potteryStudioId, id);
    const data = { ...dto };
    if (dto.reportedAt) {
      (data as { reportedAt?: Date }).reportedAt = new Date(dto.reportedAt);
    }
    if (dto.completedAt) {
      (data as { completedAt?: Date }).completedAt = new Date(dto.completedAt);
    }
    return this.prisma.kilnMaintenance.update({
      where: { id },
      data,
      include: { kiln: true },
    });
  }

  async remove(potteryStudioId: string, id: string) {
    await this.get(potteryStudioId, id);
    return this.prisma.kilnMaintenance.delete({ where: { id } });
  }
}
