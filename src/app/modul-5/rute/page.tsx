'use client';

import { useState } from 'react';
import Link from 'next/link';
import { dummyRuteDistribusi } from '@/lib/dummy-data';

const STATUS_COLORS: Record<string, string> = {
  'Belum Berangkat': 'bg-gray-100 text-gray-700 border-gray-200',
  'Dalam Perjalanan': 'bg-blue-100 text-blue-700 border-blue-200',
  'Terkirim': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Terlambat': 'bg-red-100 text-red-700 border-red-200',
};

const STATUS_ICONS: Record<string, string> = {
  'Belum Berangkat': '⏳',
  'Dalam Perjalanan': '🚛',
  'Terkirim': '✅',
  'Terlambat': '⚠️',
};

export default function RuteTrackingPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const rute = dummyRuteDistribusi;

  const filteredRute = selectedStatus === 'all'
    ? rute
    : rute.filter(r => r.status === selectedStatus);

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/modul-5" className="text-sm text-teal-600 hover:text-teal-700">← Modul 5</Link>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Rute Tracking</h1>
          <p className="text-sm text-slate-700 mt-1">Selasa, 17 April 2026 • Pantau lokasi distribusi makanan</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition">
            🗺️ Refresh Lokasi
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            📍 Update Semua
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Belum Berangkat', count: rute.filter(r => r.status === 'Belum Berangkat').length, color: 'text-gray-600' },
          { label: 'Dalam Perjalanan', count: rute.filter(r => r.status === 'Dalam Perjalanan').length, color: 'text-blue-600' },
          { label: 'Terkirim', count: rute.filter(r => r.status === 'Terkirim').length, color: 'text-emerald-600' },
          { label: 'Terlambat', count: rute.filter(r => r.status === 'Terlambat').length, color: 'text-red-600' },
        ].map((stat) => (
          <button
            key={stat.label}
            onClick={() => setSelectedStatus(stat.label === 'Semua' ? 'all' : stat.label)}
            className={`bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-teal-400 transition ${selectedStatus === stat.label ? 'ring-2 ring-teal-500' : ''}`}
          >
            <p className="text-sm text-slate-700">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.count}</p>
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <span className="text-sm text-slate-600 font-medium">Filter:</span>
        {['all', 'Belum Berangkat', 'Dalam Perjalanan', 'Terkirim', 'Terlambat'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedStatus === status
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
            }`}
          >
            {status === 'all' ? 'Semua' : status}
          </button>
        ))}
      </div>

      {/* Rute Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {filteredRute.map((r) => (
          <div
            key={r.id}
            className={`bg-white rounded-xl p-5 shadow-sm border-2 transition ${
              r.status === 'Terlambat' ? 'border-red-300' :
              r.status === 'Dalam Perjalanan' ? 'border-blue-300' :
              r.status === 'Terkirim' ? 'border-emerald-300' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-slate-800 text-lg">{r.tujuan}</h3>
                <p className="text-sm text-slate-700 mt-0.5">Petugas: {r.petugas}</p>
              </div>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${STATUS_COLORS[r.status]}`}>
                {STATUS_ICONS[r.status]} {r.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-slate-700">Jumlah Box</p>
                <p className="text-xl font-bold text-slate-800">{r.jumlahBox}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-slate-700">Jadwal</p>
                <p className="text-xl font-bold text-slate-800">{r.jadwalBerangkat}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-slate-700">Waktu Tiba</p>
                <p className={`text-xl font-bold ${r.waktuTiba ? 'text-slate-800' : 'text-slate-600'}`}>
                  {r.waktuTiba || '—'}
                </p>
              </div>
            </div>

            {/* Visual Timeline */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-3 h-3 rounded-full ${r.status !== 'Belum Berangkat' ? 'bg-teal-500' : 'bg-gray-300'}`} />
              <div className={`flex-1 h-1 rounded ${r.status === 'Dalam Perjalanan' || r.status === 'Terkirim' || r.status === 'Terlambat' ? 'bg-teal-400' : 'bg-gray-200'}`} />
              <div className={`w-3 h-3 rounded-full ${r.status === 'Dalam Perjalanan' ? 'bg-blue-500' : r.status === 'Terlambat' ? 'bg-teal-500' : r.status === 'Terkirim' ? 'bg-teal-500' : 'bg-gray-300'}`} />
              <div className={`flex-1 h-1 rounded ${r.status === 'Terkirim' ? 'bg-emerald-400' : r.status === 'Terlambat' ? 'bg-red-400' : 'bg-gray-200'}`} />
              <div className={`w-3 h-3 rounded-full ${r.status === 'Terkirim' || r.status === 'Terlambat' ? 'bg-emerald-500' : 'bg-gray-300'}`} />
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>SPPG</span>
              <span>En Route</span>
              <span>{r.tujuan.split(' ')[0]}</span>
            </div>

            {/* ETA Alert for late */}
            {r.status === 'Terlambat' && r.waktuTiba && (
              <div className="mt-3 p-2 bg-red-50 rounded-lg border border-red-200">
                <p className="text-xs text-red-600 font-medium">⚠️ Terlambat 45 menit dari jadwal</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="font-semibold text-slate-800 mb-4">Peta Distribusi</h2>
        <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
          <div className="text-center">
            <span className="text-4xl">🗺️</span>
            <p className="text-sm text-slate-700 mt-2">Peta tracking lokasi distribusi</p>
            <p className="text-xs text-slate-600">Integrasi Google Maps / Maps API</p>
          </div>
        </div>
      </div>
    </div>
  );
}