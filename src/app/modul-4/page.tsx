'use client';

import Link from 'next/link';
import { dummyMonitoringSuhu, dummyChecklistSanitasi } from '@/lib/dummy-data';

const CCP_LABELS: Record<string, { min: number; max: number }> = {
  'Penerimaan Beku': { min: -25, max: -15 },
  'Cold Storage': { min: 0, max: 5 },
  'Cold Room': { min: 0, max: 5 },
  'Cold Room #2': { min: 0, max: 5 },
  'Memasak': { min: 75, max: 85 },
  'Hot Holding': { min: 60, max: 70 },
  'Distribusi': { min: 55, max: 65 },
};

export default function Modul4Dashboard() {
  const suhu = dummyMonitoringSuhu;
  const sanitasi = dummyChecklistSanitasi;

  const alertCCPs = suhu.ccps.filter(c => c.status === 'ALERT');
  const completedSanit = sanitasi.item.filter(i => i.checked).length;

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Food Safety & HACCP</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-slate-700">Selasa, 17 April 2026</p>
            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium border border-red-300">
              🇮🇩 SK BGN No. 244/2025 & 63421/2026
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/modul-4/suhu" className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">
            🌡️ Monitoring Suhu
          </Link>
          <Link href="/modul-4/sanitasi" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            🧹 Sanitasi
          </Link>
        </div>
      </header>

      {/* Alert Banner */}
      {alertCCPs.length > 0 && (
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚨</span>
            <div>
              <p className="font-bold text-red-800">{alertCCPs.length} CCP Alert!</p>
              <p className="text-sm text-red-600">
                {alertCCPs.map(c => `${c.type}: ${c.suhu}°C (batas: ${c.batasAtas}°C)`).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-700">CCP Points</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{suhu.ccps.length}</p>
          <p className="text-xs text-slate-600 mt-1">titik kontrol aktif</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-700">CCP Normal</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">
            {suhu.ccps.filter(c => c.status === 'OK').length}
          </p>
          <p className="text-xs text-slate-600 mt-1">titik dalam batas</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-700">CCP Alert</p>
          <p className="text-3xl font-bold text-red-600 mt-1">{alertCCPs.length}</p>
          <p className="text-xs text-slate-600 mt-1">titik melebihi batas</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-700">Sanitasi Harian</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{completedSanit}/{sanitasi.item.length}</p>
          <p className="text-xs text-slate-600 mt-1">item checklist</p>
        </div>
      </div>

        {/* CCP Monitoring Grid */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <h2 className="font-semibold text-slate-800 mb-4">Monitoring Suhu 6 CCP</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suhu.ccps.map((ccp, idx) => {
            const bounds = CCP_LABELS[ccp.type] || { min: 0, max: 100 };
            const pct = Math.min(((ccp.suhu - bounds.min) / (bounds.max - bounds.min)) * 100, 120);
            return (
              <div
                key={idx}
                className={`rounded-xl p-4 border-2 ${
                  ccp.status === 'ALERT'
                    ? 'border-red-400 bg-red-50'
                    : 'border-emerald-200 bg-emerald-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-slate-700">{ccp.type}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    ccp.status === 'ALERT' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
                  }`}>
                    {ccp.status === 'ALERT' ? '⚠️ ALERT' : '✓ OK'}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className={`text-3xl font-black ${ccp.status === 'ALERT' ? 'text-red-600' : 'text-emerald-700'}`}>
                      {ccp.suhu}°C
                    </p>
                    <p className="text-xs text-slate-700 mt-1">Batas: {bounds.min}°C — {bounds.max}°C</p>
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${ccp.status === 'ALERT' ? 'bg-red-500' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sanitasi Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">Checklist Sanitasi Harian</h2>
          <div className="space-y-3">
            {sanitasi.item.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  item.checked ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                  item.checked ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-white'
                }`}>
                  {item.checked ? '✓' : idx + 1}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${item.checked ? 'text-emerald-700' : 'text-slate-700'}`}>
                    {item.label}
                  </p>
                  {item.checked && item.timestamp && (
                    <p className="text-xs text-emerald-500">{item.timestamp}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-700">Progress</span>
              <span className="font-bold text-emerald-600">{completedSanit}/{sanitasi.item.length}</span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all"
                style={{ width: `${(completedSanit / sanitasi.item.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">Aksi Cepat</h2>
          <div className="space-y-3">
            <Link href="/modul-4/suhu" className="flex items-center gap-3 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition">
              <span className="text-2xl">🌡️</span>
              <div>
                <p className="font-semibold text-slate-800">Input Suhu CCP</p>
                <p className="text-xs text-slate-700">Catat suhu 6 titik kontrol</p>
              </div>
            </Link>
            <Link href="/modul-4/sanitasi" className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition">
              <span className="text-2xl">🧹</span>
              <div>
                <p className="font-semibold text-slate-800">Checklist Sanitasi</p>
                <p className="text-xs text-slate-700">Harian, mingguan, bulanan</p>
              </div>
            </Link>
            <Link href="/modul-4/korektif" className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition">
              <span className="text-2xl">🔧</span>
              <div>
                <p className="font-semibold text-slate-800">Tindakan Korektif</p>
                <p className="text-xs text-slate-700">Log & tracking masalah</p>
              </div>
            </Link>
            <Link href="/modul-4/km" className="flex items-center gap-3 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition">
              <span className="text-2xl">🚨</span>
              <div>
                <p className="font-semibold text-slate-800">Kejadian Menonjol (KM)</p>
                <p className="text-xs text-slate-700">Lapor & tracking KM — wajib 12 jam</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Rekap Suhu Mingguan Mini */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="font-semibold text-slate-800 mb-4">Tren Suhu — Cold Room #2 (7 Hari)</h2>
        <div className="flex items-end gap-2 h-32">
          {[3, 4, 5, 4, 6, 7, 7].map((temp, idx) => {
            const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
            const max = 8;
            const height = (temp / max) * 100;
            const isAlert = temp > 5;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center">
                  <span className={`text-xs font-bold ${isAlert ? 'text-red-600' : 'text-emerald-600'}`}>
                    {temp}°
                  </span>
                  <div
                    className={`w-full rounded-t transition-all ${isAlert ? 'bg-red-400' : 'bg-emerald-400'}`}
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-xs text-slate-700">{days[idx]}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-center gap-6 text-xs text-slate-700">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-emerald-400 rounded" /> Normal (≤5°C)
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-400 rounded" /> Alert ({'>'}5{'\u00b0'}C)
          </span>
        </div>
      </div>
    </div>
  );
}
