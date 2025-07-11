'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HiHome, 
  HiUserGroup, 
  HiUsers, 
  HiQuestionMarkCircle 
} from 'react-icons/hi';

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'ホーム', icon: HiHome },
    { href: '/parties', label: '政党', icon: HiUserGroup },
    { href: '/politicians', label: '議員', icon: HiUsers },
    { href: '/faq', label: 'FAQ', icon: HiQuestionMarkCircle },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 px-3 py-2 transition-colors ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav; 