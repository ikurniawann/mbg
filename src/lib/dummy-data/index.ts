// ============================================
// DUMMY DATA - SISTEM DIGITAL MBG
// ============================================

import type {
  BAPB,
  Bahan,
  MenuHarian,
  MenuMingguan,
  SRC,
  ProduksiHarian,
  MonitoringSuhu,
  ChecklistSanitasi,
  RuteDistribusi,
  TandaTerima,
  LPJBulanan,
  Pelatihan,
  FeedbackKepuasan,
  DashboardStats,
  DashboardAlert,
  User,
} from '../types';

// ---------- DUMMY USERS ----------

export const dummyUsers: User[] = [
  { id: 'u1', nama: 'Ahmad Fauzi', role: 'kepala_sppg', email: 'ahmad.fauzi@sppg.id' },
  { id: 'u2', nama: 'Siti Rahmawati', role: 'ahli_gizi', email: 'siti.r@sppg.id' },
  { id: 'u3', nama: 'Budi Santoso', role: 'akuntan', email: 'budi.s@sppg.id' },
  { id: 'u4', nama: 'Dewi Kusuma', role: 'pengawas_logistik', email: 'dewi.k@sppg.id' },
  { id: 'u5', nama: 'Rudi Hermawan', role: 'petugas_lapangan', email: 'rudi.h@sppg.id' },
  { id: 'u6', nama: 'Joko Pramono', role: 'petugas_distribusi', email: 'joko.p@sppg.id' },
  { id: 'u7', nama: 'Anisa Putri', role: 'tim_yayasan', email: 'anisa@yayasan.id', unit: 'Koordinator Program' },
];

// ---------- DASHBOARD ----------

export const dummyDashboardStats: DashboardStats = {
  targetPorsi: 500,
  realizedPorsi: 342,
  distribusiSelesai: 8,
  distribusiTotal: 12,
  stokBahan: 94,
  alertAktif: 3,
};

export const dummyDashboardAlerts: DashboardAlert[] = [
  {
    id: 'a1',
    type: 'suhu',
    message: 'Cold room #2 suhu 7°C (melebihi batas 5°C)',
    timestamp: '2026-04-17 08:30:00',
    isRead: false,
  },
  {
    id: 'a2',
    type: 'kadaluarsa',
    message: 'Wortel 5kg akan kadaluarsa dalam 3 hari',
    timestamp: '2026-04-17 07:00:00',
    isRead: false,
  },
  {
    id: 'a3',
    type: 'waktu',
    message: 'Distribusi ke SDN 08 Cikini terlambat 45 menit',
    timestamp: '2026-04-17 09:15:00',
    isRead: false,
  },
];

// ---------- MODUL 1: PENERIMAAN & INVENTORI ----------

export const dummyBahan: Bahan[] = [
  {
    id: 'b1',
    nama: 'Beras',
    jumlah: 250,
    satuan: 'kg',
    kondisi: 'Layak',
    lokasi: 'Rak Kering',
    jenis: 'Bantuan MBG',
    tanggalMasuk: '2026-04-15',
    tanggalExp: '2026-10-15',
  },
  {
    id: 'b2',
    nama: 'Ayam',
    jumlah: 80,
    satuan: 'kg',
    kondisi: 'Layak',
    lokasi: 'Cold Room',
    jenis: 'Bantuan MBG',
    tanggalMasuk: '2026-04-16',
    tanggalExp: '2026-04-20',
    suhu: 4,
  },
  {
    id: 'b3',
    nama: 'Wortel',
    jumlah: 30,
    satuan: 'kg',
    kondisi: 'Rusak Ringan',
    lokasi: 'Cold Room',
    jenis: 'Mandiri',
    tanggalMasuk: '2026-04-14',
    tanggalExp: '2026-04-20',
    suhu: 5,
  },
  {
    id: 'b4',
    nama: 'Ikan',
    jumlah: 50,
    satuan: 'kg',
    kondisi: 'Layak',
    lokasi: 'Freezer',
    jenis: 'Bantuan MBG',
    tanggalMasuk: '2026-04-16',
    tanggalExp: '2026-04-23',
    suhu: -19,
  },
  {
    id: 'b5',
    nama: 'Tahu',
    jumlah: 40,
    satuan: 'kg',
    kondisi: 'Layak',
    lokasi: 'Cold Room',
    jenis: 'Mandiri',
    tanggalMasuk: '2026-04-17',
    tanggalExp: '2026-04-19',
    suhu: 4,
  },
  {
    id: 'b6',
    nama: 'Bayam',
    jumlah: 20,
    satuan: 'kg',
    kondisi: 'Layak',
    lokasi: 'Cold Room',
    jenis: 'Mandiri',
    tanggalMasuk: '2026-04-17',
    tanggalExp: '2026-04-18',
    suhu: 4,
  },
];

