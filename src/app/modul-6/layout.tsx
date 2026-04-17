'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/modul-6', label: 'Dashboard LPJ', icon: '📋' },
  { href: '/modul-6/lpj', label: 'LPJ Bulanan', icon: '📑' },
  { href: '/modul-6/gizi', label: 'Ringkasan Gizi', icon: '🥗' },
  { href: '/modul-6/dokumentasi', label: 'Dokumentasi', icon: '📸' },
  { href: '/modul-6/keuangan', label: 'Ringkasan Keuangan', icon: '💰' },
];

export default function Modul6Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full z-50 w-56 bg-gradient-to-b from-violet-700 to-violet-600 text-white flex flex-col shadow-lg
        transform transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b border-violet-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🇮🇩</span>
              <h1 className="font-bold text-lg">Modul 6</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded hover:bg-violet-600"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-violet-200 mt-1">Dokumentasi & LPJ</p>
          <div className="mt-2 px-2 py-1.5 bg-violet-900/50 rounded-lg border border-violet-600/50">
            <p className="text-[10px] text-violet-200 leading-tight">
              Laporan Pertanggungjawaban Bulanan MBG
            </p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  isActive ? 'bg-violet-500 font-medium' : 'hover:bg-violet-600'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-violet-600">
          <Link href="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2 text-sm text-violet-200 hover:text-white transition">
            ← Dashboard
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-56">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 p-4 bg-violet-700 text-white">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-violet-600 transition"
          >
            ☰
          </button>
          <span className="font-bold">Modul 6 - Dokumentasi & LPJ</span>
        </div>
        {children}
      </main>
    </div>
  );
}