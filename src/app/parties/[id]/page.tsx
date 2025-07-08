/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getParty } from '@/utils/data';
import { getPoliticiansByParty, compareSeniority, calculateAge } from '@/utils/politicians';
import PoliticianCard from '@/components/politicians/PoliticianCard';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const party = getParty(id);
  
  if (!party) {
    return {
      title: '政党が見つかりません | 国会議員検索サービス',
    };
  }

  return {
    title: `${party.name} | 国会議員検索サービス`,
    description: party.description,
  };
}

export default async function PartyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const party = getParty(id);

  if (!party) {
    notFound();
  }

  const politicians = getPoliticiansByParty(party.id).sort(compareSeniority);
  const lowerCount = politicians.filter((p) => p.house === '衆議院').length;
  const upperCount = politicians.filter((p) => p.house === '参議院').length;

  // 年代分布
  const ageBuckets = [
    { key: '20s', label: '20代', color: '#4ade80', count: 0 },
    { key: '30s', label: '30代', color: '#22d3ee', count: 0 },
    { key: '40s', label: '40代', color: '#60a5fa', count: 0 },
    { key: '50s', label: '50代', color: '#818cf8', count: 0 },
    { key: '60s', label: '60代', color: '#a78bfa', count: 0 },
    { key: '70s', label: '70代以上', color: '#c084fc', count: 0 },
  ];

  politicians.forEach((p) => {
    if (!p.birthDate) return;
    const age = calculateAge(p.birthDate);
    if (age < 30) ageBuckets[0].count++;
    else if (age < 40) ageBuckets[1].count++;
    else if (age < 50) ageBuckets[2].count++;
    else if (age < 60) ageBuckets[3].count++;
    else if (age < 70) ageBuckets[4].count++;
    else ageBuckets[5].count++;
  });

  // SNS 利用状況集計
  const snsStats = [
    {
      key: 'x',
      label: '𝕏',
      color: '#000000',
      count: politicians.filter((p) => p.sns?.x).length,
    },
    {
      key: 'youtube',
      label: 'YouTube',
      color: '#DC2626', // red-600
      count: politicians.filter((p) => p.sns?.youtube).length,
    },
    {
      key: 'instagram',
      label: 'Instagram',
      color: '#DB2777', // pink-600
      count: politicians.filter((p) => p.sns?.instagram).length,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* パンくずナビ */}
      <nav className="mb-8 text-sm">
        <ol className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">
              ホーム
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/parties" className="hover:text-gray-700 dark:hover:text-gray-200">
              政党一覧
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 dark:text-white">{party.name}</li>
        </ol>
      </nav>

      {/* 政党基本情報 */}
      <div className="mb-12 rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div 
          className="mb-6 h-2 rounded-full"
          style={{ backgroundColor: party.color }}
        />
        
        <div className="mb-6 flex flex-col items-start gap-6 md:flex-row md:items-center">
          {party.logo && (
            <div className="relative h-24 w-24 flex-shrink-0">
              <Image
                src={party.logo}
                alt={`${party.name}のロゴ`}
                fill
                className="object-contain"
              />
            </div>
          )}
          
          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              {party.name}
            </h1>
            <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
              {party.shortName && `${party.shortName}`}
              {party.founded && (party.shortName ? ` | 設立: ${party.founded}年` : `設立: ${party.founded}年`)}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {party.description}
            </p>
          </div>
        </div>

        {/* 議員数表示 */}
        <p className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
          {politicians.length} 人{' '}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            (衆: {lowerCount}人、参: {upperCount}人)
          </span>
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={party.website}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            公式サイト
          </a>
        </div>
      </div>

      {/* 政策・公約 */}
      {party.policies && party.policies.length > 0 && (
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            主要政策・公約
          </h2>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <ul className="space-y-3">
              {party.policies.map((policy, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300">{policy}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 年代分布 */}
      {politicians.length > 0 && (
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">年代分布</h2>
          <div className="mb-4 h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 flex">
            {ageBuckets.map(({ key, color, count }) => {
              const percent = politicians.length === 0 ? 0 : (count / politicians.length) * 100;
              return (
                <div
                  key={key}
                  style={{ width: `${percent}%`, backgroundColor: color }}
                  className="h-full"
                />
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-200 sm:grid-cols-3 md:grid-cols-6">
            {ageBuckets.map(({ key, label, color, count }) => {
              const percent = politicians.length === 0 ? 0 : (count / politicians.length) * 100;
              return (
                <div key={key} className="flex items-center space-x-1">
                  <span className="inline-block h-3 w-3 rounded" style={{ backgroundColor: color }} />
                  <span>{label}</span>
                  <span className="ml-auto">{count} ({percent.toFixed(1)}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SNS 利用状況 */}
      {politicians.length > 0 && (
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">SNS 利用状況</h2>
          <div className="space-y-4">
            {snsStats.map(({ key, label, color, count }) => {
              const percent = politicians.length === 0 ? 0 : (count / politicians.length) * 100;
              return (
                <div key={key}>
                  <div className="mb-1 flex justify-between text-sm font-medium text-gray-700 dark:text-gray-200">
                    <span>{label}</span>
                    <span>
                      {count} / {politicians.length} ({percent.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full"
                      style={{ width: `${percent}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 所属議員 */}
      {politicians.length > 0 && (
        <div id="politicians">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            所属議員
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {politicians.map((pol) => (
              <PoliticianCard key={pol.id} politician={pol} />
            ))}
          </div>
        </div>
      )}

      {politicians.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-800 dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-400">
            この政党に所属する議員の情報はまだ登録されていません。
          </p>
        </div>
      )}
    </div>
  );
}