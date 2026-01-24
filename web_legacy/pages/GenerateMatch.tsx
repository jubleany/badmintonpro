
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GenerateMatch: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCount = location.state?.selectedCount || 8;
  const [method, setMethod] = useState<'random' | 'balance' | 'winners'>('random');

  const courts = [
    { id: 1, teamA: ['김철수 (A/남)', '이영희 (B/여)'], teamB: ['박민수 (A/남)', '최지우 (C/여)'], time: '12:00 PM', active: true },
    { id: 2, teamA: ['정우성 (S/남)', '한지민 (A/여)'], teamB: ['이정재 (A/남)', '배수지 (B/여)'], time: '12:00 PM', active: false },
  ];

  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-background-dark/90 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold tracking-widest uppercase">대진 생성</h2>
        <button className="w-10 h-10 flex items-center justify-center">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      <main className="p-4 space-y-8 pb-44">
        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-dark border border-white/10 p-5 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-primary/60">
              <span className="material-symbols-outlined !text-sm">groups</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">참가자</span>
            </div>
            <p className="text-4xl font-black">{selectedCount}</p>
          </div>
          <div className="bg-surface-dark border border-white/10 p-5 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-primary/60">
              <span className="material-symbols-outlined !text-sm">sports_tennis</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">코트</span>
            </div>
            <p className="text-4xl font-black">4</p>
          </div>
        </div>

        {/* Match Methods */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">매치 방식</h3>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button 
              onClick={() => setMethod('random')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all border shrink-0 ${method === 'random' ? 'bg-primary text-black border-primary shadow-neon' : 'bg-transparent border-white/10 text-white/40'}`}
            >
              <span className="material-symbols-outlined !text-lg">shuffle</span>
              랜덤
            </button>
            <button 
              onClick={() => setMethod('balance')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all border shrink-0 ${method === 'balance' ? 'bg-primary text-black border-primary shadow-neon' : 'bg-transparent border-white/10 text-white/40'}`}
            >
              <span className="material-symbols-outlined !text-lg">balance</span>
              실력균형
            </button>
            <button 
              onClick={() => setMethod('winners')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all border shrink-0 ${method === 'winners' ? 'bg-primary text-black border-primary shadow-neon' : 'bg-transparent border-white/10 text-white/40'}`}
            >
              <span className="material-symbols-outlined !text-lg">emoji_events</span>
              승자승
            </button>
          </div>
        </section>

        {/* Match Preview */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">생성된 대진표</h3>
            <span className="text-primary text-[10px] font-bold uppercase">1라운드</span>
          </div>

          <div className="space-y-4">
            {courts.map(court => (
              <div 
                key={court.id} 
                className={`relative bg-surface-dark rounded-2xl p-5 border overflow-hidden ${court.active ? 'border-primary/50 shadow-neon' : 'border-white/5 opacity-60'}`}
              >
                {court.active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-neon" />}
                
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    {court.active && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                    <span className="text-xs font-bold uppercase tracking-widest">{court.id}번 코트</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-primary">
                    <span className="material-symbols-outlined !text-xs">schedule</span>
                    {court.time}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest text-center">A팀</p>
                    {court.teamA.map((p, idx) => (
                      <div key={idx} className="bg-white/5 rounded-lg p-2.5 border-l-2 border-primary/40">
                        <p className="text-[11px] font-bold truncate">{p.split(' ')[0]}</p>
                        <p className="text-[8px] font-mono text-white/40">{p.split(' ')[1]}</p>
                      </div>
                    ))}
                  </div>
                  <div className="text-xl font-black italic text-white/5">VS</div>
                  <div className="flex-1 space-y-2">
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest text-center">B팀</p>
                    {court.teamB.map((p, idx) => (
                      <div key={idx} className="bg-white/5 rounded-lg p-2.5 border-r-2 border-white/20 text-right">
                        <p className="text-[11px] font-bold truncate">{p.split(' ')[0]}</p>
                        <p className="text-[8px] font-mono text-white/40">{p.split(' ')[1]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div className="sticky bottom-0 p-5 bg-gradient-to-t from-background-dark via-background-dark to-transparent">
        <button 
          onClick={() => navigate('/live')}
          className="w-full h-14 rounded-2xl bg-primary text-black font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-neon-strong active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined font-bold">autorenew</span>
          대진표 확정하기
        </button>
      </div>
    </div>
  );
};

export default GenerateMatch;
