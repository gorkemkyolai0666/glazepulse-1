# BindPulse — API (API)

Base URL: `{NEXT_PUBLIC_API_URL}` (production: Railway backend URL + `/api`)

## Auth

| Method | Endpoint | Auth | Status | Açıklama |
|--------|----------|------|--------|----------|
| POST | /api/auth/login | No | 200 | Giriş |
| POST | /api/auth/register | No | 201 | Kayıt |

## Health

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | /api/health | No | 200 |

## Tennis Club

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | /api/tennis-club | Yes | 200 |
| PATCH | /api/tennis-club | Yes | 200 |

## Courts

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | /api/courts | Yes | 200 |
| GET | /api/courts/:id | Yes | 200 |
| POST | /api/courts | Yes | 201 |
| PATCH | /api/courts/:id | Yes | 200 |
| DELETE | /api/courts/:id | Yes | 200 |

## Lesson Sessions

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | /api/binding-jobs | Yes | 200 |
| GET | /api/binding-jobs/:id | Yes | 200 |
| POST | /api/binding-jobs | Yes | 201 |
| PATCH | /api/binding-jobs/:id | Yes | 200 |
| DELETE | /api/binding-jobs/:id | Yes | 200 |

## Ball Machine Maintenance

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | /api/press-maintenance | Yes | 200 |
| GET | /api/press-maintenance/urgent | Yes | 200 |
| GET | /api/press-maintenance/:id | Yes | 200 |
| POST | /api/press-maintenance | Yes | 201 |
| PATCH | /api/press-maintenance/:id | Yes | 200 |
| DELETE | /api/press-maintenance/:id | Yes | 200 |

## Court Maintenance

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | /api/finishing-checklists | Yes | 200 |
| GET | /api/finishing-checklists/:id | Yes | 200 |
| POST | /api/finishing-checklists | Yes | 201 |
| PATCH | /api/finishing-checklists/:id | Yes | 200 |
| DELETE | /api/finishing-checklists/:id | Yes | 200 |

## Stringing Orders

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | /api/material-orders | Yes | 200 |
| GET | /api/material-orders/pending | Yes | 200 |
| GET | /api/material-orders/:id | Yes | 200 |
| POST | /api/material-orders | Yes | 201 |
| PATCH | /api/material-orders/:id | Yes | 200 |
| DELETE | /api/material-orders/:id | Yes | 200 |

## Rate Tiers

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | /api/service-rates | Yes | 200 |
| GET | /api/service-rates/:id | Yes | 200 |
| POST | /api/service-rates | Yes | 201 |
| PATCH | /api/service-rates/:id | Yes | 200 |
| DELETE | /api/service-rates/:id | Yes | 200 |

## Dashboard

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | /api/dashboard/stats | Yes | 200 |
