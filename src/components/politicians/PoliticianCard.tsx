import { Politician } from '@/types/politician';
import { getParty } from '@/utils/data';
import { calculateAge } from '@/utils/politicians';
import Link from 'next/link';
import { FaYoutube, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface Props {
  politician: Politician;
}

const PoliticianCard = ({ politician }: Props) => {
  const party = getParty(politician.partyId);
  const age = politician.birthDate ? calculateAge(politician.birthDate) : undefined;

  const iconClass =
    'inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition-opacity disabled:opacity-30';

  const containerStyle = party?.color
    ? { borderTopColor: party.color, borderTopWidth: '4px' }
    : undefined;

  return (
    <div
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
      style={containerStyle}
    >
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {politician.name}
            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-300">
              ({politician.kana})
            </span>
          </h3>
          {party && (
            <Link
              href={`/parties/${party.id}`}
              className="mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium text-white hover:opacity-90"
              style={{ backgroundColor: party.color }}
            >
              {party.name}
            </Link>
          )}
          {politician.position && (
            <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-gray-100">
              {politician.position}
            </p>
          )}
        </div>
        <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">
          {politician.house} / {politician.constituency}
        </p>
        <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">
          当選回数: {politician.electionCount} / 初当選: {politician.firstElected}
        </p>
        {age !== undefined && (
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">年齢: {age}歳</p>
        )}

        {/* SNS Buttons */}
        <div className="flex gap-2">
          {politician.sns?.youtube && (
            <Link
              href={politician.sns.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={`${iconClass} bg-red-600`}
            >
              <span className="sr-only">YouTube</span>
              <FaYoutube className="h-4 w-4" />
            </Link>
          )}
          {politician.sns?.x && (
            <Link
              href={politician.sns.x}
              target="_blank"
              rel="noopener noreferrer"
              className={`${iconClass} bg-black`}
            >
              <span className="sr-only">X (Twitter)</span>
              <FaXTwitter className="h-4 w-4" />
            </Link>
          )}
          {politician.sns?.instagram && (
            <Link
              href={politician.sns.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`${iconClass} bg-pink-500`}
            >
              <span className="sr-only">Instagram</span>
              <FaInstagram className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoliticianCard; 