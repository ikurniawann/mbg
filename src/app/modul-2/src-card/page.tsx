'use client';

import { useState } from 'react';
import { dummySRC } from '@/lib/dummy-data';
import { QRCodeSVG } from 'qrcode.react';

export default function SRCCardPage() {
  const [selectedSRC, setSelectedSRC] = useState(dummySRC[0]);
  const [printMode, setPrintMode] = useState(false);

  const printSRC = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const src = selectedSRC;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>SRC - ${src.namaMenu}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; margin: 0; }
          .header { text-align: center; border-bottom: 3px solid #059669; padding-bottom: 16px; margin-bottom: 24px; }
          .badge { display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: bold; margin-bottom: 8px; }
          .bantuan { background: #DBEAFE; color: #1D4ED8; border: 1px solid #93C5FD; }
          .mandiri { background: #D1FAE5; color: #065F46; border: 1px solid #6EE7B7; }
          h1 { margin: 0; font-size: 24px; color: #1E293B; }
          .meta { color: #64748B; font-size: 13px; margin-top: 4px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
          .card { border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; }
          .card-title { font-weight: bold; font-size: 14px; color: #1E293B; margin-bottom: 12px; text-transform: uppercase; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px; }
          .bahan-item { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed #F1F5F9; }
          .bahan-item:last-child { border-bottom: none; }
          .procedur { white-space: pre-line; font-size: 13px; line-height: 1.6; color: #334155; }
          .gizi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
          .gizi-item { text-align: center; padding: 8px; border-radius: 8px; }
          .gizi-value { font-size: 20px; font-weight: bold; }
          .gizi-label { font-size: 11px; }
          .karbo { background: #FEF3C7; }
          .protein { background: #FEE2E2; }
          .lemak { background: #DBEAFE; }
          .alergen-badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; background: #FEE2E2; color: #991B1B; border: 1px solid #FECACA; margin: 2px; }
          .no-alergen { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; background: #D1FAE5; color: #065F46; border: 1px solid #6EE7B7; }
          .footer { margin-top: 24px; text-align: center; font-size: 11px; color: #94A3B8; border-top: 1px solid #E2E8F0; padding-top: 16px; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="badge bantuan">STANDARD RECIPE CARD</div>
          <h1>${src.namaMenu}</h1>
          <p class="meta">Untuk ${src.porsi} Porsi</p>
        </div>
        <div class="grid">
          <div>
            <div class="card">
              <div class="card-title">📦 Bahan-Bahan</div>
              ${src.bahan.map(b => `
                <div class="bahan-item">
                  <span>
                    <strong>${b.nama}</strong>
                    <span class="badge ${b.asal === 'Bantuan MBG' ? 'bantuan' : 'mandiri'}" style="margin-left:8px;font-size:10px;">${b.asal}</span>
                  </span>
                  <span>${b.jumlah} ${b.satuan}</span>
                </div>
              `).join('')}
            </div>
            <div class="card" style="margin-top:16px;">
              <div class="card-title">🍽️ Prosedur Masak</div>
              <p class="procedur">${src.prosedur}</p>
            </div>
          </div>
          <div>
            <div class="card">
              <div class="card-title">📊 Informasi Gizi (per porsi)</div>
              <div class="gizi-grid">
                <div class="gizi-item karbo">
                  <div class="gizi-value" style="color:#B45309;">${Math.round(src.nutrisi.karbohidrat / src.porsi * 100)}g</div>
                  <div class="gizi-label" style="color:#B45309;">Karbohidrat</div>
                </div>
                <div class="gizi-item protein">
                  <div class="gizi-value" style="color:#B91C1C;">${Math.round(src.nutrisi.protein / src.porsi * 100)}g</div>
                  <div class="gizi-label" style="color:#B91C1C;">Protein</div>
                </div>
                <div class="gizi-item lemak">
                  <div class="gizi-value" style="color:#1D4ED8;">${Math.round(src.nutrisi.lemak / src.porsi * 100)}g</div>
                  <div class="gizi-label" style="color:#1D4ED8;">Lemak</div>
                </div>
              </div>
              ${src.nutrisi.vitamin.length > 0 ? `
                <div style="margin-top:12px;">
                  <p style="font-size:11px;color:#64748B;margin-bottom:4px;">Vitamin:</p>
                  <div>${src.nutrisi.vitamin.map(v => `<span style="display:inline-block;background:#F0FDF4;color:#15803D;border:1px solid #86EFAC;padding:2px 6px;border-radius:4px;font-size:10px;margin:2px;">${v}</span>`).join('')}</div>
                </div>
              ` : ''}
            </div>
            <div class="card" style="margin-top:16px;">
              <div class="card-title">⚠️ Info Alergen</div>
              ${src.alergen.length > 0
                ? src.alergen.map(a => `<span class="alergen-badge">⚠️ ${a}</span>`).join('')
                : '<span class="no-alergen">✓ Bebas Alergen</span>'
              }
            </div>
          </div>
        </div>
        <div class="footer">
          <p>ID: ${src.id} · Menu ID: ${src.menuId} · Dicetak: ${new Date().toLocaleDateString('id-ID')}</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Standard Recipe Card (SRC)</h1>
          <p className="text-sm text-slate-500">{dummySRC.length} SRC Card aktif</p>
        </div>
        <button
          onClick={printSRC}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
        >
          🖨️ Cetak SRC
        </button>
      </header>

      {/* SRC Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {dummySRC.map(src => (
          <div
            key={src.id}
            onClick={() => setSelectedSRC(src)}
            className={`cursor-pointer rounded-xl p-5 border-2 transition ${
              selectedSRC?.id === src.id
                ? 'border-emerald-400 bg-emerald-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-emerald-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-lg text-slate-800">{src.namaMenu}</p>
                <p className="text-sm text-slate-500 mt-1">{src.porsi} porsi</p>
              </div>
              <span className="text-3xl">🍽️</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {src.alergen.map(a => (
                <span key={a} className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-medium">
                  ⚠️ {a}
                </span>
              ))}
              {src.alergen.length === 0 && (
                <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded">
                  ✓ No Alergen
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Selected SRC Detail */}
      {selectedSRC && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* SRC Header */}
          <div className="bg-emerald-600 text-white px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-emerald-200 uppercase tracking-wider font-semibold">Standard Recipe Card</p>
              <h2 className="text-xl font-bold mt-0.5">{selectedSRC.namaMenu}</h2>
              <p className="text-emerald-200 text-sm mt-1">Untuk {selectedSRC.porsi} porsi</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                <p className="text-xs text-emerald-200">SRC ID</p>
                <p className="font-mono font-bold">{selectedSRC.id}</p>
              </div>
              <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                <p className="text-xs text-emerald-200">Menu ID</p>
                <p className="font-mono font-bold">{selectedSRC.menuId}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-gray-200">
            {/* Bahan */}
            <div className="p-6">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-lg">📦</span> Bahan-Bahan
              </h3>
              <div className="space-y-2">
                {selectedSRC.bahan.map((bahan, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      bahan.asal === 'Bantuan MBG' ? 'bg-blue-50' : 'bg-emerald-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        bahan.asal === 'Bantuan MBG' ? 'bg-blue-500' : 'bg-emerald-500'
                      }`} />
                      <span className="text-sm font-medium text-slate-700">{bahan.nama}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-slate-800">{bahan.jumlah} {bahan.satuan}</span>
                      <p className="text-[10px] text-slate-400">{bahan.asal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gizi & Alergen */}
            <div className="p-6">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-lg">📊</span> Info Gizi
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'Karbohidrat', value: selectedSRC.nutrisi.karbohidrat, unit: 'g', color: 'bg-amber-400', textColor: 'text-amber-700' },
                  { label: 'Protein', value: selectedSRC.nutrisi.protein, unit: 'g', color: 'bg-red-400', textColor: 'text-red-700' },
                  { label: 'Lemak', value: selectedSRC.nutrisi.lemak, unit: 'g', color: 'bg-blue-400', textColor: 'text-blue-700' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center`}>
                      <span className="text-white text-sm font-bold">{item.value}</span>
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${item.textColor}`}>{item.value}{item.unit}</p>
                      <p className="text-xs text-slate-400">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold text-slate-800 mt-6 mb-3 flex items-center gap-2">
                <span className="text-lg">⚠️</span> Alergen
              </h3>
              {selectedSRC.alergen.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedSRC.alergen.map(a => (
                    <span key={a} className="text-xs bg-red-100 text-red-700 border border-red-200 px-2 py-1 rounded-full font-semibold">
                      ⚠️ {a}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-sm bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full">
                  ✓ Bebas Alergen
                </span>
              )}

              {selectedSRC.nutrisi.vitamin.length > 0 && (
                <>
                  <h3 className="font-semibold text-slate-800 mt-4 mb-2 text-sm">Vitamin:</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedSRC.nutrisi.vitamin.map(v => (
                      <span key={v} className="text-xs bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded">
                        {v}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Prosedur */}
            <div className="p-6">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-lg">📝</span> Prosedur Masak
              </h3>
              <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {selectedSRC.prosedur}
              </div>
            </div>
          </div>

          {/* QR Code & Action */}
          <div className="px-6 py-4 bg-slate-50 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg border border-gray-200">
                <QRCodeSVG value={`SRC-${selectedSRC.id}`} size={48} />
              </div>
              <div>
                <p className="text-sm font-mono font-semibold text-slate-700">SRC-{selectedSRC.id}</p>
                <p className="text-xs text-slate-400">Scan untuk verifikasi</p>
              </div>
            </div>
            <button
              onClick={printSRC}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              🖨️ Cetak SRC Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
