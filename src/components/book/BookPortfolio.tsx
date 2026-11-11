import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, BookOpen, Volume2, VolumeX, 
  FileText, ArrowRight, ArrowLeft, ShieldCheck, Award, GraduationCap, 
  Download, Send, Check, Mail, Phone, MapPin, 
  ExternalLink, RefreshCw, Terminal
} from 'lucide-react';
import { playPageTurnSound } from './BookSound';
import { PERSONAL_INFO, PROJECTS_DATA, SKILL_CATEGORIES, TIMELINE_DATA } from '../../data/portfolioData';
import { ProjectModal } from '../ProjectModal';
import { BlueprintCarousel } from '../blueprint/BlueprintCarousel';
import { sendContactMessage } from '../../utils/contactService';
import { trackEvent } from '../../utils/analytics';
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
  { spread: 0, title: 'Frontispicio & Portada', pageLabel: 'PORTADA' },
  { spread: 1, title: 'Perfil & Acreditaciones', pageLabel: 'PÁGS. 01 - 02' },
  { spread: 2, title: 'Hardware & IoT', pageLabel: 'PÁGS. 03 - 04' },
  { spread: 3, title: 'Software & Ciberseguridad', pageLabel: 'PÁGS. 05 - 06' },
  { spread: 4, title: 'ML & Trayectoria', pageLabel: 'PÁGS. 07 - 08' },
  { spread: 5, title: 'Contacto & CV Oficial', pageLabel: 'PÁGS. 09 - 10' },
];

interface BookPortfolioProps {
  onBackToDeck?: () => void;
}

