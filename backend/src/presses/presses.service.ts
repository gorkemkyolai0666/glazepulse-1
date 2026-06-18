import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePressDto, UpdatePressDto } from './dto/press.dto';

@Injectable()
export class PressesService {
  constructor(private prisma: PrismaService) {}

  async list(binderyId: string, params: { page?: number; status?: string; zone?: string }) {
    const page = params.page || 1;
    const limit = 20;
    const where: Record<string, unknown> = { binderyId };
    if (params.status) where.status = params.status;
    if (params.zone) where.zone = params.zone;

    const [data, total] = await Promise.all([
      this.prisma.press.findMany({
        where,
        orderBy: [{ zone: 'asc' }, { name: 'asc' }],
        skip: (page - 1) * limit,
        take: limit,
        include: {
          pressMaintenance: {
            where: { status: { in: ['open', 'in_progress'] } },
            take: 1,
            orderBy: { reportedAt: 'desc' },
          },
        },
      }),
      this.prisma.press.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async get(binderyId: string, id: string) {
    const court = await this.prisma.press.findFirst({
      where: { id, binderyId },
      include: {
        pressMaintenance: { orderBy: { reportedAt: 'desc' }, take: 5 },
        bindingJobs: { orderBy: { scheduledAt: 'desc' }, take: 5 },
      },
    });
    if (!court) throw new NotFoundException('İstasyon bulunamadı');
    return court;
  }

  async create(binderyId: string, dto: CreatePressDto) {
    return this.prisma.press.create({ data: { ...dto, binderyId } });
  }

  async update(binderyId: string, id: string, dto: UpdatePressDto) {
    await this.get(binderyId, id);
    return this.prisma.press.update({ where: { id }, data: dto });
  }

  async remove(binderyId: string, id: string) {
    await this.get(binderyId, id);
    return this.prisma.press.delete({ where: { id } });
  }
}
