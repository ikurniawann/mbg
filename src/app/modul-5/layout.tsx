'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/modul-5', label: 'Dashboard', icon: '📊' },
  { href: '/modul-5/rute', label: 'Rute Tracking', icon: '🗺️' },
  { href: '/modul-5/tanda-terima', label: 'Tanda Terima', icon: '📝' },
  { href: '/modul-5/insiden', label: 'Insiden', icon: '⚠️' },
];

export default function Modul5Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-56 bg-gradient-to-b from-teal-700 to-teal-600 text-white flex flex-col shadow-lg">
        <div className="p-4 border-b border-teal-600">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🇮🇩</span>
            <h1 className="font-bold text-lg">Modul 5</h1>
          </div>
          <p className="text-xs text-teal-200 mt-1">Distribusi & Logistik</p>
          <div className="mt-2 px-2 py-1.5 bg-teal-900/50 rounded-lg border border-teal-600/50">
            <p className="text-[10px] text-teal-200 leading-tight">Sistem pelacakan distribusi & insiden MBG</p>
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
                  isActive ? 'bg-teal-500 font-medium' : 'hover:bg-teal-600'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-teal-600">
          <Link href="/" className="flex items-center gap-2 text-sm text-teal-200 hover:text-white transition">
            ← Dashboard
          </Link>
        </div>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
