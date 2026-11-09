import React from 'react';
import { Cpu } from 'lucide-react';

interface BlueprintHeroProps {
  onOpenCv: () => void;
}

export const BlueprintHero: React.FC<BlueprintHeroProps> = ({ onOpenCv }) => {
  return (
    <section id="hero" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-cyan-500/30 font-mono">
      {/* Dimension Line Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <div className="dimension-line-h h-3 text-center">
          <span className="bg-[#050d1a] px-3 text-[10px] text-cyan-400 font-mono tracking-widest uppercase">
            SECCIÓN PRINCIPAL DE MONTAJE // COTA DE SISTEMA: [ 100% FUNCIONAL ]
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Title Block / Blueprint Master Frame */}
        <div className="blueprint-card p-6 sm:p-10 rounded-lg border border-cyan-500/40 relative">
          {/* Engineering Stamp */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <div className="blueprint-stamp text-[10px] sm:text-xs">
              ✓ REVISADO // APTO PARA PRODUCCIÓN
            </div>
          </div>

          {/* Subtitle / Document tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-[11px] text-cyan-400 font-bold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>ESPECIFICACIÓN TÉCNICA // PERFIL PROFESIONAL</span>
          </div>

          {/* Master Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            INGENIERÍA CIBERFÍSICA,{' '}
            <span className="text-cyan-400 underline decoration-cyan-500/40 underline-offset-8">
              INTELIGENCIA ARTIFICIAL
            </span>{' '}
            & CIBERSEGURIDAD
          </h1>

          {/* Bio text as engineering manifesto */}
          <div className="max-w-3xl my-6 space-y-3 text-xs sm:text-sm text-cyan-100/90 leading-relaxed font-sans sm:font-mono">
            <p>
              <strong className="text-cyan-400 font-mono">[ ALCANCE ]:</strong> Convergencia entre hardware físico (PCBs KiCad y Raspberry Pi 5), creación y entrenamiento de modelos de Inteligencia Artificial (Edge AI en IoT y Machine Learning para series temporales), arquitecturas de software en C# / Python y hardening en ciberseguridad defensiva (Cisco Certified).
            </p>
            <p className="text-zinc-400 text-xs">
              <strong className="text-emerald-400 font-mono">[ ACREDITACIONES ]:</strong> Estudiante de Grado en Ingeniería Informática (UNED) • Certificado en Ciberseguridad por Cisco Networking Academy • Especialización Técnica Superior.
            </p>
          </div>

          {/* Blueprint Engineering Specs Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-8 pt-6 border-t border-cyan-500/30 text-xs">
            <div className="p-3 bg-cyan-950/40 border border-cyan-500/20 rounded">
              <span className="block text-[10px] text-cyan-500/80 font-mono">NIVEL 1: HARDWARE</span>
              <span className="text-white font-bold font-mono">PCBs KiCad & RPi 5</span>
            </div>
            <div className="p-3 bg-cyan-950/40 border border-cyan-500/20 rounded">
              <span className="block text-[10px] text-cyan-500/80 font-mono">NIVEL 2: INTELIGENCIA ARTIFICIAL</span>
              <span className="text-cyan-300 font-bold font-mono">Edge AI & ML Cuantitativo</span>
            </div>
            <div className="p-3 bg-cyan-950/40 border border-cyan-500/20 rounded">
              <span className="block text-[10px] text-cyan-500/80 font-mono">NIVEL 3: ARQUITECTURA</span>
              <span className="text-emerald-400 font-bold font-mono">C# (.NET) + Python Async</span>
            </div>
            <div className="p-3 bg-cyan-950/40 border border-cyan-500/20 rounded">
              <span className="block text-[10px] text-cyan-500/80 font-mono">NIVEL 4: CIBERSEGURIDAD</span>
              <span className="text-amber-400 font-bold font-mono">Cisco Sec + HFS-Sentry</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#proyectos"
              className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs tracking-wider uppercase rounded transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] flex items-center gap-2 cursor-pointer"
            >
              <Cpu className="w-4 h-4" />
              <span>EXPLORAR PLANOS DE PROYECTOS (5)</span>
            </a>

            <button
              onClick={onOpenCv}
              className="px-5 py-3 border border-cyan-400/60 bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-200 font-bold text-xs tracking-wider uppercase rounded transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>ABRIR DATASHEET // CV OFICIAL</span>
            </button>

            <a
              href="#contacto"
              className="px-4 py-3 text-cyan-400 hover:text-white text-xs underline font-mono flex items-center gap-1.5 ml-auto"
            >
              <span>[ CONTACTO TÉCNICO DIRECTO ]</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
