import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, Download, 
  Layers, ExternalLink, Mail, 
  Send, Check, Volume2, VolumeX,
  ChevronLeft, ChevronRight,
  ArrowRight, Eye, FileText
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

// Carousel images
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

// Play subtle UI sci-fi click
const playSciFiClick = (freq = 800) => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Ignore audio policy
  }
};

interface CinematicShowcaseProps {
  onOpenBook: () => void;
}

const STAGES = [
  { id: 'profile', label: '01. PERFIL & CISCO', subtitle: 'Acreditaciones & UNED' },
  { id: 'iqsense', label: '02. iQsense 2.0', subtitle: 'Edge AI & Hardware RPi5' },
  { id: 'omnistream', label: '03. OmniStream', subtitle: 'Desktop Hub & Streaming' },
  { id: 'pcb', label: '04. KiCad PCBs', subtitle: 'Hardware SMD & CAD' },
  { id: 'sentry', label: '05. HFS-Sentry', subtitle: 'Ciberseguridad Defensiva' },
  { id: 'crypto', label: '06. CryptoQuant', subtitle: 'Machine Learning 111M+' },
  { id: 'skills', label: '07. MATRIX & CONTACTO', subtitle: 'Skills & Descarga CV' },
];

export const CinematicShowcase: React.FC<CinematicShowcaseProps> = ({ onOpenBook: _onOpenBook }) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [contactSent, setContactSent] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });

  const totalStages = STAGES.length;
  const currentStage = STAGES[currentStageIdx];

  const goToStage = useCallback((idx: number) => {
    if (idx < 0 || idx >= totalStages) return;
    if (soundEnabled) playSciFiClick(600 + idx * 80);
    setCurrentStageIdx(idx);
  }, [totalStages, soundEnabled]);

  const handleNext = useCallback(() => {
    goToStage((currentStageIdx + 1) % totalStages);
  }, [currentStageIdx, totalStages, goToStage]);

  const handlePrev = useCallback(() => {
    goToStage((currentStageIdx - 1 + totalStages) % totalStages);
  }, [currentStageIdx, totalStages, goToStage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalProject) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, modalProject]);

  const getProjectImages = (pId: string): string[] => {
    const p = PROJECTS_DATA.find((item) => item.id === pId);
    if (!p) return [];
    const keys = p.images && p.images.length > 0 ? p.images : p.imageUrl ? [p.imageUrl] : [];
    return keys.map((k) => projectImages[k]).filter(Boolean);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#04060a] text-slate-100 flex flex-col justify-between relative select-none font-sans">
      {/* Sci-Fi Atmospheric Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,rgba(14,165,233,0.18),transparent_60%)]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        
        {/* Animated Cyber Grid */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
        
        {/* Horizon glowing laser line */}
        <div className="absolute top-16 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </div>

      {/* Top Aerospace Master Header */}
      <header className="h-16 px-4 sm:px-8 border-b border-slate-800/80 bg-[#07090e]/85 backdrop-blur-xl flex items-center justify-between z-30 shrink-0">
        {/* Left Identity with Live Radar Indicator */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-400/60 shadow-lg shadow-cyan-950/60">
              <img src={hamzaImg} alt="Hamza" className="w-full h-full object-cover object-top" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#04060a] animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold hidden sm:inline-block">
                UNED Ing. Informática
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden md:block">
              Sistemas Ciberfísicos, Edge AI & Ciberseguridad Defensiva
            </p>
          </div>
        </div>

        {/* Center Kinetic Stage Selector Dots */}
        <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-slate-900/90 border border-slate-800">
          {STAGES.map((st, idx) => (
            <button
              key={st.id}
              onClick={() => goToStage(idx)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                currentStageIdx === idx
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-bold shadow-md shadow-cyan-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {st.label.split('. ')[1]}
            </button>
          ))}
        </div>

        {/* Right Tools & Sound Switcher */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              soundEnabled
                ? 'border-cyan-500/40 text-cyan-400 bg-cyan-950/30'
                : 'border-slate-800 text-slate-600 hover:text-slate-400'
            }`}
            title={soundEnabled ? 'Efectos de audio activados' : 'Audio silenciado'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <a
            href="./Curriculum_Hamza_El_Fathi_Sofyani.pdf"
            download="Curriculum_Hamza_El_Fathi_Sofyani.pdf"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.35)] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Descargar CV</span>
            <span className="sm:hidden">CV</span>
          </a>
        </div>
      </header>

      {/* Main Kinetic Full-Screen Stage (Fitted 100% in viewport, ZERO window scroll) */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-3 sm:p-6 flex flex-col justify-center relative z-10 overflow-hidden">
        
        {/* Stage Content Frame with Smooth CSS Transition */}
        <div className="w-full h-full max-h-[760px] rounded-3xl bg-slate-950/80 border border-slate-800/90 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl relative overflow-hidden flex flex-col justify-between p-4 sm:p-8">
          
          {/* Stage Header Info Pill */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs font-mono shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-cyan-400 font-bold uppercase tracking-wider">{currentStage.label}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{currentStage.subtitle}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 hidden sm:inline">MÓDULO {currentStageIdx + 1} DE {totalStages}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
                  title="Módulo anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
                  title="Siguiente módulo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DYNAMIC STAGE RENDERING                                                   */}
          {/* ========================================================================= */}
          <div className="flex-1 w-full overflow-y-auto real-paper-scroll py-3 sm:py-5">
            
            {/* STAGE 0: Master Profile, Portrait & Cisco Credentials */}
            {currentStage.id === 'profile' && (
              <div className="h-full flex flex-col lg:flex-row items-center gap-6 sm:gap-10">
                {/* Hamza's High-Tech Beveled Portrait */}
                <div className="shrink-0 relative group">
                  <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 opacity-30 blur-lg group-hover:opacity-60 transition duration-500" />
                  <div className="w-52 h-64 sm:w-60 sm:h-76 rounded-2xl overflow-hidden border-2 border-slate-700 relative z-10 shadow-2xl bg-black">
                    <img src={hamzaImg} alt={PERSONAL_INFO.name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-x-0 bottom-0 py-2 px-3 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-mono">{PERSONAL_INFO.name}</span>
                      <span className="text-[10px] text-cyan-400 font-mono">UNED</span>
                    </div>
                  </div>
                </div>

                {/* Profile Data & Cisco Verified Badges */}
                <div className="flex-1 space-y-3.5 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>EXPEDIENTE TÉCNICO 2026 • ÁVILA / MADRID, ESPAÑA</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                    Ingeniería Ciberfísica, Hardware & Seguridad Defensiva
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
                    {PERSONAL_INFO.bio}
                  </p>

                  {/* Complete 7 Cisco Badges Display */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                      <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Acreditaciones Oficiales Cisco Networking Academy</span>
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold font-mono">
                        VERIFICADO
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center">
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
                        <img src={ciscoCyberOpsImg} alt="CyberOps" className="w-10 h-10 object-contain mb-1 drop-shadow" />
                        <span className="text-[10px] font-bold text-white leading-tight">CyberOps</span>
                        <span className="text-[8px] text-slate-400 font-mono">Associate</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
                        <img src={ciscoIntroImg} alt="Intro" className="w-10 h-10 object-contain mb-1 drop-shadow" />
                        <span className="text-[10px] font-bold text-white leading-tight">Intro Cyber</span>
                        <span className="text-[8px] text-slate-400 font-mono">Security</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
                        <img src={ciscoEnterpriseImg} alt="Enterprise" className="w-8 h-8 object-contain mb-1" />
                        <span className="text-[9px] font-bold text-slate-200 leading-tight">Empresas</span>
                        <span className="text-[8px] text-slate-400 font-mono">Protección</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
                        <img src={ciscoThreatsImg} alt="Threats" className="w-8 h-8 object-contain mb-1" />
                        <span className="text-[9px] font-bold text-slate-200 leading-tight">Amenazas</span>
                        <span className="text-[8px] text-slate-400 font-mono">& SOC</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
                        <img src={ciscoCryptoImg} alt="Crypto" className="w-8 h-8 object-contain mb-1" />
                        <span className="text-[9px] font-bold text-slate-200 leading-tight">Criptografía</span>
                        <span className="text-[8px] text-slate-400 font-mono">& Claves</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
                        <img src={ciscoFirewallImg} alt="Firewall" className="w-8 h-8 object-contain mb-1" />
                        <span className="text-[9px] font-bold text-slate-200 leading-tight">Firewalls</span>
                        <span className="text-[8px] text-slate-400 font-mono">Perimetral</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
                        <img src={ciscoNetSecImg} alt="NetSec" className="w-8 h-8 object-contain mb-1" />
                        <span className="text-[9px] font-bold text-slate-200 leading-tight">Seguridad Red</span>
                        <span className="text-[8px] text-slate-400 font-mono">Infraestructura</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Next Stage */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      onClick={handleNext}
                      className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-950/50 cursor-pointer transition-all"
                    >
                      <span>Explorar Proyectos ➔ iQsense 2.0</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href="./Curriculum_Hamza_El_Fathi_Sofyani.pdf"
                      download="Curriculum_Hamza_El_Fathi_Sofyani.pdf"
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Descargar CV (1 Pág)</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 1: iQsense 2.0 (Edge AI + IoT Embebido + RPi 5) */}
            {currentStage.id === 'iqsense' && (
              <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7">
                  <BlueprintCarousel
                    images={getProjectImages('iqsense-iot')}
                    title="iQsense 2.0"
                    aspectRatio="aspect-[16/10]"
                  />
                  <p className="text-[10px] text-slate-400 font-mono text-center pt-2">
                    LÁMINA TÉCNICA: Prototipo funcional, cableado, corte CAD y telemetría de inferencia
                  </p>
                </div>
                <div className="lg:col-span-5 space-y-3 text-left">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-mono font-bold">
                    ★ PROYECTO INSIGNIA CIBERFÍSICO
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    iQsense 2.0 — Sistema Ciberfísico & Edge AI
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed text-justify">
                    Plataforma que entrena modelos predictivos de VPD e inercia térmica, ejecutando inferencia autónoma sub-18ms en Raspberry Pi 5 con placa PCB dedicada y aislamiento galvánico.
                  </p>

                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono">
                    <div>
                      <span className="text-xs sm:text-sm font-black text-cyan-400 block">&lt; 18 ms</span>
                      <span className="text-[9px] text-slate-400 uppercase">Inferencia RPi5</span>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-black text-emerald-400 block">R² = 0.94</span>
                      <span className="text-[9px] text-slate-400 uppercase">Precisión VPD</span>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-black text-amber-400 block">&gt; 1.2M</span>
                      <span className="text-[9px] text-slate-400 uppercase">Dataset ML</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => setModalProject(PROJECTS_DATA.find((p) => p.id === 'iqsense-iot') || null)}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ficha Técnica Completa</span>
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold cursor-pointer"
                    >
                      Siguiente ➔ OmniStream
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 2: OmniStream (Desktop Streaming Hub) */}
            {currentStage.id === 'omnistream' && (
              <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7">
                  <BlueprintCarousel
                    images={getProjectImages('omnistream-hub')}
                    title="OmniStream"
                    aspectRatio="aspect-[16/10]"
                  />
                  <p className="text-[10px] text-slate-400 font-mono text-center pt-2">
                    LÁMINA TÉCNICA: Catálogo legal unificado, filtros de suscripción y resolución de deep links
                  </p>
                </div>
                <div className="lg:col-span-5 space-y-3 text-left">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold">
                    DESKTOP APP HYBRID
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    OmniStream — Agregador de Streaming & Deep Linking
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed text-justify">
                    Aplicación de escritorio híbrida en Python + pywebview con catálogo legal unificado de 9 plataformas en España (Netflix, Prime, Disney+, Max) y resolución nativa de protocolos URI en Windows.
                  </p>

                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono">
                    <div>
                      <span className="text-xs sm:text-sm font-black text-indigo-400 block">9 Apps</span>
                      <span className="text-[9px] text-slate-400 uppercase">Plataformas ES</span>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-black text-cyan-400 block">&lt; 250 ms</span>
                      <span className="text-[9px] text-slate-400 uppercase">Deep Link</span>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-black text-emerald-400 block">pywebview</span>
                      <span className="text-[9px] text-slate-400 uppercase">Async RPC</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => setModalProject(PROJECTS_DATA.find((p) => p.id === 'omnistream-hub') || null)}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ficha Técnica Completa</span>
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold cursor-pointer"
                    >
                      Siguiente ➔ KiCad PCBs
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 3: KiCad PCB Laboratory */}
            {currentStage.id === 'pcb' && (
              <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7">
                  <BlueprintCarousel
                    images={getProjectImages('pcb-kicad-lab')}
                    title="KiCad PCBs"
                    aspectRatio="aspect-[16/10]"
                  />
                  <p className="text-[10px] text-slate-400 font-mono text-center pt-2">
                    LÁMINA TÉCNICA: Ruteo de 2 capas SMD, cálculo de disipación y modelado CAD paramétrico
                  </p>
                </div>
                <div className="lg:col-span-5 space-y-3 text-left">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold">
                    MICROELECTRÓNICA FÍSICA
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Laboratorio de Diseño PCB & CAD Paramétrico
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed text-justify">
                    Diseño esquemático y ruteo de 2 capas para microcontroladores (ESP32/RPi), cálculo de disipación térmica y automatización paramétrica de envolventes mecánicas en Blender con Python.
                  </p>

                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono">
                    <div>
                      <span className="text-xs sm:text-sm font-black text-rose-400 block">±0.15 mm</span>
                      <span className="text-[9px] text-slate-400 uppercase">Tolerancia FDM</span>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-black text-cyan-400 block">2 Layers</span>
                      <span className="text-[9px] text-slate-400 uppercase">Topología SMD</span>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-black text-emerald-400 block">Python CAD</span>
                      <span className="text-[9px] text-slate-400 uppercase">Automatización</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => setModalProject(PROJECTS_DATA.find((p) => p.id === 'pcb-kicad-lab') || null)}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ficha Técnica Completa</span>
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold cursor-pointer"
                    >
                      Siguiente ➔ HFS-Sentry
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 4: HFS-Sentry (Defensive Cybersecurity Suite) */}
            {currentStage.id === 'sentry' && (
              <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7">
                  <BlueprintCarousel
                    images={getProjectImages('hfs-sentry')}
                    title="HFS-Sentry"
                    aspectRatio="aspect-[16/10]"
                  />
                  <p className="text-[10px] text-slate-400 font-mono text-center pt-2">
                    LÁMINA TÉCNICA: Escáner concurrente, monitor de integridad FIM y análisis forense de logs
                  </p>
                </div>
                <div className="lg:col-span-5 space-y-3 text-left">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                    ZERO DEPENDENCIES • PYTHON 3
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    HFS-Sentry — Suite Modular de Diagnóstico SOC
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed text-justify">
                    Ecosistema táctico de 7 herramientas de seguridad en 100% Python estándar: escaneo TCP concurrente, ingesta forense de logs con bloqueo activo en firewall UFW y auditoría TLS/SSL.
                  </p>

                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono">
                    <div>
                      <span className="text-xs sm:text-sm font-black text-emerald-400 block">0 Deps</span>
                      <span className="text-[9px] text-slate-400 uppercase">Pure Python</span>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-black text-cyan-400 block">7 Módulos</span>
                      <span className="text-[9px] text-slate-400 uppercase">Herramientas SOC</span>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-black text-sky-400 block">OWASP</span>
                      <span className="text-[9px] text-slate-400 uppercase">Cabeceras Sec</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => setModalProject(PROJECTS_DATA.find((p) => p.id === 'hfs-sentry') || null)}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ficha Técnica Completa</span>
                    </button>
                    <a
                      href="https://github.com/faathii/HFS-Sentry"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>GitHub Repo</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 5: CryptoQuant (Machine Learning & Financial Engineering) */}
            {currentStage.id === 'crypto' && (
              <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7">
                  <BlueprintCarousel
                    images={getProjectImages('botcripto-trading')}
                    title="CryptoQuant ML Bot"
                    aspectRatio="aspect-[16/10]"
                  />
                  <p className="text-[10px] text-slate-400 font-mono text-center pt-2">
                    LÁMINA TÉCNICA: Pipeline de entrenamiento XGBoost, validación Walk-Forward y gestión Kelly
                  </p>
                </div>
                <div className="lg:col-span-5 space-y-3 text-left">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 text-xs font-mono font-bold">
                    QUANTITATIVE MACHINE LEARNING
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    CryptoQuant — Motor Predictivo sobre Series Temporales
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed text-justify">
                    Modelado predictivo sobre series temporales con XGBoost, validación Walk-Forward para mitigar sobreajuste y dimensionamiento de posición bajo criterio estocástico de Kelly.
                  </p>

                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono">
                    <div>
                      <span className="text-xs sm:text-sm font-black text-sky-400 block">2.41</span>
                      <span className="text-[9px] text-slate-400 uppercase">Sharpe Ratio</span>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-black text-emerald-400 block">111M+</span>
                      <span className="text-[9px] text-slate-400 uppercase">Muestras ML</span>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-black text-amber-400 block">Kelly</span>
                      <span className="text-[9px] text-slate-400 uppercase">Risk Management</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => setModalProject(PROJECTS_DATA.find((p) => p.id === 'botcripto-trading') || null)}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ficha Técnica Completa</span>
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold cursor-pointer"
                    >
                      Siguiente ➔ Skills & Contacto
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 6: Skills Matrix & Direct Dispatch Contact */}
            {currentStage.id === 'skills' && (
              <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch text-left">
                {/* Skills Breakdown (6 cols) */}
                <div className="lg:col-span-6 space-y-3">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>Dominios de Ingeniería & Stack Evaluado</span>
                  </h3>

                  <div className="grid grid-cols-2 gap-2.5">
                    {SKILL_CATEGORIES.map((cat, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-xs font-bold text-white block">{cat.title}</span>
                        <div className="flex flex-wrap gap-1">
                          {cat.skills.slice(0, 4).map((s, sIdx) => (
                            <span key={sIdx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                              {s.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dual CV Downloads */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-2">
                    <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider block font-bold">
                      CURRÍCULUM OFICIAL OPTIMIZADO (1 PÁGINA CON FOTO)
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="./Curriculum_Hamza_El_Fathi_Sofyani.pdf"
                        download="Curriculum_Hamza_El_Fathi_Sofyani.pdf"
                        className="py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md text-center"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>CV en PDF</span>
                      </a>
                      <a
                        href="./Curriculum_Hamza_El_Fathi_Sofyani.docx"
                        download="Curriculum_Hamza_El_Fathi_Sofyani.docx"
                        className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
                      >
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        <span>CV en Word (.docx)</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Direct Contact Form (6 cols) */}
                <div className="lg:col-span-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>Canal de Comunicación Directo</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {PERSONAL_INFO.email} • {PERSONAL_INFO.phone} • {PERSONAL_INFO.location}
                    </p>
                  </div>

                  <form onSubmit={handleContactSubmit} className="space-y-2.5 text-xs">
                    {contactSent && (
                      <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-2">
                        <Check className="w-4 h-4 shrink-0" />
                        <span>Mensaje despachado con éxito. Me pondré en contacto de inmediato.</span>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                        placeholder="Nombre / Empresa"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                      />
                      <input
                        type="email"
                        required
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        placeholder="Correo electrónico"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <textarea
                      required
                      rows={2}
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      placeholder="Detalles sobre el proyecto o propuesta técnica..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 resize-none"
                    />

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Despachar Mensaje Directo</span>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Stage Footer Navigation Bar */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-slate-400 hidden sm:inline">NAVEGACIÓN: Usa las flechas o los botones</span>
              <div className="flex items-center gap-1">
                {STAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToStage(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentStageIdx === idx
                        ? 'w-6 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                        : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    title={STAGES[idx].label}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Anterior</span>
              </button>
              <button
                onClick={handleNext}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/40 font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Subtle Terminal Status Bar Footer */}
      <footer className="h-10 px-4 sm:px-8 border-t border-slate-800/80 bg-[#07090e]/90 flex items-center justify-between text-[11px] font-mono text-slate-500 shrink-0 z-20">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>SISTEMA CIBERFÍSICO v2.6 • HAMZA EL FATHI SOFYANI</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com/faathii" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            github.com/faathii
          </a>
          <span>•</span>
          <span>ÁVILA / MADRID</span>
        </div>
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
