import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code2, Cpu, Box, Shield, CheckCircle2, Sparkles } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-emerald-500" />,
  Cpu: <Cpu className="w-6 h-6 text-teal-400" />,
  Box: <Box className="w-6 h-6 text-cyan-400" />,
  Shield: <Shield className="w-6 h-6 text-indigo-400" />
};

export const SkillsSection: React.FC = () => {
  return (
    <section id="aptitudes" className="py-20 md:py-28 relative bg-zinc-50/50 dark:bg-zinc-950/40 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-3 border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Stack & Especialidades</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Aptitudes y Competencias Técnicas
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Un conjunto de destrezas forjadas a través de proyectos reales de software, integración de hardware embebido, modelado paramétrico y auditoría de sistemas.
          </p>
        </div>

        {/* 4 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700/80">
                  {categoryIcons[cat.icon]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Skills List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs ${
                      skill.highlight
                        ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 dark:border-emerald-500/25'
                        : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200/60 dark:border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 ${
                          skill.highlight ? 'text-emerald-500' : 'text-zinc-400 dark:text-zinc-500'
                        }`}
                      />
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-750 text-zinc-600 dark:text-zinc-400">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

