import { Data, Party, Candidate } from '@/types/data';
import partiesData from '@/data/parties.json';
import candidatesData from '@/data/candidates.json';

export const getParties = (): Party[] => {
  return partiesData.parties;
};

export const getParty = (id: string): Party | undefined => {
  return partiesData.parties.find((party) => party.id === id);
};

export const getCandidates = (): Candidate[] => {
  return candidatesData.candidates;
};

export const getCandidate = (id: string): Candidate | undefined => {
  return candidatesData.candidates.find((candidate) => candidate.id === id);
};

export const getCandidatesByParty = (partyId: string): Candidate[] => {
  return candidatesData.candidates.filter((candidate) => candidate.partyId === partyId);
};

export const getCandidatesByConstituency = (constituency: string): Candidate[] => {
  return candidatesData.candidates.filter((candidate) => candidate.constituency === constituency);
}; 