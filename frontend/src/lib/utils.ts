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

const PRESS_STATUS: Record<string, string> = {
  available: 'Müsait',
  in_use: 'Kullanımda',
  cooling: 'Soğutuluyor',
  maintenance: 'Bakımda',
  offline: 'Kapalı',
};

export function formatPressStatus(status: string): string {
  return PRESS_STATUS[status] || status;
}

const PRESS_TYPE: Record<string, string> = {
  letterpress: 'Letterpress',
  perfect_bind: 'Mükemmel Cilt',
  saddle_stitch: 'Zımba Cilt',
  case_bind: 'Kutu Cilt',
  hand_bind: 'El Cilt',
  restoration: 'Restorasyon',
};

export function formatPressType(pressType: string): string {
  return PRESS_TYPE[pressType] || pressType;
}

const JOB_STATUS: Record<string, string> = {
  scheduled: 'Planlandı',
  in_progress: 'Devam Ediyor',
  completed: 'Tamamlandı',
  failed: 'Başarısız',
};

export function formatJobStatus(status: string): string {
  return JOB_STATUS[status] || status;
}

const BINDING_TYPE: Record<string, string> = {
  case_binding: 'Kutu Cilt',
  perfect_binding: 'Mükemmel Cilt',
  saddle_stitch: 'Zımba Cilt',
  restoration: 'Restorasyon',
  gold_tooling: 'Altın Yaldız',
  custom: 'Özel',
};

export function formatBindingType(type: string): string {
  return BINDING_TYPE[type] || type;
}

const MAINTENANCE_STATUS: Record<string, string> = {
  open: 'Açık',
  in_progress: 'Devam Ediyor',
  completed: 'Tamamlandı',
  cancelled: 'İptal',
};

export function formatPressMaintenanceStatus(status: string): string {
  return MAINTENANCE_STATUS[status] || status;
}

const MAINTENANCE_PRIORITY: Record<string, string> = {
  low: 'Düşük',
  medium: 'Orta',
  high: 'Yüksek',
  urgent: 'Acil',
};

export function formatPressMaintenancePriority(priority: string): string {
  return MAINTENANCE_PRIORITY[priority] || priority;
}

const FINISHING_STATUS: Record<string, string> = {
  scheduled: 'Planlandı',
  in_progress: 'Devam Ediyor',
  completed: 'Tamamlandı',
  overdue: 'Gecikmiş',
};

export function formatFinishingStatus(status: string): string {
  return FINISHING_STATUS[status] || status;
}

const FINISHING_CATEGORY: Record<string, string> = {
  edge_gilding: 'Kenar Yaldız',
  marbling: 'Ebru',
  tooling: 'Kabartma',
  cover_design: 'Kapak Tasarımı',
  quality_check: 'Kalite Kontrol',
  other: 'Diğer',
};

export function formatFinishingCategory(category: string): string {
  return FINISHING_CATEGORY[category] || category;
}

const MATERIAL_ORDER_STATUS: Record<string, string> = {
  pending: 'Beklemede',
  in_progress: 'Devam Ediyor',
  completed: 'Tamamlandı',
  delivered: 'Teslim Edildi',
};

export function formatMaterialOrderStatus(status: string): string {
  return MATERIAL_ORDER_STATUS[status] || status;
}

const SERVICE_RATE_STATUS: Record<string, string> = {
  active: 'Aktif',
  upcoming: 'Yakında',
  archived: 'Arşiv',
};

export function formatServiceRateStatus(status: string): string {
  return SERVICE_RATE_STATUS[status] || status;
}

const SERVICE_CATEGORY: Record<string, string> = {
  case_binding: 'Kutu Cilt',
  restoration: 'Restorasyon',
  gold_tooling: 'Altın Yaldız',
  studio_rental: 'Atölye Kiralama',
  rush_service: 'Acil Hizmet',
  other: 'Diğer',
};

export function formatServiceCategory(category: string): string {
  return SERVICE_CATEGORY[category] || category;
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