export const dummyBAPB: BAPB[] = [
  {
    id: 'bp1',
    nomor: 'BAPB-2026-0416-001',
    tanggal: '2026-04-16',
    pemasok: 'CV Sumber Pangan Nusantara',
    bahan: [
      { id: 'b1', nama: 'Beras', jumlah: 100, satuan: 'kg', kondisi: 'Layak', lokasi: 'Rak Kering', jenis: 'Bantuan MBG', tanggalMasuk: '2026-04-16', tanggalExp: '2026-10-16' },
      { id: 'b2', nama: 'Ayam', jumlah: 30, satuan: 'kg', kondisi: 'Layak', lokasi: 'Cold Room', jenis: 'Bantuan MBG', tanggalMasuk: '2026-04-16', tanggalExp: '2026-04-20', suhu: 4 },
    ],
    status: 'Layak',
    inputBy: 'Rudi Hermawan',
    createdAt: '2026-04-16 07:30:00',
  },
  {
    id: 'bp2',
    nomor: 'BAPB-2026-0416-002',
    tanggal: '2026-04-16',
    pemasok: 'PT Berkah Tani',
    bahan: [
      { id: 'b3', nama: 'Wortel', jumlah: 15, satuan: 'kg', kondisi: 'Rusak Ringan', lokasi: 'Cold Room', jenis: 'Mandiri', tanggalMasuk: '2026-04-16', tanggalExp: '2026-04-20', suhu: 5 },
      { id: 'b5', nama: 'Tahu', jumlah: 20, satuan: 'kg', kondisi: 'Layak', lokasi: 'Cold Room', jenis: 'Mandiri', tanggalMasuk: '2026-04-16', tanggalExp: '2026-04-19', suhu: 4 },
    ],
    status: 'Rusak Ringan',
    inputBy: 'Rudi Hermawan',
    createdAt: '2026-04-16 08:15:00',
  },
];

// ---------- MODUL 2: MANAJEMEN MENU & GIZI ----------

export const dummySRC: SRC[] = [
  {
    id: 'src1',
    menuId: 'm1',
    namaMenu: 'Ikan Goreng + Capcay',
    bahan: [
      { nama: 'Ikan', jumlah: 100, satuan: 'kg', asal: 'Bantuan MBG' },
      { nama: 'Wortel', jumlah: 30, satuan: 'kg', asal: 'Mandiri' },
      { nama: 'Bayam', jumlah: 20, satuan: 'kg', asal: 'Mandiri' },
      { nama: 'Beras', jumlah: 75, satuan: 'kg', asal: 'Bantuan MBG' },
    ],
    prosedur: '1. Ikan digoreng dengan suhu 176°C selama 5 menit\n2. Capcay ditumis dengan api besar selama 3 menit\n3. Packing dalam box thermal',
    porsi: 500,
    nutrisi: {
      karbohidrat: 350,
      protein: 180,
      lemak: 90,
      vitamin: ['A', 'C', 'B12'],
    },
    alergen: ['Seafood'],
  },
];

export const dummyMenuHarian: MenuHarian[] = [
  {
    id: 'mh1',
    tanggal: '2026-04-17',
    namaMenu: 'Ikan Goreng + Capcay',
    src: dummySRC[0],
    statusApproval: 'Disetujui',
    approvedBy: 'Siti Rahmawati',
    approvedAt: '2026-04-16 14:00:00',
  },
  {
    id: 'mh2',
    tanggal: '2026-04-16',
    namaMenu: 'Ayam Goreng + Tumis Kangkung',
    src: dummySRC[0],
    statusApproval: 'Disetujui',
    approvedBy: 'Siti Rahmawati',
    approvedAt: '2026-04-15 14:00:00',
  },
  {
    id: 'mh3',
    tanggal: '2026-04-15',
    namaMenu: 'Telur Balado + Tahu Tempe',
    src: dummySRC[0],
    statusApproval: 'Disetujui',
    approvedBy: 'Siti Rahmawati',
    approvedAt: '2026-04-14 14:00:00',
  },
];

