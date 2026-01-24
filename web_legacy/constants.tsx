
import { Member, RankingEntry, Match } from './types';

export const MOCK_MEMBERS: Member[] = [
  { id: '1', name: '알렉스 첸', level: 'A', gender: '남', avatarUrl: 'https://picsum.photos/seed/alex/300', ranking: 4, status: '프로' },
  { id: '2', name: '사라 젠킨스', level: 'B', gender: '여', avatarUrl: 'https://picsum.photos/seed/sarah/300', status: '중급' },
  { id: '3', name: '마이크 로스', level: 'A', gender: '남', avatarUrl: 'https://picsum.photos/seed/mike/300', status: '상급' },
  { id: '4', name: '린다 킴', level: 'C', gender: '여', avatarUrl: 'https://picsum.photos/seed/linda/300', status: '초급' },
  { id: '5', name: '데이비드 박', level: 'B', gender: '남', avatarUrl: 'https://picsum.photos/seed/david/300', status: '중급' },
  { id: '6', name: '엠마 윌슨', level: 'D', gender: '여', avatarUrl: 'https://picsum.photos/seed/emma/300', status: '일반' },
  { id: '7', name: '김철수', level: 'A', gender: '남', avatarUrl: 'https://picsum.photos/seed/chulsu/300', status: '프로' },
  { id: '8', name: '박민수', level: 'B', gender: '남', avatarUrl: 'https://picsum.photos/seed/minsu/300', status: '상급' },
];

export const MOCK_RANKINGS: RankingEntry[] = [
  { rank: 1, name: '리암', teamName: '스매시 킹즈', winRate: 96, avatarUrl: 'https://picsum.photos/seed/liam/300' },
  { rank: 2, name: '노아', teamName: '드롭 매니아', winRate: 92, avatarUrl: 'https://picsum.photos/seed/noah/300' },
  { rank: 3, name: '엠마', teamName: '클리어 마스터', winRate: 89, avatarUrl: 'https://picsum.photos/seed/emma/300' },
  { rank: 4, name: '올리버', teamName: '팀 스매시', winRate: 85, avatarUrl: 'https://picsum.photos/seed/oliver/300' },
  { rank: 5, name: '제임스', teamName: '라켓 리벨스', winRate: 82, avatarUrl: 'https://picsum.photos/seed/james/300' },
  { rank: 6, name: '소피아', teamName: '넷 닌자', winRate: 78, avatarUrl: 'https://picsum.photos/seed/sophia/300' },
  { rank: 7, name: '루카스', teamName: '셔틀 마스터', winRate: 75, avatarUrl: 'https://picsum.photos/seed/lucas/300' },
  { rank: 8, name: '미아', teamName: '코트 룰러', winRate: 72, avatarUrl: 'https://picsum.photos/seed/mia/300' },
];

export const MOCK_ONGOING_MATCHES: Match[] = [
  {
    id: 'm1',
    court: 1,
    type: '남자복식',
    status: 'ongoing',
    time: '12:00 PM',
    teamA: {
      players: [
        { id: 'p1', name: '김철수', level: 'A', gender: '남' },
        { id: 'p2', name: '박민수', level: 'A', gender: '남' }
      ],
      score: 18,
      sets: 1
    },
    teamB: {
      players: [
        { id: 'p3', name: '최지훈', level: 'A', gender: '남' },
        { id: 'p4', name: '정우성', level: 'A', gender: '남' }
      ],
      score: 19,
      sets: 1
    }
  },
  {
    id: 'm2',
    court: 2,
    type: '혼합복식',
    status: 'ongoing',
    time: '12:00 PM',
    teamA: {
      players: [
        { id: 'p5', name: '이민호', level: 'B', gender: '남' },
        { id: 'p6', name: '김지원', level: 'B', gender: '여' }
      ],
      score: 11,
      sets: 0
    },
    teamB: {
      players: [
        { id: 'p7', name: '박서준', level: 'B', gender: '남' },
        { id: 'p8', name: '한소희', level: 'B', gender: '여' }
      ],
      score: 8,
      sets: 1
    }
  }
];
