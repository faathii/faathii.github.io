import React from 'react';
import { ArrowRight, FileText, Mail, ShieldCheck, Award, GraduationCap } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import hamzaImg from '../../assets/hamza.jpg';

interface BlueprintHeroProps {
  onOpenCv: () => void;
}

export const BlueprintHero: React.FC<BlueprintHeroProps> = ({ onOpenCv }) => {
  return (
    <section id="hero" className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline, Bio & Verified Credentials (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Disponible para nuevos proyectos e incorporación</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Hamza El Fathi{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  Sofyani
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-cyan-400/90 font-medium mt-2">
                Ingeniería de Sistemas Ciberfísicos, Edge AI & Ciberseguridad
              </p>
            </div>

            {/* Concise Value Proposition */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Estudiante de Grado en Ingeniería Informática (UNED) y certificado en Ciberseguridad por Cisco. Combino el entrenamiento de modelos de Inteligencia Artificial para Edge Computing con diseño de hardware físico (PCBs KiCad) y arquitecturas de software robustas en Python, C# y TypeScript.
            </p>

            {/* Verified Credentials Pills */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-xs text-cyan-300">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Cisco CyberOps Associate</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-emerald-500/30 text-xs text-emerald-300">
                <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Cisco Intro to Cybersecurity</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>UNED Ing. Informática</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#proyectos"
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
              >
                <span>Ver Proyectos ({PROJECTS_DATA.length})</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCv}
                className="px-5 py-3 rounded-xl border border-slate-700 hover:border-cyan-400 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Descargar CV (PDF / Word)</span>
              </button>

              <a
                href="#contacto"
                className="px-4 py-3 text-slate-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4" />
                <span>Contacto</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Photo Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group max-w-[300px] w-full">
              {/* Subtle back ambient glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

              {/* Main Photo Card */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/80 p-2 shadow-2xl">
                <div className="overflow-hidden rounded-xl aspect-[3/4] relative">
                  <img
                    src={hamzaImg}
                    alt="Hamza El Fathi Sofyani"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-3.5">
                    <p className="text-white font-bold text-base leading-tight">
                      Hamza El Fathi Sofyani
                    </p>
                    <p className="text-xs text-cyan-400 mt-0.5">
                      Ávila / Madrid, España
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
