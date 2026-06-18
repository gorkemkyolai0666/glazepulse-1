#!/usr/bin/env python3
"""Fix remaining domain-specific UI strings for BindPulse."""
from pathlib import Path

ROOT = Path("/tmp/bindpulse/frontend/src/app")

REPLACEMENTS = [
    ("fırın müsait", "pres müsait"),
    ("fırın pişirimde", "pres kullanımda"),
    ("Sır Kontrol Planı", "Bitirme Kontrol Planı"),
    ("Henüz pişirim kaydı yok.", "Henüz cilt işi kaydı yok."),
    ("Korku, gizem, bilim kurgu ve macera temalı oda envanteri", "Letterpress, mükemmel cilt ve restorasyon pres envanteri"),
    ("Yeni Oda", "Yeni Pres"),
    ("Oda Ekle", "Pres Ekle"),
    ("Oda Adı", "Pres Adı"),
    ("Örn: The Crypt", "Örn: Pres A — Letterpress"),
    ("Kanat / Kat", "Bölge"),
    ("Örn: Basement Zone", "Örn: Ana Atölye"),
    ("Tema", "Pres Türü"),
    ("Makine Modeli", "Pres Modeli"),
    ("Örn: RFID kilit zinciri + basınç plakaları", "Örn: Heidelberg Windmill"),
    ("Oda bulunamadı", "Pres bulunamadı"),
    ("Bu odayı silmek istediğinize emin misiniz?", "Bu presi silmek istediğinize emin misiniz?"),
    ("Mekanizma belirtilmemiş", "Model belirtilmemiş"),
    ("Oda seçin", "Pres seçin"),
    ("Örn: RFID kilit arızası", "Örn: Nipping press menteşe ayarı"),
    ("Oda sıfırlama, prop kontrolü ve ipucu yenileme planları", "Kenar yaldız, ebru ve kalite kontrol planları"),
    ("Oda kiralama, etkinlik paketi ve yoğun saat fiyatları", "Cilt hizmeti, restorasyon ve acil hizmet tarifeleri"),
    ("Örn: Standart Oda Kiralama", "Örn: Kutu Cilt — Standart"),
    ("Toplam Oda Sayısı", "Toplam Pres Sayısı"),
    ("const WORKSTATION_SPECIALTIES = ['formal', 'bridal', 'casual', 'leather', 'denim', 'pressType'];",
     "const PRESS_TYPES = ['letterpress', 'perfect_bind', 'saddle_stitch', 'case_bind', 'hand_bind', 'restoration'];"),
    ("WORKSTATION_SPECIALTIES", "PRESS_TYPES"),
    ("pressType: 'formal'", "pressType: 'letterpress'"),
    ("PresssPage", "PressesPage"),
]

for path in ROOT.rglob("*.tsx"):
    content = path.read_text(encoding="utf-8")
    original = content
    for old, new in REPLACEMENTS:
        content = content.replace(old, new)
    if content != original:
        path.write_text(content, encoding="utf-8")
        print(f"Updated {path}")

print("UI string fixes complete.")
