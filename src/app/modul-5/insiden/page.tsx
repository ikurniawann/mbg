'use client';

import { useState } from 'react';
import Link from 'next/link';

// Dummy incident data
const dummyInsiden: {
  id: string;
  ruteId: string;
  jenis: 'Kerusakan' | 'Penolakan' | 'Keterlambatan Besar';
  deskripsi: string;
  tanggal: string;
  pelapor: string;
  status: 'Open' | 'Investigasi' | 'Closed';
}[] = [
  {
    id: 'ins1',
    ruteId: 'r4',
    jenis: 'Keterlambatan Besar',
    deskripsi: 'Pengiriman ke SDN 08 Cikini terlambat 45 menit akibat kemacetan di Jalan Sudirman. Kondisi makanan tetap baik.',
    tanggal: '2026-04-17 09:15:00',
    pelapor: 'Joko Pramono',
    status: 'Investigasi',
  },
  {
    id: 'ins2',
    ruteId: 'r2',
    jenis: 'Kerusakan',
    deskripsi: '5 box makanan rusak ringan akibat kemasan tertekan saat pemuatan. Makanan masih layak dikonsumsi.',
    tanggal: '2026-04-17 09:45:00',
    pelapor: 'Joko Pramono',
    status: 'Open',
  },
];

const STATUS_COLORS: Record<string, string> = {
  'Open': 'bg-red-100 text-red-700 border-red-200',
  'Investigasi': 'bg-amber-100 text-amber-700 border-amber-200',
  'Closed': 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const JENIS_ICONS: Record<string, string> = {
  'Kerusakan': '📦',
  'Penolakan': '🚫',
  'Keterlambatan Besar': '⏰',
};

export default function InsidenPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedJenis, setSelectedJenis] = useState<string>('all');

  const filteredInsiden = selectedJenis === 'all'
    ? dummyInsiden
    : dummyInsiden.filter(i => i.jenis === selectedJenis);

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/modul-5" className="text-sm text-teal-600 hover:text-teal-700">← Modul 5</Link>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Insiden Distribusi</h1>
          <p className="text-sm text-slate-500 mt-1">Selasa, 17 April 2026 • Catat & tracking insiden distribusi</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
        >
          {showForm ? '✕ Tutup Form' : '+ Laporkan Insiden'}
        </button>
      </header>

      {/* Alert Banner */}
      {dummyInsiden.filter(i => i.status === 'Open').length > 0 && (
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚨</span>
            <div>
              <p className="font-bold text-red-800">
                {dummyInsiden.filter(i => i.status === 'Open').length} Insiden Belum Ditangani!
              </p>
              <p className="text-sm text-red-600">
                Laporan insiden yang perlu ditindaklanjuti segera
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form Section */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <h2 className="font-semibold text-slate-800 mb-4">Form Laporan Insiden Baru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Insiden</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Kerusakan</option>
                <option>Penolakan</option>
                <option>Keterlambatan Besar</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Rute Terkait</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>SDN 05 Menteng (r1)</option>
                <option>SMPN 12 (r2)</option>
                <option>Panti Al-Hidayah (r3)</option>
                <option>SDN 08 Cikini (r4)</option>
                <option>SMAN 3 Gambir (r5)</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Kejadian</label>
              <textarea
                rows={4}
                placeholder="Jelaskan kronologi insiden secara detail..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Pelapor</label>
              <input
                type="text"
                placeholder="Nama petugas pelapor"
                defaultValue="Joko Pramono"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal & Waktu</label>
              <input
                type="datetime-local"
                defaultValue="2026-04-17T10:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Upload Dokumentasi</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-400 transition">
              <span className="text-3xl">📷</span>
              <p className="text-sm text-slate-500 mt-2">Klik untuk upload foto/video insiden</p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG, MP4 hingga 10MB</p>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">
              ✓ Laporkan Insiden
            </button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Total Insiden</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{dummyInsiden.length}</p>
          <p className="text-xs text-slate-400 mt-1">laporan</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Open</p>
          <p className="text-3xl font-bold text-red-600 mt-1">
            {dummyInsiden.filter(i => i.status === 'Open').length}
          </p>
          <p className="text-xs text-slate-400 mt-1">belum ditangani</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Dalam Investigasi</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">
            {dummyInsiden.filter(i => i.status === 'Investigasi').length}
          </p>
          <p className="text-xs text-slate-400 mt-1">proses penyidikan</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <span className="text-sm text-slate-600 font-medium">Filter Jenis:</span>
        {['all', 'Kerusakan', 'Penolakan', 'Keterlambatan Besar'].map((jenis) => (
          <button
            key={jenis}
            onClick={() => setSelectedJenis(jenis)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedJenis === jenis
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
            }`}
          >
            {jenis === 'all' ? 'Semua' : jenis}
          </button>
        ))}
      </div>

      {/* Insiden Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {filteredInsiden.map((insiden) => (
          <div
            key={insiden.id}
            className={`bg-white rounded-xl p-5 shadow-sm border-2 transition ${
              insiden.status === 'Open' ? 'border-red-300' :
              insiden.status === 'Investigasi' ? 'border-amber-300' : 'border-emerald-300'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{JENIS_ICONS[insiden.jenis]}</span>
                <div>
                  <h3 className="font-semibold text-slate-800">{insiden.jenis}</h3>
                  <p className="text-xs text-slate-500">ID: {insiden.id}</p>
                </div>
              </div>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${STATUS_COLORS[insiden.status]}`}>
                {insiden.status}
              </span>
            </div>

            <p className="text-sm text-slate-600 mb-4">{insiden.deskripsi}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-slate-500">Rute</p>
                <p className="text-sm font-medium text-slate-800">{insiden.ruteId}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-slate-500">Pelapor</p>
                <p className="text-sm font-medium text-slate-800">{insiden.pelapor}</p>
              </div>
              <div className="col-span-1 sm:col-span-2 bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-slate-500">Waktu Lapor</p>
                <p className="text-sm font-medium text-slate-800">{insiden.tanggal}</p>
              </div>
            </div>

            {insiden.status === 'Open' && (
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-200 transition">
                  🔍 Investigasi
                </button>
                <button className="flex-1 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium hover:bg-emerald-200 transition">
                  ✓ Tutup Insiden
                </button>
              </div>
            )}
            {insiden.status === 'Investigasi' && (
              <button className="w-full px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium hover:bg-emerald-200 transition">
                ✓ Tutup Insiden
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Notification Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <p className="font-semibold text-amber-800">Mekanisme Pelaporan Wajib</p>
            <p className="text-sm text-amber-700 mt-1">
              Setiap insiden distribusi harus dilaporkan dalam waktu 12 jam setelah kejadian.
              Notifikasi akan dikirim otomatis ke:
            </p>
            <ul className="text-sm text-amber-700 mt-2 list-disc list-inside">
              <li>Pengawas Logistik</li>
              <li>Kepala SPPG</li>
              <li>Tim Yayasan (jika insiden serius)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}