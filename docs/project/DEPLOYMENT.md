# BindPulse — Deployment

**Son Güncelleme:** 2026-06-18  
**Repo:** https://github.com/gorkemkyolai0666/glazepulse-1 (rename pending → bindpulse)

## Deployment Durumu

| Bileşen | Durum |
|---------|-------|
| GitHub Repository | ✅ Public fork (glazepulse-1) |
| CI Pipeline | ✅ `.github/workflows/ci.yml` |
| Provisioning Scripts | ✅ `npm run provision` |
| Railway Backend | ⏳ Org secrets gerekli |
| Vercel Frontend | ⏳ Org secrets gerekli |

## Demo Hesap

| Alan | Değer |
|------|-------|
| E-posta | demo@heritagebindery.com |
| Şifre | demo123456 |

## Ortam Değişkenleri

### Backend (Railway)

```
DATABASE_URL=
JWT_SECRET=
FRONTEND_URL=
PORT=4019
```

### Frontend (Vercel)

```
NEXT_PUBLIC_API_URL=
```

## Deployment Engelleyiciler

Cloud agent ortamında organization-level GitHub Actions secrets (`GH_PAT`, `RAILWAY_API_TOKEN`, `VERCEL_TOKEN`) doğrudan erişilebilir değil. `npm run provision` CI workflow'unda çalıştırılmalıdır.

## Public URL'ler

| Servis | URL |
|--------|-----|
| Frontend | _Deploy sonrası güncellenecek_ |
| Backend | _Deploy sonrası güncellenecek_ |
| Health | `{BACKEND_URL}/api/health` |

## Manuel Kurulum (İlk Kez)

1. Organization secrets yapılandır
2. GitHub Actions CI'ı main branch'te çalıştır
3. Railway: repo bağla, root `backend/`, Wait for CI
4. Vercel: repo bağla, root `frontend/`
5. Ortam değişkenlerini ayarla
6. Smoke testleri çalıştır

## Repo Rename

`glazepulse-1` → `bindpulse` manuel rename gerektirir (API 403).
