'use client';

import { useState } from 'react';
import { dummyPelatihan } from '@/lib/dummy-data';

const STATUS_CONFIG: Record<string, { bg: string; text: string; badge: string }> = {
  Terjadwal: { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-600' },
  Selesai: { bg: 'bg-emerald-50', text: 'text-emerald-700', badge: 'bg-emerald-600' },
  Batal: { bg: 'bg-red-50', text: 'text-red-700', badge: 'bg-red-600' },
};

export default function PelatihanPage() {
  const [filter, setFilter] = useState<string>('all');
  const pelatihan = dummyPelatihan;

  const filteredPelatihan = filter === 'all' 
    ? pelatihan 
    : pelatihan.filter(p => p.status.toLowerCase() === filter);

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pelatihan & Pengembangan</h1>
          <p className="text-sm text-slate-700 mt-1">Kelola jadwal dan materi pelatihan staf</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
          + Tambah Pelatihan
        </button>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'Terjadwal', 'Selesai', 'Batal'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === status
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-600 hover:bg-gray-100'
            }`}
          >
            {status === 'all' ? 'Semua' : status}
          </button>
        ))}
      </div>

      {/* Pelatihan List */}
      <div className="space-y-4">
        {filteredPelatihan.map(p => {
          const cfg = STATUS_CONFIG[p.status] || STATUS_CONFIG.Terjadwal;
          return (
            <div key={p.id} className={`rounded-xl p-6 border-2 ${cfg.bg} ${cfg.text.includes('red') ? 'border-red-300' : cfg.text.includes('emerald') ? 'border-emerald-300' : 'border-blue-300'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg text-slate-800">{p.judul}</h3>
                    <span className={`${cfg.badge} text-white text-xs px-2 py-1 rounded font-medium`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">{p.materi}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-xs text-slate-700">Tanggal</p>
                  <p className="font-semibold text-slate-800">📅 {p.tanggal}</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-xs text-slate-700">Pemateri</p>
                  <p className="font-semibold text-slate-800">👨‍🏫 {p.pemateri}</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-xs text-slate-700">Jumlah Peserta</p>
                  <p className="font-semibold text-slate-800">👥 {p.peserta.length} orang</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs text-slate-700 mb-2">Peserta:</p>
                <div className="flex flex-wrap gap-2">
                  {p.peserta.map((nama, idx) => (
                    <span key={idx} className="text-xs bg-white px-3 py-1 rounded-full border border-gray-300 font-medium">
                      {nama}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200/50">
                <button className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 transition">
                  Edit
                </button>
                <button className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs rounded-lg hover:bg-slate-300 transition">
                  Lihat Detail
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}