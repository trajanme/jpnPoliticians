/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPolitician } from '@/utils/politicians';
import PoliticianProfile from '@/components/politicians/PoliticianProfile';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pol = getPolitician(id);
  if (!pol) return {};
  return {
    title: `${pol.name} | 国会議員プロフィール`,
    description: `${pol.name}（${pol.kana}）の国会議員プロフィールページ`,
  };
}

export default function PoliticianPage({ params }: { params: { id: string } }) {
  const politician = getPolitician(params.id);
  if (!politician) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {politician && <PoliticianProfile politician={politician} />}
    </div>
  );
} 