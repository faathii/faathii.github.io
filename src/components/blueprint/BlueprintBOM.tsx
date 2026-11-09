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
    <section id="bom" className="py-16 sm:py-24 border-b border-cyan-500/30 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title Block */}
        <div className="mb-10 pb-6 border-b border-cyan-500/20 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold mb-2">
              <span className="w-2 h-2 bg-emerald-400" />
              <span>HOJA 03 // B.O.M. (BILL OF MATERIALS) & REPERTORIO TÉCNICO</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              LISTA TÉCNICA DE MATERIALES & STACK
            </h2>
            <p className="text-xs sm:text-sm text-cyan-200/70 mt-1 max-w-xl font-sans sm:font-mono">
              Inventario clasificado de competencias técnicas, microelectrónica, frameworks de software y protocolos de red.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300">
              INSPECCIÓN: 100% VERIFICADO
            </span>
          </div>
        </div>

        {/* 4 B.O.M. Category Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="blueprint-card p-6 rounded-lg border border-cyan-500/40"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20">
                <div>
                  <span className="text-[10px] text-cyan-500 font-bold tracking-widest uppercase block">
                    SECCIÓN B.O.M. 0{idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    {cat.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400">
                  [ OK ]
                </span>
              </div>

              <p className="text-xs text-cyan-200/70 mb-4 font-sans sm:font-mono">
                {cat.description}
              </p>

              {/* B.O.M. Table Style List */}
              <div className="divide-y divide-cyan-500/20 border-t border-b border-cyan-500/20">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="py-2 flex items-center justify-between text-xs font-mono hover:bg-cyan-950/30 px-1 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-500 font-mono text-[10px]">
                        0{idx + 1}.{sIdx + 1}
                      </span>
                      <span className={`font-semibold ${skill.highlight ? 'text-white' : 'text-zinc-300'}`}>
                        {skill.name}
                      </span>
                    </div>

                    <span className="text-[10px] px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/60 text-cyan-300">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cisco Verified Badges Footer for Cybersecurity Section */}
              {cat.title.includes('Ciberseguridad') && (
                <div className="mt-4 pt-4 border-t border-cyan-500/20 bg-cyan-950/40 p-3.5 rounded space-y-3">
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
                        <span className="text-[10px] text-cyan-400 font-bold font-mono block">
                          ACREDITACIONES OFICIALES CISCO
                        </span>
                        <span className="text-[11px] text-white font-mono block">
                          CyberOps Associate + Intro to Cybersecurity
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-mono font-bold shrink-0">
                      VERIFICADO
                    </span>
                  </div>

                  {/* 5 Modular Skill Badges Strip */}
                  <div className="pt-2 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[9px] text-cyan-400 font-mono font-bold uppercase">
                      5 Módulos Superados:
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
