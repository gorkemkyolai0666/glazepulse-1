'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, DoorOpen } from 'lucide-react';
import { AppLayout } from '@/components/app-layout';
import { LoadingSpinner, ErrorState, EmptyState } from '@/components/states';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { formatPressStatus, formatPressType } from '@/lib/utils';

interface PressItem {
  id: string;
  name: string;
  zone: string;
  pressType: string;
  pressModel?: string;
  status: string;
}

interface ListResponse {
  data: PressItem[];
  total: number;
}

const PRESS_TYPES = ['letterpress', 'perfect_bind', 'saddle_stitch', 'case_bind', 'hand_bind', 'restoration'];
const STATUSES = ['available', 'in_use', 'cooling', 'maintenance', 'offline'];

const emptyForm = {
  name: '',
  zone: '',
  pressType: 'letterpress',
  pressModel: '',
  status: 'available',
};

export default function PressesPage() {
  const { token } = useAuth();
  const [rooms, setRooms] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    if (!token) return;
    setLoading(true);
    setError(false);
    api.presses
      .list(token)
      .then((res) => setRooms((res as ListResponse).data))
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
      await api.presses.create(token, {
        name: form.name,
        zone: form.zone,
        pressType: form.pressType,
        pressModel: form.pressModel || undefined,
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

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Bu presi silmek istediğinize emin misiniz?')) return;
    try {
      await api.presses.delete(token, id);
      load();
    } catch {
      setError(true);
    }
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-primary">Presler</h1>
            <p className="text-muted-foreground">Letterpress, mükemmel cilt ve restorasyon pres envanteri</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="archive-btn">
            <Plus className="mr-2 h-4 w-4" />
            {showForm ? 'İptal' : 'Yeni Pres'}
          </Button>
        </div>

        {showForm && (
          <Card className="archive-card">
            <CardHeader>
              <CardTitle className="font-display">Pres Ekle</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Pres Adı</Label>
                  <Input id="name" value={form.name} onChange={(e) => update('name', e.target.value)} required placeholder="Örn: Pres A — Letterpress" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zone">Bölge</Label>
                  <Input id="zone" value={form.zone} onChange={(e) => update('zone', e.target.value)} required placeholder="Örn: Ana Atölye" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pressType">Pres Türü</Label>
                  <select
                    id="pressType"
                    value={form.pressType}
                    onChange={(e) => update('pressType', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {PRESS_TYPES.map((t) => (
                      <option key={t} value={t}>{formatPressType(t)}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pressModel">Pres Modeli</Label>
                  <Input
                    id="pressModel"
                    value={form.pressModel}
                    onChange={(e) => update('pressModel', e.target.value)}
                    placeholder="Örn: Heidelberg Windmill"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Durum</Label>
                  <select
                    id="status"
                    value={form.status}
                    onChange={(e) => update('status', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{formatPressStatus(s)}</option>
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
        {error && !loading && rooms.length === 0 && <ErrorState onRetry={load} />}
        {!loading && !error && rooms.length === 0 && (
          <EmptyState
            title="Pres bulunamadı"
            description="Henüz cilt atölyesi eklenmemiş."
            action={
              <Button onClick={() => setShowForm(true)} className="archive-btn">
                <Plus className="mr-2 h-4 w-4" />
                Pres Ekle
              </Button>
            }
          />
        )}
        {!loading && rooms.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {rooms.map((room) => (
              <Card key={room.id} className="archive-card">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/15 text-accent">
                      <DoorOpen className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-display text-lg">{room.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {room.zone} · {formatPressType(room.pressType)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {room.pressModel || 'Model belirtilmemiş'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{formatPressStatus(room.status)}</Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(room.id)}
                      className="text-destructive"
                      aria-label="Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
