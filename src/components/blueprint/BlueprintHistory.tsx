import React from 'react';
import { TIMELINE_DATA } from '../../data/portfolioData';
import ciscoCyberOpsImg from '../../assets/certificates/cisco-cyberops-associate.png';
import ciscoIntroImg from '../../assets/certificates/cisco-intro-cybersecurity.png';
import ciscoEnterpriseImg from '../../assets/certificates/cisco-module-enterprise-protection.png';
import ciscoThreatsImg from '../../assets/certificates/cisco-module-threats-vulnerabilities.png';
import ciscoCryptoImg from '../../assets/certificates/cisco-module-cryptography.png';
import ciscoFirewallImg from '../../assets/certificates/cisco-module-firewall-defense.png';
import ciscoNetSecImg from '../../assets/certificates/cisco-module-network-security.png';

export const BlueprintHistory: React.FC = () => {
  return (
    <section id="trayectoria" className="py-16 sm:py-24 border-b border-cyan-500/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title Block */}
        <div className="mb-10 pb-6 border-b border-cyan-500/20">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Trayectoria Profesional & Académica</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experiencia & Formación
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 max-w-xl leading-relaxed">
            Grado en Ingeniería Informática, Especialización en Ciberseguridad por Cisco Networking Academy y gestión operativa de sistemas.
          </p>
        </div>

        {/* Clean Timeline Cards */}
        <div className="space-y-6">
          {TIMELINE_DATA.map((item, idx) => {
            return (
              <div
                key={idx}
                className="modern-card p-6 sm:p-7 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all shadow-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-cyan-500/15">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
                      {item.period}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">
                      {item.institution}
                    </span>
                  </div>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-zinc-300 font-medium">
                    {idx < 2 ? 'Formación & Certificación' : 'Trayectoria Profesional'}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {item.role}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Verified Cisco Badges Showcase */}
                {item.institution.includes('Cisco') && (
                  <div className="my-4 p-5 rounded-xl bg-slate-900/80 border border-cyan-500/20 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-cyan-500/15">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={ciscoCyberOpsImg}
                          alt="Cisco CyberOps Associate"
                          className="w-14 h-14 object-contain shrink-0 drop-shadow-[0_0_12px_rgba(56,189,248,0.35)]"
                        />
                        <div>
                          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                            Badge Oficial Cisco
                          </span>
                          <span className="text-sm font-bold text-white block">
                            Cisco CyberOps Associate
                          </span>
                          <span className="text-xs text-zinc-400 block">
                            Cisco Networking Academy • Verified
                          </span>
                        </div>
                      </div>

                      <div className="h-8 w-px bg-cyan-500/20 hidden sm:block" />

                      <div className="flex items-center gap-3.5">
                        <img
                          src={ciscoIntroImg}
                          alt="Cisco Introduction to Cybersecurity"
                          className="w-14 h-14 object-contain shrink-0 drop-shadow-[0_0_12px_rgba(74,222,128,0.35)]"
                        />
                        <div>
                          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                            Badge Oficial Cisco
                          </span>
                          <span className="text-sm font-bold text-white block">
                            Introduction to Cybersecurity
                          </span>
                          <span className="text-xs text-zinc-400 block">
                            Cisco Networking Academy • Verified
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 5 Modular Skill Badges */}
                    <div>
                      <span className="text-xs text-cyan-300 font-semibold block mb-2.5">
                        Módulos de Especialización Superados (5/5):
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                          <img src={ciscoFirewallImg} alt="Firewalls" className="w-8 h-8 object-contain shrink-0" />
                          <span className="text-[11px] text-zinc-300 font-medium leading-tight">Defensa Perimetral</span>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                          <img src={ciscoThreatsImg} alt="Amenazas" className="w-8 h-8 object-contain shrink-0" />
                          <span className="text-[11px] text-zinc-300 font-medium leading-tight">Amenazas & Malware</span>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                          <img src={ciscoCryptoImg} alt="Criptografía" className="w-8 h-8 object-contain shrink-0" />
                          <span className="text-[11px] text-zinc-300 font-medium leading-tight">Criptografía PKI</span>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                          <img src={ciscoNetSecImg} alt="Seguridad de Red" className="w-8 h-8 object-contain shrink-0" />
                          <span className="text-[11px] text-zinc-300 font-medium leading-tight">Seguridad de Red</span>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                          <img src={ciscoEnterpriseImg} alt="Protección Activos" className="w-8 h-8 object-contain shrink-0" />
                          <span className="text-[11px] text-zinc-300 font-medium leading-tight">Gestión Activos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-slate-900/80 text-cyan-300 border border-cyan-500/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
