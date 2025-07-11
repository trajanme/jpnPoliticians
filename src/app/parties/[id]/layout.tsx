import { getParty } from '@/utils/data';

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

export default function PartyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 