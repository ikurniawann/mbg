'use client';

import { useState } from 'react';

const dummyNotulen = [
  {
    id: 'n1',
    tanggal: '2026-04-15',
    agenda: 'Evaluasi Mingguan Produksi MBG',
    keputusan: [
      'Menambahkan satu petugas distribusi untuk rute SDN 08 Cikini',
      'Meningkatkan frekuensi checks suhu Cold Room #2 menjadi setiap 2 jam',
      'Mengalokasikan budget tambahan untuk perbaikan cold storage',
    ],
    tindakLanjut: [
      { action: 'Perbaikan cold storage', pic: 'Dewi Kusuma', deadline: '2026-04-18' },
      { action: 'Rekrut petugas distribusi tambahan', pic: 'Ahmad Fauzi', deadline: '2026-04-20' },
    ],
    daftarHadir: ['Ahmad Fauzi', 'Siti Rahmawati', 'Budi Santoso', 'Dewi Kusuma', 'Rudi Hermawan'],
  },
  {
    id: 'n2',
    tanggal: '2026-04-08',
    agenda: 'Perencanaan Menu Minggu Ke-16',
    keputusan: [
      'Menetujui menu ikan goreng + capcay untuk hari Kamis',
      'Mempertimbangkan alternatif menu untuk siswa dengan alergi gluten',
      'Meningkatkan porsi untuk SMPN 12 dari 180 menjadi 200',
    ],
    tindakLanjut: [
      { action: 'Siapkan menu alternatif non-gluten', pic: 'Siti Rahmawati', deadline: '2026-04-10' },
      { action: 'Update porsi di sistem', pic: 'Rudi Hermawan', deadline: '2026-04-08' },
    ],
    daftarHadir: ['Ahmad Fauzi', 'Siti Rahmawati', 'Rudi Hermawan'],
  },
  {
    id: 'n3',
    tanggal: '2026-04-01',
    agenda: 'Review Distribusi Bulan Maret',
    keputusan: [
      'Total distribusi Maret: 180 rute dengan rata-rata ketepatan 94%',
      'Perlu evaluasi rute ke panti asuhan yang sering terlambat',
      'Menambahkan dokumentasi foto untuk setiap entrega',
    ],
    tindakLanjut: [
      { action: 'Evaluasi rute panti asuhan', pic: 'Dewi Kusuma', deadline: '2026-04-05' },
    ],
    daftarHadir: ['Ahmad Fauzi', 'Dewi Kusuma', 'Joko Pramono'],
  },
];

export default function NotulenPage() {
  const [selectedNotulen, setSelectedNotulen] = useState<string | null>(null);

  const activeNotulen = dummyNotulen.find(n => n.id === selectedNotulen) || dummyNotulen[0];

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Notulen Rapat</h1>
          <p className="text-sm text-slate-500 mt-1">Dokumentasi rapat dan keputusan</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
          + Buat Notulen Baru
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: List of Notulen */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">📋 Daftar Rapat</h2>
          <div className="space-y-2">
            {dummyNotulen.map(n => (
              <button
                key={n.id}
                onClick={() => setSelectedNotulen(n.id)}
                className={`w-full text-left p-4 rounded-xl border transition ${
                  activeNotulen.id === n.id
                    ? 'bg-indigo-50 border-indigo-300'
                    : 'bg-gray-50 border-gray-200 hover:border-indigo-200'
                }`}
              >
                <p className="font-semibold text-slate-800 text-sm">{n.agenda}</p>
                <p className="text-xs text-slate-500 mt-1">📅 {n.tanggal}</p>
                <p className="text-xs text-slate-400 mt-1">{n.daftarHadir.length} peserta hadir</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Notulen Detail */}
        <div className="lg:col-span-2 space-y-4">
          {/* Main Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-slate-800">{activeNotulen.agenda}</h2>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-lg font-medium">
                📅 {activeNotulen.tanggal}
              </span>
            </div>

            {/* Daftar Hadir */}
            <div className="mb-4">
              <p className="text-sm font-medium text-slate-600 mb-2">👥 Daftar Hadir:</p>
              <div className="flex flex-wrap gap-2">
                {activeNotulen.daftarHadir.map((nama, idx) => (
                  <span key={idx} className="text-xs bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                    {nama}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Keputusan */}
          <div className="bg-emerald-50 rounded-xl p-6 shadow-sm border border-emerald-200">
            <h3 className="font-semibold text-emerald-800 mb-3">✅ Keputusan</h3>
            <ul className="space-y-2">
              {activeNotulen.keputusan.map((k, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <span className="text-sm text-slate-700">{k}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tindak Lanjut */}
          <div className="bg-amber-50 rounded-xl p-6 shadow-sm border border-amber-200">
            <h3 className="font-semibold text-amber-800 mb-3">📌 Tindak Lanjut</h3>
            <div className="space-y-3">
              {activeNotulen.tindakLanjut.map((tl, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-amber-200">
                  <div>
                    <p className="font-medium text-slate-800">{tl.action}</p>
                    <p className="text-xs text-slate-500 mt-1">👤 {tl.pic}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Deadline</p>
                    <p className="text-sm font-semibold text-amber-700">{tl.deadline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
              Edit Notulen
            </button>
            <button className="px-4 py-2 bg-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-300 transition">
              Cetak / Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}