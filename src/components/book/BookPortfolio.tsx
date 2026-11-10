import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, BookOpen, Volume2, VolumeX, 
  FileText, ArrowRight, ShieldCheck, Award, GraduationCap, 
  Download, Send, Check, Mail, Phone, MapPin, 
  ExternalLink, RefreshCw
} from 'lucide-react';
import { playPageTurnSound } from './BookSound';
import { PERSONAL_INFO, PROJECTS_DATA, SKILL_CATEGORIES, TIMELINE_DATA } from '../../data/portfolioData';
import { ProjectModal } from '../ProjectModal';
import { BlueprintCarousel } from '../blueprint/BlueprintCarousel';
import type { Project } from '../../types';

import hamzaImg from '../../assets/hamza.jpg';
import ciscoCyberOpsImg from '../../assets/certificates/cisco-cyberops-associate.png';
import ciscoIntroImg from '../../assets/certificates/cisco-intro-cybersecurity.png';
import ciscoEnterpriseImg from '../../assets/certificates/cisco-module-enterprise-protection.png';
import ciscoThreatsImg from '../../assets/certificates/cisco-module-threats-vulnerabilities.png';
import ciscoCryptoImg from '../../assets/certificates/cisco-module-cryptography.png';
import ciscoFirewallImg from '../../assets/certificates/cisco-module-firewall-defense.png';
import ciscoNetSecImg from '../../assets/certificates/cisco-module-network-security.png';

// Project images mapping for carousels
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

const CHAPTERS = [
  { spread: 0, title: 'Portada', pageLabel: 'PORTADA' },
  { spread: 1, title: 'Perfil & Stack', pageLabel: 'PÁGS. 01 - 02' },
  { spread: 2, title: 'Hardware & IoT', pageLabel: 'PÁGS. 03 - 04' },
  { spread: 3, title: 'Software & Ciberseguridad', pageLabel: 'PÁGS. 05 - 06' },
  { spread: 4, title: 'ML & Trayectoria', pageLabel: 'PÁGS. 07 - 08' },
  { spread: 5, title: 'Contacto & CV', pageLabel: 'PÁGS. 09 - 10' },
];

