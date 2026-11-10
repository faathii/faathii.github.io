import React, { useState } from 'react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import type { Project } from '../../types';
import { ProjectModal } from '../ProjectModal';
import { ArrowRight, Search } from 'lucide-react';
import { GithubIcon } from '../Icons';
import { BlueprintCarousel } from './BlueprintCarousel';

import iqsenseCadImg from '../../assets/projects/iqsense-cad-despiece.jpg';
import iqsenseDashboardImg from '../../assets/projects/iqsense-view-dashboard.png';
import iqsenseMonitorProImg from '../../assets/projects/iqsense-monitor-pro.png';
import iqsenseCableadoImg from '../../assets/projects/iqsense-cableado.jpg';
import iqsenseCocinaImg from '../../assets/projects/iqsense-real.jpg';
import iqsenseRenderImg from '../../assets/projects/iqsense-render.png';

import omnistreamBanner from '../../assets/projects/omnistream-banner.jpg';
import omnistreamLogo from '../../assets/projects/omnistream-logo.png';
import omnistreamUiCatalog from '../../assets/projects/omnistream-ui-catalog.png';
import omnistreamUiDetail from '../../assets/projects/omnistream-ui-detail.png';
import omnistreamUiFilter from '../../assets/projects/omnistream-ui-filter.png';
import omnistreamUiSettings from '../../assets/projects/omnistream-ui-settings.png';

import pcbEsp32Img from '../../assets/projects/pcb-esp32.png';
import pcbAngle3Img from '../../assets/projects/pcb-angle-3.png';
import pcbTop5Img from '../../assets/projects/pcb-top-5.png';

import cryptoMlTrainingImg from '../../assets/projects/crypto-ml-training.png';
import cryptoDashboardImg from '../../assets/projects/crypto-dashboard-overview.png';
import cryptoTerminalImg from '../../assets/projects/crypto-trading-terminal.png';
import cryptoRiskImg from '../../assets/projects/crypto-risk-management.png';
import cryptoListImg from '../../assets/projects/crypto-list-market.png';

import godotImg from '../../assets/projects/godot-runner.png';

import hfsSentryBanner from '../../assets/projects/hfs-sentry-banner.jpg';
import sentryHubGui from '../../assets/projects/sentry-hub-gui.png';
import sentryNetsentryGui from '../../assets/projects/sentry-netsentry-gui.png';
import sentryTrafficsentryGui from '../../assets/projects/sentry-trafficsentry-gui.png';
import sentryNetsentry from '../../assets/projects/sentry-netsentry.png';
import sentryLogsentinel from '../../assets/projects/sentry-logsentinel.png';
import sentryCertsentry from '../../assets/projects/sentry-certsentry.png';
import sentrySubnetsweep from '../../assets/projects/sentry-subnetsweep.png';
import sentryIntegrityguard from '../../assets/projects/sentry-integrityguard.png';

const projectImages: Record<string, string> = {
  // iQsense 2.0
  'iqsense-cad-despiece': iqsenseCadImg,
  'iqsense-view-dashboard': iqsenseDashboardImg,
  'iqsense-monitor-pro': iqsenseMonitorProImg,
  'iqsense-cableado': iqsenseCableadoImg,
  'iqsense-real': iqsenseCocinaImg,
  'iqsense-render': iqsenseRenderImg,

  // OmniStream
  'omnistream-ui-catalog': omnistreamUiCatalog,
  'omnistream-ui-detail': omnistreamUiDetail,
  'omnistream-ui-filter': omnistreamUiFilter,
  'omnistream-ui-settings': omnistreamUiSettings,
  'omnistream-banner': omnistreamBanner,
  'omnistream-logo': omnistreamLogo,

  // CryptoQuant
  'crypto-ml-training': cryptoMlTrainingImg,
  'crypto-dashboard-overview': cryptoDashboardImg,
  'crypto-trading-terminal': cryptoTerminalImg,
  'crypto-risk-management': cryptoRiskImg,
  'crypto-list-market': cryptoListImg,

  // MicroHardware Lab / PCBs
  'pcb-esp32': pcbEsp32Img,
  'pcb-angle-3': pcbAngle3Img,
  'pcb-top-5': pcbTop5Img,

  // Vanguard / Godot
  'godot-runner': godotImg,

  // HFS-Sentry
  'sentry-hub-gui': sentryHubGui,
  'sentry-netsentry-gui': sentryNetsentryGui,
  'sentry-trafficsentry-gui': sentryTrafficsentryGui,
  'hfs-sentry-banner': hfsSentryBanner,
  'sentry-netsentry': sentryNetsentry,
  'sentry-logsentinel': sentryLogsentinel,
  'sentry-certsentry': sentryCertsentry,
  'sentry-subnetsweep': sentrySubnetsweep,
  'sentry-integrityguard': sentryIntegrityguard,
};

