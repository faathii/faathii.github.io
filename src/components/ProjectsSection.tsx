import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import type { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { Cpu, TrendingUp, Gamepad2, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { GithubIcon } from './Icons';

const categoryIcons: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Gamepad2: <Gamepad2 className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />
};

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['Todos', 'IoT & Hardware', 'Software & Full-Stack', 'Videojuegos', 'Ciberseguridad'];

  const filteredProjects = selectedCategory === 'Todos'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

  return (
    <section id="proyectos" className="py-20 md:py-28 relative border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3 border border-emerald-500/20">
            <span>Portfolio Técnico</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Proyectos Destacados
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
            Soluciones reales que combinan ingeniería de hardware, software backend/frontend, simuladores de trading y videojuegos.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
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
                {/* Top Bar: Icon + Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    {categoryIcons[project.iconName] || <Cpu className="w-5 h-5" />}
                  </div>
                  <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/80">
                    {project.category}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mt-5">
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
