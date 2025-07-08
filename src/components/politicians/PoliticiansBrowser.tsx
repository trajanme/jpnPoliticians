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

  const caucusList = useMemo(() => {
    const set = new Set<string>();
    politicians.forEach((p) => {
      if (p.caucus) set.add(p.caucus);
    });
    return Array.from(set);
  }, [politicians]);

  const [selectedParty, setSelectedParty] = useState('');
  const [selectedCaucus, setSelectedCaucus] = useState('');

  const filteredAndSorted = useMemo(() => {
    const filtered = politicians.filter((p) => {
      const okParty = selectedParty ? p.partyId === selectedParty : true;
      const okCaucus = selectedCaucus ? p.caucus === selectedCaucus : true;
      return okParty && okCaucus;
    });

    return filtered.sort(compareSeniority);
  }, [politicians, selectedParty, selectedCaucus]);

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-6 flex flex-wrap gap-4">
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

        <select
          className="rounded border border-gray-300 bg-white p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          value={selectedCaucus}
          onChange={(e) => setSelectedCaucus(e.target.value)}
        >
          <option value="">すべての会派</option>
          {caucusList.map((c) => (
            <option key={c} value={c}>
              {c}
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