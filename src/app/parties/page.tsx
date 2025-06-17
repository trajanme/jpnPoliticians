import { getParties } from '@/utils/data';
import PartyCard from '@/components/parties/PartyCard';

export const metadata = {
  title: '政党一覧 | 参議院選挙情報',
  description: '参議院選挙に参加する政党の一覧です。各政党の基本情報、政策、公式サイトを確認できます。',
};

export default function PartiesPage() {
  const parties = getParties();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">政党一覧</h1>
        <p className="text-gray-600 dark:text-gray-400">
          参議院選挙に参加する政党の一覧です。各政党の基本情報、政策、公式サイトを確認できます。
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