export const dummyMenuMingguan: MenuMingguan = {
  id: 'mm1',
  mingguKe: 16,
  tahun: 2026,
  menus: dummyMenuHarian,
  totalGizi: {
    karbohidrat: 350,
    protein: 180,
    lemak: 90,
    vitamin: ['A', 'C', 'B12', 'D'],
  },
};

// ---------- MODUL 3: PRODUKSI ----------

export const dummyProduksiHarian: ProduksiHarian = {
  id: 'prod1',
  tanggal: '2026-04-17',
  menuId: 'mh1',
  targetPorsi: 500,
  realizedPorsi: 342,
  shiftTasks: [
    { shift: 'Persiapan', petugas: 'Rudi Hermawan', tugas: 'Siapkan bahan', status: 'completed', completedAt: '2026-04-17 06:00:00' },
    { shift: 'Pengolahan', petugas: 'Rudi Hermawan', tugas: 'Masak sesuai SRC', status: 'completed', completedAt: '2026-04-17 08:30:00' },
    { shift: 'Pemorsian', petugas: 'Rudi Hermawan', tugas: 'Bagi porsi', status: 'completed', completedAt: '2026-04-17 09:45:00' },
    { shift: 'Packing', petugas: 'Rudi Hermawan', tugas: 'Packing 342 box', status: 'in_progress' },
    { shift: 'Kebersihan', petugas: 'Rudi Hermawan', tugas: 'Bersihkan dapur', status: 'pending' },
  ],
  bahanTerpakai: [
    { nama: 'Ikan', jumlah: 70, satuan: 'kg' },
    { nama: 'Wortel', jumlah: 20, satuan: 'kg' },
    { nama: 'Bayam', jumlah: 15, satuan: 'kg' },
  ],
  waktuMulai: '2026-04-17 06:00:00',
  timerStatus: 'normal',
  healthCheckStaf: [
    { nama: 'Rudi Hermawan', kondisi: 'Sehat', apdLengkap: true },
    { nama: 'Joko Pramono', kondisi: 'Sehat', apdLengkap: true },
  ],
};

// ---------- MODUL 4: FOOD SAFETY ----------

export const dummyMonitoringSuhu: MonitoringSuhu = {
  id: 'suhu1',
  tanggal: '2026-04-17',
  ccps: [
    { type: 'Penerimaan Beku', suhu: -19, batasBawah: -25, batasAtas: -15, status: 'OK' },
    { type: 'Cold Storage', suhu: 4, batasBawah: 0, batasAtas: 5, status: 'OK' },
    { type: 'Cold Room #2', suhu: 7, batasBawah: 0, batasAtas: 5, status: 'ALERT' },
    { type: 'Memasak', suhu: 76, batasBawah: 75, batasAtas: 85, status: 'OK' },
    { type: 'Hot Holding', suhu: 62, batasBawah: 60, batasAtas: 70, status: 'OK' },
    { type: 'Distribusi', suhu: 58, batasBawah: 55, batasAtas: 65, status: 'OK' },
  ],
};

export const dummyChecklistSanitasi: ChecklistSanitasi = {
  id: 'sanit1',
  tanggal: '2026-04-17',
  frekuensi: 'Harian',
  item: [
    { label: 'Cuci tangan staf', checked: true, timestamp: '2026-04-17 05:55:00' },
    { label: 'Sterilisasi meja', checked: true, timestamp: '2026-04-17 06:10:00' },
    { label: 'Cek APD staf', checked: true, timestamp: '2026-04-17 06:15:00' },
    { label: 'Kebersihan pasca-produksi', checked: false },
  ],
  petugas: 'Rudi Hermawan',
};

// ---------- MODUL 5: DISTRIBUSI ----------

