'use client';

import { useState } from 'react';
import { dummyLPJ } from '@/lib/dummy-data';

type KategoriDokumentasi = 'Produksi' | 'Packing' | 'Distribusi';

export default function DokumentasiPage() {
  const lpj = dummyLPJ;
  const [selectedKategori, setSelectedKategori] = useState<KategoriDokumentasi>('Produksi');
  const [uploadPreview, setUploadPreview] = useState<string[]>([]);

  const KATEGORI: KategoriDokumentasi[] = ['Produksi', 'Packing', 'Distribusi'];

  const currentDocs = lpj.dokumentasi.find(d => d.kategori === selectedKategori);

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dokumentasi</h1>
          <p className="text-sm text-slate-700 mt-1">Kelola foto dokumentasi kegiatan MBG</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            📤 Upload Foto
          </button>
          <button className="px-4 py-2 bg-gray-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition border border-gray-300">
            🖨️ Cetak Laporan
          </button>
        </div>
      </header>

      {/* Kategori Tabs */}
      <div className="flex gap-2 mb-6">
        {KATEGORI.map(kategori => (
          <button
            key={kategori}
            onClick={() => setSelectedKategori(kategori)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              selectedKategori === kategori
                ? 'bg-violet-600 text-white'
                : 'bg-white text-slate-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span>
              {kategori === 'Produksi' ? '🍳' : kategori === 'Packing' ? '📦' : '🚚'}
            </span>
            {kategori}
            <span className={`px-1.5 py-0.5 rounded-full text-xs ${
              selectedKategori === kategori
                ? 'bg-violet-500 text-white'
                : 'bg-gray-100 text-slate-600'
            }`}>
              {lpj.dokumentasi.find(d => d.kategori === kategori)?.foto.length || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          <div className="text-4xl mb-3">📷</div>
          <p className="text-slate-700 font-medium">Tarik & letakkan foto di sini</p>
          <p className="text-sm text-slate-700 mt-1">atau klik untuk pilih file</p>
          <p className="text-xs text-slate-600 mt-2">Format: JPG, PNG, WebP • Maks 5MB per foto</p>
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800">
            📸 Dokumentasi {selectedKategori}
            <span className="ml-2 text-sm text-slate-700 font-normal">
              ({currentDocs?.foto.length || 0} foto)
            </span>
          </h2>
          <button className="px-3 py-1.5 bg-gray-100 text-slate-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition border border-gray-300">
            🗑️ Hapus Terpilih
          </button>
        </div>

        {currentDocs?.foto && currentDocs.foto.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentDocs.foto.map((foto, idx) => (
              <div key={idx} className="group relative">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-36 flex items-center justify-center text-sm text-gray-500 hover:border-violet-400 cursor-pointer transition">
                  <span>📷 {foto.split('/').pop()}</span>
                </div>
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                </div>
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition">
                  <button className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-600">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-slate-700">Belum ada foto dokumentasi untuk kategori ini</p>
            <p className="text-xs text-slate-600 mt-1">Upload foto terlebih dahulu</p>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-violet-50 rounded-xl p-4 border border-violet-200">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <p className="text-sm font-semibold text-violet-800">Panduan Dokumentasi</p>
            <ul className="text-xs text-violet-700 mt-2 space-y-1 list-disc list-inside">
              <li>Dokumentasi Produksi: Foto dapur, proses memasak, kondisi bahan</li>
              <li>Dokumentasi Packing: Foto pengemasan, labeling, thermo box</li>
              <li>Dokumentasi Distribusi: Foto perjalanan, penerimaan di tujuan</li>
              <li>Semua foto harus disertai keterangan tanggal dan lokasi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}