import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getParty, getCandidatesByParty } from '@/utils/data';
import CandidateCard from '@/components/candidates/CandidateCard';

interface PartyDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PartyDetailPageProps) {
  const { id } = await params;
  const party = getParty(id);
  
  if (!party) {
    return {
      title: '政党が見つかりません | 参議院選挙情報',
    };
  }

  return {
    title: `${party.name} | 参議院選挙情報`,
    description: party.description,
  };
}

export default async function PartyDetailPage({ params }: PartyDetailPageProps) {
  const { id } = await params;
  const party = getParty(id);

  if (!party) {
    notFound();
  }

  const candidates = getCandidatesByParty(party.id);

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
          <div className="relative h-24 w-24 flex-shrink-0">
            <Image
              src={party.logo}
              alt={`${party.name}のロゴ`}
              fill
              className="object-contain"
            />
          </div>
          
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

        <div className="flex flex-wrap gap-4">
          <a
            href={party.website}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            公式サイト
          </a>
          {candidates.length > 0 && (
            <Link
              href="#candidates"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              所属候補者を見る ({candidates.length}人)
            </Link>
          )}
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

      {/* 所属候補者 */}
      {candidates.length > 0 && (
        <div id="candidates">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            所属候補者
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {candidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>
      )}

      {candidates.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-800 dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-400">
            この政党に所属する候補者の情報はまだ登録されていません。
          </p>
        </div>
      )}
    </div>
  );
}