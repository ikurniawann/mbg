'use client';

import { useState, useEffect, useRef } from 'react';

export default function TimerPage() {
  const [startTime] = useState(() => new Date('2026-04-17T06:00:00'));
  const [elapsed, setElapsed] = useState(0);
  const [status, setStatus] = useState<'running' | 'paused' | 'alert'>('running');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const MAX_HOURS = 4;

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diffMs = now.getTime() - startTime.getTime();
      const diffSec = Math.floor(diffMs / 1000);
      setElapsed(diffSec);

      const hours = diffSec / 3600;
      if (hours >= MAX_HOURS) {
        setStatus('alert');
      } else if (hours >= MAX_HOURS - 0.5) {
        setStatus('alert');
      } else {
        setStatus('running');
      }
    };

    updateTimer();
    intervalRef.current = setInterval(updateTimer, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const hours = elapsed / 3600;
  const maxSeconds = MAX_HOURS * 3600;
  const progress = Math.min((elapsed / maxSeconds) * 100, 100);
  const remainingSeconds = Math.max(maxSeconds - elapsed, 0);

  const bgColor = status === 'alert' ? 'bg-red-500' : hours >= MAX_HOURS - 1 ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Timer Produksi</h1>
        <p className="text-sm text-slate-500">
          Batas maksimal masak → packing → distribusi: <strong>4 jam</strong>
        </p>
      </header>

      {/* Timer Display */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6">
        {/* Header Bar */}
        <div className={`${bgColor} text-white px-6 py-4 flex items-center justify-between`}>
          <div>
            <p className="text-sm font-medium opacity-80">Timer Produksi</p>
            <p className="text-lg font-bold">Ikan Goreng + Capcay · 500 Porsi</p>
          </div>
          <div className="text-right">
            {status === 'alert' ? (
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-bold animate-pulse">
                🚨 MELEBIHI 4 JAM!
              </span>
            ) : (
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                ⏱️ Dalam Progress
              </span>
            )}
          </div>
        </div>

        {/* Timer Circle */}
        <div className="p-12 flex flex-col items-center">
          <div className="relative w-56 h-56 mb-8">
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={status === 'alert' ? '#ef4444' : hours >= MAX_HOURS - 1 ? '#f59e0b' : '#10b981'}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>
            {/* Time Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className={`text-5xl font-black font-mono ${
                status === 'alert' ? 'text-red-600' : hours >= MAX_HOURS - 1 ? 'text-amber-600' : 'text-slate-800'
              }`}>
                {formatTime(elapsed)}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {status === 'alert' ? 'MELEBIHI BATAS!' : `Sisa: ${formatTime(remainingSeconds)}`}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>0:00</span>
              <span>2:00</span>
              <span className="text-amber-600 font-medium">3:30 (Waspada)</span>
              <span className="text-red-600 font-medium">4:00 (Batas)</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  status === 'alert' ? 'bg-red-500 animate-pulse' :
                  hours >= MAX_HOURS - 1 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          {/* Alert if exceeding */}
          {status === 'alert' && (
            <div className="mt-6 w-full max-w-md bg-red-50 border-2 border-red-300 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🚨</span>
                <div>
                  <p className="font-bold text-red-800">PERINGATAN: Melebihi Batas 4 Jam!</p>
                  <p className="text-sm text-red-600 mt-1">
                    Makanan telah melewati batas waktu produksi. Segera distribusi atau pertimbangkan pembuangan.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="mt-8 w-full max-w-lg">
            <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wide">Timeline Produksi</p>
            <div className="relative">
              <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 rounded" />
              <div
                className="absolute top-4 left-0 h-1 bg-emerald-500 rounded transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
              {[
                { time: '06:00', label: 'Mulai Produksi', done: true },
                { time: '06:00 - 08:30', label: 'Pengolahan', done: true },
                { time: '08:30 - 09:45', label: 'Pemorsian', done: true },
                { time: '09:45', label: 'Packing', done: false },
                { time: '10:00', label: 'Distribusi', done: false },
              ].map((item, idx) => (
                <div key={idx} className="relative flex items-center mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                    item.done ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {item.done ? '✓' : idx + 1}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${item.done ? 'text-emerald-700' : 'text-slate-400'}`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-slate-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            <p>Mulai: 06:00 WIB · Tanggal: 17 April 2026</p>
          </div>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            🖨️ Cetak Log
          </button>
        </div>
      </div>
    </div>
  );
}
