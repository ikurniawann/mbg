'use client';

import { useState } from 'react';
import Link from 'next/link';
import { dummyProduksiHarian, dummyBahan } from '@/lib/dummy-data';
import type { Shift } from '@/lib/types';

const SHIFTS: Shift[] = ['Persiapan', 'Pengolahan', 'Pemorsian', 'Packing', 'Kebersihan'];

const PROGRESS_MAP: Record<string, number> = {
  'Persiapan': 100,
  'Pengolahan': 85,
  'Pemorsian': 68,
  'Packing': 52,
  'Kebersihan': 0,
};

export default function Modul3Dashboard() {
  const produksi = dummyProduksiHarian;
  const [shiftStatus, setShiftStatus] = useState(
    Object.fromEntries(SHIFTS.map(s => [s, produksi.shiftTasks.find(t => t.shift === s)?.status || 'pending']))
  );
  const [healthChecks, setHealthChecks] = useState(produksi.healthCheckStaf);

  const toggleShift = (shift: Shift) => {
    setShiftStatus(prev => ({
      ...prev,
      [shift]: prev[shift] === 'completed' ? 'pending' : 'completed',
    }));
  };

  const progressTotal = Math.round(
    Object.values(shiftStatus).filter(s => s === 'completed').length / SHIFTS.length * 100
  );

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Produksi Dapur</h1>
          <p className="text-sm text-slate-500">Selasa, 17 April 2026 · Menu: Ikan Goreng + Capcay</p>
        </div>
        <div className="flex gap-3">
          <Link href="/modul-3/timer" className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition">
            ⏱️ Timer Produksi
          </Link>
          <Link href="/modul-3/dokumentasi" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            📷 Dokumentasi
          </Link>
        </div>
      </header>

      {/* Timer Alert Banner */}
      <div className={`rounded-xl p-4 mb-6 flex items-center gap-4 ${
        produksi.timerStatus === 'alert' ? 'bg-red-50 border-2 border-red-300' :
        produksi.timerStatus === 'warning' ? 'bg-amber-50 border-2 border-amber-300' :
        'bg-emerald-50 border-2 border-emerald-300'
      }`}>
        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
          produksi.timerStatus === 'alert' ? 'bg-red-500 text-white' :
          produksi.timerStatus === 'warning' ? 'bg-amber-500 text-white' :
          'bg-emerald-500 text-white'
        }`}>
          ⏱️
        </div>
        <div className="flex-1">
          <p className={`font-bold text-lg ${
            produksi.timerStatus === 'alert' ? 'text-red-800' :
            produksi.timerStatus === 'warning' ? 'text-amber-800' :
            'text-emerald-800'
          }`}>
            Timer Produksi: {produksi.timerStatus === 'normal' ? 'Dalam Batas Aman' :
              produksi.timerStatus === 'warning' ? 'Mendekati Batas 4 Jam' : 'MELEBIHI 4 JAM!'}
          </p>
          <p className="text-sm text-slate-600">
            Mulai: {produksi.waktuMulai} · Batas maksimal: 4 jam dari mulai produksi
          </p>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${
            produksi.timerStatus === 'alert' ? 'text-red-600' :
            produksi.timerStatus === 'warning' ? 'text-amber-600' :
            'text-emerald-600'
          }`}>
            {produksi.timerStatus === 'normal' ? '✓' :
              produksi.timerStatus === 'warning' ? '⚠️' : '🚨'} OK
          </p>
          <p className="text-xs text-slate-500">Status</p>
        </div>
      </div>

      {/* Progress & Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Target Porsi</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{produksi.targetPorsi}</p>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(produksi.realizedPorsi / produksi.targetPorsi) * 100}%` }} />
          </div>
          <p className="text-xs text-slate-400 mt-1">{produksi.realizedPorsi} porsi (68%)</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Shift Selesai</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">
            {Object.values(shiftStatus).filter(s => s === 'completed').length}/{SHIFTS.length}
          </p>
          <p className="text-xs text-slate-400 mt-1">shift aktif</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Staf Healthy</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">
            {healthChecks.filter(h => h.kondisi === 'Sehat' && h.apdLengkap).length}/{healthChecks.length}
          </p>
          <p className="text-xs text-slate-400 mt-1">lolos health check</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Bahan Terpakai</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">{produksi.bahanTerpakai.length}</p>
          <p className="text-xs text-slate-400 mt-1">jenis bahan</p>
        </div>
      </div>

      {/* Shift Checklist */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">Checklist Shift Harian</h2>
          <div className="space-y-3">
            {SHIFTS.map((shift) => {
              const status = shiftStatus[shift];
              const task = produksi.shiftTasks.find(t => t.shift === shift);
              return (
                <div
                  key={shift}
                  className={`p-4 rounded-xl border-2 transition cursor-pointer ${
                    status === 'completed'
                      ? 'border-emerald-300 bg-emerald-50'
                      : status === 'in_progress'
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                  onClick={() => toggleShift(shift)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        status === 'completed'
                          ? 'bg-emerald-500 text-white'
                          : status === 'in_progress'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-white'
                      }`}>
                        {status === 'completed' ? '✓' : status === 'in_progress' ? '→' : SHIFTS.indexOf(shift) + 1}
                      </div>
                      <div>
                        <p className={`font-semibold ${status === 'completed' ? 'text-emerald-700' : 'text-slate-800'}`}>
                          {shift}
                        </p>
                        {task && (
                          <p className="text-xs text-slate-500">{task.tugas} · {task.petugas}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        status === 'completed'
                          ? 'bg-emerald-200 text-emerald-700'
                          : status === 'in_progress'
                          ? 'bg-blue-200 text-blue-700'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {status === 'completed' ? 'Selesai' : status === 'in_progress' ? 'Dikerjakan' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Health Check */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">Health Check Staf Harian</h2>
          <div className="space-y-3">
            {healthChecks.map((staf, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border-2 ${
                  staf.kondisi === 'Sehat' && staf.apdLengkap
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-red-300 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      staf.kondisi === 'Sehat' && staf.apdLengkap
                        ? 'bg-emerald-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}>
                      {staf.nama.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{staf.nama}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          staf.kondisi === 'Sehat' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {staf.kondisi}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          staf.apdLengkap ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                        }`}>
                          APD {staf.apdLengkap ? 'Lengkap ✓' : 'Tidak'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xl">
                    {staf.kondisi === 'Sehat' && staf.apdLengkap ? '✅' : '⚠️'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bahan Terpakai */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <h2 className="font-semibold text-slate-800 mb-4">Bahan Terpakai Hari Ini</h2>
        <div className="grid grid-cols-3 gap-3">
          {produksi.bahanTerpakai.map((bahan, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div>
                <p className="font-semibold text-slate-800">{bahan.nama}</p>
                <p className="text-xs text-slate-400">dari stok inventori</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-purple-600">{bahan.jumlah} {bahan.satuan}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800">Progress Produksi Keseluruhan</h2>
          <span className="text-lg font-bold text-orange-600">{progressTotal}%</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {SHIFTS.map((shift) => {
            const pct = PROGRESS_MAP[shift] || 0;
            const done = shiftStatus[shift] === 'completed';
            return (
              <div key={shift} className="text-center">
                <div className="h-32 bg-gray-200 rounded-xl overflow-hidden relative">
                  <div
                    className={`absolute bottom-0 w-full transition-all ${
                      done ? 'bg-emerald-500' : 'bg-orange-400'
                    }`}
                    style={{ height: `${done ? 100 : pct}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium">{shift}</p>
                <p className={`text-xs font-bold ${done ? 'text-emerald-600' : 'text-orange-600'}`}>
                  {done ? '✓' : `${pct}%`}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
