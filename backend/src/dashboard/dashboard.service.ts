import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(binderyId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const [
      bindery,
      totalPresses,
      availablePresses,
      activePresses,
      totalJobs,
      openPressMaintenance,
      urgentPressMaintenance,
      pendingFinishingChecklist,
      activeServiceRates,
      pendingMaterialOrders,
      completedMaterialOrders,
      revenueTotals,
      recentJobs,
      recentPressMaintenance,
      binderyZones,
    ] = await Promise.all([
      this.prisma.bindery.findUnique({ where: { id: binderyId } }),
      this.prisma.press.count({ where: { binderyId } }),
      this.prisma.press.count({ where: { binderyId, status: 'available' } }),
      this.prisma.press.count({ where: { binderyId, status: 'in_use' } }),
      this.prisma.bindingJob.count({ where: { binderyId } }),
      this.prisma.pressMaintenance.count({
        where: { binderyId, status: { in: ['open', 'in_progress'] } },
      }),
      this.prisma.pressMaintenance.count({
        where: {
          binderyId,
          status: { in: ['open', 'in_progress'] },
          priority: { in: ['high', 'urgent'] },
        },
      }),
      this.prisma.finishingChecklist.count({
        where: {
          binderyId,
          status: { in: ['scheduled', 'overdue'] },
          scheduledAt: { lte: sevenDaysLater },
        },
      }),
      this.prisma.serviceRate.count({
        where: { binderyId, status: 'active' },
      }),
      this.prisma.materialOrder.count({
        where: { binderyId, status: { in: ['pending', 'in_progress'] } },
      }),
      this.prisma.materialOrder.count({
        where: { binderyId, status: { in: ['completed', 'delivered'] } },
      }),
      this.prisma.bindingJob.aggregate({
        where: { binderyId, scheduledAt: { gte: today } },
        _sum: { cashAmount: true, cardAmount: true, rushFee: true },
      }),
      this.prisma.bindingJob.findMany({
        where: { binderyId },
        include: {
          press: { select: { name: true, zone: true, pressType: true } },
        },
        orderBy: { scheduledAt: 'desc' },
        take: 5,
      }),
      this.prisma.pressMaintenance.findMany({
        where: { binderyId, status: { in: ['open', 'in_progress'] } },
        include: {
          press: { select: { name: true, zone: true } },
        },
        orderBy: { reportedAt: 'desc' },
        take: 5,
      }),
      this.prisma.press.groupBy({
        by: ['zone'],
        where: { binderyId },
        _count: { id: true },
      }),
    ]);

    const totalCapacity = bindery?.totalPresses || totalPresses || 1;
    const pressUtilizationRate =
      totalPresses > 0 ? Math.round((activePresses / totalPresses) * 1000) / 10 : 0;

    const dailyRevenue =
      (revenueTotals._sum.cashAmount || 0) +
      (revenueTotals._sum.cardAmount || 0) +
      (revenueTotals._sum.rushFee || 0);

    const dailyRushFees = revenueTotals._sum.rushFee || 0;

    const monthlyTrend = await this.getMonthlyTrend(binderyId, sixMonthsAgo);

    return {
      totalPresses,
      availablePresses,
      activePresses,
      totalCapacity,
      pressUtilizationRate,
      totalJobs,
      openPressMaintenance,
      urgentPressMaintenance,
      pendingFinishingChecklist,
      activeServiceRates,
      pendingMaterialOrders,
      completedMaterialOrders,
      dailyRevenue,
      dailyRushFees,
      recentJobs,
      recentPressMaintenance,
      binderyZones: binderyZones.map((w) => ({
        zone: w.zone,
        pressCount: w._count.id,
      })),
      monthlyTrend,
    };
  }

  private async getMonthlyTrend(binderyId: string, since: Date) {
    const sessions = await this.prisma.bindingJob.findMany({
      where: { binderyId, scheduledAt: { gte: since } },
      select: {
        scheduledAt: true,
        cashAmount: true,
        cardAmount: true,
        rushFee: true,
        pageCount: true,
      },
    });

    const months: Record<string, { games: number; revenue: number; pageCount: number }> = {};

    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      months[key] = { games: 0, revenue: 0, pageCount: 0 };
    }

    sessions.forEach((session) => {
      const key = `${session.scheduledAt.getFullYear()}-${String(session.scheduledAt.getMonth() + 1).padStart(2, '0')}`;
      if (months[key]) {
        months[key].games++;
        months[key].revenue +=
          session.cashAmount + session.cardAmount + session.rushFee;
        months[key].pageCount += session.pageCount;
      }
    });

    return Object.entries(months).map(([month, data]) => ({
      month,
      ...data,
    }));
  }
}
