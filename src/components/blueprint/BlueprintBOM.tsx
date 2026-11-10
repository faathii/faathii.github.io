import React from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import ciscoCyberOpsImg from '../../assets/certificates/cisco-cyberops-associate.png';
import ciscoIntroImg from '../../assets/certificates/cisco-intro-cybersecurity.png';
import ciscoEnterpriseImg from '../../assets/certificates/cisco-module-enterprise-protection.png';
import ciscoThreatsImg from '../../assets/certificates/cisco-module-threats-vulnerabilities.png';
import ciscoCryptoImg from '../../assets/certificates/cisco-module-cryptography.png';
import ciscoFirewallImg from '../../assets/certificates/cisco-module-firewall-defense.png';
import ciscoNetSecImg from '../../assets/certificates/cisco-module-network-security.png';

export const BlueprintBOM: React.FC = () => {
  return (
    <section id="habilidades" className="py-16 sm:py-24 border-b border-cyan-500/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title Block */}
        <div className="mb-10 pb-6 border-b border-cyan-500/20 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Competencias & Especialidades</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Habilidades & Tecnologías
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 max-w-xl leading-relaxed">
              Stack integral en arquitectura de software, sistemas ciberfísicos IoT, ciberseguridad defensiva y desarrollo full-stack.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 font-mono">
              Stack Verificado en Producción
            </span>
          </div>
        </div>

        {/* 4 Category Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="modern-card p-6 sm:p-7 rounded-2xl border border-cyan-500/20 shadow-lg hover:border-cyan-400/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-cyan-500/15">
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    {cat.title}
                  </h3>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">
                    0{idx + 1}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 mb-5 leading-relaxed">
                  {cat.description}
                </p>

                {/* Skills Modern Pill Grid */}
                <div className="space-y-2 mb-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="py-2 px-3 rounded-lg flex items-center justify-between text-xs bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800/80 transition-colors"
                    >
                      <span className={`font-medium ${skill.highlight ? 'text-cyan-300 font-semibold' : 'text-zinc-200'}`}>
                        {skill.name}
                      </span>

                      <span className="text-[10px] px-2 py-0.5 rounded-md font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/25">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cisco Verified Badges Footer for Cybersecurity Section */}
              {cat.title.includes('Ciberseguridad') && (
                <div className="mt-4 pt-4 border-t border-cyan-500/20 bg-slate-900/60 p-4 rounded-xl border border-cyan-500/20 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2 shrink-0">
                        <img
                          src={ciscoCyberOpsImg}
                          alt="Cisco CyberOps Associate"
                          className="w-10 h-10 object-contain drop-shadow"
                        />
                        <img
                          src={ciscoIntroImg}
                          alt="Cisco Introduction to Cybersecurity"
                          className="w-10 h-10 object-contain drop-shadow"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                          Acreditaciones Oficiales Cisco
                        </span>
                        <span className="text-xs text-white font-medium block">
                          CyberOps Associate + Intro to Cybersecurity
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold shrink-0">
                      Verificado
                    </span>
                  </div>

                  {/* 5 Modular Skill Badges Strip */}
                  <div className="pt-2.5 border-t border-cyan-500/15 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] text-zinc-400 font-medium">
                      5 Módulos de especialización:
                    </span>
                    <div className="flex items-center gap-2">
                      <img src={ciscoFirewallImg} alt="Firewalls" className="w-6 h-6 object-contain" title="Defensa Perimetral & Firewalls" />
                      <img src={ciscoThreatsImg} alt="Amenazas" className="w-6 h-6 object-contain" title="Ataques & Malware" />
                      <img src={ciscoCryptoImg} alt="Criptografía" className="w-6 h-6 object-contain" title="Criptografía & Claves" />
                      <img src={ciscoNetSecImg} alt="Seguridad de Red" className="w-6 h-6 object-contain" title="Seguridad de Red" />
                      <img src={ciscoEnterpriseImg} alt="Protección Activos" className="w-6 h-6 object-contain" title="Protección de Activos" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
