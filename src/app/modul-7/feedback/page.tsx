'use client';

import { useState } from 'react';
import { dummyFeedback } from '@/lib/dummy-data';

export default function FeedbackPage() {
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const feedback = dummyFeedback;

  const filteredFeedback = selectedLocation === 'all'
    ? feedback
    : feedback.filter(f => f.lokasi === selectedLocation);

  const locations = [...new Set(feedback.map(f => f.lokasi))];

  // Calculate averages
  const avgRasa = (feedback.reduce((sum, f) => sum + f.rating.rasa, 0) / feedback.length).toFixed(1);
  const avgKebersihan = (feedback.reduce((sum, f) => sum + f.rating.kebersihan, 0) / feedback.length).toFixed(1);
  const avgKetepatan = (feedback.reduce((sum, f) => sum + f.rating.ketepatanWaktu, 0) / feedback.length).toFixed(1);
  const overallAvg = ((parseFloat(avgRasa) + parseFloat(avgKebersihan) + parseFloat(avgKetepatan)) / 3).toFixed(1);

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Feedback Kepuasan Penerima</h1>
          <p className="text-sm text-slate-500 mt-1">Rating dan komentar dari lokasi distribusi</p>
        </div>
      </header>

      {/* Rating Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 text-center">
          <p className="text-sm text-slate-500 mb-2">Rating Keseluruhan</p>
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.round(parseFloat(overallAvg)) ? 'text-amber-400' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          <p className="text-2xl font-bold text-slate-800">{overallAvg}</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-5 shadow-sm border border-amber-200 text-center">
          <p className="text-sm text-amber-600 mb-2">Rasa</p>
          <p className="text-3xl font-bold text-amber-600">{avgRasa}</p>
          <p className="text-xs text-amber-500 mt-1">dari 5.0</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-5 shadow-sm border border-blue-200 text-center">
          <p className="text-sm text-blue-600 mb-2">Kebersihan</p>
          <p className="text-3xl font-bold text-blue-600">{avgKebersihan}</p>
          <p className="text-xs text-blue-500 mt-1">dari 5.0</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-5 shadow-sm border border-emerald-200 text-center">
          <p className="text-sm text-emerald-600 mb-2">Ketepatan Waktu</p>
          <p className="text-3xl font-bold text-emerald-600">{avgKetepatan}</p>
          <p className="text-xs text-emerald-500 mt-1">dari 5.0</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedLocation('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
            selectedLocation === 'all'
              ? 'bg-amber-500 text-white'
              : 'bg-white text-slate-600 hover:bg-gray-100'
          }`}
        >
          Semua Lokasi
        </button>
        {locations.map(loc => (
          <button
            key={loc}
            onClick={() => setSelectedLocation(loc)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
              selectedLocation === loc
                ? 'bg-amber-500 text-white'
                : 'bg-white text-slate-600 hover:bg-gray-100'
            }`}
          >
            {loc}
          </button>
        ))}
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map(fb => {
          const avg = (fb.rating.rasa + fb.rating.kebersihan + fb.rating.ketepatanWaktu) / 3;
          return (
            <div key={fb.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{fb.lokasi}</h3>
                  <p className="text-sm text-slate-500">📅 {fb.tanggal}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < Math.round(avg) ? 'text-amber-400' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                  <span className="ml-2 font-bold text-slate-800">{avg.toFixed(1)}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-amber-50 rounded-lg p-3 text-center border border-amber-200">
                  <p className="text-xs text-amber-600 mb-1">Rasa</p>
                  <p className="text-xl font-bold text-amber-700">{fb.rating.rasa}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
                  <p className="text-xs text-blue-600 mb-1">Kebersihan</p>
                  <p className="text-xl font-bold text-blue-700">{fb.rating.kebersihan}</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-3 text-center border border-emerald-200">
                  <p className="text-xs text-emerald-600 mb-1">Ketepatan</p>
                  <p className="text-xl font-bold text-emerald-700">{fb.rating.ketepatanWaktu}</p>
                </div>
              </div>

              {fb.komentar && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-slate-600 italic">"{fb.komentar}"</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}