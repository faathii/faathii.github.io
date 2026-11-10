import React from 'react';
import { Home, Cpu, Sparkles, FileText, Briefcase, Mail } from 'lucide-react';

interface FloatingDockProps {
  onOpenResume: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ onOpenResume }) => {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 sm:bottom-6">
      <nav 
        aria-label="Navegación rápida"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-950/85 backdrop-blur-xl border border-cyan-500/30 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.8),0_0_15px_-3px_rgba(34,211,238,0.25)] text-zinc-300"
      >
        <a
          href="#hero"
          aria-label="Inicio"
          className="p-2 rounded-full hover:bg-slate-800 hover:text-cyan-400 active:scale-90 transition-all cursor-pointer"
          title="Inicio"
        >
          <Home className="w-4 h-4" />
        </a>

        <a
          href="#proyectos"
          aria-label="Proyectos"
          className="p-2 rounded-full hover:bg-slate-800 hover:text-cyan-400 active:scale-90 transition-all cursor-pointer"
          title="Proyectos Destacados"
        >
          <Cpu className="w-4 h-4" />
        </a>

        <a
          href="#habilidades"
          aria-label="Habilidades & Stack"
          className="p-2 rounded-full hover:bg-slate-800 hover:text-cyan-400 active:scale-90 transition-all cursor-pointer"
          title="Habilidades"
        >
          <Sparkles className="w-4 h-4" />
        </a>

        <a
          href="#trayectoria"
          aria-label="Trayectoria & Formación"
          className="p-2 rounded-full hover:bg-slate-800 hover:text-cyan-400 active:scale-90 transition-all cursor-pointer"
          title="Formación & Experiencia"
        >
          <Briefcase className="w-4 h-4" />
        </a>

        <a
          href="#contacto"
          aria-label="Contacto"
          className="p-2 rounded-full hover:bg-slate-800 hover:text-cyan-400 active:scale-90 transition-all cursor-pointer"
          title="Contacto"
        >
          <Mail className="w-4 h-4" />
        </a>

        <div className="w-px h-5 bg-slate-700/80 mx-0.5" />

        <button
          onClick={onOpenResume}
          aria-label="Ver CV"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 text-xs font-bold active:scale-95 transition-all cursor-pointer shadow-[0_0_10px_rgba(34,211,238,0.4)]"
          title="Descargar Currículum"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>CV</span>
        </button>
      </nav>
    </div>
  );
};
