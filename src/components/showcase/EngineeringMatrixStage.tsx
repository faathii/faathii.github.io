import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  CheckCircle2,
  Code2,
  Cpu,
  Filter,
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

interface PillarTheme {
  stripBorder: string;
  stripBg: string;
  iconBox: string;
  iconColor: string;
  coreChip: string;
  coreDot: string;
  statBadge: string;
  stageId: string;
  projectShortEs: string;
  projectShortEn: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PILLAR_THEMES: PillarTheme[] = [
  {
    stripBorder: 'border-l-orange-500 border-neutral-800/90 hover:border-orange-500/50',
    stripBg: 'bg-gradient-to-r from-orange-500/[0.08] via-[#141720] to-[#11131a]',
    iconBox: 'bg-orange-500/15 border-orange-500/35',
    iconColor: 'text-orange-400',
    coreChip: 'bg-orange-500/12 border-orange-500/35 text-orange-100',
    coreDot: 'bg-orange-400',
    statBadge: 'text-orange-300 bg-orange-500/10 border-orange-500/25',
    stageId: 'iqsense',
    projectShortEs: 'iQsense 2.0',
    projectShortEn: 'iQsense 2.0',
    icon: TrendingUp,
  },
  {
    stripBorder: 'border-l-sky-500 border-neutral-800/90 hover:border-sky-500/50',
    stripBg: 'bg-gradient-to-r from-sky-500/[0.08] via-[#141720] to-[#11131a]',
    iconBox: 'bg-sky-500/15 border-sky-500/35',
    iconColor: 'text-sky-400',
    coreChip: 'bg-sky-500/12 border-sky-500/35 text-sky-100',
    coreDot: 'bg-sky-400',
    statBadge: 'text-sky-300 bg-sky-500/10 border-sky-500/25',
    stageId: 'sentry',
    projectShortEs: 'HFS-Sentry',
    projectShortEn: 'HFS-Sentry',
    icon: Server,
  },
  {
    stripBorder: 'border-l-emerald-500 border-neutral-800/90 hover:border-emerald-500/50',
    stripBg: 'bg-gradient-to-r from-emerald-500/[0.08] via-[#141720] to-[#11131a]',
    iconBox: 'bg-emerald-500/15 border-emerald-500/35',
    iconColor: 'text-emerald-400',
    coreChip: 'bg-emerald-500/12 border-emerald-500/35 text-emerald-100',
    coreDot: 'bg-emerald-400',
    statBadge: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/25',
    stageId: 'sentry',
    projectShortEs: 'HFS-Sentry SOC',
    projectShortEn: 'HFS-Sentry SOC',
    icon: ShieldCheck,
  },
  {
    stripBorder: 'border-l-violet-500 border-neutral-800/90 hover:border-violet-500/50',
    stripBg: 'bg-gradient-to-r from-violet-500/[0.08] via-[#141720] to-[#11131a]',
    iconBox: 'bg-violet-500/15 border-violet-500/35',
    iconColor: 'text-violet-400',
    coreChip: 'bg-violet-500/12 border-violet-500/35 text-violet-100',
    coreDot: 'bg-violet-400',
    statBadge: 'text-violet-300 bg-violet-500/10 border-violet-500/25',
    stageId: 'omnistream',
    projectShortEs: 'OmniStream',
    projectShortEn: 'OmniStream',
    icon: Code2,
  },
  {
    stripBorder: 'border-l-amber-500 border-neutral-800/90 hover:border-amber-500/50',
    stripBg: 'bg-gradient-to-r from-amber-500/[0.08] via-[#141720] to-[#11131a]',
    iconBox: 'bg-amber-500/15 border-amber-500/35',
    iconColor: 'text-amber-400',
    coreChip: 'bg-amber-500/12 border-amber-500/35 text-amber-100',
    coreDot: 'bg-amber-400',
    statBadge: 'text-amber-300 bg-amber-500/10 border-amber-500/25',
    stageId: 'pcb',
    projectShortEs: 'KiCad PCBs',
    projectShortEn: 'KiCad PCBs',
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
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null);
  const [coreOnly, setCoreOnly] = useState(false);
  const t = UI_TEXT[lang];

  const handleFilterClick = (idx: number | null) => {
    onSelectSound?.(idx === null ? 740 : 790 + idx * 50);
    setFocusedIdx((prev) => (prev === idx ? null : idx));
  };

  const visibleCategories =
    focusedIdx === null
      ? categories.map((cat, idx) => ({ cat, idx }))
      : [{ cat: categories[focusedIdx], idx: focusedIdx }];

  return (
    <div className="h-full flex flex-col justify-between space-y-2 text-left font-sans">
      {/* Header Row + Quick Filter Bar */}
      <div className="flex flex-col gap-2 pb-2 border-b border-neutral-800/90 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-xl font-black text-white tracking-tight flex items-center gap-2 font-mono uppercase">
              <Cpu className="w-4 h-4 text-orange-400" />
              <span>{t.skillsTitle}</span>
            </h2>
          </div>

          {/* Color Legend + Next Action */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3 text-[10px] font-mono text-neutral-400">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{t.matrixLegendCert}</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                <span>{t.matrixLegendCore}</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-neutral-600" />
                <span>{t.matrixLegendAux}</span>
              </span>
            </div>

            <button
              onClick={onNextStage}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-500 hover:bg-orange-400 text-neutral-950 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
            >
              <span>{t.seeProjects}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Versatile Filter Toolbar: All visible by default + instant 1-tap focus/core filter */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar touch-pan-x pb-0.5">
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => handleFilterClick(null)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold border transition-all cursor-pointer shrink-0 ${
                focusedIdx === null
                  ? 'bg-white text-neutral-950 border-white shadow-sm'
                  : 'bg-neutral-900/90 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              {t.matrixAllFilter}
            </button>

            {categories.map((cat, idx) => {
              const theme = PILLAR_THEMES[idx] ?? PILLAR_THEMES[0];
              const isSelected = focusedIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleFilterClick(idx)}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold border transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-neutral-800 text-white border-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.22)]'
                      : 'bg-neutral-950/80 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                  }`}
                  title={cat.title}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${theme.coreDot}`} />
                  <span>0{idx + 1} · {t.matrixShortTabs[idx]}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              onSelectSound?.(940);
              setCoreOnly((prev) => !prev);
            }}
            className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold border transition-all cursor-pointer shrink-0 flex items-center gap-1 ${
              coreOnly
                ? 'bg-orange-500/20 text-orange-300 border-orange-500/60'
                : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-neutral-200'
            }`}
          >
            <Filter className="w-3 h-3" />
            <span>{t.matrixCoreOnlyFilter}</span>
          </button>
        </div>
      </div>

      {/* Main Content: 5 Full-Visibility Horizontal Spotlight Strips (Zero Hidden Content) */}
      <div className="flex-1 flex flex-col justify-between gap-2 min-h-0">
        {visibleCategories.map(({ cat, idx }) => {
          const theme = PILLAR_THEMES[idx] ?? PILLAR_THEMES[0];
          const cardData = t.bentoCards[idx];
          const IconComp = theme.icon;
          const isSingleFocus = focusedIdx !== null;
          const skillsToRender = coreOnly
            ? cat.skills.filter((s) => s.highlight)
            : cat.skills;

          return (
            <div
              key={idx}
              className={`rounded-xl border border-l-[3px] ${theme.stripBorder} ${theme.stripBg} ${
                isSingleFocus ? 'p-4 sm:p-5 flex-1 justify-between' : 'px-3 py-2.5'
              } grid grid-cols-1 lg:grid-cols-12 gap-2.5 lg:gap-4 items-center transition-all`}
            >
              {/* Left Block: Colored Icon + Title + Hero KPI + Project Jump */}
              <div className="lg:col-span-4 flex items-start gap-2.5 min-w-0">
                <div className={`w-9 h-9 rounded-xl border ${theme.iconBox} flex items-center justify-center shrink-0 mt-0.5`}>
                  <IconComp className={`w-4 h-4 ${theme.iconColor}`} />
                </div>

                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs sm:text-[13px] font-bold text-white leading-tight">
                      {cat.title}
                    </span>
                    {cardData?.heroStat && (
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${theme.statBadge} shrink-0`}>
                        {cardData.heroStat}
                      </span>
                    )}
                  </div>

                  <p className={`text-[11px] text-neutral-400 leading-snug ${isSingleFocus ? '' : 'line-clamp-1'}`}>
                    {cat.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => onNavigateToStageId(theme.stageId)}
                    className="inline-flex items-center gap-1 text-[10px] font-mono text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer pt-0.5"
                  >
                    <span className={theme.iconColor}>{t.matrixJumpProject}</span>
                    <span className="underline decoration-neutral-700 underline-offset-2">
                      {lang === 'es' ? theme.projectShortEs : theme.projectShortEn}
                    </span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Right Block: ALL Skills Immediately Visible, Clean & Scannable */}
              <div className="lg:col-span-8 flex flex-wrap gap-1.5 items-center">
                {skillsToRender.map((skill, sIdx) => {
                  const isCertified = skill.level.toLowerCase().includes('cert');
                  const levelLabel = getLocalizedLevelText(skill.level, lang);
                  return (
                    <span
                      key={sIdx}
                      title={`${skill.name} — ${levelLabel}`}
                      className={`inline-flex items-center gap-1.5 px-2.5 ${
                        isSingleFocus ? 'py-1.5 text-xs' : 'py-1 text-[11px]'
                      } rounded-lg border font-medium transition-colors ${
                        isCertified
                          ? 'bg-emerald-950/75 border-emerald-500/45 text-emerald-200 font-semibold'
                          : skill.highlight
                            ? theme.coreChip
                            : 'bg-neutral-950/75 border-neutral-800 text-neutral-300'
                      }`}
                    >
                      {isCertified ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : skill.highlight ? (
                        <Sparkles className={`w-3 h-3 ${theme.iconColor} shrink-0`} />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0" />
                      )}
                      <span>{skill.name}</span>
                      {isSingleFocus && (
                        <span className="text-[9px] font-mono opacity-75 border-l border-current/20 pl-1.5 ml-0.5">
                          {levelLabel}
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Compact KPI Bar */}
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