export const BookPortfolio: React.FC<BookPortfolioProps> = ({ onBackToDeck }) => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [mobileSide, setMobileSide] = useState<'left' | 'right'>('left');
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  const [targetSpread, setTargetSpread] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Contact form state
  const [formSent, setFormSent] = useState<'formsubmit' | 'mailto' | null>(null);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const totalSpreads = CHAPTERS.length;

  const goToSpread = useCallback((newSpread: number, direction: 'next' | 'prev' = 'next') => {
    if (newSpread < 0 || newSpread >= totalSpreads || isFlipping || newSpread === currentSpread) return;
    
    if (soundEnabled) {
      playPageTurnSound();
    }

    setTargetSpread(newSpread);
    setFlipDirection(direction);
    setIsFlipping(true);
    setMobileSide('left');

    // Fallback timer (720ms) matching 680ms CSS animation
    setTimeout(() => {
      setCurrentSpread(newSpread);
      setIsFlipping(false);
      setFlipDirection(null);
    }, 720);
  }, [totalSpreads, isFlipping, soundEnabled, currentSpread]);

  const handleAnimationEnd = useCallback(() => {
    setCurrentSpread(targetSpread);
    setIsFlipping(false);
    setFlipDirection(null);
  }, [targetSpread]);

  const handleNext = useCallback(() => {
    if (currentSpread < totalSpreads - 1 && !isFlipping) {
      goToSpread(currentSpread + 1, 'next');
    }
  }, [currentSpread, totalSpreads, isFlipping, goToSpread]);

  const handlePrev = useCallback(() => {
    if (currentSpread > 0 && !isFlipping) {
      goToSpread(currentSpread - 1, 'prev');
    }
  }, [currentSpread, isFlipping, goToSpread]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) return;
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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSendingForm) return;
    setIsSendingForm(true);
    try {
      const result = await sendContactMessage(formData);
      trackEvent(`contact/submit-book-${result.method}`, 'Contacto Libro 3D');
      setFormSent(result.method);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setFormSent(null);
      }, 6000);
    } finally {
      setIsSendingForm(false);
    }
  };

  const getProjectImages = (pId: string): string[] => {
    const p = PROJECTS_DATA.find((item) => item.id === pId);
    if (!p) return [];
    const keys = p.images && p.images.length > 0 ? p.images : p.imageUrl ? [p.imageUrl] : [];
    return keys.map((k) => projectImages[k]).filter(Boolean);
  };

  // Dynamic edge stack thickness calculation (reflects reading progress)
  const leftEdgeThickness = Math.max(3, currentSpread * 3);
  const rightEdgeThickness = Math.max(3, (totalSpreads - 1 - currentSpread) * 3);

  // =========================================================================
  // SPREAD 0: FRONTISPIECE & OFFICIAL TITLE PAGE (Both pages open on desk)
  // =========================================================================

  // Page 0A (Left): Frontispicio Editorial & Ex-Libris
  const renderSpread0Left = () => (
    <div className="w-full h-full real-parchment-frontispiece p-6 sm:p-9 flex flex-col justify-between overflow-y-auto real-paper-scroll relative select-none">
      {/* Decorative filigree border */}
      <div className="absolute inset-3 border border-amber-500/20 rounded-xl pointer-events-none" />
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-amber-400/50 pointer-events-none" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-amber-400/50 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-amber-400/50 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-amber-400/50 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between pb-2 mb-4 border-b border-amber-500/20 text-[10px] font-mono tracking-widest text-amber-300/80 uppercase">
          <span>FRONTISPICIO DE AUTOR</span>
          <span>EX LIBRIS</span>
        </div>

        {/* Heraldic / Engineering Seal */}
        <div className="text-center py-4 space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-950/60 border-2 border-amber-400/60 flex items-center justify-center shadow-lg shadow-black/80">
            <span className="text-2xl font-black text-amber-300 font-serif tracking-widest">HFS</span>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-200/90 block">
              EXPEDIENTE DE INGENIERÍA 2026
            </span>
            <h3 className="text-lg font-bold text-slate-100 editorial-serif">
              Hamza El Fathi Sofyani
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Grado en Ingeniería Informática (UNED) • Acreditado por Cisco Networking Academy
            </p>
          </div>
        </div>

        {/* Colophon & Philosophical Manifesto */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-400/20 text-xs space-y-2 text-slate-300 my-2">
          <div className="flex items-center gap-2 text-amber-300 font-mono text-[11px] font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>PRINCIPIOS DE INGENIERÍA</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-300 italic">
            &ldquo;El verdadero dominio técnico no reside en la acumulación de librerías ajenas, sino en la capacidad de construir sistemas ciberfísicos desde el silicio hasta la inferencia en red.&rdquo;
          </p>
        </div>

        {/* Direct quick CV links */}
        <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block text-center">
            DOCUMENTACIÓN DESCARGABLE (1 PÁGINA CON FOTO)
          </span>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="./Curriculum_Hamza_El_Fathi_Sofyani.pdf"
              download="Curriculum_Hamza_El_Fathi_Sofyani.pdf"
              onClick={() => trackEvent('cv/download-pdf', 'Descarga CV PDF')}
              className="py-1.5 px-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-center"
            >
              <Download className="w-3 h-3 shrink-0" />
              <span>CV en PDF</span>
            </a>
            <a
              href="./Curriculum_Hamza_El_Fathi_Sofyani.docx"
              download="Curriculum_Hamza_El_Fathi_Sofyani.docx"
              onClick={() => trackEvent('cv/download-docx', 'Descarga CV DOCX')}
              className="py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/30 font-semibold text-[10px] flex items-center justify-center gap-1.5 transition-all text-center"
            >
              <FileText className="w-3 h-3 shrink-0" />
              <span>CV en Word</span>
            </a>
          </div>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono border-t border-slate-800">
        <span>Ávila / Madrid • España</span>
        <span>TOMO I • EJEMPLAR N° 01</span>
      </div>
    </div>
  );

  // Page 0B (Right): Portada Oficial de la Monografía
  const renderSpread0Right = () => (
    <div className="w-full h-full real-paper-page-right p-6 sm:p-9 flex flex-col justify-between overflow-y-auto real-paper-scroll relative select-none">
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-300/80 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          <span>MONOGRAFÍA TÉCNICA OFICIAL</span>
          <span>AÑO 2026</span>
        </div>

        {/* Centerpiece: Hamza's Portrait in Archival Metal Frame */}
        <div className="flex flex-col items-center text-center my-1">
          <div className="relative mb-3">
            <div className="w-32 h-40 sm:w-36 sm:h-44 rounded-xl overflow-hidden border-2 border-amber-600/70 shadow-xl bg-slate-900 relative z-10">
              <img src={hamzaImg} alt={PERSONAL_INFO.name} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-x-0 bottom-0 py-1 bg-slate-950/95 text-[10px] font-mono text-amber-300 border-t border-amber-500/30">
                Hamza El Fathi Sofyani
              </div>
            </div>
            <div className="absolute -inset-1 rounded-2xl bg-amber-400/15 blur-sm" />
          </div>

          <span className="text-[10px] uppercase tracking-widest font-mono text-sky-800 font-bold block mb-1">
            PORTFOLIO PROFESIONAL DE INGENIERÍA
          </span>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 editorial-serif leading-tight">
            {PERSONAL_INFO.name}
          </h1>

          <p className="text-xs sm:text-sm font-semibold text-sky-950 mt-1 max-w-sm">
            Sistemas Ciberfísicos, Edge AI & Ciberseguridad Defensiva
          </p>

          <p className="text-[11px] sm:text-xs text-slate-600 mt-2 max-w-md leading-relaxed text-justify sm:text-center">
            Estudiante de Grado en Ingeniería Informática (UNED) y Certificado oficial por Cisco Networking Academy. Prototipado físico de hardware (PCBs KiCad), inferencia en Edge (Raspberry Pi 5) y arquitecturas en Python, C# y TypeScript.
          </p>

          {/* Quick Badges Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-300 text-[10px] font-mono text-slate-800 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span className="font-bold">Cisco CyberOps</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-300 text-[10px] font-mono text-slate-800 shadow-sm">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-bold">Intro Cybersecurity</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-300 text-[10px] font-mono text-slate-800 shadow-sm">
              <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-bold">UNED Informática</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between border-t border-slate-200">
        <button
          onClick={handleNext}
          className="px-5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <span>Iniciar Lectura ➔ Folio 01</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
        </button>

        <span className="text-[10px] text-slate-400 font-mono">ÍNDICE GENERAL</span>
      </div>

      <div onClick={handleNext} className="real-corner-curl" title="Pasar al Folio 01" />
    </div>
  );

  // =========================================================================
  // SPREAD 1: PERFIL & CISCO BADGES / MATRIZ TÉCNICA
  // =========================================================================

  // Page 1: Perfil de Ingeniería & Certificaciones Oficiales Cisco
  const renderPage1 = () => (
    <div className="w-full h-full real-paper-page-left p-6 sm:p-9 flex flex-col justify-between overflow-y-auto real-paper-scroll relative">
      <div>
        {/* Running Editorial Header */}
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-300/80 text-[11px] font-mono tracking-wider text-slate-500 uppercase">
          <span>CAPÍTULO I • MEMORIA PROFESIONAL & ACREDITACIONES</span>
          <span>FOLIO 01</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-1.5 editorial-serif">
          Perfil & Acreditaciones Cisco
        </h2>

        <p className="text-xs text-slate-700 leading-relaxed mb-3 text-justify font-sans">
          {PERSONAL_INFO.bio}
        </p>

        {/* Cisco Verified Box styled as authentic accreditation certificate */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-300 shadow-sm space-y-3 mb-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-900 font-mono uppercase tracking-wide flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>Acreditaciones Oficiales Cisco Networking Academy</span>
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
              VERIFICADO
            </span>
          </div>

          {/* Primary Badges (CyberOps Associate & Intro to Cybersecurity) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2.5">
              <img src={ciscoCyberOpsImg} alt="CyberOps Associate" className="w-11 h-11 object-contain shrink-0 drop-shadow-sm" />
              <div>
                <p className="text-[11px] font-bold text-slate-900 leading-tight">CyberOps Associate</p>
                <p className="text-[9px] text-slate-600 mt-0.5">Operaciones SOC, monitorización de alertas y respuesta a incidentes</p>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2.5">
              <img src={ciscoIntroImg} alt="Intro to Cybersecurity" className="w-11 h-11 object-contain shrink-0 drop-shadow-sm" />
              <div>
                <p className="text-[11px] font-bold text-slate-900 leading-tight">Intro to Cybersecurity</p>
                <p className="text-[9px] text-slate-600 mt-0.5">Defensa perimetral, criptografía simétrica y protección de activos</p>
              </div>
            </div>
          </div>

          {/* 5 Modular Official Badges Grid */}
          <div className="pt-2 border-t border-slate-200">
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider block mb-2 font-bold">
              5 Módulos de Especialización Superados:
            </span>

            <div className="grid grid-cols-5 gap-1.5 text-center">
              <div className="p-1 rounded bg-slate-50 border border-slate-200 flex flex-col items-center">
                <img src={ciscoEnterpriseImg} alt="Enterprise Protection" className="w-7 h-7 object-contain mb-1" />
                <span className="text-[8px] font-mono text-slate-800 leading-tight font-semibold">Protección Empresa</span>
              </div>
              <div className="p-1 rounded bg-slate-50 border border-slate-200 flex flex-col items-center">
                <img src={ciscoThreatsImg} alt="Threats & Vulns" className="w-7 h-7 object-contain mb-1" />
                <span className="text-[8px] font-mono text-slate-800 leading-tight font-semibold">Amenazas & SOC</span>
              </div>
              <div className="p-1 rounded bg-slate-50 border border-slate-200 flex flex-col items-center">
                <img src={ciscoCryptoImg} alt="Cryptography" className="w-7 h-7 object-contain mb-1" />
                <span className="text-[8px] font-mono text-slate-800 leading-tight font-semibold">Criptografía</span>
              </div>
              <div className="p-1 rounded bg-slate-50 border border-slate-200 flex flex-col items-center">
                <img src={ciscoFirewallImg} alt="Firewalls" className="w-7 h-7 object-contain mb-1" />
                <span className="text-[8px] font-mono text-slate-800 leading-tight font-semibold">Firewalls</span>
              </div>
              <div className="p-1 rounded bg-slate-50 border border-slate-200 flex flex-col items-center">
                <img src={ciscoNetSecImg} alt="Network Security" className="w-7 h-7 object-contain mb-1" />
                <span className="text-[8px] font-mono text-slate-800 leading-tight font-semibold">Seguridad Red</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-mono border-t border-slate-200">
        <span>Hamza El Fathi Sofyani</span>
        <span>— 01 —</span>
      </div>
      <div onClick={handlePrev} className="real-corner-curl-left" title="Página anterior" />
    </div>
  );

  // Page 2: Stack Técnico (Right Archival Paper)
  const renderPage2 = () => (
    <div className="w-full h-full real-paper-page-right p-6 sm:p-9 flex flex-col justify-between overflow-y-auto real-paper-scroll relative">
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-300/80 text-[11px] font-mono tracking-wider text-slate-500 uppercase">
          <span>CAPÍTULO I • MATRIZ TÉCNICA</span>
          <span>FOLIO 02</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-1.5 editorial-serif">
          Competencias & Tecnologías
        </h2>

        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          Clasificación de dominios de ingeniería aplicada evaluados en proyectos físicos y software en producción.
        </p>

        <div className="space-y-2.5 my-2">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">{cat.title}</span>
                <span className="text-[9px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  SECCIÓN 0{idx + 1}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 pt-0.5">
                {cat.skills.slice(0, 4).map((s, sIdx) => (
                  <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono border border-slate-200">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-mono border-t border-slate-200">
        <span>Siguiente: Hardware & IoT</span>
        <span>— 02 —</span>
      </div>
      <div onClick={handleNext} className="real-corner-curl" title="Página siguiente" />
    </div>
  );

  // =========================================================================
  // SPREAD 2: HARDWARE & EDGE AI (iQsense 2.0 & KiCad PCBs)
  // =========================================================================

  // Page 3: iQsense 2.0 (Left Archival Paper)
  const renderPage3 = () => (
    <div className="w-full h-full real-paper-page-left p-6 sm:p-9 flex flex-col justify-between overflow-y-auto real-paper-scroll relative">
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-300/80 text-[11px] font-mono tracking-wider text-slate-500 uppercase">
          <span>CAPÍTULO II • HARDWARE & EDGE AI</span>
          <span>FOLIO 03</span>
        </div>

        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
            ★ PROYECTO INSIGNIA
          </span>
          <span className="text-xs font-mono font-semibold text-slate-600">iQsense 2.0</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2 editorial-serif">
          Sistema Ciberfísico & Edge AI para Control Climático
        </h3>

        {/* Carousel plate */}
        <div className="my-2 p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
          <BlueprintCarousel
            images={getProjectImages('iqsense-iot')}
            title="iQsense 2.0"
            aspectRatio="aspect-[16/10]"
          />
          <p className="text-[10px] text-slate-500 font-mono text-center pt-1.5">
            Lámina I: Prototipo funcional, corte CAD y telemetría de inferencia
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3 font-sans">
          Plataforma que entrena modelos predictivos de VPD e inercia térmica, ejecutando inferencia autónoma sub-18ms en Raspberry Pi 5 con placa PCB dedicada y aislamiento galvánico.
        </p>

        <div className="grid grid-cols-3 gap-2 p-2 rounded-xl bg-slate-100/80 border border-slate-200 text-center font-mono">
          <div>
            <span className="text-xs font-bold text-sky-800 block">&lt; 18 ms</span>
            <span className="text-[9px] text-slate-500 uppercase">Inferencia RPi5</span>
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-800 block">R² = 0.94</span>
            <span className="text-[9px] text-slate-500 uppercase">Precisión VPD</span>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 block">&gt; 1.2M</span>
            <span className="text-[9px] text-slate-500 uppercase">Dataset ML</span>
          </div>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-200">
        <button
          onClick={() => setSelectedProject(PROJECTS_DATA.find((p) => p.id === 'iqsense-iot') || null)}
          className="text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1.5 cursor-pointer uppercase text-xs"
        >
          <span>Examinar Ficha Técnica</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
        <span className="text-slate-400 font-mono">— 03 —</span>
      </div>
      <div onClick={handlePrev} className="real-corner-curl-left" title="Página anterior" />
    </div>
  );

  // Page 4: KiCad PCBs (Right Archival Paper)
  const renderPage4 = () => (
    <div className="w-full h-full real-paper-page-right p-6 sm:p-9 flex flex-col justify-between overflow-y-auto real-paper-scroll relative">
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-300/80 text-[11px] font-mono tracking-wider text-slate-500 uppercase">
          <span>CAPÍTULO II • MICROELECTRÓNICA FÍSICA</span>
          <span>FOLIO 04</span>
        </div>

        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-300">
            PCB HARDWARE
          </span>
          <span className="text-xs font-mono font-semibold text-slate-600">KiCad & CAD</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2 editorial-serif">
          Laboratorio de Diseño PCB & Modelado Paramétrico
        </h3>

        {/* Carousel plate */}
        <div className="my-2 p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
          <BlueprintCarousel
            images={getProjectImages('pcb-kicad-lab')}
            title="KiCad PCBs"
            aspectRatio="aspect-[16/10]"
          />
          <p className="text-[10px] text-slate-500 font-mono text-center pt-1.5">
            Lámina II: Ruteo multicapa SMD y modelado de carcasas con Python
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3 font-sans">
          Diseño esquemático y ruteo de 2 capas para microcontroladores (ESP32/RPi), cálculo de disipación térmica y automatización paramétrica de envolventes mecánicas en Blender.
        </p>

        <div className="grid grid-cols-3 gap-2 p-2 rounded-xl bg-slate-100/80 border border-slate-200 text-center font-mono">
          <div>
            <span className="text-xs font-bold text-rose-800 block">±0.15 mm</span>
            <span className="text-[9px] text-slate-500 uppercase">Tolerancia FDM</span>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 block">2 Layers</span>
            <span className="text-[9px] text-slate-500 uppercase">Topología SMD</span>
          </div>
          <div>
            <span className="text-xs font-bold text-sky-800 block">100% Python</span>
            <span className="text-[9px] text-slate-500 uppercase">Scripting CAD</span>
          </div>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-200">
        <button
          onClick={() => setSelectedProject(PROJECTS_DATA.find((p) => p.id === 'pcb-kicad-lab') || null)}
          className="text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1.5 cursor-pointer uppercase text-xs"
        >
          <span>Examinar Memorias KiCad</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
        <span className="text-slate-400 font-mono">— 04 —</span>
      </div>
      <div onClick={handleNext} className="real-corner-curl" title="Página siguiente" />
    </div>
  );

  // =========================================================================
  // SPREAD 3: SOFTWARE & DEFENSIVE CYBERSECURITY (OmniStream & HFS-Sentry)
  // =========================================================================

  // Page 5: OmniStream (Left Archival Paper)
  const renderPage5 = () => (
    <div className="w-full h-full real-paper-page-left p-6 sm:p-9 flex flex-col justify-between overflow-y-auto real-paper-scroll relative">
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-300/80 text-[11px] font-mono tracking-wider text-slate-500 uppercase">
          <span>CAPÍTULO III • ARQUITECTURA DE SOFTWARE</span>
          <span>FOLIO 05</span>
        </div>

        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 border border-indigo-300">
            DESKTOP APP
          </span>
          <span className="text-xs font-mono font-semibold text-slate-600">OmniStream</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2 editorial-serif">
          OmniStream — Agregador de Streaming & Deep Linking
        </h3>

        <div className="my-2 p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
          <BlueprintCarousel
            images={getProjectImages('omnistream-hub')}
            title="OmniStream"
            aspectRatio="aspect-[16/10]"
          />
          <p className="text-[10px] text-slate-500 font-mono text-center pt-1.5">
            Lámina III: Catálogo integrado, filtros y reproductor nativo
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3 font-sans">
          Aplicación de escritorio híbrida en Python + pywebview con catálogo legal unificado de 9 plataformas en España (Netflix, Prime, Disney+, Max) y resolución nativa de protocolos URI en Windows.
        </p>

        <div className="grid grid-cols-3 gap-2 p-2 rounded-xl bg-slate-100/80 border border-slate-200 text-center font-mono">
          <div>
            <span className="text-xs font-bold text-indigo-800 block">9 Servicios</span>
            <span className="text-[9px] text-slate-500 uppercase">Plataformas ES</span>
          </div>
          <div>
            <span className="text-xs font-bold text-sky-800 block">&lt; 250 ms</span>
            <span className="text-[9px] text-slate-500 uppercase">Deep Link Launch</span>
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-800 block">pywebview</span>
            <span className="text-[9px] text-slate-500 uppercase">RPC Asíncrono</span>
          </div>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-200">
        <button
          onClick={() => setSelectedProject(PROJECTS_DATA.find((p) => p.id === 'omnistream-hub') || null)}
          className="text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1.5 cursor-pointer uppercase text-xs"
        >
          <span>Examinar OmniStream</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
        <span className="text-slate-400 font-mono">— 05 —</span>
      </div>
      <div onClick={handlePrev} className="real-corner-curl-left" title="Página anterior" />
    </div>
  );

  // Page 6: HFS-Sentry (Right Archival Paper)
  const renderPage6 = () => (
    <div className="w-full h-full real-paper-page-right p-6 sm:p-9 flex flex-col justify-between overflow-y-auto real-paper-scroll relative">
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-300/80 text-[11px] font-mono tracking-wider text-slate-500 uppercase">
          <span>CAPÍTULO III • CIBERSEGURIDAD DEFENSIVA</span>
          <span>FOLIO 06</span>
        </div>

        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
            ZERO-DEPENDENCIES
          </span>
          <span className="text-xs font-mono font-semibold text-slate-600">HFS-Sentry</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2 editorial-serif">
          HFS-Sentry — Suite Modular de Diagnóstico & Perímetro
        </h3>

        <div className="my-2 p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
          <BlueprintCarousel
            images={getProjectImages('hfs-sentry')}
            title="HFS-Sentry"
            aspectRatio="aspect-[16/10]"
          />
          <p className="text-[10px] text-slate-500 font-mono text-center pt-1.5">
            Lámina IV: Escáner concurrente, monitor FIM y análisis forense
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3 font-sans">
          Ecosistema táctico de 7 herramientas de seguridad en 100% Python estándar: escaneo TCP concurrente, ingesta forense de logs con bloqueo activo y auditoría TLS/SSL.
        </p>

        <div className="grid grid-cols-3 gap-2 p-2 rounded-xl bg-slate-100/80 border border-slate-200 text-center font-mono">
          <div>
            <span className="text-xs font-bold text-emerald-800 block">0 Deps</span>
            <span className="text-[9px] text-slate-500 uppercase">Python Stdlib</span>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 block">7 Módulos</span>
            <span className="text-[9px] text-slate-500 uppercase">Herramientas SOC</span>
          </div>
          <div>
            <span className="text-xs font-bold text-sky-800 block">OWASP</span>
            <span className="text-[9px] text-slate-500 uppercase">Cabeceras Sec</span>
          </div>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-200">
        <button
          onClick={() => setSelectedProject(PROJECTS_DATA.find((p) => p.id === 'hfs-sentry') || null)}
          className="text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1.5 cursor-pointer uppercase text-xs"
        >
          <span>Examinar Suite Sentry</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
        <span className="text-slate-400 font-mono">— 06 —</span>
      </div>
      <div onClick={handleNext} className="real-corner-curl" title="Página siguiente" />
    </div>
  );

  // =========================================================================
  // SPREAD 4: ML & CRONOLOGÍA (CryptoQuant & Trayectoria UNED)
  // =========================================================================

  // Page 7: CryptoQuant (Left Archival Paper)
  const renderPage7 = () => (
    <div className="w-full h-full real-paper-page-left p-6 sm:p-9 flex flex-col justify-between overflow-y-auto real-paper-scroll relative">
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-300/80 text-[11px] font-mono tracking-wider text-slate-500 uppercase">
          <span>CAPÍTULO IV • MODELOS PREDICTIVOS & ML</span>
          <span>FOLIO 07</span>
        </div>

        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-900 border border-sky-300">
            ML FINANCIERO
          </span>
          <span className="text-xs font-mono font-semibold text-slate-600">CryptoQuant</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2 editorial-serif">
          CryptoQuant — Motor Cuantitativo & IA Predictiva
        </h3>

        <div className="my-2 p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
          <BlueprintCarousel
            images={getProjectImages('botcripto-trading')}
            title="CryptoQuant ML Bot"
            aspectRatio="aspect-[16/10]"
          />
          <p className="text-[10px] text-slate-500 font-mono text-center pt-1.5">
            Lámina V: Entrenamiento XGBoost sobre 111M+ muestras y terminal
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3 font-sans">
          Modelado predictivo sobre series temporales con XGBoost, validación Walk-Forward para mitigar sobreajuste y dimensionamiento de posición bajo criterio estocástico de Kelly.
        </p>

        <div className="grid grid-cols-3 gap-2 p-2 rounded-xl bg-slate-100/80 border border-slate-200 text-center font-mono">
          <div>
            <span className="text-xs font-bold text-sky-800 block">2.41</span>
            <span className="text-[9px] text-slate-500 uppercase">Sharpe Ratio</span>
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-800 block">111M+</span>
            <span className="text-[9px] text-slate-500 uppercase">Muestras ML</span>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 block">Kelly</span>
            <span className="text-[9px] text-slate-500 uppercase">Gestión Riesgo</span>
          </div>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-200">
        <button
          onClick={() => setSelectedProject(PROJECTS_DATA.find((p) => p.id === 'botcripto-trading') || null)}
          className="text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1.5 cursor-pointer uppercase text-xs"
        >
          <span>Examinar Backtest ML</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
        <span className="text-slate-400 font-mono">— 07 —</span>
      </div>
      <div onClick={handlePrev} className="real-corner-curl-left" title="Página anterior" />
    </div>
  );

  // Page 8: Trayectoria Profesional (Right Archival Paper)
  const renderPage8 = () => (
    <div className="w-full h-full real-paper-page-right p-6 sm:p-9 flex flex-col justify-between overflow-y-auto real-paper-scroll relative">
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-300/80 text-[11px] font-mono tracking-wider text-slate-500 uppercase">
          <span>CAPÍTULO IV • CRONOLOGÍA FORMATIVA</span>
          <span>FOLIO 08</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2 editorial-serif">
          Trayectoria & Experiencia
        </h2>

        <div className="space-y-2 my-2">
          {TIMELINE_DATA.map((item, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">{item.role}</span>
                <span className="text-[10px] font-mono font-bold text-slate-600 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                  {item.period}
                </span>
              </div>
              <p className="text-[11px] text-sky-900 font-semibold">{item.institution}</p>
              <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-mono border-t border-slate-200">
        <span>UNED • Cisco Networking Academy</span>
        <span>— 08 —</span>
      </div>
      <div onClick={handleNext} className="real-corner-curl" title="Página siguiente" />
    </div>
  );

  // =========================================================================
  // SPREAD 5: CONTACTO & CONTRAPORTADA DE CIERRE CON DESCARGA DE CV
  // =========================================================================

  // Page 9: Contacto Directo (Left Archival Paper)
  const renderPage9 = () => (
    <div className="w-full h-full real-paper-page-left p-6 sm:p-9 flex flex-col justify-between overflow-y-auto real-paper-scroll relative">
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-300/80 text-[11px] font-mono tracking-wider text-slate-500 uppercase">
          <span>CAPÍTULO V • CANAL DIRECTO</span>
          <span>FOLIO 09</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-1 editorial-serif">
          ¿Hablamos de un reto técnico?
        </h2>
        <p className="text-xs text-slate-600 mb-2.5">
          Disponible para incorporación y desarrollo de proyectos ciberfísicos, software e infraestructuras.
        </p>

        <div className="space-y-1.5 mb-2.5">
          <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center gap-2.5 text-xs">
            <Mail className="w-4 h-4 text-sky-700 shrink-0" />
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-900 hover:text-sky-700 font-semibold transition-colors">
              {PERSONAL_INFO.email}
            </a>
          </div>
          <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center gap-2.5 text-xs">
            <Phone className="w-4 h-4 text-sky-700 shrink-0" />
            <a href={`tel:${PERSONAL_INFO.phone}`} className="text-slate-900 hover:text-sky-700 font-semibold transition-colors">
              {PERSONAL_INFO.phone}
            </a>
          </div>
          <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center gap-2.5 text-xs">
            <MapPin className="w-4 h-4 text-sky-700 shrink-0" />
            <span className="text-slate-900 font-semibold">{PERSONAL_INFO.location}</span>
          </div>
        </div>

        <form onSubmit={handleContactSubmit} className="space-y-2 text-xs">
          {formSent && (
            <div className="p-2 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>
                {formSent === 'mailto'
                  ? 'Abriendo tu cliente de correo con el mensaje preparado para Hamza.'
                  : 'Mensaje enviado al correo de Hamza. Respuesta en la mayor brevedad.'}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nombre / Entidad"
              className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-sky-600 shadow-sm"
            />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email de respuesta"
              className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-sky-600 shadow-sm"
            />
          </div>

          <textarea
            required
            rows={2}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Detalles sobre el puesto, proyecto o consulta..."
            className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-sky-600 resize-none shadow-sm"
          />

          <button
            type="submit"
            disabled={isSendingForm}
            className="w-full py-2 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-wait text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSendingForm ? 'Transmitiendo...' : 'Despachar Mensaje'}</span>
          </button>
        </form>
      </div>

      <div className="pt-2 text-xs text-slate-400 font-mono border-t border-slate-200">
        <span>— 09 —</span>
      </div>
      <div onClick={handlePrev} className="real-corner-curl-left" title="Página anterior" />
    </div>
  );

  // Page 10: Contraportada & Descarga de CV Oficial (Right Archival Paper)
  const renderPage10 = () => (
    <div className="w-full h-full real-paper-page-right p-6 sm:p-9 flex flex-col justify-between overflow-y-auto real-paper-scroll relative text-center">
      <div className="my-auto space-y-3">
        <span className="text-[10px] uppercase tracking-widest font-mono text-sky-800 font-bold block">
          EPÍLOGO & DOCUMENTACIÓN OFICIAL
        </span>

        <h2 className="text-2xl font-black text-slate-900 editorial-serif">
          Hamza El Fathi Sofyani
        </h2>

        <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
          Dossier técnico compilado para evaluación de competencias en ingeniería informática, sistemas ciberfísicos, inteligencia artificial y ciberseguridad defensiva.
        </p>

        {/* Dual CV Download Box */}
        <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 max-w-sm mx-auto space-y-2.5 shadow-xl">
          <span className="text-[11px] font-bold text-amber-300 block uppercase tracking-wider font-mono">
            Descarga de Currículum Oficial (1 Página)
          </span>

          <a
            href="./Curriculum_Hamza_El_Fathi_Sofyani.pdf"
            download="Curriculum_Hamza_El_Fathi_Sofyani.pdf"
            onClick={() => trackEvent('cv/download-pdf', 'Descarga CV PDF')}
            className="w-full py-2 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(245,158,11,0.3)] hover:scale-102 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar CV en PDF (1 Pág con Foto)</span>
          </a>

          <a
            href="./Curriculum_Hamza_El_Fathi_Sofyani.docx"
            download="Curriculum_Hamza_El_Fathi_Sofyani.docx"
            onClick={() => trackEvent('cv/download-docx', 'Descarga CV DOCX')}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/30 font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Descargar CV en Word (.docx)</span>
          </a>
        </div>

        <button
          onClick={() => goToSpread(0, 'prev')}
          className="inline-flex items-center gap-1.5 text-xs text-sky-800 hover:text-sky-950 font-mono uppercase tracking-wider cursor-pointer pt-1 transition-colors font-bold"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Volver al Frontispicio & Portada</span>
        </button>
      </div>

      <div className="text-[10px] text-slate-400 font-mono pt-3 border-t border-slate-200">
        © 2026 Hamza El Fathi Sofyani • Todos los derechos reservados • — 10 —
      </div>
      <div onClick={handlePrev} className="real-corner-curl-left" title="Página anterior" />
    </div>
  );

  // Return left and right pages for a given spread
  const getSpreadPages = (spreadIdx: number): { left: React.ReactNode; right: React.ReactNode } => {
    switch (spreadIdx) {
      case 0:
        return { left: renderSpread0Left(), right: renderSpread0Right() };
      case 1:
        return { left: renderPage1(), right: renderPage2() };
      case 2:
        return { left: renderPage3(), right: renderPage4() };
      case 3:
        return { left: renderPage5(), right: renderPage6() };
      case 4:
        return { left: renderPage7(), right: renderPage8() };
      case 5:
        return { left: renderPage9(), right: renderPage10() };
      default:
        return { left: renderSpread0Left(), right: renderSpread0Right() };
    }
  };

  const currentPages = getSpreadPages(currentSpread);
  const targetPages = getSpreadPages(targetSpread);

  return (
    <div className="h-screen w-screen desk-surface flex flex-col justify-between overflow-hidden relative select-none">
      {/* Top Ambient Ribbon Navigation Bar */}
      <header className="h-14 px-4 sm:px-8 border-b border-amber-950/40 bg-[#090705]/85 backdrop-blur-md flex items-center justify-between z-30 shrink-0 text-slate-300">
        {/* Left Monograph Identity */}
        <div className="flex items-center gap-3">
          {onBackToDeck && (
            <button
              onClick={onBackToDeck}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-white border border-amber-400/40 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              title="Volver a la vista del panel principal"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Panel Principal</span>
              <span className="sm:hidden">Salir</span>
            </button>
          )}

          <button 
            onClick={() => goToSpread(0, 'prev')} 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div className="text-left">
              <span className="font-bold text-xs sm:text-sm text-white tracking-wide block">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] font-mono text-amber-300/80 hidden sm:block">
                Monografía Técnica & Expediente de Ingeniería
              </span>
            </div>
          </button>
        </div>

        {/* Center Chapter Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {CHAPTERS.map((ch, idx) => (
            <button
              key={idx}
              onClick={() => goToSpread(idx, idx > currentSpread ? 'next' : 'prev')}
              disabled={isFlipping}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                currentSpread === idx
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              {ch.title}
            </button>
          ))}
        </nav>

        {/* Right Quick Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              soundEnabled
                ? 'border-amber-400/40 text-amber-400 bg-amber-950/30'
                : 'border-slate-800 text-zinc-500 hover:text-zinc-300'
            }`}
            title={soundEnabled ? 'Sonido de pasar hoja activado' : 'Sonido silenciado'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <a
            href="./Curriculum_Hamza_El_Fathi_Sofyani.pdf"
            download="Curriculum_Hamza_El_Fathi_Sofyani.pdf"
            onClick={() => trackEvent('cv/download-pdf', 'Descarga CV PDF')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-[0_0_12px_rgba(245,158,11,0.25)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar CV</span>
          </a>
        </div>
      </header>

      {/* Main Real 3D Book Stage (Fitted viewport on desk) */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-2 sm:p-4 md:p-6 flex items-center justify-center relative z-10 overflow-hidden real-book-stage">
        
        {/* Desk Prop Left: Vintage Brass Drafting Bookmark/Ruler */}
        <div className="hidden xl:flex flex-col items-center justify-between w-6 h-[520px] rounded-sm bg-gradient-to-r from-amber-700 via-amber-400 to-amber-800 shadow-[5px_15px_30px_rgba(0,0,0,0.9)] opacity-75 pointer-events-none select-none absolute left-4 border border-amber-300/40">
          <span className="text-[8px] font-mono text-amber-950 rotate-90 mt-6 tracking-widest font-black uppercase">
            HFS • 300 MM
          </span>
          <div className="w-full flex flex-col items-end gap-1.5 pr-0.5">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i} 
                className={`bg-amber-950/60 ${i % 5 === 0 ? 'w-3 h-0.5' : 'w-1.5 h-[1px]'}`} 
              />
            ))}
          </div>
          <span className="text-[8px] font-mono text-amber-950 mb-4 font-bold">1:1</span>
        </div>

        {/* Floating Prev Button */}
        {currentSpread > 0 && !isFlipping && (
          <button
            onClick={handlePrev}
            aria-label="Página anterior"
            className="absolute left-2 sm:left-4 z-40 w-11 h-11 rounded-full bg-slate-950/90 border border-amber-400/50 hover:border-amber-300 text-amber-300 hover:text-slate-950 hover:bg-amber-400 hover:scale-110 flex items-center justify-center transition-all shadow-[0_0_20px_rgba(0,0,0,0.85)] cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}

        {/* Floating Next Button */}
        {currentSpread < totalSpreads - 1 && !isFlipping && (
          <button
            onClick={handleNext}
            aria-label="Página siguiente"
            className="absolute right-2 sm:right-4 z-40 w-11 h-11 rounded-full bg-slate-950/90 border border-amber-400/50 hover:border-amber-300 text-amber-300 hover:text-slate-950 hover:bg-amber-400 hover:scale-110 flex items-center justify-center transition-all shadow-[0_0_20px_rgba(0,0,0,0.85)] cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}

        {/* Handcrafted Leather Desk Blotter underneath book */}
        <div className="absolute inset-x-2 sm:inset-x-8 inset-y-2 rounded-3xl desk-pad pointer-events-none -z-10">
          <div className="desk-pad-stitching" />
        </div>

        {/* Physical Real Book Container */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="w-full h-full max-w-[1240px] max-h-[790px] relative real-book-container"
        >
          {/* Hardcover Square Outer Trim (Cejilla sobresaliente de tapa dura de piel noble) */}
          <div className="absolute -inset-2.5 rounded-3xl hardcover-casing book-desk-shadow pointer-events-none" />

          {/* Dynamic Physical Edge Stacks (Grosor variable según avance del libro) - Clickeable para pasar página */}
          <div 
            onClick={handlePrev}
            title={currentSpread > 0 ? "Página anterior" : ""}
            className={`absolute top-4 bottom-4 left-[-7px] rounded-l-md shadow-md transition-all duration-500 z-30 ${
              currentSpread > 0 ? 'cursor-pointer hover:brightness-110 active:scale-95' : 'pointer-events-none'
            }`}
            style={{
              width: `${leftEdgeThickness}px`,
              background: 'repeating-linear-gradient(to right, #cfc9ba 0px, #faf7f2 1px, #b8b19e 2px, #ede9df 3px)'
            }}
          />
          <div 
            onClick={handleNext}
            title={currentSpread < totalSpreads - 1 ? "Página siguiente" : ""}
            className={`absolute top-4 bottom-4 right-[-7px] rounded-r-md shadow-md transition-all duration-500 z-30 ${
              currentSpread < totalSpreads - 1 ? 'cursor-pointer hover:brightness-110 active:scale-95' : 'pointer-events-none'
            }`}
            style={{
              width: `${rightEdgeThickness}px`,
              background: 'repeating-linear-gradient(to right, #cfc9ba 0px, #faf7f2 1px, #b8b19e 2px, #ede9df 3px)'
            }}
          />
          <div 
            className="absolute bottom-[-7px] left-4 right-4 h-2.5 rounded-b-md pointer-events-none shadow-md"
            style={{
              background: 'repeating-linear-gradient(to bottom, #cfc9ba 0px, #faf7f2 1px, #b8b19e 2px, #ede9df 3px)'
            }}
          />

          {/* Bookbinding Woven Headbands (Cabezada de encuadernación artesanal) */}
          <div className="hidden md:block book-headband-top" />
          <div className="hidden md:block book-headband-bottom" />

          {/* Central Silk Ribbon Bookmark */}
          <div className="hidden md:block silk-bookmark-ribbon" />

          {/* Inner Book Spread Pages (2-Page Open Spread) */}
          <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-inner bg-slate-950">
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 relative">
              {/* Left Page */}
              <div className={`w-full h-full relative ${mobileSide === 'right' ? 'hidden md:block' : 'block'}`}>
                {isFlipping && flipDirection === 'prev' ? targetPages.left : currentPages.left}
                {isFlipping && flipDirection === 'next' && <div className="page-underneath-shadow" />}
              </div>

              {/* Central Sewn Spine Crease & Shadow */}
              <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-7 sewn-spine-crease pointer-events-none z-20" />

              {/* Right Page */}
              <div className={`w-full h-full relative ${mobileSide === 'left' ? 'hidden md:block' : 'block'}`}>
                {isFlipping && flipDirection === 'next' ? targetPages.right : currentPages.right}
                {isFlipping && flipDirection === 'prev' && <div className="page-underneath-shadow" />}
              </div>
            </div>

            {/* ========================================================= */}
            {/* 3D AUTHENTIC PHYSICAL PAGE TURN LEAF (CURVATURA REAL)     */}
            {/* ========================================================= */}
            {isFlipping && flipDirection === 'next' && (
              <div 
                className="turning-paper-leaf leaf-turn-forward"
                onAnimationEnd={handleAnimationEnd}
              >
                {/* Front Face: The page being lifted off the right stack */}
                <div className="leaf-face-front">
                  {currentPages.right}
                  <div className="paper-curl-lighting-overlay" />
                </div>
                {/* Back Face: The reverse page landing on the left stack */}
                <div className="leaf-face-back">
                  {targetPages.left}
                  <div className="paper-curl-lighting-overlay" />
                </div>
              </div>
            )}

            {isFlipping && flipDirection === 'prev' && (
              <div 
                className="turning-paper-leaf leaf-turn-backward"
                onAnimationEnd={handleAnimationEnd}
              >
                {/* Front Face: The page being lifted off the left stack */}
                <div className="leaf-face-front">
                  {currentPages.left}
                  <div className="paper-curl-lighting-overlay" />
                </div>
                {/* Back Face: The reverse page landing on the right stack */}
                <div className="leaf-face-back">
                  {targetPages.right}
                  <div className="paper-curl-lighting-overlay" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desk Prop Right: Drafting Mechanical Fountain Pen */}
        <div className="hidden xl:flex flex-col items-center w-3 h-[460px] rounded-full bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-950 shadow-[5px_15px_30px_rgba(0,0,0,0.95)] opacity-80 pointer-events-none select-none absolute right-4 border border-zinc-700/50">
          {/* Gold pocket clip */}
          <div className="w-1.5 h-16 bg-gradient-to-r from-amber-300 to-amber-500 rounded-b shadow-sm mt-3" />
          {/* Gold center trim band */}
          <div className="w-full h-2 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-500 my-auto" />
          {/* Nib at bottom */}
          <div className="w-2 h-6 bg-gradient-to-b from-amber-400 to-amber-600 rounded-b-full mb-1" />
        </div>
      </main>

      {/* Bottom Digital Reader Controls Bar */}
      <footer className="h-14 px-4 sm:px-8 border-t border-amber-950/40 bg-[#090705]/90 backdrop-blur-md flex items-center justify-between z-30 shrink-0 text-slate-300">
        <button
          onClick={handlePrev}
          disabled={currentSpread === 0 || isFlipping}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            currentSpread === 0 || isFlipping
              ? 'opacity-30 cursor-not-allowed text-zinc-600'
              : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-400/30'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Página Anterior</span>
        </button>

        {/* Page Slider / Progress Indicator */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-white bg-slate-900 px-3 py-1 rounded-full border border-amber-400/30">
            {CHAPTERS[currentSpread].pageLabel}
          </span>

          <button
            onClick={() => setMobileSide(mobileSide === 'left' ? 'right' : 'left')}
            className="md:hidden px-2.5 py-1 rounded-full bg-slate-900 border border-amber-400/30 text-[10px] text-amber-300 font-mono"
          >
            {mobileSide === 'left' ? 'Ver Pág. Derecha ➔' : '⬅ Ver Pág. Izquierda'}
          </button>

          <div className="hidden sm:flex items-center gap-1">
            {CHAPTERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSpread(idx, idx > currentSpread ? 'next' : 'prev')}
                disabled={isFlipping}
                className={`transition-all rounded-full cursor-pointer ${
                  currentSpread === idx
                    ? 'w-6 h-2 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                    : 'w-2 h-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Ir a ${CHAPTERS[idx].title}`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={currentSpread === totalSpreads - 1 || isFlipping}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            currentSpread === totalSpreads - 1 || isFlipping
              ? 'opacity-30 cursor-not-allowed text-zinc-600'
              : 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.3)]'
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
