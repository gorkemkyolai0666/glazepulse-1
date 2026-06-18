# BindPulse — Final Documentation

**Tamamlanma:** 2026-06-18  
**Repo:** https://github.com/gorkemkyolai0666/glazepulse-1

## Proje Özeti

BindPulse, cilt atölyeleri ve kitap restorasyon stüdyoları için operasyon yönetim SaaS'ıdır. Pres envanteri, cilt işleri, bakım, bitirme kontrol listeleri, malzeme siparişleri ve hizmet tarifelerini tek platformda birleştirir.

## Benzersizlik Boyutları

| Boyut | Değer |
|-------|-------|
| Sektör | Cilt atölyesi & kitap restorasyonu |
| Hedef Kitle | 2-8 çalışanlı artisan bindery'ler |
| Problem | Teslim tarihi kaçırma, malzeme takibi, pres bakımı |
| İş Modeli | B2B SaaS — aktif iş başına $3-8/ay |
| Tasarım | Neo-Victorian Archive |

## Teknik Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** NestJS, Prisma, PostgreSQL
- **CI/CD:** GitHub Actions
- **Deploy:** Railway (backend) + Vercel (frontend)

## API Endpoints

- `GET /api/health` — sağlık kontrolü
- `POST /api/auth/login` — giriş (200)
- `POST /api/auth/register` — kayıt (201)
- CRUD: `/api/presses`, `/api/binding-jobs`, `/api/press-maintenance`, `/api/finishing-checklists`, `/api/material-orders`, `/api/service-rates`
- `GET /api/dashboard/stats` — panel istatistikleri

## Demo

```
Email: demo@heritagebindery.com
Password: demo123456
```

## Kararlar

1. **Repo oluşturma:** `create_repository` MCP izni yok → `fork_repository` workaround (glazepulse-1)
2. **Domain transform:** glazepulse → bindpulse Python script ile otomatik dönüşüm
3. **Tasarım:** Alt dock navigasyon — önceki projelerin side-rail/top-nav yapılarından farklı
4. **Deployment:** Org secrets CI'da — agent ortamında provisioning çalıştırılamadı

## Dosya Yapısı

```
backend/          NestJS API
frontend/         Next.js UI
docs/             Proje dokümantasyonu
scripts/          Provisioning + transform
tests/            Integration smoke tests
```
