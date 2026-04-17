'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/modul-3', label: 'Dashboard', icon: '📊' },
  { href: '/modul-3/timer', label: 'Timer Produksi', icon: '⏱️' },
  { href: '/modul-3/dokumentasi', label: 'Dokumentasi', icon: '📷' },
];

export default function Modul3Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-56 bg-orange-700 text-white flex flex-col">
        <div className="p-4 border-b border-orange-600">
          <h1 className="font-bold text-lg">Modul 3</h1>
          <p className="text-xs text-orange-200 mt-1">Produksi Dapur</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  isActive ? 'bg-orange-600 font-medium' : 'hover:bg-orange-600'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-orange-600">
          <Link href="/" className="flex items-center gap-2 text-sm text-orange-200 hover:text-white transition">
            ← Dashboard
          </Link>
        </div>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
