import React, { useState } from 'react';
import {
  ArrowRight,
  Box,
  Code2,
  Cpu,
  LayoutGrid,
  Radar,
  Server,
  ShieldCheck,
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

interface PillarMeta {
  stageId: string;
  projectLabelEs: string;
  projectLabelEn: string;
  radarScore: number; // 0..1 visual footprint based on breadth + highlight mastery
  icon: React.ComponentType<{ className?: string }>;
}

const PILLAR_META: PillarMeta[] = [
  {
    stageId: 'iqsense',
    projectLabelEs: 'iQsense 2.0 & CryptoQuant',
    projectLabelEn: 'iQsense 2.0 & CryptoQuant',
    radarScore: 0.94,
    icon: TrendingUp,
  },
  {
    stageId: 'sentry',
    projectLabelEs: 'Infra & HFS-Sentry',
    projectLabelEn: 'Infra & HFS-Sentry',
    radarScore: 0.9,
    icon: Server,
  },
  {
    stageId: 'sentry',
    projectLabelEs: 'HFS-Sentry SOC',
    projectLabelEn: 'HFS-Sentry SOC',
    radarScore: 0.96,
    icon: ShieldCheck,
  },
  {
    stageId: 'omnistream',
    projectLabelEs: 'OmniStream & Core Apps',
    projectLabelEn: 'OmniStream & Core Apps',
    radarScore: 0.92,
    icon: Code2,
  },
  {
    stageId: 'pcb',
    projectLabelEs: 'KiCad PCBs & CAD',
    projectLabelEn: 'KiCad PCBs & CAD',
    radarScore: 0.89,
    icon: Box,
  },
];

function getLevelVisual(level: string, lang: Lang): {
  pct: number;
  barClass: string;
  badgeClass: string;
  displayLevel: string;
} {
  const norm = level.toLowerCase();
  if (norm.includes('cert')) {
    return {
      pct: 100,
      barClass: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.55)]',
      badgeClass: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40',
      displayLevel: lang === 'es' ? 'Certificado' : 'Certified',
    };
  }
  if (norm.includes('intermedio')) {
    return {
      pct: 78,
      barClass: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.45)]',
      badgeClass: 'bg-sky-950/80 text-sky-300 border-sky-500/35',
      displayLevel: lang === 'es' ? 'Intermedio+' : 'Interm.+',
    };
  }
  return {
    pct: 92,
    barClass: 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.55)]',
    badgeClass: 'bg-orange-500/15 text-orange-300 border-orange-500/40',
    displayLevel: lang === 'es' ? 'Avanzado' : 'Advanced',
  };
}

