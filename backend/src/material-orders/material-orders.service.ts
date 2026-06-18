import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaterialOrderDto, UpdateMaterialOrderDto } from './dto/material-order.dto';

@Injectable()
export class MaterialOrdersService {
  constructor(private prisma: PrismaService) {}

  async list(
    binderyId: string,
    params: { page?: number; status?: string; materialType?: string },
  ) {
    const page = params.page || 1;
    const limit = 20;
    const where: Record<string, unknown> = { binderyId };
    if (params.status) where.status = params.status;
    if (params.materialType) where.materialType = params.materialType;

    const [data, total] = await Promise.all([
      this.prisma.materialOrder.findMany({
        where,
        orderBy: [{ status: 'asc' }, { customerName: 'asc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.materialOrder.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async pending(binderyId: string) {
    return this.prisma.materialOrder.findMany({
      where: { binderyId, status: { in: ['pending', 'in_progress'] } },
      orderBy: { createdAt: 'asc' },
      take: 10,
    });
  }

  async get(binderyId: string, id: string) {
    const order = await this.prisma.materialOrder.findFirst({
      where: { id, binderyId },
    });
    if (!order) throw new NotFoundException('Tel gerdirme siparişi bulunamadı');
    return order;
  }

  async create(binderyId: string, dto: CreateMaterialOrderDto) {
    return this.prisma.materialOrder.create({ data: { ...dto, binderyId } });
  }

  async update(binderyId: string, id: string, dto: UpdateMaterialOrderDto) {
    await this.get(binderyId, id);
    return this.prisma.materialOrder.update({ where: { id }, data: dto });
  }

  async remove(binderyId: string, id: string) {
    await this.get(binderyId, id);
    return this.prisma.materialOrder.delete({ where: { id } });
  }
}
