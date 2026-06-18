# BindPulse

Cilt atölyesi ve kitap restorasyon stüdyoları için operasyon yönetim SaaS'ı.

## Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** NestJS, Prisma, PostgreSQL
- **Deploy:** Railway (backend) + Vercel (frontend)

## Demo

| E-posta | Şifre |
|---------|-------|
| demo@heritagebindery.com | demo123456 |

## Geliştirme

```bash
# Backend (port 4019)
cd backend && cp .env.example .env && npm install
npm run db:migrate && npm run db:seed && npm run start:dev

# Frontend (port 3019)
cd frontend && cp .env.example .env && npm install && npm run dev
```

## Provisioning

```bash
npm run provision
```

## Repo

https://github.com/gorkemkyolai0666/glazepulse-1

> Not: Repo rename `bindpulse` olarak planlanmıştır.
