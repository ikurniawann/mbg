'use client';

import { useState } from 'react';
import { dummyLPJ } from '@/lib/dummy-data';

const MONTH_NAMES = [
  '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const STATUS_CONFIG: Record<string, { badge: string; bg: string }> = {
  Draft: { badge: 'bg-gray-100 text-gray-700 border-gray-300', bg: 'bg-gray-50' },
  Review: { badge: 'bg-amber-100 text-amber-700 border-amber-300', bg: 'bg-amber-50' },
  Valid: { badge: 'bg-blue-100 text-blue-700 border-blue-300', bg: 'bg-blue-50' },
  Final: { badge: 'bg-emerald-100 text-emerald-700 border-emerald-300', bg: 'bg-emerald-50' },
};

const ROLE_LABELS: Record<string, string> = {
  kepala_sppg: 'Kepala SPPG',
  ahli_gizi: 'Ahli Gizi',
  akuntan: 'Akuntan',
  pengawas_logistik: 'Pengawas Logistik',
  tim_yayasan: 'Tim Yayasan',
};

export default function LPJPage() {
  const lpj = dummyLPJ;
  const [selectedTab, setSelectedTab] = useState<'ringkasan' | 'menu' | 'gizi' | 'approval'>('ringkasan');
  const statusCfg = STATUS_CONFIG[lpj.status] || STATUS_CONFIG.Draft;

  const TABS = [
    { id: 'ringkasan', label: 'Ringkasan', icon: '📋' },
    { id: 'menu', label: 'Menu List', icon: '🍽️' },
    { id: 'gizi', label: 'Gizi', icon: '🥗' },
    { id: 'approval', label: 'Approval', icon: '🔄' },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            LPJ Bulanan — {MONTH_NAMES[lpj.bulan]} {lpj.tahun}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Laporan Pertanggungjawaban Bulanan Program Makan Bergizi Gratis
          </p>
        </div>
        <div className="flex gap-3">
          <span className={`px-3 py-1.5 rounded-full text-sm font-bold border ${statusCfg.badge}`}>
            {lpj.status}
          </span>
          <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition">
            🖨️ Export PDF
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 pb-4">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              selectedTab === tab.id
                ? 'bg-violet-600 text-white'
                : 'bg-white text-slate-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* RINGKASAN TAB */}
      {selectedTab === 'ringkasan' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <p className="text-sm text-slate-500">Total Porsi</p>
              <p className="text-4xl font-black text-violet-600 mt-1">
                {lpj.ringkasan.totalPorsi.toLocaleString('id-ID')}
              </p>
              <p className="text-xs text-slate-400 mt-2">porsi terealisasi bulan ini</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <p className="text-sm text-slate-500">Total Bahan</p>
              <p className="text-4xl font-black text-blue-600 mt-1">
                {lpj.ringkasan.totalBahan.toLocaleString('id-ID')}
              </p>
              <p className="text-xs text-slate-400 mt-2">item bahan digunakan</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <p className="text-sm text-slate-500">Total Distribusi</p>
              <p className="text-4xl font-black text-emerald-600 mt-1">
                {lpj.ringkasan.totalDistribusi.toLocaleString('id-ID')}
              </p>
              <p className="text-xs text-slate-400 mt-2">rute distribusi dilakukan</p>
            </div>
          </div>

          {/* Keuangan */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="font-semibold text-slate-800 mb-4">💰 Ringkasan Keuangan</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-violet-50 rounded-xl p-4 border border-violet-200">
                <p className="text-sm text-violet-600 font-medium">Bantuan MBG</p>
                <p className="text-2xl font-black text-violet-700 mt-1">
                  Rp{(lpj.keuangan.bantuan / 1000000).toFixed(0)}jt
                </p>
                <p className="text-xs text-violet-500 mt-1">dana bantuan pemerintah</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-sm text-blue-600 font-medium">Mandiri</p>
                <p className="text-2xl font-black text-blue-700 mt-1">
                  Rp{(lpj.keuangan.mandiri / 1000000).toFixed(0)}jt
                </p>
                <p className="text-xs text-blue-500 mt-1">dana swadaya</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <p className="text-sm text-emerald-600 font-medium">Total</p>
                <p className="text-2xl font-black text-emerald-700 mt-1">
                  Rp{(lpj.keuangan.total / 1000000).toFixed(0)}jt
                </p>
                <p className="text-xs text-emerald-500 mt-1">total dana terealisasi</p>
              </div>
            </div>
          </div>

          {/* Dokumentasi */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="font-semibold text-slate-800 mb-4">📸 Dokumentasi</h2>
            <div className="grid grid-cols-3 gap-4">
              {lpj.dokumentasi.map((doc, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center text-xl">
                      {doc.kategori === 'Produksi' ? '🍳' : doc.kategori === 'Packing' ? '📦' : '🚚'}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700">{doc.kategori}</p>
                      <p className="text-xs text-slate-500">{doc.foto.length} foto</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {doc.foto.map((f, fidx) => (
                      <div key={fidx} className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-20 flex items-center justify-center text-xs text-gray-500">
                        📷 {f.split('/').pop()}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MENU TAB */}
      {selectedTab === 'menu' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">🍽️ Daftar Menu Bulan Ini</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Tanggal</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Nama Menu</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Disetujui Oleh</th>
                </tr>
              </thead>
              <tbody>
                {lpj.menuList.map((menu, idx) => {
                  const statusColor = menu.statusApproval === 'Disetujui'
                    ? 'bg-emerald-100 text-emerald-700'
                    : menu.statusApproval === 'Review'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-gray-100 text-gray-700';
                  return (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-slate-700">{menu.tanggal}</td>
                      <td className="py-3 px-4 font-medium text-slate-800">{menu.namaMenu}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColor}`}>
                          {menu.statusApproval}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{menu.approvedBy || '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* GIZI TAB */}
      {selectedTab === 'gizi' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="font-semibold text-slate-800 mb-4">🥗 Ringkasan Gizi Rata-rata per Porsi</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-violet-50 rounded-xl p-5 border border-violet-200 text-center">
                <p className="text-xs text-violet-600 font-medium mb-3">Karbohidrat</p>
                <p className="text-4xl font-black text-violet-700">{lpj.ringkasan.rataRataGizi.karbohidrat}g</p>
                <p className="text-xs text-violet-500 mt-2">per porsi</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200 text-center">
                <p className="text-xs text-blue-600 font-medium mb-3">Protein</p>
                <p className="text-4xl font-black text-blue-700">{lpj.ringkasan.rataRataGizi.protein}g</p>
                <p className="text-xs text-blue-500 mt-2">per porsi</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200 text-center">
                <p className="text-xs text-emerald-600 font-medium mb-3">Lemak</p>
                <p className="text-4xl font-black text-emerald-700">{lpj.ringkasan.rataRataGizi.lemak}g</p>
                <p className="text-xs text-emerald-500 mt-2">per porsi</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 text-center">
                <p className="text-xs text-amber-600 font-medium mb-3">Vitamin</p>
                <p className="text-4xl font-black text-amber-700">{lpj.ringkasan.rataRataGizi.vitamin.length}</p>
                <p className="text-xs text-amber-500 mt-2">jenis vitamin</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="font-semibold text-slate-800 mb-4">💊 Detail Vitamin</h2>
            <div className="flex flex-wrap gap-2">
              {lpj.ringkasan.rataRataGizi.vitamin.map((v, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-violet-100 text-violet-700 rounded-full text-sm font-medium border border-violet-300">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* APPROVAL TAB */}
      {selectedTab === 'approval' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-6">🔄 Alur Approval LPJ</h2>
          <div className="space-y-4">
            {lpj.approvalFlow.map((step, idx) => {
              const isLast = idx === lpj.approvalFlow.length - 1;
              return (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                      step.status === 'Approved'
                        ? 'bg-emerald-500 text-white'
                        : step.status === 'Rejected'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-300 text-white'
                    }`}>
                      {step.status === 'Approved' ? '✓' : step.status === 'Rejected' ? '✗' : idx + 1}
                    </div>
                    {!isLast && <div className="w-0.5 h-12 bg-gray-300" />}
                  </div>
                  <div className={`flex-1 rounded-xl p-4 border-2 mb-2 ${
                    step.status === 'Approved'
                      ? 'bg-emerald-50 border-emerald-300'
                      : step.status === 'Rejected'
                      ? 'bg-red-50 border-red-300'
                      : 'bg-gray-50 border-gray-300'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800">
                          {ROLE_LABELS[step.role] || step.role}
                        </p>
                        <p className={`text-sm mt-1 ${
                          step.status === 'Approved' ? 'text-emerald-600' :
                          step.status === 'Rejected' ? 'text-red-600' : 'text-slate-500'
                        }`}>
                          {step.status === 'Approved'
                            ? `✓ Disetujui oleh ${step.approvedBy}`
                            : step.status === 'Rejected'
                            ? '✗ Ditolak'
                            : '⏳ Menunggu persetujuan'}
                        </p>
                        {step.approvedAt && (
                          <p className="text-xs text-slate-400 mt-1">Waktu: {step.approvedAt}</p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        step.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-700'
                          : step.status === 'Rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {step.status}
                      </span>
                    </div>
                    {step.status === 'Pending' && (
                      <div className="mt-3 flex gap-2">
                        <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700">
                          ✓ Setujui
                        </button>
                        <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700">
                          ✗ Tolak
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}