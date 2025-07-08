import { getParties } from '@/utils/data';
import { getPoliticians, compareSeniority, getPoliticiansByParty } from '@/utils/politicians';
import PartyCard from '@/components/parties/PartyCard';
import PoliticianCard from '@/components/politicians/PoliticianCard';

export default function Home() {
  const parties = getParties().sort(
    (a, b) =>
      getPoliticiansByParty(b.id).length - getPoliticiansByParty(a.id).length,
  );
  const displayPartyCount = parties.filter((p) => p.id !== 'IND').length;
  const politicians = getPoliticians().sort(compareSeniority);

  const TOTAL_MEMBERS = 713;
  const progressPercent = ((politicians.length / TOTAL_MEMBERS) * 100).toFixed(1);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 登録進捗バナー (キャンペーン情報) */}
      <div className="mb-12 rounded-lg bg-yellow-100 p-6 text-center shadow-sm dark:bg-yellow-900">
        <p className="text-lg font-bold text-yellow-800 dark:text-yellow-100">
          データ登録進捗: {politicians.length} / {TOTAL_MEMBERS} 名 ({progressPercent}%)
        </p>
        <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-200">
          全議員データの登録を目指して順次追加中です！
        </p>
      </div>
      <section className="mb-12">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">政党一覧</h2>
          <span className="text-sm text-gray-600 dark:text-gray-300">{displayPartyCount} 政党</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {parties.map((party) => (
            <PartyCard key={party.id} party={party} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">議員一覧</h2>
          <span className="text-sm text-gray-600 dark:text-gray-300">{politicians.length} 人</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {politicians.map((politician) => (
            <PoliticianCard key={politician.id} politician={politician} />
          ))}
        </div>
      </section>
    </div>
  );
}
