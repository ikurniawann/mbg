'use client';

import { useState } from 'react';
import { dummyProduksiHarian } from '@/lib/dummy-data';
import type { HealthCheckEntry } from '@/lib/types';
import Link from 'next/link';

const STAFF_POSISI = [
  'Kepala SPPG', 'Ahli Gizi', 'Petugas Dapur', 'Petugas Packing',
  'Petugas Distribusi', 'Pengawas Mutu',
];

const GEJALA_OPTIONS = [
  'Demam', 'Batuk', 'Pilek', 'Diare', 'Mual/Muntah',
  'Lemas', 'Nyeri Perut', 'Ruam Kulit', 'Lainnya',
];

const APD_ITEMS = ['masker', 'sarungTangan', 'celemek', 'topi'] as const;

export default function HealthCheckPage() {
  const [mode, setMode] = useState<'dashboard' | 'form'>('dashboard');
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [form, setForm] = useState({
    nama: '',
    posisi: STAFF_POSISI[0],
    suhuTubuh: 36.5,
    kondisi: 'Sehat' as 'Sehat' | 'Tidak Sehat',
    gejala: [] as string[],
    masker: true, sarungTangan: true, celemek: true, topi: true,
    keterangan: '',
    isAbsent: false,
  });

  const healthChecks = dummyProduksiHarian.healthCheckStaf;
  const allApdComplete = healthChecks.filter(h => h.apdLengkap).length;

  const handleGejala = (g: string) => {
    setForm(prev => ({
      ...prev,
      gejala: prev.gejala.includes(g)
        ? prev.gejala.filter(x => x !== g)
        : [...prev.gejala, g],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setMode('dashboard'); }, 2000);
  };

  const statusColor = (kondisi: string, apd: boolean) =>
    kondisi === 'Sehat' && apd ? 'emerald' : 'red';

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Health Check Staf Harian</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-slate-500">Selasa, 17 April 2026</p>
            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium border border-red-300">
              🇮🇩 SK BGN No. 244/2025 & 63421/2026
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/modul-3" className="px-4 py-2 border border-gray-300 text-slate-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
            ← Dashboard
          </Link>
          <button
            onClick={() => setMode(mode === 'dashboard' ? 'form' : 'dashboard')}
            className={`px-4 py-2 text-white rounded-lg text-sm font-medium transition ${
              mode === 'form' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {mode === 'dashboard' ? '+ Input Health Check' : '← Lihat Dashboard'}
          </button>
        </div>
      </header>

      {/* Alert if unhealthy */}
      {healthChecks.some(h => h.kondisi !== 'Sehat' || !h.apdLengkap) && (
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-6 flex items-center gap-3">
          <span className="text-3xl">⚠️</span>
          <div>
            <p className="font-bold text-red-800">Peringatan Kesehatan!</p>
            <p className="text-sm text-red-600">
              {healthChecks.filter(h => h.kondisi !== 'Sehat').length} staf tidak sehat dan/atau
              {' '}{healthChecks.filter(h => !h.apdLengkap).length} staf APD tidak lengkap.
              Wajib diganti sebelum bertugas.
            </p>
          </div>
        </div>
      )}

      {/* Success Banner */}
      {submitted && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-4 mb-6 flex items-center gap-3">
          <span className="text-3xl">✅</span>
          <div>
            <p className="font-bold text-emerald-800">Berhasil Disimpan!</p>
            <p className="text-sm text-emerald-600">Data health check staf telah terekam.</p>
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Total Staf</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{healthChecks.length}</p>
          <p className="text-xs text-slate-400 mt-1">staf aktif</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Sehat & APD Lengkap</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">{allApdComplete}</p>
          <p className="text-xs text-slate-400 mt-1">staf boleh bertugas</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Tidak Sehat</p>
          <p className="text-3xl font-bold text-red-600 mt-1">
            {healthChecks.filter(h => h.kondisi !== 'Sehat').length}
          </p>
          <p className="text-xs text-slate-400 mt-1">staf tidak boleh bertugas</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">APD Tidak Lengkap</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">
            {healthChecks.filter(h => !h.apdLengkap).length}
          </p>
          <p className="text-xs text-slate-400 mt-1">staf perlu dilengkapi</p>
        </div>
      </div>

      {mode === 'dashboard' ? (
        <>
          {/* Staff List */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <h2 className="font-semibold text-slate-800 mb-4">Daftar Health Check — 17 April 2026</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-gray-100">
                    <th className="pb-3 font-medium">Nama</th>
                    <th className="pb-3 font-medium">Kondisi</th>
                    <th className="pb-3 font-medium">Suhu</th>
                    <th className="pb-3 font-medium">APD</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {healthChecks.map((staf, idx) => {
                    const status = staf.kondisi === 'Sehat' && staf.apdLengkap ? 'approved' : 'rejected';
                    return (
                      <tr key={idx} className="border-b border-gray-50 last:border-0">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-${status === 'approved' ? 'emerald' : 'red'}-500`}>
                              {staf.nama.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-medium text-slate-800">{staf.nama}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            staf.kondisi === 'Sehat'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {staf.kondisi}
                          </span>
                        </td>
                        <td className="py-3 text-slate-600">{staf.kondisi === 'Sehat' ? '36.5°C' : '38.2°C'}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            {APD_ITEMS.map(apd => (
                              <span key={apd} className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                                staf.apdLengkap
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {apd === 'masker' ? 'M' : apd === 'sarungTangan' ? 'ST' : apd === 'celemek' ? 'C' : 'T'}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={`text-xl`}>
                            {staf.kondisi === 'Sehat' && staf.apdLengkap ? '✅' : '🚫'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Weekly Trend */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="font-semibold text-slate-800 mb-4">Tren Kesehatan Staf — 7 Hari Terakhir</h2>
            <div className="flex items-end gap-3 h-36">
              {[
                { day: 'Sen', sehat: 8, tidakSehat: 0 },
                { day: 'Sel', sehat: 8, tidakSehat: 0 },
                { day: 'Rab', sehat: 7, tidakSehat: 1 },
                { day: 'Kam', sehat: 8, tidakSehat: 0 },
                { day: 'Jum', sehat: 8, tidakSehat: 0 },
                { day: 'Sab', sehat: 6, tidakSehat: 2 },
                { day: 'Today', sehat: 8, tidakSehat: 0 },
              ].map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col-reverse gap-0.5" style={{ height: '100px' }}>
                    <div
                      className="w-full bg-emerald-400 rounded-t"
                      style={{ height: `${(d.sehat / 8) * 100}px` }}
                    />
                    <div
                      className="w-full bg-red-400 rounded-t"
                      style={{ height: `${(d.tidakSehat / 8) * 100}px` }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${d.day === 'Today' ? 'text-blue-600' : 'text-slate-500'}`}>
                    {d.day}
                  </span>
                  <span className="text-[10px] text-slate-400">{d.sehat}/{d.sehat + d.tidakSehat}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-emerald-400 rounded" /> Sehat
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-400 rounded" /> Tidak Sehat
              </span>
            </div>
          </div>
        </>
      ) : (
        /* Form Mode */
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 max-w-2xl">
          <h2 className="font-semibold text-slate-800 mb-4">Form Health Check Baru</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Nama Staf</label>
              <input
                type="text"
                required
                placeholder="Ketik nama..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.nama}
                onChange={e => setForm(p => ({ ...p, nama: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Posisi</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.posisi}
                onChange={e => setForm(p => ({ ...p, posisi: e.target.value }))}
              >
                {STAFF_POSISI.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* Absent Toggle */}
          <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <input
              type="checkbox"
              id="isAbsent"
              className="w-4 h-4 accent-red-500"
              checked={form.isAbsent}
              onChange={e => setForm(p => ({ ...p, isAbsent: e.target.checked }))}
            />
            <label htmlFor="isAbsent" className="text-sm text-slate-700 font-medium">
              ⛔ Staf tidak masuk (cuti / sakit)
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Suhu Tubuh (°C) — Normal: 35.5–37.5°C
              </label>
              <input
                type="number"
                step="0.1"
                min="34" max="42"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.suhuTubuh}
                onChange={e => setForm(p => ({ ...p, suhuTubuh: parseFloat(e.target.value) }))}
              />
              {form.suhuTubuh > 37.5 && (
                <p className="text-xs text-red-600 mt-1 font-medium">⚠️ Suhu melebihi normal!</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Kondisi Kesehatan</label>
              <div className="flex gap-2 mt-1">
                {(['Sehat', 'Tidak Sehat'] as const).map(k => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setForm(p => ({ ...p, kondisi: k }))}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border-2 transition ${
                      form.kondisi === k
                        ? k === 'Sehat'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 text-slate-400 hover:border-gray-300'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Gejala */}
          {form.kondisi === 'Tidak Sehat' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-600 mb-2">Gejala (pilih yang sesuai)</label>
              <div className="flex flex-wrap gap-2">
                {GEJALA_OPTIONS.map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleGejala(g)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border-2 transition ${
                      form.gejala.includes(g)
                        ? 'border-red-400 bg-red-50 text-red-700'
                        : 'border-gray-200 text-slate-500 hover:border-gray-300'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* APD Checklist */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 mb-2">Kelengkapan APD</label>
            <div className="grid grid-cols-4 gap-2">
              {APD_ITEMS.map(apd => (
                <label
                  key={apd}
                  className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition ${
                    form[apd]
                      ? 'border-emerald-300 bg-emerald-50'
                      : 'border-red-300 bg-red-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-emerald-500 w-4 h-4"
                    checked={form[apd]}
                    onChange={e => setForm(p => ({ ...p, [apd]: e.target.checked }))}
                  />
                  <span className={`text-sm font-medium ${
                    form[apd] ? 'text-emerald-700' : 'text-red-700'
                  }`}>
                    {apd === 'masker' ? '😷 Masker' :
                     apd === 'sarungTangan' ? '🧤 Sarung Tangan' :
                     apd === 'celemek' ? '👕 Celemek' : '👒 Topi'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Keterangan */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-1">Keterangan / Catatan</label>
            <textarea
              rows={3}
              placeholder="Catatan tambahan (opsional)..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.keterangan}
              onChange={e => setForm(p => ({ ...p, keterangan: e.target.value }))}
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <p className="text-xs text-slate-400">
              {new Date().toLocaleString('id-ID')}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode('dashboard')}
                className="px-4 py-2 border border-gray-300 text-slate-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
              >
                ✅ Simpan Health Check
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
