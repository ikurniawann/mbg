'use client';

import { useState } from 'react';
import { dummySRC } from '@/lib/dummy-data';
import type { Alergen, StatusApprovalMenu } from '@/lib/types';

const ALOGEN_LIST: Alergen[] = ['Susu', 'Telur', 'Kacang', 'Gluten', 'Kedelai', 'Seafood', 'Wijen'];
const HARI = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const dummyMenuOptions = [
  { id: 'm1', nama: 'Ikan Goreng + Capcay', srcId: 'src1' },
  { id: 'm2', nama: 'Ayam Goreng + Tumis Kangkung', srcId: null },
  { id: 'm3', nama: 'Telur Balado + Tahu Tempe', srcId: null },
  { id: 'm4', nama: 'Daging Sapi + Sayuran', srcId: null },
  { id: 'm5', nama: 'Nasi Goreng + Acar', srcId: null },
];

interface MenuSlot {
  menuId: string;
  menuName: string;
  status: StatusApprovalMenu;
  srcId: string | null;
}

export default function MenuMingguanPage() {
  const [weekStart, setWeekStart] = useState('2026-04-14');
  const [menuSlots, setMenuSlots] = useState<Record<string, MenuSlot>>({
    '2026-04-14': { menuId: 'm3', menuName: 'Telur Balado + Tahu Tempe', status: 'Disetujui', srcId: null },
    '2026-04-15': { menuId: 'm4', menuName: 'Daging Sapi + Sayuran', status: 'Draft', srcId: null },
    '2026-04-16': { menuId: 'm2', menuName: 'Ayam Goreng + Tumis Kangkung', status: 'Review', srcId: null },
    '2026-04-17': { menuId: 'm1', menuName: 'Ikan Goreng + Capcay', status: 'Disetujui', srcId: 'src1' },
    '2026-04-18': { menuId: '', menuName: '', status: 'Draft', srcId: null },
  });
  const [editMode, setEditMode] = useState(false);

  const weekDates = HARI.map((hari, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  const getDayName = (dateStr: string) => {
    const idx = weekDates.indexOf(dateStr);
    return idx >= 0 ? HARI[idx] : '';
  };

  const getDayDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.getDate();
  };

  const totalGizi = () => {
    let karbo = 0, protein = 0, lemak = 0;
    Object.values(menuSlots).forEach(slot => {
      if (slot.menuId) {
        const src = dummySRC.find(s => s.menuId === slot.menuId || s.namaMenu === slot.menuName);
        if (src) {
          karbo += src.nutrisi.karbohidrat;
          protein += src.nutrisi.protein;
          lemak += src.nutrisi.lemak;
        }
      }
    });
    return { karbo, protein, lemak };
  };

  const getAlergenForSlot = (slot: MenuSlot): string[] => {
    const src = dummySRC.find(s => s.namaMenu === slot.menuName);
    if (src) return src.alergen;
    if (slot.menuName.includes('Ikan')) return ['Seafood'];
    if (slot.menuName.includes('Telur')) return ['Telur'];
    if (slot.menuName.includes('Tahu Tempe')) return ['Kedelai'];
    return [];
  };

  const assignMenu = (date: string, menuId: string) => {
    const menu = dummyMenuOptions.find(m => m.id === menuId);
    if (!menu) return;
    setMenuSlots(prev => ({
      ...prev,
      [date]: { menuId: menu.id, menuName: menu.nama, status: 'Draft', srcId: menu.srcId },
    }));
  };

  const removeMenu = (date: string) => {
    setMenuSlots(prev => ({
      ...prev,
      [date]: { menuId: '', menuName: '', status: 'Draft', srcId: null },
    }));
  };

  const submitForApproval = () => {
    setMenuSlots(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(date => {
        if (updated[date].menuId) {
          updated[date] = { ...updated[date], status: 'Review' };
        }
      });
      return updated;
    });
  };

  const gizi = totalGizi();

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Menu Mingguan</h1>
          <p className="text-sm text-slate-500">Periode: 14 — 18 April 2026</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setEditMode(!editMode)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              editMode
                ? 'bg-slate-600 text-white hover:bg-slate-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {editMode ? 'SELESAI EDIT' : '✏️ EDIT MENU'}
          </button>
          {!editMode && (
            <button
              onClick={submitForApproval}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
            >
              KIRIM APPROVAL
            </button>
          )}
        </div>
      </header>

      {/* Gizi Summary Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wide">Total Gizi Minggu Ini</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-slate-500">Karbohidrat</p>
            <p className="text-xl font-bold text-amber-600">{gizi.karbo}g</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Protein</p>
            <p className="text-xl font-bold text-red-600">{gizi.protein}g</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Lemak</p>
            <p className="text-xl font-bold text-blue-600">{gizi.lemak}g</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Rata-rata/Porsi</p>
            <p className="text-xl font-bold text-emerald-600">
              {Math.round(gizi.karbo / Math.max(Object.values(menuSlots).filter(m => m.menuId).length, 1))}g
            </p>
          </div>
        </div>
      </div>

      {/* Weekly Menu Grid */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {weekDates.map((date, idx) => {
          const slot = menuSlots[date];
          const isToday = date === '2026-04-17';
          const alergen = slot?.menuId ? getAlergenForSlot(slot) : [];
          const src = slot?.menuId ? dummySRC.find(s => s.namaMenu === slot.menuName) : null;

          return (
            <div
              key={date}
              className={`rounded-xl border-2 overflow-hidden ${
                isToday ? 'border-blue-400 shadow-md' : 'border-gray-200'
              } ${slot?.menuId ? 'bg-white' : 'bg-gray-50'}`}
            >
              {/* Day Header */}
              <div className={`px-4 py-2 border-b ${isToday ? 'bg-blue-500 text-white' : 'bg-slate-100'}`}>
                <p className={`text-xs font-semibold ${isToday ? 'text-blue-100' : 'text-slate-500'}`}>
                  {HARI[idx]}
                </p>
                <p className={`text-lg font-bold ${isToday ? 'text-white' : 'text-slate-800'}`}>
                  {getDayDate(date)}
                </p>
              </div>

              {/* Menu Content */}
              <div className="p-3 min-h-[140px]">
                {slot?.menuId ? (
                  <div>
                    <p className="text-sm font-semibold text-slate-800 leading-tight">
                      {slot.menuName}
                    </p>
                    {src && (
                      <p className="text-xs text-slate-500 mt-1">{src.porsi} porsi</p>
                    )}
                    {/* Gizi Mini */}
                    {src && (
                      <div className="mt-2 grid grid-cols-3 gap-1">
                        <div className="text-center bg-amber-50 rounded p-1">
                          <p className="text-[10px] text-amber-600">Karbo</p>
                          <p className="text-xs font-bold text-amber-700">{src.nutrisi.karbohidrat}g</p>
                        </div>
                        <div className="text-center bg-red-50 rounded p-1">
                          <p className="text-[10px] text-red-600">Protein</p>
                          <p className="text-xs font-bold text-red-700">{src.nutrisi.protein}g</p>
                        </div>
                        <div className="text-center bg-blue-50 rounded p-1">
                          <p className="text-[10px] text-blue-600">Lemak</p>
                          <p className="text-xs font-bold text-blue-700">{src.nutrisi.lemak}g</p>
                        </div>
                      </div>
                    )}
                    {/* Alergen */}
                    {alergen.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {alergen.map(a => (
                          <span key={a} className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium">
                            ⚠️ {a}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* Status */}
                    <div className="mt-2 flex items-center justify-between">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        slot.status === 'Disetujui' ? 'bg-emerald-100 text-emerald-700' :
                        slot.status === 'Review' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {slot.status}
                      </span>
                      {editMode && (
                        <button
                          onClick={() => removeMenu(date)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-2xl mb-1">🍽️</p>
                    <p className="text-xs text-slate-400">Belum ada menu</p>
                    {editMode && (
                      <select
                        className="mt-2 w-full text-xs border border-gray-300 rounded px-1 py-1"
                        value=""
                        onChange={e => assignMenu(date, e.target.value)}
                      >
                        <option value="">Pilih menu</option>
                        {dummyMenuOptions.map(m => (
                          <option key={m.id} value={m.id}>{m.nama}</option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
              </div>

              {/* Edit Mode Add Button */}
              {editMode && slot?.menuId && (
                <div className="px-3 pb-3">
                  <select
                    className="w-full text-xs border border-gray-300 rounded px-1 py-1"
                    value={slot.menuId}
                    onChange={e => assignMenu(date, e.target.value)}
                  >
                    {dummyMenuOptions.map(m => (
                      <option key={m.id} value={m.id}>{m.nama}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Available Menu Options */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="font-semibold text-slate-800 mb-4">Pilihan Menu</h2>
        <div className="grid grid-cols-5 gap-3">
          {dummyMenuOptions.map(menu => {
            const src = dummySRC.find(s => s.menuId === menu.id) || dummySRC[0];
            const hasAlergen = src?.alergen && src.alergen.length > 0;
            return (
              <div
                key={menu.id}
                className={`rounded-xl p-3 border-2 cursor-pointer transition ${
                  hasAlergen
                    ? 'border-red-200 bg-red-50 hover:border-red-400'
                    : 'border-emerald-200 bg-emerald-50 hover:border-emerald-400'
                }`}
                onClick={() => !editMode && alert('Klik "EDIT MENU" untuk menambahkan menu ke slot hari tertentu')}
              >
                <p className="text-sm font-semibold text-slate-800">{menu.nama}</p>
                <p className="text-xs text-slate-500 mt-1">{src?.porsi || 500} porsi</p>
                {src?.alergen && src.alergen.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {src.alergen.map(a => (
                      <span key={a} className="text-[10px] bg-red-200 text-red-700 px-1 py-0.5 rounded">
                        {a}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-emerald-600 mt-2">✓ Bebas Alergen</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Alergen Legend */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-slate-500 mb-2">Legend Alergen:</p>
          <div className="flex gap-4 flex-wrap">
            {ALOGEN_LIST.map(a => (
              <span key={a} className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded border border-red-200">
                ⚠️ {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
