'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getParties } from '@/utils/data';
import { getPoliticians, getPoliticiansByParty, calculateAge } from '@/utils/politicians';
import { HiSparkles } from 'react-icons/hi';

type ViewType = 'all' | 'lower' | 'upper';

export default function Home() {
  const [viewType, setViewType] = useState<ViewType>('all');
  
  const parties = getParties().sort((a, b) => {
    // 与党を優先表示
    if (a.isRuling && !b.isRuling) return -1;
    if (!a.isRuling && b.isRuling) return 1;
    // 与党同士、野党同士は人数順
    return getPoliticiansByParty(b.id).length - getPoliticiansByParty(a.id).length;
  });
  const allPoliticians = getPoliticians();
  
  // 表示する議員をフィルタリング
  const politicians = viewType === 'all' 
    ? allPoliticians 
    : allPoliticians.filter(p => p.house === (viewType === 'lower' ? '衆議院' : '参議院'));

  const TOTAL_MEMBERS = viewType === 'all' ? 713 : viewType === 'lower' ? 465 : 248;
  const progressPercent = ((politicians.length / TOTAL_MEMBERS) * 100).toFixed(1);

  // 政党別人数集計
  const partyStats = parties
    .map(party => {
      const count = getPoliticiansByParty(party.id).filter(p => 
        viewType === 'all' || p.house === (viewType === 'lower' ? '衆議院' : '参議院')
      ).length;
      return { ...party, count };
    })
    .filter(party => party.count > 0);

  // 年齢分布計算
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



  const totalCount = politicians.length;
  const actualTotalCount = totalCount;
  const majorityThreshold = Math.ceil(actualTotalCount / 2);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 flex items-baseline justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">国会議員検索サービス</h1>
          <span className="text-sm text-gray-600 dark:text-gray-300">{politicians.length} 人</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          衆議院および参議院の現職議員情報を一覧表示しています。
        </p>
      </div>

      {/* ビュー切り替えタブ */}
      <div className="mb-8">
        <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
          {[
            { key: 'all', label: '全体' },
            { key: 'lower', label: '衆議院' },
            { key: 'upper', label: '参議院' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setViewType(key as ViewType)}
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

      {/* 進捗バー */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            議員数
          </h2>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {politicians.length} / {TOTAL_MEMBERS} ({progressPercent}%)
          </span>
        </div>
        <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 年齢分布 */}
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

      {/* 男女比 */}
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



      {/* 政党別人数 */}
      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">政党別人数</h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            総数: {actualTotalCount}人 / 過半数: {majorityThreshold}人
          </div>
        </div>
        
        <div className="relative h-16 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
          {/* 過半数を示す破線 */}
          <div 
            className="absolute top-0 h-full w-0.5 border-l-2 border-dashed border-red-600 dark:border-red-400 z-10"
            style={{ 
              left: `${(majorityThreshold / actualTotalCount) * 100}%`,
              opacity: 0.3
            }}
            title={`過半数: ${majorityThreshold}人`}
          />
          
          {partyStats.map((party, index) => {
            const width = (party.count / totalCount) * 100;
            const left = partyStats
              .slice(0, index)
              .reduce((acc, p) => acc + (p.count / totalCount) * 100, 0);
            
            return (
              <Link
                key={party.id}
                href={`/parties/${party.id}`}
                className="group absolute h-full transition-all hover:brightness-110"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  backgroundColor: party.color,
                }}
                title={`${party.name}: ${party.count}人`}
              >
                <div className="flex h-full items-center justify-center">
                  <span className="text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {party.count}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* 凡例 */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partyStats.map((party) => (
            <Link
              key={party.id}
              href={`/parties/${party.id}`}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: party.color }}
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {party.name}
                    {party.isRuling && (
                      <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-0.5 text-xs font-bold text-white">
                        <HiSparkles className="h-3 w-3" />
                        与党
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {party.shortName}
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {party.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 最終更新日 */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        最終更新: 2025年7月22日
      </div>
    </div>
  );
}
