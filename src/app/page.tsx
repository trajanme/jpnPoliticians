import { getParties, getCandidates } from '@/utils/data';
import PartyCard from '@/components/parties/PartyCard';
import CandidateCard from '@/components/candidates/CandidateCard';

export default function Home() {
  const parties = getParties();
  const candidates = getCandidates();

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">政党一覧</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {parties.map((party) => (
            <PartyCard key={party.id} party={party} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">候補者一覧</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </section>
    </div>
  );
}
