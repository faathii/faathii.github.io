import type { Project, SkillCategory, TimelineItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Hamza',
  title: 'Ingeniero de Software & Sistemas Embebidos / IoT',
  tagline: 'Construyendo la intersección entre software de alto rendimiento, electrónica y diseño físico.',
  bio: 'Desarrollador apasionado por crear soluciones integrales end-to-end: desde el ruteo de circuitos impresos (PCBs) y firmware en Raspberry Pi / microcontroladores, hasta aplicaciones web/móviles escalables, bots de simulación financiera y videojuegos en C#.',
  location: 'Ávila, España',
  availability: 'Disponible para proyectos & colaboraciones',
  email: 'hamzaelfathisofyani@gmail.com',
  github: 'https://github.com/faathii',
  linkedin: 'https://www.linkedin.com/in/hamzaelfathi/',
  stats: [
    { label: 'Proyectos Destacados', value: '5+' },
    { label: 'Enfoque Técnico', value: 'Software + Hardware' },
    { label: 'Ecosistemas Dominados', value: 'Web, IoT, C#, Linux' },
  ],
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'iqsense-iot',
    title: 'iQsense 2.0 — Ecosistema IoT de Cultivo Inteligente',
    subtitle: 'Automatización integral, telemetría y control de actuadores',
    category: 'IoT & Hardware',
    iconName: 'Cpu',
    badge: 'Hardware + Software',
    description: 'Sistema integral de automatización para monitorización ambiental y control de actuadores en cultivos cerrados.',
    longDescription: 'iQsense 2.0 es una solución integral de ingeniería que combina telemetría en tiempo real, firmware sobre Raspberry Pi 5 y microcontroladores, aplicación móvil para control remoto, diseño de PCB a medida y carcasas paramétricas modeladas con scripts de Python en Blender e impresas en 3D.',
    challenge: 'Integrar lectura confiable de múltiples sensores analógicos/digitales, control de relés de potencia para ventilación y riego, y sincronización en tiempo real sin latencia hacia una app móvil intuitiva.',
    solution: 'Desarrollo de servicios daemon en Python sobre Raspberry Pi con arquitectura pub/sub, diseño de PCB para desacoplamiento eléctrico y app multiplataforma con telemetría visual.',
    tags: ['Raspberry Pi 5', 'Python', 'Arduino/C++', 'PCB Design', 'React Native', 'Blender Python API', 'FreeCAD', '3D Printing'],
    features: [
      'Lectura de humedad, temperatura, CO2 y luminosidad en tiempo real',
      'Control automatizado de actuadores (extractores, riego, iluminación)',
      'Diseño personalizado de PCB para Raspberry Pi 5',
      'Carcasa modular compacta modelada en CAD y fabricada con impresión 3D',
      'Aplicación móvil complementaria (iQsense Mobile) para monitoreo remoto'
    ],
    metrics: [
      { label: 'Sensores integrados', value: '6+' },
      { label: 'Precisión de lectura', value: '99.2%' },
      { label: 'Arquitectura', value: 'Edge Computing' }
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://github.com'
  },
  {
    id: 'botcripto-trading',
    title: 'CryptoTrade Engine & Simulator',
    subtitle: 'Bot de trading algorítmico y backtesting de series temporales',
    category: 'Software & Full-Stack',
    iconName: 'TrendingUp',
    badge: 'Fintech & Data',
    description: 'Plataforma algorítmica para análisis de mercado cripto, simulación de datos históricos y ejecución automatizada de estrategias.',
    longDescription: 'Motor de trading cuantitativo diseñado en Node.js y Python capaz de procesar historiales masivos de precios (OHLCV), simular condiciones de mercado mediante backtesting con control de drawdown y ejecutar señales en tiempo real.',
    challenge: 'Procesar grandes volúmenes de datos de mercado minimizando la latencia de análisis técnico y evitando falsos positivos en la ejecución algorítmica.',
    solution: 'Implementación de pipelines de datos asíncronos, cálculo vectorizado de medias móviles, RSI y bandas de Bollinger, con dashboard de monitorización en servidor local.',
    tags: ['Node.js', 'Express', 'Python', 'Data Analytics', 'WebSockets', 'REST API', 'Algorithmic Trading'],
    features: [
      'Motor de backtesting con métricas Sharpe Ratio y Maximum Drawdown',
      'Simulador de órdenes con soporte para deslizamiento (slippage) y comisiones',
      'Conexión mediante WebSockets a libros de órdenes en directo',
      'Servidor local para visualización y configuración de parámetros de estrategia',
      'Exportación estructurada de resultados a CSV y reportes analíticos'
    ],
    metrics: [
      { label: 'Velocidad de backtest', value: '< 2.5s / año' },
      { label: 'Indicadores técnicos', value: '12+' },
      { label: 'Tolerancia a fallos', value: '100% resiliente' }
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://github.com'
  },
  {
    id: 'godot-topdown-runner',
    title: 'Godot Action Runner — Top-Down Survival',
    subtitle: 'Videojuego de acción y supervivencia con arquitectura en C#',
    category: 'Videojuegos',
    iconName: 'Gamepad2',
    badge: 'Game Dev',
    description: 'Videojuego de disparos y supervivencia en vista cenital desarrollado con Godot Engine y scripts de alto rendimiento en C#.',
    longDescription: 'Videojuego de acción top-down centrado en mecánicas fluidas de movimiento, variedad de armamento, comportamiento inteligente de hordas enemigas y optimización de renderizado en tiempo real.',
    challenge: 'Mantener 60 FPS estables gestionando decenas de proyectiles y enemigos simultáneos en pantalla mediante control estricto de memoria en C#.',
    solution: 'Patrones de diseño orientados a objetos con Object Pooling para balas y partículas, máquinas de estados finitos (FSM) para la IA de enemigos y física desacoplada.',
    tags: ['Godot Engine', 'C#', 'Game Architecture', 'FSM (AI)', 'Git/GitHub', 'Pixel Art / 2D Assets'],
    features: [
      'Sistema modular de armas (pistolas, escopetas, rifles con estadísticas configurables)',
      'Algoritmos de pathfinding y comportamiento de persecución enemiga',
      'Control de retroceso, screen-shake y efectos de impacto procedurales',
      'Optimización con pooling de proyectiles para máximo rendimiento',
      'Control de versiones estructurado en Git'
    ],
    metrics: [
      { label: 'Tasa de refresco', value: '60 FPS estables' },
      { label: 'Lenguaje core', value: 'C# 10' },
      { label: 'Mecánicas', value: 'Modular & FSM' }
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://github.com'
  },
  {
    id: 'hardware-pcb-cad',
    title: 'Laboratorio de Hardware: PCBs a Medida & Automatización CAD',
    subtitle: 'Ruteo de placas de circuito impreso y modelado paramétrico con Blender Python',
    category: 'IoT & Hardware',
    iconName: 'Layers',
    badge: 'Ingeniería Física',
    description: 'Diseño electrónico de PCBs para microprocesadores y automatización de modelado 3D mediante scripts en Blender y FreeCAD.',
    longDescription: 'Desarrollo de hardware físico integrando diseño esquemático y ruteo de pistas para placas complementarias de Raspberry Pi 5, automatización de geometrías 3D con la API de Python en Blender para ensamble de productos y prototipado mediante CNC e impresión 3D.',
    challenge: 'Garantizar tolerancias mecánicas exactas para componentes electrónicos y acelerar el diseño de carcasas sin trabajo manual repetitivo.',
    solution: 'Scripts de automatización en Python dentro de Blender y FreeCAD para generar carcasas basadas en las dimensiones exactas del exportable de la PCB.',
    tags: ['Diseño PCB', 'Raspberry Pi 5', 'Blender Python API', 'FreeCAD', 'Autodesk Fusion', 'Mecanizado CNC', 'Impresión 3D'],
    features: [
      'Diseño esquemático y ruteo multicapa para periféricos de Raspberry Pi 5',
      'Scripts en Blender (Python API) para modelado procedural de gabinetes',
      'Exportación y validación de archivos STEP/STL para fabricación',
      'Prototipado rápido mediante fresado CNC y fabricación aditiva FDM',
      'Selección de componentes SMD/Through-hole para confiabilidad térmica'
    ],
    metrics: [
      { label: 'Tolerancia mecánica', value: '±0.15 mm' },
      { label: 'Automatización CAD', value: '100% Python' },
      { label: 'Fabricación', value: 'CNC + 3D' }
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://github.com'
  },
  {
    id: 'kali-network-security',
    title: 'Network Auditor & Security Hardening Suite',
    subtitle: 'Automatización de auditorías de red y análisis de vulnerabilidades',
    category: 'Ciberseguridad',
    iconName: 'ShieldCheck',
    badge: 'Ciberseguridad',
    description: 'Colección de scripts y herramientas de diagnóstico en Kali Linux para escaneo de puertos, análisis de tráfico y auditorías de seguridad.',
    longDescription: 'Entorno de pruebas y automatización para auditoría y evaluación de posturas de seguridad en redes locales. Permite mapear topologías de red, detectar servicios expuestos y generar reportes técnicos de mitigación.',
    challenge: 'Reducir el tiempo necesario para realizar un inventario exhaustivo de hosts y servicios en redes locales sin generar sobrecarga de paquetes.',
    solution: 'Creación de scripts en Bash optimizados que combinan escaneo sigiloso con Nmap, validación de configuraciones débiles y formateo estructurado de resultados.',
    tags: ['Kali Linux', 'Bash Scripting', 'Nmap / Zenmap', 'Wireshark', 'Network Auditing', 'Hardening', 'TCP/IP'],
    features: [
      'Scripts automatizados de descubrimiento de hosts y fingerprinting de SO',
      'Análisis de puertos abiertos y detección de versiones de servicios desactualizados',
      'Monitoreo y filtrado de paquetes sospechosos',
      'Elaboración de memorias de laboratorio e informes técnicos de seguridad',
      'Hardening de servidores y equipos cliente en entornos de prueba'
    ],
    metrics: [
      { label: 'Entorno', value: 'Kali Linux' },
      { label: 'Scripting', value: 'Bash Avanzado' },
      { label: 'Alcance', value: 'Auditoría Defensiva' }
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://github.com'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Desarrollo de Software & Web',
    icon: 'Code2',
    description: 'Construcción de arquitecturas limpias, modulares y de alto rendimiento.',
    skills: [
      { name: 'TypeScript / JavaScript', level: 'Avanzado', highlight: true },
      { name: 'Python', level: 'Avanzado', highlight: true },
      { name: 'C# (.NET / Godot)', level: 'Intermedio-Avanzado', highlight: true },
      { name: 'Node.js & Express', level: 'Avanzado' },
      { name: 'React & Tailwind CSS', level: 'Avanzado', highlight: true },
      { name: 'APIs REST & WebSockets', level: 'Avanzado' },
      { name: 'Git & GitHub Workflows', level: 'Avanzado' }
    ]
  },
  {
    title: 'IoT & Sistemas Embebidos',
    icon: 'Cpu',
    description: 'Unión de software con el mundo físico mediante microprocesadores y sensores.',
    skills: [
      { name: 'Raspberry Pi 5 (Linux Embedded)', level: 'Avanzado', highlight: true },
      { name: 'Arduino & Microcontroladores', level: 'Avanzado', highlight: true },
      { name: 'C / C++ para Firmware', level: 'Intermedio' },
      { name: 'Protocolos: I2C, SPI, UART, GPIO', level: 'Avanzado' },
      { name: 'Telemetría & Procesamiento en Edge', level: 'Avanzado', highlight: true },
      { name: 'Automatización con Relés y Actuadores', level: 'Avanzado' }
    ]
  },
  {
    title: 'Hardware, CAD & Fabricación 3D',
    icon: 'Box',
    description: 'Diseño de circuitos electrónicos y modelado paramétrico digital.',
    skills: [
      { name: 'Diseño & Ruteo de PCBs', level: 'Intermedio-Avanzado', highlight: true },
      { name: 'Blender (Python Scripting API)', level: 'Avanzado', highlight: true },
      { name: 'FreeCAD & Modelado Paramétrico', level: 'Intermedio-Avanzado' },
      { name: 'Autodesk Fusion', level: 'Intermedio' },
      { name: 'Impresión 3D (FDM / Cura / PrusaSlicer)', level: 'Avanzado', highlight: true },
      { name: 'Fresado CNC & Prototipado', level: 'Intermedio' }
    ]
  },
  {
    title: 'Ciberseguridad & Sistemas',
    icon: 'Shield',
    description: 'Diagnóstico de redes, análisis de seguridad y administración de sistemas.',
    skills: [
      { name: 'Kali Linux & Distribuciones Debian', level: 'Avanzado', highlight: true },
      { name: 'Bash Scripting & Automatización', level: 'Avanzado', highlight: true },
      { name: 'Nmap, Zenmap & Escaneo de Redes', level: 'Avanzado' },
      { name: 'Análisis de Tráfico (Wireshark)', level: 'Intermedio' },
      { name: 'Hardening de Sistemas y Políticas', level: 'Intermedio' },
      { name: 'Virtualización (KVM, VMware, balenaEtcher)', level: 'Intermedio' }
    ]
  }
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    period: '2025 - Presente',
    role: 'Desarrollo de Soluciones IoT & Proyectos de Ingeniería',
    institution: 'Proyectos Propios & Laboratorio de Hardware',
    description: 'Concepción, diseño electrónico (PCBs), firmware e interfaces de software para proyectos avanzados como iQsense 2.0 y bots de análisis financiero.',
    skills: ['IoT', 'Raspberry Pi', 'Python', 'PCBs', 'Blender API', 'C#']
  },
  {
    period: '2024 - 2025',
    role: 'Formación Superior & Especialización Técnica',
    institution: 'Ingeniería / Redes & Ciberseguridad',
    description: 'Prácticas y memorias técnicas en arquitectura de redes de computadores, auditoría de vulnerabilidades, administración de sistemas Linux y programación de bajo nivel.',
    skills: ['Kali Linux', 'Nmap', 'Redes TCP/IP', 'C++', 'Bash']
  },
  {
    period: '2023 - 2024',
    role: 'Desarrollo de Software & Creación de Videojuegos',
    institution: 'Game Dev & Simulación',
    description: 'Creación de motores de juego en Godot con C#, implementación de algoritmos de inteligencia artificial (FSM) y automatización con Python.',
    skills: ['Godot', 'C#', 'Game Design', 'Git']
  }
];
