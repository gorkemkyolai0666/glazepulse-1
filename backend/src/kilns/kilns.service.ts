import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKilnDto, UpdateKilnDto } from './dto/kiln.dto';

@Injectable()
export class KilnsService {
  constructor(private prisma: PrismaService) {}

  async list(potteryStudioId: string, params: { page?: number; status?: string; zone?: string }) {
    const page = params.page || 1;
    const limit = 20;
    const where: Record<string, unknown> = { potteryStudioId };
    if (params.status) where.status = params.status;
    if (params.zone) where.zone = params.zone;

    const [data, total] = await Promise.all([
      this.prisma.kiln.findMany({
        where,
        orderBy: [{ zone: 'asc' }, { name: 'asc' }],
        skip: (page - 1) * limit,
        take: limit,
        include: {
          kilnMaintenance: {
            where: { status: { in: ['open', 'in_progress'] } },
            take: 1,
            orderBy: { reportedAt: 'desc' },
          },
        },
      }),
      this.prisma.kiln.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async get(potteryStudioId: string, id: string) {
    const court = await this.prisma.kiln.findFirst({
      where: { id, potteryStudioId },
      include: {
        kilnMaintenance: { orderBy: { reportedAt: 'desc' }, take: 5 },
        firingBatches: { orderBy: { scheduledAt: 'desc' }, take: 5 },
      },
    });
    if (!court) throw new NotFoundException('İstasyon bulunamadı');
    return court;
  }

  async create(potteryStudioId: string, dto: CreateKilnDto) {
    return this.prisma.kiln.create({ data: { ...dto, potteryStudioId } });
  }

  async update(potteryStudioId: string, id: string, dto: UpdateKilnDto) {
    await this.get(potteryStudioId, id);
    return this.prisma.kiln.update({ where: { id }, data: dto });
  }

  async remove(potteryStudioId: string, id: string) {
    await this.get(potteryStudioId, id);
    return this.prisma.kiln.delete({ where: { id } });
  }
}
