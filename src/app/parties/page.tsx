import { getParties } from '@/utils/data';
import { getPoliticiansByParty } from '@/utils/politicians';
import PartyCard from '@/components/parties/PartyCard';

export const metadata = {
  title: '政党一覧 | 国会議員検索サービス',
  description: '主要政党の基本情報を一覧で表示します。',
};

export default function PartiesPage() {
  const parties = getParties().sort(
    (a, b) => getPoliticiansByParty(b.id).length - getPoliticiansByParty(a.id).length,
  );
  const displayPartyCount = parties.filter((p) => p.id !== 'IND').length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 flex items-baseline justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">政党一覧</h1>
          <span className="text-sm text-gray-600 dark:text-gray-300">{displayPartyCount} 政党</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          政党名や概要、公式サイトへのリンクを確認できます。
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {parties.map((party) => (
          <PartyCard key={party.id} party={party} />
        ))}
      </div>

      {parties.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">政党データが見つかりません。</p>
        </div>
      )}
    </div>
  );
}