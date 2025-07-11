'use client';

import { useMemo, useState } from 'react';
import type { Politician } from '@/types/politician';
import PoliticianCard from './PoliticianCard';
import { getParties } from '@/utils/data';
import { calculateAge } from '@/utils/politicians';
import { FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';

type SortType = 'name' | 'age' | 'firstElected';
type SortOrder = 'asc' | 'desc';

interface Props {
  politicians: Politician[];
  sortType?: SortType;
  sortOrder?: SortOrder;
  onSortTypeChange?: (sortType: SortType) => void;
  onSortOrderChange?: (sortOrder: SortOrder) => void;
}

const PoliticiansBrowser = ({ 
  politicians, 
  sortType = 'name', 
  sortOrder = 'asc',
  onSortTypeChange,
  onSortOrderChange 
}: Props) => {
  const parties = getParties();

  const [selectedParty, setSelectedParty] = useState('');

  const filteredAndSorted = useMemo(() => {
    const filtered = politicians.filter((p) => {
      const okParty = selectedParty ? p.partyId === selectedParty : true;
      return okParty;
    });

    // ソート機能
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;
      
      if (sortType === 'name') {
        comparison = a.kana.localeCompare(b.kana, 'ja');
      } else if (sortType === 'age') {
        const ageA = a.birthDate ? calculateAge(a.birthDate) : 0;
        const ageB = b.birthDate ? calculateAge(b.birthDate) : 0;
        comparison = ageA - ageB;
      } else if (sortType === 'firstElected') {
        const yearA = parseInt(a.firstElected, 10);
        const yearB = parseInt(b.firstElected, 10);
        comparison = yearA - yearB;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [politicians, selectedParty, sortType, sortOrder]);

  return (
    <div>
      {/* Filter and Sort bar */}
      <div className="mb-6 space-y-4">
        {/* 政党フィルター */}
        <div className="flex flex-wrap gap-4">
          <select
            className="rounded border border-gray-300 bg-white p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            value={selectedParty}
            onChange={(e) => setSelectedParty(e.target.value)}
          >
            <option value="">すべての政党</option>
            {parties.map((party) => (
              <option key={party.id} value={party.id}>
                {party.name}
              </option>
            ))}
          </select>
        </div>

        {/* ソート設定 */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">ソート順:</span>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="sortType"
                value="name"
                checked={sortType === 'name'}
                onChange={(e) => onSortTypeChange?.(e.target.value as SortType)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">あいうえお順</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="sortType"
                value="age"
                checked={sortType === 'age'}
                onChange={(e) => onSortTypeChange?.(e.target.value as SortType)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">年齢順</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="sortType"
                value="firstElected"
                checked={sortType === 'firstElected'}
                onChange={(e) => onSortTypeChange?.(e.target.value as SortType)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">初当選順</span>
            </label>
          </div>

          <button
            onClick={() => onSortOrderChange?.(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center space-x-2 rounded border border-gray-300 bg-white px-3 py-2 text-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            {sortOrder === 'asc' ? (
              <>
                <FaSortAmountUp className="h-4 w-4" />
                <span>昇順</span>
              </>
            ) : (
              <>
                <FaSortAmountDown className="h-4 w-4" />
                <span>降順</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAndSorted.map((politician) => (
          <PoliticianCard key={politician.id} politician={politician} />
        ))}
      </div>

      {filteredAndSorted.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">該当する議員が見つかりません。</p>
        </div>
      )}
    </div>
  );
};

export default PoliticiansBrowser; 