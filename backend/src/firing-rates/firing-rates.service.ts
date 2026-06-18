import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFiringRateDto, UpdateFiringRateDto } from './dto/firing-rate.dto';

@Injectable()
export class FiringRatesService {
  constructor(private prisma: PrismaService) {}

  async list(potteryStudioId: string, params: { page?: number; status?: string }) {
    const page = params.page || 1;
    const limit = 20;
    const where: Record<string, unknown> = { potteryStudioId };
    if (params.status) where.status = params.status;

    const [data, total] = await Promise.all([
      this.prisma.firingRate.findMany({
        where,
        orderBy: { rateCategory: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.firingRate.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async get(potteryStudioId: string, id: string) {
    const tier = await this.prisma.firingRate.findFirst({
      where: { id, potteryStudioId },
    });
    if (!tier) throw new NotFoundException('Tarife bulunamadı');
    return tier;
  }

  async create(potteryStudioId: string, dto: CreateFiringRateDto) {
    return this.prisma.firingRate.create({ data: { ...dto, potteryStudioId } });
  }

  async update(potteryStudioId: string, id: string, dto: UpdateFiringRateDto) {
    await this.get(potteryStudioId, id);
    return this.prisma.firingRate.update({ where: { id }, data: dto });
  }

  async remove(potteryStudioId: string, id: string) {
    await this.get(potteryStudioId, id);
    return this.prisma.firingRate.delete({ where: { id } });
  }
}
