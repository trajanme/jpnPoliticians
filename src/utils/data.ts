import type { Party } from '@/types/data';
import partiesData from '@/data/parties.json';
import { PartySchema } from '@/schemas/data';

// バリデーションを実行し、不正なデータがあればビルド時に例外を投げる
const parties: Party[] = PartySchema.array().parse(partiesData.parties);

export const getParties = (): Party[] => {
  return parties;
};

export const getParty = (id: string): Party | undefined => {
  return parties.find(party => party.id === id);
}; 