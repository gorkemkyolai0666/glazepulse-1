import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateBinderyDto } from './dto/update-bindery.dto';

@Injectable()
export class BinderyService {
  constructor(private prisma: PrismaService) {}

  async get(binderyId: string) {
    const bindery = await this.prisma.bindery.findUnique({
      where: { id: binderyId },
    });
    if (!bindery) throw new NotFoundException('Tenis kulübü bulunamadı');
    return bindery;
  }

  async update(binderyId: string, dto: UpdateBinderyDto) {
    await this.get(binderyId);
    return this.prisma.bindery.update({ where: { id: binderyId }, data: dto });
  }
}
