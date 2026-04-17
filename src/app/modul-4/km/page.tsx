'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { JenisKM, SeverityKM, StatusKM, KejadianMenonjol } from '@/lib/types';

const JENIS_KM: JenisKM[] = [
  'Gangguan Pencernaan',
  'Alergi/Reaksi Makanan',
  'Keracunan Makanan',
  'Gangguan Lain',
];

const KELOMPOK_OPTIONS = ['Reguler', 'Ibu Hamil', 'Ibu Menyusui', 'Balita'] as const;
const NOTIFIED_OPTIONS = [
  'Kepala BGN', 'Dinas Kesehatan Kabupaten/Kota', 'PPGTimber',
  'Korwil Pendidikan', 'Pihak Sekolah', 'Orang Tua/Wali',
];

const SEVERITY_COLORS: Record<SeverityKM, string> = {
  'Kritis': 'bg-red-100 text-red-700 border-red-300',
  'Mayor': 'bg-amber-100 text-amber-700 border-amber-300',
  'Minor': 'bg-blue-100 text-blue-700 border-blue-300',
};

const STATUS_COLORS: Record<StatusKM, string> = {
  'Open': 'bg-red-100 text-red-700',
  'Investigasi': 'bg-amber-100 text-amber-700',
  'Closed': 'bg-emerald-100 text-emerald-700',
};

const dummyKM: KejadianMenonjol[] = [
  {
    id: 'km1',
    tanggalKejadian: '2026-04-10',
    tanggalLapor: '2026-04-10',
    lokasi: 'SDN 03 Menteng, Jakarta Pusat',
    kelompok: 'Reguler',
    jenis: 'Gangguan Pencernaan',
    jumlahDampak: 3,
    severity: 'Minor',
    deskripsi: '3 siswa mengeluh mual dan diare ringan setelah makan menu Ikan Goreng + Capcay.',
    kronologi: '00:30 setelah makan, 3 siswa kelas 2 mengeluh mual. Petugas langsung mencatat dan menginformasikan ke pihak sekolah.',
    tindakanSegera: 'Mencatat gejala, mengisolasi siswa yang terdampak, memberikan air putih, dan mengontak orang tua.',
    status: 'Closed',
    closedAt: '2026-04-11',
    pelapor: 'Joko Pramono',
    notifiedKe: ['Kepala BGN', 'Dinas Kesehatan Kabupaten/Kota', 'PPGTimber'],
    followUp: 'Menu diganti besoknya. CCTV dapur dicek, tidak ada anomaly. Siswa sembuh dalam 24 jam.',
  },
  {
    id: 'km2',
    tanggalKejadian: '2026-04-15',
    tanggalLapor: '2026-04-15',
    lokasi: 'SMP 12 Cipete, Jakarta Selatan',
    kelompok: 'Ibu Hamil',
    jenis: 'Alergi/Reaksi Makanan',
    jumlahDampak: 1,
    severity: 'Mayor',
    deskripsi: '1 ibu hamil mengalami gatal-gatal dan ruam kulit setelah mengonsumsi menu.',
    kronologi: 'Ibu hamil berusia 7 bulan mengeluh gatal dan muncul ruam 15 menit setelah makan. Petugas langsung memberikan antihistamin dan mengontak bidan.',
    tindakanSegera: 'Memberikan obat antihistamin, menghubungi bidan desa, dan melakukan observasi. Dirujuk ke puskesmas.',
    status: 'Investigasi',
    pelapor: 'Rudi Hermawan',
    notifiedKe: ['Kepala BGN', 'Dinas Kesehatan Kabupaten/Kota', 'PPGTimber'],
    followUp: 'Sedang diinvestigasi. Menu ditangguhkan sementara untuk kelompok 3B di lokasi tersebut.',
  },
];

