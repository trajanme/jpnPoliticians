'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../theme/ThemeToggle';

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'ホーム' },
    { href: '/parties', label: '政党' },
    { href: '/candidates', label: '候補者' },
    { href: '/policies', label: '政策比較' },
    { href: '/about', label: 'このサイトについて' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
            参議院選挙情報
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-100 ${
                      pathname === item.href
                        ? 'text-gray-900 dark:text-gray-100'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              className="md:hidden"
              aria-label="メニュー"
              onClick={() => {
                // TODO: モバイルメニューの実装
              }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 