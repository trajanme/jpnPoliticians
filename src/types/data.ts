export interface Party {
  id: string;
  name: string;
  shortName: string;
  color: string;
  description: string;
  website: string;
  logo: string;
  founded?: number;
  policies?: string[];
}

export interface Candidate {
  id: string;
  name: string;
  partyId: string;
  constituency: string;
  age: number;
  gender: string;
  occupation: string;
  career: string[];
  policies: string[];
  image: string;
}

export interface Data {
  parties: Party[];
  candidates: Candidate[];
} 