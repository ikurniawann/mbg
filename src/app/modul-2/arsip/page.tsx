'use client';

import { useState } from 'react';

interface RevisionEntry {
  id: string;
  tanggal: string;
  menuAwal: string;
  menuRevisi: string;
  alasan: string;
  user: string;
  approvedBy?: string;
  status: 'Disetujui' | 'Ditolak';
}

const DUMMY_REVISI: RevisionEntry[] = [
  {
    id: 'rev1',
    tanggal: '2026-04-15',
    menuAwal: 'Nasi Goreng + Acar',
    menuRevisi: 'Ayam Goreng + Tumis Kangkung',
    alasan: 'Ikan tongkol kosong stok di supplier. Diganti dengan ayam yang tersedia.',
    user: 'Siti Rahmawati',
    approvedBy: 'Ahmad Fauzi',
    status: 'Disetujui',
  },
  {
    id: 'rev2',
    tanggal: '2026-04-12',
    menuAwal: 'Telur Balado + Tahu Tempe',
    menuRevisi: 'Telur Rebus + Tempe Goreng',
    alasan: 'Tomat tidak tersedia, tomat balado tidak bisa dibuat.',
    user: 'Siti Rahmawati',
    approvedBy: 'Ahmad Fauzi',
    status: 'Disetujui',
  },
  {
    id: 'rev3',
    tanggal: '2026-04-10',
    menuAwal: 'Daging Sapi + Sayuran',
    menuRevisi: 'Ayam + Kentang',
    alasan: 'Daging sapi di freezer tidak合格 (bau). Diketahui saat dicek QC.',
    user: 'Siti Rahmawati',
    approvedBy: 'Ahmad Fauzi',
    status: 'Disetujui',
  },
  {
    id: 'rev4',
    tanggal: '2026-04-08',
    menuAwal: 'Ikan Bakar + Lalapan',
    menuRevisi: 'Ikan Goreng + Capcay',
    alasan: 'Pembelian ikan tidak sampai.供应商 delivery 50% dari order.',
    user: 'Siti Rahmawati',
    status: 'Disetujui',
  },
  {
    id: 'rev5',
    tanggal: '2026-04-05',
    menuAwal: 'Soto Ayam',
    menuRevisi: 'Soto Ayam + Nasi',
    alasan: 'Timbangan beras rusak, tidak bisa ukur porsi. Ditambahkan nasi tetap.',
    user: 'Siti Rahmawati',
    approvedBy: 'Ahmad Fauzi',
    status: 'Disetujui',
  },
];

export default function ArsipPage() {
  const [search, setSearch] = useState('');
  const [selectedRev, setSelectedRev] = useState<RevisionEntry | null>(null);

  const filtered = DUMMY_REVISI.filter(r =>
    r.menuAwal.toLowerCase().includes(search.toLowerCase()) ||
    r.menuRevisi.toLowerCase().includes(search.toLowerCase()) ||
    r.alasan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Arsip Revisi Menu</h1>
          <p className="text-sm text-slate-500">{DUMMY_REVISI.length} revisi tercatat</p>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Total Revisi</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{DUMMY_REVISI.length}</p>
          <p className="text-xs text-slate-400 mt-1">bulan ini</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Disetujui</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">
            {DUMMY_REVISI.filter(r => r.status === 'Disetujui').length}
          </p>
          <p className="text-xs text-slate-400 mt-1">revisi</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Paling Sering Diganti</p>
          <p className="text-lg font-bold text-red-600 mt-1">Ikan Goreng</p>
          <p className="text-xs text-slate-400 mt-1">3 kali penggantian</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari menu awal, menu revisi, atau alasan..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Revision List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Tanggal</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Menu Awal</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Menu Revisi</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Alasan</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">User</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    Tidak ada hasil pencarian
                  </td>
                </tr>
              ) : (
                filtered.map(rev => (
                  <tr key={rev.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-slate-600">{rev.tanggal}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-400 line-through">{rev.menuAwal}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-800">→ {rev.menuRevisi}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 max-w-xs truncate">{rev.alasan}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-700">{rev.user}</p>
                      {rev.approvedBy && (
                        <p className="text-xs text-slate-400">Aprv: {rev.approvedBy}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        rev.status === 'Disetujui'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {rev.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedRev(rev)}
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

      {/* Detail Modal */}
      {selectedRev && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-800">Detail Revisi</h3>
              <button
                onClick={() => setSelectedRev(null)}
                className="text-slate-400 hover:text-slate-600 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">ID Revisi</p>
                  <p className="font-mono font-semibold">{selectedRev.id}</p>
                </div>
                <div>
                  <p className="text-slate-500">Tanggal</p>
                  <p className="font-semibold">{selectedRev.tanggal}</p>
                </div>
              </div>

              <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="text-xs text-red-500 font-medium mb-1">MENU AWAL (DITUKAR)</p>
                <p className="font-semibold text-slate-800">{selectedRev.menuAwal}</p>
              </div>

              <div className="flex justify-center">
                <span className="text-2xl text-slate-400">↓</span>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <p className="text-xs text-emerald-600 font-medium mb-1">MENU REVISI (BARU)</p>
                <p className="font-semibold text-slate-800">{selectedRev.menuRevisi}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 font-medium mb-1">ALASAN REVISI</p>
                <p className="text-sm text-slate-700">{selectedRev.alasan}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Diminta oleh</p>
                  <p className="font-semibold">{selectedRev.user}</p>
                </div>
                <div>
                  <p className="text-slate-500">Disetujui oleh</p>
                  <p className="font-semibold">{selectedRev.approvedBy || '-'}</p>
                </div>
              </div>

              <div>
                <p className="text-slate-500 text-sm">Status</p>
                <span className={`inline-block mt-1 text-xs px-3 py-1 rounded-full font-medium ${
                  selectedRev.status === 'Disetujui'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {selectedRev.status}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setSelectedRev(null)}
                className="px-4 py-2 border border-gray-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                Tutup
              </button>
              <button
                onClick={() => alert('Fitur export PDF coming soon')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                📄 Export PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
