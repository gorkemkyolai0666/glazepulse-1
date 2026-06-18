import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreatePressMaintenanceDto,
  UpdatePressMaintenanceDto,
} from './dto/press-maintenance.dto';

@Injectable()
export class PressMaintenanceService {
  constructor(private prisma: PrismaService) {}

  async list(
    binderyId: string,
    params: { page?: number; status?: string; priority?: string },
  ) {
    const page = params.page || 1;
    const limit = 20;
    const where: Record<string, unknown> = { binderyId };
    if (params.status) where.status = params.status;
    if (params.priority) where.priority = params.priority;

    const [data, total] = await Promise.all([
      this.prisma.pressMaintenance.findMany({
        where,
        orderBy: { reportedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          press: { select: { id: true, name: true, zone: true } },
        },
      }),
      this.prisma.pressMaintenance.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async urgent(binderyId: string) {
    return this.prisma.pressMaintenance.findMany({
      where: {
        binderyId,
        status: { in: ['open', 'in_progress'] },
        priority: { in: ['high', 'urgent'] },
      },
      include: { press: { select: { name: true, zone: true } } },
      orderBy: { reportedAt: 'desc' },
      take: 10,
    });
  }

  async get(binderyId: string, id: string) {
    const maintenance = await this.prisma.pressMaintenance.findFirst({
      where: { id, binderyId },
      include: { press: true },
    });
    if (!maintenance) throw new NotFoundException('Top makinesi bakım kaydı bulunamadı');
    return maintenance;
  }

  async create(binderyId: string, dto: CreatePressMaintenanceDto) {
    return this.prisma.pressMaintenance.create({
      data: {
        ...dto,
        binderyId,
        reportedAt: dto.reportedAt ? new Date(dto.reportedAt) : new Date(),
      },
      include: { press: true },
    });
  }

  async update(binderyId: string, id: string, dto: UpdatePressMaintenanceDto) {
    await this.get(binderyId, id);
    const data = { ...dto };
    if (dto.reportedAt) {
      (data as { reportedAt?: Date }).reportedAt = new Date(dto.reportedAt);
    }
    if (dto.completedAt) {
      (data as { completedAt?: Date }).completedAt = new Date(dto.completedAt);
    }
    return this.prisma.pressMaintenance.update({
      where: { id },
      data,
      include: { press: true },
    });
  }

  async remove(binderyId: string, id: string) {
    await this.get(binderyId, id);
    return this.prisma.pressMaintenance.delete({ where: { id } });
  }
}
