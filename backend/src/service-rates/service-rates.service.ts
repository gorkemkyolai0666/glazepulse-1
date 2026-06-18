import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceRateDto, UpdateServiceRateDto } from './dto/service-rate.dto';

@Injectable()
export class ServiceRatesService {
  constructor(private prisma: PrismaService) {}

  async list(binderyId: string, params: { page?: number; status?: string }) {
    const page = params.page || 1;
    const limit = 20;
    const where: Record<string, unknown> = { binderyId };
    if (params.status) where.status = params.status;

    const [data, total] = await Promise.all([
      this.prisma.serviceRate.findMany({
        where,
        orderBy: { rateCategory: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.serviceRate.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async get(binderyId: string, id: string) {
    const tier = await this.prisma.serviceRate.findFirst({
      where: { id, binderyId },
    });
    if (!tier) throw new NotFoundException('Tarife bulunamadı');
    return tier;
  }

  async create(binderyId: string, dto: CreateServiceRateDto) {
    return this.prisma.serviceRate.create({ data: { ...dto, binderyId } });
  }

  async update(binderyId: string, id: string, dto: UpdateServiceRateDto) {
    await this.get(binderyId, id);
    return this.prisma.serviceRate.update({ where: { id }, data: dto });
  }

  async remove(binderyId: string, id: string) {
    await this.get(binderyId, id);
    return this.prisma.serviceRate.delete({ where: { id } });
  }
}
