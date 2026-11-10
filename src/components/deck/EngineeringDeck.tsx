import React, { useState } from 'react';
import { 
  BookOpen, ShieldCheck, Download, 
  Cpu, Layers, ExternalLink, Mail, Phone, MapPin, 
  Send, Check, Sparkles, ArrowRight, FileText, 
  Shield
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, SKILL_CATEGORIES } from '../../data/portfolioData';
import { BlueprintCarousel } from '../blueprint/BlueprintCarousel';
import { ProjectModal } from '../ProjectModal';
import type { Project } from '../../types';

import hamzaImg from '../../assets/hamza.jpg';
import ciscoCyberOpsImg from '../../assets/certificates/cisco-cyberops-associate.png';
import ciscoIntroImg from '../../assets/certificates/cisco-intro-cybersecurity.png';
import ciscoEnterpriseImg from '../../assets/certificates/cisco-module-enterprise-protection.png';
import ciscoThreatsImg from '../../assets/certificates/cisco-module-threats-vulnerabilities.png';
import ciscoCryptoImg from '../../assets/certificates/cisco-module-cryptography.png';
import ciscoFirewallImg from '../../assets/certificates/cisco-module-firewall-defense.png';
import ciscoNetSecImg from '../../assets/certificates/cisco-module-network-security.png';

// Carousel images mapping
import iqsenseCadImg from '../../assets/projects/iqsense-cad-despiece.jpg';
import iqsenseDashboardImg from '../../assets/projects/iqsense-view-dashboard.png';
import iqsenseMonitorProImg from '../../assets/projects/iqsense-monitor-pro.png';
import iqsenseCableadoImg from '../../assets/projects/iqsense-cableado.jpg';
import iqsenseCocinaImg from '../../assets/projects/iqsense-real.jpg';
import iqsenseRenderImg from '../../assets/projects/iqsense-render.png';

import omnistreamBanner from '../../assets/projects/omnistream-banner.jpg';
import omnistreamLogo from '../../assets/projects/omnistream-logo.png';
import omnistreamUiCatalog from '../../assets/projects/omnistream-ui-catalog.png';
import omnistreamUiDetail from '../../assets/projects/omnistream-ui-detail.png';
import omnistreamUiFilter from '../../assets/projects/omnistream-ui-filter.png';
import omnistreamUiSettings from '../../assets/projects/omnistream-ui-settings.png';

import pcbEsp32Img from '../../assets/projects/pcb-esp32.png';
import pcbAngle3Img from '../../assets/projects/pcb-angle-3.png';
import pcbTop5Img from '../../assets/projects/pcb-top-5.png';

import sentryHubGui from '../../assets/projects/sentry-hub-gui.png';
import sentryNetsentryGui from '../../assets/projects/sentry-netsentry-gui.png';
import sentryTrafficsentryGui from '../../assets/projects/sentry-trafficsentry-gui.png';
import hfsSentryBanner from '../../assets/projects/hfs-sentry-banner.jpg';
import sentryNetsentry from '../../assets/projects/sentry-netsentry.png';
import sentryLogsentinel from '../../assets/projects/sentry-logsentinel.png';
import sentryCertsentry from '../../assets/projects/sentry-certsentry.png';
import sentrySubnetsweep from '../../assets/projects/sentry-subnetsweep.png';
import sentryIntegrityguard from '../../assets/projects/sentry-integrityguard.png';

import cryptoMlTraining from '../../assets/projects/crypto-ml-training.png';
import cryptoDashboardOverview from '../../assets/projects/crypto-dashboard-overview.png';
import cryptoTradingTerminal from '../../assets/projects/crypto-trading-terminal.png';
import cryptoRiskManagement from '../../assets/projects/crypto-risk-management.png';
import cryptoListMarket from '../../assets/projects/crypto-list-market.png';

