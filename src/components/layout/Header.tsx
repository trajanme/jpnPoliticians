'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'ホーム' },
    { href: '/parties', label: '政党' },
    { href: '/politicians', label: '国会議員' },
    { href: '/faq', label: 'よくある質問' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
            国会議員検索
          </Link>
          {/* デスクトップナビ */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-100 ${
                      pathname === item.href
                        ? 'text-gray-900 dark:text-gray-100'
                        : 'text-gray-500 dark:text-gray-300'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* モバイル右側アイコン */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              className="md:hidden focus:outline-none"
              aria-label="メニュー"
              onClick={() => setIsOpen(!isOpen)}
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

      {/* モバイルメニューオーバーレイ */}
      {isOpen && (
        <div className="md:hidden">
          {/* 背景オーバーレイ */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* スライドパネル */}
          <div className="fixed inset-y-0 right-0 z-50 w-64 max-w-full transform bg-white shadow-lg transition-transform duration-200 ease-in-out dark:bg-gray-900"
               style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
            <div className="flex h-16 items-center justify-between px-4">
              <span className="text-lg font-bold">メニュー</span>
              <button
                aria-label="メニューを閉じる"
                className="focus:outline-none"
                onClick={() => setIsOpen(false)}
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="px-6 py-4">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block text-base font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-100 ${
                        pathname === item.href
                          ? 'text-gray-900 dark:text-gray-100'
                          : 'text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                {/* ThemeToggle removed */}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 