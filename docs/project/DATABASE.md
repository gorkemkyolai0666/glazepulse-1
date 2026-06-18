# BindPulse — Veritabanı (DATABASE)

## PostgreSQL

Connection: `DATABASE_URL` environment variable

## Modeller

| Model | Tablo | Açıklama |
|-------|-------|----------|
| Bindery | binderies | Tenis tesisi profili |
| User | users | Kullanıcı hesapları |
| Court | courts | Kort envanteri |
| BindingJob | binding_jobs | Ders gelir kayıtları |
| PressMaintenance | press_maintenance | Top makinesi bakım |
| FinishingChecklist | finishing_checklists | Kort bakım planı |
| MaterialOrder | material_orders | Kordon siparişleri |
| ServiceRate | service_rates | Tarife kademeleri |

## Migration

```bash
npm run db:migrate   # prisma migrate deploy
npm run db:seed      # prisma db seed
npm run deploy       # migrate + seed + start:prod
```

## Seed Verisi

- 1 tesis: Heritage Bindery & Conservation (Phoenix, AZ)
- 1 demo kullanıcı: demo@heritagebindery.com
- 8 kort (kil, sert, çim, kapalı)
- 2 ders oturumu
- 2 top makinesi bakım kaydı
- 2 kort bakım planı
- 3 fiyat kademesi
- 5 kordon siparişi

Seed idempotent — upsert ile tekrar çalıştırılabilir.
