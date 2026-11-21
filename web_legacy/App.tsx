
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import Home from './pages/Home';
import RegisterMember from './pages/RegisterMember';
import MemberList from './pages/MemberList';
import GenerateMatch from './pages/GenerateMatch';
import LiveMatches from './pages/LiveMatches';
import Ranking from './pages/Ranking';
import Login from './pages/Login';

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-surface-darker/95 backdrop-blur-md border-t border-white/5 safe-bottom z-50">
      <div className="flex justify-around items-center h-16">
        <Link to="/" className={`flex flex-col items-center gap-1 flex-1 ${isActive('/') ? 'text-primary' : 'text-white/40'}`}>
          <span className="material-symbols-outlined !text-2xl">home</span>
          <span className="text-[10px] font-medium">홈</span>
        </Link>
        <Link to="/register" className={`flex flex-col items-center gap-1 flex-1 ${isActive('/register') ? 'text-primary' : 'text-white/40'}`}>
          <span className="material-symbols-outlined !text-2xl">add_circle</span>
          <span className="text-[10px] font-medium">등록</span>
        </Link>
        <Link to="/members" className={`flex flex-col items-center gap-1 flex-1 ${isActive('/members') ? 'text-primary' : 'text-white/40'}`}>
          <span className="material-symbols-outlined !text-2xl">groups</span>
          <span className="text-[10px] font-medium">멤버</span>
        </Link>
        <Link to="/live" className={`flex flex-col items-center gap-1 flex-1 ${isActive('/live') ? 'text-primary' : 'text-white/40'}`}>
          <span className="material-symbols-outlined !text-2xl">sports_tennis</span>
          <span className="text-[10px] font-medium">진행중</span>
        </Link>
        <Link to="/ranking" className={`flex flex-col items-center gap-1 flex-1 ${isActive('/ranking') ? 'text-primary' : 'text-white/40'}`}>
          <span className="material-symbols-outlined !text-2xl">leaderboard</span>
          <span className="text-[10px] font-medium">랭킹</span>
        </Link>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [guestMode, setGuestMode] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession) {
        setGuestMode(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background-dark text-white font-body selection:bg-primary selection:text-black flex justify-center">
        <div className="w-full max-w-md relative pb-20 shadow-2xl border-x border-white/5 bg-background-dark">
          {authLoading ? (
            <div className="min-h-screen flex items-center justify-center text-white/40 text-sm">
              로딩 중...
            </div>
          ) : !session && !guestMode ? (
            <Login onGuestContinue={() => setGuestMode(true)} />
          ) : (
            <>
              <Routes>
                <Route path="/" element={<Home session={session} />} />
                <Route path="/login" element={<Login onGuestContinue={() => setGuestMode(true)} />} />
                <Route path="/register" element={<RegisterMember />} />
                <Route path="/members" element={<MemberList />} />
                <Route path="/generate-match" element={<GenerateMatch />} />
                <Route path="/live" element={<LiveMatches />} />
                <Route path="/ranking" element={<Ranking />} />
              </Routes>
              <BottomNav />
            </>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
