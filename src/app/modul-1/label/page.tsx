'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { LokasiSimpan, JenisBahan } from '@/lib/types';

function generateLabelCode(jenis: JenisBahan): string {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yy = String(now.getFullYear()).slice(-2);
  const seq = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
  return `MBG-${mm}${yy}-${seq}`;
}

interface LabelData {
  kode: string;
  nama: string;
  jumlah: number;
  satuan: string;
  lokasi: LokasiSimpan;
  jenis: JenisBahan;
  tanggalExp: string;
}

export default function LabelPage() {
  const [labels, setLabels] = useState<LabelData[]>([]);
  const [form, setForm] = useState({
    nama: '',
    jumlah: '',
    satuan: 'kg',
    lokasi: 'Cold Room' as LokasiSimpan,
    jenis: 'Bantuan MBG' as JenisBahan,
    tanggalExp: '',
  });
  const [selectedLabel, setSelectedLabel] = useState<LabelData | null>(null);

  const addLabel = () => {
    if (!form.nama || !form.jumlah || !form.tanggalExp) return;
    const newLabel: LabelData = {
      kode: generateLabelCode(form.jenis as JenisBahan),
      nama: form.nama,
      jumlah: parseFloat(form.jumlah),
      satuan: form.satuan,
      lokasi: form.lokasi as LokasiSimpan,
      jenis: form.jenis as JenisBahan,
      tanggalExp: form.tanggalExp,
    };
    setLabels(prev => [...prev, newLabel]);
    setForm({ nama: '', jumlah: '', satuan: 'kg', lokasi: 'Cold Room', jenis: 'Bantuan MBG', tanggalExp: '' });
  };

  const removeLabel = (kode: string) => {
    setLabels(prev => prev.filter(l => l.kode !== kode));
  };

  const printLabel = (label: LabelData) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Label ${label.kode}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; margin: 0; }
          .label {
            width: 300px;
            border: 2px solid #000;
            border-radius: 12px;
            padding: 16px;
            ${label.jenis === 'Bantuan MBG'
              ? 'background: #EFF6FF; border-color: #3B82F6;'
              : 'background: #ECFDF5; border-color: #10B981;'}
          }
          .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
          .badge { padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: bold; color: white;
            ${label.jenis === 'Bantuan MBG' ? 'background: #3B82F6;' : 'background: #10B981;'}
          }
          .badge-lokasi { background: #64748B; color: white; padding: 4px 8px; border-radius: 6px; font-size: 11px; }
          .nama { font-size: 24px; font-weight: bold; margin-bottom: 4px; color: #1E293B; }
          .jumlah { font-size: 18px; color: #475569; margin-bottom: 12px; }
          .kode { font-family: monospace; font-size: 14px; font-weight: bold; color: #1E293B; margin-bottom: 8px; }
          .exp { font-size: 13px; color: #64748B; }
          .qr { display: flex; justify-content: center; margin-top: 12px; }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="label">
          <div class="header">
            <span class="badge">${label.jenis}</span>
            <span class="badge-lokasi">${label.lokasi}</span>
          </div>
          <div class="nama">${label.nama}</div>
          <div class="jumlah">${label.jumlah} ${label.satuan}</div>
          <div class="kode">${label.kode}</div>
          <div class="exp">Exp: ${label.tanggalExp}</div>
          <div class="qr">
            <svg width="100" height="100" data-code="${label.kode}" id="qr"></svg>
          </div>
        </div>
        <script src="https://unpkg.com/qrcodejs@1.0.0/qrcode.min.js"></script>
        <script>
          new QRCode(document.getElementById('qr'), '${label.kode}');
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Generator Label Bahan</h1>
        <p className="text-sm text-slate-500">Generate label dengan kode MBG-MMYY-NNN + QR Code</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="font-semibold text-slate-800 mb-4">Tambah Label</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nama Bahan</label>
                <input
                  type="text"
                  value={form.nama}
                  onChange={e => setForm({ ...form, nama: e.target.value })}
                  placeholder="Contoh: Beras"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Jumlah</label>
                  <input
                    type="number"
                    value={form.jumlah}
                    onChange={e => setForm({ ...form, jumlah: e.target.value })}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Satuan</label>
                  <select
                    value={form.satuan}
                    onChange={e => setForm({ ...form, satuan: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="liter">liter</option>
                    <option value="ml">ml</option>
                    <option value="pcs">pcs</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Lokasi</label>
                <select
                  value={form.lokasi}
                  onChange={e => setForm({ ...form, lokasi: e.target.value as LokasiSimpan })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Cold Room">Cold Room</option>
                  <option value="Freezer">Freezer</option>
                  <option value="Rak Kering">Rak Kering</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Jenis</label>
                <select
                  value={form.jenis}
                  onChange={e => setForm({ ...form, jenis: e.target.value as JenisBahan })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Bantuan MBG">Bantuan MBG</option>
                  <option value="Mandiri">Mandiri</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Tanggal Exp</label>
                <input
                  type="date"
                  value={form.tanggalExp}
                  onChange={e => setForm({ ...form, tanggalExp: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                onClick={addLabel}
                disabled={!form.nama || !form.jumlah || !form.tanggalExp}
                className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition disabled:opacity-50"
              >
                + Generate Label
              </button>
            </div>
          </div>

          {labels.length > 0 && (
            <div className="mt-4 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="font-semibold text-slate-800 mb-3">Label Pending ({labels.length})</h2>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {labels.map(label => (
                  <div key={label.kode} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{label.nama}</p>
                      <p className="text-xs text-slate-500">{label.kode}</p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => printLabel(label)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Cetak
                      </button>
                      <button
                        onClick={() => removeLabel(label.kode)}
                        className="text-xs text-red-500 hover:underline ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setLabels([])}
                className="mt-3 w-full text-xs text-slate-500 hover:text-slate-700"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800">Preview Label</h2>
              {selectedLabel && (
                <button
                  onClick={() => printLabel(selectedLabel)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  🖨️ Cetak Label
                </button>
              )}
            </div>

            {labels.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <span className="text-5xl">🏷️</span>
                <p className="mt-4">Belum ada label. Generate label baru dari form.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {labels.map(label => (
                  <div
                    key={label.kode}
                    onClick={() => setSelectedLabel(label)}
                    className={`cursor-pointer rounded-xl p-5 border-2 transition ${
                      selectedLabel?.kode === label.kode
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-transparent hover:border-gray-200'
                    } ${
                      label.jenis === 'Bantuan MBG'
                        ? 'bg-blue-50'
                        : 'bg-emerald-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-bold text-white ${
                        label.jenis === 'Bantuan MBG' ? 'bg-blue-500' : 'bg-emerald-500'
                      }`}>
                        {label.jenis}
                      </span>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        {label.lokasi}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800">{label.nama}</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {label.jumlah} {label.satuan}
                    </p>
                    <div className="mt-3 p-2 bg-white rounded-lg inline-flex">
                      <QRCodeSVG value={label.kode} size={64} />
                    </div>
                    <p className="mt-2 font-mono font-bold text-sm">{label.kode}</p>
                    <p className="text-xs text-slate-500 mt-1">Exp: {label.tanggalExp}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
