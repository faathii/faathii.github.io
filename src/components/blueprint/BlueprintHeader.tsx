import React from 'react';
import { FileText, ShieldCheck } from 'lucide-react';
import hamzaImg from '../../assets/hamza.jpg';

interface BlueprintHeaderProps {
  onOpenCv: () => void;
}

export const BlueprintHeader: React.FC<BlueprintHeaderProps> = ({ onOpenCv }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#080d1a]/85 backdrop-blur-xl border-b border-slate-800/80 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-cyan-500/30 overflow-hidden relative group-hover:border-cyan-400 transition-all shrink-0 shadow-sm">
            <img
              src={hamzaImg}
              alt="Hamza El Fathi Sofyani"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-sm sm:text-base">
                Hamza El Fathi Sofyani
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" /> Cisco Certified
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block -mt-0.5">
              Ingeniero de Sistemas Ciberfísicos, Edge AI & Ciberseguridad
            </span>
          </div>
        </a>

        {/* Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300 font-medium">
          <a href="#proyectos" className="hover:text-cyan-400 transition-colors">
            Proyectos
          </a>
          <a href="#habilidades" className="hover:text-cyan-400 transition-colors">
            Habilidades
          </a>
          <a href="#trayectoria" className="hover:text-cyan-400 transition-colors">
            Trayectoria
          </a>
          <a href="#contacto" className="hover:text-cyan-400 transition-colors">
            Contacto
          </a>
        </nav>

        {/* CV Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCv}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-sm hover:shadow-cyan-500/20 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Currículum (CV)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
