import React from 'react';
import type { Project } from '../types';
import { X, CheckCircle2, Target, Lightbulb, BarChart3, Image as ImageIcon, Activity } from 'lucide-react';
import { GithubIcon } from './Icons';

import iqsenseCadImg from '../assets/projects/iqsense-cad-despiece.jpg';
import cryptoImg from '../assets/projects/crypto-monitor-dashboard.png';
import pcbCableadoImg from '../assets/projects/pcb-cableado.jpg';
import godotImg from '../assets/projects/godot-runner.png';
import iqsenseRenderImg from '../assets/projects/iqsense-render.png';
import pcbEsp32Img from '../assets/projects/pcb-esp32.png';

const projectImages: Record<string, string> = {
  'iqsense-cad-despiece': iqsenseCadImg,
  'iqsense-render': iqsenseRenderImg,
  'crypto-monitor-dashboard': cryptoImg,
  'pcb-cableado': pcbCableadoImg,
  'pcb-esp32': pcbEsp32Img,
  'godot-runner': godotImg,
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const hasImage = project.imageUrl && projectImages[project.imageUrl];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-zinc-950/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {project.category}
              </span>
              {project.badge && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                  {project.badge}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
              {project.title}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {project.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real Image Showcase in Modal */}
        {hasImage && (
          <div className="mb-6 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 max-h-72 flex items-center justify-center relative">
            <img
              src={projectImages[project.imageUrl!]}
              alt={project.title}
              className="w-full h-full object-contain max-h-72"
            />
            <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-sm border border-zinc-700 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
              <ImageIcon className="w-3 h-3" />
              <span>Evidencia Visual & Física</span>
            </div>
          </div>
        )}

        {/* Architecture Diagram for iQsense */}
        {project.id === 'iqsense-iot' && (
          <div className="mb-6 p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-emerald-400 font-mono flex items-center gap-1.5">
                <Activity className="w-4 h-4" />
                Arquitectura Ciberfísica de 3 Capas
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Hardware ➔ Edge ➔ App</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                <p className="font-semibold text-teal-400 mb-1">1. Sensores & Actuadores</p>
                <p className="text-[11px] text-zinc-400 leading-relaxed">Sondas de suelo (I2C/ADC), temp/humedad canopy, electroválvulas y bombas protegidas con optoacopladores.</p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900 border border-emerald-500/40 text-zinc-300">
                <p className="font-semibold text-emerald-400 mb-1">2. Edge Computing (RPi 5)</p>
                <p className="text-[11px] text-zinc-400 leading-relaxed">Daemon asíncrono en Python con systemd, persistencia local ante caídas de red y control de riego.</p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                <p className="font-semibold text-cyan-400 mb-1">3. Telemetría & App</p>
                <p className="text-[11px] text-zinc-400 leading-relaxed">Sincronización pub/sub, dashboard de control en tiempo real y app móvil para supervisión remota.</p>
              </div>
            </div>
          </div>
        )}

        {/* Long Description */}
        <div className="mb-6">
          <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        {/* Challenge & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm mb-2">
              <Target className="w-4 h-4" />
              <span>El Desafío</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm mb-2">
              <Lightbulb className="w-4 h-4" />
              <span>La Solución Técnica</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
            Características Clave & Arquitectura
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div className="mb-6 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
              <BarChart3 className="w-4 h-4 text-cyan-500" />
              <span>Métricas del Proyecto</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="text-center p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
                  <p className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white font-mono">{m.value}</p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech tags */}
        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
            Tecnologías Empleadas
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs font-mono rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Cerrar
          </button>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Ver Repositorio</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
