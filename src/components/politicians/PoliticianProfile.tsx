import { Politician } from '@/types/politician';
import { getParty } from '@/utils/data';
import { calculateAge } from '@/utils/politicians';
import Link from 'next/link';
import { FaYoutube, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface Props {
  politician: Politician;
}

const PoliticianProfile = ({ politician }: Props) => {
  const party = getParty(politician.partyId);
  const age = politician.birthDate ? calculateAge(politician.birthDate) : undefined;

  const infoRows: Array<[string, string | number | undefined]> = [
    ['ふりがな', politician.kana],
    ['役職', politician.position],
    ['所属院', politician.house],
    ['選挙区', politician.constituency],
    ['政党', party?.name ?? ''],
    ['会派', politician.caucus ?? ''],
    ['当選回数', politician.electionCount],
    ['初当選', politician.firstElected],
    ['年齢', age !== undefined ? `${age}歳` : ''],
  ];

  const iconClass =
    'inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-opacity disabled:opacity-30';

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {politician.name}
        </h1>
        {party && (
          <span
            className="rounded-full px-3 py-1 text-sm font-medium text-white"
            style={{ backgroundColor: party.color }}
          >
            {party.shortName}
          </span>
        )}
      </div>

      {/* Info table */}
      <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm">
          <tbody>
            {infoRows.map(([label, value]) =>
              value ? (
                <tr key={label} className="border-b border-gray-200 dark:border-gray-700">
                  <th className="w-32 bg-gray-50 px-4 py-2 text-left font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                    {label}
                  </th>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                    {label === '役職' ? <strong>{value}</strong> : value}
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>

      {/* SNS buttons */}
      <div className="flex gap-4">
        {politician.sns?.youtube && (
          <Link
            href={politician.sns.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className={`${iconClass} bg-red-600`}
          >
            <span className="sr-only">YouTube</span>
            <FaYoutube className="h-5 w-5" />
          </Link>
        )}
        {politician.sns?.x && (
          <Link
            href={politician.sns.x}
            target="_blank"
            rel="noopener noreferrer"
            className={`${iconClass} bg-black`}
          >
            <span className="sr-only">X</span>
            <FaXTwitter className="h-5 w-5" />
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
            <FaInstagram className="h-5 w-5" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default PoliticianProfile; 