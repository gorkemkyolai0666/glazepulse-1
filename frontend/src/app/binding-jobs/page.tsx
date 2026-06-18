'use client';

import { useEffect, useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { AppLayout } from '@/components/app-layout';
import { LoadingSpinner, ErrorState, EmptyState } from '@/components/states';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import {
  formatCurrency,
  formatDateTime,
  formatJobStatus,
  formatPressType,
  formatBindingType,
} from '@/lib/utils';

interface PressOption {
  id: string;
  name: string;
  zone: string;
}

interface BindingJob {
  id: string;
  cashAmount: number;
  cardAmount: number;
  rushFee: number;
  pageCount: number;
  scheduledAt: string;
  bindingType?: string;
  status: string;
  press?: { id: string; name: string; zone: string; pressType: string };
}

interface ListResponse {
  data: BindingJob[];
  total: number;
}

const JOB_STATUSES = ['scheduled', 'in_progress', 'completed', 'failed'];
const BINDING_TYPES = ['case_binding', 'perfect_binding', 'saddle_stitch', 'restoration', 'gold_tooling', 'custom'];

const emptyForm = {
  pressId: '',
  bindingType: 'case_binding',
  cashAmount: '0',
  cardAmount: '0',
  rushFee: '0',
  pageCount: '1',
  scheduledAt: new Date().toISOString().slice(0, 16),
  status: 'scheduled',
};

export default function BindingJobsPage() {
  const { token } = useAuth();
  const [sessions, setSessions] = useState<BindingJob[]>([]);
  const [presses, setPresss] = useState<PressOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    if (!token) return;
    setLoading(true);
    setError(false);
    Promise.all([api.bindingJobs.list(token), api.presses.list(token)])
      .then(([sessionsRes, roomsRes]) => {
        setSessions((sessionsRes as ListResponse).data);
        setPresss(
          ((roomsRes as { data: PressOption[] }).data || []).map((r) => ({
            id: r.id,
            name: r.name,
            zone: r.zone,
          })),
        );
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [token]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSubmitting(true);
    try {
      await api.bindingJobs.create(token, {
        pressId: form.pressId,
        bindingType: form.bindingType,
        cashAmount: parseFloat(form.cashAmount),
        cardAmount: parseFloat(form.cardAmount),
        rushFee: parseFloat(form.rushFee),
        pageCount: parseInt(form.pageCount, 10),
        scheduledAt: form.scheduledAt,
        status: form.status,
      });
      setForm(emptyForm);
      setShowForm(false);
      load();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-primary">Cilt İşleri</h1>
            <p className="text-muted-foreground">Günlük oyun geliri ve oturum kayıtları</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="archive-btn">
            <Plus className="mr-2 h-4 w-4" />
            {showForm ? 'İptal' : 'Yeni Oturum'}
          </Button>
        </div>

        {showForm && (
          <Card className="archive-card">
            <CardHeader>
              <CardTitle className="font-display">Cilt İşi Ekle</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="pressId">Pres</Label>
                  <select
                    id="pressId"
                    value={form.pressId}
                    onChange={(e) => update('pressId', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    required
                  >
                    <option value="">Pres seçin</option>
                    {presses.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} — {r.zone}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bindingType">İş Tipi</Label>
                  <select
                    id="bindingType"
                    value={form.bindingType}
                    onChange={(e) => update('bindingType', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {BINDING_TYPES.map((t) => (
                      <option key={t} value={t}>{formatBindingType(t)}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pageCount">Sayfa Sayısı</Label>
                  <Input id="pageCount" type="number" min={0} value={form.pageCount} onChange={(e) => update('pageCount', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cashAmount">Nakit ($)</Label>
                  <Input id="cashAmount" type="number" min={0} step="0.01" value={form.cashAmount} onChange={(e) => update('cashAmount', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardAmount">Kart ($)</Label>
                  <Input id="cardAmount" type="number" min={0} step="0.01" value={form.cardAmount} onChange={(e) => update('cardAmount', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rushFee">Acil Ücret ($)</Label>
                  <Input id="rushFee" type="number" min={0} step="0.01" value={form.rushFee} onChange={(e) => update('rushFee', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduledAt">Teslim Tarihi</Label>
                  <Input id="scheduledAt" type="datetime-local" value={form.scheduledAt} onChange={(e) => update('scheduledAt', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Durum</Label>
                  <select id="status" value={form.status} onChange={(e) => update('status', e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                    {JOB_STATUSES.map((s) => (
                      <option key={s} value={s}>{formatJobStatus(s)}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" disabled={submitting} className="archive-btn">
                    {submitting ? 'Kaydediliyor...' : 'Kaydet'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {loading && <LoadingSpinner />}
        {error && !loading && sessions.length === 0 && <ErrorState onRetry={load} />}
        {!loading && !error && sessions.length === 0 && (
          <EmptyState title="Cilt işi bulunamadı" description="Henüz cilt işi eklenmemiş." />
        )}
        {!loading && sessions.length > 0 && (
          <div className="space-y-3">
            {sessions.map((session) => (
              <Card key={session.id} className="archive-card">
                <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-semibold">{session.press?.name || '—'}</p>
                      <p className="text-xs text-muted-foreground">
                        {session.press?.zone} · {formatPressType(session.press?.pressType || '')} · {formatBindingType(session.bindingType || '')} · {session.pageCount} sayfa
                      </p>
                      <p className="text-xs text-muted-foreground">{formatDateTime(session.scheduledAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-semibold">
                      {formatCurrency(session.cashAmount + session.cardAmount + session.rushFee)}
                    </span>
                    <Badge variant="secondary">{formatJobStatus(session.status)}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
