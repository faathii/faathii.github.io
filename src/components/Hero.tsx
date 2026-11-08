import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Cpu, Sparkles, FileDown } from 'lucide-react';

interface HeroProps {
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  return (
    <section id="hero" className="relative pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 -ml-3.5" />
            <span>{PERSONAL_INFO.availability}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-6">
            Ingeniería de Software &{' '}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
              Sistemas Físicos / IoT
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed mb-8 max-w-2xl">
            {PERSONAL_INFO.tagline}
          </p>

          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mb-10 leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <a
              href="#proyectos"
              className="px-6 py-3.5 rounded-xl font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-zinc-950 transition-all shadow-lg shadow-emerald-500/10 hover:scale-105 flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>Ver Proyectos</span>
            </a>

            <a
              href="#contacto"
              className="px-6 py-3.5 rounded-xl font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-850 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-all hover:scale-105 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Hablemos</span>
            </a>

            <button
              onClick={onOpenResume}
              className="px-5 py-3.5 rounded-xl font-medium text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 border border-dashed border-zinc-300 dark:border-zinc-700 cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-cyan-500" />
              <span>Ver / Descargar CV</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl pt-8 border-t border-zinc-200 dark:border-zinc-800/80">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/60">
                <p className="text-2xl font-bold text-zinc-900 dark:text-white font-mono">{stat.value}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
