'use client';

import { useState, useMemo } from 'react';
import { dummyBahan } from '@/lib/dummy-data';
import type { LokasiSimpan, JenisBahan, StatusPenerimaan } from '@/lib/types';
import { differenceInDays } from 'date-fns';

type FilterLokasi = LokasiSimpan | 'Semua';
type FilterJenis = JenisBahan | 'Semua';
type FilterKondisi = StatusPenerimaan | 'Semua';

export default function StokPage() {
  const [filterLokasi, setFilterLokasi] = useState<FilterLokasi>('Semua');
  const [filterJenis, setFilterJenis] = useState<FilterJenis>('Semua');
  const [filterKondisi, setFilterKondisi] = useState<FilterKondisi>('Semua');
  const [search, setSearch] = useState('');
  const [showAlertOnly, setShowAlertOnly] = useState(false);

  const today = new Date();

  const filteredBahan = useMemo(() => {
    return dummyBahan.filter(bahan => {
      if (filterLokasi !== 'Semua' && bahan.lokasi !== filterLokasi) return false;
      if (filterJenis !== 'Semua' && bahan.jenis !== filterJenis) return false;
      if (filterKondisi !== 'Semua' && bahan.kondisi !== filterKondisi) return false;
      if (search && !bahan.nama.toLowerCase().includes(search.toLowerCase())) return false;
      if (showAlertOnly) {
        const daysUntil = differenceInDays(new Date(bahan.tanggalExp), today);
        if (daysUntil > 3) return false;
      }
      return true;
    });
  }, [filterLokasi, filterJenis, filterKondisi, search, showAlertOnly]);

  const getDaysUntilExp = (tanggalExp: string) => {
    return differenceInDays(new Date(tanggalExp), today);
  };

  const getExpBadge = (tanggalExp: string) => {
    const days = getDaysUntilExp(tanggalExp);
    if (days < 0) return { text: 'Kadaluarsa', class: 'bg-red-100 text-red-700' };
    if (days <= 3) return { text: `H-${days}`, class: 'bg-amber-100 text-amber-700' };
    if (days <= 7) return { text: `H-${days}`, class: 'bg-yellow-100 text-yellow-700' };
    return { text: `${days} hari`, class: 'bg-emerald-100 text-emerald-700' };
  };

  const bantuanMBG = dummyBahan.filter(b => b.jenis === 'Bantuan MBG');
  const mandiri = dummyBahan.filter(b => b.jenis === 'Mandiri');

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Daftar Stok Bahan</h1>
          <p className="text-sm text-slate-500">{filteredBahan.length} dari {dummyBahan.length} item</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            🔵 Bantuan MBG: {bantuanMBG.length}
          </span>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
            🟢 Mandiri: {mandiri.length}
          </span>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari nama bahan..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select
            value={filterLokasi}
            onChange={e => setFilterLokasi(e.target.value as FilterLokasi)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Semua">Semua Lokasi</option>
            <option value="Cold Room">Cold Room</option>
            <option value="Freezer">Freezer</option>
            <option value="Rak Kering">Rak Kering</option>
          </select>
          <select
            value={filterJenis}
            onChange={e => setFilterJenis(e.target.value as FilterJenis)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Semua">Semua Jenis</option>
            <option value="Bantuan MBG">Bantuan MBG</option>
            <option value="Mandiri">Mandiri</option>
          </select>
          <select
            value={filterKondisi}
            onChange={e => setFilterKondisi(e.target.value as FilterKondisi)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Semua">Semua Kondisi</option>
            <option value="Layak">Layak</option>
            <option value="Rusak Ringan">Rusak Ringan</option>
            <option value="Tidak Layak">Tidak Layak</option>
          </select>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={showAlertOnly}
              onChange={e => setShowAlertOnly(e.target.checked)}
              className="w-4 h-4 accent-amber-500"
            />
            H-3 Kadaluarsa
          </label>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-slate-600">Bahan Bantuan MBG</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-600">Bahan Mandiri</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-600">&gt;7 hari expiry</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-slate-600">4-7 hari expiry</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-slate-600">1-3 hari expiry</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-slate-600">Kadaluarsa / H-0</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
          <thead className="bg-slate-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Bahan
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Jumlah
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Lokasi
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Jenis
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Kondisi
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Suhu
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Kadaluarsa
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Sisa Waktu
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBahan.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-slate-400">
                  Tidak ada data yang sesuai filter
                </td>
              </tr>
            ) : (
              filteredBahan.map((bahan) => {
                const expBadge = getExpBadge(bahan.tanggalExp);
                const daysUntil = getDaysUntilExp(bahan.tanggalExp);
                const expBgClass = daysUntil < 0 ? 'bg-red-500' :
                  daysUntil <= 3 ? 'bg-amber-500' :
                  daysUntil <= 7 ? 'bg-yellow-500' : 'bg-emerald-500';

                return (
                  <tr
                    key={bahan.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${
                      bahan.jenis === 'Bantuan MBG' ? 'bg-blue-50/30' : 'bg-emerald-50/30'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-10 rounded-full ${expBgClass}`} />
                        <div>
                          <p className="font-semibold text-slate-800">{bahan.nama}</p>
                          <p className="text-xs text-slate-400">ID: {bahan.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-slate-700">
                        {bahan.jumlah} {bahan.satuan}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-slate-600">
                        {bahan.lokasi === 'Cold Room' && '❄️'}
                        {bahan.lokasi === 'Freezer' && '🧊'}
                        {bahan.lokasi === 'Rak Kering' && '📪'}
                        {' '}{bahan.lokasi}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${
                        bahan.jenis === 'Bantuan MBG'
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          bahan.jenis === 'Bantuan MBG' ? 'bg-blue-500' : 'bg-emerald-500'
                        }`} />
                        {bahan.jenis}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        bahan.kondisi === 'Layak' ? 'bg-emerald-100 text-emerald-700' :
                        bahan.kondisi === 'Rusak Ringan' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {bahan.kondisi}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-medium ${
                        bahan.suhu !== undefined
                          ? Math.abs(bahan.suhu) > 5
                            ? 'text-amber-600'
                            : 'text-slate-700'
                          : 'text-slate-400'
                      }`}>
                        {bahan.suhu !== undefined ? `${bahan.suhu}°C` : '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-slate-600">{bahan.tanggalExp}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded font-semibold ${expBadge.class}`}>
                        {expBadge.text}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
