
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      {/* Background with Player */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] scale-110 hover:scale-100"
        style={{ 
          backgroundImage: `linear-gradient(to top, #121212 10%, transparent 60%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoRQpoqeR99vNyVPXke47bLTr512-KvURak808isRd-gbyKD3LMHm2F5MASL6i6RKnY_JE1w4fVtQxGxPa9hPGxwBGm8sRndps4XLU30bCcuFAgJnfO4O5P71uh6u4qTLBvJ9NHXC7Jv7Zbxstzc-ekLM7U6scqFTlWd6SvUbFLg96RhD52bGljDXdCIxQMCb2VlEmr2_aweXI6fOjm4uQ-evxRX25NBCy2S1Tdj8M-8m1YQnE3zKKaNFc_aDTLRHO--stlrCk1ag')` 
        }}
      >
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
      </div>

      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-6 bg-primary rounded-full shadow-neon"></div>
          <h2 className="text-xl font-bold italic tracking-tighter uppercase">Badminton Pro</h2>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined !text-xl">history</span>
        </button>
      </header>

      <main className="relative z-10 flex-1 flex flex-col justify-end p-6 gap-8 mb-24">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-neon"></span>
            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Ready to play</span>
          </div>
          
          <h1 className="text-6xl font-black leading-[0.85] tracking-tighter uppercase">
            Smash<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Limits</span>
          </h1>
          
          <p className="text-white/60 text-sm max-w-[80%] leading-relaxed font-medium">
            Track your performance, analyze your smash power, and dominate the court today.
          </p>
        </div>

        <button 
          onClick={() => navigate('/members')}
          className="group relative h-16 w-full rounded-2xl bg-primary text-black font-bold uppercase tracking-wider text-lg shadow-neon-strong active:scale-95 transition-all overflow-hidden flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined font-bold">sports_tennis</span>
          Start Match
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
        </button>
      </main>
    </div>
  );
};

export default Home;
