import React from 'react';
import { Compass, Download, ShieldCheck } from 'lucide-react';
import hamzaImg from '../../assets/hamza.jpg';

interface BlueprintHeaderProps {
  onOpenCv: () => void;
}

export const BlueprintHeader: React.FC<BlueprintHeaderProps> = ({ onOpenCv }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#050d1a]/90 backdrop-blur-md border-b border-cyan-500/40 text-cyan-400 font-mono text-xs">
      {/* Top Technical Metadata Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-2 text-[11px] text-cyan-300/80">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-cyan-400">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '12s' }} />
            PLANO TÉCNICO // LABORATORIO DE INGENIERÍA
          </span>
          <span className="hidden sm:inline text-cyan-700">|</span>
          <span className="hidden sm:inline font-mono">DOC_ID: ENG-2026-HFS</span>
          <span className="hidden sm:inline text-cyan-700">|</span>
          <span className="hidden md:inline">TOLERANCIA: ±0.15mm</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            CISCO_CERTIFIED
          </span>
          <span className="text-cyan-700">|</span>
          <span className="text-zinc-400">ESCALA: 1:1</span>
        </div>
      </div>

      {/* Main Navigation & Title Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg border border-cyan-400/50 overflow-hidden relative group-hover:border-cyan-300 transition-colors shrink-0 shadow-sm">
            <img
              src={hamzaImg}
              alt="Hamza El Fathi Sofyani"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <span className="font-bold tracking-wider text-white text-sm sm:text-base block">
              HAMZA EL FATHI SOFYANI
            </span>
            <span className="text-[10px] text-cyan-400/70 tracking-widest block -mt-0.5">
              INGENIERO DE SISTEMAS CIBERFÍSICOS & FULL-STACK
            </span>
          </div>
        </a>

        {/* Technical Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs tracking-wider text-cyan-300/80 font-medium">
          <a href="#proyectos" className="hover:text-cyan-200 hover:underline transition-all">
            [ 01. ESPECIFICACIONES ]
          </a>
          <a href="#bom" className="hover:text-cyan-200 hover:underline transition-all">
            [ 02. B.O.M. / SKILLS ]
          </a>
          <a href="#historial" className="hover:text-cyan-200 hover:underline transition-all">
            [ 03. HISTORIAL TÉCNICO ]
          </a>
          <a href="#contacto" className="hover:text-cyan-200 hover:underline transition-all">
            [ 04. COMUNICACIÓN ]
          </a>
        </nav>

        {/* Title Block Button: CV */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCv}
            className="flex items-center gap-2 px-3 py-1.5 rounded border border-cyan-400 bg-cyan-950/80 hover:bg-cyan-500 hover:text-black text-cyan-300 text-xs font-bold transition-all shadow-[0_0_12px_rgba(34,211,238,0.2)] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>HOJA DE DATOS // CV</span>
          </button>
        </div>
      </div>
    </header>
  );
};
