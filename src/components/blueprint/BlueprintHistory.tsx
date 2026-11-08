import React from 'react';
import { TIMELINE_DATA } from '../../data/portfolioData';

export const BlueprintHistory: React.FC = () => {
  return (
    <section id="historial" className="py-16 sm:py-24 border-b border-cyan-500/30 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title Block */}
        <div className="mb-10 pb-6 border-b border-cyan-500/20">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold mb-2">
            <span className="w-2 h-2 bg-amber-400" />
            <span>HOJA 04 // REGISTRO DE REVISIONES TÉCNICAS & HISTORIAL ACADÉMICO</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            HISTORIAL DE CALIFICACIONES & HITOS
          </h2>
          <p className="text-xs sm:text-sm text-cyan-200/70 mt-1 max-w-xl font-sans sm:font-mono">
            Evolución formativa y profesional: Ingeniería Informática, Especialización en Ciberseguridad Cisco y gestión de operaciones.
          </p>
        </div>

        {/* Blueprint Revision Table */}
        <div className="blueprint-card rounded-lg p-6 sm:p-8 border border-cyan-500/40 overflow-x-auto">
          <div className="space-y-6">
            {TIMELINE_DATA.map((item, idx) => {
              const revCode = `REV.0${TIMELINE_DATA.length - idx}`;

              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded bg-cyan-950/40 border border-cyan-500/20 hover:border-cyan-400/50 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-cyan-500/20 text-xs">
                    <span className="font-bold text-cyan-300 font-mono flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-400/40 text-cyan-400 font-bold">
                        {revCode}
                      </span>
                      <span>{item.period}</span>
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      ENTIDAD: {item.institution}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {item.role}
                  </h3>

                  <p className="text-xs text-cyan-100/80 leading-relaxed font-sans sm:font-mono mb-3">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.skills.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
