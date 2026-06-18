import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DashboardService', () => {
  let service: DashboardService;

  const mockPrisma = {
    bindery: { findUnique: jest.fn() },
    press: { count: jest.fn(), groupBy: jest.fn() },
    bindingJob: {
      count: jest.fn(),
      aggregate: jest.fn(),
      findMany: jest.fn().mockResolvedValue([]),
    },
    pressMaintenance: { count: jest.fn(), findMany: jest.fn().mockResolvedValue([]) },
    finishingChecklist: { count: jest.fn() },
    serviceRate: { count: jest.fn() },
    materialOrder: { count: jest.fn() },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    jest.clearAllMocks();
  });

  it('should return bindering shop dashboard stats', async () => {
    mockPrisma.bindery.findUnique.mockResolvedValue({ totalPresses: 8 });
    mockPrisma.press.count
      .mockResolvedValueOnce(8)
      .mockResolvedValueOnce(4)
      .mockResolvedValueOnce(2);
    mockPrisma.bindingJob.count.mockResolvedValue(42);
    mockPrisma.pressMaintenance.count
      .mockResolvedValueOnce(3)
      .mockResolvedValueOnce(1);
    mockPrisma.bindingJob.aggregate.mockResolvedValue({
      _sum: { cashAmount: 120, cardAmount: 280, rushFee: 95 },
    });
    mockPrisma.bindingJob.findMany.mockResolvedValue([]);
    mockPrisma.pressMaintenance.findMany.mockResolvedValue([]);
    mockPrisma.finishingChecklist.count.mockResolvedValue(2);
    mockPrisma.serviceRate.count.mockResolvedValue(3);
    mockPrisma.materialOrder.count
      .mockResolvedValueOnce(3)
      .mockResolvedValueOnce(2);
    mockPrisma.press.groupBy.mockResolvedValue([
      { zone: 'East Zone', _count: { id: 3 } },
      { zone: 'West Zone', _count: { id: 3 } },
    ]);

    const stats = await service.getStats('shop-1');

    expect(stats).toHaveProperty('pressUtilizationRate');
    expect(stats).toHaveProperty('dailyRevenue', 495);
    expect(stats).toHaveProperty('dailyRushFees', 95);
    expect(stats).toHaveProperty('binderyZones');
    expect(stats).toHaveProperty('urgentPressMaintenance');
    expect(stats).toHaveProperty('pendingFinishingChecklist');
    expect(stats).toHaveProperty('activeServiceRates', 3);
    expect(stats).toHaveProperty('pendingMaterialOrders', 3);
    expect(stats).toHaveProperty('completedMaterialOrders', 2);
    expect(stats).toHaveProperty('availablePresses', 4);
    expect(stats).toHaveProperty('totalPresses', 8);
  });
});