const projectImages: Record<string, string> = {
  'iqsense-cad-despiece': iqsenseCadImg,
  'iqsense-view-dashboard': iqsenseDashboardImg,
  'iqsense-monitor-pro': iqsenseMonitorProImg,
  'iqsense-cableado': iqsenseCableadoImg,
  'iqsense-real': iqsenseCocinaImg,
  'iqsense-render': iqsenseRenderImg,

  'omnistream-ui-catalog': omnistreamUiCatalog,
  'omnistream-ui-detail': omnistreamUiDetail,
  'omnistream-ui-filter': omnistreamUiFilter,
  'omnistream-ui-settings': omnistreamUiSettings,
  'omnistream-banner': omnistreamBanner,
  'omnistream-logo': omnistreamLogo,

  'pcb-esp32': pcbEsp32Img,
  'pcb-angle-3': pcbAngle3Img,
  'pcb-top-5': pcbTop5Img,

  'sentry-hub-gui': sentryHubGui,
  'sentry-netsentry-gui': sentryNetsentryGui,
  'sentry-trafficsentry-gui': sentryTrafficsentryGui,
  'hfs-sentry-banner': hfsSentryBanner,
  'sentry-netsentry': sentryNetsentry,
  'sentry-logsentinel': sentryLogsentinel,
  'sentry-certsentry': sentryCertsentry,
  'sentry-subnetsweep': sentrySubnetsweep,
  'sentry-integrityguard': sentryIntegrityguard,

  'crypto-ml-training': cryptoMlTraining,
  'crypto-dashboard-overview': cryptoDashboardOverview,
  'crypto-trading-terminal': cryptoTradingTerminal,
  'crypto-risk-management': cryptoRiskManagement,
  'crypto-list-market': cryptoListMarket,
};

type CategoryFilter = 'all' | 'IoT & Hardware' | 'Software & Full-Stack' | 'Ciberseguridad' | 'Videojuegos';

interface EngineeringDeckProps {
  onOpenBook: () => void;
}

