'use client';

import { useState } from 'react';

type Severity = 'Kritis' | 'Mayor' | 'Minor';
type Status = 'Open' | 'In Progress' | 'Closed';

interface KorektifEntry {
  id: string;
  tanggal: string;
  masalah: string;
  kategori: string;
  severity: Severity;
  lokasi: string;
  penyebab?: string;
  tindakan?: string;
  responsible?: string;
  dueDate?: string;
  status: Status;
  closedAt?: string;
  bukti?: string;
}

const DUMMY_KOREKTIF: KorektifEntry[] = [
  {
    id: 'KR-001',
    tanggal: '2026-04-17',
    masalah: 'Suhu Cold Room #2 = 7°C (batas max 5°C)',
    kategori: 'Suhu CCP',
    severity: 'Kritis',
    lokasi: 'Cold Room #2',
    penyebab: 'Kipas condenser tidak berfungsi normal sejak 16 April malam',
    tindakan: 'Memindahkan bahan ke Cold Room #1. Service kipas condenser dijadwalkan H+1.',
    responsible: 'Rudi Hermawan',
    dueDate: '2026-04-18',
    status: 'In Progress',
    bukti: '',
  },
  {
    id: 'KR-002',
    tanggal: '2026-04-16',
    masalah: 'Staf tidak menggunakan APD lengkap (tanpa apron)',
    kategori: 'Kesehatan & Higiene',
    severity: 'Mayor',
    lokasi: 'Area Pengolahan',
    penyebab: 'Apron cadangan sedang dicuci',
    tindakan: 'Apron cadangan telah diambil dari gudang. Seluruh staf diedukasi ulang.',
    responsible: 'Siti Rahmawati',
    dueDate: '2026-04-16',
    status: 'Closed',
    closedAt: '2026-04-16 15:30:00',
    bukti: '',
  },
  {
    id: 'KR-003',
    tanggal: '2026-04-15',
    masalah: 'Talenan ditemukan retak, risiko kontaminasi',
    kategori: 'Sanitasi Peralatan',
    severity: 'Mayor',
    lokasi: 'Area Persiapan',
    penyebab: 'Talenan tua yang sudah melewati masa pakai',
    tindakan: 'Talenan retak langsung dibuang. Diganti dengan talenan baru.',
    responsible: 'Rudi Hermawan',
    dueDate: '2026-04-15',
    status: 'Closed',
    closedAt: '2026-04-15 11:00:00',
    bukti: '',
  },
  {
    id: 'KR-004',
    tanggal: '2026-04-14',
    masalah: 'Terdapat kecoa kecil di near floor drain area',
    kategori: 'Pest Control',
    severity: 'Kritis',
    lokasi: 'Area Pencucian',
    penyebab: 'Pest control terakhir > 1 bulan lalu',
    tindakan: '呼叫 pest control vendor untuk treatment emergencia. Schedule rutin tiap 2 minggu.',
    responsible: 'Rudi Hermawan',
    dueDate: '2026-04-14',
    status: 'Closed',
    closedAt: '2026-04-14 17:00:00',
    bukti: '',
  },
  {
    id: 'KR-005',
    tanggal: '2026-04-13',
    masalah: 'Label营养 info pada box tidak tercetak sempurna',
    kategori: 'Label & Dokumentasi',
    severity: 'Minor',
    lokasi: 'Area Packing',
    tindakan: 'Label营养 info reprint dan verify sebelum distribusi.',
    responsible: 'Joko Pramono',
    dueDate: '2026-04-13',
    status: 'Closed',
    closedAt: '2026-04-13 09:30:00',
    bukti: '',
  },
];

