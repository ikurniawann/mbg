// ============================================
// TIPE DATA SISTEM DIGITAL MBG
// Versi 1.0 - April 2026
// ============================================

// ---------- ENUMS ----------

export type Role =
  | 'kepala_sppg'
  | 'ahli_gizi'
  | 'akuntan'
  | 'pengawas_logistik'
  | 'petugas_lapangan'
  | 'petugas_distribusi'
  | 'tim_yayasan';

export type LokasiSimpan = 'Cold Room' | 'Freezer' | 'Rak Kering';
export type StatusPenerimaan = 'Layak' | 'Tidak Layak' | 'Rusak Ringan';
export type JenisBahan = 'Bantuan MBG' | 'Mandiri';
export type StatusApprovalMenu = 'Draft' | 'Review' | 'Disetujui' | 'Ditolak';
export type Alergen =
  | 'Susu'
  | 'Telur'
  | 'Kacang'
  | 'Gluten'
  | 'Kedelai'
  | 'Seafood'
  | 'Wijen';

export type StatusDistribusi =
  | 'Belum Berangkat'
  | 'Dalam Perjalanan'
  | 'Terkirim'
  | 'Terlambat';

export type CCPType =
  | 'Penerimaan Beku'
  | 'Cold Storage'
  | 'Cold Room'
  | 'Cold Room #2'
  | 'Memasak'
  | 'Hot Holding'
  | 'Distribusi';

// ---------- MODUL 1: PENERIMAAN & INVENTORI ----------

export interface Bahan {
  id: string;
  nama: string;
  jumlah: number;
  satuan: string;
  kondisi: StatusPenerimaan;
  lokasi: LokasiSimpan;
  jenis: JenisBahan;
  tanggalMasuk: string;
  tanggalExp: string;
  suhu?: number; // untuk bahan beku/dingin
}

export interface BAPB {
  id: string;
  nomor: string; // format: BAPB-YYYY-MMDD-NNN
  tanggal: string;
  pemasok: string;
  bahan: Bahan[];
  status: StatusPenerimaan;
  fotoBukti?: string[];
  inputBy: string;
  createdAt: string;
}

export interface LabelBahan {
  kode: string; // format: MBG-MMYY-NNN
  namaBahan: string;
  tanggalProduksi: string;
  tanggalExp: string;
  lokasi: LokasiSimpan;
  jenis: JenisBahan;
  qrCode: string;
}

// ---------- MODUL 2: MANAJEMEN MENU & GIZI ----------

export interface Nutrisi {
  karbohidrat: number; // gram
  protein: number; // gram
  lemak: number; // gram
  vitamin: string[];
}

export interface SRC {
  // Standard Recipe Card
  id: string;
  menuId: string;
  namaMenu: string;
  bahan: {
    nama: string;
    jumlah: number;
    satuan: string;
    asal: JenisBahan;
  }[];
  prosedur: string;
  porsi: number;
  nutrisi: Nutrisi;
  alergen: Alergen[];
  foto?: string;
}

export interface MenuHarian {
  id: string;
  tanggal: string;
  namaMenu: string;
  src: SRC;
  statusApproval: StatusApprovalMenu;
  approvedBy?: string;
  approvedAt?: string;
}

export interface MenuMingguan {
  id: string;
  mingguKe: number;
  tahun: number;
  menus: MenuHarian[];
  totalGizi: Nutrisi;
}

// ---------- MODUL 3: PRODUKSI DAPUR ----------

export type Shift = 'Persiapan' | 'Pengolahan' | 'Pemorsian' | 'Packing' | 'Kebersihan';

export interface TugasShift {
  shift: Shift;
  petugas: string;
  tugas: string;
  status: 'pending' | 'completed' | 'in_progress';
  completedAt?: string;
}

export interface ProduksiHarian {
  id: string;
  tanggal: string;
  menuId: string;
  targetPorsi: number;
  realizedPorsi: number;
  shiftTasks: TugasShift[];
  bahanTerpakai: {
    nama: string;
    jumlah: number;
    satuan: string;
  }[];
  waktuMulai?: string;
  waktuSelesai?: string;
  timerStatus?: 'normal' | 'warning' | 'alert'; // alert jika > 4 jam
  fotoDokumentasi?: string[];
  healthCheckStaf: {
    nama: string;
    kondisi: 'Sehat' | 'Tidak Sehat';
    apdLengkap: boolean;
  }[];
}

export interface QCProduksi {
  id: string;
  produksiId: string;
  hasilQC: 'LULUS' | 'GAGAL';
  itemQC: {
    label: string;
    status: boolean;
  }[];
  catatan?: string;
 qcBy: string;
  qcAt: string;
}

