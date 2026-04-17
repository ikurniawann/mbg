'use client';

import Link from 'next/link';
import { dummyBAPB, dummyBahan } from '@/lib/dummy-data';
import { format, differenceInDays } from 'date-fns';
import { id } from 'date-fns/locale';

const ALERTS_COUNT = 3;

export default function Modul1Dashboard() {
  const today = new Date();
  const bahanMauExp = dummyBahan.filter(b => {
    const daysUntil = differenceInDays(new Date(b.tanggalExp), today);
    return daysUntil >= 0 && daysUntil <= 3;
  });

  const stats = {
    totalBAPB: dummyBAPB.length,
    totalBahan: dummyBahan.length,
    coldRoom: dummyBahan.filter(b => b.lokasi === 'Cold Room').length,
    freezer: dummyBahan.filter(b => b.lokasi === 'Freezer').length,
    rakKering: dummyBahan.filter(b => b.lokasi === 'Rak Kering').length,
    bantuanMBG: dummyBahan.filter(b => b.jenis === 'Bantuan MBG').length,
    mandiri: dummyBahan.filter(b => b.jenis === 'Mandiri').length,
  };

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Penerimaan & Inventori</h1>
          <p className="text-sm text-slate-500">Selasa, 17 April 2026</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/modul-1/bapb"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
          >
            + Form BAPB Baru
          </Link>
        </div>
      </header>

      {/* Alert */}
      {bahanMauExp.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <span className="text-amber-500 text-xl mt-0.5">⚠️</span>
          <div>
            <p className="font-semibold text-amber-800">
              {bahanMauExp.length} Bahan Akan Kadaluarsa dalam 3 Hari
            </p>
            <div className="mt-1 flex flex-wrap gap-2">
              {bahanMauExp.map(b => (
                <span key={b.id} className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                  {b.nama} ({b.tanggalExp})
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total BAPB</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{stats.totalBAPB}</p>
              <p className="text-xs text-slate-400 mt-1">dokumen</p>
            </div>
            <span className="text-3xl">📝</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Item Bahan</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{stats.totalBahan}</p>
              <p className="text-xs text-slate-400 mt-1">jenis bahan</p>
            </div>
            <span className="text-3xl">📦</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Bahan Bantuan MBG</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{stats.bantuanMBG}</p>
              <p className="text-xs text-slate-400 mt-1">item</p>
            </div>
            <span className="text-3xl">🔵</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Bahan Mandiri</p>
              <p className="text-3xl font-bold text-emerald-600 mt-1">{stats.mandiri}</p>
              <p className="text-xs text-slate-400 mt-1">item</p>
            </div>
            <span className="text-3xl">🟢</span>
          </div>
        </div>
      </div>

      {/* Lokasi Penyimpanan */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <h2 className="font-semibold text-slate-800 mb-4">Distribusi Lokasi Penyimpanan</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Cold Room', count: stats.coldRoom, color: 'bg-blue-500', icon: '❄️' },
            { label: 'Freezer', count: stats.freezer, color: 'bg-cyan-500', icon: '🧊' },
            { label: 'Rak Kering', count: stats.rakKering, color: 'bg-amber-500', icon: '📪' },
          ].map(loc => (
            <div key={loc.label} className={`${loc.color} rounded-xl p-4 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">{loc.label}</p>
                  <p className="text-2xl font-bold mt-1">{loc.count}</p>
                  <p className="text-xs opacity-80">item tersimpan</p>
                </div>
                <span className="text-3xl">{loc.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Recent BAPB */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">BAPB Terbaru</h2>
            <Link href="/modul-1/bapb" className="text-sm text-emerald-600 hover:underline">
              Lihat semua →
            </Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b">
                <th className="pb-2 font-medium">No. BAPB</th>
                <th className="pb-2 font-medium">Tanggal</th>
                <th className="pb-2 font-medium">Pemasok</th>
                <th className="pb-2 font-medium">Jumlah Item</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyBAPB.slice(0, 5).map(bapb => (
                <tr key={bapb.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-3 text-sm font-mono text-slate-700">{bapb.nomor}</td>
                  <td className="py-3 text-sm text-slate-600">{bapb.tanggal}</td>
                  <td className="py-3 text-sm text-slate-600">{bapb.pemasok}</td>
                  <td className="py-3 text-sm text-slate-600">{bapb.bahan.length} item</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      bapb.status === 'Layak' ? 'bg-emerald-100 text-emerald-700' :
                      bapb.status === 'Rusak Ringan' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {bapb.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">Aksi Cepat</h2>
          <div className="space-y-3">
            <Link
              href="/modul-1/bapb"
              className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition"
            >
              <span className="text-xl">📝</span>
              <div>
                <p className="text-sm font-medium text-slate-800">BAPB Baru</p>
                <p className="text-xs text-slate-500">Terima bahan baru</p>
              </div>
            </Link>
            <Link
              href="/modul-1/label"
              className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
            >
              <span className="text-xl">🏷️</span>
              <div>
                <p className="text-sm font-medium text-slate-800">Generate Label</p>
                <p className="text-xs text-slate-500">Cetak label bahan</p>
              </div>
            </Link>
            <Link
              href="/modul-1/stok"
              className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
            >
              <span className="text-xl">📦</span>
              <div>
                <p className="text-sm font-medium text-slate-800">Cek Stok</p>
                <p className="text-xs text-slate-500">Lihat stok bahan</p>
              </div>
            </Link>
            <Link
              href="/modul-1/audit"
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <span className="text-xl">📋</span>
              <div>
                <p className="text-sm font-medium text-slate-800">Audit Trail</p>
                <p className="text-xs text-slate-500">Riwayat perubahan</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Stok Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800">Daftar Stok Bahan</h2>
          <Link href="/modul-1/stok" className="text-sm text-emerald-600 hover:underline">
            Selengkapnya →
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {dummyBahan.slice(0, 6).map(bahan => (
            <div
              key={bahan.id}
              className={`p-4 rounded-xl border-2 ${
                bahan.jenis === 'Bantuan MBG'
                  ? 'border-blue-300 bg-blue-50'
                  : 'border-emerald-300 bg-emerald-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-800">{bahan.nama}</p>
                  <p className="text-sm text-slate-600 mt-1">
                    {bahan.jumlah} {bahan.satuan}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      bahan.jenis === 'Bantuan MBG'
                        ? 'bg-blue-200 text-blue-700'
                        : 'bg-emerald-200 text-emerald-700'
                    }`}>
                      {bahan.jenis}
                    </span>
                    <span className="text-xs text-slate-500">{bahan.lokasi}</span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  bahan.kondisi === 'Layak' ? 'bg-emerald-100 text-emerald-700' :
                  bahan.kondisi === 'Rusak Ringan' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {bahan.kondisi}
                </span>
              </div>
              <div className="mt-2 text-xs text-slate-400">
                Exp: {bahan.tanggalExp}
                {bahan.suhu !== undefined && (
                  <span className="ml-2">· {bahan.suhu}°C</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
