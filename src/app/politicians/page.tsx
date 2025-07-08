import PoliticiansBrowser from '@/components/politicians/PoliticiansBrowser';
import { getPoliticians } from '@/utils/politicians';

export const metadata = {
  title: '国会議員一覧',
  description: '衆議院および参議院の現職議員情報を一覧表示します。',
};

export default function PoliticiansPage() {
  const politicians = getPoliticians();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 flex items-baseline justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">国会議員一覧</h1>
          <span className="text-sm text-gray-600 dark:text-gray-300">{politicians.length} 人</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          衆議院および参議院の現職議員情報を一覧表示しています。
        </p>
      </div>

      <PoliticiansBrowser politicians={politicians} />
    </div>
  );
} 