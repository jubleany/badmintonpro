
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_MEMBERS } from '../constants';
import { Member } from '../types';

const MemberList: React.FC = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS.map(m => ({ ...m, isSelected: false })));
  const [search, setSearch] = useState('');

  const toggleSelection = (id: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, isSelected: !m.isSelected } : m));
  };

  const filteredMembers = members.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));
  const selectedCount = members.filter(m => m.isSelected).length;

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <header className="sticky top-0 z-30 bg-background-dark/90 backdrop-blur-md border-b border-white/5 px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-white/5">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-lg font-bold tracking-widest uppercase">멤버 체크인</h2>
          <button className="w-10 h-10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>

        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">search</span>
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-dark border-white/10 border rounded-xl pl-11 pr-4 py-3.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-white/20" 
            placeholder="이름 검색"
          />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pb-44">
        <div className="flex items-end justify-between py-6">
          <h3 className="text-2xl font-bold">
            선택됨: <span className="text-primary drop-shadow-neon">{selectedCount}</span>명
          </h3>
          <span className="text-white/40 text-xs font-bold uppercase">전체: {members.length}명</span>
        </div>

        <div className="space-y-1">
          {filteredMembers.map(member => (
            <div 
              key={member.id} 
              onClick={() => toggleSelection(member.id)}
              className="flex items-center gap-4 py-3.5 border-b border-white/5 active:bg-white/5 transition-colors cursor-pointer group"
            >
              <div className="relative">
                <div 
                  className={`w-14 h-14 rounded-full bg-cover bg-center transition-all ${member.isSelected ? 'ring-2 ring-primary ring-offset-4 ring-offset-background-dark shadow-neon' : 'opacity-40 grayscale'}`}
                  style={{ backgroundImage: `url(${member.avatarUrl})` }}
                />
                {member.isSelected && <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary border-2 border-background-dark" />}
              </div>
              
              <div className="flex-1">
                <p className={`text-lg font-bold transition-colors ${member.isSelected ? 'text-white' : 'text-white/40'}`}>
                  {member.name} ({member.level} / {member.gender})
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${member.isSelected ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/20'}`}>
                    {member.status}
                  </span>
                  {member.ranking && <span className="text-white/40 text-[10px] font-medium">랭킹 {member.ranking}위</span>}
                </div>
              </div>

              <div className="shrink-0">
                <div className={`w-6 h-6 rounded border-2 transition-all flex items-center justify-center ${member.isSelected ? 'bg-primary border-primary shadow-neon' : 'border-white/10 bg-transparent'}`}>
                  {member.isSelected && <span className="material-symbols-outlined text-black font-bold !text-sm">check</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedCount >= 2 && (
        <div className="fixed bottom-[88px] left-4 right-4 z-40">
          <button 
            onClick={() => navigate('/generate-match', { state: { selectedCount }})}
            className="w-full h-14 bg-primary text-black font-black text-lg rounded-2xl shadow-neon-strong active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/20"
          >
            <span className="material-symbols-outlined font-bold">shuffle</span>
            대진 생성
          </button>
        </div>
      )}
    </div>
  );
};

export default MemberList;
