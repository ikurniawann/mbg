'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '/modul-7', label: 'Dashboard SDM', icon: '👥' },
  { href: '/modul-7/pelatihan', label: 'Pelatihan', icon: '🎓' },
  { href: '/modul-7/feedback', label: 'Feedback', icon: '⭐' },
  { href: '/modul-7/notulen', label: 'Notulen Rapat', icon: '📝' },
];

export default function Modul7Layout({ children }: { children: React.ReactNode }) {
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
        fixed lg:relative z-50 h-screen
        w-64 bg-gradient-to-b from-indigo-700 to-indigo-600 text-white
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 border-b border-indigo-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🇮🇩</span>
              <div>
                <h1 className="font-bold text-lg">Modul 7</h1>
                <p className="text-xs text-indigo-200">SDM & Pelatihan</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-indigo-600"
            >
              ✕
            </button>
          </div>
          <div className="mt-2 px-2 py-1.5 bg-indigo-900/50 rounded-lg border border-indigo-600/50">
            <p className="text-[10px] text-indigo-200 leading-tight">
              Manajemen SDM, Jadwal Pelatihan & Koordinasi
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
                  isActive ? 'bg-indigo-500 font-medium' : 'hover:bg-indigo-600'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-indigo-600">
          <Link href="/" className="flex items-center gap-2 text-sm text-indigo-200 hover:text-white transition">
            ← Dashboard
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header with Hamburger */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <span className="text-xl">☰</span>
          </button>
          <div>
            <h1 className="font-bold text-slate-800">SDM & Pelatihan</h1>
            <p className="text-xs text-slate-700">Modul 7</p>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}