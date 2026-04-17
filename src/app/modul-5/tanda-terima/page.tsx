'use client';

import { useState } from 'react';
import Link from 'next/link';
import { dummyTandaTerima } from '@/lib/dummy-data';

export default function TandaTerimaPage() {
  const [showForm, setShowForm] = useState(false);
  const tandaTerima = dummyTandaTerima;

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/modul-5" className="text-sm text-teal-600 hover:text-teal-700">← Modul 5</Link>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Tanda Terima Distribusi</h1>
          <p className="text-sm text-slate-500 mt-1">Selasa, 17 April 2026 • Kelola bukti serah terima makanan</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          {showForm ? '✕ Tutup Form' : '+ Buat Tanda Terima'}
        </button>
      </header>

      {/* Form Section */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <h2 className="font-semibold text-slate-800 mb-4">Form Tanda Terima Baru</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Penerima</label>
              <input
                type="text"
                placeholder="Nama penanggung jawab tujuan"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Rute / Tujuan</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>SDN 05 Menteng</option>
                <option>SMPN 12</option>
                <option>Panti Al-Hidayah</option>
                <option>SDN 08 Cikini</option>
                <option>SMAN 3 Gambir</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Jumlah Box Dikirim</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Jumlah Box Diterima</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kondisi</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Baik</option>
                <option>Rusak</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Waktu Terima</label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Upload Foto Bukti</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-400 transition">
              <span className="text-3xl">📷</span>
              <p className="text-sm text-slate-500 mt-2">Klik untuk upload atau drag & drop</p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG hingga 5MB</p>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Tanda Tangan Digital</label>
            <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 text-center">
              <p className="text-sm text-slate-500">Area tanda tangan</p>
              <p className="text-xs text-slate-400 mt-1">Gambar tanda tangan atau ketik nama</p>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition">
              ✓ Simpan Tanda Terima
            </button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Total Tanda Terima</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{tandaTerima.length}</p>
          <p className="text-xs text-slate-400 mt-1">dokumen</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Baik</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">
            {tandaTerima.filter(t => t.kondisi === 'Baik').length}
          </p>
          <p className="text-xs text-slate-400 mt-1">box</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Rusak</p>
          <p className="text-3xl font-bold text-red-600 mt-1">
            {tandaTerima.filter(t => t.kondisi === 'Rusak').length}
          </p>
          <p className="text-xs text-slate-400 mt-1">box</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-slate-500">Total Box Diterima</p>
          <p className="text-3xl font-bold text-teal-600 mt-1">
            {tandaTerima.reduce((sum, t) => sum + t.jumlahBoxDiterima, 0)}
          </p>
          <p className="text-xs text-slate-400 mt-1">box hari ini</p>
        </div>
      </div>

      {/* Tanda Terima Table */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="font-semibold text-slate-800 mb-4">Daftar Tanda Terima</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-600">No</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Nama Penerima</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Tujuan</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Box Dikirim</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Box Diterima</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Kondisi</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Waktu Terima</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tandaTerima.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    <span className="text-3xl">📋</span>
                    <p className="mt-2">Belum ada data tanda terima</p>
                  </td>
                </tr>
              ) : (
                tandaTerima.map((tt, idx) => (
                  <tr key={tt.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-slate-500">{idx + 1}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{tt.namaPenerima}</td>
                    <td className="py-3 px-4 text-slate-600">{tt.ruteId}</td>
                    <td className="py-3 px-4 text-slate-600">{tt.jumlahBoxDikirim}</td>
                    <td className="py-3 px-4 text-slate-600">{tt.jumlahBoxDiterima}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                        tt.kondisi === 'Baik' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {tt.kondisi === 'Baik' ? '✓' : '⚠️'} {tt.kondisi}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{tt.waktuTerima}</td>
                    <td className="py-3 px-4">
                      <button className="text-teal-600 hover:text-teal-700 text-xs font-medium">
                        📄 Detail
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Signature Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mt-6">
        <h2 className="font-semibold text-slate-800 mb-4">Template Tanda Terima</h2>
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <div className="text-center mb-6">
            <p className="text-xs text-slate-500 uppercase tracking-wider">TANDA TERIMA</p>
            <p className="text-lg font-bold text-slate-800 mt-1">Program Makan Bergizi Gratis (MBG)</p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-slate-500 mb-1">Nama Penerima:</p>
              <p className="font-medium text-slate-800 border-b border-gray-300 pb-1">_______________________</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Jabatan:</p>
              <p className="font-medium text-slate-800 border-b border-gray-300 pb-1">_______________________</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Jumlah Box Diterima:</p>
              <p className="font-medium text-slate-800 border-b border-gray-300 pb-1">___________ box</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Kondisi Makanan:</p>
              <p className="font-medium text-slate-800 border-b border-gray-300 pb-1">___________</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="text-center">
              <p className="text-sm text-slate-500 mb-8">Pemberi Layanan</p>
              <p className="font-medium text-slate-800 border-t border-gray-300 pt-2">_______________________</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 mb-8">Penerima</p>
              <p className="font-medium text-slate-800 border-t border-gray-300 pt-2">_______________________</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}