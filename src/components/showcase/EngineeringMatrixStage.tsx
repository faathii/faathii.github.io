import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Box,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  Server,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import type { SkillCategory } from '../../types';
import { UI_TEXT, type Lang } from '../../i18n/portfolioI18n';

interface EngineeringMatrixStageProps {
  categories: SkillCategory[];
  lang: Lang;
  onNextStage: () => void;
  onNavigateToStageId: (stageId: string) => void;
  onSelectSound?: (freq: number) => void;
}

interface BentoTheme {
  spanClass: string;
  gradientClass: string;
  accentText: string;
  pillClass: string;
  glowDot: string;
  stageId: string;
  projectLabelEs: string;
  projectLabelEn: string;
  icon: React.ComponentType<{ className?: string }>;
}

const BENTO_THEMES: BentoTheme[] = [
  {
    spanClass: 'md:col-span-3',
    gradientClass: 'from-orange-500/[0.10] via-[#151822] to-[#101219] border-orange-500/30 hover:border-orange-400/70',
    accentText: 'text-orange-400',
    pillClass: 'bg-orange-500/15 text-orange-300 border-orange-500/35',
    glowDot: 'bg-orange-400',
    stageId: 'iqsense',
    projectLabelEs: 'iQsense 2.0 & CryptoQuant',
    projectLabelEn: 'iQsense 2.0 & CryptoQuant',
    icon: TrendingUp,
  },
  {
    spanClass: 'md:col-span-3',
    gradientClass: 'from-sky-500/[0.09] via-[#151822] to-[#101219] border-sky-500/25 hover:border-sky-400/60',
    accentText: 'text-sky-400',
    pillClass: 'bg-sky-500/15 text-sky-300 border-sky-500/35',
    glowDot: 'bg-sky-400',
    stageId: 'sentry',
    projectLabelEs: 'Infraestructura & HFS-Sentry',
    projectLabelEn: 'Infrastructure & HFS-Sentry',
    icon: Server,
  },
  {
    spanClass: 'md:col-span-2',
    gradientClass: 'from-emerald-500/[0.10] via-[#151822] to-[#101219] border-emerald-500/30 hover:border-emerald-400/70',
    accentText: 'text-emerald-400',
    pillClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35',
    glowDot: 'bg-emerald-400',
    stageId: 'sentry',
    projectLabelEs: 'HFS-Sentry SOC',
    projectLabelEn: 'HFS-Sentry SOC',
    icon: ShieldCheck,
  },
  {
    spanClass: 'md:col-span-2',
    gradientClass: 'from-violet-500/[0.09] via-[#151822] to-[#101219] border-violet-500/25 hover:border-violet-400/60',
    accentText: 'text-violet-400',
    pillClass: 'bg-violet-500/15 text-violet-300 border-violet-500/35',
    glowDot: 'bg-violet-400',
    stageId: 'omnistream',
    projectLabelEs: 'OmniStream & Core Apps',
    projectLabelEn: 'OmniStream & Core Apps',
    icon: Code2,
  },
  {
    spanClass: 'md:col-span-2',
    gradientClass: 'from-amber-500/[0.09] via-[#151822] to-[#101219] border-amber-500/25 hover:border-amber-400/60',
    accentText: 'text-amber-400',
    pillClass: 'bg-amber-500/15 text-amber-300 border-amber-500/35',
    glowDot: 'bg-amber-400',
    stageId: 'pcb',
    projectLabelEs: 'KiCad PCBs & CAD',
    projectLabelEn: 'KiCad PCBs & CAD',
    icon: Box,
  },
];

function getLocalizedLevelText(level: string, lang: Lang): string {
  const norm = level.toLowerCase();
  if (norm.includes('cert')) return lang === 'es' ? 'Certificado' : 'Certified';
  if (norm.includes('intermedio')) return lang === 'es' ? 'Intermedio-Avanzado' : 'Upper-Intermediate';
  return lang === 'es' ? 'Avanzado' : 'Advanced';
}