export const BlueprintProjects: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [filterTag, setFilterTag] = useState<string>('TODOS');
  const [search, setSearch] = useState<string>('');

  const tags = ['TODOS', 'IoT & Hardware', 'Software & Full-Stack', 'Videojuegos', 'Ciberseguridad'];

  const getTagCount = (tag: string) => {
    if (tag === 'TODOS') return PROJECTS_DATA.length;
    return PROJECTS_DATA.filter((p) => p.category === tag).length;
  };

  const getProjectHighlightBadge = (id: string) => {
    switch (id) {
      case 'iqsense-iot':
        return {
          label: '⭐ PROYECTO INSIGNIA',
          style: 'bg-amber-500/10 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
        };
      case 'omnistream-hub':
        return {
          label: '🚀 NUEVA ARQUITECTURA',
          style: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40 shadow-[0_0_12px_rgba(99,102,241,0.2)]'
        };
      case 'hfs-sentry':
        return {
          label: '🛡️ SUITE ZERO-DEPS',
          style: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
        };
      case 'botcripto-trading':
        return {
          label: '📈 ML SERIES TEMPORALES',
          style: 'bg-sky-500/15 text-sky-300 border-sky-500/40 shadow-[0_0_12px_rgba(14,165,233,0.2)]'
        };
      case 'pcb-kicad-lab':
        return {
          label: '⚡ HARDWARE INDUSTRIAL',
          style: 'bg-rose-500/15 text-rose-300 border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.2)]'
        };
      default:
        return null;
    }
  };

  const filtered = PROJECTS_DATA.filter((p) => {
    const matchesTag = filterTag === 'TODOS' || p.category === filterTag;
    const matchesSearch = search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <section id="proyectos" className="py-16 sm:py-24 border-b border-cyan-500/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-cyan-500/20">
          <div>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Casos Prácticos & Desarrollos</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Proyectos Destacados
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 max-w-xl leading-relaxed">
              Sistemas ciberfísicos IoT, plataformas streaming concurrentes, microelectrónica PCB y algoritmos de trading predictivo.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-72">
            <div className="relative">
              <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar tecnología, framework..."
                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-900/80 border border-cyan-500/30 text-white placeholder-zinc-500 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Filter Pills with Counts */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {tags.map((t) => {
            const count = getTagCount(t);
            const isSelected = filterTag === t;

            return (
              <button
                key={t}
                onClick={() => setFilterTag(t)}
                className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-cyan-400 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105'
                    : 'bg-slate-900/60 text-zinc-300 border-slate-700/80 hover:border-cyan-400/60 hover:text-white'
                }`}
              >
                <span>{t}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isSelected ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modern Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((project, idx) => {
            const highlightBadge = getProjectHighlightBadge(project.id);
            const imgKeys = project.images && project.images.length > 0
              ? project.images
              : project.imageUrl
                ? [project.imageUrl]
                : [];
            const projectImgUrls = imgKeys
              .map((k) => projectImages[k])
              .filter(Boolean);
            const hasImgs = projectImgUrls.length > 0;

            return (
              <div
                key={project.id}
                className="modern-card rounded-3xl p-6 sm:p-7 border border-cyan-500/25 flex flex-col justify-between hover:border-cyan-400/60 transition-all duration-300 group shadow-xl relative overflow-hidden"
              >
                {/* Top Subtle Gradient Accent Line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Card Header Title Block */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-cyan-500/15 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-cyan-400 font-mono tracking-wide flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        PROYECTO #0{idx + 1}
                      </span>
                      {highlightBadge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-bold border ${highlightBadge.style}`}>
                          {highlightBadge.label}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 font-medium">
                      {project.category}
                    </span>
                  </div>

                  {/* Visual Render Carousel or Technical Fallback Frame */}
                  {hasImgs ? (
                    <div className="relative mb-5">
                      <BlueprintCarousel
                        images={projectImgUrls}
                        title={project.title}
                        aspectRatio="aspect-[16/10]"
                      />
                    </div>
                  ) : (
                    <div className="h-52 w-full rounded-2xl bg-slate-950 border border-red-500/30 mb-5 p-4 flex flex-col justify-between font-mono text-xs relative">
                      <div className="flex justify-between text-red-400 text-[11px]">
                        <span>ENTORNO AUDITORÍA // KALI LINUX</span>
                        <span className="text-emerald-400 font-bold">STATUS: AUDIT_OK</span>
                      </div>
                      <div className="bg-black/90 p-3 rounded-lg border border-zinc-800 text-[10px] space-y-1 text-zinc-300 font-mono">
                        <p className="text-zinc-500"># ./auditoria_kali.sh --stealth</p>
                        <p className="text-emerald-400">[+] Host 192.168.1.1 is UP (0.0012s)</p>
                        <p className="text-cyan-400">    22/tcp OPEN [OpenSSH] | 443/tcp OPEN [HTTPS]</p>
                        <p className="text-amber-400">[!] Directriz: Hardening perimetral y MFA</p>
                      </div>
                      <div className="flex justify-between text-[10px] text-zinc-400">
                        <span>METODOLOGÍA: OSSTMM / NIST</span>
                        <span className="text-cyan-400">SCRIPTING: BASH AVANZADO</span>
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-cyan-400 font-mono mt-1 font-medium">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 my-4 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  {/* Metrics Row */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-2 my-4 p-3 rounded-xl bg-slate-900/70 border border-cyan-500/20 text-center">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx}>
                          <span className="block text-xs sm:text-sm font-bold text-cyan-300 font-mono">{m.value}</span>
                          <span className="text-[10px] text-zinc-400 uppercase tracking-wider">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-slate-900/90 text-cyan-300 border border-cyan-500/25 group-hover:border-cyan-400/40 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-6 pt-4 border-t border-cyan-500/15 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                  >
                    <span>Explorar en detalle</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="p-2 rounded-xl border border-cyan-500/30 hover:border-cyan-300 text-cyan-400 hover:text-white hover:bg-cyan-950/40 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Blueprint Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
