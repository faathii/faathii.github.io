import React from 'react';
import { ArrowUp, Compass } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const BlueprintFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-8 border-t border-cyan-500/30 bg-[#050d1a] text-cyan-500/80 font-mono text-[11px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white">{PERSONAL_INFO.name}</span>
          <span>// EXPEDIENTE TÉCNICO DE INGENIERÍA 2026</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-zinc-500">FORMATO: A3 // TOL: ±0.15mm</span>
          <button
            onClick={scrollToTop}
            aria-label="Volver al inicio"
            className="p-1.5 rounded border border-cyan-500/40 hover:bg-cyan-950 text-cyan-300 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
