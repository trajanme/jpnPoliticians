import { Politician, PoliticianSchema } from '@/schemas/politician';
import politiciansRaw from '@/data/politicians.json';

// 型ガード兼バリデーション
const politicians: Politician[] = (politiciansRaw as { politicians: unknown[] }).politicians.map((p: unknown) =>
  PoliticianSchema.parse(p)
);

// disabledフラグがtrueでない議員のみを取得するヘルパー関数
const getActivePoliticians = (): Politician[] => 
  politicians.filter((p) => !p.disabled);

export const getPoliticians = (): Politician[] => getActivePoliticians();

// 指定政党に所属する議員一覧を取得（disabledフラグを考慮）
export const getPoliticiansByParty = (partyId: string): Politician[] =>
  getActivePoliticians().filter((p) => p.partyId === partyId);

export const getPolitician = (id: string): Politician | undefined =>
  getActivePoliticians().find((p) => p.id === id);

// 2025年参議院選挙当選者のみを取得
export const getElected2025Politicians = (): Politician[] =>
  getActivePoliticians().filter((p) => p.elected2025 === true);

// 2025年参議院選挙当選者で指定政党に所属する議員を取得
export const getElected2025PoliticiansByParty = (partyId: string): Politician[] =>
  getElected2025Politicians().filter((p) => p.partyId === partyId);

export const calculateAge = (birthDate: string): number => {
  const dob = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

// 並び順: 初当選が早い順、次に生年月日が古い順
export const compareSeniority = (a: Politician, b: Politician): number => {
  const yearA = parseInt(a.firstElected, 10);
  const yearB = parseInt(b.firstElected, 10);
  if (yearA !== yearB) return yearA - yearB; // earlier first

  if (a.birthDate && b.birthDate) {
    // older birthDate first
    return new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime();
  }
  // If only one has birthDate, the one with date comes first
  if (a.birthDate) return -1;
  if (b.birthDate) return 1;
  return 0;
}; 