import type { Project, SkillCategory, TimelineItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Hamza',
  title: 'Ingeniero de Sistemas Ciberfísicos & Desarrollador Full-Stack',
  tagline: 'Convergencia entre software de alto rendimiento, sistemas embebidos (IoT) y ciberseguridad.',
  bio: 'Ingeniero con enfoque sistémico especializado en el diseño de soluciones ciberfísicas integrales: desde el trazado y ruteo de PCBs y desarrollo de firmware sobre Raspberry Pi 5 / microcontroladores, hasta arquitecturas de software concurrente en C#, Python y Node.js, y auditoría de seguridad defensiva.',
  location: 'Madrid, España',
  availability: 'Disponible para proyectos de alta exigencia técnica',
  email: 'contacto.hamza.dev@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  stats: [
    { label: 'Enfoque Técnico', value: 'Hardware + Software + Sec' },
    { label: 'Proyectos de Ingeniería', value: '5 Clave' },
    { label: 'Ecosistemas Dominados', value: 'C#, Python, Linux, C++' },
  ],
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'iqsense-iot',
    title: 'iQsense 2.0 — Sistema Ciberfísico para Control Ambiental',
    subtitle: 'Automatización integral en Edge Computing sobre Raspberry Pi 5',
    category: 'IoT & Hardware',
    iconName: 'Cpu',
    badge: 'Hardware + Firmware + Cloud',
    description: 'Plataforma embebida end-to-end desplegada sobre Raspberry Pi 5 que orquesta la monitorización continua y la actuación autónoma (riego y nebulización) con telemetría en tiempo real.',
    longDescription: 'iQsense 2.0 es una solución integral de ingeniería que combina telemetría en tiempo real, firmware asíncrono sobre Raspberry Pi 5 y microcontroladores C++, control de actuadores de potencia, diseño de PCB a medida y envolventes paramétricas modeladas con la API de Python en Blender y fabricadas mediante impresión 3D.',
    challenge: 'Asegurar lectura fiable de sensores analógicos/digitales bajo condiciones de humedad extrema, mitigar picos de tensión inductiva generados por electroválvulas y bombas, y mantener un servicio daemon ininterrumpido 24/7 sin latencia de red.',
    solution: 'Arquitectura de servicios daemon desacoplados en Linux/Python con systemd, aislamiento galvánico de potencia mediante optoacopladores en PCB dedicada, y buffer circular en memoria local para garantizar cero pérdida de telemetría durante caídas de red.',
    tags: ['Raspberry Pi 5', 'Python (Asyncio/Daemon)', 'Arduino / C++', 'KiCAD PCB Design', 'I2C / SPI / GPIO', 'Linux Systemd', 'Blender Python API', '3D Printing'],
    features: [
      'Pipeline de adquisición multicanal con calibración dinámica de humedad y VPD',
      'Control de potencia con aislamiento galvánico para electroválvulas y extractores',
      'Placa PCB dedicada diseñada para acople directo al header GPIO de Raspberry Pi 5',
      'Servicios residentes en background con reinicio automático y telemetría local',
      'Carcasa modular paramétrica generada mediante scripts procedurales en Python'
    ],
    metrics: [
      { label: 'Disponibilidad Edge', value: '99.98% Uptime' },
      { label: 'Latencia de Control', value: '< 15 ms' },
      { label: 'Sensores en Bus', value: '6 Canales' }
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://github.com'
  },
  {
    id: 'botcripto-trading',
    title: 'CryptoQuant — Motor de Backtesting y Simulación Algorítmica',
    subtitle: 'Trading cuantitativo, análisis estocástico y gestión de drawdown',
    category: 'Software & Full-Stack',
    iconName: 'TrendingUp',
    badge: 'Fintech & Data Science',
    description: 'Motor de trading algorítmico y simulación estocástica capaz de procesar series temporales masivas (OHLCV) bajo estrictos modelos de control de riesgo y optimización de drawdown.',
    longDescription: 'Motor de simulación y cálculo cuantitativo desarrollado en Node.js y Python. Procesa millones de registros tick-by-tick, simula libros de órdenes con modelos realistas de deslizamiento (slippage) y comisiones, y evalúa estrategias mediante ratios estadísticos avanzados.',
    challenge: 'Minimizar la latencia computacional en el cálculo vectorial de indicadores sobre series temporales de alta frecuencia y eliminar el sesgo de anticipación (look-ahead bias) en el motor de backtesting.',
    solution: 'Estructuración de pipelines asíncronos concurrentes en el event loop, cálculo vectorizado de medias móviles, RSI y bandas de Bollinger con buffers tipados en memoria, y sistema de validación Walk-Forward.',
    tags: ['Node.js Concurrente', 'Python (Pandas / NumPy)', 'WebSockets Stream', 'Algorithmic Trading', 'Time-Series Analysis', 'REST API', 'Docker'],
    features: [
      'Motor de backtesting con modelado de comisiones y slippage de mercado real',
      'Cálculo automatizado de métricas: Sharpe Ratio, Sortino Ratio y Max Drawdown',
      'Conexión mediante WebSockets a feeds en vivo con reconexión exponencial',
      'Servidor local para visualización de curva de capital y configuración de parámetros',
      'Exportación estructurada de telemetría financiera en formato CSV y reportes analíticos'
    ],
    metrics: [
      { label: 'Velocidad Ingesta', value: '> 10k ticks/s' },
      { label: 'Sharpe Ratio Simulado', value: '2.41' },
      { label: 'Cero Look-Ahead', value: '100% Determinista' }
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://github.com'
  },
  {
    id: 'godot-topdown-runner',
    title: 'Vanguard — Simulación 2D y Arquitectura en Godot (C#)',
    subtitle: 'Videojuego top-down de combate rápido con optimización de memoria',
    category: 'Videojuegos',
    iconName: 'Gamepad2',
    badge: 'Game Architecture & C#',
    description: 'Videojuego de acción y supervivencia cenital desarrollado con el motor Godot 4 y C#, enfocado en patrones de optimización de memoria para combate fluido a 60 FPS estables.',
    longDescription: 'Videojuego de acción con mecánicas cinéticas exigentes. Construido bajo una arquitectura fuertemente desacoplada en C# (.NET Core), implementa reciclaje dinámico de memoria para hordas masivas de proyectiles y una máquina de estados finitos jerárquica para la inteligencia artificial.',
    challenge: 'Evitar caídas de fotogramas (micro-stuttering) generadas por la recolección de basura (GC) de .NET al instanciar y destruir cientos de balas y partículas simultáneamente.',
    solution: 'Implementación estricta del patrón Object Pooling para proyectiles y efectos visuales, desacoplamiento entre físicas deterministas (_PhysicsProcess) e interpolación de renderizado, y control FSM para comportamientos enemigos.',
    tags: ['Godot Engine 4.x', 'C# (.NET Core)', 'Object Pooling Pattern', 'Finite State Machine (FSM)', 'Custom 2D Shaders', 'Git / GitHub'],
    features: [
      'Patrón Object Pooling para reciclaje de cientos de entidades sin sobrecargar el Garbage Collector',
      'Inteligencia artificial modular (FSM) con estados de patrulla, detección, flanqueo y ataque',
      'Sistema de armas desacoplado mediante Scriptable Data / interfaces polimórficas',
      'Manejo de retroceso, sacudida de cámara (screen-shake) y partículas reactivas',
      'Flujo de trabajo colaborativo profesional con Git y control de ramas'
    ],
    metrics: [
      { label: 'Frame Rate', value: '60 FPS Estables' },
      { label: 'GC Memory Spikes', value: '0 Pausas' },
      { label: 'Patrón Core', value: 'Object Pool + FSM' }
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://github.com'
  },
  {
    id: 'hardware-pcb-cad',
    title: 'MicroHardware Lab — Diseño de PCBs y CAD Paramétrico',
    subtitle: 'Ingeniería electrónica física y modelado procedural con Blender Python',
    category: 'IoT & Hardware',
    iconName: 'Layers',
    badge: 'Diseño Electrónico & CAD',
    description: 'Diseño e ingeniería física de placas de circuito impreso multicapa complementarias para Raspberry Pi y automatización paramétrica de envolventes mecánicas mediante scripts de Python.',
    longDescription: 'Laboratorio de prototipado rápido que une el diseño esquemático y ruteo de PCBs de 2 capas con tolerancias industriales, selección de componentes pasivos/activos SMD, y desarrollo de scripts en Python dentro de Blender y FreeCAD para la generación automática de carcasas adaptadas al milímetro.',
    challenge: 'Garantizar el ancho de pista adecuado para corrientes de control, preservar la integridad de señal en buses digitales de alta frecuencia y asegurar encaje mecánico perfecto entre carcasa impresa y conectores.',
    solution: 'Cálculo de impedancias y planos de masa continuos en KiCad para apantallamiento electromagnético, exportación de STEPs 3D directos a pipeline paramétrico en Python y fabricación aditiva FDM con tolerancias de ±0.15 mm.',
    tags: ['KiCad PCB Design', 'Ruteo Multicapa', 'Blender Python API', 'FreeCAD Paramétrico', 'Selección SMD', 'Mecanizado CNC', 'Impresión 3D FDM'],
    features: [
      'Diseño esquemático riguroso con desacoplamiento capacitivo y protección contra sobretensión',
      'Ruteo de pistas con cálculo de disipación térmica y planos de masa para reducción de ruido',
      'Scripts en Blender (Python API) para modelado procedural de cajas a partir de archivos DXF/STEP',
      'Preparación de paquetes de fabricación industrial: Gerbers, BOM estructurado y Pick-and-Place',
      'Prototipado in situ mediante fresado CNC y fabricación aditiva de precisión'
    ],
    metrics: [
      { label: 'Tolerancia Dimensional', value: '±0.15 mm' },
      { label: 'Modelado CAD', value: '100% Scripted' },
      { label: 'Topología PCB', value: '2 Layers / SMD' }
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://github.com'
  },
  {
    id: 'kali-network-security',
    title: 'NetDefense Suite — Auditoría de Redes y Hardening',
    subtitle: 'Metodología estructurada de escaneo y aseguramiento de sistemas',
    category: 'Ciberseguridad',
    iconName: 'ShieldCheck',
    badge: 'Ciberseguridad Defensiva',
    description: 'Conjunto de herramientas y scripts automatizados en entorno Kali Linux para el descubrimiento de activos, evaluación de vectores de ataque y hardening de infraestructura local.',
    longDescription: 'Suite de análisis y evaluación técnica de seguridad orientada a redes de computadores. Permite automatizar las fases de reconocimiento pasivo y activo, mapeo exhaustivo de superficies de ataque, auditoría de puertos/servicios y aplicación de directrices de remediación y hardening defensivo.',
    challenge: 'Ejecutar evaluaciones de seguridad completas sin saturar conmutadores ni provocar caídas por inundación de paquetes en redes de prueba locales.',
    solution: 'Desarrollo de scripts optimizados en Bash que orquestan escaneos sigilosos con Nmap (SYN scans segmentados), correlación de banners de servicios expuestos y generación automática de reportes de remediación priorizados.',
    tags: ['Kali Linux', 'Bash Scripting Avanzado', 'Nmap / Zenmap NSE', 'Wireshark / Tshark', 'Hardening de Sistemas', 'Auditoría TCP/IP', 'Linux Sec'],
    features: [
      'Scripts automatizados de descubrimiento de hosts y fingerprinting de sistemas operativos',
      'Detección de versiones de servicios desactualizados y correlación con CVEs conocidos',
      'Filtrado y análisis de tráfico de red anómalo mediante inspección de paquetes',
      'Elaboración de matrices de riesgo técnico y memorias estructuradas de laboratorio',
      'Configuración de directrices de hardening: cierre de puertos, reglas UFW/iptables y hardening SSH'
    ],
    metrics: [
      { label: 'Metodología', value: 'NIST / OSSTMM' },
      { label: 'Scripting Core', value: 'Bash + NSE' },
      { label: 'Enfoque', value: 'Hardening Defensivo' }
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://github.com'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Desarrollo de Software & Arquitectura',
    icon: 'Code2',
    description: 'Construcción de software concurrente, modular y orientado al alto rendimiento.',
    skills: [
      { name: 'Python (Asyncio / Data / Automation)', level: 'Avanzado', highlight: true },
      { name: 'C# (.NET Core / Godot)', level: 'Avanzado', highlight: true },
      { name: 'TypeScript / JavaScript', level: 'Avanzado', highlight: true },
      { name: 'Node.js & Express (Event Loop)', level: 'Avanzado' },
      { name: 'React & Tailwind CSS', level: 'Avanzado', highlight: true },
      { name: 'WebSockets & APIs REST', level: 'Avanzado' },
      { name: 'Git & Flujo de Trabajo en Equipos', level: 'Avanzado' }
    ]
  },
  {
    title: 'Sistemas Embebidos & IoT (Edge)',
    icon: 'Cpu',
    description: 'Interconexión de lógica digital con sensores y actuadores del mundo físico.',
    skills: [
      { name: 'Raspberry Pi 5 (Linux Embedded)', level: 'Avanzado', highlight: true },
      { name: 'Arduino & Microcontroladores C++', level: 'Avanzado', highlight: true },
      { name: 'Buses: I2C, SPI, UART, GPIO', level: 'Avanzado', highlight: true },
      { name: 'Servicios Residentes (Systemd Daemons)', level: 'Avanzado' },
      { name: 'Adquisición & Filtrado de Señal', level: 'Avanzado', highlight: true },
      { name: 'Control de Potencia & Relés', level: 'Avanzado' }
    ]
  },
  {
    title: 'Hardware, PCBs & CAD Paramétrico',
    icon: 'Box',
    description: 'Diseño de circuitos electrónicos físicos y manufactura digital.',
    skills: [
      { name: 'Diseño Esquemático & Ruteo de PCBs', level: 'Avanzado', highlight: true },
      { name: 'Blender Python API (Modelado Procedural)', level: 'Avanzado', highlight: true },
      { name: 'FreeCAD & Modelado Paramétrico', level: 'Intermedio-Avanzado' },
      { name: 'Selección de Componentes SMD & BOM', level: 'Avanzado' },
      { name: 'Impresión 3D FDM & Tolerancias', level: 'Avanzado', highlight: true },
      { name: 'Prototipado por Mecanizado CNC', level: 'Intermedio' }
    ]
  },
  {
    title: 'Ciberseguridad & Administración de Sistemas',
    icon: 'Shield',
    description: 'Auditoría técnica de redes, análisis de vulnerabilidades y resiliencia.',
    skills: [
      { name: 'Kali Linux & Distribuciones Debian', level: 'Avanzado', highlight: true },
      { name: 'Bash Scripting Avanzado', level: 'Avanzado', highlight: true },
      { name: 'Nmap & Nmap Scripting Engine (NSE)', level: 'Avanzado', highlight: true },
      { name: 'Análisis de Protocolos (Wireshark/TCPdump)', level: 'Intermedio-Avanzado' },
      { name: 'Hardening de Infraestructura & Firewalls', level: 'Intermedio-Avanzado' },
      { name: 'Virtualización & Contenedores', level: 'Intermedio' }
    ]
  }
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    period: '2025 - Presente',
    role: 'Desarrollo de Soluciones Ciberfísicas & Laboratorio de Hardware',
    institution: 'Proyectos Propios & Laboratorio de Prototipado',
    description: 'Concepción integral, ruteo de placas de circuito impreso (PCBs), firmware residente en Raspberry Pi 5 y desarrollo de algoritmos de simulación cuantitativa.',
    skills: ['IoT', 'Raspberry Pi 5', 'PCBs KiCad', 'Python Asyncio', 'C#', 'Blender API']
  },
  {
    period: '2024 - 2025',
    role: 'Especialización en Redes, Ciberseguridad & Sistemas',
    institution: 'Formación Técnica Superior en Ingeniería Informática',
    description: 'Auditorías de laboratorio de redes TCP/IP, elaboración de memorias técnicas de seguridad, hardening de sistemas operativos y programación de bajo nivel.',
    skills: ['Kali Linux', 'Nmap NSE', 'Bash Scripting', 'Wireshark', 'C++', 'Hardening']
  },
  {
    period: '2023 - 2024',
    role: 'Desarrollo de Software, Motores de Juego & Simulación',
    institution: 'Desarrollo Independiente & Algoritmia',
    description: 'Implementación de patrones de arquitectura en C# (.NET Core) en el motor Godot, optimización de algoritmos de recolección de basura e ingesta de series temporales de datos.',
    skills: ['Godot Engine', 'C# .NET', 'Object Pooling', 'FSM Patterns', 'Git Workflows']
  }
];
