import React from 'react';
import { PERSONAL_INFO, PROJECTS_DATA, SKILL_CATEGORIES } from '../data/portfolioData';
import { X, Printer, MapPin, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl z-10 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-zinc-900 dark:text-white">Curriculum Vitae</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono">PDF Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Content (Printable area) */}
        <div className="p-6 sm:p-10 overflow-y-auto print:p-0 print:overflow-visible text-zinc-800 dark:text-zinc-200">
          {/* Header */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-6">
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-base text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              {PERSONAL_INFO.title}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 mt-3 font-mono">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                {PERSONAL_INFO.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                {PERSONAL_INFO.email}
              </span>
              <span className="flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5" />
                github.com
              </span>
              <span className="flex items-center gap-1.5">
                <LinkedinIcon className="w-3.5 h-3.5" />
                linkedin.com
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-4 leading-relaxed max-w-2xl">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Key Competencies */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
              Competencias & Especialidades
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-200 dark:border-zinc-800">
                  <p className="font-semibold text-zinc-900 dark:text-white mb-1.5">{cat.title}</p>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-normal font-mono text-[11px]">
                    {cat.skills.map(s => s.name).join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
              Proyectos de Ingeniería & Software Destacados
            </h2>
            <div className="space-y-4">
              {PROJECTS_DATA.slice(0, 3).map((p) => (
                <div key={p.id} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-sm text-zinc-900 dark:text-white">{p.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">{p.category}</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-2">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {p.tags.map((t, tidx) => (
                      <span key={tidx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