export const EngineeringMatrixStage: React.FC<EngineeringMatrixStageProps> = ({
  categories,
  lang,
  onNextStage,
  onNavigateToStageId,
  onSelectSound,
}) => {
  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'console' | 'grid'>('console');

  const t = UI_TEXT[lang];
  const activeCat = categories[activePillarIdx] ?? categories[0];
  const activeMeta = PILLAR_META[activePillarIdx] ?? PILLAR_META[0];
  const ActiveIcon = activeMeta.icon;

  const selectPillar = (idx: number) => {
    setActivePillarIdx(idx);
    onSelectSound?.(760 + idx * 55);
  };

  // Polar geometry for 5-axis SVG Radar (centered cleanly inside 280x220)
  const cx = 140;
  const cy = 112;
  const maxR = 66;
  const pointFor = (idx: number, ratio: number) => {
    const angle = (-Math.PI / 2) + (idx * 2 * Math.PI) / 5;
    return {
      x: cx + Math.cos(angle) * maxR * ratio,
      y: cy + Math.sin(angle) * maxR * ratio,
    };
  };

  const polygonPoints = PILLAR_META.map((m, i) => {
    const pt = pointFor(i, m.radarScore);
    return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
  }).join(' ');

  return (
    <div className="h-full flex flex-col justify-between space-y-2.5 text-left font-mono">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-neutral-800 shrink-0">
        <div>
          <h2 className="text-base sm:text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            <Cpu className="w-4 h-4 text-orange-400" />
            <span>{t.skillsTitle}</span>
          </h2>
          <p className="text-[11px] text-neutral-400 font-sans mt-0.5 hidden sm:block">
            {t.skillsSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Interactive Console vs Full 5-Pillar Grid Toggle */}
          <div className="flex items-center p-0.5 rounded-lg bg-neutral-950 border border-neutral-800 text-[10px]">
            <button
              type="button"
              onClick={() => {
                onSelectSound?.(880);
                setViewMode('console');
              }}
              className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'console'
                  ? 'bg-neutral-800 text-orange-400 font-bold border border-orange-500/40'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Radar className="w-3 h-3" />
              <span>{t.matrixViewConsole}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectSound?.(920);
                setViewMode('grid');
              }}
              className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-neutral-800 text-orange-400 font-bold border border-orange-500/40'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <LayoutGrid className="w-3 h-3" />
              <span>{t.matrixViewAll}</span>
            </button>
          </div>

          <button
            onClick={onNextStage}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
          >
            <span>{t.seeProjects}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Stage Body */}
      {viewMode === 'console' ? (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 items-stretch">
          {/* LEFT COLUMN: SVG Pentagon Radar + 5 Hardware Selector Pads */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-2.5">
            {/* Vector Radar Instrument */}
            <div className="rounded-xl bg-neutral-950/90 border border-neutral-800 p-2.5 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="w-full flex items-center justify-between text-[9px] text-neutral-500 px-1 mb-0.5">
                <span className="text-orange-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  {t.matrixRadarTitle}
                </span>
                <span>0{activePillarIdx + 1}/05</span>
              </div>

              <svg viewBox="0 0 280 220" className="w-full max-w-[270px] h-auto select-none">
                <defs>
                  <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0.12" />
                  </radialGradient>
                </defs>

                {/* Concentric Pentagon Rings */}
                {[0.35, 0.68, 1].map((ringRatio, rIdx) => {
                  const ringPts = Array.from({ length: 5 }, (_, i) => {
                    const p = pointFor(i, ringRatio);
                    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
                  }).join(' ');
                  return (
                    <polygon
                      key={rIdx}
                      points={ringPts}
                      fill="none"
                      stroke="#262936"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Axis Spokes */}
                {Array.from({ length: 5 }, (_, i) => {
                  const outer = pointFor(i, 1);
                  const isSel = i === activePillarIdx;
                  return (
                    <line
                      key={i}
                      x1={cx}
                      y1={cy}
                      x2={outer.x}
                      y2={outer.y}
                      stroke={isSel ? '#f97316' : '#262936'}
                      strokeWidth={isSel ? '1.5' : '1'}
                      strokeDasharray={isSel ? undefined : '2 2'}
                    />
                  );
                })}

                {/* Skill Coverage Polygon */}
                <polygon
                  points={polygonPoints}
                  fill="url(#radarFill)"
                  stroke="#f97316"
                  strokeWidth="2"
                />

                {/* Clickable Vertex Nodes + Crisp Short Labels */}
                {PILLAR_META.map((m, i) => {
                  const pt = pointFor(i, m.radarScore);
                  const labelPt = pointFor(i, 1.24);
                  const isSel = i === activePillarIdx;
                  return (
                    <g
                      key={i}
                      onClick={() => selectPillar(i)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSel ? 5.5 : 3.5}
                        fill={isSel ? '#ffffff' : '#f97316'}
                        stroke="#f97316"
                        strokeWidth={isSel ? 2.5 : 1}
                      />
                      <text
                        x={labelPt.x}
                        y={labelPt.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="9.5"
                        fontWeight={isSel ? '700' : '500'}
                        fill={isSel ? '#fb923c' : '#a3a3a3'}
                      >
                        {t.matrixShortLabels[i]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* 5 Hardware Tactile Pillar Selector Pads */}
            <div className="grid grid-cols-5 lg:grid-cols-1 gap-1.5">
              {categories.map((cat, idx) => {
                const meta = PILLAR_META[idx] ?? PILLAR_META[0];
                const IconComp = meta.icon;
                const isSelected = idx === activePillarIdx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectPillar(idx)}
                    className={`px-2.5 py-1.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 border-orange-500 text-white shadow-[0_0_16px_rgba(249,115,22,0.22)]'
                        : 'bg-neutral-950/80 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          isSelected ? 'bg-orange-500 shadow-[0_0_6px_#f97316]' : 'bg-neutral-700'
                        }`}
                      />
                      <IconComp
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isSelected ? 'text-orange-400' : 'text-neutral-500'
                        }`}
                      />
                      <span className="text-[10px] sm:text-[11px] font-bold truncate hidden lg:inline">
                        0{idx + 1} · {cat.title}
                      </span>
                      <span className="text-[10px] font-bold truncate lg:hidden">
                        0{idx + 1}
                      </span>
                    </div>
                    <span className="hidden lg:inline text-[9px] px-1.5 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-400 shrink-0">
                      {cat.skills.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Active Pillar Spec Console with Visual Telemetry Meters */}
          <div className="lg:col-span-7 rounded-2xl bg-neutral-900/80 border border-neutral-800 p-3.5 sm:p-4 flex flex-col justify-between space-y-3">
            {/* Active Pillar Header + Direct Proof Link */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-neutral-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/40 font-bold">
                    {t.pillarPrefix} 0{activePillarIdx + 1}
                  </span>
                  <span className="text-[10px] text-neutral-500">
                    {activeCat.skills.length} {lang === 'es' ? 'Competencias' : 'Capabilities'}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2 tracking-tight">
                  <ActiveIcon className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>{activeCat.title}</span>
                </h3>
                <p className="text-xs text-neutral-400 font-sans">
                  {activeCat.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigateToStageId(activeMeta.stageId)}
                className="px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 hover:border-orange-500/60 text-[11px] text-neutral-200 flex items-center gap-1.5 shrink-0 transition-all cursor-pointer self-start sm:self-center"
              >
                <span className="text-orange-400 font-bold">{t.matrixJumpProject}</span>
                <span className="font-semibold">
                  {lang === 'es' ? activeMeta.projectLabelEs : activeMeta.projectLabelEn}
                </span>
                <ArrowRight className="w-3 h-3 text-orange-400" />
              </button>
            </div>

            {/* Skill Instrument Cards Grid (All exact skills preserved, scannable with level meters) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 content-start">
              {activeCat.skills.map((skill, sIdx) => {
                const vis = getLevelVisual(skill.level, lang);
                return (
                  <div
                    key={sIdx}
                    className={`p-2.5 rounded-xl border transition-colors flex flex-col justify-between gap-2 ${
                      skill.highlight
                        ? 'bg-neutral-950/95 border-neutral-700/90'
                        : 'bg-neutral-950/50 border-neutral-800/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-sans font-semibold text-neutral-100 leading-snug">
                        {skill.name}
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded border shrink-0 font-bold ${vis.badgeClass}`}
                      >
                        {vis.displayLevel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${vis.barClass}`}
                          style={{ width: `${vis.pct}%` }}
                        />
                      </div>
                      {skill.highlight && (
                        <span className="text-[8px] font-bold text-orange-400 tracking-wider">
                          {t.matrixCoreLabel}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Optional Quick-Scan Full 5-Pillar View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5 flex-1">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => {
                selectPillar(idx);
                setViewMode('console');
              }}
              className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-orange-500/50 transition-colors flex flex-col justify-between space-y-2 cursor-pointer"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-bold text-white uppercase tracking-tight leading-tight">
                    {cat.title}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-neutral-800 text-orange-400 font-bold border border-neutral-700 shrink-0">
                    0{idx + 1}
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400 font-sans leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {cat.skills.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className={`text-[9px] px-1.5 py-0.5 rounded border ${
                      s.highlight
                        ? 'bg-neutral-800 text-orange-300 border-orange-500/40 font-bold'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Precision Telemetry KPI Bar */}
      <div className="p-2.5 sm:p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 w-full sm:w-auto text-center sm:text-left text-xs">
          <div>
            <span className="font-black text-orange-400 block">&lt; 18 ms</span>
            <span className="text-[9px] text-neutral-500 uppercase">{t.kpiLabels[0]}</span>
          </div>
          <div>
            <span className="font-black text-emerald-400 block">111M+</span>
            <span className="text-[9px] text-neutral-500 uppercase">{t.kpiLabels[1]}</span>
          </div>
          <div>
            <span className="font-black text-sky-400 block">0 Deps</span>
            <span className="text-[9px] text-neutral-500 uppercase">{t.kpiLabels[2]}</span>
          </div>
          <div>
            <span className="font-black text-amber-400 block">±0.15 mm</span>
            <span className="text-[9px] text-neutral-500 uppercase">{t.kpiLabels[3]}</span>
          </div>
          <div>
            <span className="font-black text-purple-400 block">{lang === 'es' ? '540 Horas' : '540 Hours'}</span>
            <span className="text-[9px] text-neutral-500 uppercase">{t.kpiLabels[4]}</span>
          </div>
        </div>

        <button
          onClick={onNextStage}
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all shrink-0"
        >
          <span>{t.exploreFirstProject}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
