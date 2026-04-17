'use client';

import Link from 'next/link';
import { dummyPelatihan, dummyFeedback, dummyUsers } from '@/lib/dummy-data';

export default function Modul7Dashboard() {
  const pelatihan = dummyPelatihan;
  const feedback = dummyFeedback;
  const scheduledCount = pelatihan.filter(p => p.status === 'Terjadwal').length;
  const completedCount = pelatihan.filter(p => p.status === 'Selesai').length;
  const avgRating = (feedback.reduce((sum, f) => sum + (f.rating.rasa + f.rating.kebersihan + f.rating.ketepatanWaktu) / 3, 0) / feedback.length).toFixed(1);

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard SDM & Pelatihan</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-slate-500">Selasa, 17 April 2026</p>
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium border border-indigo-300">
              👥 SDM & Pelatihan
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/modul-7/pelatihan" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
            🎓 Jadwal Pelatihan
          </Link>
          <Link href="/modul-7/feedback" className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition">
            ⭐ Feedback
          </Link>
        </div>
      </header>

      {/* Staff Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Total Staf</p>
          <p className="text-3xl font-bold text-indigo-600 mt-1">{dummyUsers.length}</p>
          <p className="text-xs text-slate-400 mt-1">personel aktif</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Pelatihan Terjadwal</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{scheduledCount}</p>
          <p className="text-xs text-slate-400 mt-1">pelatihan akan datang</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Pelatihan Selesai</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">{completedCount}</p>
          <p className="text-xs text-slate-400 mt-1">total pelatihan</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Rating Rata-rata</p>
          <p className="text-3xl font-bold text-amber-500 mt-1">{avgRating}</p>
          <p className="text-xs text-slate-400 mt-1">dari feedback penerima</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Link href="/modul-7/pelatihan" className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl">
              🎓
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Pelatihan & Pengembangan</h3>
              <p className="text-sm text-slate-500 mt-1">Kelola jadwal pelatihan staf</p>
            </div>
          </div>
        </Link>

        <Link href="/modul-7/notulen" className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center text-2xl">
              📝
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Notulen Rapat</h3>
              <p className="text-sm text-slate-500 mt-1">Dokumentasi keputusan rapat</p>
            </div>
          </div>
        </Link>

        <Link href="/modul-7/feedback" className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-2xl">
              ⭐
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Feedback Penerima</h3>
              <p className="text-sm text-slate-500 mt-1">Lihat rating & komentar</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Pelatihan & Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Pelatihan */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">🎓 Jadwal Pelatihan Mendatang</h2>
            <Link href="/modul-7/pelatihan" className="text-sm text-indigo-600 hover:text-indigo-700">
              Lihat semua →
            </Link>
          </div>
          <div className="space-y-3">
            {pelatihan.filter(p => p.status === 'Terjadwal').map(p => (
              <div key={p.id} className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">{p.judul}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      📅 {p.tanggal} • Pemateri: {p.pemateri}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-indigo-600 text-white text-xs rounded font-medium">
                    Terjadwal
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-2">Materi: {p.materi}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-slate-500">Peserta:</span>
                  {p.peserta.map((nama, idx) => (
                    <span key={idx} className="text-xs bg-white px-2 py-0.5 rounded border border-indigo-200">
                      {nama}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {pelatihan.filter(p => p.status === 'Terjadwal').length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">Tidak ada pelatihan terjadwal</p>
            )}
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">⭐ Feedback Terbaru</h2>
            <Link href="/modul-7/feedback" className="text-sm text-amber-600 hover:text-amber-700">
              Lihat semua →
            </Link>
          </div>
          <div className="space-y-3">
            {feedback.map(fb => (
              <div key={fb.id} className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">{fb.lokasi}</p>
                    <p className="text-xs text-slate-500 mt-1">📅 {fb.tanggal}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < Math.round((fb.rating.rasa + fb.rating.kebersihan + fb.rating.ketepatanWaktu) / 3) ? 'text-amber-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="text-center p-2 bg-white rounded-lg border border-amber-200">
                    <p className="text-xs text-slate-500">Rasa</p>
                    <p className="font-bold text-slate-800">{fb.rating.rasa}</p>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg border border-amber-200">
                    <p className="text-xs text-slate-500">Kebersihan</p>
                    <p className="font-bold text-slate-800">{fb.rating.kebersihan}</p>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg border border-amber-200">
                    <p className="text-xs text-slate-500">Ketepatan</p>
                    <p className="font-bold text-slate-800">{fb.rating.ketepatanWaktu}</p>
                  </div>
                </div>
                {fb.komentar && (
                  <p className="text-sm text-slate-600 mt-2 italic">"{fb.komentar}"</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Staff List */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mt-6">
        <h2 className="font-semibold text-slate-800 mb-4">👥 Daftar Staf SPPG</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dummyUsers.map(user => (
            <div key={user.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                {user.nama.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-slate-800">{user.nama}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role.replace('_', ' ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}