'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Party } from '@/types/data';
import { getPoliticiansByParty } from '@/utils/politicians';
import { HiSparkles, HiStar } from 'react-icons/hi';

interface PartyCardProps {
  party: Party;
}

const PartyCard = ({ party }: PartyCardProps) => {
  return (
    <Link
      href={`/parties/${party.id}`}
      className="block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900 relative"
      style={{ borderTopColor: party.color, borderTopWidth: '4px' }}
    >
      {/* 与党バッジ */}
      {party.isRuling && (
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
            <HiSparkles className="h-3 w-3 animate-pulse" />
            <span>与党</span>
            <HiStar className="h-3 w-3" />
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white md:text-xl whitespace-pre-wrap break-words">
              {party.name}
            </h3>
            {party.shortName && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{party.shortName}</p>
            )}
          </div>
          {party.logo && (
            <div className="relative h-12 w-12">
              <Image
                src={party.logo}
                alt={`${party.name}のロゴ`}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
          {party.description}
        </p>
        {(() => {
          const politicians = getPoliticiansByParty(party.id);
          const lower = politicians.filter((p) => p.house === '衆議院').length;
          const upper = politicians.filter((p) => p.house === '参議院').length;
          return (
            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              {politicians.length} 人{' '}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                (衆: {lower}人、参: {upper}人)
              </span>
            </p>
          );
        })()}
        <div className="flex items-center justify-between">
          {party.website && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(party.website, '_blank', 'noopener,noreferrer');
              }}
              className="rounded-md bg-blue-600 px-4 py-1 text-sm font-medium text-white hover:bg-blue-700"
            >
              公式サイト
            </button>
          )}
          <span className="ml-auto text-sm font-medium text-gray-700 dark:text-gray-300">
            詳細を見る<span className="ml-1">&gt;</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PartyCard; 