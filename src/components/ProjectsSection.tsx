import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import type { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { Cpu, TrendingUp, Gamepad2, Layers, ShieldCheck, ArrowRight, Search, Activity, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

const categoryIcons: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Gamepad2: <Gamepad2 className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />
};

// Generates an atmospheric, stylized visual preview banner for each project
const renderProjectBanner = (id: string) => {
  switch (id) {
    case 'iqsense-iot':
      return (
        <div className="h-36 w-full rounded-xl bg-gradient-to-br from-emerald-950 via-zinc-900 to-teal-950 p-4 relative overflow-hidden flex flex-col justify-between border border-emerald-500/20 mb-4 group-hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-mono">
            <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 animate-pulse" /> Telemetry Live</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-[10px]">RPi 5 + Sensors</span>
          </div>
          {/* Visual sensor bars */}
          <div className="space-y-1.5 my-auto">
            <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
              <span>HUMEDAD_SUELO</span>
              <span className="text-emerald-400">68.4%</span>
            </div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[68%]" />
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
              <span>TEMPERATURA_CANOPY</span>
              <span className="text-teal-400">24.2°C</span>
            </div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-teal-400 h-full w-[52%]" />
            </div>
          </div>
          <div className="text-[10px] text-zinc-500 font-mono flex items-center justify-between">
            <span>DAEMON: ACTIVE</span>
            <span>GPIO: 4 RELAYS OK</span>
          </div>
        </div>
      );

    case 'botcripto-trading':
      return (
        <div className="h-36 w-full rounded-xl bg-gradient-to-br from-zinc-950 via-slate-900 to-cyan-950 p-4 relative overflow-hidden flex flex-col justify-between border border-cyan-500/20 mb-4 group-hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-cyan-400 font-mono">
            <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" /> Backtest Engine</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-[10px]">Sharpe: 2.41</span>
          </div>
          {/* Mini Candlestick / Graph simulation */}
          <div className="flex items-end justify-between gap-1 h-12 py-1">
            <div className="w-2.5 bg-emerald-500/70 h-6 rounded-sm self-end" />
            <div className="w-2.5 bg-emerald-400 h-8 rounded-sm self-end" />
            <div className="w-2.5 bg-red-400/80 h-4 rounded-sm self-end" />
            <div className="w-2.5 bg-emerald-400 h-10 rounded-sm self-end" />
            <div className="w-2.5 bg-emerald-500 h-12 rounded-sm self-end" />
            <div className="w-2.5 bg-red-400 h-5 rounded-sm self-end" />
            <div className="w-2.5 bg-emerald-400 h-11 rounded-sm self-end" />
            <div className="w-2.5 bg-cyan-400 h-9 rounded-sm self-end" />
          </div>
          <div className="text-[10px] text-zinc-500 font-mono flex items-center justify-between">
            <span>RSI: 54.2 [NEUTRAL]</span>
            <span className="text-emerald-400">+34.8% Sim Profit</span>
          </div>
        </div>
      );

    case 'godot-topdown-runner':
      return (
        <div className="h-36 w-full rounded-xl bg-gradient-to-br from-zinc-950 via-indigo-950/70 to-purple-950/60 p-4 relative overflow-hidden flex flex-col justify-between border border-indigo-500/20 mb-4 group-hover:border-indigo-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-indigo-400 font-mono">
            <span className="flex items-center gap-1.5"><Gamepad2 className="w-3.5 h-3.5" /> Godot 4.x + C#</span>
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-[10px]">60 FPS</span>
          </div>
          {/* Top-down game mini scene */}
          <div className="relative h-14 bg-zinc-900/60 rounded border border-zinc-800/80 flex items-center justify-center">
            <div className="absolute left-6 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/50 flex items-center justify-center text-[7px] font-bold text-black">P</div>
            <div className="absolute left-12 w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <div className="absolute left-16 w-1.5 h-1.5 rounded-full bg-amber-400" />
            <div className="absolute right-8 w-4 h-4 rounded bg-red-500/80 shadow-md shadow-red-500/40 flex items-center justify-center text-[7px] font-bold text-white">E1</div>
            <div className="absolute right-16 w-3 h-3 rounded bg-red-400/70" />
          </div>
          <div className="text-[10px] text-zinc-400 font-mono flex items-center justify-between">
            <span>AI: Finite State Machine</span>
            <span>Pooling: 200 Projectiles</span>
          </div>
        </div>
      );

    case 'hardware-pcb-cad':
      return (
        <div className="h-36 w-full rounded-xl bg-gradient-to-br from-zinc-950 via-amber-950/40 to-zinc-900 p-4 relative overflow-hidden flex flex-col justify-between border border-amber-500/20 mb-4 group-hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-amber-400 font-mono">
            <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Hardware & CAD</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-[10px]">KiCAD + Python 3D</span>
          </div>
          <div className="grid grid-cols-3 gap-2 my-auto">
            <div className="p-1.5 rounded bg-zinc-900/80 border border-zinc-800 text-center">
              <span className="block text-[9px] text-zinc-500 font-mono">PCB LAYER</span>
              <span className="text-[11px] font-bold text-amber-400 font-mono">2-LAYER</span>
            </div>
            <div className="p-1.5 rounded bg-zinc-900/80 border border-zinc-800 text-center">
              <span className="block text-[9px] text-zinc-500 font-mono">FABRICATION</span>
              <span className="text-[11px] font-bold text-emerald-400 font-mono">CNC + 3D</span>
            </div>
            <div className="p-1.5 rounded bg-zinc-900/80 border border-zinc-800 text-center">
              <span className="block text-[9px] text-zinc-500 font-mono">BLENDER API</span>
              <span className="text-[11px] font-bold text-cyan-400 font-mono">PYTHON</span>
            </div>
          </div>
          <div className="text-[10px] text-zinc-500 font-mono flex items-center justify-between">
            <span>TOLERANCE: ±0.15mm</span>
            <span>CASE: Custom PETG</span>
          </div>
        </div>
      );

    case 'kali-network-security':
      return (
        <div className="h-36 w-full rounded-xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-red-950/40 p-4 relative overflow-hidden flex flex-col justify-between border border-red-500/20 mb-4 group-hover:border-red-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-red-400 font-mono">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Security Hardening</span>
            <span className="px-2 py-0.5 rounded bg-red-500/20 text-[10px]">Kali Linux</span>
          </div>
          <div className="bg-black/60 rounded p-2 border border-zinc-800/80 font-mono text-[10px] text-zinc-300 space-y-0.5">
            <p className="text-zinc-500"># ./auditoria_kali.sh --stealth</p>
            <p className="text-emerald-400">Host 192.168.1.1 is UP (0.0012s latency)</p>
            <p className="text-zinc-400">Ports: 22/tcp OPEN [SSH] | 80/tcp OPEN [HTTP]</p>
          </div>
          <div className="text-[10px] text-zinc-500 font-mono flex items-center justify-between">
            <span>AUTOMATION: Bash Script</span>
            <span>AUDIT: Defensiva</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['Todos', 'IoT & Hardware', 'Software & Full-Stack', 'Videojuegos', 'Ciberseguridad'];

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="proyectos" className="py-20 md:py-28 relative border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portfolio Técnico</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Proyectos Destacados
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
            Soluciones reales que combinan ingeniería de hardware, software backend/frontend, simuladores de trading y videojuegos.
          </p>

          {/* Search bar + Filters */}
          <div className="w-full max-w-md mt-6">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por tecnología (ej: Python, Raspberry, C#, Kali, React)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-zinc-100 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-750 text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 text-white dark:bg-emerald-500 dark:text-zinc-950 shadow-md font-semibold'
                    : 'bg-zinc-100 dark:bg-zinc-850 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1"
            >
              <div>
                {/* Visual Banner */}
                {renderProjectBanner(project.id)}

                {/* Top Bar: Icon + Category Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                    {categoryIcons[project.iconName] || <Cpu className="w-4 h-4" />}
                  </div>
                  <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/80">
                    {project.category}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.slice(0, 4).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-100 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-50 dark:bg-zinc-800/40 text-zinc-500 dark:text-zinc-400">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <span>Ver Caso de Estudio</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub Repository"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
