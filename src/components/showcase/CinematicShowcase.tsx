import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, Download, Layers, ExternalLink, Mail, Phone, MapPin,
  Send, Check, Volume2, VolumeX, ChevronLeft, ChevronRight,
  ArrowRight, Eye, FileText, GraduationCap, BookOpen,
  User, Sliders, Radio, Tv, CircuitBoard, TrendingUp, Terminal
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, SKILL_CATEGORIES } from '../../data/portfolioData';
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

// Teenage Engineering / Mechanical Tactile Click Sound
const playTactileClick = (freq = 900) => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.03);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch {
    // Audio policy ignore
  }
};

interface CinematicShowcaseProps {
  onOpenBook: () => void;
}

// 8 Industrial Modules: Profile, Skills (before projects), and 5 Projects, ending with Contact/CV
const STAGES = [
  { id: 'profile', code: '01', title: 'PERFIL // CREDENCIAL', tag: 'ID & CISCO', icon: User },
  { id: 'skills', code: '02', title: 'MATRIZ DE INGENIERÍA', tag: '5 PILARES & STACK', icon: Sliders },
  { id: 'iqsense', code: '03', title: 'iQsense 2.0', tag: 'EDGE AI & RPi 5', icon: Radio },
  { id: 'omnistream', code: '04', title: 'OmniStream', tag: 'DESKTOP HUB', icon: Tv },
  { id: 'pcb', code: '05', title: 'KiCad PCBs', tag: 'HARDWARE & CAD', icon: CircuitBoard },
  { id: 'sentry', code: '06', title: 'HFS-Sentry', tag: 'SOC DEFENSIVO', icon: ShieldCheck },
  { id: 'crypto', code: '07', title: 'CryptoQuant', tag: 'MACHINE LEARNING', icon: TrendingUp },
  { id: 'contact', code: '08', title: 'TERMINAL DE CONTACTO', tag: 'DESPACHO & CV', icon: Terminal },
];

