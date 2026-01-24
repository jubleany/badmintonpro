
export type Level = '자급' | 'A' | 'B' | 'C' | 'D' | 'E' | '초심';
export type Gender = '남' | '여';

export interface Member {
  id: string;
  name: string;
  level: Level;
  gender: Gender;
  avatarUrl?: string;
  ranking?: number;
  winRate?: number;
  isSelected?: boolean;
  status?: string;
}

export interface Team {
  players: Member[];
  score: number;
  sets: number;
}

export interface Match {
  id: string;
  court: number;
  type: '남자복식' | '여자복식' | '혼합복식' | '단식';
  teamA: Team;
  teamB: Team;
  status: 'ongoing' | 'finished';
  time: string;
}

export interface RankingEntry {
  rank: number;
  name: string;
  teamName: string;
  winRate: number;
  avatarUrl: string;
  isCurrentUser?: boolean;
  rankChange?: number;
}
