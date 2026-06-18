import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(date));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `%${value}`;
}

const KILN_STATUS: Record<string, string> = {
  available: 'Müsait',
  firing: 'Pişiriliyor',
  cooling: 'Soğutuluyor',
  maintenance: 'Bakımda',
  offline: 'Kapalı',
};

export function formatKilnStatus(status: string): string {
  return KILN_STATUS[status] || status;
}

const KILN_TYPE: Record<string, string> = {
  electric: 'Elektrik',
  gas: 'Gaz',
  raku: 'Raku',
  wood: 'Odun',
  studio: 'Stüdyo',
};

export function formatKilnType(kilnType: string): string {
  return KILN_TYPE[kilnType] || kilnType;
}

const BATCH_STATUS: Record<string, string> = {
  scheduled: 'Planlandı',
  firing: 'Pişiriliyor',
  completed: 'Tamamlandı',
  failed: 'Başarısız',
};

export function formatBatchStatus(status: string): string {
  return BATCH_STATUS[status] || status;
}

const FIRING_TYPE: Record<string, string> = {
  bisque: 'Bisküvi',
  glaze: 'Sır',
  raku: 'Raku',
  stoneware: 'Taş Çini',
  crystalline: 'Kristal',
  custom: 'Özel',
};

export function formatFiringType(type: string): string {
  return FIRING_TYPE[type] || type;
}

const MAINTENANCE_STATUS: Record<string, string> = {
  open: 'Açık',
  in_progress: 'Devam Ediyor',
  completed: 'Tamamlandı',
  cancelled: 'İptal',
};

export function formatKilnMaintenanceStatus(status: string): string {
  return MAINTENANCE_STATUS[status] || status;
}

const MAINTENANCE_PRIORITY: Record<string, string> = {
  low: 'Düşük',
  medium: 'Orta',
  high: 'Yüksek',
  urgent: 'Acil',
};

export function formatKilnMaintenancePriority(priority: string): string {
  return MAINTENANCE_PRIORITY[priority] || priority;
}

const GLAZE_STATUS: Record<string, string> = {
  scheduled: 'Planlandı',
  in_progress: 'Devam Ediyor',
  completed: 'Tamamlandı',
  overdue: 'Gecikmiş',
};

export function formatGlazeStatus(status: string): string {
  return GLAZE_STATUS[status] || status;
}

const GLAZE_CATEGORY: Record<string, string> = {
  mixing: 'Karıştırma',
  testing: 'Test',
  application: 'Uygulama',
  firing_prep: 'Pişirim Hazırlığı',
  inventory: 'Envanter',
  other: 'Diğer',
};

export function formatGlazeCategory(category: string): string {
  return GLAZE_CATEGORY[category] || category;
}

const CLAY_ORDER_STATUS: Record<string, string> = {
  pending: 'Beklemede',
  in_progress: 'Devam Ediyor',
  completed: 'Tamamlandı',
  delivered: 'Teslim Edildi',
};

export function formatClayOrderStatus(status: string): string {
  return CLAY_ORDER_STATUS[status] || status;
}

const FIRING_RATE_STATUS: Record<string, string> = {
  active: 'Aktif',
  upcoming: 'Yakında',
  archived: 'Arşiv',
};

export function formatFiringRateStatus(status: string): string {
  return FIRING_RATE_STATUS[status] || status;
}

const FIRING_CATEGORY: Record<string, string> = {
  bisque_firing: 'Bisküvi Pişirimi',
  glaze_firing: 'Sır Pişirimi',
  raku_session: 'Raku Seansı',
  studio_rental: 'Stüdyo Kiralama',
  custom_work: 'Özel İş',
  other: 'Diğer',
};

export function formatFiringCategory(category: string): string {
  return FIRING_CATEGORY[category] || category;
}

const MONTH_NAMES: Record<number, string> = {
  1: 'Ocak',
  2: 'Şubat',
  3: 'Mart',
  4: 'Nisan',
  5: 'Mayıs',
  6: 'Haziran',
  7: 'Temmuz',
  8: 'Ağustos',
  9: 'Eylül',
  10: 'Ekim',
  11: 'Kasım',
  12: 'Aralık',
};

export function formatMonth(month: number): string {
  return MONTH_NAMES[month] || String(month);
}
