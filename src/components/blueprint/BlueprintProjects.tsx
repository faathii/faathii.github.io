import React, { useState } from 'react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import type { Project } from '../../types';
import { ProjectModal } from '../ProjectModal';
import { Compass, ArrowRight, Search } from 'lucide-react';
import { GithubIcon } from '../Icons';
import { BlueprintCarousel } from './BlueprintCarousel';

import iqsenseCadImg from '../../assets/projects/iqsense-cad-despiece.jpg';
import iqsenseDashboardImg from '../../assets/projects/iqsense-view-dashboard.png';
import iqsenseCableadoImg from '../../assets/projects/iqsense-cableado.jpg';
import iqsenseCocinaImg from '../../assets/projects/iqsense-real.jpg';
import iqsenseRenderImg from '../../assets/projects/iqsense-render.png';

import omnistreamBanner from '../../assets/projects/omnistream-banner.jpg';
import omnistreamLogo from '../../assets/projects/omnistream-logo.png';

import pcbEsp32Img from '../../assets/projects/pcb-esp32.png';
import pcbAngle3Img from '../../assets/projects/pcb-angle-3.png';
import pcbTop5Img from '../../assets/projects/pcb-top-5.png';

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
  'iqsense-cableado': iqsenseCableadoImg,
  'iqsense-real': iqsenseCocinaImg,
  'iqsense-render': iqsenseRenderImg,

  // OmniStream
  'omnistream-banner': omnistreamBanner,
  'omnistream-logo': omnistreamLogo,

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

  const filtered = PROJECTS_DATA.filter((p) => {
    const matchesTag = filterTag === 'TODOS' || p.category === filterTag;
    const matchesSearch = search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <section id="proyectos" className="py-16 sm:py-24 border-b border-cyan-500/30 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-cyan-500/20">
          <div>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold mb-2">
              <span className="w-2 h-2 bg-cyan-400" />
              <span>HOJA 02 // EXPEDIENTE TÉCNICO DE PROYECTOS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              ESPECIFICACIONES DE INGENIERÍA
            </h2>
            <p className="text-xs sm:text-sm text-cyan-200/70 mt-1 max-w-xl font-sans sm:font-mono">
              Planos y memorias técnicas de prototipos funcionales: microelectrónica física, algoritmos concurrentes y simulación 2D.
            </p>
          </div>

          {/* Search bar inside blueprint */}
          <div className="w-full md:w-72">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-cyan-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="FILTRAR POR BUSCAR..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 placeholder-cyan-700 rounded focus:outline-none focus:border-cyan-300"
              />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setFilterTag(t)}
              className={`px-3 py-1 text-xs uppercase tracking-wider rounded border transition-all cursor-pointer ${
                filterTag === t
                  ? 'bg-cyan-400 text-black font-extrabold border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                  : 'bg-cyan-950/40 text-cyan-300/80 border-cyan-500/30 hover:border-cyan-400'
              }`}
            >
              [ {t} ]
            </button>
          ))}
        </div>

        {/* Blueprint Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((project, idx) => {
            const specNumber = `SPEC-0${idx + 1}`;
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
                className="blueprint-card rounded-lg p-6 border border-cyan-500/40 flex flex-col justify-between hover:border-cyan-300 transition-all duration-300 group"
              >
                <div>
                  {/* Card Header Title Block */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20 text-xs">
                    <span className="font-bold text-cyan-400 font-mono tracking-wider flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      PLANO REF: {specNumber}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                      {project.category}
                    </span>
                  </div>

                  {/* Visual Render Carousel or Technical Diagram Frame */}
                  {hasImgs ? (
                    <div className="relative mb-4">
                      <BlueprintCarousel
                        images={projectImgUrls}
                        title={project.title}
                        aspectRatio="aspect-[16/10]"
                      />
                    </div>
                  ) : project.id === 'botcripto-trading' ? (
                    <div className="h-52 w-full rounded bg-black/70 border border-cyan-500/30 mb-4 p-4 flex flex-col justify-between font-mono text-xs relative">
                      <div className="flex justify-between text-cyan-400 text-[11px]">
                        <span>CANVAS: STOCHASTIC BACKTEST ENGINE</span>
                        <span className="text-emerald-400 font-bold">SHARPE: 2.41</span>
                      </div>
                      <div className="flex items-end justify-between gap-1.5 h-20 py-2 border-b border-cyan-500/20">
                        <div className="w-3 bg-cyan-500/40 h-8 self-end" />
                        <div className="w-3 bg-cyan-400 h-14 self-end" />
                        <div className="w-3 bg-emerald-400 h-18 self-end" />
                        <div className="w-3 bg-red-400/80 h-9 self-end" />
                        <div className="w-3 bg-cyan-400 h-16 self-end" />
                        <div className="w-3 bg-emerald-400 h-20 self-end" />
                        <div className="w-3 bg-emerald-500 h-15 self-end" />
                        <div className="w-3 bg-cyan-300 h-12 self-end" />
                      </div>
                      <div className="flex justify-between text-[10px] text-zinc-400">
                        <span>MODEL: WALK-FORWARD REAL</span>
                        <span className="text-emerald-400">+34.8% PROFIT SIMULADO</span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-52 w-full rounded bg-black/70 border border-red-500/30 mb-4 p-4 flex flex-col justify-between font-mono text-xs relative">
                      <div className="flex justify-between text-red-400 text-[11px]">
                        <span>TERMINAL DE AUDITORÍA // KALI LINUX</span>
                        <span className="text-emerald-400">STATUS: AUDIT_OK</span>
                      </div>
                      <div className="bg-black/90 p-2.5 rounded border border-zinc-800 text-[10px] space-y-1 text-zinc-300 font-mono">
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
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-cyan-400/80 font-mono mt-1">
                    {project.subtitle}
                  </p>

                  {/* Technical Description */}
                  <p className="text-xs text-cyan-100/80 my-4 leading-relaxed font-sans sm:font-mono">
                    {project.description}
                  </p>

                  {/* Metrics Row */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-2 my-4 p-2.5 rounded bg-cyan-950/60 border border-cyan-500/20 text-center">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx}>
                          <span className="block text-xs font-bold text-cyan-300 font-mono">{m.value}</span>
                          <span className="text-[9px] text-cyan-500/80 uppercase tracking-widest">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>[ DESPLEGAR PLANO DETALLADO ]</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="p-1.5 rounded border border-cyan-500/30 hover:border-cyan-300 text-cyan-400 hover:text-white transition-colors"
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
