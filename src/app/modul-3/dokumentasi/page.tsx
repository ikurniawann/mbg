'use client';

import { useState, useRef } from 'react';

interface PhotoEntry {
  id: string;
  category: 'Produksi' | 'Packing' | 'Distribusi';
  caption: string;
  timestamp: string;
  user: string;
  url: string;
}

const DUMMY_PHOTOS: PhotoEntry[] = [
  { id: 'p1', category: 'Produksi', caption: 'Proses penggorengan ikan - suhu 176°C', timestamp: '2026-04-17 07:30:00', user: 'Rudi Hermawan', url: '' },
  { id: 'p2', category: 'Produksi', caption: 'Persiapan bahan capcay - wortel & bayam', timestamp: '2026-04-17 06:15:00', user: 'Rudi Hermawan', url: '' },
  { id: 'p3', category: 'Packing', caption: 'Box makanan siap distribusi', timestamp: '2026-04-17 09:50:00', user: 'Rudi Hermawan', url: '' },
  { id: 'p4', category: 'Packing', caption: 'Labelisasi box - menu Ikan Goreng', timestamp: '2026-04-17 09:45:00', user: 'Rudi Hermawan', url: '' },
  { id: 'p5', category: 'Distribusi', caption: 'Penerimaan di SDN 05 Menteng', timestamp: '2026-04-17 10:35:00', user: 'Joko Pramono', url: '' },
  { id: 'p6', category: 'Distribusi', caption: 'Proses bongkar muat box', timestamp: '2026-04-17 10:40:00', user: 'Joko Pramono', url: '' },
];

export default function DokumentasiPage() {
  const [photos, setPhotos] = useState<PhotoEntry[]>(DUMMY_PHOTOS);
  const [category, setCategory] = useState<'Semua' | 'Produksi' | 'Packing' | 'Distribusi'>('Semua');
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Produksi' | 'Packing' | 'Distribusi'>('Produksi');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = category === 'Semua' ? photos : photos.filter(p => p.category === category);

  const CATEGORY_ICONS: Record<string, string> = {
    'Produksi': '👨‍🍳',
    'Packing': '📦',
    'Distribusi': '🚚',
  };

  const CATEGORY_COLORS: Record<string, string> = {
    'Produksi': 'bg-orange-500',
    'Packing': 'bg-blue-500',
    'Distribusi': 'bg-emerald-500',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const uploadPhoto = () => {
    if (!uploadPreview || !caption) return;
    const newPhoto: PhotoEntry = {
      id: `p${Date.now()}`,
      category: selectedCategory,
      caption,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: 'Rudi Hermawan',
      url: uploadPreview,
    };
    setPhotos(prev => [newPhoto, ...prev]);
    setUploadPreview(null);
    setCaption('');
  };

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dokumentasi Produksi</h1>
          <p className="text-sm text-slate-500">{photos.length} foto</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
        >
          + Upload Foto
        </button>
      </header>

      {/* Upload Modal */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex gap-6">
          <div
            className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-emerald-400 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            {uploadPreview ? (
              <img src={uploadPreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
            ) : (
              <div className="text-center text-slate-400">
                <span className="text-4xl">📷</span>
                <p className="text-xs mt-2">Klik untuk upload</p>
              </div>
            )}
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Kategori</label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="Produksi">👨‍🍳 Produksi</option>
                <option value="Packing">📦 Packing</option>
                <option value="Distribusi">🚚 Distribusi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Caption</label>
              <input
                type="text"
                value={caption}
                onChange={e => setCaption(e.target.value)}
                placeholder="Contoh: Proses penggorengan ikan - suhu 176°C"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={uploadPhoto}
                disabled={!uploadPreview || !caption}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition disabled:opacity-50"
              >
                Simpan Foto
              </button>
              {uploadPreview && (
                <button
                  onClick={() => { setUploadPreview(null); setCaption(''); }}
                  className="px-4 py-2 border border-gray-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                >
                  Batal
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {(['Semua', 'Produksi', 'Packing', 'Distribusi'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              category === cat
                ? cat === 'Semua' ? 'bg-slate-700 text-white' :
                  `text-white ${CATEGORY_COLORS[cat]}`
                : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
            }`}
          >
            {cat === 'Semua' ? '📋' : CATEGORY_ICONS[cat]} {cat}
            {cat !== 'Semua' && (
              <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded text-xs">
                {photos.filter(p => p.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map(photo => (
          <div key={photo.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="bg-gray-100 h-40 flex items-center justify-center relative">
              {photo.url ? (
                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
              ) : (
                <span className="text-6xl">{CATEGORY_ICONS[photo.category]}</span>
              )}
              <span className={`absolute top-2 right-2 ${CATEGORY_COLORS[photo.category]} text-white text-xs px-2 py-0.5 rounded-full font-medium`}>
                {photo.category}
              </span>
            </div>
            <div className="p-3">
              <p className="text-sm text-slate-700 font-medium">{photo.caption}</p>
              <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
                <span>{photo.timestamp}</span>
                <span>{photo.user}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <span className="text-5xl">📷</span>
          <p className="mt-4">Tidak ada foto dalam kategori ini</p>
        </div>
      )}
    </div>
  );
}
