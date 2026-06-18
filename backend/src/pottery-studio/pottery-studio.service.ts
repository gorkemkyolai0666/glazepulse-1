import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePotteryStudioDto } from './dto/update-pottery-studio.dto';

@Injectable()
export class PotteryStudioService {
  constructor(private prisma: PrismaService) {}

  async get(potteryStudioId: string) {
    const potteryStudio = await this.prisma.potteryStudio.findUnique({
      where: { id: potteryStudioId },
    });
    if (!potteryStudio) throw new NotFoundException('Tenis kulübü bulunamadı');
    return potteryStudio;
  }

  async update(potteryStudioId: string, dto: UpdatePotteryStudioDto) {
    await this.get(potteryStudioId);
    return this.prisma.potteryStudio.update({ where: { id: potteryStudioId }, data: dto });
  }
}
