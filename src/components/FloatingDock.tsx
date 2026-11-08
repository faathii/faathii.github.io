import React from 'react';
import { Home, Cpu, Sparkles, FileText, Briefcase } from 'lucide-react';

interface FloatingDockProps {
  onOpenResume: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ onOpenResume }) => {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 sm:bottom-6">
      <nav 
        aria-label="Navegación rápida"
        className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-zinc-900/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-700/60 shadow-2xl shadow-black/40 text-zinc-300"
      >
        <a
          href="#hero"
          aria-label="Inicio"
          className="p-2 rounded-xl hover:bg-zinc-800 hover:text-emerald-400 active:scale-95 transition-all cursor-pointer"
          title="Inicio"
        >
          <Home className="w-4 h-4" />
        </a>

        <a
          href="#proyectos"
          aria-label="Proyectos"
          className="p-2 rounded-xl hover:bg-zinc-800 hover:text-emerald-400 active:scale-95 transition-all cursor-pointer"
          title="Proyectos"
        >
          <Cpu className="w-4 h-4" />
        </a>

        <a
          href="#aptitudes"
          aria-label="Aptitudes"
          className="p-2 rounded-xl hover:bg-zinc-800 hover:text-emerald-400 active:scale-95 transition-all cursor-pointer"
          title="Aptitudes"
        >
          <Sparkles className="w-4 h-4" />
        </a>

        <a
          href="#trayectoria"
          aria-label="Trayectoria"
          className="p-2 rounded-xl hover:bg-zinc-800 hover:text-emerald-400 active:scale-95 transition-all cursor-pointer"
          title="Trayectoria"
        >
          <Briefcase className="w-4 h-4" />
        </a>

        <button
          onClick={onOpenResume}
          aria-label="Ver CV"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-xs font-semibold active:scale-95 transition-all cursor-pointer border border-emerald-500/30"
          title="Ver CV"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="text-[11px] font-mono">CV</span>
        </button>
      </nav>
    </div>
  );
};
