
import React, { useState } from 'react';
import { MOCK_ONGOING_MATCHES } from '../constants';

const LiveMatches: React.FC = () => {
  const [matches, setMatches] = useState(MOCK_ONGOING_MATCHES);
  const [filter, setFilter] = useState('전체');

  const categories = ['전체', '단식', '복식', '혼합'];

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <header className="sticky top-0 z-30 bg-background-dark/90 backdrop-blur-md pt-6 px-5 space-y-4 pb-2">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black uppercase tracking-tighter">진행 중인 경기</h2>
          <button className="w-10 h-10 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${filter === c ? 'bg-primary text-black shadow-neon' : 'bg-surface-dark text-white/40 border border-white/5'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 p-5 space-y-4 pb-32">
        {matches.map(match => (
          <div key={match.id} className="bg-surface-dark rounded-2xl border border-white/10 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-white/5">
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{match.type}</span>
                <p className="text-sm font-bold">{match.court}코트</p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">경기 중</span>
              </div>
            </div>

            <div className="p-4 space-y-6">
              {/* Teams Display */}
              <div className="flex flex-col gap-6">
                {[match.teamA, match.teamB].map((team, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="space-y-2">
                      {team.players.map(p => (
                        <div key={p.id} className="flex items-center gap-2">
                          <span className="material-symbols-outlined !text-base text-white/20">person</span>
                          <span className="font-bold text-sm">{p.name}</span>
                          <span className="px-1.5 py-0.5 rounded bg-background-dark border border-white/10 text-[8px] font-bold text-primary">A조</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-end gap-3">
                      <span className="text-white/20 text-xs font-mono mb-1">{team.sets}</span>
                      <span className={`text-4xl font-black font-mono tracking-tighter ${idx === 1 ? 'text-primary drop-shadow-neon' : 'text-white/40'}`}>
                        {team.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative h-px w-full bg-white/5 flex items-center justify-center">
                <span className="absolute bg-surface-dark px-3 text-[9px] font-black text-white/20 tracking-[0.3em]">VS</span>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button className="w-full h-12 rounded-xl border border-primary text-primary hover:bg-primary hover:text-black font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined !text-base">check_circle</span>
                경기 종료 / 결과 입력
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default LiveMatches;
