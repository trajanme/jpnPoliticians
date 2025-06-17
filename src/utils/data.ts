import { Data, Party, Candidate } from '@/types/data';
import partiesData from '@/data/parties.json';
import candidatesData from '@/data/candidates.json';

const data: Data = {
  parties: partiesData.parties,
  candidates: candidatesData.candidates
};

export const getParties = (): Party[] => {
  return data.parties;
};

export const getParty = (id: string): Party | undefined => {
  return data.parties.find(party => party.id === id);
};

export const getCandidates = (): Candidate[] => {
  return data.candidates;
};

export const getCandidate = (id: string): Candidate | undefined => {
  return data.candidates.find(candidate => candidate.id === id);
};

export const getCandidatesByParty = (partyId: string): Candidate[] => {
  return data.candidates.filter(candidate => candidate.partyId === partyId);
};

export const getCandidatesByConstituency = (constituency: string): Candidate[] => {
  return data.candidates.filter(candidate => candidate.constituency === constituency);
}; 