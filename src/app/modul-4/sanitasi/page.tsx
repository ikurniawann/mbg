'use client';

import { useState } from 'react';

type Freq = 'harian' | 'mingguan' | 'bulanan';

interface SanitasiItem {
  id: string;
  label: string;
  freq: Freq;
  checked: boolean;
  timestamp?: string;
  user?: string;
}

const INITIAL_ITEMS: SanitasiItem[] = [
  // Harian
  { id: 's1', label: 'Cuci tangan staf ( Thermal Scanner )', freq: 'harian', checked: false },
  { id: 's2', label: 'Pengecekan APD staf ( apron, handschoen, hairnet )', freq: 'harian', checked: false },
  { id: 's3', label: 'Pengecekan kesehatan staf (lesi, flu, luka)', freq: 'harian', checked: false },
  { id: 's4', label: 'Desinfeksi talenan & peralatan masak', freq: 'harian', checked: false },
  { id: 's5', label: 'Pengecekan suhu cold storage & cold room', freq: 'harian', checked: false },
  { id: 's6', label: 'Kebersihan lantai dapur (disinfektan)', freq: 'harian', checked: false },
  { id: 's7', label: 'Sampah dapur terbuang sempurna', freq: 'harian', checked: false },
  // Mingguan
  { id: 's8', label: 'Deep cleaning peralatan masak', freq: 'mingguan', checked: false },
  { id: 's9', label: 'Pengecekan sanitasi floor drain', freq: 'mingguan', checked: false },
  { id: 's10', label: 'Pemeriksaan kebisingan & pencahayaan', freq: 'mingguan', checked: false },
  { id: 's11', label: 'Pengecekan exhaust fan & ventilasi', freq: 'mingguan', checked: false },
  // Bulanan
  { id: 's12', label: 'Fumigasi & pest control', freq: 'bulanan', checked: false },
  { id: 's13', label: 'Kalibrasi thermometer', freq: 'bulanan', checked: false },
  { id: 's14', label: 'Pemeriksaan kondisi dinding & langit-langit', freq: 'bulanan', checked: false },
  { id: 's15', label: 'Test kualitas air (parameter mikrobiologi)', freq: 'bulanan', checked: false },
];

export default function SanitasiPage() {
  const [items, setItems] = useState<SanitasiItem[]>(INITIAL_ITEMS);
  const [filter, setFilter] = useState<Freq | 'semua'>('semua');
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmit, setLastSubmit] = useState<string | null>(null);

  const toggle = (id: string) => {
    setItems(prev => prev.map(it => {
      if (it.id !== id) return it;
      const checked = !it.checked;
      return {
        ...it,
        checked,
        timestamp: checked ? new Date().toISOString().replace('T', ' ').slice(0, 16) + ' WIB' : undefined,
        user: checked ? 'Rudi Hermawan' : undefined,
      };
    }));
  };

  const filtered = filter === 'semua' ? items : items.filter(i => i.freq === filter);

  const stats = {
    harian: items.filter(i => i.freq === 'harian'),
    mingguan: items.filter(i => i.freq === 'mingguan'),
    bulanan: items.filter(i => i.freq === 'bulanan'),
  };

  const completedByFreq = (freq: Freq) => {
    const group = items.filter(i => i.freq === freq);
    return { done: group.filter(i => i.checked).length, total: group.length };
  };

  const handleSubmit = () => {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' WIB';
    setLastSubmit(now);
    setSubmitted(true);
  };

  const reset = () => {
    setItems(INITIAL_ITEMS.map(i => ({ ...i, checked: false, timestamp: undefined, user: undefined })));
    setSubmitted(false);
  };

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Checklist Sanitasi</h1>
          <p className="text-sm text-slate-500">Harian · Mingguan · Bulanan</p>
        </div>
        {submitted && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl px-4 py-2 text-sm text-emerald-700">
            ✅ Disimpan: {lastSubmit}
          </div>
        )}
      </header>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {([
          { label: 'Harian', freq: 'harian' as Freq, emoji: '📅', color: 'emerald' },
          { label: 'Mingguan', freq: 'mingguan' as Freq, emoji: '📆', color: 'blue' },
          { label: 'Bulanan', freq: 'bulanan' as Freq, emoji: '🗓️', color: 'purple' },
        ] as const).map(({ label, freq, emoji, color }) => {
          const { done, total } = completedByFreq(freq);
          const pct = Math.round((done / total) * 100);
          return (
            <div key={freq} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{emoji}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  pct === 100 ? 'bg-emerald-100 text-emerald-700' :
                  pct > 0 ? `bg-${color}-100 text-${color}-700` : 'bg-gray-100 text-gray-600'
                }`}>
                  {done}/{total}
                </span>
              </div>
              <p className="font-semibold text-slate-800">{label}</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    pct === 100 ? 'bg-emerald-500' : `bg-${color}-500`
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">{pct}% selesai</p>
            </div>
          );
        })}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {(['semua', 'harian', 'mingguan', 'bulanan'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === f ? 'bg-slate-700 text-white' : 'bg-white text-slate-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f === 'semua' ? '📋 Semua' : f === 'harian' ? '📅 Harian' : f === 'mingguan' ? '📆 Mingguan' : '🗓️ Bulanan'}
          </button>
        ))}
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="divide-y divide-gray-100">
          {filtered.map(item => (
            <div
              key={item.id}
              className={`flex items-center gap-4 p-4 transition cursor-pointer ${
                item.checked ? 'bg-emerald-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => !submitted && toggle(item.id)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                item.checked ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {item.checked ? '✓' : items.filter(i => i.freq === item.freq).indexOf(item) + 1}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${item.checked ? 'text-emerald-700' : 'text-slate-700'}`}>
                  {item.label}
                </p>
                {item.checked && item.timestamp && (
                  <p className="text-xs text-emerald-500 mt-0.5">{item.timestamp} · {item.user}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                  item.freq === 'harian' ? 'bg-orange-100 text-orange-700' :
                  item.freq === 'mingguan' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {item.freq}
                </span>
                {item.checked && (
                  <span className="text-emerald-500">✓</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 border border-gray-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
        >
          Reset Checklist
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitted}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition disabled:opacity-60"
        >
          {submitted ? '✅ Tersimpan' : '💾 Simpan Checklist'}
        </button>
      </div>
    </div>
  );
}