export default function KorektifPage() {
  const [entries, setEntries] = useState<KorektifEntry[]>(DUMMY_KOREKTIF);
  const [filter, setFilter] = useState<Status | 'semua'>('semua');
  const [selectedEntry, setSelectedEntry] = useState<KorektifEntry | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState('');

  // New entry form
  const [newEntry, setNewEntry] = useState<Partial<KorektifEntry>>({
    masalah: '',
    kategori: '',
    severity: 'Mayor',
    lokasi: '',
    responsible: '',
    dueDate: '',
  });

  const filtered = entries.filter(e => {
    const matchStatus = filter === 'semua' || e.status === filter;
    const matchSearch = !search ||
      e.masalah.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase()) ||
      e.lokasi.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const openCount = entries.filter(e => e.status === 'Open').length;
  const inProgressCount = entries.filter(e => e.status === 'In Progress').length;
  const closedCount = entries.filter(e => e.status === 'Closed').length;

  const severityColor = (s: Severity) => ({
    'Kritis': 'bg-red-100 text-red-700 border-red-300',
    'Mayor': 'bg-amber-100 text-amber-700 border-amber-300',
    'Minor': 'bg-blue-100 text-blue-700 border-blue-300',
  }[s]);

  const statusColor = (s: Status) => ({
    'Open': 'bg-red-100 text-red-700',
    'In Progress': 'bg-amber-100 text-amber-700',
    'Closed': 'bg-emerald-100 text-emerald-700',
  }[s]);

  const handleAdd = () => {
    if (!newEntry.masalah || !newEntry.kategori || !newEntry.lokasi) return;
    const entry: KorektifEntry = {
      id: `KR-${String(entries.length + 1).padStart(3, '0')}`,
      tanggal: new Date().toISOString().split('T')[0],
      masalah: newEntry.masalah!,
      kategori: newEntry.kategori!,
      severity: (newEntry.severity || 'Mayor') as Severity,
      lokasi: newEntry.lokasi!,
      responsible: newEntry.responsible,
      dueDate: newEntry.dueDate,
      status: 'Open',
    };
    setEntries(prev => [entry, ...prev]);
    setShowAddForm(false);
    setNewEntry({ masalah: '', kategori: '', severity: 'Mayor', lokasi: '', responsible: '', dueDate: '' });
  };

  const handleStatusChange = (id: string, newStatus: Status) => {
    setEntries(prev => prev.map(e =>
      e.id === id ? {
        ...e,
        status: newStatus,
        closedAt: newStatus === 'Closed' ? new Date().toISOString().replace('T', ' ').slice(0, 19) : undefined,
      } : e
    ));
  };

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Tindakan Korektif</h1>
          <p className="text-sm text-slate-500">{entries.length} total</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
        >
          + Buat CAR
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Open', count: openCount, color: 'text-red-600 border-red-300' },
          { label: 'In Progress', count: inProgressCount, color: 'text-amber-600 border-amber-300' },
          { label: 'Closed', count: closedCount, color: 'text-emerald-600 border-emerald-300' },
          { label: 'Total', count: entries.length, color: 'text-slate-600 border-gray-300' },
        ].map(stat => (
          <div key={stat.label} className={`bg-white rounded-xl p-4 shadow-sm border-2 ${stat.color}`}>
            <p className="text-2xl font-black">{stat.count}</p>
            <p className="text-xs font-medium opacity-70">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari CAR number, masalah, atau lokasi..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <div className="flex gap-2">
          {(['semua', 'Open', 'In Progress', 'Closed'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                filter === s ? 'bg-red-600 text-white' : 'bg-white text-slate-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {s === 'semua' ? 'Semua' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Masalah</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Lokasi</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Severity</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Due Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Responsible</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-slate-400">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                filtered.map(entry => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm font-bold text-slate-700">{entry.id}</span>
                      <p className="text-xs text-slate-400">{entry.tanggal}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-slate-800 max-w-xs truncate">{entry.masalah}</p>
                      <p className="text-xs text-slate-400">{entry.kategori}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{entry.lokasi}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${severityColor(entry.severity)}`}>
                        {entry.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={entry.status}
                        onChange={e => handleStatusChange(entry.id, e.target.value as Status)}
                        className={`text-xs px-2 py-1 rounded-full font-semibold border-none cursor-pointer ${statusColor(entry.status)}`}
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{entry.dueDate || '-'}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{entry.responsible || '-'}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedEntry(entry)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-800">Buat CAR (Corrective Action Request)</h3>
              <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Masalah *</label>
                <textarea
                  value={newEntry.masalah}
                  onChange={e => setNewEntry(prev => ({ ...prev, masalah: e.target.value }))}
                  placeholder="Deskripsikan masalah yang ditemukan..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kategori *</label>
                  <select
                    value={newEntry.kategori}
                    onChange={e => setNewEntry(prev => ({ ...prev, kategori: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="">Pilih...</option>
                    <option value="Suhu CCP">Suhu CCP</option>
                    <option value="Kesehatan & Higiene">Kesehatan & Higiene</option>
                    <option value="Sanitasi Peralatan">Sanitasi Peralatan</option>
                    <option value="Pest Control">Pest Control</option>
                    <option value="Label & Dokumentasi">Label & Dokumentasi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Severity</label>
                  <select
                    value={newEntry.severity}
                    onChange={e => setNewEntry(prev => ({ ...prev, severity: e.target.value as Severity }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="Kritis">Kritis</option>
                    <option value="Mayor">Mayor</option>
                    <option value="Minor">Minor</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi *</label>
                <input
                  type="text"
                  value={newEntry.lokasi}
                  onChange={e => setNewEntry(prev => ({ ...prev, lokasi: e.target.value }))}
                  placeholder="Contoh: Cold Room #2, Area Pengolahan"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Responsible</label>
                  <input
                    type="text"
                    value={newEntry.responsible}
                    onChange={e => setNewEntry(prev => ({ ...prev, responsible: e.target.value }))}
                    placeholder="Nama penanggung jawab"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newEntry.dueDate}
                    onChange={e => setNewEntry(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleAdd}
                disabled={!newEntry.masalah || !newEntry.kategori || !newEntry.lokasi}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50"
              >
                Buat CAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="font-mono font-bold text-slate-700">{selectedEntry.id}</span>
                <p className="text-xs text-slate-400">{selectedEntry.tanggal}</p>
              </div>
              <div className="flex gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${severityColor(selectedEntry.severity)}`}>
                  {selectedEntry.severity}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColor(selectedEntry.status)}`}>
                  {selectedEntry.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                <p className="text-xs text-red-500 font-medium mb-1">MASALAH</p>
                <p className="text-slate-800 font-medium">{selectedEntry.masalah}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-slate-500">Kategori</p>
                  <p className="font-medium">{selectedEntry.kategori}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Lokasi</p>
                  <p className="font-medium">{selectedEntry.lokasi}</p>
                </div>
              </div>
              {selectedEntry.penyebab && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-xs text-amber-500 font-medium mb-1">PENYEBAB</p>
                  <p className="text-slate-700">{selectedEntry.penyebab}</p>
                </div>
              )}
              {selectedEntry.tindakan && (
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-xs text-blue-500 font-medium mb-1">TINDAKAN KOREKTIF</p>
                  <p className="text-slate-700">{selectedEntry.tindakan}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-slate-500">Responsible</p>
                  <p className="font-medium">{selectedEntry.responsible || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Due Date</p>
                  <p className="font-medium">{selectedEntry.dueDate || '-'}</p>
                </div>
              </div>
              {selectedEntry.closedAt && (
                <div>
                  <p className="text-xs text-slate-500">Closed At</p>
                  <p className="font-medium text-emerald-600">{selectedEntry.closedAt}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setSelectedEntry(null)}
                className="px-4 py-2 border border-gray-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Tutup
              </button>
              {selectedEntry.status !== 'Closed' && (
                <button
                  onClick={() => {
                    handleStatusChange(selectedEntry.id, 'Closed');
                    setSelectedEntry(null);
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
                >
                  ✓ Tutup CAR
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
