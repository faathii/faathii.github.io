import React from 'react';
import { ArrowRight, FileText, Mail, ShieldCheck, Award, GraduationCap, Cpu, CheckCircle } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import hamzaImg from '../../assets/hamza.jpg';

interface BlueprintHeroProps {
  onOpenCv: () => void;
}

export const BlueprintHero: React.FC<BlueprintHeroProps> = ({ onOpenCv }) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-20 overflow-hidden">
      {/* Background ambient light effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline, Bio & Verified Credentials (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>DISPONIBLE PARA INCORPORACIÓN & RETOS TÉCNICOS</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                Hamza El Fathi{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                  Sofyani
                </span>
              </h1>
              <p className="text-lg sm:text-2xl text-cyan-400 font-semibold mt-2.5 flex flex-wrap items-center gap-2">
                <span>Ingeniería de Sistemas Ciberfísicos</span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-emerald-400">Edge AI</span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-sky-300">Ciberseguridad</span>
              </p>
            </div>

            {/* Value Proposition */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              Estudiante de Grado en Ingeniería Informática (UNED) y Certificado oficial por Cisco. Diseño prototipos de hardware físico (PCBs KiCad), entreno modelos de Inteligencia Artificial para inferencia en tiempo real en Raspberry Pi 5 y desarrollo software de alto rendimiento en Python, C# y TypeScript.
            </p>

            {/* Verified Credentials Pills */}
            <div className="flex flex-wrap gap-2 pt-0.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-500/40 text-xs text-cyan-300 font-medium shadow-sm">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Cisco CyberOps Associate</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-emerald-500/40 text-xs text-emerald-300 font-medium shadow-sm">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cisco Intro to Cybersecurity</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 font-medium shadow-sm">
                <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>UNED Ing. Informática</span>
              </div>
            </div>

            {/* High-Impact Live Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-400/50 transition-all">
                <span className="text-2xl font-black text-white font-mono flex items-center gap-1.5">
                  <span className="text-cyan-400">6</span>
                  <span className="text-xs text-cyan-400/70 font-sans font-medium">Proyectos</span>
                </span>
                <span className="text-[11px] text-zinc-400 block mt-0.5">IoT, Software & Sec</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-400/50 transition-all">
                <span className="text-2xl font-black text-white font-mono flex items-center gap-1.5">
                  <span className="text-emerald-400">540h</span>
                </span>
                <span className="text-[11px] text-zinc-400 block mt-0.5">Cisco Networking Acad.</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-400/50 transition-all">
                <span className="text-2xl font-black text-white font-mono flex items-center gap-1.5">
                  <span className="text-sky-400">&gt;1.2M</span>
                </span>
                <span className="text-[11px] text-zinc-400 block mt-0.5">Telemetría Ingestada ML</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-400/50 transition-all">
                <span className="text-2xl font-black text-white font-mono flex items-center gap-1.5">
                  <span className="text-purple-400">100%</span>
                </span>
                <span className="text-[11px] text-zinc-400 block mt-0.5">Python Std / Zero-Deps</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <a
                href="#proyectos"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-extrabold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:shadow-[0_0_30px_rgba(34,211,238,0.55)] hover:scale-[1.02] active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Explorar Proyectos ({PROJECTS_DATA.length})</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCv}
                className="px-5 py-3.5 rounded-xl border border-slate-700 hover:border-cyan-400/60 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Descargar CV (PDF / Word)</span>
              </button>

              <a
                href="#contacto"
                className="px-4 py-3.5 text-slate-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contacto</span>
              </a>
            </div>
          </div>

          {/* Right Column: Photo Showcase with Floating Badges (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group max-w-[340px] w-full">
              {/* Vibrant ambient glow ring */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-cyan-500/30 via-indigo-500/20 to-emerald-500/30 blur-2xl opacity-80 group-hover:opacity-100 transition-opacity" />

              {/* Main Photo Card Frame */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/30 bg-slate-950 p-2 shadow-2xl">
                <div className="overflow-hidden rounded-xl aspect-[3/4] relative">
                  <img
                    src={hamzaImg}
                    alt="Hamza El Fathi Sofyani"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Photo bottom gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent flex flex-col justify-end p-4">
                    <p className="text-white font-bold text-lg leading-tight flex items-center gap-2">
                      <span>Hamza El Fathi Sofyani</span>
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    </p>
                    <p className="text-xs text-cyan-300 font-mono mt-0.5">
                      Ingeniería • Hardware • Ciberseguridad
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Ávila / Madrid, España
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1 (Top-Right): Cisco CyberOps */}
              <div className="absolute -top-3 -right-3 z-20 px-3 py-1.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-cyan-400/50 shadow-xl flex items-center gap-2 text-xs text-cyan-300 font-semibold animate-pulse">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Cisco CyberOps</span>
              </div>

              {/* Floating Badge 2 (Bottom-Left): Edge AI & ML */}
              <div className="absolute -bottom-3 -left-3 z-20 px-3 py-1.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-emerald-400/50 shadow-xl flex items-center gap-2 text-xs text-emerald-300 font-semibold">
                <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Edge AI (RPi 5)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