export const EngineeringMatrixStage: React.FC<EngineeringMatrixStageProps> = ({
  categories,
  lang,
  onNextStage,
  onNavigateToStageId,
  onSelectSound,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const t = UI_TEXT[lang];

  const openDetail = (idx: number) => {
    onSelectSound?.(790 + idx * 60);
    setSelectedIdx(idx);
  };

  const closeDetail = () => {
    onSelectSound?.(720);
    setSelectedIdx(null);
  };

  const activeCategory = selectedIdx !== null ? categories[selectedIdx] : null;
  const activeTheme = selectedIdx !== null ? (BENTO_THEMES[selectedIdx] ?? BENTO_THEMES[0]) : null;
  const ActiveIcon = activeTheme?.icon ?? Layers;

  return (
    <div className="h-full flex flex-col justify-between space-y-2.5 text-left font-sans">
      {/* Stage Title Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-neutral-800/90 shrink-0">
        <div>
          <h2 className="text-base sm:text-xl font-black text-white tracking-tight flex items-center gap-2 font-mono uppercase">
            <Cpu className="w-4 h-4 text-orange-400" />
            <span>{t.skillsTitle}</span>
          </h2>
          <p className="text-[11px] text-neutral-400 mt-0.5 hidden sm:block">
            {t.skillsSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedIdx !== null && (
            <button
              type="button"
              onClick={closeDetail}
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-orange-400" />
              <span>{t.matrixBackToBento.replace('← ', '')}</span>
            </button>
          )}

          <button
            onClick={onNextStage}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-neutral-950 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
          >
            <span>{t.seeProjects}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* BODY: Apple Pro Bento Grid OR Focused Pillar Sheet */}
      {selectedIdx === null ? (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-3 min-h-0">
          {categories.map((cat, idx) => {
            const theme = BENTO_THEMES[idx] ?? BENTO_THEMES[0];
            const cardData = t.bentoCards[idx];
            const CardIcon = theme.icon;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => openDetail(idx)}
                className={`${theme.spanClass} group relative overflow-hidden rounded-2xl bg-gradient-to-br ${theme.gradientClass} border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.55)] flex flex-col justify-between cursor-pointer`}
              >
                {/* Background Subtle Architectural Watermark Icon */}
                <CardIcon className={`absolute -right-4 -bottom-4 w-28 h-28 ${theme.accentText} opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-110 transition-all duration-300 pointer-events-none`} />

                {/* Card Top Meta + Affordance */}
                <div className="w-full flex items-center justify-between gap-2 relative z-10">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-mono font-bold ${theme.pillClass}`}>
                    <CardIcon className="w-3 h-3" />
                    <span>0{idx + 1} · {cat.title}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-neutral-400 group-hover:text-white transition-colors shrink-0">
                    <span className="hidden sm:inline">{t.matrixInspectTile}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

                {/* Big Typographic Hero Focus */}
                <div className="my-2 relative z-10">
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
                      {cardData?.heroStat}
                    </span>
                    <span className={`text-xs font-medium ${theme.accentText}`}>
                      {cardData?.heroSub}
                    </span>
                  </div>
                </div>

                {/* Clean Curated Stack Keycaps + Full Count */}
                <div className="flex flex-wrap items-center justify-between gap-2 relative z-10 pt-2 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-1.5">
                    {(cardData?.stackChips ?? []).map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-950/80 border border-neutral-800 text-neutral-200 group-hover:border-neutral-700 transition-colors"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                    +{cat.skills.length} specs
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        activeCategory &&
        activeTheme && (
          <div className={`flex-1 rounded-2xl bg-gradient-to-br ${activeTheme.gradientClass} border p-4 sm:p-5 flex flex-col justify-between space-y-3 stage-fade-enter`}>
            {/* Top Quick-Pillar Switcher Bar inside Detail Sheet */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-white/[0.08]">
              <div className="flex flex-wrap items-center gap-1.5">
                {categories.map((cat, idx) => {
                  const isCur = idx === selectedIdx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => openDetail(idx)}
                      className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold border transition-all cursor-pointer ${
                        isCur
                          ? 'bg-white text-neutral-950 border-white shadow-sm'
                          : 'bg-neutral-950/70 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                      }`}
                    >
                      0{idx + 1} · {cat.title.split('&')[0].trim()}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => onNavigateToStageId(activeTheme.stageId)}
                className="px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-900 border border-neutral-700 hover:border-orange-500/60 text-xs font-mono text-white flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span className="text-orange-400 font-bold">{t.matrixJumpProject}</span>
                <span>{lang === 'es' ? activeTheme.projectLabelEs : activeTheme.projectLabelEn}</span>
                <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
              </button>
            </div>

            {/* Pillar Hero Headline & Full Description */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[10px] font-mono font-bold ${activeTheme.pillClass}`}>
                    <ActiveIcon className="w-3.5 h-3.5" />
                    <span>{t.pillarPrefix} 0{selectedIdx + 1}</span>
                  </span>
                  <span className="text-sm font-mono font-bold text-neutral-300">
                    {t.bentoCards[selectedIdx]?.heroStat}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {activeCategory.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl">
                  {activeCategory.description}
                </p>
              </div>
            </div>

            {/* Clean Apple-Style Capability List (100% of skills & exact levels, zero bar noise) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 content-start">
              {activeCategory.skills.map((skill, sIdx) => {
                const isCertified = skill.level.toLowerCase().includes('cert');
                return (
                  <div
                    key={sIdx}
                    className={`px-3.5 py-2.5 rounded-xl border flex items-center justify-between gap-3 ${
                      skill.highlight
                        ? 'bg-neutral-950/90 border-neutral-700/90'
                        : 'bg-neutral-950/55 border-neutral-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {isCertified ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : skill.highlight ? (
                        <Sparkles className={`w-3.5 h-3.5 ${activeTheme.accentText} shrink-0`} />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0 ml-1 mr-0.5" />
                      )}
                      <span className="text-xs sm:text-sm font-medium text-neutral-100 leading-snug">
                        {skill.name}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md border shrink-0 ${
                        isCertified
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 font-bold'
                          : skill.highlight
                            ? 'bg-neutral-900 text-neutral-200 border-neutral-700 font-semibold'
                            : 'bg-neutral-950 text-neutral-500 border-neutral-800'
                      }`}
                    >
                      {getLocalizedLevelText(skill.level, lang)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}

      {/* Bottom Compact Action Strip */}
      <div className="px-3 py-2 rounded-xl bg-neutral-950/90 border border-neutral-800/90 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0 font-mono">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-[10px] text-neutral-400">
          <span><strong className="text-orange-400">&lt; 18 ms</strong> {t.kpiLabels[0]}</span>
          <span><strong className="text-emerald-400">111M+</strong> {t.kpiLabels[1]}</span>
          <span><strong className="text-sky-400">0 Deps</strong> {t.kpiLabels[2]}</span>
          <span><strong className="text-amber-400">±0.15 mm</strong> {t.kpiLabels[3]}</span>
          <span><strong className="text-purple-400">{lang === 'es' ? '540 Horas' : '540 Hours'}</strong> {t.kpiLabels[4]}</span>
        </div>

        <button
          onClick={onNextStage}
          className="w-full sm:w-auto px-4 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all shrink-0"
        >
          <span>{t.exploreFirstProject}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