export const BookPortfolio: React.FC = () => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Contact form state
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const totalSpreads = CHAPTERS.length;

  const goToSpread = useCallback((newSpread: number, direction: 'next' | 'prev' = 'next') => {
    if (newSpread < 0 || newSpread >= totalSpreads || isFlipping) return;
    
    if (soundEnabled) {
      playPageTurnSound();
    }

    setFlipDirection(direction);
    setIsFlipping(true);

    setTimeout(() => {
      setCurrentSpread(newSpread);
      setIsFlipping(false);
    }, 280);
  }, [totalSpreads, isFlipping, soundEnabled]);

  const handleNext = useCallback(() => {
    if (currentSpread < totalSpreads - 1) {
      goToSpread(currentSpread + 1, 'next');
    }
  }, [currentSpread, totalSpreads, goToSpread]);

  const handlePrev = useCallback(() => {
    if (currentSpread > 0) {
      goToSpread(currentSpread - 1, 'prev');
    }
  }, [currentSpread, goToSpread]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) return; // Do not turn pages when modal is open
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, selectedProject]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  // Helper to get project images
  const getProjectImages = (pId: string): string[] => {
    const p = PROJECTS_DATA.find((item) => item.id === pId);
    if (!p) return [];
    const keys = p.images && p.images.length > 0 ? p.images : p.imageUrl ? [p.imageUrl] : [];
    return keys.map((k) => projectImages[k]).filter(Boolean);
  };

  return (
    <div className="relative w-screen h-screen desk-bg flex flex-col justify-between overflow-hidden select-none font-sans text-slate-200">
      {/* Top Luxury Book Bar */}
      <header className="h-14 px-4 sm:px-8 border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-md flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <div>
            <span className="font-bold text-white text-sm tracking-wide">
              {PERSONAL_INFO.name}
            </span>
            <span className="hidden sm:inline-block text-xs text-cyan-400/80 ml-2 font-mono">
              • Dossier Digital Interactivo 2026
            </span>
          </div>
        </div>

        {/* Ribbon Chapters Index */}
        <div className="hidden lg:flex items-center gap-1.5">
          {CHAPTERS.map((chap, idx) => (
            <button
              key={idx}
              onClick={() => goToSpread(idx, idx > currentSpread ? 'next' : 'prev')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                currentSpread === idx
                  ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(34,211,238,0.35)]'
                  : 'text-zinc-400 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              {chap.title}
            </button>
          ))}
        </div>

        {/* Right Quick Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              soundEnabled
                ? 'border-cyan-500/40 text-cyan-400 bg-cyan-950/30'
                : 'border-slate-800 text-zinc-500 hover:text-zinc-300'
            }`}
            title={soundEnabled ? 'Sonido de pasar página activado' : 'Sonido silenciado'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <a
            href="./Curriculum_Hamza_El_Fathi_Sofyani.pdf"
            download="Curriculum_Hamza_El_Fathi_Sofyani.pdf"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar CV</span>
          </a>
        </div>
      </header>

      {/* Main Book Display Container (Fitted viewport with 3D perspective) */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-2 sm:p-4 md:p-6 flex items-center justify-center relative z-10 overflow-hidden">
        {/* Floating Prev Button */}
        {currentSpread > 0 && (
          <button
            onClick={handlePrev}
            aria-label="Página anterior"
            className="absolute left-2 sm:left-4 z-40 w-12 h-12 rounded-full bg-slate-950/90 border border-cyan-500/50 hover:border-cyan-300 text-cyan-400 hover:text-white hover:bg-cyan-500 hover:scale-110 flex items-center justify-center transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)] cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
        )}

        {/* Floating Next Button */}
        {currentSpread < totalSpreads - 1 && (
          <button
            onClick={handleNext}
            aria-label="Página siguiente"
            className="absolute right-2 sm:right-4 z-40 w-12 h-12 rounded-full bg-slate-950/90 border border-cyan-500/50 hover:border-cyan-300 text-cyan-400 hover:text-white hover:bg-cyan-500 hover:scale-110 flex items-center justify-center transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)] cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        )}

        {/* The 3D Book Frame */}
        <div 
          className={`w-full h-full max-h-[820px] rounded-3xl book-shadow relative overflow-hidden transition-all duration-300 ${
            isFlipping
              ? flipDirection === 'next'
                ? 'scale-[0.985] opacity-90'
                : 'scale-[0.985] opacity-90'
              : 'scale-100 opacity-100'
          }`}
        >
          {/* ======================================================== */}
          {/* SPREAD 0: PORTADA DEL LIBRO                              */}
          {/* ======================================================== */}
          {currentSpread === 0 && (
            <div className="w-full h-full leather-cover rounded-3xl p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden">
              {/* Gold foil corner ornaments */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-400/50 rounded-tl-xl pointer-events-none" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-400/50 rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-400/50 rounded-bl-xl pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-400/50 rounded-br-xl pointer-events-none" />

              {/* Cover Header */}
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 border-b border-cyan-500/30 pb-4">
                <span className="tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  EXPEDIENTE OFICIAL DE INGENIERÍA 2026
                </span>
                <span className="text-amber-400 font-bold">EDICIÓN EJECUTIVA</span>
              </div>

              {/* Cover Main Centerpiece */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-14 my-auto py-4">
                {/* Photo in Luxury Frame */}
                <div className="relative group shrink-0">
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-cyan-400 via-amber-300 to-emerald-400 blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="w-44 h-56 sm:w-52 sm:h-64 rounded-2xl overflow-hidden border-2 border-amber-400/70 relative z-10 shadow-2xl bg-black">
                    <img
                      src={hamzaImg}
                      alt={PERSONAL_INFO.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-x-0 bottom-0 py-2 px-3 bg-slate-950/90 text-center border-t border-amber-400/30">
                      <p className="text-white font-bold text-xs">Ávila / Madrid</p>
                      <p className="text-[10px] text-cyan-300 font-mono">España</p>
                    </div>
                  </div>
                </div>

                {/* Cover Titles */}
                <div className="text-center md:text-left space-y-3 max-w-lg">
                  <span className="text-xs uppercase tracking-widest font-mono text-amber-300 font-bold block">
                    DOSSIER PROFESIONAL & PORTFOLIO
                  </span>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight foil-cyan leading-tight">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className="text-base sm:text-xl text-slate-200 font-medium">
                    Ingeniería de Sistemas Ciberfísicos, Edge AI & Ciberseguridad Defensiva
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans pt-1">
                    Estudiante de Grado en Ingeniería Informática (UNED) y Certificado oficial por Cisco Networking Academy. Prototipado físico de hardware (PCBs KiCad), inferencia en Edge (Raspberry Pi 5) y arquitecturas en Python, C# y TypeScript.
                  </p>

                  {/* Seals & Badges */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/70 border border-cyan-400/40 text-xs text-cyan-300 font-mono">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      <span>Cisco CyberOps</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/70 border border-emerald-400/40 text-xs text-emerald-300 font-mono">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span>Intro to Cybersecurity</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-amber-400/40 text-xs text-amber-300 font-mono">
                      <GraduationCap className="w-4 h-4 text-amber-400" />
                      <span>UNED Ing. Informática</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Bottom Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-cyan-500/30 text-xs">
                <span className="text-zinc-500 font-mono hidden sm:inline-block">
                  Usa las flechas del teclado o los botones laterales para pasar de página
                </span>

                <button
                  onClick={handleNext}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Abrir Dossier Técnico</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dog-ear corner fold */}
              <div onClick={handleNext} className="page-corner-fold" title="Pasar a la siguiente página" />
            </div>
          )}

          {/* ======================================================== */}
          {/* SPREAD 1: PÁGINAS 1 & 2 (PERFIL & STACK TÉCNICO)         */}
          {/* ======================================================== */}
          {currentSpread === 1 && (
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 relative">
              {/* Left Page (Pág 1: Biografía & Cisco) */}
              <div className="page-paper-left p-6 sm:p-8 flex flex-col justify-between overflow-y-auto book-page-scroll relative">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20 text-xs font-mono">
                    <span className="text-cyan-400 font-bold uppercase">CAPÍTULO 01 // PERFIL</span>
                    <span className="text-zinc-500">PÁG. 01</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                    Perfil & Formación Oficial
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                    {PERSONAL_INFO.bio}
                  </p>

                  {/* Official Cisco Credentials Box */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-3.5 mb-4">
                    <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
                      <span className="text-xs font-bold text-cyan-300 font-mono">ACREDITACIONES CISCO OFICIALES</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">VERIFICADO</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <img src={ciscoCyberOpsImg} alt="CyberOps" className="w-12 h-12 object-contain shrink-0 drop-shadow" />
                      <div>
                        <p className="text-xs font-bold text-white">Cisco CyberOps Associate</p>
                        <p className="text-[11px] text-zinc-400">Operaciones SOC, análisis forense y respuesta a incidentes</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <img src={ciscoIntroImg} alt="Intro to Cyber" className="w-12 h-12 object-contain shrink-0 drop-shadow" />
                      <div>
                        <p className="text-xs font-bold text-white">Introduction to Cybersecurity</p>
                        <p className="text-[11px] text-zinc-400">Fundamentos de defensa, topología y criptografía</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-cyan-500/20 flex items-center justify-between">
                      <span className="text-[10px] text-zinc-400">5 Módulos Superados:</span>
                      <div className="flex items-center gap-1.5">
                        <img src={ciscoFirewallImg} alt="Firewall" className="w-6 h-6 object-contain" title="Firewalls" />
                        <img src={ciscoThreatsImg} alt="Threats" className="w-6 h-6 object-contain" title="Amenazas" />
                        <img src={ciscoCryptoImg} alt="Crypto" className="w-6 h-6 object-contain" title="Criptografía" />
                        <img src={ciscoNetSecImg} alt="NetSec" className="w-6 h-6 object-contain" title="Seguridad de Red" />
                        <img src={ciscoEnterpriseImg} alt="Enterprise" className="w-6 h-6 object-contain" title="Protección de Activos" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-zinc-500 font-mono border-t border-slate-800">
                  <span>Hamza El Fathi Sofyani</span>
                  <span>UNED Ing. Informática</span>
                </div>
                <div onClick={handlePrev} className="page-corner-fold-left" title="Página anterior" />
              </div>

              {/* Book Spine Center Divider */}
              <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 book-spine pointer-events-none z-20" />

              {/* Right Page (Pág 2: Habilidades & Tecnologías) */}
              <div className="page-paper-right p-6 sm:p-8 flex flex-col justify-between overflow-y-auto book-page-scroll relative">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20 text-xs font-mono">
                    <span className="text-emerald-400 font-bold uppercase">CAPÍTULO 01 // STACK TÉCNICO</span>
                    <span className="text-zinc-500">PÁG. 02</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                    Competencias & Especialidades
                  </h2>

                  <div className="space-y-3.5 my-3">
                    {SKILL_CATEGORIES.map((cat, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-white">{cat.title}</span>
                          <span className="text-[10px] font-mono text-cyan-400">0{idx + 1}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {cat.skills.slice(0, 4).map((s, sIdx) => (
                            <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-cyan-300 font-mono border border-cyan-500/20">
                              {s.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-zinc-500 font-mono border-t border-slate-800">
                  <span>Stack Verificado en Producción</span>
                  <span>Siguiente: Hardware ➔</span>
                </div>
                <div onClick={handleNext} className="page-corner-fold" title="Página siguiente" />
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SPREAD 2: PÁGINAS 3 & 4 (HARDWARE, IOT & EDGE AI)         */}
          {/* ======================================================== */}
          {currentSpread === 2 && (
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 relative">
              {/* Left Page (Pág 3: iQsense 2.0) */}
              <div className="page-paper-left p-6 sm:p-8 flex flex-col justify-between overflow-y-auto book-page-scroll relative">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20 text-xs font-mono">
                    <span className="text-cyan-400 font-bold uppercase">PROYECTO INSIGNIA // EDGE AI</span>
                    <span className="text-zinc-500">PÁG. 03</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      ⭐ PROYECTO INSIGNIA
                    </span>
                    <span className="text-xs font-mono text-cyan-400">iQsense 2.0</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    Sistema Ciberfísico & Edge AI para Control Climático
                  </h3>

                  {/* Carousel with 6 real images */}
                  <div className="my-3">
                    <BlueprintCarousel
                      images={getProjectImages('iqsense-iot')}
                      title="iQsense 2.0"
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-3">
                    Plataforma ciberfísica que entrena modelos predictivos de VPD e inercia térmica, ejecutando inferencia autónoma sub-18ms en Raspberry Pi 5 con placa PCB dedicada.
                  </p>

                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-center font-mono">
                    <div>
                      <span className="text-xs font-bold text-cyan-300 block">&lt; 18 ms</span>
                      <span className="text-[9px] text-zinc-400 uppercase">Inferencia RPi5</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-300 block">R² = 0.94</span>
                      <span className="text-[9px] text-zinc-400 uppercase">Precisión VPD</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-sky-300 block">&gt; 1.2M</span>
                      <span className="text-[9px] text-zinc-400 uppercase">Dataset ML</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-xs border-t border-slate-800">
                  <button
                    onClick={() => setSelectedProject(PROJECTS_DATA.find((p) => p.id === 'iqsense-iot') || null)}
                    className="text-cyan-400 hover:text-white font-bold flex items-center gap-1.5 cursor-pointer uppercase text-xs"
                  >
                    <span>Ver Plano Detallado</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-zinc-500 font-mono">PÁG. 03</span>
                </div>
                <div onClick={handlePrev} className="page-corner-fold-left" title="Página anterior" />
              </div>

              {/* Book Spine Center Divider */}
              <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 book-spine pointer-events-none z-20" />

              {/* Right Page (Pág 4: Laboratorio KiCad PCBs) */}
              <div className="page-paper-right p-6 sm:p-8 flex flex-col justify-between overflow-y-auto book-page-scroll relative">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20 text-xs font-mono">
                    <span className="text-rose-400 font-bold uppercase">INGENIERÍA FÍSICA // HARDWARE</span>
                    <span className="text-zinc-500">PÁG. 04</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30">
                      ⚡ HARDWARE INDUSTRIAL
                    </span>
                    <span className="text-xs font-mono text-cyan-400">KiCad & CAD</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    Laboratorio de Diseño PCB KiCad & Modelado 3D
                  </h3>

                  {/* Carousel with 3 real PCB images */}
                  <div className="my-3">
                    <BlueprintCarousel
                      images={getProjectImages('pcb-kicad-lab')}
                      title="KiCad PCBs"
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-3">
                    Diseño esquemático y ruteo multicapa de placas de circuito impreso para microcontroladores (ESP32 / Raspberry Pi), cálculo de disipación térmica y envolventes paramétricas con la API de Python en Blender.
                  </p>

                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-center font-mono">
                    <div>
                      <span className="text-xs font-bold text-rose-300 block">±0.15 mm</span>
                      <span className="text-[9px] text-zinc-400 uppercase">Tolerancia FDM</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-300 block">2 Layers</span>
                      <span className="text-[9px] text-zinc-400 uppercase">Topología SMD</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-cyan-300 block">100% Python</span>
                      <span className="text-[9px] text-zinc-400 uppercase">Scripting CAD</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-xs border-t border-slate-800">
                  <button
                    onClick={() => setSelectedProject(PROJECTS_DATA.find((p) => p.id === 'pcb-kicad-lab') || null)}
                    className="text-cyan-400 hover:text-white font-bold flex items-center gap-1.5 cursor-pointer uppercase text-xs"
                  >
                    <span>Ver Memorias KiCad</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-zinc-500 font-mono">PÁG. 04</span>
                </div>
                <div onClick={handleNext} className="page-corner-fold" title="Página siguiente" />
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SPREAD 3: PÁGINAS 5 & 6 (SOFTWARE CONCURRENTE & SEC)      */}
          {/* ======================================================== */}
          {currentSpread === 3 && (
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 relative">
              {/* Left Page (Pág 5: OmniStream) */}
              <div className="page-paper-left p-6 sm:p-8 flex flex-col justify-between overflow-y-auto book-page-scroll relative">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20 text-xs font-mono">
                    <span className="text-indigo-400 font-bold uppercase">SOFTWARE DESKTOP // STREAMING</span>
                    <span className="text-zinc-500">PÁG. 05</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                      🚀 NUEVA ARQUITECTURA
                    </span>
                    <span className="text-xs font-mono text-cyan-400">OmniStream</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    OmniStream — Agregador Unificado & Deep Linking
                  </h3>

                  {/* Carousel with 6 real images */}
                  <div className="my-3">
                    <BlueprintCarousel
                      images={getProjectImages('omnistream-hub')}
                      title="OmniStream"
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-3">
                    Aplicación de escritorio híbrida en Python + pywebview con catálogo legal unificado de 9 plataformas en España (Netflix, Prime, Disney+, Max) y resolución nativa de protocolos URI en Windows.
                  </p>

                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-center font-mono">
                    <div>
                      <span className="text-xs font-bold text-indigo-300 block">9 Apps</span>
                      <span className="text-[9px] text-zinc-400 uppercase">Servicios ES</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-cyan-300 block">&lt; 250 ms</span>
                      <span className="text-[9px] text-zinc-400 uppercase">Deep Link Launch</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-300 block">pywebview</span>
                      <span className="text-[9px] text-zinc-400 uppercase">Puente Asíncrono</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-xs border-t border-slate-800">
                  <button
                    onClick={() => setSelectedProject(PROJECTS_DATA.find((p) => p.id === 'omnistream-hub') || null)}
                    className="text-cyan-400 hover:text-white font-bold flex items-center gap-1.5 cursor-pointer uppercase text-xs"
                  >
                    <span>Ver Detalles OmniStream</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-zinc-500 font-mono">PÁG. 05</span>
                </div>
                <div onClick={handlePrev} className="page-corner-fold-left" title="Página anterior" />
              </div>

              {/* Book Spine Center Divider */}
              <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 book-spine pointer-events-none z-20" />

              {/* Right Page (Pág 6: HFS-Sentry) */}
              <div className="page-paper-right p-6 sm:p-8 flex flex-col justify-between overflow-y-auto book-page-scroll relative">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20 text-xs font-mono">
                    <span className="text-emerald-400 font-bold uppercase">CIBERSEGURIDAD DEFENSIVA // SOC</span>
                    <span className="text-zinc-500">PÁG. 06</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      🛡️ SUITE ZERO-DEPS
                    </span>
                    <span className="text-xs font-mono text-cyan-400">HFS-Sentry</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    HFS-Sentry — Suite Modular de Diagnóstico & Perímetro
                  </h3>

                  {/* Carousel with real GUI captures */}
                  <div className="my-3">
                    <BlueprintCarousel
                      images={getProjectImages('hfs-sentry')}
                      title="HFS-Sentry"
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-3">
                    Ecosistema táctico de 7 herramientas de seguridad en 100% Python estándar (Zero-Dependencies): escaneo TCP no bloqueante, análisis forense de logs, auditoría TLS/SSL y monitor FIM.
                  </p>

                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-center font-mono">
                    <div>
                      <span className="text-xs font-bold text-emerald-300 block">0 Deps</span>
                      <span className="text-[9px] text-zinc-400 uppercase">Python Stdlib</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-cyan-300 block">7 Módulos</span>
                      <span className="text-[9px] text-zinc-400 uppercase">Herramientas SOC</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-300 block">OWASP</span>
                      <span className="text-[9px] text-zinc-400 uppercase">Cabeceras Sec</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-xs border-t border-slate-800">
                  <button
                    onClick={() => setSelectedProject(PROJECTS_DATA.find((p) => p.id === 'hfs-sentry') || null)}
                    className="text-cyan-400 hover:text-white font-bold flex items-center gap-1.5 cursor-pointer uppercase text-xs"
                  >
                    <span>Ver Módulos de Seguridad</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-zinc-500 font-mono">PÁG. 06</span>
                </div>
                <div onClick={handleNext} className="page-corner-fold" title="Página siguiente" />
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SPREAD 4: PÁGINAS 7 & 8 (ML CUANTITATIVO & TRAYECTORIA)   */}
          {/* ======================================================== */}
          {currentSpread === 4 && (
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 relative">
              {/* Left Page (Pág 7: CryptoQuant Trading Bot) */}
              <div className="page-paper-left p-6 sm:p-8 flex flex-col justify-between overflow-y-auto book-page-scroll relative">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20 text-xs font-mono">
                    <span className="text-sky-400 font-bold uppercase">ALGORITMIA & ML // FINANZAS</span>
                    <span className="text-zinc-500">PÁG. 07</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/30">
                      📈 ML SERIES TEMPORALES
                    </span>
                    <span className="text-xs font-mono text-cyan-400">CryptoQuant</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    CryptoQuant — Motor Cuantitativo & IA Predictiva
                  </h3>

                  {/* Carousel with 5 real Crypto captures */}
                  <div className="my-3">
                    <BlueprintCarousel
                      images={getProjectImages('botcripto-trading')}
                      title="CryptoQuant ML Bot"
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-3">
                    Modelado predictivo sobre series temporales con XGBoost (entrenado sobre 111M+ muestras), validación Walk-Forward para mitigar sobreajuste y optimización de riesgo estocástico.
                  </p>

                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-center font-mono">
                    <div>
                      <span className="text-xs font-bold text-sky-300 block">2.41</span>
                      <span className="text-[9px] text-zinc-400 uppercase">Sharpe Ratio</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-300 block">111M+</span>
                      <span className="text-[9px] text-zinc-400 uppercase">Muestras ML</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-300 block">Kelly</span>
                      <span className="text-[9px] text-zinc-400 uppercase">Gestión Riesgo</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-xs border-t border-slate-800">
                  <button
                    onClick={() => setSelectedProject(PROJECTS_DATA.find((p) => p.id === 'botcripto-trading') || null)}
                    className="text-cyan-400 hover:text-white font-bold flex items-center gap-1.5 cursor-pointer uppercase text-xs"
                  >
                    <span>Ver Análisis Cuantitativo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-zinc-500 font-mono">PÁG. 07</span>
                </div>
                <div onClick={handlePrev} className="page-corner-fold-left" title="Página anterior" />
              </div>

              {/* Book Spine Center Divider */}
              <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 book-spine pointer-events-none z-20" />

              {/* Right Page (Pág 8: Trayectoria Profesional & Formación) */}
              <div className="page-paper-right p-6 sm:p-8 flex flex-col justify-between overflow-y-auto book-page-scroll relative">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20 text-xs font-mono">
                    <span className="text-amber-400 font-bold uppercase">HITOS & CRONOLOGÍA</span>
                    <span className="text-zinc-500">PÁG. 08</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                    Trayectoria & Evolución
                  </h2>

                  <div className="space-y-3 my-3">
                    {TIMELINE_DATA.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white">{item.role}</span>
                          <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-slate-950 border border-cyan-500/30">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-medium">{item.institution}</p>
                        <p className="text-[11px] text-zinc-300 mt-1 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-zinc-500 font-mono border-t border-slate-800">
                  <span>UNED • Cisco Networking Academy</span>
                  <span>Siguiente: Contacto ➔</span>
                </div>
                <div onClick={handleNext} className="page-corner-fold" title="Página siguiente" />
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SPREAD 5: PÁGINAS 9 & 10 (CONTACTO & CONTRAPORTADA / CV)  */}
          {/* ======================================================== */}
          {currentSpread === 5 && (
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 relative">
              {/* Left Page (Pág 9: Formulario & Canales de Contacto) */}
              <div className="page-paper-left p-6 sm:p-8 flex flex-col justify-between overflow-y-auto book-page-scroll relative">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20 text-xs font-mono">
                    <span className="text-cyan-400 font-bold uppercase">CANAL DIRECTO // CONTACTO</span>
                    <span className="text-zinc-500">PÁG. 09</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
                    ¿Hablamos de un reto técnico?
                  </h2>
                  <p className="text-xs text-zinc-400 mb-4">
                    Disponible para incorporación y desarrollo de proyectos ciberfísicos, software e infraestructuras.
                  </p>

                  {/* Direct Contact Cards */}
                  <div className="space-y-2 mb-4">
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs">
                      <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white hover:text-cyan-300 font-medium transition-colors">
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs">
                      <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                      <a href={`tel:${PERSONAL_INFO.phone}`} className="text-white hover:text-cyan-300 font-medium transition-colors">
                        {PERSONAL_INFO.phone}
                      </a>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs">
                      <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="text-white font-medium">{PERSONAL_INFO.location}</span>
                    </div>
                  </div>

                  {/* Message Form */}
                  <form onSubmit={handleContactSubmit} className="space-y-2.5 text-xs">
                    {formSent && (
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                        <Check className="w-4 h-4 shrink-0" />
                        <span>Mensaje enviado correctamente. Responderé a la brevedad.</span>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nombre / Empresa"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-cyan-400"
                      />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email de contacto"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <textarea
                      required
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Propuesta, puesto o consulta..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-cyan-400 resize-none"
                    />

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Enviar Mensaje</span>
                    </button>
                  </form>
                </div>

                <div className="pt-2 text-xs text-zinc-500 font-mono border-t border-slate-800">
                  <span>PÁG. 09 // CONTACTO</span>
                </div>
                <div onClick={handlePrev} className="page-corner-fold-left" title="Página anterior" />
              </div>

              {/* Book Spine Center Divider */}
              <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 book-spine pointer-events-none z-20" />

              {/* Right Page (Pág 10: Contraportada & Descarga de Currículum) */}
              <div className="leather-cover p-6 sm:p-8 flex flex-col justify-between text-center relative overflow-hidden">
                <div className="space-y-4 my-auto">
                  <span className="text-xs uppercase tracking-widest font-mono text-amber-300 font-bold block">
                    CONTRAPORTADA EJECUTIVA
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-black foil-cyan">
                    Hamza El Fathi Sofyani
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
                    Dossier técnico compilado para evaluación de competencias en ingeniería informática, sistemas ciberfísicos, inteligencia artificial y ciberseguridad.
                  </p>

                  {/* Dual CV Download Buttons */}
                  <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 max-w-sm mx-auto space-y-3">
                    <span className="text-xs font-bold text-white block uppercase tracking-wider">
                      Descarga de Currículum (1 Página)
                    </span>

                    <a
                      href="./Curriculum_Hamza_El_Fathi_Sofyani.pdf"
                      download="Curriculum_Hamza_El_Fathi_Sofyani.pdf"
                      className="w-full py-2.5 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:scale-105 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Descargar CV en PDF (1 Pág)</span>
                    </a>

                    <a
                      href="./Curriculum_Hamza_El_Fathi_Sofyani.docx"
                      download="Curriculum_Hamza_El_Fathi_Sofyani.docx"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Descargar CV en Word (.docx)</span>
                    </a>
                  </div>

                  <button
                    onClick={() => goToSpread(0, 'prev')}
                    className="inline-flex items-center gap-2 text-xs text-amber-300 hover:text-white font-mono uppercase tracking-wider cursor-pointer pt-2 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Volver a la Portada Principal</span>
                  </button>
                </div>

                <div className="text-[11px] text-zinc-500 font-mono pt-4 border-t border-slate-800">
                  © 2026 Hamza El Fathi Sofyani • Todos los derechos reservados
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Digital Reader Controls Bar */}
      <footer className="h-14 px-4 sm:px-8 border-t border-cyan-500/20 bg-slate-950/90 backdrop-blur-md flex items-center justify-between z-30 shrink-0">
        <button
          onClick={handlePrev}
          disabled={currentSpread === 0}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            currentSpread === 0
              ? 'opacity-30 cursor-not-allowed text-zinc-600'
              : 'bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Página Anterior</span>
        </button>

        {/* Page Slider / Progress Indicator */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-white bg-slate-900 px-3 py-1 rounded-full border border-cyan-500/30">
            {CHAPTERS[currentSpread].pageLabel}
          </span>
          <div className="hidden sm:flex items-center gap-1">
            {CHAPTERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSpread(idx, idx > currentSpread ? 'next' : 'prev')}
                className={`transition-all rounded-full cursor-pointer ${
                  currentSpread === idx
                    ? 'w-6 h-2 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                    : 'w-2 h-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Ir a ${CHAPTERS[idx].title}`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={currentSpread === totalSpreads - 1}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            currentSpread === totalSpreads - 1
              ? 'opacity-30 cursor-not-allowed text-zinc-600'
              : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold shadow-[0_0_12px_rgba(34,211,238,0.3)]'
          }`}
        >
          <span className="hidden sm:inline">Página Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

      {/* Project Detail Modal Overlay */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};
