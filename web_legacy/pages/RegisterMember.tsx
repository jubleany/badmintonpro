
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Level, Gender } from '../types';

const RegisterMember: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [level, setLevel] = useState<Level>('자급');
  const [gender, setGender] = useState<Gender>('남');

  const levels: Level[] = ['자급', 'A', 'B', 'C', 'D', 'E', '초심'];

  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
      <header className="sticky top-0 z-50 flex items-center p-4 bg-background-dark/90 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold pr-10">멤버 등록</h1>
      </header>

      <main className="flex-1 p-6 space-y-10">
        {/* Avatar Upload */}
        <section className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full border-2 border-dashed border-primary/40 bg-surface-dark flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined !text-4xl text-white/20">person</span>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center shadow-lg border-2 border-background-dark">
              <span className="material-symbols-outlined !text-lg">edit</span>
            </button>
          </div>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest">프로필 사진 업로드</p>
        </section>

        {/* Name Input */}
        <section className="space-y-3">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">이름</label>
          <div className="relative">
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-4 focus:border-primary focus:ring-0 transition-colors text-base placeholder:text-white/20" 
              placeholder="이름을 입력하세요"
            />
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-white/20">person</span>
          </div>
        </section>

        {/* Level Selection */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">급수</label>
            <span className="text-primary text-[10px] font-bold uppercase cursor-pointer hover:underline">급수 가이드</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  level === l ? 'bg-primary text-black shadow-neon' : 'bg-surface-dark border border-white/5 text-white/40'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </section>

        {/* Gender Selection */}
        <section className="space-y-3">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">성별</label>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setGender('남')}
              className={`flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all relative ${
                gender === '남' ? 'bg-primary/10 border-primary shadow-neon' : 'bg-surface-dark border-white/5'
              }`}
            >
              <span className={`material-symbols-outlined !text-3xl ${gender === '남' ? 'text-primary' : 'text-white/20'}`}>male</span>
              <span className={`text-sm font-bold ${gender === '남' ? 'text-white' : 'text-white/40'}`}>남성</span>
              {gender === '남' && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined !text-xs text-black font-bold">check</span>
                </div>
              )}
            </button>
            <button 
              onClick={() => setGender('여')}
              className={`flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all relative ${
                gender === '여' ? 'bg-primary/10 border-primary shadow-neon' : 'bg-surface-dark border-white/5'
              }`}
            >
              <span className={`material-symbols-outlined !text-3xl ${gender === '여' ? 'text-primary' : 'text-white/20'}`}>female</span>
              <span className={`text-sm font-bold ${gender === '여' ? 'text-white' : 'text-white/40'}`}>여성</span>
              {gender === '여' && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined !text-xs text-black font-bold">check</span>
                </div>
              )}
            </button>
          </div>
        </section>
      </main>

      <div className="sticky bottom-0 p-5 bg-gradient-to-t from-background-dark via-background-dark to-transparent">
        <button 
          onClick={() => navigate('/members')}
          className="w-full h-14 rounded-2xl bg-primary text-black font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-neon-strong active:scale-[0.98] transition-transform"
        >
          등록 완료
          <span className="material-symbols-outlined font-bold">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterMember;
