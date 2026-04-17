'use client';

import { dummyLPJ } from '@/lib/dummy-data';

const MONTH_NAMES = [
  '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export default function GiziPage() {
  const lpj = dummyLPJ;
  const gizi = lpj.ringkasan.rataRataGizi;

  const CARBS_Adequate = gizi.karbohidrat >= 300 && gizi.karbohidrat <= 400;
  const PROTEIN_Adequate = gizi.protein >= 150 && gizi.protein <= 200;
  const LEMAK_Adequate = gizi.lemak >= 60 && gizi.lemak <= 100;

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Ringkasan Gizi</h1>
          <p className="text-sm text-slate-700 mt-1">
            Reportasi Gizi Bulanan — {MONTH_NAMES[lpj.bulan]} {lpj.tahun}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition">
            🖨️ Export PDF
          </button>
          <button className="px-4 py-2 bg-gray-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition border border-gray-300">
            📊 Export Excel
          </button>
        </div>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className={`rounded-xl p-5 border-2 ${
          CARBS_Adequate ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-slate-700">Karbohidrat</p>
            <span className="text-2xl">🍚</span>
          </div>
          <p className={`text-4xl font-black ${
            CARBS_Adequate ? 'text-emerald-700' : 'text-amber-700'
          }`}>
            {gizi.karbohidrat}g
          </p>
          <p className="text-xs mt-2 text-slate-700">
            {CARBS_Adequate ? '✓ Dalam standar (300-400g)' : '⚠️ Di luar standar'}
          </p>
        </div>

        <div className={`rounded-xl p-5 border-2 ${
          PROTEIN_Adequate ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-slate-700">Protein</p>
            <span className="text-2xl">🥩</span>
          </div>
          <p className={`text-4xl font-black ${
            PROTEIN_Adequate ? 'text-emerald-700' : 'text-amber-700'
          }`}>
            {gizi.protein}g
          </p>
          <p className="text-xs mt-2 text-slate-700">
            {PROTEIN_Adequate ? '✓ Dalam standar (150-200g)' : '⚠️ Di luar standar'}
          </p>
        </div>

        <div className={`rounded-xl p-5 border-2 ${
          LEMAK_Adequate ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-slate-700">Lemak</p>
            <span className="text-2xl">🫒</span>
          </div>
          <p className={`text-4xl font-black ${
            LEMAK_Adequate ? 'text-emerald-700' : 'text-amber-700'
          }`}>
            {gizi.lemak}g
          </p>
          <p className="text-xs mt-2 text-slate-700">
            {LEMAK_Adequate ? '✓ Dalam standar (60-100g)' : '⚠️ Di luar standar'}
          </p>
        </div>

        <div className="bg-violet-50 rounded-xl p-5 border-2 border-violet-300">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-slate-700">Total Porsi</p>
            <span className="text-2xl">🍽️</span>
          </div>
          <p className="text-4xl font-black text-violet-700">
            {lpj.ringkasan.totalPorsi.toLocaleString('id-ID')}
          </p>
          <p className="text-xs mt-2 text-slate-700">porsi bulan ini</p>
        </div>
      </div>

      {/* Gizi Detail Table */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <h2 className="font-semibold text-slate-800 mb-4">📊 Detail Nutrisi per Porsi</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Nutrisi</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Jumlah</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Satuan</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Standar AKG</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-slate-700">Karbohidrat</td>
                <td className="py-3 px-4 text-slate-800">{gizi.karbohidrat}</td>
                <td className="py-3 px-4 text-slate-600">gram</td>
                <td className="py-3 px-4 text-slate-600">300-400 g</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    CARBS_Adequate
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {CARBS_Adequate ? '✓ Memenuhi' : '⚠️ Perhatian'}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-slate-700">Protein</td>
                <td className="py-3 px-4 text-slate-800">{gizi.protein}</td>
                <td className="py-3 px-4 text-slate-600">gram</td>
                <td className="py-3 px-4 text-slate-600">150-200 g</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    PROTEIN_Adequate
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {PROTEIN_Adequate ? '✓ Memenuhi' : '⚠️ Perhatian'}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-slate-700">Lemak</td>
                <td className="py-3 px-4 text-slate-800">{gizi.lemak}</td>
                <td className="py-3 px-4 text-slate-600">gram</td>
                <td className="py-3 px-4 text-slate-600">60-100 g</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    LEMAK_Adequate
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {LEMAK_Adequate ? '✓ Memenuhi' : '⚠️ Perhatian'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Vitamin Detail */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <h2 className="font-semibold text-slate-800 mb-4">💊 Vitamin yang Terdapat dalam Menu</h2>
        <div className="flex flex-wrap gap-3">
          {gizi.vitamin.map((v, idx) => (
            <div key={idx} className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold border border-violet-300">
              💊 {v}
            </div>
          ))}
        </div>
      </div>

      {/* Menu List */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="font-semibold text-slate-800 mb-4">🍽️ Menu yang Telah Disajikan</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Tanggal</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Nama Menu</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {lpj.menuList.map((menu, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-slate-700">{menu.tanggal}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{menu.namaMenu}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                      ✓ {menu.statusApproval}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}