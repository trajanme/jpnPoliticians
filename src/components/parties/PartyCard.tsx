import Image from 'next/image';
import Link from 'next/link';
import { Party } from '@/types/data';

interface PartyCardProps {
  party: Party;
}

const PartyCard = ({ party }: PartyCardProps) => {
  return (
    <div
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
      style={{ borderTopColor: party.color, borderTopWidth: '4px' }}
    >
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{party.name}</h3>
          <div className="relative h-12 w-12">
            <Image
              src={party.logo}
              alt={`${party.name}のロゴ`}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {party.description}
        </p>
        <div className="flex items-center justify-between">
          <Link
            href={`/parties/${party.id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            詳細を見る
          </Link>
          <a
            href={party.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            公式サイト
          </a>
        </div>
      </div>
    </div>
  );
};

export default PartyCard; 