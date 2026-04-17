'use client';

import { useState, useMemo } from 'react';
import { format } from 'date-fns';

interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  modul: string;
  user: string;
  detail: string;
  before?: string;
  after?: string;
}

const DUMMY_AUDIT: AuditEntry[] = [
  {
    id: 'a1',
    timestamp: '2026-04-17 09:30:00',
    action: 'UPDATE_STOK',
    modul: 'Modul 1 - Inventori',
    user: 'Rudi Hermawan',
    detail: 'Pengurangan stok Beras 100kg → 75kg (produksi harian)',
    before: '100 kg',
    after: '75 kg',
  },
  {
    id: 'a2',
    timestamp: '2026-04-17 08:45:00',
    action: 'CREATE_BAPB',
    modul: 'Modul 1 - BAPB',
    user: 'Rudi Hermawan',
    detail: 'BAPB-2026-0417-001 dari CV Sumber Pangan Nusantara disetujui',
    before: undefined,
    after: 'BAPB-2026-0417-001',
  },
  {
    id: 'a3',
    timestamp: '2026-04-17 08:00:00',
    action: 'CREATE_LABEL',
    modul: 'Modul 1 - Label',
    user: 'Rudi Hermawan',
    detail: 'Label MBG-0426-003生成 untuk Ikan 30kg',
    before: undefined,
    after: 'MBG-0426-003',
  },
  {
    id: 'a4',
    timestamp: '2026-04-16 16:00:00',
    action: 'UPDATE_STOK',
    modul: 'Modul 1 - Inventori',
    user: 'Dewi Kusuma',
    detail: 'Penambahan stok Ayam 80kg (BAPB-2026-0416-001)',
    before: '0 kg',
    after: '80 kg',
  },
  {
    id: 'a5',
    timestamp: '2026-04-16 15:30:00',
    action: 'APPROVE_MENU',
    modul: 'Modul 2 - Menu',
    user: 'Siti Rahmawati',
    detail: 'Menu Ikan Goreng + Capcay untuk 2026-04-17 disetujui',
    before: 'Draft',
    after: 'Disetujui',
  },
  {
    id: 'a6',
    timestamp: '2026-04-16 14:00:00',
    action: 'ALERT_KADALUARSA',
    modul: 'Modul 1 - Alert',
    user: 'Sistem',
    detail: 'Wortel 15kg akan kadaluarsa dalam 3 hari (2026-04-20)',
    before: undefined,
    after: undefined,
  },
  {
    id: 'a7',
    timestamp: '2026-04-16 10:00:00',
    action: 'UPDATE_STATUS',
    modul: 'Modul 5 - Distribusi',
    user: 'Joko Pramono',
    detail: 'Status distribusi SDN 05 Menteng berubah ke Terkirim',
    before: 'Dalam Perjalanan',
    after: 'Terkirim',
  },
  {
    id: 'a8',
    timestamp: '2026-04-15 16:30:00',
    action: 'CREATE_LPJ',
    modul: 'Modul 6 - LPJ',
    user: 'Budi Santoso',
    detail: 'LPJ Bulan Maret 2026 dibuat dan masuk review',
    before: undefined,
    after: 'LPJ-Maret-2026',
  },
];

const ACTION_CONFIG: Record<string, { label: string; icon: string; color: string }> = {
  CREATE_BAPB: { label: 'BAPB Baru', icon: '📝', color: 'bg-blue-100 text-blue-700' },
  CREATE_LABEL: { label: 'Label Baru', icon: '🏷️', color: 'bg-purple-100 text-purple-700' },
  UPDATE_STOK: { label: 'Update Stok', icon: '📦', color: 'bg-amber-100 text-amber-700' },
  APPROVE_MENU: { label: 'Approval', icon: '✅', color: 'bg-emerald-100 text-emerald-700' },
  ALERT_KADALUARSA: { label: 'Alert Expired', icon: '⚠️', color: 'bg-red-100 text-red-700' },
  UPDATE_STATUS: { label: 'Update Status', icon: '🔄', color: 'bg-cyan-100 text-cyan-700' },
  CREATE_LPJ: { label: 'LPJ Baru', icon: '📋', color: 'bg-indigo-100 text-indigo-700' },
};

export default function AuditPage() {
  const [filterAction, setFilterAction] = useState<string>('Semua');
  const [filterModul, setFilterModul] = useState<string>('Semua');
  const [filterUser, setFilterUser] = useState<string>('Semua');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const users = useMemo(() => [...new Set(DUMMY_AUDIT.map(a => a.user))], []);
  const moduls = useMemo(() => [...new Set(DUMMY_AUDIT.map(a => a.modul))], []);

  const filteredAudit = useMemo(() => {
    return DUMMY_AUDIT.filter(entry => {
      if (filterAction !== 'Semua' && entry.action !== filterAction) return false;
      if (filterModul !== 'Semua' && entry.modul !== filterModul) return false;
      if (filterUser !== 'Semua' && entry.user !== filterUser) return false;
      if (dateFrom && entry.timestamp < dateFrom) return false;
      if (dateTo && entry.timestamp > dateTo + ' 23:59:59') return false;
      return true;
    });
  }, [filterAction, filterModul, filterUser, dateFrom, dateTo]);

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Audit Trail</h1>
        <p className="text-sm text-slate-500">
          {filteredAudit.length} dari {DUMMY_AUDIT.length} aktivitas
        </p>
      </header>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterAction}
            onChange={e => setFilterAction(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Semua">Semua Aksi</option>
            {Object.keys(ACTION_CONFIG).map(action => (
              <option key={action} value={action}>{ACTION_CONFIG[action].label}</option>
            ))}
          </select>
          <select
            value={filterModul}
            onChange={e => setFilterModul(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Semua">Semua Modul</option>
            {moduls.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select
            value={filterUser}
            onChange={e => setFilterUser(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Semua">Semua User</option>
            {users.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>From:</span>
            <input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span>To:</span>
            <input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          {(filterAction !== 'Semua' || filterModul !== 'Semua' || filterUser !== 'Semua' || dateFrom || dateTo) && (
            <button
              onClick={() => {
                setFilterAction('Semua');
                setFilterModul('Semua');
                setFilterUser('Semua');
                setDateFrom('');
                setDateTo('');
              }}
              className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="divide-y divide-gray-100">
          {filteredAudit.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <span className="text-4xl">📋</span>
              <p className="mt-2">Tidak ada aktivitas yang sesuai filter</p>
            </div>
          ) : (
            filteredAudit.map((entry, idx) => {
              const config = ACTION_CONFIG[entry.action] || { label: entry.action, icon: '📋', color: 'bg-gray-100 text-gray-700' };
              return (
                <div key={entry.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex gap-4">
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${config.color}`}>
                        {config.icon}
                      </div>
                      {idx < filteredAudit.length - 1 && (
                        <div className="w-0.5 flex-1 bg-gray-200 my-1" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.color}`}>
                              {config.label}
                            </span>
                            <span className="text-xs text-slate-400">{entry.modul}</span>
                          </div>
                          <p className="text-sm text-slate-700 mt-1">{entry.detail}</p>

                          {entry.before && entry.after && (
                            <div className="flex items-center gap-2 mt-2 text-xs">
                              <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded">
                                Before: {entry.before}
                              </span>
                              <span className="text-slate-400">→</span>
                              <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded">
                                After: {entry.after}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs text-slate-500">{entry.timestamp}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{entry.user}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
