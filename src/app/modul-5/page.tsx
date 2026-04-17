'use client';

import Link from 'next/link';
import { dummyRuteDistribusi, dummyTandaTerima } from '@/lib/dummy-data';

const STATUS_COLORS: Record<string, string> = {
  'Belum Berangkat': 'bg-gray-100 text-gray-700 border-gray-200',
  'Dalam Perjalanan': 'bg-blue-100 text-blue-700 border-blue-200',
  'Terkirim': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Terlambat': 'bg-red-100 text-red-700 border-red-200',
};

const STATUS_ICONS: Record<string, string> = {
  'Belum Berangkat': '⏳',
  'Dalam Perjalanan': '🚛',
  'Terkirim': '✅',
  'Terlambat': '⚠️',
};

export default function Modul5Dashboard() {
  const rute = dummyRuteDistribusi;
  const tandaTerima = dummyTandaTerima;

  const totalBox = rute.reduce((sum, r) => sum + r.jumlahBox, 0);
  const terkirim = rute.filter(r => r.status === 'Terkirim').length;
  const terlambat = rute.filter(r => r.status === 'Terlambat').length;
  const dalamPerjalanan = rute.filter(r => r.status === 'Dalam Perjalanan').length;
  const belumBerangkat = rute.filter(r => r.status === 'Belum Berangkat').length;

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Distribusi & Logistik</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-slate-500">Selasa, 17 April 2026</p>
            <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded text-xs font-medium border border-teal-300">
              📦 Distribusi Hari Ini
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/modul-5/rute" className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition">
            🗺️ Rute Tracking
          </Link>
          <Link href="/modul-5/tanda-terima" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            📝 Tanda Terima
          </Link>
        </div>
      </header>

      {/* Alert for late deliveries */}
      {terlambat > 0 && (
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚨</span>
            <div>
              <p className="font-bold text-red-800">{terlambat} Pengiriman Terlambat!</p>
              <p className="text-sm text-red-600">
                {rute.filter(r => r.status === 'Terlambat').map(r => `${r.tujuan} (terlambat ${r.waktuTiba ? '+45 menit' : ''})`).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Total Rute</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{rute.length}</p>
          <p className="text-xs text-slate-400 mt-1">rute hari ini</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Total Box</p>
          <p className="text-3xl font-bold text-teal-600 mt-1">{totalBox}</p>
          <p className="text-xs text-slate-400 mt-1">box makanan</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Belum Berangkat</p>
          <p className="text-3xl font-bold text-gray-600 mt-1">{belumBerangkat}</p>
          <p className="text-xs text-slate-400 mt-1">rute</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Dalam Perjalanan</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{dalamPerjalanan}</p>
          <p className="text-xs text-slate-400 mt-1">rute</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Tanda Terima</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">{tandaTerima.length}</p>
          <p className="text-xs text-slate-400 mt-1">dokumen</p>
        </div>
      </div>

      {/* Rute Distribution Table */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800">Tracking Rute Distribusi Hari Ini</h2>
          <Link href="/modul-5/rute" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
            Lihat Semua →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-600">No</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Tujuan</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Petugas</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Box</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Jadwal</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {rute.map((r, idx) => (
                <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-slate-500">{idx + 1}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{r.tujuan}</td>
                  <td className="py-3 px-4 text-slate-600">{r.petugas}</td>
                  <td className="py-3 px-4 text-slate-600">{r.jumlahBox} box</td>
                  <td className="py-3 px-4 text-slate-600">
                    {r.jadwalBerangkat}
                    {r.waktuTiba && <span className="text-slate-400 ml-1">→ {r.waktuTiba}</span>}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${STATUS_COLORS[r.status] || 'bg-gray-100 text-gray-700'}`}>
                      {STATUS_ICONS[r.status] || '📦'} {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">Aksi Cepat</h2>
          <div className="space-y-3">
            <Link href="/modul-5/rute" className="flex items-center gap-3 p-4 bg-teal-50 rounded-xl hover:bg-teal-100 transition">
              <span className="text-2xl">🗺️</span>
              <div>
                <p className="font-semibold text-slate-800">Tracking Rute</p>
                <p className="text-xs text-slate-500">Pantau lokasi & ETA distribusi</p>
              </div>
            </Link>
            <Link href="/modul-5/tanda-terima" className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition">
              <span className="text-2xl">📝</span>
              <div>
                <p className="font-semibold text-slate-800">Tanda Terima</p>
                <p className="text-xs text-slate-500">Buat &upload bukti serah terima</p>
              </div>
            </Link>
            <Link href="/modul-5/insiden" className="flex items-center gap-3 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-semibold text-slate-800">Lapor Insiden</p>
                <p className="text-xs text-slate-500">Catat kerusakan, penolakan, keterlambatan</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">Tanda Terima Terbaru</h2>
          <div className="space-y-3">
            {tandaTerima.map((tt) => (
              <div key={tt.id} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  ✓
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-emerald-800">{tt.namaPenerima}</p>
                  <p className="text-xs text-emerald-600">
                    {tt.jumlahBoxDiterima}/{tt.jumlahBoxDikirim} box • {tt.kondisi}
                  </p>
                </div>
                <span className="text-xs text-slate-400">{tt.waktuTerima.split(' ')[1]}</span>
              </div>
            ))}
            {tandaTerima.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">Belum ada tanda terima hari ini</p>
            )}
          </div>
        </div>
      </div>

      {/* Distribution Progress Bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="font-semibold text-slate-800 mb-4">Progress Distribusi Hari Ini</h2>
        <div className="flex gap-2 h-24">
          {[
            { label: 'Belum\nBerangkat', count: belumBerangkat, color: 'bg-gray-400' },
            { label: 'Dalam\nPerjalanan', count: dalamPerjalanan, color: 'bg-blue-500' },
            { label: 'Terkirim\n(Tunda)', count: terkirim, color: 'bg-emerald-500' },
            { label: 'Terlambat', count: terlambat, color: 'bg-red-500' },
          ].map((item) => (
            <div key={item.label} className="flex-1 flex flex-col items-center gap-2">
              <div className={`w-full ${item.color} rounded-t-lg transition-all`} style={{ height: `${(item.count / rute.length) * 100}%`, minHeight: item.count > 0 ? '20px' : '4px' }} />
              <span className="text-sm font-bold text-slate-700">{item.count}</span>
              <span className="text-xs text-slate-500 text-center leading-tight">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-6">
          <span className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-3 h-3 bg-gray-400 rounded" /> Belum Berangkat
          </span>
          <span className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-3 h-3 bg-blue-500 rounded" /> Dalam Perjalanan
          </span>
          <span className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-3 h-3 bg-emerald-500 rounded" /> Terkirim
          </span>
          <span className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-3 h-3 bg-red-500 rounded" /> Terlambat
          </span>
        </div>
      </div>
    </div>
  );
}