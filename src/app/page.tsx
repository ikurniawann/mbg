'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  dummyDashboardStats,
  dummyDashboardAlerts,
  dummyRuteDistribusi,
  dummyMonitoringSuhu,
  dummyProduksiHarian,
  dummyTrenPorsi,
  dummyProgressProduksi,
} from '@/lib/dummy-data';

const MODULS = [
  {
    id: 1,
    nama: 'Penerimaan & Inventori',
    icon: '📦',
    desc: 'BAPB digital, labelisasi, manajemen stok',
    href: '/modul-1',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    nama: 'Menu & Gizi',
    icon: '🍽️',
    desc: 'Standard Recipe Card, approval menu',
    href: '/modul-2',
    color: 'bg-green-500',
  },
  {
    id: 3,
    nama: 'Produksi Dapur',
    icon: '👨‍🍳',
    desc: 'Checklist shift, timer produksi',
    href: '/modul-3',
    color: 'bg-orange-500',
  },
  {
    id: 4,
    nama: 'Food Safety & HACCP',
    icon: '🌡️',
    desc: 'Monitoring suhu, sanitasi, QC',
    href: '/modul-4',
    color: 'bg-red-500',
  },
  {
    id: 5,
    nama: 'Distribusi & Logistik',
    icon: '🚚',
    desc: 'Rute distribusi, tanda terima',
    href: '/modul-5',
    color: 'bg-purple-500',
  },
  {
    id: 6,
    nama: 'Dokumentasi & LPJ',
    icon: '📋',
    desc: 'Laporan bulanan, arsip digital',
    href: '/modul-6',
    color: 'bg-teal-500',
  },
  {
    id: 7,
    nama: 'SDM & Pelatihan',
    icon: '👥',
    desc: 'Jadwal pelatihan, feedback',
    href: '/modul-7',
    color: 'bg-indigo-500',
  },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const stats = dummyDashboardStats;
  const alerts = dummyDashboardAlerts;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-800 text-white transition-all duration-300`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          {sidebarOpen && <h1 className="font-bold text-lg">MBG System</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-700 transition"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/" className="flex items-center gap-3 p-3 rounded-lg bg-slate-700">
            <span>📊</span>
            {sidebarOpen && <span>Dashboard</span>}
          </Link>
          {MODULS.map((modul) => (
            <Link
              key={modul.id}
              href={modul.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition"
            >
              <span>{modul.icon}</span>
              {sidebarOpen && <span className="text-sm">{modul.nama}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Dashboard Kepala SPPG</h2>
            <p className="text-slate-500">Selasa, 17 April 2026</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">Ahmad Fauzi - Kepala SPPG</span>
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
              AF
            </div>
          </div>
        </header>

        {/* Alert Banner */}
        {alerts.filter(a => !a.isRead).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <span className="text-red-500 text-xl">⚠️</span>
            <div>
              <p className="font-semibold text-red-800">
                {alerts.filter(a => !a.isRead).length} Alert Aktif
              </p>
              <p className="text-sm text-red-600">
                {alerts.find(a => !a.isRead)?.message}
              </p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <p className="text-sm text-slate-500 mb-1">Target Porsi</p>
            <p className="text-2xl font-bold text-slate-800">
              {stats.realizedPorsi}/{stats.targetPorsi}
            </p>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all"
                style={{ width: `${(stats.realizedPorsi / stats.targetPorsi) * 100}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {Math.round((stats.realizedPorsi / stats.targetPorsi) * 100)}%
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <p className="text-sm text-slate-500 mb-1">Distribusi</p>
            <p className="text-2xl font-bold text-slate-800">
              {stats.distribusiSelesai}/{stats.distribusiTotal}
            </p>
            <p className="text-xs text-slate-400 mt-2">
              {stats.distribusiTotal - stats.distribusiSelesai} titik belum
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <p className="text-sm text-slate-500 mb-1">Stok Bahan</p>
            <p className="text-2xl font-bold text-emerald-600">{stats.stokBahan}%</p>
            <p className="text-xs text-slate-400 mt-2">Dalam kondisi baik</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <p className="text-sm text-slate-500 mb-1">Alert Aktif</p>
            <p className="text-2xl font-bold text-red-500">{stats.alertAktif}</p>
            <p className="text-xs text-red-400 mt-2">Perlu ditindaklanjuti</p>
          </div>
        </div>

        {/* Progress & Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Progress Produksi */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-slate-800 mb-4">Progress Produksi</h3>
            <div className="space-y-3">
              {Object.entries(dummyProgressProduksi).map(([stage, progress]) => (
                <div key={stage}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize text-slate-600">{stage}</span>
                    <span className="text-slate-800 font-medium">{progress}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tren Porsi */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-slate-800 mb-4">Tren Porsi 7 Hari</h3>
            <div className="flex items-end gap-2 h-32">
              {dummyTrenPorsi.map((value, idx) => {
                const max = Math.max(...dummyTrenPorsi);
                const height = (value / max) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-blue-500 rounded-t transition-all"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-slate-500">{value}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>Senin</span>
              <span>Selasa</span>
              <span>Rabu</span>
              <span>Kamis</span>
              <span>Jumat</span>
              <span>Sabtu</span>
              <span>Minggu</span>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monitoring Suhu CCP */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-slate-800 mb-4">Monitoring Suhu CCP</h3>
            <div className="space-y-2">
              {dummyMonitoringSuhu.ccps.map((ccp, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    ccp.status === 'ALERT' ? 'bg-red-50' : 'bg-gray-50'
                  }`}
                >
                  <span className="text-sm text-slate-600">{ccp.type}</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${ccp.status === 'ALERT' ? 'text-red-500' : 'text-emerald-600'}`}>
                      {ccp.suhu}°C
                    </span>
                    {ccp.status === 'ALERT' && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">ALERT</span>
                    )}
                    {ccp.status === 'OK' && (
                      <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded">OK</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Distribusi */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-slate-800 mb-4">Status Distribusi</h3>
            <div className="space-y-2">
              {dummyRuteDistribusi.slice(0, 5).map((rute) => (
                <div key={rute.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{rute.tujuan}</p>
                    <p className="text-xs text-slate-500">{rute.jumlahBox} box</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded font-medium ${
                      rute.status === 'Terkirim'
                        ? 'bg-emerald-100 text-emerald-700'
                        : rute.status === 'Dalam Perjalanan'
                        ? 'bg-blue-100 text-blue-700'
                        : rute.status === 'Terlambat'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {rute.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Access Modules */}
        <div className="mt-6">
          <h3 className="font-semibold text-slate-800 mb-4">Akses Modul</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {MODULS.map((modul) => (
              <Link
                key={modul.id}
                href={modul.href}
                className={`${modul.color} rounded-xl p-4 text-white hover:opacity-90 transition shadow-sm`}
              >
                <span className="text-2xl">{modul.icon}</span>
                <p className="font-medium text-sm mt-2">{modul.nama}</p>
                <p className="text-xs opacity-80 mt-1">{modul.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