export const CinematicShowcase: React.FC<CinematicShowcaseProps> = ({ onOpenBook }) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<Record<string, number>>({});
  const [contactSent, setContactSent] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });

  const totalStages = STAGES.length;
  const currentStage = STAGES[currentStageIdx];

  const goToStage = useCallback((idx: number) => {
    if (idx < 0 || idx >= totalStages) return;
    if (soundEnabled) playTactileClick(750 + idx * 60);
    setCurrentStageIdx(idx);
  }, [totalStages, soundEnabled]);

  const handleNext = useCallback(() => {
    goToStage((currentStageIdx + 1) % totalStages);
  }, [currentStageIdx, totalStages, goToStage]);

  const handlePrev = useCallback(() => {
    goToStage((currentStageIdx - 1 + totalStages) % totalStages);
  }, [currentStageIdx, totalStages, goToStage]);

  // Keyboard navigation: arrows, space, numbers 1-8
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
      } else if (['1', '2', '3', '4', '5', '6', '7', '8'].includes(e.key)) {
        const targetIdx = parseInt(e.key, 10) - 1;
        if (targetIdx >= 0 && targetIdx < totalStages) {
          goToStage(targetIdx);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, modalProject, totalStages, goToStage]);

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
    <div className="h-screen w-screen overflow-hidden bg-[#0c0d12] text-neutral-200 flex flex-col justify-between relative select-none font-sans industrial-dot-grid">
      
      {/* Precision Hairline Background Guides */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-14 inset-x-0 h-[1px] bg-neutral-800/80" />
        <div className="absolute bottom-20 inset-x-0 h-[1px] bg-neutral-800/80" />
        <div className="absolute inset-y-0 left-12 w-[1px] bg-neutral-800/30 hidden lg:block" />
        <div className="absolute inset-y-0 right-12 w-[1px] bg-neutral-800/30 hidden lg:block" />
      </div>

      {/* ========================================================================= */}
      {/* TOP INDUSTRIAL HEADER (Fixed Precision Status Bar)                        */}
      {/* ========================================================================= */}
      <header className="h-14 px-4 sm:px-8 border-b border-neutral-800/90 bg-[#101218]/90 backdrop-blur-xl flex items-center justify-between z-30 shrink-0">
        
        {/* Left Identity Stamped Plate */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-neutral-600 bg-neutral-900 shadow-sm">
              <img src={hamzaImg} alt="Hamza" className="w-full h-full object-cover object-top" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-[#101218] animate-pulse" />
          </div>

          <div className="text-left font-mono">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wider text-white uppercase">{PERSONAL_INFO.name}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-neutral-800 text-orange-400 font-bold border border-neutral-700">
                ES-2026
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 tracking-tight hidden sm:block">
              Ingeniería Ciberfísica • UNED Grado Informática
            </p>
          </div>
        </div>

        {/* Center Active Module Indicator Pill */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700/80 font-mono text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
          <span className="text-orange-400 font-bold tracking-wider">{currentStage.code}</span>
          <span className="text-neutral-600">//</span>
          <span className="text-neutral-200 font-semibold tracking-wide uppercase">{currentStage.title}</span>
        </div>

        {/* Right Tools: Audio Switcher & Release CV */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-lg border font-mono text-xs transition-colors cursor-pointer ${
              soundEnabled
                ? 'border-orange-500/40 text-orange-400 bg-orange-500/10'
                : 'border-neutral-800 text-neutral-600 hover:text-neutral-400'
            }`}
            title={soundEnabled ? 'Interruptor de audio: ACTIVO' : 'Audio silenciado'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <a
            href="./Curriculum_Hamza_El_Fathi_Sofyani.pdf"
            download="Curriculum_Hamza_El_Fathi_Sofyani.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-neutral-950 text-xs font-mono font-black uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(249,115,22,0.35)] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Descargar CV (PDF)</span>
            <span className="sm:hidden">CV</span>
          </a>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN IMMERSIVE INDUSTRIAL STAGE (100% Viewport, Zero Window Scroll)       */}
      {/* ========================================================================= */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-2 sm:p-5 flex flex-col justify-center relative z-10 overflow-hidden">
        
        {/* Anodized Aluminum Machined Chassis */}
        <div className="w-full h-full max-h-[760px] rounded-2xl bg-[#12141c]/95 border border-neutral-800 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col justify-between p-3.5 sm:p-6">
          
          {/* Top Chassis Metadata Strip */}
          <div className="flex items-center justify-between pb-2.5 border-b border-neutral-800/80 text-[11px] font-mono shrink-0">
            <div className="flex items-center gap-2 text-neutral-400">
              <span className="text-orange-400 font-bold">● REF: HFS-ENG-2026</span>
              <span>//</span>
              <span className="uppercase text-neutral-300">{currentStage.tag}</span>
            </div>

            <div className="flex items-center gap-3 text-neutral-500">
              <span className="hidden sm:inline font-mono">ESTACIÓN 0{currentStageIdx + 1} / 0{totalStages}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="p-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 cursor-pointer"
                  title="Módulo anterior (Flecha Izq)"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 cursor-pointer"
                  title="Siguiente módulo (Flecha Der)"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Stage Canvas with Smooth Tactile Fade */}
          <div className="flex-1 w-full overflow-y-auto real-paper-scroll py-3">
            <div key={currentStage.id} className="stage-fade-enter h-full">

              {/* ================================================================= */}
              {/* STAGE 01: CREDENCIAL DE INGENIERÍA & CISCO CERTIFICATIONS          */}
              {/* ================================================================= */}
              {currentStage.id === 'profile' && (
                <div className="h-full flex flex-col lg:flex-row items-center gap-6 sm:gap-8 text-left">
                  
                  {/* Heavy-duty Industrial Badge ID Card */}
                  <div className="shrink-0 w-full sm:w-64 rounded-2xl bg-[#171a23] border border-neutral-700/80 p-3.5 shadow-xl relative overflow-hidden">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-[10px] font-mono text-neutral-400">
                      <span>DOC ID: #8924-ENG</span>
                      <span className="text-orange-400 font-bold">VERIFICADO</span>
                    </div>

                    <div className="w-full h-56 rounded-xl overflow-hidden border border-neutral-700 relative bg-black shadow-inner">
                      <img src={hamzaImg} alt={PERSONAL_INFO.name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-x-0 bottom-0 py-1.5 px-2 bg-neutral-950/90 backdrop-blur-md border-t border-neutral-800 flex items-center justify-between text-[10px] font-mono">
                        <span className="font-bold text-white">{PERSONAL_INFO.name}</span>
                        <span className="text-orange-400 font-bold">UNED</span>
                      </div>
                    </div>

                    {/* Metadata tags */}
                    <div className="mt-3 space-y-1.5 font-mono text-[10px]">
                      <div className="flex justify-between py-1 px-2 rounded bg-neutral-900/90 border border-neutral-800">
                        <span className="text-neutral-500">DISCIPLINA:</span>
                        <span className="text-neutral-200 font-bold">SISTEMAS CIBERFÍSICOS</span>
                      </div>
                      <div className="flex justify-between py-1 px-2 rounded bg-neutral-900/90 border border-neutral-800">
                        <span className="text-neutral-500">ESTADO:</span>
                        <span className="text-emerald-400 font-bold">DISPONIBLE 2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Dossier & 7 Cisco Badges Plate */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold">
                        EXPEDIENTE TÉCNICO OFICIAL
                      </span>
                      <span className="text-xs font-mono text-neutral-400">
                        ÁVILA / MADRID • DISPONIBILIDAD INMEDIATA
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                      Ingeniería de Hardware, Software Distribuido & Seguridad Defensiva
                    </h1>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed text-justify">
                      {PERSONAL_INFO.bio}
                    </p>

                    {/* Contact metadata pills */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-orange-400 flex items-center gap-1.5 transition-colors">
                        <Mail className="w-3.5 h-3.5 text-orange-400" />
                        <span>{PERSONAL_INFO.email}</span>
                      </a>
                      <a href={`tel:${PERSONAL_INFO.phone}`} className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-orange-400 flex items-center gap-1.5 transition-colors">
                        <Phone className="w-3.5 h-3.5 text-orange-400" />
                        <span>{PERSONAL_INFO.phone}</span>
                      </a>
                      <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-orange-400" />
                        <span>{PERSONAL_INFO.location}</span>
                      </span>
                      <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-orange-400" />
                        <span>UNED: Grado en Ingeniería Informática</span>
                      </span>
                    </div>

                    {/* 7 Cisco Networking Academy Certification Rack */}
                    <div className="p-3 rounded-xl bg-neutral-950/90 border border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800 text-xs font-mono">
                        <span className="font-bold text-neutral-200 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span>ACREDITACIONES OFICIALES CISCO NETWORKING ACADEMY</span>
                        </span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold">
                          7 INSIGNIAS VERIFICADAS
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 text-center">
                        <div className="p-1.5 rounded-lg bg-[#14161f] border border-neutral-800 flex flex-col items-center">
                          <img src={ciscoCyberOpsImg} alt="CyberOps" className="w-8 h-8 object-contain mb-1" />
                          <span className="text-[9px] font-bold text-white">CyberOps</span>
                          <span className="text-[8px] text-neutral-500 font-mono">Associate</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-[#14161f] border border-neutral-800 flex flex-col items-center">
                          <img src={ciscoIntroImg} alt="Intro" className="w-8 h-8 object-contain mb-1" />
                          <span className="text-[9px] font-bold text-white">Intro Cyber</span>
                          <span className="text-[8px] text-neutral-500 font-mono">Security</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-[#14161f] border border-neutral-800 flex flex-col items-center">
                          <img src={ciscoEnterpriseImg} alt="Enterprise" className="w-7 h-7 object-contain mb-1" />
                          <span className="text-[9px] font-bold text-neutral-300">Empresas</span>
                          <span className="text-[8px] text-neutral-500 font-mono">Protección</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-[#14161f] border border-neutral-800 flex flex-col items-center">
                          <img src={ciscoThreatsImg} alt="Threats" className="w-7 h-7 object-contain mb-1" />
                          <span className="text-[9px] font-bold text-neutral-300">Amenazas</span>
                          <span className="text-[8px] text-neutral-500 font-mono">& SOC</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-[#14161f] border border-neutral-800 flex flex-col items-center">
                          <img src={ciscoCryptoImg} alt="Crypto" className="w-7 h-7 object-contain mb-1" />
                          <span className="text-[9px] font-bold text-neutral-300">Criptografía</span>
                          <span className="text-[8px] text-neutral-500 font-mono">& Claves</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-[#14161f] border border-neutral-800 flex flex-col items-center">
                          <img src={ciscoFirewallImg} alt="Firewall" className="w-7 h-7 object-contain mb-1" />
                          <span className="text-[9px] font-bold text-neutral-300">Firewalls</span>
                          <span className="text-[8px] text-neutral-500 font-mono">Perimetral</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-[#14161f] border border-neutral-800 flex flex-col items-center">
                          <img src={ciscoNetSecImg} alt="NetSec" className="w-7 h-7 object-contain mb-1" />
                          <span className="text-[9px] font-bold text-neutral-300">Redes Sec</span>
                          <span className="text-[8px] text-neutral-500 font-mono">Infraestructura</span>
                        </div>
                      </div>
                    </div>

                    {/* Action button to stage 02 */}
                    <div className="pt-1">
                      <button
                        onClick={handleNext}
                        className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-neutral-950 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md transition-all"
                      >
                        <span>Avanzar a Matriz de Tecnologías ➔</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* STAGE 02: DOMINIOS DE INGENIERÍA & STACK (BEFORE PROJECTS)         */}
              {/* ================================================================= */}
              {currentStage.id === 'skills' && (
                <div className="h-full flex flex-col justify-between space-y-3 text-left font-mono">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800">
                      <div>
                        <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                          <Layers className="w-4 h-4 text-orange-400" />
                          <span>Matriz de Dominios Técnicos & Pilares de Ingeniería</span>
                        </h2>
                        <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                          Evaluación técnica rigurosa desde la microelectrónica y el diseño físico de hardware hasta arquitecturas distribuidas, SOC defensivo y modelos de IA predictiva.
                        </p>
                      </div>

                      <button
                        onClick={handleNext}
                        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                      >
                        <span>Ver Proyectos ➔</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* 5 Tactile Rack Panels */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5">
                      {SKILL_CATEGORIES.map((cat, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-2">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-white uppercase tracking-tight leading-tight">{cat.title}</span>
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-neutral-800 text-orange-400 font-bold border border-neutral-700 shrink-0">
                                PILAR 0{idx + 1}
                              </span>
                            </div>

                            <p className="text-[10px] text-neutral-400 font-sans leading-relaxed line-clamp-2">
                              {cat.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1 pt-1">
                            {cat.skills.map((s, sIdx) => (
                              <span
                                key={sIdx}
                                className={`text-[9px] px-1.5 py-0.5 rounded border ${
                                  s.highlight
                                    ? 'bg-neutral-800 text-orange-300 border-orange-500/40 font-bold'
                                    : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                                }`}
                              >
                                {s.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Precision Engineering Telemetry Strip */}
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 w-full sm:w-auto text-center sm:text-left text-xs">
                      <div>
                        <span className="font-black text-orange-400 block">&lt; 18 ms</span>
                        <span className="text-[9px] text-neutral-500 uppercase">Inferencia Edge AI</span>
                      </div>
                      <div>
                        <span className="font-black text-emerald-400 block">111M+</span>
                        <span className="text-[9px] text-neutral-500 uppercase">Dataset ML Financiero</span>
                      </div>
                      <div>
                        <span className="font-black text-sky-400 block">0 Deps</span>
                        <span className="text-[9px] text-neutral-500 uppercase">Python SOC Puro</span>
                      </div>
                      <div>
                        <span className="font-black text-amber-400 block">±0.15 mm</span>
                        <span className="text-[9px] text-neutral-500 uppercase">Tolerancia CAD / PCB</span>
                      </div>
                      <div>
                        <span className="font-black text-purple-400 block">540 Horas</span>
                        <span className="text-[9px] text-neutral-500 uppercase">Oficial Cisco SOC</span>
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-full sm:w-auto px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all shrink-0"
                    >
                      <span>Explorar iQsense 2.0 (RPi 5)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* STAGES 03 - 07: TECHNICAL PROJECTS (HERO FOCUS ON REAL HARDWARE)  */}
              {/* ================================================================= */}
              {['iqsense', 'omnistream', 'pcb', 'sentry', 'crypto'].includes(currentStage.id) && (() => {
                const projectMapping: Record<string, string> = {
                  'iqsense': 'iqsense-iot',
                  'omnistream': 'omnistream-app',
                  'pcb': 'pcb-design',
                  'sentry': 'hfs-sentry-soc',
                  'crypto': 'botcripto-trading',
                };
                const pId = projectMapping[currentStage.id];
                const project = PROJECTS_DATA.find((p) => p.id === pId);
                if (!project) return null;

                const images = getProjectImages(pId);
                const activeImgIdx = selectedPhotoIdx[pId] || 0;
                const activeImg = images[activeImgIdx] || images[0];

                return (
                  <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center text-left">
                    
                    {/* Left 60%: High-Precision Hardware Visualizer */}
                    <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-2">
                      <div className="w-full h-[280px] sm:h-[360px] rounded-xl overflow-hidden border border-neutral-700 bg-black relative group shadow-xl">
                        <img
                          src={activeImg}
                          alt={project.title}
                          className="w-full h-full object-contain p-2 hover:scale-[1.02] transition-transform duration-300"
                        />

                        {/* Top Watermark Overlay */}
                        <div className="absolute top-2 left-2 px-2 py-1 rounded bg-neutral-950/80 backdrop-blur border border-neutral-800 text-[10px] font-mono text-neutral-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                          <span>REGISTRO: {project.id.toUpperCase()}</span>
                          <span className="text-neutral-500">[{activeImgIdx + 1}/{images.length}]</span>
                        </div>

                        {/* Direct Modal Magnifier Button */}
                        <button
                          onClick={() => setModalProject(project)}
                          className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700 text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-orange-400" />
                          <span>Ficha Completa</span>
                        </button>
                      </div>

                      {/* Tactile Hardware Photo Selector Strip */}
                      {images.length > 1 && (
                        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                          {images.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                if (soundEnabled) playTactileClick(850 + idx * 40);
                                setSelectedPhotoIdx((prev) => ({ ...prev, [pId]: idx }));
                              }}
                              className={`h-12 w-16 sm:w-20 rounded-lg overflow-hidden border transition-all shrink-0 cursor-pointer ${
                                activeImgIdx === idx
                                  ? 'border-orange-500 ring-2 ring-orange-500/30 scale-105'
                                  : 'border-neutral-800 opacity-60 hover:opacity-100 hover:border-neutral-600'
                              }`}
                            >
                              <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right 40%: Machined Technical Specification Plate */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-3 font-mono">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                          <span>{project.badge}</span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase mt-0.5">
                          {project.title}
                        </h3>

                        <p className="text-xs text-neutral-300 font-sans leading-relaxed mt-2 text-justify">
                          {project.description}
                        </p>

                        {/* Engineering Challenge & Solution Box */}
                        <div className="mt-3 p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5 text-[11px] font-sans">
                          <div>
                            <span className="text-orange-400 font-mono font-bold text-[10px] uppercase block">Desafío Técnico:</span>
                            <p className="text-neutral-400 leading-tight">{project.challenge}</p>
                          </div>
                          <div>
                            <span className="text-emerald-400 font-mono font-bold text-[10px] uppercase block">Solución de Ingeniería:</span>
                            <p className="text-neutral-300 leading-tight">{project.solution}</p>
                          </div>
                        </div>

                        {/* Machine Metrics Chips */}
                        {project.metrics && project.metrics.length > 0 && (
                          <div className="grid grid-cols-3 gap-1.5 mt-2.5 text-center">
                            {project.metrics.map((m, mIdx) => (
                              <div key={mIdx} className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800">
                                <span className="text-xs font-black text-white block">{m.value}</span>
                                <span className="text-[8px] text-neutral-500 uppercase">{m.label}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tags as tactile key caps */}
                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {project.tags.slice(0, 5).map((t, tIdx) => (
                            <span key={tIdx} className="text-[9px] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 pt-2 border-t border-neutral-800">
                        <button
                          onClick={() => setModalProject(project)}
                          className="flex-1 py-2 px-3 rounded-lg bg-orange-500 hover:bg-orange-400 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ficha Técnica Completa</span>
                        </button>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-xs font-bold flex items-center gap-1.5 transition-all"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* ================================================================= */}
              {/* STAGE 08: DESPACHO DIRECTO & DESCARGAS OFICIALES DEL CV           */}
              {/* ================================================================= */}
              {currentStage.id === 'contact' && (
                <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center text-left">
                  
                  {/* Left Column: Direct Downloads & Communication Channels */}
                  <div className="lg:col-span-6 space-y-4">
                    <div>
                      <span className="text-xs font-mono text-orange-400 uppercase tracking-wider block font-bold">
                        CANAL DE COMUNICACIÓN & CONTRATACIÓN
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Contacto Directo & Expediente Oficial
                      </h2>
                      <p className="text-xs text-neutral-400 font-sans mt-1">
                        Descarga el currículum técnico en formato oficial o transmite un mensaje cifrado para concertar entrevista técnica.
                      </p>
                    </div>

                    {/* Contact items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                      <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                        <a href={`mailto:${PERSONAL_INFO.email}`} className="text-neutral-200 hover:text-orange-400 font-bold transition-colors truncate">
                          {PERSONAL_INFO.email}
                        </a>
                      </div>
                      <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                        <a href={`tel:${PERSONAL_INFO.phone}`} className="text-neutral-200 hover:text-orange-400 font-bold transition-colors">
                          {PERSONAL_INFO.phone}
                        </a>
                      </div>
                      <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                        <span className="text-neutral-300">{PERSONAL_INFO.location}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-2.5">
                        <ExternalLink className="w-4 h-4 text-orange-400 shrink-0" />
                        <a href="https://github.com/faathii" target="_blank" rel="noreferrer" className="text-neutral-200 hover:text-orange-400 font-bold transition-colors">
                          github.com/faathii
                        </a>
                      </div>
                    </div>

                    {/* Dual CV Downloads Heavy-Duty Panel */}
                    <div className="p-3.5 rounded-2xl bg-neutral-950 border border-orange-500/40 space-y-2">
                      <span className="text-xs font-mono text-orange-400 uppercase tracking-wider block font-bold text-center">
                        CURRÍCULUM VITAE 2026 (1 PÁGINA CON FOTO)
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href="./Curriculum_Hamza_El_Fathi_Sofyani.pdf"
                          download="Curriculum_Hamza_El_Fathi_Sofyani.pdf"
                          className="py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-neutral-950 font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md text-center cursor-pointer"
                        >
                          <Download className="w-4 h-4 shrink-0" />
                          <span>Descargar PDF</span>
                        </a>
                        <a
                          href="./Curriculum_Hamza_El_Fathi_Sofyani.docx"
                          download="Curriculum_Hamza_El_Fathi_Sofyani.docx"
                          className="py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer"
                        >
                          <FileText className="w-4 h-4 text-orange-400 shrink-0" />
                          <span>Descargar Word</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Direct Dispatch Transmission Form */}
                  <div className="lg:col-span-6 p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold flex items-center gap-2">
                        <Send className="w-3.5 h-3.5" />
                        <span>Despacho Inmediato de Mensaje</span>
                      </h3>
                      <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                        Transmisión directa al buzón de Hamza para ofertas técnicas, colaboraciones o entrevistas.
                      </p>
                    </div>

                    <form onSubmit={handleContactSubmit} className="space-y-2.5 text-xs font-mono">
                      {contactSent && (
                        <div className="p-2.5 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-2">
                          <Check className="w-4 h-4 shrink-0" />
                          <span>Mensaje despachado correctamente. Respuesta en menos de 24 horas.</span>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          value={contactData.name}
                          onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                          placeholder="Nombre / Empresa"
                          className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500"
                        />
                        <input
                          type="email"
                          required
                          value={contactData.email}
                          onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                          placeholder="Correo electrónico"
                          className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <textarea
                        required
                        rows={3}
                        value={contactData.message}
                        onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                        placeholder="Detalles de la propuesta técnica, rol o vacante..."
                        className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500 resize-none"
                      />

                      <button
                        type="submit"
                        className="w-full py-2.5 px-4 rounded-lg bg-orange-500 hover:bg-orange-400 text-neutral-950 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Transmitir Mensaje</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Bottom Chassis Technical Indicators Strip */}
          <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-500 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>SISTEMA INDUSTRIAL v3.0 // HAMZA EL FATHI SOFYANI</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span>ATAJOS: [1 - 8] MODS</span>
              <span>•</span>
              <span>[B] LIBRO 3D</span>
              <span>•</span>
              <span>[← →] NAV</span>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* FIXED FLOATING INDUSTRIAL CONTROL DOCK (Teenage Engineering / Apple Pro)   */}
      {/* ========================================================================= */}
      <nav className="fixed bottom-3 inset-x-0 mx-auto w-fit z-40 max-w-[96vw] px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl bg-[#14161f]/95 backdrop-blur-2xl border border-neutral-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex items-center gap-1 sm:gap-2 overflow-x-auto">
        
        {STAGES.map((st, idx) => {
          const IconComp = st.icon;
          const isActive = currentStageIdx === idx;
          return (
            <button
              key={st.id}
              onClick={() => goToStage(idx)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-neutral-900 text-white font-bold border border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/70 border border-transparent'
              }`}
              title={`${st.code} — ${st.title}`}
            >
              <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-orange-400' : 'text-neutral-500'}`} />
              <span className="hidden md:inline">{st.tag}</span>
              <span className="md:hidden">{st.code}</span>
              {isActive && <span className="w-1 h-1 rounded-full bg-orange-500" />}
            </button>
          );
        })}

        {/* Separator Pipe */}
        <div className="h-5 w-[1px] bg-neutral-700 shrink-0 mx-0.5" />

        {/* Extra 3D Book Industrial Switch Button */}
        <button
          onClick={onOpenBook}
          className="px-2.5 py-1.5 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 text-orange-400 border border-orange-500/40 text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          title="Abrir Monografía Técnica en Libro Físico 3D (Atajo: tecla B)"
        >
          <BookOpen className="w-3.5 h-3.5 text-orange-400" />
          <span className="hidden sm:inline">Libro 3D</span>
          <span className="text-[9px] px-1 py-0.2 rounded bg-orange-500/20 text-orange-300 font-mono">EXTRA</span>
        </button>
      </nav>

      {/* Project Deep Dive Technical Modal */}
      {modalProject && (
        <ProjectModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
    </div>
  );
};
