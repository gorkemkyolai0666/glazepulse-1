'use client';

import { useEffect, useState } from 'react';
import { CircleDot, DollarSign, Puzzle, ClipboardCheck, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import { AppLayout } from '@/components/app-layout';
import { StatCard } from '@/components/stat-card';
import { LoadingSpinner, ErrorState } from '@/components/states';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import {
  formatCurrency,
  formatDateTime,
  formatPercent,
  formatBatchStatus,
  formatKilnMaintenanceStatus,
  formatKilnMaintenancePriority,
  formatKilnType,
  formatFiringType,
} from '@/lib/utils';

interface DashboardStats {
  totalKilns: number;
  availableKilns: number;
  firingKilns: number;
  kilnUtilizationRate: number;
  openKilnMaintenance: number;
  urgentKilnMaintenance: number;
  pendingGlazeChecklist: number;
  dailyRevenue: number;
  recentBatches: Array<{
    id: string;
    cashAmount: number;
    cardAmount: number;
    coneAdjustment: number;
    scheduledAt: string;
    firingType?: string;
    status: string;
    kiln?: { name: string; zone: string; kilnType: string };
  }>;
  recentKilnMaintenance: Array<{
    id: string;
    title: string;
    priority: string;
    status: string;
    reportedAt: string;
    kiln?: { name: string; zone: string };
  }>;
  studioZones: Array<{ zone: string; kilnCount: number }>;
  monthlyTrend: Array<{ month: string; games: number; revenue: number }>;
}

function formatTrendMonth(monthKey: string): string {
  const [year, month] = monthKey.split('-');
  const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1);
  return new Intl.DateTimeFormat('tr-TR', { month: 'short', year: 'numeric' }).format(date);
}

export default function DashboardPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadStats = () => {
    if (!token) return;
    setLoading(true);
    setError(false);
    api.dashboard
      .stats(token)
      .then((data) => setStats(data as DashboardStats))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadStats();
  }, [token]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl text-primary">Operasyon Paneli</h1>
          <p className="text-muted-foreground">Fırın kullanımı ve günlük gelir özeti</p>
        </div>

        {loading && <LoadingSpinner />}
        {error && <ErrorState onRetry={loadStats} />}
        {stats && !loading && (
          <>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Fırın Kullanımı"
                value={formatPercent(stats.kilnUtilizationRate)}
                description={`${stats.availableKilns}/${stats.totalKilns} fırın müsait`}
                icon={<CircleDot className="h-4 w-4" />}
              />
              <StatCard
                title="Günlük Gelir"
                value={formatCurrency(stats.dailyRevenue)}
                description={`${stats.firingKilns} fırın pişirimde`}
                icon={<DollarSign className="h-4 w-4" />}
              />
              <StatCard
                title="Fırın Bakımı"
                value={stats.openKilnMaintenance}
                description={`${stats.urgentKilnMaintenance} acil/yüksek öncelik`}
                icon={<Puzzle className="h-4 w-4" />}
              />
              <StatCard
                title="Sır Kontrol Planı"
                value={stats.pendingGlazeChecklist}
                description="7 gün içinde planlanan"
                icon={<ClipboardCheck className="h-4 w-4" />}
              />
            </div>

            <Card className="kiln-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-lg">
                  <Users className="h-4 w-4 text-accent" />
                  Son Pişirim Partileri
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.recentBatches.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Henüz pişirim kaydı yok.</p>
                ) : (
                  <div className="space-y-3">
                    {stats.recentBatches.map((session) => (
                      <div
                        key={session.id}
                        className="flex flex-wrap items-center justify-between gap-2 bg-muted/40 px-4 py-3"
                      >
                        <div>
                          <p className="font-semibold">{session.kiln?.name || '—'}</p>
                          <p className="text-xs text-muted-foreground">
                            {session.kiln?.zone} · {formatKilnType(session.kiln?.kilnType || '')} · {formatFiringType(session.firingType || '')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-semibold">
                            {formatCurrency(
                              session.cashAmount + session.cardAmount + session.coneAdjustment,
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">{formatDateTime(session.scheduledAt)}</p>
                        </div>
                        <Badge variant="secondary">{formatBatchStatus(session.status)}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="kiln-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-lg">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  Açık Fırın Bakım Kayıtları
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.recentKilnMaintenance.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Açık bakım kaydı yok.</p>
                ) : (
                  <div className="space-y-3">
                    {stats.recentKilnMaintenance.map((item) => (
                      <div key={item.id} className="bg-muted/40 px-4 py-3">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.kiln?.name || 'Fırın belirtilmemiş'} · {item.kiln?.zone} · {formatKilnMaintenancePriority(item.priority)} ·{' '}
                          {formatKilnMaintenanceStatus(item.status)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="kiln-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-lg">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    Aylık Trend
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {stats.monthlyTrend.map((row) => (
                    <div key={row.month} className="flex justify-between text-sm">
                      <span>{formatTrendMonth(row.month)}</span>
                      <span className="font-mono font-semibold">{formatCurrency(row.revenue)}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="kiln-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-lg">
                    <CircleDot className="h-4 w-4 text-accent" />
                    Kanat Dağılımı
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {stats.studioZones.map((w) => (
                    <div key={w.zone} className="flex justify-between text-sm">
                      <span>{w.zone}</span>
                      <Badge variant="secondary">{w.kilnCount} oda</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
