'use client';

import { useMemo, useState } from 'react';
import type { Politician } from '@/types/politician';
import PoliticianCard from './PoliticianCard';
import { getParties } from '@/utils/data';
import { compareSeniority } from '@/utils/politicians';

interface Props {
  politicians: Politician[];
}

const PoliticiansBrowser = ({ politicians }: Props) => {
  const parties = getParties();

  const [selectedParty, setSelectedParty] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('');

  const filteredAndSorted = useMemo(() => {
    const filtered = politicians.filter((p) => {
      const okParty = selectedParty ? p.partyId === selectedParty : true;
      const okHouse = selectedHouse ? p.house === selectedHouse : true;
      return okParty && okHouse;
    });

    return filtered.sort(compareSeniority);
  }, [politicians, selectedParty, selectedHouse]);

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-6 flex flex-wrap gap-4">
        <select
          className="rounded border border-gray-300 bg-white p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          value={selectedHouse}
          onChange={(e) => setSelectedHouse(e.target.value)}
        >
          <option value="">すべて</option>
          <option value="衆議院">衆議院</option>
          <option value="参議院">参議院</option>
        </select>

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