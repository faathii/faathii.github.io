import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-10 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-500" />
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">{PERSONAL_INFO.name}</span>
          <span>— Portfolio de Ingeniería & Software</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#hero" className="hover:text-emerald-500 transition-colors">Inicio</a>
          <a href="#proyectos" className="hover:text-emerald-500 transition-colors">Proyectos</a>
          <a href="#aptitudes" className="hover:text-emerald-500 transition-colors">Aptitudes</a>
          <button
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-850 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

