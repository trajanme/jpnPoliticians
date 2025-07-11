'use client';

import { useState } from 'react';
import PoliticiansBrowser from '@/components/politicians/PoliticiansBrowser';
import { getPoliticians } from '@/utils/politicians';

type ViewType = 'all' | 'lower' | 'upper';
type SortType = 'name' | 'age';
type SortOrder = 'asc' | 'desc';

export default function PoliticiansPage() {
  const [viewType, setViewType] = useState<ViewType>('all');
  const [sortType, setSortType] = useState<SortType>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const allPoliticians = getPoliticians();
  
  // 表示する議員をフィルタリング
  const politicians = viewType === 'all' 
    ? allPoliticians 
    : allPoliticians.filter(p => p.house === (viewType === 'lower' ? '衆議院' : '参議院'));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 flex items-baseline justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">国会議員一覧</h1>
          <span className="text-sm text-gray-600 dark:text-gray-300">{politicians.length} 人</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          衆議院および参議院の現職議員情報を一覧表示しています。
        </p>
      </div>

      {/* ビュー切り替えタブ */}
      <div className="mb-8">
        <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
          {[
            { key: 'all', label: '全体' },
            { key: 'lower', label: '衆議院' },
            { key: 'upper', label: '参議院' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setViewType(key as ViewType)}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                viewType === key
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <PoliticiansBrowser 
        politicians={politicians} 
        sortType={sortType}
        sortOrder={sortOrder}
        onSortTypeChange={setSortType}
        onSortOrderChange={setSortOrder}
      />
    </div>
  );
} 