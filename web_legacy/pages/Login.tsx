import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface LoginProps {
  onGuestContinue?: () => void;
}

const Login: React.FC<LoginProps> = ({ onGuestContinue }) => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg('이메일과 비밀번호를 입력해 주세요.');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              name: name.trim() || email.split('@')[0],
            },
          },
        });
        if (error) throw error;

        if (data.session) {
          navigate('/');
        } else {
          setInfoMsg('회원가입이 완료되었습니다. 이메일 인증 후 로그인해 주세요.');
          setIsSignUp(false);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        navigate('/');
      }
    } catch (err: any) {
      const msg = err?.message || '인증 처리 중 오류가 발생했습니다.';
      if (msg.includes('Invalid login credentials')) {
        setErrorMsg('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else if (msg.includes('Email not confirmed')) {
        setErrorMsg('이메일 인증이 완료되지 않았습니다. 메일함을 확인해 주세요.');
      } else {
        setErrorMsg(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark flex flex-col justify-between p-6">
      <div className="pt-8">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-6 bg-primary rounded-full shadow-neon"></div>
          <h2 className="text-xl font-bold italic tracking-tighter uppercase">Badminton Pro</h2>
        </div>

        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-black tracking-tight uppercase">
            {isSignUp ? '회원가입' : '로그인'}
          </h1>
          <p className="text-white/50 text-sm">
            {isSignUp
              ? '새 계정을 만들어 클럽 멤버 및 대진을 관리하세요.'
              : 'Supabase 계정으로 로그인하여 클럽 데이터를 동기화하세요.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-3.5 focus:border-primary focus:ring-0 text-sm placeholder:text-white/20"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              autoComplete="email"
              className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-3.5 focus:border-primary focus:ring-0 text-sm placeholder:text-white/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6자 이상 입력"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-3.5 focus:border-primary focus:ring-0 text-sm placeholder:text-white/20"
            />
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {infoMsg && (
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 text-primary text-xs font-medium">
              {infoMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 mt-2 rounded-2xl bg-primary text-black font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-neon-strong active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            {loading ? '처리 중...' : isSignUp ? '회원가입' : '로그인'}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg(null);
              setInfoMsg(null);
            }}
            className="text-xs text-white/60 hover:text-primary transition-colors"
          >
            {isSignUp ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 회원가입'}
          </button>

          {onGuestContinue && (
            <button
              type="button"
              onClick={() => {
                onGuestContinue();
                navigate('/');
              }}
              className="text-xs text-white/30 hover:text-white/60 underline transition-colors"
            >
              로그인 없이 둘러보기
            </button>
          )}
        </div>
      </div>

      <p className="text-center text-[10px] text-white/20 uppercase tracking-widest">
        Powered by Supabase Auth
      </p>
    </div>
  );
};

export default Login;
