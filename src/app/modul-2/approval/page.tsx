'use client';

import { useState } from 'react';
import { dummyMenuHarian } from '@/lib/dummy-data';
import type { StatusApprovalMenu } from '@/lib/types';

interface ApprovalItem {
  id: string;
  tanggal: string;
  namaMenu: string;
  status: StatusApprovalMenu;
  approvedBy?: string;
  approvedAt?: string;
  notes?: string;
}

const WORKFLOW = ['Draft', 'Review', 'Disetujui', 'Ditolak'];

export default function ApprovalPage() {
  const [items, setItems] = useState<ApprovalItem[]>([
    {
      id: 'mh1',
      tanggal: '2026-04-17',
      namaMenu: 'Ikan Goreng + Capcay',
      status: 'Disetujui',
      approvedBy: 'Siti Rahmawati',
      approvedAt: '2026-04-16 14:00:00',
    },
    {
      id: 'mh2',
      tanggal: '2026-04-16',
      namaMenu: 'Ayam Goreng + Tumis Kangkung',
      status: 'Disetujui',
      approvedBy: 'Siti Rahmawati',
      approvedAt: '2026-04-15 14:00:00',
    },
    {
      id: 'mh3',
      tanggal: '2026-04-15',
      namaMenu: 'Telur Balado + Tahu Tempe',
      status: 'Disetujui',
      approvedBy: 'Siti Rahmawati',
      approvedAt: '2026-04-14 14:00:00',
    },
    {
      id: 'mh4',
      tanggal: '2026-04-18',
      namaMenu: 'Nasi Goreng + Acar',
      status: 'Review',
    },
    {
      id: 'mh5',
      tanggal: '2026-04-19',
      namaMenu: 'Daging Sapi + Sayuran',
      status: 'Draft',
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const approveItem = (item: ApprovalItem) => {
    setItems(prev => prev.map(i =>
      i.id === item.id
        ? { ...i, status: 'Disetujui', approvedBy: 'Ahmad Fauzi', approvedAt: new Date().toISOString().replace('T', ' ').slice(0, 19) }
        : i
    ));
    setSelectedItem(null);
  };

  const rejectItem = (item: ApprovalItem) => {
    if (!rejectReason) return;
    setItems(prev => prev.map(i =>
      i.id === item.id
        ? { ...i, status: 'Ditolak', notes: rejectReason, approvedBy: 'Ahmad Fauzi', approvedAt: new Date().toISOString().replace('T', ' ').slice(0, 19) }
        : i
    ));
    setSelectedItem(null);
    setRejectReason('');
  };

  const moveToReview = (item: ApprovalItem) => {
    setItems(prev => prev.map(i =>
      i.id === item.id ? { ...i, status: 'Review' } : i
    ));
  };

  const pendingCount = items.filter(i => i.status === 'Review').length;
  const draftCount = items.filter(i => i.status === 'Draft').length;
  const approvedCount = items.filter(i => i.status === 'Disetujui').length;
  const rejectedCount = items.filter(i => i.status === 'Ditolak').length;

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Approval Workflow</h1>
        <p className="text-sm text-slate-700">Draft → Review → Disetujui / Ditolak</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Draft', count: draftCount, color: 'bg-gray-100 text-gray-600', border: 'border-gray-300' },
          { label: 'Review Gizi', count: pendingCount, color: 'bg-blue-100 text-blue-700', border: 'border-blue-300' },
          { label: 'Disetujui', count: approvedCount, color: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-300' },
          { label: 'Ditolak', count: rejectedCount, color: 'bg-red-100 text-red-700', border: 'border-red-300' },
        ].map(stat => (
          <div key={stat.label} className={`bg-white rounded-xl p-4 shadow-sm border-2 ${stat.border}`}>
            <p className={`text-2xl font-bold ${stat.color.replace('bg-', 'text-')}`}>{stat.count}</p>
            <p className="text-sm text-slate-700 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Workflow Diagram */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <h2 className="font-semibold text-slate-800 mb-4">Alur Approval</h2>
        <div className="flex items-center justify-center gap-4">
          {WORKFLOW.map((step, idx) => {
            const itemCount = items.filter(i => i.status === step).length;
            const isActive = itemCount > 0;
            const color = step === 'Draft' ? 'bg-gray-400' :
              step === 'Review' ? 'bg-blue-500' :
              step === 'Disetujui' ? 'bg-emerald-500' : 'bg-red-500';
            return (
              <div key={step} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${isActive ? color : 'bg-gray-300'}`}>
                  {idx + 1}
                </div>
                <div className="ml-3 text-center">
                  <p className={`text-sm font-semibold ${isActive ? 'text-slate-800' : 'text-slate-600'}`}>{step}</p>
                  <p className={`text-xs ${isActive ? 'text-slate-700' : 'text-gray-600'}`}>{itemCount} item</p>
                </div>
                {idx < WORKFLOW.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${isActive ? 'bg-gray-300' : 'bg-gray-100'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pending Items */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200 bg-slate-50">
          <h2 className="font-semibold text-slate-800">Menu Menunggu Approval ({pendingCount})</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {items.filter(i => i.status === 'Review').length === 0 ? (
            <div className="py-12 text-center text-slate-600">
              <span className="text-4xl">✅</span>
              <p className="mt-2">Tidak ada menu menunggu approval</p>
            </div>
          ) : (
            items.filter(i => i.status === 'Review').map(item => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-blue-500" />
                      <p className="font-semibold text-slate-800">{item.namaMenu}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-700">
                      <span>📅 {item.tanggal}</span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        Review Gizi
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => approveItem(item)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
                    >
                      ✓ Setujui
                    </button>
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
                    >
                      ✕ Tolak
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Reject Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="font-bold text-lg text-slate-800 mb-2">Tolak Menu</h3>
            <p className="text-sm text-slate-700 mb-4">
              Menu: <strong>{selectedItem.namaMenu}</strong>
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Alasan Penolakan</label>
              <textarea
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="Contoh: Kombinasi gizi tidak sesuai, menu terlalu pedas..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                rows={3}
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setSelectedItem(null); setRejectReason(''); }}
                className="px-4 py-2 border border-gray-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                onClick={() => rejectItem(selectedItem)}
                disabled={!rejectReason}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition disabled:opacity-50"
              >
                Konfirmasi Tolak
              </button>
            </div>
          </div>
        </div>
      )}

      {/* All Items */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-slate-50">
          <h2 className="font-semibold text-slate-800">Semua Menu</h2>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-700 uppercase">Menu</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-700 uppercase">Tanggal</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-700 uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-700 uppercase">Approved By</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-700 uppercase">Catatan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-800">{item.namaMenu}</p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{item.tanggal}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    item.status === 'Disetujui' ? 'bg-emerald-100 text-emerald-700' :
                    item.status === 'Review' ? 'bg-blue-100 text-blue-700' :
                    item.status === 'Ditolak' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {item.approvedBy || '-'}
                  {item.approvedAt && (
                    <p className="text-xs text-slate-600">{item.approvedAt}</p>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {item.notes ? (
                    <span className="text-red-600">{item.notes}</span>
                  ) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