export const dummyRuteDistribusi: RuteDistribusi[] = [
  { id: 'r1', tanggal: '2026-04-17', tujuan: 'SDN 05 Menteng', petugas: 'Joko Pramono', jumlahBox: 150, jadwalBerangkat: '10:00', status: 'Terkirim', waktuTiba: '10:35' },
  { id: 'r2', tanggal: '2026-04-17', tujuan: 'SMPN 12', petugas: 'Joko Pramono', jumlahBox: 200, jadwalBerangkat: '10:00', status: 'Dalam Perjalanan' },
  { id: 'r3', tanggal: '2026-04-17', tujuan: 'Panti Al-Hidayah', petugas: 'Joko Pramono', jumlahBox: 80, jadwalBerangkat: '10:30', status: 'Belum Berangkat' },
  { id: 'r4', tanggal: '2026-04-17', tujuan: 'SDN 08 Cikini', petugas: 'Joko Pramono', jumlahBox: 120, jadwalBerangkat: '10:00', status: 'Terlambat', waktuTiba: '11:15' },
  { id: 'r5', tanggal: '2026-04-17', tujuan: 'SMAN 3 Gambir', petugas: 'Joko Pramono', jumlahBox: 180, jadwalBerangkat: '10:30', status: 'Belum Berangkat' },
];

export const dummyTandaTerima: TandaTerima[] = [
  {
    id: 'tt1',
    ruteId: 'r1',
    namaPenerima: 'Hj. Nurul Huda',
    jumlahBoxDikirim: 150,
    jumlahBoxDiterima: 150,
    kondisi: 'Baik',
    waktuTerima: '2026-04-17 10:35:00',
  },
];

// ---------- MODUL 6: LPJ ----------

export const dummyLPJ: LPJBulanan = {
  id: 'lpj1',
  bulan: 3,
  tahun: 2026,
  ringkasan: {
    totalPorsi: 22500,
    totalBahan: 4500,
    totalDistribusi: 180,
    rataRataGizi: { karbohidrat: 350, protein: 180, lemak: 90, vitamin: ['A', 'C', 'B12'] },
  },
  menuList: dummyMenuHarian,
  dokumentasi: [
    { kategori: 'Produksi', foto: ['/foto/produksi-1.jpg'] },
    { kategori: 'Packing', foto: ['/foto/packing-1.jpg'] },
    { kategori: 'Distribusi', foto: ['/foto/distribusi-1.jpg'] },
  ],
  keuangan: {
    bantuan: 150000000,
    mandiri: 45000000,
    total: 195000000,
  },
  status: 'Review',
  approvalFlow: [
    { role: 'kepala_sppg', status: 'Pending' },
    { role: 'ahli_gizi', status: 'Approved', approvedBy: 'Siti Rahmawati', approvedAt: '2026-04-10' },
    { role: 'akuntan', status: 'Approved', approvedBy: 'Budi Santoso', approvedAt: '2026-04-11' },
  ],
};

// ---------- MODUL 7: SDM ----------

export const dummyPelatihan: Pelatihan[] = [
  {
    id: 'pel1',
    judul: 'Pelatihan HACCP Dasar',
    tanggal: '2026-04-20',
    peserta: ['Rudi Hermawan', 'Joko Pramono'],
    pemateri: 'Dr. Hendra Wijaya',
    materi: 'Dasar-dasar HACCP dan food safety',
    status: 'Terjadwal',
  },
  {
    id: 'pel2',
    judul: 'Pelatihan Gizi Seimbang',
    tanggal: '2026-03-15',
    peserta: ['Rudi Hermawan', 'Joko Pramono', 'Dewi Kusuma'],
    pemateri: 'Siti Rahmawati',
    materi: 'Pedoman Gizi Seimbang Kemenkes',
    status: 'Selesai',
  },
];

export const dummyFeedback: FeedbackKepuasan[] = [
  {
    id: 'fb1',
    tanggal: '2026-04-17',
    lokasi: 'SDN 05 Menteng',
    rating: { rasa: 4.5, kebersihan: 4.3, ketepatanWaktu: 4.0 },
    komentar: 'Makanannya enak dan masih hangat',
  },
  {
    id: 'fb2',
    tanggal: '2026-04-17',
    lokasi: 'SMPN 12',
    rating: { rasa: 4.2, kebersihan: 4.5, ketepatanWaktu: 4.8 },
    komentar: 'Tepat waktu dan kemasan rapi',
  },
];

// ---------- PROGRESS DATA FOR DASHBOARD ----------

export const dummyProgressProduksi = {
  persiapan: 100,
  pengolahan: 85,
  pemorsian: 68,
  packing: 52,
  distribusi: 40,
};

export const dummyTrenPorsi = [472, 495, 512, 488, 501, 467, 342];
