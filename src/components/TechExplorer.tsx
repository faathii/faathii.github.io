import React, { useState } from 'react';
import { Cpu, ShieldCheck, Film, TrendingUp, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  badge: string;
  projectId: string;
  highlightStat: string;
  statLabel: string;
  architecture: string[];
  techStack: string[];
  summary: string;
}

const PILLARS: Pillar[] = [
  {
    id: 'edge-iot',
    title: 'Sistemas Ciberfísicos & Edge AI',
    subtitle: 'Control biológico, TinyML e inferencia sub-20ms en Raspberry Pi 5',
    icon: Cpu,
    color: 'from-cyan-400 to-emerald-400',
    badge: 'Hardware Físico & IA',
    projectId: 'iqsense-iot',
    highlightStat: '< 18 ms',
    statLabel: 'Tiempo Inferencia RPi 5',
    architecture: [
      'Inferencia en Edge sin conexión en chip ARM de RPi 5',
      'Predicción continua de Déficit de Presión de Vapor (VPD)',
      'Placa PCB personalizada en KiCad acoplada a GPIO',
      'Servicio daemon desacoplado en Linux con systemd'
    ],
    techStack: ['Raspberry Pi 5', 'Python ML', 'KiCad PCBs', 'Time-Series', 'Systemd'],
    summary: 'Arquitectura integral que une diseño electrónico de hardware, telemetría de sensores y modelos de Machine Learning entrenados para anticipación climática proactiva.'
  },
  {
    id: 'streaming-desktop',
    title: 'Arquitectura Desktop & Streaming',
    subtitle: 'Agregador cinematográfico con pywebview y resolución de protocolos nativos',
    icon: Film,
    color: 'from-sky-400 to-indigo-400',
    badge: 'Desktop App Híbrida',
    projectId: 'omnistream-hub',
    highlightStat: '9 Plataformas',
    statLabel: 'Catálogo Legal Unificado ES',
    architecture: [
      'Puente RPC asíncrono entre JavaScript y Python con pywebview',
      'Deep Linking nativo en Windows para Netflix, Prime, Disney+ y Max',
      'Caché local indexada de alta velocidad sobre API TMDb',
      'Compilación a binario ejecutable y wizard de instalación'
    ],
    techStack: ['Python 3', 'pywebview', 'JavaScript ES6', 'TMDb API', 'PyInstaller'],
    summary: 'Plataforma de escritorio que resuelve la fragmentación de streaming unificando catálogos bajo demanda con lanzamiento directo a reproductores oficiales.'
  },
  {
    id: 'cybersecurity-soc',
    title: 'Ciberseguridad Defensiva & SOC',
    subtitle: 'Suite modular de auditoría, análisis forense de logs y defensa perimetral',
    icon: ShieldCheck,
    color: 'from-emerald-400 to-teal-400',
    badge: 'Pure Python • Zero-Deps',
    projectId: 'hfs-sentry',
    highlightStat: '0 Deps',
    statLabel: 'Portabilidad Absoluta',
    architecture: [
      '7 módulos tácticos orientados a objetos con registro dinámico',
      'Escaneo TCP concurrente no bloqueante con ThreadPoolExecutor',
      'Ingesta forense de logs y generación automática de scripts de bloqueo',
      'Auditoría preventiva de certificados X.509 y cifrados SSL/TLS'
    ],
    techStack: ['Python Stdlib', 'Cisco CyberOps', 'OWASP Headers', 'Forensic Analysis', 'UFW/iptables'],
    summary: 'Ecosistema de seguridad defensiva diseñado para operar en entornos air-gapped y servidores críticos sin requerir dependencias externas.'
  },
  {
    id: 'quant-finance',
    title: 'Machine Learning & Trading Cuantitativo',
    subtitle: 'Modelos predictivos para series temporales y control de riesgo estocástico',
    icon: TrendingUp,
    color: 'from-amber-400 to-orange-400',
    badge: 'Modelos Financieros ML',
    projectId: 'botcripto-trading',
    highlightStat: '2.41',
    statLabel: 'Sharpe Ratio Optimizado',
    architecture: [
      'Pipeline de feature engineering y reducción de dimensionalidad',
      'Validación Walk-Forward para mitigación estricta de sobreajuste',
      'Dimensionamiento de posición según criterio de Kelly fraccional',
      'Motor de backtesting vectorial y análisis de drawdown'
    ],
    techStack: ['Python', 'XGBoost', 'Pandas / NumPy', 'Walk-Forward', 'Risk Models'],
    summary: 'Plataforma algorítmica de modelado predictivo sobre activos financieros, combinando machine learning supervisado con gestión estocástica de capital.'
  }
];

export const TechExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('edge-iot');
  const currentPillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];

  return (
    <section className="py-12 border-y border-cyan-500/20 bg-slate-950/40 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Ecosistema de Especialización</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              4 Pilares de Ingeniería Aplicada
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
            Haz clic en cada disciplina para inspeccionar su arquitectura técnica, métricas clave y tecnologías utilizadas.
          </p>
        </div>

        {/* 4 Interactive Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isActive = pillar.id === activeTab;

            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id)}
                className={`p-4 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between border ${
                  isActive
                    ? 'bg-slate-900 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)] scale-[1.02]'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2.5 rounded-xl ${
                      isActive
                        ? 'bg-cyan-400 text-slate-950 shadow-sm'
                        : 'bg-slate-900 text-zinc-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-medium ${
                      isActive
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-900 text-zinc-500'
                    }`}
                  >
                    {pillar.badge}
                  </span>
                </div>

                <div>
                  <h3 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                    {pillar.title}
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                    {pillar.highlightStat} • {pillar.statLabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Interactive Deep-Dive Card */}
        <div className="modern-card p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          {/* Subtle back decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Architecture details (8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  {currentPillar.badge}
                </span>
                <span className="text-xs text-zinc-400">
                  {currentPillar.subtitle}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentPillar.title}
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {currentPillar.summary}
              </p>

              {/* Architecture Bullet Points */}
              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block font-mono">
                  Aspectos Clave de Implementación:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentPillar.architecture.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-2.5 text-xs text-zinc-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs text-zinc-400 font-medium mr-1">Stack:</span>
                {currentPillar.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-900 text-cyan-300 border border-cyan-500/25"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Key Metric Callout & CTA (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-center space-y-6">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold block">
                  {currentPillar.statLabel}
                </span>
                <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-mono mt-2">
                  {currentPillar.highlightStat}
                </p>
                <span className="inline-block mt-2 text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
                  Rendimiento Verificado
                </span>
              </div>

              <div className="pt-2">
                <a
                  href="#proyectos"
                  className="w-full py-3 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:scale-[1.02]"
                >
                  <span>Explorar en Proyectos</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