// ---------- MODUL 4: FOOD SAFETY & HACCP ----------

export interface MonitoringSuhu {
  id: string;
  tanggal: string;
  ccps: {
    type: CCPType;
    suhu: number;
    batasBawah: number;
    batasAtas: number;
    status: 'OK' | 'ALERT';
  }[];
}

export interface ChecklistSanitasi {
  id: string;
  tanggal: string;
  frekuensi: 'Harian' | 'Mingguan' | 'Bulanan';
  item: {
    label: string;
    checked: boolean;
    timestamp?: string;
  }[];
  petugas: string;
  signature?: string;
}

export interface TindakanKorektif {
  id: string;
  tanggal: string;
  kronologi: string;
  penyebab: string;
  tindakan: string;
  status: 'Open' | 'In Progress' | 'Closed';
  closedAt?: string;
}

// ---------- MODUL 5: DISTRIBUSI & LOGISTIK ----------

export interface RuteDistribusi {
  id: string;
  tanggal: string;
  tujuan: string;
  petugas: string;
  jumlahBox: number;
  jadwalBerangkat: string;
  status: StatusDistribusi;
  waktuTiba?: string;
}

export interface TandaTerima {
  id: string;
  ruteId: string;
  namaPenerima: string;
  jumlahBoxDikirim: number;
  jumlahBoxDiterima: number;
  kondisi: 'Baik' | 'Rusak';
  fotoBukti?: string;
  ttdDigital?: string;
  waktuTerima: string;
}

export interface LaporanInsidenDistribusi {
  id: string;
  ruteId: string;
  jenis: 'Kerusakan' | 'Penolakan' | 'Keterlambatan Besar';
  deskripsi: string;
  tanggal: string;
  pelapor: string;
}

// ---------- MODUL 6: DOKUMENTASI & LPJ ----------

export interface LPJBulanan {
  id: string;
  bulan: number;
  tahun: number;
  ringkasan: {
    totalPorsi: number;
    totalBahan: number;
    totalDistribusi: number;
    rataRataGizi: Nutrisi;
  };
  menuList: MenuHarian[];
  dokumentasi: {
    kategori: 'Produksi' | 'Packing' | 'Distribusi';
    foto: string[];
  }[];
  keuangan: {
    bantuan: number;
    mandiri: number;
    total: number;
  };
  status: 'Draft' | 'Review' | 'Valid' | 'Final';
  approvalFlow: {
    role: Role;
    status: 'Pending' | 'Approved' | 'Rejected';
    approvedBy?: string;
    approvedAt?: string;
  }[];
  submittedAt?: string;
}

// ---------- MODUL 7: SDM, PELATIHAN & KOORDINASI ----------

export interface Pelatihan {
  id: string;
  judul: string;
  tanggal: string;
  peserta: string[];
  pemateri: string;
  materi: string;
  status: 'Terjadwal' | 'Selesai' | 'Batal';
}

export interface EvaluasiPelatihan {
  id: string;
  pelatihanId: string;
  peserta: string;
  skorTes: number;
  catatanPengawas: string;
  status: 'Lulus' | 'Remedial';
}

export interface NotulenRapat {
  id: string;
  tanggal: string;
  agenda: string;
  keputusan: string[];
  tindakLanjut: {
    action: string;
    pic: string;
    deadline: string;
  }[];
  daftarHadir: string[];
}

export interface FeedbackKepuasan {
  id: string;
  tanggal: string;
  lokasi: string;
  rating: {
    rasa: number;
    kebersihan: number;
    ketepatanWaktu: number;
  };
  komentar?: string;
}

export interface LaporanInsiden {
  id: string;
  jenis: 'Keracunan' | 'Keterlambatan Besar' | 'Kekurangan Bahan';
  deskripsi: string;
  tanggal: string;
  pelapor: string;
  status: 'Open' | 'Investigasi' | 'Closed';
  batasLapor: string; // 12 jam
}

// ---------- USER & AUTH ----------

export interface User {
  id: string;
  nama: string;
  role: Role;
  email: string;
  unit?: string; // untuk tim yayasan
}

// ---------- DASHBOARD TYPES ----------

export interface DashboardStats {
  targetPorsi: number;
  realizedPorsi: number;
  distribusiSelesai: number;
  distribusiTotal: number;
  stokBahan: number; // percentage
  alertAktif: number;
}

export interface DashboardAlert {
  id: string;
  type: 'suhu' | 'kadaluarsa' | 'waktu' | 'stok';
  message: string;
  timestamp: string;
  isRead: boolean;
}
