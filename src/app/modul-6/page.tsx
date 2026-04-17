'use client';

import Link from 'next/link';
import { dummyLPJ } from '@/lib/dummy-data';

const STATUS_CONFIG: Record<string, { bg: string; text: string; border: string }> = {
  Draft: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-300' },
  Review: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300' },
  Valid: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300' },
  Final: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300' },
};

const ROLE_LABELS: Record<string, string> = {
  kepala_sppg: 'Kepala SPPG',
  ahli_gizi: 'Ahli Gizi',
  akuntan: 'Akuntan',
  pengawas_logistik: 'Pengawas Logistik',
  tim_yayasan: 'Tim Yayasan',
};

const MONTH_NAMES = [
  '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export default function Modul6Dashboard() {
  const lpj = dummyLPJ;
  const statusCfg = STATUS_CONFIG[lpj.status] || STATUS_CONFIG.Draft;
  const approvedCount = lpj.approvalFlow.filter(a => a.status === 'Approved').length;

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Dokumentasi & LPJ</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-slate-500">Selasa, 17 April 2026</p>
            <span className="px-2 py-0.5 bg-violet-100 text-violet-700 rounded text-xs font-medium border border-violet-300">
              📋 LPJ MBG — Bulan {MONTH_NAMES[lpj.bulan]} {lpj.tahun}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/modul-6/lpj" className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition">
            📑 Lihat LPJ
          </Link>
          <Link href="/modul-6/dokumentasi" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            📸 Dokumentasi
          </Link>
          <Link href="/modul-6/keuangan" className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition">
            💰 Keuangan
          </Link>
        </div>
      </header>

      {/* Status Banner */}
      <div className={`rounded-xl p-5 border-2 mb-6 ${statusCfg.bg} ${statusCfg.border}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-slate-800">
              LPJ {MONTH_NAMES[lpj.bulan]} {lpj.tahun}
            </p>
            <p className="text-sm text-slate-600 mt-1">
              Status saat ini: <span className={`font-bold ${statusCfg.text}`}>{lpj.status}</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {approvedCount}/{lpj.approvalFlow.length} approval terselesaikan
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Periode</p>
            <p className="text-2xl font-black text-slate-800">{MONTH_NAMES[lpj.bulan]}</p>
            <p className="text-sm font-bold text-slate-600">{lpj.tahun}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Total Porsi</p>
          <p className="text-3xl font-bold text-violet-600 mt-1">
            {lpj.ringkasan.totalPorsi.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-slate-400 mt-1">porsi dalam bulan ini</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Total Bahan</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">
            {lpj.ringkasan.totalBahan.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-slate-400 mt-1">item bahan digunakan</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Total Distribusi</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">
            {lpj.ringkasan.totalDistribusi.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-slate-400 mt-1">rute distribusi</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Total Keuangan</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">
            Rp{(lpj.keuangan.total / 1000000).toFixed(0)}jt
          </p>
          <p className="text-xs text-slate-400 mt-1">dana terealisasi</p>
        </div>
      </div>

      {/* Ringkasan Gizi */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <h2 className="font-semibold text-slate-800 mb-4">📊 Ringkasan Gizi Rata-rata per Porsi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-violet-50 rounded-xl p-4 border border-violet-200 text-center">
            <p className="text-xs text-violet-600 font-medium mb-2">Karbohidrat</p>
            <p className="text-2xl font-black text-violet-700">
              {lpj.ringkasan.rataRataGizi.karbohidrat}
            </p>
            <p className="text-xs text-violet-500 mt-1">gram</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-center">
            <p className="text-xs text-blue-600 font-medium mb-2">Protein</p>
            <p className="text-2xl font-black text-blue-700">
              {lpj.ringkasan.rataRataGizi.protein}
            </p>
            <p className="text-xs text-blue-500 mt-1">gram</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-center">
            <p className="text-xs text-emerald-600 font-medium mb-2">Lemak</p>
            <p className="text-2xl font-black text-emerald-700">
              {lpj.ringkasan.rataRataGizi.lemak}
            </p>
            <p className="text-xs text-emerald-500 mt-1">gram</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-center">
            <p className="text-xs text-amber-600 font-medium mb-2">Vitamin</p>
            <p className="text-2xl font-black text-amber-700">
              {lpj.ringkasan.rataRataGizi.vitamin.length}
            </p>
            <p className="text-xs text-amber-500 mt-1">jenis vitamin</p>
          </div>
        </div>
      </div>

      {/* Approval Flow */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <h2 className="font-semibold text-slate-800 mb-4">🔄 Alur Approval LPJ</h2>
        <div className="flex items-center gap-3">
          {lpj.approvalFlow.map((step, idx) => {
            const isLast = idx === lpj.approvalFlow.length - 1;
            return (
              <div key={idx} className="flex items-center flex-1">
                <div className={`flex-1 rounded-xl p-4 border-2 text-center ${
                  step.status === 'Approved'
                    ? 'bg-emerald-50 border-emerald-300'
                    : step.status === 'Rejected'
                    ? 'bg-red-50 border-red-300'
                    : 'bg-gray-50 border-gray-300'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold ${
                    step.status === 'Approved'
                      ? 'bg-emerald-500 text-white'
                      : step.status === 'Rejected'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-400 text-white'
                  }`}>
                    {step.status === 'Approved' ? '✓' : step.status === 'Rejected' ? '✗' : idx + 1}
                  </div>
                  <p className="text-sm font-semibold text-slate-700">
                    {ROLE_LABELS[step.role] || step.role}
                  </p>
                  <p className={`text-xs mt-1 ${
                    step.status === 'Approved' ? 'text-emerald-600' :
                    step.status === 'Rejected' ? 'text-red-600' : 'text-slate-500'
                  }`}>
                    {step.status === 'Approved'
                      ? `Disetujui ${step.approvedBy}`
                      : step.status === 'Rejected'
                      ? 'Ditolak'
                      : 'Menunggu'}
                  </p>
                  {step.approvedAt && (
                    <p className="text-xs text-slate-400 mt-0.5">{step.approvedAt}</p>
                  )}
                </div>
                {!isLast && (
                  <div className="w-8 flex items-center justify-center text-slate-400">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">Aksi Cepat</h2>
          <div className="space-y-3">
            <Link href="/modul-6/lpj" className="flex items-center gap-3 p-4 bg-violet-50 rounded-xl hover:bg-violet-100 transition">
              <span className="text-2xl">📑</span>
              <div>
                <p className="font-semibold text-slate-800">LPJ Bulanan</p>
                <p className="text-xs text-slate-500">Lihat & generate laporan</p>
              </div>
            </Link>
            <Link href="/modul-6/dokumentasi" className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition">
              <span className="text-2xl">📸</span>
              <div>
                <p className="font-semibold text-slate-800">Dokumentasi</p>
                <p className="text-xs text-slate-500">Foto produksi, packing, distribusi</p>
              </div>
            </Link>
            <Link href="/modul-6/keuangan" className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition">
              <span className="text-2xl">💰</span>
              <div>
                <p className="font-semibold text-slate-800">Ringkasan Keuangan</p>
                <p className="text-xs text-slate-500">Bantuan MBG & Mandiri</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Dokumentasi Categories */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">Kategori Dokumentasi</h2>
          <div className="space-y-3">
            {lpj.dokumentasi.map((doc, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center text-xl">
                  {doc.kategori === 'Produksi' ? '🍳' : doc.kategori === 'Packing' ? '📦' : '🚚'}
                </div>
                <div>
                  <p className="font-semibold text-slate-700">{doc.kategori}</p>
                  <p className="text-xs text-slate-500">{doc.foto.length} foto</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">Menu Bulan Ini</h2>
          <div className="space-y-2">
            {lpj.menuList.map((menu, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm font-medium text-slate-700">{menu.namaMenu}</p>
                <p className="text-xs text-slate-500">{menu.tanggal}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}