export const EngineeringDeck: React.FC<EngineeringDeckProps> = ({ onOpenBook }) => {
  const [activeTab, setActiveTab] = useState<CategoryFilter>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('iqsense-iot');
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [contactSent, setContactSent] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });

  const selectedProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0];

  const getProjectImages = (pId: string): string[] => {
    const p = PROJECTS_DATA.find((item) => item.id === pId);
    if (!p) return [];
    const keys = p.images && p.images.length > 0 ? p.images : p.imageUrl ? [p.imageUrl] : [];
    return keys.map((k) => projectImages[k]).filter(Boolean);
  };

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      {/* Background Subtle Tech Grid & Ambient Radial Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.035]" 
          style={{
            backgroundImage: `linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Top Header / Master Console Navigation */}
      <header className="sticky top-0 z-40 h-16 border-b border-slate-800/80 bg-[#07090e]/90 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-400/50 shadow-md shadow-cyan-950/50">
              <img src={hamzaImg} alt="Hamza" className="w-full h-full object-cover object-top" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#07090e]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wide text-white">Hamza El Fathi Sofyani</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                UNED Ing. Informática
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Sistemas Ciberfísicos, Edge AI & Ciberseguridad Defensiva
            </p>
          </div>
        </div>

        {/* Action Center Buttons */}
        <div className="flex items-center gap-2.5">
          {/* SPECIAL EXTRA: 3D Book Mode Launcher */}
          <button
            onClick={onOpenBook}
            className="group px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-slate-950 transition-transform group-hover:rotate-[-10deg]" />
            <span className="hidden sm:inline">Abrir Monografía 3D</span>
            <span className="sm:hidden">Libro 3D</span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-950/20 text-slate-950 font-bold">
              EXTRA
            </span>
          </button>

          {/* CV Downloads */}
          <a
            href="./Curriculum_Hamza_El_Fathi_Sofyani.pdf"
            download="Curriculum_Hamza_El_Fathi_Sofyani.pdf"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-all"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>CV PDF</span>
          </a>
        </div>
      </header>

      {/* Main Control Deck Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* ========================================================================= */}
        {/* HERO SECTION: BIOMETRIC PROFILE & FEATURED 3D BOOK PROMO CARD             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Engineer Profile & Verified Badges (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <Cpu className="w-36 h-36 text-cyan-400" />
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>EXPEDIENTE TÉCNICO 2026 • ÁVILA / MADRID</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Ingeniería Ciberfísica, Hardware & Seguridad Defensiva
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl text-justify">
                {PERSONAL_INFO.bio}
              </p>

              {/* Verified Cisco Badges Row */}
              <div className="pt-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-3">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Acreditaciones Oficiales Cisco Networking Academy</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                    VERIFICADO
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2">
                    <img src={ciscoCyberOpsImg} alt="CyberOps" className="w-8 h-8 object-contain shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">CyberOps</p>
                      <p className="text-[10px] text-slate-400">Associate</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2">
                    <img src={ciscoIntroImg} alt="Intro to Cyber" className="w-8 h-8 object-contain shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">Intro Cyber</p>
                      <p className="text-[10px] text-slate-400">Security</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2">
                    <img src={ciscoFirewallImg} alt="Firewalls" className="w-8 h-8 object-contain shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">Firewalls</p>
                      <p className="text-[10px] text-slate-400">Defense</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2">
                    <img src={ciscoThreatsImg} alt="Threats" className="w-8 h-8 object-contain shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">Threats</p>
                      <p className="text-[10px] text-slate-400">Detection</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-800/80 font-mono text-center">
              <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800">
                <span className="text-base sm:text-lg font-black text-cyan-400 block">&lt; 18 ms</span>
                <span className="text-[10px] text-slate-400 uppercase">Inferencia Edge</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800">
                <span className="text-base sm:text-lg font-black text-emerald-400 block">111M+</span>
                <span className="text-[10px] text-slate-400 uppercase">Dataset ML</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800">
                <span className="text-base sm:text-lg font-black text-amber-400 block">0 Deps</span>
                <span className="text-[10px] text-slate-400 uppercase">Suite SOC Python</span>
              </div>
            </div>
          </div>

          {/* Right Column: PREMIER EXTRA — 3D PHYSICAL BOOK SHOWCASE CARD (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900/80 to-slate-950 border border-amber-500/30 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 text-xs font-mono">
                <span className="text-amber-300 font-bold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>EXPERIENCIA ESPECIAL EXTRA</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                  TOMO I COMPLETO
                </span>
              </div>

              <div className="my-5 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight editorial-serif leading-tight">
                  Monografía Técnica en Libro Físico 3D
                </h2>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Sumérgete en la experiencia de un libro real abierto sobre un escritorio de nogal. 12 páginas encuadernadas, curvatura de papel, física 3D de pasador de hoja a 60–120 FPS y sonido táctil.
                </p>
              </div>

              {/* Realistic 3D Mini Book Mockup */}
              <div 
                onClick={onOpenBook}
                className="my-3 p-4 rounded-2xl bg-black/40 border border-amber-400/20 flex items-center gap-4 cursor-pointer hover:border-amber-400/60 hover:bg-black/60 transition-all group/mockup shadow-lg"
              >
                <div className="w-16 h-20 rounded-md bg-gradient-to-r from-amber-900 to-amber-700 border border-amber-300/40 p-1.5 flex flex-col justify-between shrink-0 shadow-xl relative group-hover/mockup:scale-105 transition-transform">
                  <div className="w-full h-1 bg-amber-400/40 rounded-full" />
                  <span className="text-[7px] font-black text-amber-200 text-center uppercase tracking-widest font-mono">
                    HFS 2026
                  </span>
                  <div className="w-2 h-4 bg-sky-500 rounded-b absolute top-0 left-2 shadow" />
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold text-amber-200 group-hover/mockup:text-white transition-colors">
                    Expediente Encuadernado con Efecto Real
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Frontispicio, esquemas KiCad, telemetría iQsense y carruseles integrados.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onOpenBook}
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-102 active:scale-98 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Abrir Libro 3D Interactivo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE WORKBENCH: PROJECT SHOWCASE & LIVE BLUEPRINTS                  */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span>Banco de Trabajo & Proyectos de Producción</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Selecciona un sistema para examinar su arquitectura técnica, planos y código.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800 self-start sm:self-auto overflow-x-auto max-w-full">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'IoT & Hardware', label: 'Hardware & IoT' },
                { id: 'Software & Full-Stack', label: 'Software' },
                { id: 'Ciberseguridad', label: 'Ciberseguridad' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as CategoryFilter)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Workbench Grid Layout: Selector Tabs + Active System Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Selector List (4 cols) */}
            <div className="lg:col-span-4 space-y-2.5">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                    selectedProjectId === project.id
                      ? 'bg-slate-900 border-cyan-400/60 shadow-lg shadow-cyan-950/30'
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold uppercase">
                      {project.category}
                    </span>
                    {project.badge && (
                      <span className="text-[10px] font-mono text-amber-400 font-bold flex items-center gap-1">
                        {project.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white">{project.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{project.description}</p>
                </div>
              ))}
            </div>

            {/* Right Active System Stage (8 cols) */}
            <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                    PLACA ACTIVA: {selectedProject.title}
                  </span>
                </div>

                <button
                  onClick={() => setModalProject(selectedProject)}
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-white font-mono uppercase font-bold cursor-pointer transition-colors"
                >
                  <span>Ver Ficha Técnica Completa</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Photo Carousel for active system */}
              <div className="my-4">
                <BlueprintCarousel
                  images={getProjectImages(selectedProject.id)}
                  title={selectedProject.title}
                  aspectRatio="aspect-[16/9]"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">{selectedProject.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedProject.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SKILLS MATRIX & CISCO COMPLETE 7-BADGE DISPLAY                            */}
        {/* ========================================================================= */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span>Matriz de Especialización & Credenciales Oficiales</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Acreditaciones emitidas por Cisco Networking Academy y dominios técnicos de ingeniería.
              </p>
            </div>
          </div>

          {/* 7 Cisco Badges Grid */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block mb-3">
              Cuadro Oficial de Insignias Cisco:
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                <img src={ciscoCyberOpsImg} alt="CyberOps" className="w-12 h-12 object-contain mb-1.5 drop-shadow" />
                <span className="text-[11px] font-bold text-white leading-tight">CyberOps</span>
                <span className="text-[9px] text-slate-400 font-mono">Associate</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                <img src={ciscoIntroImg} alt="Intro" className="w-12 h-12 object-contain mb-1.5 drop-shadow" />
                <span className="text-[11px] font-bold text-white leading-tight">Intro to Cyber</span>
                <span className="text-[9px] text-slate-400 font-mono">Security</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                <img src={ciscoEnterpriseImg} alt="Enterprise" className="w-10 h-10 object-contain mb-1.5" />
                <span className="text-[10px] font-bold text-slate-200 leading-tight">Protección</span>
                <span className="text-[8px] text-slate-400 font-mono">Empresarial</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                <img src={ciscoThreatsImg} alt="Threats" className="w-10 h-10 object-contain mb-1.5" />
                <span className="text-[10px] font-bold text-slate-200 leading-tight">Amenazas</span>
                <span className="text-[8px] text-slate-400 font-mono">& Ataques</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                <img src={ciscoCryptoImg} alt="Crypto" className="w-10 h-10 object-contain mb-1.5" />
                <span className="text-[10px] font-bold text-slate-200 leading-tight">Criptografía</span>
                <span className="text-[8px] text-slate-400 font-mono">& Claves</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                <img src={ciscoFirewallImg} alt="Firewall" className="w-10 h-10 object-contain mb-1.5" />
                <span className="text-[10px] font-bold text-slate-200 leading-tight">Firewalls</span>
                <span className="text-[8px] text-slate-400 font-mono">Perimetral</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                <img src={ciscoNetSecImg} alt="NetSec" className="w-10 h-10 object-contain mb-1.5" />
                <span className="text-[10px] font-bold text-slate-200 leading-tight">Seguridad Red</span>
                <span className="text-[8px] text-slate-400 font-mono">Infraestructura</span>
              </div>
            </div>
          </div>

          {/* Skill Matrix Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-white block">{cat.title}</span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* DIRECT CONTACT & CURRICULUM VITAE DOWNLOADS                               */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Direct Contact Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Canal de Comunicación Directa
            </h2>
            <p className="text-xs text-slate-400">
              Disponible para puestos de ingeniería de software, hardware IoT y ciberseguridad defensiva.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
              {contactSent && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Mensaje enviado correctamente. Me pondré en contacto lo antes posible.</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                  placeholder="Nombre / Empresa"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="email"
                  required
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  placeholder="Correo electrónico"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <textarea
                required
                rows={3}
                value={contactData.message}
                onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                placeholder="Detalles sobre la propuesta, proyecto o vacante técnica..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 resize-none"
              />

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-950/50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Despachar Mensaje Directo</span>
              </button>
            </form>
          </div>

          {/* Quick Direct Data & 1-Page CV Box (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-2xl backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold block">
                EXPEDIENTE & CURRÍCULUM VITAE OFICIAL
              </span>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-200 hover:text-cyan-400 transition-colors">
                    {PERSONAL_INFO.email}
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="text-slate-200 hover:text-cyan-400 transition-colors">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-slate-200">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>

            {/* Dual Download Buttons (1 page with photo) */}
            <div className="space-y-2.5 pt-4 border-t border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block text-center">
                Descarga del CV de 1 página optimizado con foto
              </span>

              <a
                href="./Curriculum_Hamza_El_Fathi_Sofyani.pdf"
                download="Curriculum_Hamza_El_Fathi_Sofyani.pdf"
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md text-center"
              >
                <Download className="w-4 h-4" />
                <span>Descargar CV en PDF (1 Pág)</span>
              </a>

              <a
                href="./Curriculum_Hamza_El_Fathi_Sofyani.docx"
                download="Curriculum_Hamza_El_Fathi_Sofyani.docx"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-all border border-slate-700 text-center"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Descargar CV en Word (.docx)</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#07090e] py-6 px-4 text-center text-xs text-slate-500 font-mono">
        © 2026 Hamza El Fathi Sofyani • Grado en Ingeniería Informática (UNED) • Cisco Networking Academy
      </footer>

      {/* Project Deep Dive Modal */}
      {modalProject && (
        <ProjectModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
    </div>
  );
};
