'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/modul-2', label: 'Dashboard', icon: '📊' },
  { href: '/modul-2/menu-mingguan', label: 'Menu Mingguan', icon: '📅' },
  { href: '/modul-2/src-card', label: 'SRC Card', icon: '📄' },
  { href: '/modul-2/approval', label: 'Approval', icon: '✅' },
  { href: '/modul-2/arsip', label: 'Arsip Revisi', icon: '📁' },
];

export default function Modul2Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-56 bg-slate-800 text-white flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <h1 className="font-bold text-lg">Modul 2</h1>
          <p className="text-xs text-slate-400 mt-1">Menu & Gizi</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  isActive ? 'bg-slate-600 font-medium' : 'hover:bg-slate-700'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition">
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
