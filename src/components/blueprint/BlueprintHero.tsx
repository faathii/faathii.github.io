import React from 'react';
import { Cpu, ShieldCheck } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import hamzaImg from '../../assets/hamza.jpg';
import ciscoCyberOpsImg from '../../assets/certificates/cisco-cyberops-associate.png';
import ciscoIntroImg from '../../assets/certificates/cisco-intro-cybersecurity.png';
import ciscoEnterpriseImg from '../../assets/certificates/cisco-module-enterprise-protection.png';
import ciscoThreatsImg from '../../assets/certificates/cisco-module-threats-vulnerabilities.png';
import ciscoCryptoImg from '../../assets/certificates/cisco-module-cryptography.png';
import ciscoFirewallImg from '../../assets/certificates/cisco-module-firewall-defense.png';
import ciscoNetSecImg from '../../assets/certificates/cisco-module-network-security.png';

interface BlueprintHeroProps {
  onOpenCv: () => void;
}

export const BlueprintHero: React.FC<BlueprintHeroProps> = ({ onOpenCv }) => {
  return (
    <section id="hero" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-cyan-500/30 font-mono">
      {/* Dimension Line Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <div className="dimension-line-h h-3 text-center">
          <span className="bg-[#050d1a] px-3 text-[10px] text-cyan-400 font-mono tracking-widest uppercase">
            SECCIÓN PRINCIPAL DE MONTAJE // COTA DE SISTEMA: [ 100% FUNCIONAL ]
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Title Block / Blueprint Master Frame */}
        <div className="blueprint-card p-6 sm:p-10 rounded-lg border border-cyan-500/40 relative">
          {/* Engineering Stamp */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <div className="blueprint-stamp text-[10px] sm:text-xs">
              ✓ REVISADO // APTO PARA PRODUCCIÓN
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 8 cols: Technical Manifesto, Headline & Cisco Credentials */}
            <div className="lg:col-span-8">
              {/* Subtitle / Document tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-[11px] text-cyan-400 font-bold mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>ESPECIFICACIÓN TÉCNICA // PERFIL PROFESIONAL</span>
              </div>

              {/* Master Heading */}
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                INGENIERÍA CIBERFÍSICA,{' '}
                <span className="text-cyan-400 underline decoration-cyan-500/40 underline-offset-8">
                  INTELIGENCIA ARTIFICIAL
                </span>{' '}
                & CIBERSEGURIDAD
              </h1>

              {/* Bio text as engineering manifesto */}
              <div className="my-6 space-y-3 text-xs sm:text-sm text-cyan-100/90 leading-relaxed font-sans sm:font-mono">
                <p>
                  <strong className="text-cyan-400 font-mono">[ ALCANCE ]:</strong> Convergencia entre hardware físico (PCBs KiCad y Raspberry Pi 5), creación y entrenamiento de modelos de Inteligencia Artificial (Edge AI en IoT y Machine Learning para series temporales), arquitecturas de software en C# / Python y hardening en ciberseguridad defensiva (Cisco Certified).
                </p>
                <p className="text-zinc-400 text-xs">
                  <strong className="text-emerald-400 font-mono">[ ACREDITACIONES ]:</strong> Estudiante de Grado en Ingeniería Informática (UNED) • Certificado en Ciberseguridad por Cisco Networking Academy • Especialización Técnica Superior.
                </p>
              </div>

              {/* Cisco Verified Badges Showcase */}
              <div className="my-6 p-4 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5 text-center sm:text-left">
                  <div className="flex items-center -space-x-3 sm:-space-x-2 shrink-0">
                    <img
                      src={ciscoCyberOpsImg}
                      alt="Cisco CyberOps Associate"
                      className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                    />
                    <img
                      src={ciscoIntroImg}
                      alt="Cisco Introduction to Cybersecurity"
                      className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-[0_0_12px_rgba(74,222,128,0.4)]"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-mono font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> VERIFIED BADGES
                      </span>
                      <span className="text-[11px] text-cyan-400 font-mono font-bold">
                        CISCO NETWORKING ACADEMY
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                      Cisco CyberOps Associate & Introduction to Cybersecurity
                    </h4>
                    <p className="text-[11px] text-cyan-200/70 font-sans sm:font-mono">
                      Acreditación oficial en operaciones de seguridad (SOC), análisis forense, defensa perimetral y criptografía.
                    </p>

                    {/* 5 Modular Skill Badges Mini Row */}
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-2.5 pt-2 border-t border-cyan-500/20">
                      <span className="text-[9px] text-cyan-400/90 font-mono font-bold uppercase hidden md:inline">
                        Módulos:
                      </span>
                      <div className="flex items-center gap-1.5" title="Módulos Oficiales de Especialización Cisco Superados">
                        <img src={ciscoFirewallImg} alt="Firewalls" className="w-5 h-5 object-contain opacity-90 hover:opacity-100 transition-opacity" title="Defensa Perimetral & Firewalls" />
                        <img src={ciscoThreatsImg} alt="Amenazas" className="w-5 h-5 object-contain opacity-90 hover:opacity-100 transition-opacity" title="Ataques, Amenazas & Malware" />
                        <img src={ciscoCryptoImg} alt="Criptografía" className="w-5 h-5 object-contain opacity-90 hover:opacity-100 transition-opacity" title="Criptografía & Claves" />
                        <img src={ciscoNetSecImg} alt="Seguridad de Red" className="w-5 h-5 object-contain opacity-90 hover:opacity-100 transition-opacity" title="Seguridad de Red & Infraestructura" />
                        <img src={ciscoEnterpriseImg} alt="Protección Activos" className="w-5 h-5 object-contain opacity-90 hover:opacity-100 transition-opacity" title="Gobernanza & Protección de Activos" />
                      </div>
                      <span className="text-[9px] text-emerald-400 font-mono">
                        [ 5 Módulos Acreditados ]
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenCv}
                  className="text-xs px-3.5 py-2 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 font-mono flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                >
                  <span>VER DATASHEET</span>
                  <span className="text-cyan-400">→</span>
                </button>
              </div>
            </div>

            {/* Right 4 cols: Hamza Portrait in Technical Blueprint Frame */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative group w-full max-w-[280px]">
                {/* Blueprint Corner Accents */}
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-10" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-10" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 z-10" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-10" />

                {/* Frame Header */}
                <div className="px-3 py-1.5 bg-cyan-950 border-t border-x border-cyan-500/50 rounded-t text-[10px] text-cyan-400 font-mono flex items-center justify-between">
                  <span className="flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ID // INGENIERO
                  </span>
                  <span className="text-cyan-500/80 font-mono text-[9px]">REF: HAMZA-01</span>
                </div>

                {/* Photo Container */}
                <div className="overflow-hidden border border-cyan-500/40 bg-black/90 aspect-[3/4] relative">
                  <img
                    src={hamzaImg}
                    alt="Hamza El Fathi Sofyani"
                    className="w-full h-full object-cover object-top filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Technical Overlay Gradient at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-3 text-left">
                    <p className="text-white font-bold text-sm tracking-wide font-mono">
                      HAMZA EL FATHI
                    </p>
                    <p className="text-cyan-400 text-[10px] font-mono">
                      Ingeniería de Sistemas & AI
                    </p>
                  </div>
                </div>

                {/* Frame Footer */}
                <div className="px-3 py-1.5 bg-cyan-950 border-b border-x border-cyan-500/50 rounded-b text-[10px] text-cyan-300 font-mono flex items-center justify-between">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> DISPONIBLE
                  </span>
                  <span className="text-zinc-400 font-mono text-[9px]">ÁVILA / MADRID</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blueprint Engineering Specs Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-8 pt-6 border-t border-cyan-500/30 text-xs">
            <div className="p-3 bg-cyan-950/40 border border-cyan-500/20 rounded">
              <span className="block text-[10px] text-cyan-500/80 font-mono">NIVEL 1: HARDWARE</span>
              <span className="text-white font-bold font-mono">PCBs KiCad & RPi 5</span>
            </div>
            <div className="p-3 bg-cyan-950/40 border border-cyan-500/20 rounded">
              <span className="block text-[10px] text-cyan-500/80 font-mono">NIVEL 2: INTELIGENCIA ARTIFICIAL</span>
              <span className="text-cyan-300 font-bold font-mono">Edge AI & ML Cuantitativo</span>
            </div>
            <div className="p-3 bg-cyan-950/40 border border-cyan-500/20 rounded">
              <span className="block text-[10px] text-cyan-500/80 font-mono">NIVEL 3: ARQUITECTURA</span>
              <span className="text-emerald-400 font-bold font-mono">C# (.NET) + Python Async</span>
            </div>
            <div className="p-3 bg-cyan-950/40 border border-cyan-500/20 rounded">
              <span className="block text-[10px] text-cyan-500/80 font-mono">NIVEL 4: CIBERSEGURIDAD</span>
              <span className="text-amber-400 font-bold font-mono">Cisco Sec + HFS-Sentry</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#proyectos"
              className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs tracking-wider uppercase rounded transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] flex items-center gap-2 cursor-pointer"
            >
              <Cpu className="w-4 h-4" />
              <span>EXPLORAR PLANOS DE PROYECTOS ({PROJECTS_DATA.length})</span>
            </a>

            <button
              onClick={onOpenCv}
              className="px-5 py-3 border border-cyan-400/60 bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-200 font-bold text-xs tracking-wider uppercase rounded transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>ABRIR DATASHEET // CV OFICIAL</span>
            </button>

            <a
              href="#contacto"
              className="px-4 py-3 text-cyan-400 hover:text-white text-xs underline font-mono flex items-center gap-1.5 ml-auto"
            >
              <span>[ CONTACTO TÉCNICO DIRECTO ]</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
