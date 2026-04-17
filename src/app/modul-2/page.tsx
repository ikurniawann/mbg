'use client';

import Link from 'next/link';
import { dummyMenuHarian, dummyMenuMingguan, dummySRC } from '@/lib/dummy-data';
import { format } from 'date-fns';

const ALOGEN_LIST = ['Susu', 'Telur', 'Kacang', 'Gluten', 'Kedelai', 'Seafood', 'Wijen'];

const STATUS_STEPS = ['Draft', 'Review Gizi', 'Disetujui'];

const dummyAlergenMenu = {
  'Ikan Goreng + Capcay': ['Seafood'],
  'Ayam Goreng + Tumis Kangkung': [],
  'Telur Balado + Tahu Tempe': ['Kedelai'],
};

export default function Modul2Dashboard() {
  const menuToday = dummyMenuHarian.find(m => m.tanggal === '2026-04-17');
  const srcToday = menuToday?.src;

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Menu & Gizi</h1>
          <p className="text-sm text-slate-500">Minggu ke-16 · April 2026</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/modul-2/menu-mingguan"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            + Buat Menu Baru
          </Link>
          <Link
            href="/modul-2/src-card"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
          >
            + SRC Card Baru
          </Link>
        </div>
      </header>

      {/* Approval Workflow Tracker */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <h2 className="font-semibold text-slate-800 mb-4">Approval Workflow — Menu Hari Ini</h2>
        <div className="flex items-center gap-4">
          {STATUS_STEPS.map((step, idx) => {
            const isComplete = idx < 2;
            const isCurrent = idx === 2;
            return (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  isComplete ? 'bg-emerald-500 text-white' :
                  isCurrent ? 'bg-blue-500 text-white ring-4 ring-blue-200' :
                  'bg-gray-200 text-gray-400'
                }`}>
                  {isComplete ? '✓' : idx + 1}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-semibold ${isComplete ? 'text-emerald-700' : isCurrent ? 'text-blue-700' : 'text-gray-400'}`}>
                    {step}
                  </p>
                  {isComplete && <p className="text-xs text-emerald-500">Selesai</p>}
                  {isCurrent && <p className="text-xs text-blue-500">Menunggu</p>}
                </div>
                {idx < STATUS_STEPS.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${isComplete ? 'bg-emerald-400' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>
        {menuToday && (
          <div className="mt-4 p-3 bg-slate-50 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">Menu:</span>
              <span className="font-semibold text-slate-800">{menuToday.namaMenu}</span>
              {dummyAlergenMenu[menuToday.namaMenu as keyof typeof dummyAlergenMenu]?.map(a => (
                <span key={a} className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-medium">
                  ⚠️ {a}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Approved by:</span>
              <span className="font-medium text-slate-700">{menuToday.approvedBy}</span>
              <span>·</span>
              <span>{menuToday.approvedAt}</span>
            </div>
          </div>
        )}
      </div>

      {/* Stats & Gizi Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Menu Minggu Ini</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{dummyMenuMingguan.menus.length}</p>
          <p className="text-xs text-slate-400 mt-1">menu tersedia</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">SRC Card</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{dummySRC.length}</p>
          <p className="text-xs text-slate-400 mt-1">standard recipe</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Menu Disetujui</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">
            {dummyMenuHarian.filter(m => m.statusApproval === 'Disetujui').length}
          </p>
          <p className="text-xs text-slate-400 mt-1">dari {dummyMenuHarian.length} menu</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Total Porsi/Minggu</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">
            {dummyMenuHarian.length * 500}
          </p>
          <p className="text-xs text-slate-400 mt-1">porsi</p>
        </div>
      </div>

      {/* Gizi Summary */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">Ringkasan Gizi — Menu Hari Ini</h2>
          {srcToday ? (
            <div className="space-y-3">
              {[
                { label: 'Karbohidrat', value: srcToday.nutrisi.karbohidrat, max: 400, unit: 'g', color: 'bg-amber-400' },
                { label: 'Protein', value: srcToday.nutrisi.protein, max: 200, unit: 'g', color: 'bg-red-400' },
                { label: 'Lemak', value: srcToday.nutrisi.lemak, max: 100, unit: 'g', color: 'bg-blue-400' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="font-medium text-slate-800">{item.value}{item.unit}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className={`${item.color} h-3 rounded-full transition-all`}
                      style={{ width: `${Math.min((item.value / item.max) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-slate-500 mb-2">Vitamin:</p>
                <div className="flex gap-2 flex-wrap">
                  {srcToday.nutrisi.vitamin.map(v => (
                    <span key={v} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400">Tidak ada data menu hari ini</p>
          )}
        </div>

        {/* Alergen Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">7 Alergen Utama</h2>
          <div className="grid grid-cols-4 gap-2">
            {ALOGEN_LIST.map(alergen => {
              const usedIn = Object.entries(dummyAlergenMenu)
                .filter(([, alg]) => (alg as string[]).includes(alergen))
                .map(([menu]) => menu);

              return (
                <div
                  key={alergen}
                  className={`p-3 rounded-xl border-2 text-center ${
                    usedIn.length > 0
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <p className={`text-sm font-semibold ${usedIn.length > 0 ? 'text-red-700' : 'text-slate-400'}`}>
                    {alergen}
                  </p>
                  {usedIn.length > 0 && (
                    <p className="text-xs text-red-500 mt-1">di {usedIn.length} menu</p>
                  )}
                  {usedIn.length === 0 && (
                    <p className="text-xs text-slate-400 mt-1">Aman</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Mingguan */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800">Menu Mingguan</h2>
          <Link href="/modul-2/menu-mingguan" className="text-sm text-emerald-600 hover:underline">
            Edit menu →
          </Link>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map((hari, idx) => {
            const menu = dummyMenuHarian[idx];
            const alergen = menu ? (dummyAlergenMenu[menu.namaMenu as keyof typeof dummyAlergenMenu] || []) : [];
            return (
              <div
                key={hari}
                className={`rounded-xl p-4 border-2 ${
                  menu?.statusApproval === 'Disetujui'
                    ? 'border-emerald-300 bg-emerald-50'
                    : menu?.statusApproval === 'Review'
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase">{hari}</span>
                  {menu && (
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                      menu.statusApproval === 'Disetujui' ? 'bg-emerald-200 text-emerald-700' :
                      menu.statusApproval === 'Review' ? 'bg-blue-200 text-blue-700' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {menu.statusApproval}
                    </span>
                  )}
                </div>
                {menu ? (
                  <>
                    <p className="text-sm font-semibold text-slate-800">{menu.namaMenu}</p>
                    <p className="text-xs text-slate-500 mt-1">500 porsi</p>
                    {alergen.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {alergen.map(a => (
                          <span key={a} className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                            {a}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-slate-400">Belum ada menu</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SRC Cards Quick Access */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800">SRC Card Aktif</h2>
          <Link href="/modul-2/src-card" className="text-sm text-emerald-600 hover:underline">
            Lihat semua →
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {dummySRC.map(src => (
            <div key={src.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50/30 transition cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-800">{src.namaMenu}</p>
                  <p className="text-xs text-slate-500 mt-1">{src.porsi} porsi</p>
                </div>
                <span className="text-2xl">🍽️</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {src.alergen.map(a => (
                  <span key={a} className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                    ⚠️ {a}
                  </span>
                ))}
                {src.alergen.length === 0 && (
                  <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded">
                    ✓ No Alergen
                  </span>
                )}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="bg-amber-50 rounded-lg p-2">
                  <p className="text-xs text-amber-600">Karbo</p>
                  <p className="text-sm font-bold text-amber-700">{src.nutrisi.karbohidrat}g</p>
                </div>
                <div className="bg-red-50 rounded-lg p-2">
                  <p className="text-xs text-red-600">Protein</p>
                  <p className="text-sm font-bold text-red-700">{src.nutrisi.protein}g</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-2">
                  <p className="text-xs text-blue-600">Lemak</p>
                  <p className="text-sm font-bold text-blue-700">{src.nutrisi.lemak}g</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
