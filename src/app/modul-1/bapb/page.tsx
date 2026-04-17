'use client';

import { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { QRCodeSVG } from 'qrcode.react';
import type { Bahan, StatusPenerimaan, LokasiSimpan, JenisBahan } from '@/lib/types';

interface FormBahan extends Omit<Bahan, 'id'> {}

function generateBAPBNumber(date: Date, sequence: number): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const seq = String(sequence).padStart(3, '0');
  return `BAPB-${yyyy}-${mm}${dd}-${seq}`;
}

function generateLabelCode(date: Date, sequence: number): string {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yy = String(date.getFullYear()).slice(-2);
  const seq = String(sequence).padStart(3, '0');
  return `MBG-${mm}${yy}-${seq}`;
}

const LOKASI_OPTIONS: LokasiSimpan[] = ['Cold Room', 'Freezer', 'Rak Kering'];
const JENIS_OPTIONS: JenisBahan[] = ['Bantuan MBG', 'Mandiri'];
const KONDISI_OPTIONS: StatusPenerimaan[] = ['Layak', 'Rusak Ringan', 'Tidak Layak'];

export default function BAPBPage() {
  const today = new Date();
  const [bapbNumber] = useState(() => generateBAPBNumber(today, Math.floor(Math.random() * 900) + 100));
  const [tanggal, setTanggal] = useState(format(today, 'yyyy-MM-dd'));
  const [pemasok, setPemasok] = useState('');
  const [bahanList, setBahanList] = useState<FormBahan[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [previewLabels, setPreviewLabels] = useState<{ kode: string; bahan: FormBahan }[]>([]);

  // Form state for single bahan entry
  const [nama, setNama] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [satuan, setSatuan] = useState('kg');
  const [kondisi, setKondisi] = useState<StatusPenerimaan>('Layak');
  const [lokasi, setLokasi] = useState<LokasiSimpan>('Cold Room');
  const [jenis, setJenis] = useState<JenisBahan>('Bantuan MBG');
  const [tanggalExp, setTanggalExp] = useState('');
  const [suhu, setSuhu] = useState('');

  const addBahan = useCallback(() => {
    if (!nama || !jumlah || !tanggalExp) return;

    const newBahan: FormBahan = {
      nama,
      jumlah: parseFloat(jumlah),
      satuan,
      kondisi,
      lokasi,
      jenis,
      tanggalMasuk: tanggal,
      tanggalExp,
      suhu: lokasi !== 'Rak Kering' && suhu ? parseFloat(suhu) : undefined,
    };

    setBahanList(prev => [...prev, newBahan]);
    setNama('');
    setJumlah('');
    setSatuan('kg');
    setKondisi('Layak');
    setSuhu('');
  }, [nama, jumlah, satuan, kondisi, lokasi, jenis, tanggal, tanggalExp, suhu]);

  const removeBahan = (index: number) => {
    setBahanList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bahanList.length === 0 || !pemasok) return;

    // Generate label codes
    const labels = bahanList.map((bahan, i) => ({
      kode: generateLabelCode(today, 100 + i),
      bahan,
    }));

    setPreviewLabels(labels);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setBahanList([]);
    setPemasok('');
    setPreviewLabels([]);
  };

  if (submitted && previewLabels.length > 0) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">✅</span>
              <div>
                <h2 className="text-xl font-bold text-emerald-800">BAPB Berhasil Dibuat</h2>
                <p className="text-emerald-600">No. {bapbNumber}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
              >
                🖨️ Cetak BAPB
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-50 transition"
              >
                + BAPB Baru
              </button>
            </div>
          </div>

          {/* Labels Preview */}
          <h3 className="font-semibold text-slate-800 mb-4">Label Bahan ({previewLabels.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {previewLabels.map(({ kode, bahan }) => (
              <div
                key={kode}
                className={`rounded-xl p-5 border-2 ${
                  bahan.jenis === 'Bantuan MBG'
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-emerald-400 bg-emerald-50'
                }`}
              >
                <div className="flex gap-4">
                  {/* Label Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs px-2 py-1 rounded font-bold ${
                        bahan.jenis === 'Bantuan MBG'
                          ? 'bg-blue-500 text-white'
                          : 'bg-emerald-500 text-white'
                      }`}>
                        {bahan.jenis}
                      </span>
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                        {bahan.lokasi}
                      </span>
                    </div>
                    <h4 className="font-bold text-lg text-slate-800">{bahan.nama}</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      {bahan.jumlah} {bahan.satuan}
                    </p>
                    <div className="mt-2 text-xs text-slate-500 space-y-0.5">
                      <p>Masuk: {bahan.tanggalMasuk}</p>
                      <p>Exp: {bahan.tanggalExp}</p>
                      {bahan.suhu !== undefined && (
                        <p>Suhu: {bahan.suhu}°C</p>
                      )}
                    </div>
                    <div className="mt-3">
                      <p className="font-mono font-bold text-sm">{kode}</p>
                    </div>
                    <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                      bahan.kondisi === 'Layak' ? 'bg-emerald-200 text-emerald-800' :
                      bahan.kondisi === 'Rusak Ringan' ? 'bg-amber-200 text-amber-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {bahan.kondisi}
                    </span>
                  </div>
                  {/* QR Code */}
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-2 rounded-lg border border-gray-200">
                      <QRCodeSVG value={kode} size={80} />
                    </div>
                    <button
                      onClick={() => window.print()}
                      className="mt-2 text-xs text-blue-600 hover:underline"
                    >
                      Cetak Label
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BAPB Summary */}
          <div className="mt-6 bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-slate-800 mb-4">Ringkasan BAPB</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">No. BAPB</p>
                <p className="font-mono font-semibold">{bapbNumber}</p>
              </div>
              <div>
                <p className="text-slate-500">Tanggal</p>
                <p className="font-semibold">{tanggal}</p>
              </div>
              <div>
                <p className="text-slate-500">Pemasok</p>
                <p className="font-semibold">{pemasok}</p>
              </div>
              <div>
                <p className="text-slate-500">Jumlah Item</p>
                <p className="font-semibold">{bahanList.length} item</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Form BAPB Digital</h1>
        <div className="flex items-center gap-3 mt-1">
          <p className="text-sm text-slate-500">
            No. BAPB: <span className="font-mono font-semibold text-blue-600">{bapbNumber}</span>
          </p>
          <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium border border-red-300">
            🇮🇩 SK BGN No. 244/2025 & 63421/2026
          </span>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="max-w-5xl space-y-6">
        {/* Header Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">Informasi BAPB</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal</label>
              <input
                type="date"
                value={tanggal}
                onChange={e => setTanggal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Pemasok</label>
              <input
                type="text"
                value={pemasok}
                onChange={e => setPemasok(e.target.value)}
                placeholder="Contoh: CV Sumber Pangan Nusantara"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            {/* SK Reference Dropdown */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Referensi SK</label>
              <select
                value={jenis}
                onChange={e => setJenis(e.target.value as JenisBahan)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Bantuan MBG">SK 244/2025 — Bantuan MBG</option>
                <option value="Mandiri">SK 63421/2026 — Mandiri</option>
              </select>
              <p className="text-xs text-slate-400 mt-1">Pilih dasar hukum penerimaan</p>
            </div>
          </div>
        </div>

        {/* Add Bahan */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-slate-800 mb-4">Tambah Bahan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Nama Bahan</label>
              <input
                type="text"
                value={nama}
                onChange={e => setNama(e.target.value)}
                placeholder="Contoh: Beras"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Jumlah</label>
              <input
                type="number"
                value={jumlah}
                onChange={e => setJumlah(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Satuan</label>
              <select
                value={satuan}
                onChange={e => setSatuan(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="liter">liter</option>
                <option value="ml">ml</option>
                <option value="pcs">pcs</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Kondisi</label>
              <select
                value={kondisi}
                onChange={e => setKondisi(e.target.value as StatusPenerimaan)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {KONDISI_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Lokasi</label>
              <select
                value={lokasi}
                onChange={e => setLokasi(e.target.value as LokasiSimpan)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {LOKASI_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Jenis</label>
              <select
                value={jenis}
                onChange={e => setJenis(e.target.value as JenisBahan)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {JENIS_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Tgl Exp</label>
              <input
                type="date"
                value={tanggalExp}
                onChange={e => setTanggalExp(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            {lokasi !== 'Rak Kering' && (
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Suhu (°C)</label>
                <input
                  type="number"
                  value={suhu}
                  onChange={e => setSuhu(e.target.value)}
                  placeholder="-19"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}
          </div>
          <div className="mt-3">
            <button
              type="button"
              onClick={addBahan}
              disabled={!nama || !jumlah || !tanggalExp}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Tambah ke Daftar
            </button>
          </div>
        </div>

        {/* Bahan List */}
        {bahanList.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="font-semibold text-slate-800 mb-4">Daftar Bahan ({bahanList.length})</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b">
                  <th className="pb-2 font-medium">Nama</th>
                  <th className="pb-2 font-medium">Jumlah</th>
                  <th className="pb-2 font-medium">Kondisi</th>
                  <th className="pb-2 font-medium">Lokasi</th>
                  <th className="pb-2 font-medium">Jenis</th>
                  <th className="pb-2 font-medium">Tgl Exp</th>
                  <th className="pb-2 font-medium">Suhu</th>
                  <th className="pb-2 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {bahanList.map((bahan, idx) => (
                  <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3 text-sm font-medium text-slate-800">{bahan.nama}</td>
                    <td className="py-3 text-sm text-slate-600">
                      {bahan.jumlah} {bahan.satuan}
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        bahan.kondisi === 'Layak' ? 'bg-emerald-100 text-emerald-700' :
                        bahan.kondisi === 'Rusak Ringan' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {bahan.kondisi}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-slate-600">{bahan.lokasi}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        bahan.jenis === 'Bantuan MBG' ? 'bg-blue-100 text-blue-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {bahan.jenis}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-slate-600">{bahan.tanggalExp}</td>
                    <td className="py-3 text-sm text-slate-600">
                      {bahan.suhu !== undefined ? `${bahan.suhu}°C` : '-'}
                    </td>
                    <td className="py-3">
                      <button
                        type="button"
                        onClick={() => removeBahan(idx)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setBahanList([]);
              setPemasok('');
            }}
            className="px-4 py-2 border border-gray-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={bahanList.length === 0 || !pemasok}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Simpan BAPB & Generate Label
          </button>
        </div>
      </form>
    </div>
  );
}
