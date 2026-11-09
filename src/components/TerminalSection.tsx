import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA } from '../data/portfolioData';

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

export const TerminalSection: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-xs">
          <p className="text-emerald-400 font-bold">Hamza DevOS v2.4 (CLI Interface)</p>
          <p className="text-zinc-400">Escribe <span className="text-cyan-400 font-mono">help</span> para ver los comandos interactivos disponibles o pulsa los botones rápidos.</p>
        </div>
      )
    }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    let out: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        out = (
          <div className="space-y-1 text-xs text-zinc-300">
            <p className="text-cyan-400 font-semibold mb-1">Comandos disponibles:</p>
            <p><span className="text-emerald-400 font-mono">projects</span> — Ver lista de proyectos y especificaciones</p>
            <p><span className="text-emerald-400 font-mono">hfs-sentry</span> — Ejecutar auditoría y ver catálogo de HFS-Sentry</p>
            <p><span className="text-emerald-400 font-mono">cisco</span> — Ver acreditaciones oficiales y badges verificados de Cisco</p>
            <p><span className="text-emerald-400 font-mono">iqsense</span> — Telemetría en vivo y estado de Super-IA Edge</p>
            <p><span className="text-emerald-400 font-mono">omnistream</span> — Hub de streaming con deep linking para España</p>
            <p><span className="text-emerald-400 font-mono">skills</span> — Ver stack tecnológico y herramientas</p>
            <p><span className="text-emerald-400 font-mono">hardware</span> — Resumen de diseño de PCBs KiCad y CAD 3D</p>
            <p><span className="text-emerald-400 font-mono">contact</span> — Canales de comunicación directa</p>
            <p><span className="text-emerald-400 font-mono">clear</span> — Limpiar pantalla de la terminal</p>
          </div>
        );
        break;

      case 'sentry':
      case 'hfs-sentry':
        out = (
          <div className="space-y-2 text-xs text-zinc-300">
            <div className="p-2.5 rounded bg-zinc-900 border border-cyan-500/30">
              <p className="text-cyan-400 font-bold font-mono">HFS-Sentry v1.2 — Suite Modular de Ciberseguridad</p>
              <p className="text-zinc-400 text-[11px] mt-0.5">Autor: Hamza El Fathi Sofyani | Cisco Certified | Pure Python 3</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] font-mono">
              <p>• <span className="text-emerald-400 font-bold">netsentry:</span> Escáner TCP concurrente & OWASP</p>
              <p>• <span className="text-emerald-400 font-bold">logsentinel:</span> Ingesta forense & bloqueo UFW</p>
              <p>• <span className="text-emerald-400 font-bold">certsentry:</span> Caducidad X.509 & TLS obsoleto</p>
              <p>• <span className="text-emerald-400 font-bold">subnetsweep:</span> Mapeo /24 & OUI IEEE MAC</p>
              <p>• <span className="text-emerald-400 font-bold">integrityguard:</span> Monitor FIM con SHA-256</p>
              <p>• <span className="text-emerald-400 font-bold">dnsprobe:</span> Telemetría de resolución DNS</p>
              <p>• <span className="text-emerald-400 font-bold">trafficsentry:</span> Sniffer/inspección de paquetes</p>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono">
              GitHub: <a href="https://github.com/faathii/HFS-Sentry" target="_blank" rel="noreferrer" className="text-cyan-400 underline">github.com/faathii/HFS-Sentry</a> (0 External Dependencies)
            </p>
          </div>
        );
        break;

      case 'cisco':
      case 'certificaciones':
      case 'certs':
        out = (
          <div className="space-y-2 text-xs text-zinc-300 font-mono">
            <div className="p-2.5 rounded bg-zinc-900 border border-cyan-500/30">
              <p className="text-cyan-400 font-bold">Cisco Networking Academy — Certificaciones Oficiales Verificadas</p>
              <p className="text-zinc-400 text-[11px] mt-0.5">Acreditación internacional en Ciberseguridad & Operaciones de Seguridad</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded bg-sky-950/40 border border-sky-500/30">
                <p className="text-sky-400 font-bold">✓ Cisco CyberOps Associate</p>
                <p className="text-zinc-400 text-[10px] mt-0.5">SOC, análisis de telemetría de eventos, respuesta a incidentes y análisis forense.</p>
              </div>
              <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-500/30">
                <p className="text-emerald-400 font-bold">✓ Introduction to Cybersecurity</p>
                <p className="text-zinc-400 text-[10px] mt-0.5">Defensa perimetral, criptografía, privacidad de datos y mitigación de amenazas.</p>
              </div>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800 text-[10px] space-y-1">
              <p className="text-cyan-300 font-bold uppercase">5 Módulos de Especialización Cisco Superados:</p>
              <p>• [OK] Defensa Perimetral & Firewalls (SPI, ACLs)</p>
              <p>• [OK] Ataques, Vulnerabilidades & Malware</p>
              <p>• [OK] Criptografía, Hash (SHA-256) & Claves PKI</p>
              <p>• [OK] Seguridad de Red & Infraestructura de Conmutación</p>
              <p>• [OK] Gobernanza, Gestión de Incidentes & Protección Organizacional</p>
            </div>
          </div>
        );
        break;

      case 'iqsense':
        out = (
          <div className="space-y-1.5 text-xs text-zinc-300 font-mono">
            <p className="text-emerald-400 font-bold">iQsense View PC — Telemetría Activa (Super-IA Autopilot Edge)</p>
            <div className="grid grid-cols-2 gap-2 p-2 rounded bg-zinc-900/80 border border-emerald-500/30 text-[11px]">
              <p>• Temp Aire: <span className="text-cyan-400 font-bold">24.2 °C</span></p>
              <p>• Humedad: <span className="text-cyan-400 font-bold">58.5 %</span></p>
              <p>• VPD Estomas: <span className="text-emerald-400 font-bold">1.15 kPa (Óptimo)</span></p>
              <p>• PPFD Luz: <span className="text-amber-400 font-bold">785 µmol</span></p>
              <p>• Estado Super-IA: <span className="text-emerald-400 font-bold">Salud Biológica 98%</span></p>
              <p>• Actuadores Activos: <span className="text-cyan-400 font-bold">5 de 13 (PWM + DWC)</span></p>
            </div>
          </div>
        );
        break;

      case 'omnistream':
        out = (
          <div className="space-y-1.5 text-xs text-zinc-300 font-mono">
            <p className="text-purple-400 font-bold">OmniStream v1.0 — Unified Cinema Hub (Desktop Client)</p>
            <p className="text-zinc-400 text-[11px]">Agregador de streaming en España con Deep Linking a reproductores nativos</p>
            <div className="p-2 rounded bg-zinc-900 border border-purple-500/30 text-[11px] space-y-1">
              <p>• <span className="text-emerald-400">Plataformas:</span> Netflix, Prime Video, Disney+, Max, Apple TV+, Filmin, Movistar+</p>
              <p>• <span className="text-emerald-400">Arquitectura:</span> Python + pywebview Bridge + TMDb API v3</p>
              <p>• <span className="text-emerald-400">Distribución:</span> Instalador autónomo (.exe) con Wizard visual</p>
            </div>
          </div>
        );
        break;

      case 'projects':
        out = (
          <div className="space-y-2 text-xs text-zinc-300">
            <p className="text-cyan-400 font-semibold">Proyectos en ejecución:</p>
            {PROJECTS_DATA.map((p, idx) => (
              <div key={p.id} className="border-l-2 border-emerald-500/50 pl-2">
                <span className="text-emerald-400 font-bold font-mono">[{idx + 1}] {p.title}</span>
                <p className="text-zinc-400 text-[11px]">{p.subtitle}</p>
                <p className="text-zinc-500 text-[10px] font-mono">{p.tags.slice(0, 5).join(' | ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        out = (
          <div className="space-y-1 text-xs text-zinc-300">
            <p className="text-cyan-400 font-semibold mb-1">Stack principal:</p>
            <p>• <span className="text-emerald-400">Software:</span> Python, TypeScript, React, C# (.NET/Godot), Node.js, Express</p>
            <p>• <span className="text-emerald-400">Hardware & IoT:</span> Raspberry Pi 5, Arduino, KiCAD PCBs, I2C/SPI</p>
            <p>• <span className="text-emerald-400">CAD & 3D:</span> Blender Python API, FreeCAD, Impresión 3D FDM, CNC</p>
            <p>• <span className="text-emerald-400">Sistemas:</span> Kali Linux, Bash, Nmap, Wireshark, Docker</p>
          </div>
        );
        break;

      case 'hardware':
        out = (
          <div className="space-y-1.5 text-xs text-zinc-300">
            <p className="text-cyan-400 font-semibold">Resumen de Hardware & Fabricación:</p>
            <p>• <span className="text-emerald-400 font-mono">iQsense 2.0:</span> PCB dedicada para Raspberry Pi 5 con optoacopladores para relés y lectura ADC.</p>
            <p>• <span className="text-emerald-400 font-mono">CAD Paramétrico:</span> Scripts en Python para modelado automático de cajas y soportes mecánicos.</p>
            <p>• <span className="text-emerald-400 font-mono">Prototipado:</span> Impresiones FDM en PLA/PETG y mecanizado CNC de precisión.</p>
          </div>
        );
        break;

      case 'contact':
        out = (
          <div className="space-y-1 text-xs text-zinc-300">
            <p className="text-cyan-400 font-semibold">Información de contacto:</p>
            <p>• Email: <span className="text-emerald-400 font-mono">{PERSONAL_INFO.email}</span></p>
            <p>• GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{PERSONAL_INFO.github}</a></p>
            <p>• Ubicación: {PERSONAL_INFO.location}</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        out = (
          <p className="text-xs text-red-400">
            Comando no reconocido: "{cmdText}". Escribe <span className="text-cyan-400 font-mono">help</span> para ver la lista de comandos.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmdText, output: out }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <section className="py-12 md:py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden font-mono">
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-zinc-400 ml-2 font-medium flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                hamza@lab-terminal:~
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-500">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Interactive CLI</span>
            </div>
          </div>

          {/* Quick Command Pills */}
          <div className="flex flex-wrap items-center gap-1.5 px-4 py-2 bg-zinc-900/60 border-b border-zinc-800/80 text-[11px]">
            <span className="text-zinc-500 mr-1">Comandos rápidos:</span>
            {['help', 'projects', 'skills', 'hardware', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-emerald-400 transition-colors cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Screen */}
          <div className="p-4 sm:p-6 max-h-72 overflow-y-auto space-y-4">
            {history.map((h, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-emerald-400">visitor@hamza-portfolio:~$</span>
                  <span className="text-zinc-200">{h.command}</span>
                </div>
                <div className="pl-4">{h.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick Command Pills for Touch/Tablet */}
          <div className="flex flex-wrap items-center gap-1.5 px-4 py-2 bg-zinc-900/50 border-t border-zinc-800/80 text-[11px] font-mono">
            <span className="text-[10px] text-zinc-500 uppercase font-bold mr-1">ACCIONES RÁPIDAS:</span>
            {[
              { label: 'hfs-sentry', cmd: 'hfs-sentry' },
              { label: 'iqsense', cmd: 'iqsense' },
              { label: 'omnistream', cmd: 'omnistream' },
              { label: 'projects', cmd: 'projects' },
              { label: 'skills', cmd: 'skills' },
              { label: 'hardware', cmd: 'hardware' },
              { label: 'clear', cmd: 'clear' }
            ].map((pill) => (
              <button
                key={pill.cmd}
                onClick={() => handleCommand(pill.cmd)}
                className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-cyan-950 text-cyan-300 border border-zinc-700 hover:border-cyan-400 transition-colors cursor-pointer"
              >
                ${pill.label}
              </button>
            ))}
          </div>

          {/* Input Prompt */}
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/90 border-t border-zinc-800">
            <span className="text-emerald-400 text-xs shrink-0">visitor@hamza-portfolio:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe 'help' o pulsa un botón rápido..."
              className="w-full bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none"
            />
            <button
              onClick={() => handleCommand(input)}
              className="p-1 rounded text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

