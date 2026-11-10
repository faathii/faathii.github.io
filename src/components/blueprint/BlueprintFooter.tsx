import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const BlueprintFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-8 border-t border-cyan-500/20 bg-slate-950 text-zinc-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">{PERSONAL_INFO.name}</span>
          <span>•</span>
          <span className="text-zinc-400">{PERSONAL_INFO.title}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-zinc-500 text-[11px]">Diseñado y desarrollado con React & TypeScript</span>
          <button
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400/50 text-cyan-400 hover:text-white transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

