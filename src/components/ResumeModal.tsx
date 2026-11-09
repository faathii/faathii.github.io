import React from 'react';
import { PERSONAL_INFO, PROJECTS_DATA, SKILL_CATEGORIES } from '../data/portfolioData';
import { X, Printer, MapPin, Mail, Phone, Download, Award, GraduationCap, Briefcase, Languages } from 'lucide-react';
import { GithubIcon } from './Icons';
import hamzaImg from '../assets/hamza.jpg';
import ciscoCyberOpsImg from '../assets/certificates/cisco-cyberops-associate.png';
import ciscoIntroImg from '../assets/certificates/cisco-intro-cybersecurity.png';
import ciscoEnterpriseImg from '../assets/certificates/cisco-module-enterprise-protection.png';
import ciscoThreatsImg from '../assets/certificates/cisco-module-threats-vulnerabilities.png';
import ciscoCryptoImg from '../assets/certificates/cisco-module-cryptography.png';
import ciscoFirewallImg from '../assets/certificates/cisco-module-firewall-defense.png';
import ciscoNetSecImg from '../assets/certificates/cisco-module-network-security.png';

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
            <span className="text-sm font-bold text-zinc-900 dark:text-white">Curriculum Vitae Oficial</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono">PDF Sincronizado</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="./Curriculum_Hamza_El_Fathi_Sofyani.pdf"
              download="Curriculum_Hamza_El_Fathi_Sofyani.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF (1 Pág)</span>
            </a>
            <a
              href="./Curriculum_Hamza_El_Fathi_Sofyani.docx"
              download="Curriculum_Hamza_El_Fathi_Sofyani.docx"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Word (.docx)</span>
            </a>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
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
        <div className="p-6 sm:p-10 overflow-y-auto print:p-0 print:overflow-visible text-zinc-800 dark:text-zinc-200 space-y-6">
          {/* Header with Photo */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative shrink-0">
              <img
                src={hamzaImg}
                alt={PERSONAL_INFO.name}
                className="w-24 h-32 sm:w-28 sm:h-36 object-cover object-top rounded-xl border-2 border-emerald-500/40 shadow-md"
              />
              <span className="absolute -bottom-2 -right-1 px-1.5 py-0.5 rounded bg-emerald-500 text-black text-[9px] font-bold font-mono">
                DISPONIBLE
              </span>
            </div>
            <div className="flex-grow text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-sm sm:text-base text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                {PERSONAL_INFO.title}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-xs text-zinc-500 dark:text-zinc-400 mt-2.5 font-mono">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  {PERSONAL_INFO.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  {PERSONAL_INFO.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  {PERSONAL_INFO.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub / Portfolio
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-3 leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>
            </div>
          </div>

          {/* Formación Académica & Certificaciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-wider mb-3">
                <GraduationCap className="w-4 h-4 text-emerald-500" />
                <span>Formación Académica</span>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Grado en Ingeniería Informática</p>
                  <p className="text-zinc-500 dark:text-zinc-400 font-mono">UNED • 2025 - Actualidad (Cursando)</p>
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Especialización en Seguridad Informática y Ciberseguridad</p>
                  <p className="text-zinc-500 dark:text-zinc-400 font-mono">540 Horas de formación técnica avanzada</p>
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Grado Medio en Sistemas Microinformáticos y Redes (SMR)</p>
                  <p className="text-zinc-500 dark:text-zinc-400 font-mono">2013 - 2015</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-wider mb-3">
                <Award className="w-4 h-4 text-cyan-500" />
                <span>Certificaciones Oficiales Cisco & Idiomas</span>
              </div>
              <div className="space-y-3 text-xs">
                {/* Official Cisco Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center gap-2.5">
                    <img
                      src={ciscoCyberOpsImg}
                      alt="Cisco CyberOps Associate"
                      className="w-12 h-12 object-contain shrink-0 drop-shadow"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-sky-600 dark:text-sky-400 text-[11px] leading-tight truncate">
                        CyberOps Associate
                      </p>
                      <p className="text-zinc-500 dark:text-zinc-400 text-[10px] mt-0.5 font-mono">
                        Cisco Networking Academy • Verified
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5">
                    <img
                      src={ciscoIntroImg}
                      alt="Cisco Introduction to Cybersecurity"
                      className="w-12 h-12 object-contain shrink-0 drop-shadow"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-emerald-600 dark:text-emerald-400 text-[11px] leading-tight truncate">
                        Introduction to Cybersecurity
                      </p>
                      <p className="text-zinc-500 dark:text-zinc-400 text-[10px] mt-0.5 font-mono">
                        Cisco Networking Academy • Verified
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5 Cisco Modular Skill Badges */}
                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 font-mono mb-2">
                    Módulos Especializados Cisco Acreditados (5/5):
                  </p>
                  <div className="grid grid-cols-5 gap-1.5">
                    <div className="flex flex-col items-center text-center p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
                      <img src={ciscoFirewallImg} alt="Firewalls & Perímetro" className="w-8 h-8 object-contain" />
                      <span className="text-[9px] font-mono text-zinc-600 dark:text-zinc-300 mt-1 leading-tight">Firewalls & Perímetro</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
                      <img src={ciscoThreatsImg} alt="Amenazas & Malware" className="w-8 h-8 object-contain" />
                      <span className="text-[9px] font-mono text-zinc-600 dark:text-zinc-300 mt-1 leading-tight">Amenazas & Malware</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
                      <img src={ciscoCryptoImg} alt="Criptografía & Claves" className="w-8 h-8 object-contain" />
                      <span className="text-[9px] font-mono text-zinc-600 dark:text-zinc-300 mt-1 leading-tight">Criptografía & Claves</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
                      <img src={ciscoNetSecImg} alt="Seguridad de Red" className="w-8 h-8 object-contain" />
                      <span className="text-[9px] font-mono text-zinc-600 dark:text-zinc-300 mt-1 leading-tight">Seguridad de Red</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
                      <img src={ciscoEnterpriseImg} alt="Protección de Activos" className="w-8 h-8 object-contain" />
                      <span className="text-[9px] font-mono text-zinc-600 dark:text-zinc-300 mt-1 leading-tight">Protección de Activos</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white mb-1">
                    <Languages className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Idiomas:</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 font-mono">Español: Nativo • Inglés: Nivel B1</p>
                </div>
              </div>
            </div>
          </div>

          {/* Competencias Técnicas del CV */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
              Competencias Técnicas Clave
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-200 dark:border-zinc-800">
                  <p className="font-semibold text-zinc-900 dark:text-white mb-1">{cat.title}</p>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-normal font-mono text-[11px]">
                    {cat.skills.map(s => s.name).join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Experiencia Profesional */}
          <div>
            <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-wider mb-3">
              <Briefcase className="w-4 h-4 text-emerald-500" />
              <span>Experiencia Laboral</span>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-zinc-900 dark:text-white">Encargado de Operaciones y Establecimiento</span>
                  <span className="font-mono text-zinc-500 text-[11px]">09/2018 – 10/2024</span>
                </div>
                <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-1">Grupo Zena Pizza</p>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Gestión integral del establecimiento, liderazgo de equipos de trabajo bajo presión, control de operaciones, atención al cliente y optimización continua de procesos operativos.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-zinc-900 dark:text-white">Encargado de despiece, maquinista y formador</span>
                  <span className="font-mono text-zinc-500 text-[11px]">03/2017 – 03/2018</span>
                </div>
                <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-1">Multilogic S.L.</p>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Coordinación de tareas técnicas y operativas, manejo de maquinaria especializada y formación técnica de personal en procedimientos operativos.
                </p>
              </div>
            </div>
          </div>

          {/* Proyectos Destacados */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
              Proyectos Destacados de Innovación & Ingeniería
            </h2>
            <div className="space-y-3">
              {PROJECTS_DATA.map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-zinc-900 dark:text-white">{p.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">{p.category}</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 mb-2">
                    {p.description}
                  </p>
                  <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                    Stack: {p.tags.join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
