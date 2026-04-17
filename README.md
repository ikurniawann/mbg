# Sistem Digital MBG

**Makan Bergizi Gratis — Indonesia**

Versi 1.0 · April 2026

Sistem digital terpadu untuk pengelolaan operasional dapur program MBG. Dibangun berdasarkan SOP Operasional Dapur MBG (SOP 1–15).

---

## Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Frontend Web | Next.js 14 + Tailwind CSS |
| Mobile App | React Native / Flutter (future) |
| Backend API | Node.js (Express) atau Django |
| Database | PostgreSQL + Redis *(dummy JSON untuk development)* |
| File Storage | AWS S3 / Google Cloud Storage |
| Auth | JWT + Role-Based Access Control |
| Notifications | Firebase Cloud Messaging |
| PDF Reports | Puppeteer / ReportLab |

---

## Arsitektur Modul

Sistem terdiri dari **7 modul utama**:

| # | Modul | Fungsi Utama | SOP |
|---|-------|-------------|-----|
| 1 | Penerimaan & Inventori | BAPB digital, labelisasi, manajemen stok | SOP 1, 4 |
| 2 | Menu & Gizi | Standard Recipe Card, approval menu, info alergen | SOP 2, 11 |
| 3 | Produksi Dapur | Checklist shift, timer produksi, QC harian | SOP 8 |
| 4 | Food Safety & HACCP | Monitoring suhu 6 CCP, sanitasi, log korektif | SOP 9, 10, 12, 13 |
| 5 | Distribusi & Logistik | Rute distribusi, tanda terima digital, tracking | SOP 3, 8 |
| 6 | Dokumentasi & LPJ | Laporan bulanan, arsip digital, approval flow | SOP 3, 5 |
| 7 | SDM & Pelatihan | Jadwal pelatihan, notulen rapat, feedback | SOP 6, 7, 15 |

---

## Peran Pengguna

| Peran | Level Akses |
|-------|-------------|
| Kepala SPPG | Admin Penuh |
| Ahli Gizi | Supervisor |
| Akuntan | Supervisor |
| Pengawas Logistik | Supervisor |
| Petugas Lapangan | Operator |
| Petugas Distribusi | Operator |
| Tim Yayasan | View Only |

---

## Fase Development & Sprint Breakdown

### Ringkasan Timeline

| Fase | Durasi | Modul | Total Sprint |
|------|--------|-------|-------------|
| **Fase 1** | 4-6 minggu | Modul 1 + Modul 2 | Sprint 1-3 |
| **Fase 2** | 4-6 minggu | Modul 3 + Modul 4 | Sprint 4-6 |
| **Fase 3** | 4-6 minggu | Modul 5 + Modul 6 | Sprint 7-9 |
| **Fase 4** | 3-4 minggu | Modul 7 + Integrasi + UAT | Sprint 10-11 |

**Total: ~15-22 minggu (4-5 bulan)**

---

### Fase 1: Core Foundation (Sprint 1-3)

**Fokus:** Modul 1 (Inventori) + Modul 2 (Menu & Gizi)

| Sprint | Durasi | Deliverables |
|--------|--------|-------------|
| Sprint 1 | 2 minggu | Setup project, auth system, Modul 1 basic (BAPB form, dummy data, label generation) |
| Sprint 2 | 2 minggu | Modul 1 lanjutan (stok tracking, alert kadaluarsa, audit trail) |
| Sprint 3 | 2 minggu | Modul 2 basic (menu mingguan, SRC digital, workflow approval) |

**Alasan mulai dari Modul 1 & 2:**
- Paling mendasar — semua modul lain bergantung pada data inventori dan menu
- Bisa development secara independen tanpa tunggu modul lain
- MVP paling jelas: form BAPB → generate label → approve menu

---

### Fase 2: Daily Operations (Sprint 4-6)

**Fokus:** Modul 3 (Produksi) + Modul 4 (Food Safety)

| Sprint | Durasi | Deliverables |
|--------|--------|-------------|
| Sprint 4 | 2 minggu | Modul 3: checklist shift, form catatan bahan terpakai, timer produksi |
| Sprint 5 | 2 minggu | Modul 4: monitoring suhu 6 CCP, alert otomatis, checklist sanitasi |
| Sprint 6 | 2 minggu | Integrasi Modul 3+4 dengan Modul 1+2 (auto-deduct stok) |

---

### Fase 3: Reporting & Distribution (Sprint 7-9)

**Fokus:** Modul 5 (Distribusi) + Modul 6 (LPJ)

| Sprint | Durasi | Deliverables |
|--------|--------|-------------|
| Sprint 7 | 2 minggu | Modul 5: manajemen rute, tracking status, tanda terima digital |
| Sprint 8 | 2 minggu | Modul 6: rekap harian otomatis, template LPJ bulanan |
| Sprint 9 | 2 minggu | Workflow approval LPJ, backup cloud, PDF generation |

---

### Fase 4: Integration & UAT (Sprint 10-11)

**Fokus:** Modul 7 + Integrasi + User Acceptance Testing

| Sprint | Durasi | Deliverables |
|--------|--------|-------------|
| Sprint 10 | 2 minggu | Modul 7: kalender pelatihan, notulen rapat, feedback QR, form insiden |
| Sprint 11 | 1-2 minggu | Integrasi akhir semua modul, dashboard executives, UAT dengan user |

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## Struktur Folder

```
src/
├── app/                    # Next.js App Router pages
│   ├── modul-1/           # Penerimaan & Inventori
│   ├── modul-2/           # Menu & Gizi
│   ├── modul-3/           # Produksi Dapur
│   ├── modul-4/           # Food Safety & HACCP
│   ├── modul-5/           # Distribusi & Logistik
│   ├── modul-6/           # Dokumentasi & LPJ
│   └── modul-7/           # SDM & Pelatihan
├── components/            # Reusable UI components
├── lib/
│   ├── dummy-data/       # Mock JSON data (sebelum DB)
│   └── types/            # TypeScript definitions
└── styles/
```

---

## Catatan Development

- **Database:** Saat ini menggunakan dummy JSON data. Untuk production, akan migrate ke PostgreSQL + Redis.
- **Auth:** JWT-based dengan Role-Based Access Control sesuai 7 peran.
- **Mobile:** React Native/Future Flutter app untuk petugas lapangan (Phase 2+).

---

## Referensi

- Dokumen desain: `Sistem_Digital_MBG.docx`
- SOP Operasional Dapur MBG (SOP 1-15)
- Mockup interaktif: `mbg_mockup.html` (file terpisah)
