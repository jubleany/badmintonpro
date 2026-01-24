
import React from 'react';
import { MOCK_RANKINGS } from '../constants';

const Ranking: React.FC = () => {
  const top3 = MOCK_RANKINGS.slice(0, 3);
  const remaining = MOCK_RANKINGS.slice(3);

  return (
    <div className="min-h-screen flex flex-col bg-background-dark relative overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10 rounded-full" />

      <header className="sticky top-0 z-30 bg-background-dark/90 backdrop-blur-md border-b border-white/5">
        <div className="flex justify-between items-center h-16 px-4">
          <button className="w-10 h-10 flex items-center justify-center"><span className="material-symbols-outlined">arrow_back</span></button>
          <h1 className="text-lg font-black uppercase tracking-widest">실시간 랭킹</h1>
          <button className="w-10 h-10 flex items-center justify-center"><span className="material-symbols-outlined">search</span></button>
        </div>
        <div className="px-4 pb-4">
          <div className="flex p-1 rounded-xl bg-surface-darker">
            <button className="flex-1 py-2 rounded-lg bg-primary text-black font-black text-xs uppercase shadow-neon">승률순</button>
            <button className="flex-1 py-2 rounded-lg text-white/40 font-bold text-xs uppercase">다승순</button>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-44">
        {/* Podium Section */}
        <section className="px-4 py-8 flex items-end justify-center gap-4">
          {/* Rank 2 */}
          <div className="flex flex-col items-center flex-1 space-y-2">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-primary/20 p-1 bg-surface-darker">
                <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${top3[1].avatarUrl})` }} />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-surface-darker border border-primary/20 px-3 py-0.5 rounded-full text-[10px] font-black text-primary">#2</div>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold truncate w-20">{top3[1].name}</p>
              <p className="text-primary/60 text-[10px] font-black">{top3[1].winRate}%</p>
            </div>
          </div>

          {/* Rank 1 */}
          <div className="flex flex-col items-center flex-1 space-y-2 mb-4">
            <span className="material-symbols-outlined !text-3xl text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">crown</span>
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-[3px] border-primary p-1 bg-surface-darker shadow-neon-strong">
                <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${top3[0].avatarUrl})` }} />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary text-black px-4 py-1 rounded-full text-xs font-black shadow-neon">#1</div>
            </div>
            <div className="text-center pt-2">
              <p className="text-lg font-black">{top3[0].name}</p>
              <p className="text-primary font-black drop-shadow-neon text-xs">승률 {top3[0].winRate}%</p>
            </div>
          </div>

          {/* Rank 3 */}
          <div className="flex flex-col items-center flex-1 space-y-2">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-primary/20 p-1 bg-surface-darker">
                <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${top3[2].avatarUrl})` }} />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-surface-darker border border-primary/20 px-3 py-0.5 rounded-full text-[10px] font-black text-primary">#3</div>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold truncate w-20">{top3[2].name}</p>
              <p className="text-primary/60 text-[10px] font-black">{top3[2].winRate}%</p>
            </div>
          </div>
        </section>

        {/* List Header */}
        <div className="flex px-6 py-3 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] border-b border-white/5">
          <div className="w-10 text-center">순위</div>
          <div className="flex-1 ml-4">이름</div>
          <div className="w-16 text-right">승률</div>
        </div>

        {/* List Content */}
        <div className="divide-y divide-white/5">
          {remaining.map(player => (
            <div key={player.rank} className="flex items-center gap-4 px-6 py-4 bg-background-dark/50 hover:bg-white/5 transition-colors">
              <div className="w-10 text-center text-primary font-black font-display text-lg">
                {player.rank < 10 ? `0${player.rank}` : player.rank}
              </div>
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-cover bg-center border border-white/10" style={{ backgroundImage: `url(${player.avatarUrl})` }} />
                <div className="space-y-0.5">
                  <p className="font-bold text-sm">{player.name}</p>
                  <p className="text-white/20 text-[10px] font-bold uppercase tracking-wider">{player.teamName}</p>
                </div>
              </div>
              <div className="w-16 text-right font-black text-sm">{player.winRate}%</div>
            </div>
          ))}
        </div>
      </main>

      {/* Persistent Me Bar */}
      <div className="fixed bottom-[64px] left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-surface-darker/95 backdrop-blur-xl border-t border-primary/20 px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
          <div className="w-10 text-center">
            <span className="text-primary font-black text-2xl drop-shadow-neon">42</span>
          </div>
          <div className="flex-1 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-primary shadow-neon bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/me/300')` }} />
            <div>
              <div className="flex items-center gap-2">
                <p className="font-black">나</p>
                <span className="px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[8px] font-black uppercase tracking-widest">프로</span>
              </div>
              <p className="text-primary/60 text-[10px] font-bold">상위 15%</p>
            </div>
          </div>
          <div className="text-right space-y-0.5">
            <p className="text-lg font-black leading-none">64%</p>
            <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-green-500 uppercase">
              <span className="material-symbols-outlined !text-[10px] font-bold">arrow_upward</span>
              2위 상승
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
