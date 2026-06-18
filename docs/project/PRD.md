# BindPulse — Ürün Gereksinim Belgesi (PRD)

## Özet

BindPulse, ABD'deki bağımsız cilt atölyeleri ve kitap restorasyon stüdyoları için pres envanteri, cilt işi takibi, pres bakım yönetimi, bitirme kontrol listeleri, malzeme siparişleri ve hizmet tarifeleri sunan B2B SaaS platformudur.

## Tasarım Yönü: Neo-Victorian Archive

Arşiv estetiği — bordo (#4A1C2B), parşömen (#F4EDE1) ve pirinç (#B8860B) paleti; EB Garamond + Libre Baskerville tipografi; alt dock navigasyon (mobil) + sol kenar çizgili masaüstü menü; 0px köşe yarıçapı ve editorial kart dili. GlazePulse (seramik), StitchPulse (terzi) ve BayPulse (golf) projelerinden tamamen farklı.

## Hedef Kitle

- ABD'deki 2-8 çalışanlı bağımsız cilt atölyeleri ve konservasyon stüdyoları (Illinois, Massachusetts, New York)
- Üniversite arşivleri ve nadir kitap satıcılarının atölye birimleri
- Excel ve kağıt formlarla cilt operasyonu yöneten atölye sahipleri

## Problem

Pres durumları, cilt iş teslim tarihleri, altın yaldız planları ve kağıt/deri malzeme siparişleri dağınık tablolarda tutuluyor. Acil iş ücretleri, restorasyon fiyatları ve bakım planları birbirinden kopuk yönetiliyor.

## Çözüm

- Pres envanteri ve durum takibi (müsait, kullanımda, bakım, kapalı)
- Cilt işi gelir kaydı (nakit, kart, acil ücret, sayfa sayısı)
- Pres bakım emirleri ve öncelik yönetimi
- Bitirme kontrol listesi (kenar yaldız, ebru, kalite kontrol)
- Hizmet tarifeleri (kutu cilt, restorasyon, acil hizmet)

## İş Modeli

SaaS — aktif cilt işi başına aylık abonelik ($3-8/iş/ay)

| Plan | Fiyat | İş |
|------|-------|-----|
| Starter | $39/ay | 15 iş |
| Growth | $69/ay | 40 iş |
| Pro | $119/ay | 100 iş |

## MVP Kapsamı

- [x] Kimlik doğrulama ve kayıt
- [x] Dashboard istatistikleri
- [x] Pres CRUD
- [x] Cilt işi CRUD
- [x] Pres bakım CRUD
- [x] Bitirme kontrol listesi CRUD
- [x] Malzeme siparişi CRUD
- [x] Hizmet tarifesi CRUD
- [x] Demo hesap ve seed verisi
- [x] CI/CD pipeline

## Demo

| Alan | Değer |
|------|-------|
| E-posta | demo@heritagebindery.com |
| Şifre | demo123456 |
