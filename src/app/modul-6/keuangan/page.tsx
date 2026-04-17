'use client';

import { useState } from 'react';
import { dummyLPJ } from '@/lib/dummy-data';

const MONTH_NAMES = [
  '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export default function KeuanganPage() {
  const lpj = dummyLPJ;
  const [selectedBulan, setSelectedBulan] = useState(lpj.bulan);

  const bantuanPct = (lpj.keuangan.bantuan / lpj.keuangan.total) * 100;
  const mandiriPct = (lpj.keuangan.mandiri / lpj.keuangan.total) * 100;

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Ringkasan Keuangan</h1>
          <p className="text-sm text-slate-500 mt-1">
            Laporan keuangan bulan {MONTH_NAMES[lpj.bulan]} {lpj.tahun} — Program Makan Bergizi Gratis
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition">
            📤 Export Excel
          </button>
          <button className="px-4 py-2 bg-gray-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition border border-gray-300">
            🖨️ Cetak Laporan
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-violet-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-violet-200">Total Bantuan MBG</span>
            <span className="text-2xl">🏛️</span>
          </div>
          <p className="text-3xl font-black">
            Rp{(lpj.keuangan.bantuan / 1000000).toFixed(1)}jt
          </p>
          <p className="text-xs text-violet-200 mt-2">Dana bantuan pemerintah (APBN)</p>
        </div>
        <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-blue-200">Total Mandiri</span>
            <span className="text-2xl">🤝</span>
          </div>
          <p className="text-3xl font-black">
            Rp{(lpj.keuangan.mandiri / 1000000).toFixed(1)}jt
          </p>
          <p className="text-xs text-blue-200 mt-2">Dana swadaya & partisipasi</p>
        </div>
        <div className="bg-emerald-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-emerald-200">Total Keseluruhan</span>
            <span className="text-2xl">💰</span>
          </div>
          <p className="text-3xl font-black">
            Rp{(lpj.keuangan.total / 1000000).toFixed(1)}jt
          </p>
          <p className="text-xs text-emerald-200 mt-2">Total dana terealisasi bulan ini</p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Pie Chart Representation */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">📊 Proporsi Sumber Dana</h2>
          <div className="flex items-center gap-6">
            <div className="relative w-40 h-40 flex-shrink-0">
              {/* Simple pie representation */}
              <div className="w-40 h-40 rounded-full overflow-hidden relative"
                style={{ background: `conic-gradient(#7c3aed 0% ${bantuanPct}%, #3b82f6 ${bantuanPct}%% 100%)` }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                    <p className="text-xs font-bold text-slate-600">Total</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-violet-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-700">Bantuan MBG (APBN)</p>
                  <p className="text-xs text-slate-500">{bantuanPct.toFixed(1)}% dari total</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-700">Mandiri</p>
                  <p className="text-xs text-slate-500">{mandiriPct.toFixed(1)}% dari total</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">📋 Detail PerSumber</h2>
          <div className="space-y-3">
            <div className="p-4 bg-violet-50 rounded-xl border border-violet-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-violet-800">Bantuan MBG (APBN)</p>
                  <p className="text-xs text-violet-600 mt-1">Dana bantuan pemerintah pusat</p>
                </div>
                <p className="text-xl font-black text-violet-700">
                  Rp{(lpj.keuangan.bantuan / 1000000).toFixed(0)}jt
                </p>
              </div>
              <div className="mt-3 bg-violet-200 rounded-full h-2">
                <div className="bg-violet-600 h-2 rounded-full" style={{ width: `${bantuanPct}%` }} />
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-blue-800">Swadaya Mandiri</p>
                  <p className="text-xs text-blue-600 mt-1">Dana partisipasi & sumbangan</p>
                </div>
                <p className="text-xl font-black text-blue-700">
                  Rp{(lpj.keuangan.mandiri / 1000000).toFixed(0)}jt
                </p>
              </div>
              <div className="mt-3 bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${mandiriPct}%` }} />
              </div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-emerald-800">Total</p>
                  <p className="text-xs text-emerald-600 mt-1">Jumlah keseluruhan</p>
                </div>
                <p className="text-xl font-black text-emerald-700">
                  Rp{(lpj.keuangan.total / 1000000).toFixed(0)}jt
                </p>
              </div>
              <div className="mt-3 bg-emerald-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost per Porsi */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <h2 className="font-semibold text-slate-800 mb-4">🍽️ Analisis Cost per Porsi</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs text-slate-500 font-medium mb-2">Total Porsi</p>
            <p className="text-2xl font-black text-slate-700">
              {lpj.ringkasan.totalPorsi.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs text-slate-500 font-medium mb-2">Total Biaya</p>
            <p className="text-2xl font-black text-slate-700">
              Rp{(lpj.keuangan.total / 1000).toFixed(0)}rb
            </p>
          </div>
          <div className="text-center p-4 bg-violet-50 rounded-xl border border-violet-200">
            <p className="text-xs text-violet-500 font-medium mb-2">Cost per Porsi</p>
            <p className="text-2xl font-black text-violet-700">
              Rp{Math.round(lpj.keuangan.total / lpj.ringkasan.totalPorsi).toLocaleString('id-ID')}
            </p>
          </div>
          <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="text-xs text-emerald-500 font-medium mb-2">Efisiensi</p>
            <p className="text-2xl font-black text-emerald-700">
              {(lpj.ringkasan.totalPorsi / lpj.keuangan.total * 1000000).toFixed(1)}
            </p>
            <p className="text-xs text-emerald-500">porsi per juta</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="text-sm font-semibold text-amber-800">Catatan</p>
            <ul className="text-xs text-amber-700 mt-2 space-y-1 list-disc list-inside">
              <li>Laporan keuangan ini merupakan ringkasan. Untuk laporan detail, silakan hubungi Akuntan.</li>
              <li>Semua transaksi harus didukung bukti dokumentasi yang lengkap.</li>
              <li>LPJ Keuangan akan diverifikasi oleh Tim Yayasan sebelum final.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}