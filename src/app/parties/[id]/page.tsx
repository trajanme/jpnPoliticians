'use client';

import { useState } from 'react';
import { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getParty } from '@/utils/data';
import { getPoliticiansByParty, calculateAge } from '@/utils/politicians';
import PoliticianCard from '@/components/politicians/PoliticianCard';
import { FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';

export default function PartyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const party = getParty(id);

  if (!party) {
    notFound();
  }

  const [viewType, setViewType] = useState<'all' | 'lower' | 'upper'>('all');
  const [sortType, setSortType] = useState<'name' | 'age' | 'firstElected'>('firstElected');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const allPoliticians = getPoliticiansByParty(party.id);
  // ビュー切り替えフィルタ
  const filteredPoliticians = viewType === 'all'
    ? allPoliticians
    : allPoliticians.filter(p => p.house === (viewType === 'lower' ? '衆議院' : '参議院'));

  // ソート機能
  const politicians = [...filteredPoliticians].sort((a, b) => {
    let comparison = 0;
    
    if (sortType === 'name') {
      comparison = a.kana.localeCompare(b.kana, 'ja');
    } else if (sortType === 'age') {
      const ageA = a.birthDate ? calculateAge(a.birthDate) : 0;
      const ageB = b.birthDate ? calculateAge(b.birthDate) : 0;
      comparison = ageA - ageB;
    } else if (sortType === 'firstElected') {
      const yearA = parseInt(a.firstElected, 10);
      const yearB = parseInt(b.firstElected, 10);
      comparison = yearA - yearB;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  const lowerCount = allPoliticians.filter((p) => p.house === '衆議院').length;
  const upperCount = allPoliticians.filter((p) => p.house === '参議院').length;

  // 年代分布と平均年齢計算
  const ageBuckets = [
    { key: '20s', label: '20代', color: '#4ade80', count: 0 },
    { key: '30s', label: '30代', color: '#22d3ee', count: 0 },
    { key: '40s', label: '40代', color: '#3b82f6', count: 0 },
    { key: '50s', label: '50代', color: '#8b5cf6', count: 0 },
    { key: '60s', label: '60代', color: '#ec4899', count: 0 },
    { key: '70s', label: '70代', color: '#ef4444', count: 0 },
    { key: '80s', label: '80代以上', color: '#dc2626', count: 0 },
  ];

  let totalAge = 0;
  let ageCount = 0;

  politicians.forEach((p) => {
    if (!p.birthDate) return;
    const age = calculateAge(p.birthDate);
    totalAge += age;
    ageCount++;
    
    if (age < 30) ageBuckets[0].count++;
    else if (age < 40) ageBuckets[1].count++;
    else if (age < 50) ageBuckets[2].count++;
    else if (age < 60) ageBuckets[3].count++;
    else if (age < 70) ageBuckets[4].count++;
    else if (age < 80) ageBuckets[5].count++;
    else ageBuckets[6].count++;
  });

  const averageAge = ageCount > 0 ? (totalAge / ageCount) : 0;

  // 男女比計算
  const genderStats = [
    { key: 'male', label: '男性', color: '#3b82f6', count: 0 },
    { key: 'female', label: '女性', color: '#ec4899', count: 0 },
  ];

  politicians.forEach((p) => {
    if (p.gender === '男性') genderStats[0].count++;
    else if (p.gender === '女性') genderStats[1].count++;
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
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">年代分布</h2>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              平均年齢: <span className="text-blue-600 dark:text-blue-400">{averageAge.toFixed(1)}歳</span>
            </div>
          </div>
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
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-200 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {ageBuckets.map(({ key, label, color, count }) => {
              const percent = politicians.length === 0 ? 0 : (count / politicians.length) * 100;
              return (
                <div key={key} className="flex items-center space-x-1 whitespace-nowrap">
                  <span className="inline-block h-3 w-3 rounded flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="truncate">{label}</span>
                  <span className="ml-auto flex-shrink-0">{count} ({percent.toFixed(1)}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 男女比 */}
      {politicians.length > 0 && (
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">男女比</h2>
          <div className="mb-4 h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 flex">
            {genderStats.map(({ key, color, count }) => {
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
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-200">
            {genderStats.map(({ key, label, color, count }) => {
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
      {allPoliticians.length > 0 && (
        <div id="politicians">
          {/* ビュー切り替えタブ */}
          <div className="mb-4">
            <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
              {[
                { key: 'all', label: '全体' },
                { key: 'lower', label: '衆議院' },
                { key: 'upper', label: '参議院' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setViewType(key as 'all' | 'lower' | 'upper')}
                  className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    viewType === key
                      ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              所属議員
            </h2>
            {/* ソート機能 */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">ソート:</span>
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="sortType"
                    value="firstElected"
                    checked={sortType === 'firstElected'}
                    onChange={(e) => setSortType(e.target.value as 'name' | 'age' | 'firstElected')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-700 dark:text-gray-300">初当選順</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="sortType"
                    value="name"
                    checked={sortType === 'name'}
                    onChange={(e) => setSortType(e.target.value as 'name' | 'age' | 'firstElected')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-700 dark:text-gray-300">名前順</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="sortType"
                    value="age"
                    checked={sortType === 'age'}
                    onChange={(e) => setSortType(e.target.value as 'name' | 'age' | 'firstElected')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-700 dark:text-gray-300">年齢順</span>
                </label>
              </div>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex items-center space-x-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                {sortOrder === 'asc' ? (
                  <>
                    <FaSortAmountUp className="h-3 w-3" />
                    <span>昇順</span>
                  </>
                ) : (
                  <>
                    <FaSortAmountDown className="h-3 w-3" />
                    <span>降順</span>
                  </>
                )}
              </button>
            </div>
          </div>
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