export default function KMPage() {
  const [kmList, setKmList] = useState<KejadianMenonjol[]>(dummyKM);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<StatusKM | 'All'>('All');
  const [filterSeverity, setFilterSeverity] = useState<SeverityKM | 'All'>('All');
  const [selectedKM, setSelectedKM] = useState<KejadianMenonjol | null>(null);

  // Form state
  const [form, setForm] = useState({
    lokasi: '', kelompok: 'Reguler', jenis: 'Gangguan Pencercaian' as JenisKM,
    jumlahDampak: 1, severity: 'Minor' as SeverityKM,
    deskripsi: '', kronologi: '', tindakanSegera: '',
    notifiedKe: [] as string[],
  });

  const openKM = kmList.filter(k => k.status === 'Open').length;
  const investigasiKM = kmList.filter(k => k.status === 'Investigasi').length;

  const filtered = kmList.filter(k => {
    if (filterStatus !== 'All' && k.status !== filterStatus) return false;
    if (filterSeverity !== 'All' && k.severity !== filterSeverity) return false;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newKM: KejadianMenonjol = {
      id: `km${Date.now()}`,
      ...form,
      tanggalKejadian: new Date().toISOString().split('T')[0],
      tanggalLapor: new Date().toISOString().split('T')[0],
      status: 'Open',
      pelapor: 'Petugas Lapangan',
    };
    setKmList(prev => [newKM, ...prev]);
    setShowForm(false);
    setForm({ lokasi: '', kelompok: 'Reguler', jenis: 'Gangguan Pencernaan', jumlahDampak: 1, severity: 'Minor', deskripsi: '', kronologi: '', tindakanSegera: '', notifiedKe: [] });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Kejadian Menonjol (KM)</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-slate-500">Selasa, 17 April 2026</p>
            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium border border-red-300">
              🇮🇩 SK BGN No. 63421/2026
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/modul-4" className="px-4 py-2 border border-gray-300 text-slate-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
            ← Dashboard
          </Link>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
          >
            🚨 Laporkan KM Baru
          </button>
        </div>
      </header>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-6 flex items-center gap-4">
        <span className="text-2xl">ℹ️</span>
        <div className="text-sm text-blue-800">
          <p className="font-semibold">Wajib Lapor: Maks. 12 jam setelah kejadian</p>
          <p className="text-blue-600 text-xs mt-0.5">
            KM = Kejadian Menonjol: gangguan pencernaan / alergi / keracunan pada penerima manfaat.
            Wajib dilaporkan ke Kepala BGN, Dinas Kesehatan, dan PPGTimber sesuai SK 63421/2026.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Total KM</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{kmList.length}</p>
          <p className="text-xs text-slate-400 mt-1">kejadian</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Open</p>
          <p className="text-3xl font-bold text-red-600 mt-1">{openKM}</p>
          <p className="text-xs text-slate-400 mt-1">belum ditutup</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Investigasi</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">{investigasiKM}</p>
          <p className="text-xs text-slate-400 mt-1">sedang diproses</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Closed</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">
            {kmList.filter(k => k.status === 'Closed').length}
          </p>
          <p className="text-xs text-slate-400 mt-1">selesai</p>
        </div>
      </div>

      {/* New KM Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">🚨 Form Pelaporan Kejadian Menonjol</h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-xs text-red-700 font-medium">
              ⏰ Batas pelaporan: Maksimum 12 jam setelah kejadian. Lapor ke: Kepala BGN, Dinas Kesehatan, PPGTimber.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Lokasi Kejadian *</label>
              <input type="text" required placeholder="Contoh: SDN 03 Menteng, Jakarta Pusat"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                value={form.lokasi} onChange={e => setForm(p => ({ ...p, lokasi: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Kelompok Penerima *</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                value={form.kelompok} onChange={e => setForm(p => ({ ...p, kelompok: e.target.value as any }))}>
                {KELOMPOK_OPTIONS.map(k => <option key={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Jenis Kejadian *</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                value={form.jenis} onChange={e => setForm(p => ({ ...p, jenis: e.target.value as JenisKM }))}>
                {JENIS_KM.map(j => <option key={j}>{j}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Jumlah Dampak *</label>
              <input type="number" min="1" required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                value={form.jumlahDampak} onChange={e => setForm(p => ({ ...p, jumlahDampak: parseInt(e.target.value) }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Severity *</label>
              <div className="flex gap-2 mt-1">
                {(['Kritis', 'Mayor', 'Minor'] as SeverityKM[]).map(s => (
                  <button key={s} type="button" onClick={() => setForm(p => ({ ...p, severity: s }))}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium border-2 transition ${form.severity === s ? SEVERITY_COLORS[s] : 'border-gray-200 text-slate-400'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Deskripsi Singkat Kejadian *</label>
              <textarea rows={2} required placeholder="Ringkasan kejadian..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                value={form.deskripsi} onChange={e => setForm(p => ({ ...p, deskripsi: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Kronologi *</label>
              <textarea rows={3} required placeholder="Uraian kronologis kejadian..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                value={form.kronologi} onChange={e => setForm(p => ({ ...p, kronologi: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Tindakan Segera yang Dilakukan *</label>
              <textarea rows={2} required placeholder="Langkah awal yang sudah dilakukan..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                value={form.tindakanSegera} onChange={e => setForm(p => ({ ...p, tindakanSegera: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Notifikasi Dikirim ke:</label>
              <div className="flex flex-wrap gap-2">
                {NOTIFIED_OPTIONS.map(n => (
                  <label key={n} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 text-xs font-medium cursor-pointer transition ${form.notifiedKe.includes(n) ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-200 text-slate-500'}`}>
                    <input type="checkbox" className="accent-blue-500 w-3 h-3"
                      checked={form.notifiedKe.includes(n)}
                      onChange={e => setForm(p => ({
                        ...p,
                        notifiedKe: e.target.checked ? [...p.notifiedKe, n] : p.notifiedKe.filter(x => x !== n),
                      }))} />
                    {n}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-gray-300 text-slate-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
              Batal
            </button>
            <button type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">
              🚨 Kirim Laporan KM
            </button>
          </div>
        </form>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-slate-500">Filter:</span>
        <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)}>
          <option value="All">Semua Status</option>
          <option value="Open">Open</option>
          <option value="Investigasi">Investigasi</option>
          <option value="Closed">Closed</option>
        </select>
        <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filterSeverity} onChange={e => setFilterSeverity(e.target.value as any)}>
          <option value="All">Semua Severity</option>
          <option value="Kritis">Kritis</option>
          <option value="Mayor">Mayor</option>
          <option value="Minor">Minor</option>
        </select>
        <span className="ml-auto text-xs text-slate-400">{filtered.length} kejadian</span>
      </div>

      {/* KM List */}
      <div className="space-y-3">
        {filtered.map(km => (
          <div
            key={km.id}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:border-gray-300 transition cursor-pointer"
            onClick={() => setSelectedKM(selectedKM?.id === km.id ? null : km)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold border ${SEVERITY_COLORS[km.severity]}`}>
                    {km.severity}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[km.status]}`}>
                    {km.status}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500">{km.jenis}</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{km.kelompok}</span>
                </div>
                <h3 className="font-semibold text-slate-800">{km.deskripsi}</h3>
                <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                  <span>📍 {km.lokasi}</span>
                  <span>📅 {km.tanggalKejadian}</span>
                  <span>👥 {km.jumlahDampak} terdampak</span>
                  <span>👤 {km.pelapor}</span>
                </div>
              </div>
              <div className="text-right ml-4">
                <span className="text-xs text-slate-400">ID: {km.id.toUpperCase()}</span>
              </div>
            </div>

            {/* Expanded Detail */}
            {selectedKM?.id === km.id && (
              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Kronologi</p>
                  <p className="text-sm text-slate-700">{km.kronologi}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Tindakan Segera</p>
                  <p className="text-sm text-slate-700">{km.tindakanSegera}</p>
                </div>
                {km.followUp && (
                  <div className="col-span-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Follow Up</p>
                    <p className="text-sm text-slate-700">{km.followUp}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Notifikasi Dikirim ke</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {km.notifiedKe.map(n => (
                      <span key={n} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{n}</span>
                    ))}
                  </div>
                </div>
                {km.closedAt && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Ditutup Pada</p>
                    <p className="text-sm text-emerald-600">{km.closedAt}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
