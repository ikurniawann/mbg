'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CCPType } from '@/lib/types';

interface CCPEntry {
  type: CCPType;
  suhu: string;
  catatan: string;
}

const CCP_POINTS: { type: CCPType; batasBawah: number; batasAtas: number }[] = [
  { type: 'Penerimaan Beku', batasBawah: -25, batasAtas: -15 },
  { type: 'Cold Storage', batasBawah: 0, batasAtas: 5 },
  { type: 'Cold Room #1', batasBawah: 0, batasAtas: 5 },
  { type: 'Cold Room #2', batasBawah: 0, batasAtas: 5 },
  { type: 'Memasak', batasBawah: 75, batasAtas: 85 },
  { type: 'Hot Holding', batasBawah: 60, batasAtas: 70 },
  { type: 'Distribusi', batasBawah: 55, batasAtas: 65 },
];

export default function SuhuPage() {
  const today = new Date().toISOString().split('T')[0];
  const [entries, setEntries] = useState<CCPEntry[]>(
    CCP_POINTS.map(c => ({ type: c.type, suhu: '', catatan: '' }))
  );
  const [submitted, setSubmitted] = useState(false);
  const [selectedCCP, setSelectedCCP] = useState<string | null>(null);

  const updateEntry = (type: string, field: 'suhu' | 'catatan', value: string) => {
    setEntries(prev => prev.map(e =>
      e.type === type ? { ...e, [field]: value } : e
    ));
  };

  const getStatus = (type: CCPType, suhuStr: string) => {
    const ccp = CCP_POINTS.find(c => c.type === type);
    if (!ccp || !suhuStr) return 'unknown';
    const suhu = parseFloat(suhuStr);
    if (isNaN(suhu)) return 'unknown';
    if (suhu < ccp.batasBawah || suhu > ccp.batasAtas) return 'alert';
    return 'ok';
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const resetForm = () => {
    setEntries(CCP_POINTS.map(c => ({ type: c.type, suhu: '', catatan: '' })));
    setSubmitted(false);
  };

  const alertEntries = entries.filter(e => getStatus(e.type, e.suhu) === 'alert');

  if (submitted) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className={`rounded-xl p-6 mb-6 border-2 ${
            alertEntries.length > 0
              ? 'bg-red-50 border-red-300'
              : 'bg-emerald-50 border-emerald-300'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{alertEntries.length > 0 ? '⚠️' : '✅'}</span>
              <div>
                <h2 className={`text-xl font-bold ${alertEntries.length > 0 ? 'text-red-800' : 'text-emerald-800'}`}>
                  {alertEntries.length > 0
                    ? `${alertEntries.length} Alert Suhu!`
                    : 'Semua Suhu Normal'}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Pencatatan suhu CCP {today} berhasil disimpan
                </p>
              </div>
            </div>
          </div>

          {/* Alert Details */}
          {alertEntries.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
              <h3 className="font-semibold text-red-700 mb-4">⚠️ Titik Alert</h3>
              <div className="space-y-3">
                {alertEntries.map(entry => {
                  const ccp = CCP_POINTS.find(c => c.type === entry.type)!;
                  const suhu = parseFloat(entry.suhu);
                  return (
                    <div key={entry.type} className="p-4 bg-red-50 rounded-xl border border-red-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-red-800">{entry.type}</p>
                          <p className="text-sm text-red-600">
                            {suhu > ccp.batasAtas
                              ? `Melebihi batas atas: ${suhu}°C > ${ccp.batasAtas}°C`
                              : `Di bawah batas bawah: ${suhu}°C < ${ccp.batasBawah}°C`}
                          </p>
                          {entry.catatan && (
                            <p className="text-sm text-red-500 mt-1">Catatan: {entry.catatan}</p>
                          )}
                        </div>
                        <Link
                          href="/modul-4/korektif"
                          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
                        >
                          🔧 Buat Korektif
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-slate-800 mb-4">Ringkasan Suhu CCP</h3>
            <div className="grid grid-cols-2 gap-3">
              {entries.map(entry => {
                const status = getStatus(entry.type, entry.suhu);
                const ccp = CCP_POINTS.find(c => c.type === entry.type);
                return (
                  <div
                    key={entry.type}
                    className={`p-4 rounded-xl border-2 ${
                      status === 'alert'
                        ? 'border-red-300 bg-red-50'
                        : status === 'ok'
                        ? 'border-emerald-300 bg-emerald-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-700">{entry.type}</p>
                      <span className={`text-sm font-bold ${
                        status === 'alert' ? 'text-red-600' :
                        status === 'ok' ? 'text-emerald-600' : 'text-slate-400'
                      }`}>
                        {entry.suhu || '-'}°C
                      </span>
                    </div>
                    {ccp && (
                      <p className="text-xs text-slate-400 mt-1">
                        Batas: {ccp.batasBawah}°C — {ccp.batasAtas}°C
                      </p>
                    )}
                    {status === 'ok' && entry.suhu && (
                      <span className="text-xs text-emerald-600 font-medium">✓ Normal</span>
                    )}
                    {status === 'alert' && (
                      <span className="text-xs text-red-600 font-medium">⚠️ Alert!</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              + Input UH-3 Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Monitoring Suhu CCP</h1>
        <p className="text-sm text-slate-500">Tanggal: {today}</p>
      </header>

      {/* CCP Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <h2 className="font-semibold text-slate-800 mb-4">Input Suhu 6 Titik CCP</h2>
        <div className="space-y-4">
          {CCP_POINTS.map(ccp => {
            const entry = entries.find(e => e.type === ccp.type);
            const status = getStatus(ccp.type, entry?.suhu || '');
            return (
              <div
                key={ccp.type}
                className={`p-4 rounded-xl border-2 transition ${
                  status === 'alert' ? 'border-red-300 bg-red-50' :
                  status === 'ok' ? 'border-emerald-200 bg-emerald-50' :
                  'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-48">
                    <p className="font-semibold text-slate-800">{ccp.type}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Batas: {ccp.batasBawah}°C — {ccp.batasAtas}°C
                    </p>
                  </div>
                  <div className="w-32">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Suhu (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={entry?.suhu || ''}
                      onChange={e => updateEntry(ccp.type, 'suhu', e.target.value)}
                      placeholder={ccp.type.includes('Beku') ? '-19' : '4'}
                      className={`w-full px-3 py-2 border rounded-lg text-sm font-semibold ${
                        status === 'alert' ? 'border-red-400 bg-white' :
                        status === 'ok' ? 'border-emerald-400 bg-white' :
                        'border-gray-300 bg-white'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Catatan</label>
                    <input
                      type="text"
                      value={entry?.catatan || ''}
                      onChange={e => updateEntry(ccp.type, 'catatan', e.target.value)}
                      placeholder="Opsional"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                    />
                  </div>
                  <div className="flex items-center">
                    {status === 'ok' && entry?.suhu && (
                      <span className="text-emerald-500 text-2xl">✓</span>
                    )}
                    {status === 'alert' && (
                      <span className="text-red-500 text-2xl">⚠️</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={resetForm}
            className="px-4 py-2 border border-gray-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
          >
            💾 Simpan Monitoring
          </button>
        </div>
      </div>

      {/* Last Record */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="font-semibold text-slate-800 mb-4">Riwayat Terakhir</h2>
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="grid grid-cols-7 gap-2 text-center">
            {['P. Beku', 'Cold Storage', 'CR #1', 'CR #2', 'Memasak', 'Hot Hold', 'Distribusi'].map((label, idx) => (
              <div key={label}>
                <p className="text-xs text-slate-500">{label}</p>
                <p className={`font-bold text-sm ${idx === 3 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {[-19, 4, 3, 7, 76, 62, 58][idx]}°C
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">16 April 2026 · 07:00 · Rudi Hermawan</p>
        </div>
      </div>
    </div>
  );
}
