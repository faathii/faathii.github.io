import React from 'react';
import { TIMELINE_DATA } from '../data/portfolioData';
import { Briefcase, Calendar } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  return (
    <section id="trayectoria" className="py-20 md:py-28 relative border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3 border border-emerald-500/20">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experiencia & Formación</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Trayectoria e Hitos
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 max-w-lg">
            Evolución continua a través de proyectos de ingeniería aplicada, experimentación con hardware y desarrollo de software.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-emerald-500/30 dark:border-emerald-500/20 ml-4 sm:ml-8 space-y-10">
          {TIMELINE_DATA.map((item, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-2 border-emerald-500 group-hover:scale-125 transition-transform shadow-sm" />

              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.period}
                  </span>
                  <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                    {item.institution}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  {item.role}
                </h3>

                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

