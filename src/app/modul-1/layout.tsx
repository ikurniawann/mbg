'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/modul-1', label: 'Dashboard', icon: '📊' },
  { href: '/modul-1/bapb', label: 'BAPB', icon: '📝' },
  { href: '/modul-1/stok', label: 'Stok Bahan', icon: '📦' },
  { href: '/modul-1/label', label: 'Label', icon: '🏷️' },
  { href: '/modul-1/audit', label: 'Audit Trail', icon: '📋' },
];

export default function Modul1Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-56 bg-gradient-to-b from-emerald-700 to-emerald-600 text-white flex flex-col shadow-lg">
        <div className="p-4 border-b border-emerald-600">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🇮🇩</span>
            <h1 className="font-bold text-lg">Modul 1</h1>
          </div>
          <p className="text-xs text-emerald-200 mt-1">Penerimaan & Inventori</p>
          <div className="mt-2 px-2 py-1.5 bg-emerald-900/50 rounded-lg border border-emerald-600/50">
            <p className="text-[10px] text-emerald-200 leading-tight">Berdasarkan SK Kepala BGN No. 244 Th. 2025 & No. 63421 Th. 2026</p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  isActive ? 'bg-emerald-500 font-medium' : 'hover:bg-emerald-600'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-emerald-600">
          <Link href="/" className="flex items-center gap-2 text-sm text-emerald-200 hover:text-white transition">
            ← Kembali ke Dashboard
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
