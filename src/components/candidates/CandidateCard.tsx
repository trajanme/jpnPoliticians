import Image from 'next/image';
import Link from 'next/link';
import { Candidate } from '@/types/data';
import { getParty } from '@/utils/data';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard = ({ candidate }: CandidateCardProps) => {
  const party = getParty(candidate.partyId);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="relative h-48 w-full">
        <Image
          src={candidate.image}
          alt={candidate.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xl font-bold">{candidate.name}</h3>
          {party && (
            <span
              className="rounded-full px-3 py-1 text-xs font-medium text-white"
              style={{ backgroundColor: party.color }}
            >
              {party.shortName}
            </span>
          )}
        </div>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {candidate.constituency}選挙区
        </p>
        <div className="mb-4">
          <h4 className="mb-2 text-sm font-semibold">主な政策</h4>
          <ul className="list-inside list-disc text-sm text-gray-600 dark:text-gray-400">
            {candidate.policies.slice(0, 2).map((policy, index) => (
              <li key={index}>{policy}</li>
            ))}
          </ul>
        </div>
        <Link
          href={`/candidates/${candidate.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          詳細を見る
        </Link>
      </div>
    </div>
  );
};

export default CandidateCard; 