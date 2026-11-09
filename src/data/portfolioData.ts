import type { Project, SkillCategory, TimelineItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Hamza El Fathi Sofyani',
  shortName: 'Hamza',
  title: 'Ingeniero de Sistemas Ciberfísicos, IA Embebida, Ciberseguridad & Full-Stack',
  tagline: 'Convergencia entre Inteligencia Artificial aplicada (Edge AI & Modelos Cuantitativos), sistemas embebidos, infraestructuras y ciberseguridad.',
  bio: 'Técnico IT e Ingeniero de Sistemas especializado en la creación y entrenamiento de modelos de IA aplicados a Edge Computing (control biológico e IoT con Raspberry Pi 5) y series temporales financieras (Machine Learning para trading cuantitativo). Estudiante de Grado en Ingeniería Informática (UNED), Certificado en Ciberseguridad por Cisco y con experiencia en administración de infraestructuras (Windows Server, Linux, M365), diseño de PCBs electrónicas y desarrollo de software de alto rendimiento en Python, C#, C++ y TypeScript.',
  location: 'Ávila / Madrid, España',
  phone: '+34 609 38 64 12',
  availability: 'Disponible para proyectos de alta exigencia técnica',
  email: 'hamzaelfathisofyani@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  cvPdfPath: './Curriculum_Hamza_El_Fathi_Sofyani.pdf',
  stats: [
    { label: 'Especialización', value: 'Sistemas, IA & Ciberseguridad' },
    { label: 'Certificación', value: 'Cisco Cybersecurity' },
    { label: 'Grado Universitario', value: 'Ing. Informática (UNED)' },
  ],
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'iqsense-iot',
    title: 'iQsense 2.0 — Sistema Ciberfísico & Edge AI para Control Climático',
    subtitle: 'Entrenamiento de modelos predictivos de VPD e inferencia en tiempo real en Raspberry Pi 5',
    category: 'IoT & Hardware',
    iconName: 'Cpu',
    badge: 'Edge AI + IoT Embebido + Hardware',
    imageUrl: 'iqsense-cad-despiece',
    images: ['iqsense-cad-despiece', 'iqsense-view-dashboard', 'iqsense-cableado', 'iqsense-real', 'iqsense-render'],
    description: 'Plataforma ciberfísica que integra un modelo de IA entrenado para predecir dinámicas ambientales complejas (VPD e inercia térmica), ejecutando inferencia autónoma en Edge sobre Raspberry Pi 5.',
    longDescription: 'iQsense 2.0 une la ingeniería electrónica y el Machine Learning aplicado. Cuenta con un pipeline integral de datos que ingesta telemetría ambiental continua, entrena modelos predictivos multivariables en Python y ejecuta el motor de inferencia optimizado directamente en la Raspberry Pi 5. La IA se anticipa al estrés hídrico de la planta modulando electroválvulas y nebulizadores antes de que se produzcan desviaciones críticas, superando con creces los anticuados sistemas reactivos por umbrales fijos.',
    challenge: 'Entrenar un modelo de Machine Learning capaz de predecir con alta precisión el Déficit de Presión de Vapor (VPD) bajo dinámicas ambientales no lineales, logrando tiempos de inferencia sub-20ms en el procesador ARM de la Raspberry Pi sin saturar la CPU ni provocar sobrecalentamiento.',
    solution: 'Desarrollo de un pipeline de feature engineering (diferenciales de temperatura sustrato/ambiente, humedad relativa y radiación), entrenamiento y poda (pruning/quantization) de modelos de regresión supervisada y series temporales, y ejecución en un servicio daemon desacoplado en Linux con systemd.',
    tags: ['Edge AI / Machine Learning', 'Model Training (Python)', 'Time-Series Forecasting', 'Raspberry Pi 5', 'IoT Telemetry Pipeline', 'KiCAD PCB Design', 'Linux Systemd Daemon', 'Blender Python API'],
    features: [
      'Pipeline de entrenamiento de IA con dataset histórico de telemetría (>1.2M lecturas)',
      'Inferencia en Edge sobre Raspberry Pi 5 para anticipación proactiva al estrés hídrico',
      'Predicción multivariable continua de Déficit de Presión de Vapor (VPD) e inercia térmica',
      'Placa PCB dedicada diseñada para acople directo al header GPIO con aislamiento galvánico',
      'Servicio daemon en Python con reconexión automática y registro local tolerante a caídas',
      'Diseño paramétrico de chasis y despiece técnico mediante scripts de Python en Blender CAD'
    ],
    metrics: [
      { label: 'Inferencia Edge', value: '< 18 ms (RPi 5)' },
      { label: 'Precisión Modelo IA', value: 'R² = 0.94 / VPD' },
      { label: 'Dataset Telemetría', value: '> 1.2M Muestras' }
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://github.com'
  },
  {
    id: 'omnistream-hub',
    title: 'OmniStream — Agregador Unificado de Streaming & Deep Linking',
    subtitle: 'Arquitectura híbrida Python (pywebview) + JS/CSS con integración TMDb y empaquetado Windows',
    category: 'Software & Full-Stack',
    iconName: 'Film',
    badge: 'Desktop App • Python & WebTech',
    imageUrl: 'omnistream-banner',
    images: ['omnistream-banner', 'omnistream-logo'],
    description: 'Aplicación de escritorio con interfaz cinematográfica que unifica el catálogo y la disponibilidad legal de 9 plataformas de streaming en España con redirección instantánea a reproductores oficiales.',
    longDescription: 'OmniStream resuelve la fragmentación del mercado de contenidos bajo demanda integrando los catálogos de Netflix, Prime Video, Disney+, Max, Apple TV+, Filmin y Movistar+. Construida con un patrón desacoplado que une un backend en Python con una interfaz web embebida de alto rendimiento mediante pywebview, consume metadatos de la API v3 de TMDb/JustWatch y resuelve esquemas URI nativos (nflx://, primevideo://, etc.) para lanzamiento directo en cliente o navegador. Incluye pipeline de compilación con PyInstaller y wizard de instalación asistido.',
    challenge: 'Unificar metadatos heterogéneos de múltiples proveedores sin latencia de renderizado y orquestar el lanzamiento determinista de protocolos URI nativos en el sistema operativo Windows.',
    solution: 'Implementación de un puente RPC asíncrono entre JavaScript y Python con pywebview, caché local indexada en JSON de más de 200k entradas, y resolvedor de deep links con fallback automático a versión web oficial.',
    tags: ['Python Desktop', 'pywebview Bridge', 'JavaScript / CSS3 Cinematográfico', 'TMDb & JustWatch API', 'Deep Linking (Custom URIs)', 'PyInstaller Compilation', 'Windows Installer Wizard', 'Async RPC'],
    features: [
      'Agregador Multi-Plataforma: Catálogo unificado para España (Netflix, Prime, Disney+, Max, Filmin, etc.)',
      'Deep Linking Protocol Handler: Resolución automática de esquemas URI nativos de escritorio',
      'Puente Híbrido Python <-> JS: pywebview con comunicación bidireccional sin servidor local expuesto',
      'Filtros Cruzados en Tiempo Real: Búsqueda instantánea por plataforma activa, género y año',
      'Pipeline de Distribución: Empaquetado en binario ejecutable (.exe) y wizard de instalación personalizado'
    ],
    metrics: [
      { label: 'Plataformas Cubiertas', value: '9 Servicios (ES)' },
      { label: 'Latencia Deep Link', value: '< 250 ms' },
      { label: 'Arquitectura', value: 'pywebview + Native URI' }
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://github.com'
  },
  {
    id: 'botcripto-trading',
    title: 'CryptoQuant — Motor de Trading Cuantitativo & IA Predictiva',
    subtitle: 'Modelos de Machine Learning para series temporales y optimización estocástica de riesgo',
    category: 'Software & Full-Stack',
    iconName: 'TrendingUp',
    badge: 'Machine Learning & Finanzas Cuantitativas',
    description: 'Motor algorítmico impulsado por modelos de IA entrenados sobre millones de series temporales financieras (OHLCV) con validación Walk-Forward y gestión estricta de drawdown.',
    longDescription: 'CryptoQuant es un motor cuantitativo de alto rendimiento que combina el entrenamiento de modelos de Machine Learning (detección de patrones de volatilidad, clasificación de regímenes de mercado y predicción de retornos estocásticos) con una infraestructura de ejecución determinista en Node.js y Python. Procesa millones de registros tick-by-tick y evalúa las decisiones de la IA en entornos simulados de microestructura de mercado.',
    challenge: 'Entrenar modelos predictivos sobre series temporales altamente no estacionarias evitando a toda costa el sobreajuste (overfitting) y el sesgo de anticipación (look-ahead bias), garantizando al mismo tiempo ejecución en tiempo real.',
    solution: 'Ingeniería avanzada de variables (momentum multiescala, volatilidad realizada, entropía de volumen), metodología de validación cruzada temporal Walk-Forward (análisis estrictamente fuera de muestra) y optimización de hiperparámetros orientada a maximizar el ratio Sortino y minimizar el Max Drawdown.',
    tags: ['Machine Learning / IA', 'Model Training & Validation', 'Time-Series Forecasting', 'Feature Engineering', 'Node.js Concurrente', 'Python (Pandas / NumPy / Scikit-Learn)', 'WebSockets Stream', 'Risk Management'],
    features: [
      'Entrenamiento supervisado de modelos predictivos sobre series temporales de alta frecuencia',
      'Pipeline de Feature Engineering con extracción de más de 45 variables estocásticas por vela',
      'Validación cruzada temporal Walk-Forward para erradicar cualquier sesgo de look-ahead',
      'Motor de backtesting con modelado realista de deslizamiento (slippage) y estructura de comisiones',
      'Transmisión en vivo mediante WebSockets con reconexión exponencial y buffers tipados',
      'Dashboard analítico para visualización de curva de equity, métricas de precisión y Sharpe ratio'
    ],
    metrics: [
      { label: 'Pipeline ML', value: 'Walk-Forward Validated' },
      { label: 'Features de IA', value: '> 45 Variables / Tick' },
      { label: 'Sharpe Ratio Simulado', value: '2.41' }
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
    imageUrl: 'godot-runner',
    images: ['godot-runner'],
    description: 'Videojuego de acción y supervivencia cenital desarrollado con el motor Godot 4 y C#, enfocado en patrones de optimización de memoria para combate fluido a 60 FPS estables.',
    longDescription: 'Videojuego de acción con mecánicas cinéticas exigentes. Construido bajo una arquitectura fuertemente desacoplada en C# (.NET Core), implementa reciclaje dinámico de memoria para hordas masivas de proyectiles y una máquina de estados finitos jerárquica para la inteligencia artificial enemiga.',
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
    imageUrl: 'pcb-esp32',
    images: ['pcb-esp32', 'pcb-angle-3', 'pcb-top-5'],
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
    id: 'hfs-sentry',
    title: 'HFS-Sentry — Suite Modular de Ciberseguridad & Diagnóstico',
    subtitle: 'Ecosistema de 7 herramientas de auditoría perimetral, análisis forense y criptografía',
    category: 'Ciberseguridad',
    iconName: 'ShieldCheck',
    badge: 'Pure Python 3 • Zero Dependencies',
    imageUrl: 'hfs-sentry-banner',
    images: [
      'hfs-sentry-banner',
      'sentry-netsentry',
      'sentry-logsentinel',
      'sentry-certsentry',
      'sentry-subnetsweep',
      'sentry-integrityguard'
    ],
    description: 'Suite modular de ciberseguridad defensiva y auditoría perimetral desarrollada sin dependencias externas (100% Python estándar). Integra escaneo concurrente de puertos, análisis forense de logs con bloqueo activo, auditoría TLS/SSL, sweep de subredes, monitor FIM y CLI extensible.',
    longDescription: 'HFS-Sentry es un ecosistema de seguridad defensiva, auditoría perimetral y análisis forense diseñado para entornos reales y de misión crítica. Opera con cero dependencias externas sobre la biblioteca estándar de Python 3 para máxima portabilidad en servidores aislados (air-gapped) y sistemas embebidos. Su arquitectura desacoplada basada en el patrón de registro dinámico BaseTool + @register_tool permite ejecutar 7 módulos tácticos desde una CLI unificada o como herramientas independientes.',
    challenge: 'Ejecutar diagnósticos exhaustivos de superficie de ataque, auditoría criptográfica y análisis de registros sin instalar pesadas dependencias de terceros en servidores de producción y sin generar sobrecarga en la red.',
    solution: 'Implementación de sockets TCP no bloqueantes con ThreadPoolExecutor, motor de expresiones regulares para parseo forense de eventos de autenticación con scripts ufw/iptables automáticos, verificación criptográfica X.509/SHA-256 nativa y arquitectura extensible orientada a objetos.',
    tags: ['Python 3 Estándar', 'Zero Dependencies', 'Arquitectura Modular (@register_tool)', 'ThreadPoolExecutor', 'Cisco Hardening', 'Análisis Forense Logs', 'OWASP Security Headers', 'SHA-256 FIM', 'UFW / iptables', 'Docker'],
    features: [
      'CLI Centralizada & Scripts Independientes: Invocación unificada (sentry.py <tool>) o modular',
      'NetSentry: Escaneo TCP concurrente con banner grabbing y verificación de 6 cabeceras OWASP',
      'LogSentinel: Ingesta forense de logs con detección de ataques SSH y script bloqueador block_threats.sh',
      'CertSentry: Inspección preventiva de ciclo de vida de certificados X.509 y cifrados obsoletos',
      'SubnetSweep: Descubrimiento de activos en subred (/24) y resolución OUI IEEE de fabricantes',
      'IntegrityGuard: Monitor de integridad de archivos críticos (FIM) con firmas criptográficas SHA-256',
      'DNSProbe & TrafficSentry: Análisis de registros DNS y captura/inspección de tráfico de red'
    ],
    metrics: [
      { label: 'Dependencias Externas', value: '0 (100% Python Std)' },
      { label: 'Herramientas Integradas', value: '7 Módulos' },
      { label: 'Arquitectura', value: 'Dynamic Registry' }
    ],
    githubUrl: 'https://github.com/faathii/HFS-Sentry',
    demoUrl: 'https://github.com/faathii/HFS-Sentry'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Inteligencia Artificial & Ciencia de Datos (ML/AI)',
    icon: 'TrendingUp',
    description: 'Entrenamiento de modelos de IA, análisis de series temporales, inferencia en Edge y MLOps.',
    skills: [
      { name: 'Entrenamiento de Modelos Supervisados & Series Temporales', level: 'Avanzado', highlight: true },
      { name: 'Edge AI & Inferencia Embebida (Raspberry Pi 5 / TinyML)', level: 'Avanzado', highlight: true },
      { name: 'Feature Engineering & Preprocesamiento (NumPy / Pandas)', level: 'Avanzado', highlight: true },
      { name: 'Validación Walk-Forward & Mitigación de Overfitting', level: 'Avanzado', highlight: true },
      { name: 'Modelado Predictivo de VPD y Variables Físicas / Financieras', level: 'Avanzado', highlight: true },
      { name: 'Scikit-Learn, PyTorch / Flujos de Inferencia', level: 'Intermedio-Avanzado' }
    ]
  },
  {
    title: 'Sistemas Operativos, Cloud & IT',
    icon: 'Shield',
    description: 'Administración de infraestructuras empresariales, virtualización y gestión cloud.',
    skills: [
      { name: 'Windows Server & Active Directory', level: 'Avanzado', highlight: true },
      { name: 'Linux Desktop & Server (Debian/Kali/Ubuntu)', level: 'Avanzado', highlight: true },
      { name: 'Microsoft 365 & Entra ID (Azure AD)', level: 'Avanzado', highlight: true },
      { name: 'Virtualización (Entornos Virtuales/KVM/VMware)', level: 'Avanzado' },
      { name: 'PowerShell Scripting & Automatización', level: 'Avanzado', highlight: true },
      { name: 'Soporte Técnico & Resolución de Incidencias', level: 'Avanzado' }
    ]
  },
  {
    title: 'Ciberseguridad & Redes de Datos',
    icon: 'ShieldCheck',
    description: 'Certificado Cisco. Hardening de sistemas, defensa perimetral y análisis de tráfico.',
    skills: [
      { name: 'Ciberseguridad Cisco (Certificado)', level: 'Certificado', highlight: true },
      { name: 'Redes TCP/IP, DNS, DHCP, VPNs', level: 'Avanzado', highlight: true },
      { name: 'Switching & Routing Básico / VLANs', level: 'Avanzado' },
      { name: 'Hardening de Sistemas & Políticas de Acceso', level: 'Avanzado', highlight: true },
      { name: 'Gestión de Vulnerabilidades & Nmap', level: 'Avanzado' },
      { name: 'Fundamentos Criptográficos, RSA & MFA', level: 'Intermedio-Avanzado' }
    ]
  },
  {
    title: 'Programación, Software & Arquitectura',
    icon: 'Code2',
    description: 'Desarrollo de herramientas, APIs y arquitecturas orientadas a objetos y concurrencia.',
    skills: [
      { name: 'Python (Asyncio, Daemons, Machine Learning)', level: 'Avanzado', highlight: true },
      { name: 'C# (.NET Core, Motores de Juego, POO)', level: 'Avanzado', highlight: true },
      { name: 'C++ & Java', level: 'Intermedio-Avanzado' },
      { name: 'APIs REST & WebSockets de Alta Frecuencia', level: 'Avanzado', highlight: true },
      { name: 'Git & Gestión de Repositorios GitHub', level: 'Avanzado', highlight: true },
      { name: 'TypeScript / React / Tailwind CSS', level: 'Avanzado' }
    ]
  },
  {
    title: 'Hardware, Electrónica & CAD 3D',
    icon: 'Box',
    description: 'Diagnóstico y reparación de equipos, microelectrónica física y modelado paramétrico.',
    skills: [
      { name: 'Diseño & Ruteo de PCBs (KiCad)', level: 'Avanzado', highlight: true },
      { name: 'Blender Python API (Modelado Procedural)', level: 'Avanzado', highlight: true },
      { name: 'FreeCAD Paramétrico & Fusion 360', level: 'Intermedio-Avanzado' },
      { name: 'Electrónica Digital Básica & SMD', level: 'Avanzado', highlight: true },
      { name: 'Montaje & Mantenimiento de Hardware', level: 'Avanzado' },
      { name: 'Impresión 3D FDM & Tolerancias', level: 'Avanzado' }
    ]
  }
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    period: '2025 - Actualidad',
    role: 'Grado en Ingeniería Informática',
    institution: 'UNED (Universidad Nacional de Educación a Distancia)',
    description: 'Cursando estudios de grado universitario en Ingeniería Informática con especialización en ciencias de la computación, fundamentos matemáticos y sistemas distribuidos.',
    skills: ['Ingeniería Informática', 'Estructuras de Datos', 'Algoritmia', 'Sistemas Operativos']
  },
  {
    period: '2024 - 2025',
    role: 'Especialización en Seguridad Informática & Certificación Cisco',
    institution: 'Formación Superior (540 Horas) + Cisco Networking Academy',
    description: 'Certificación oficial de Ciberseguridad por Cisco. Análisis de vulnerabilidades, arquitectura de redes seguras, hardening de servidores y respuestas ante incidentes.',
    skills: ['Ciberseguridad Cisco', 'Hardening', 'Redes TCP/IP', 'Linux Sec', 'VPNs']
  },
  {
    period: '2018 - 2024',
    role: 'Encargado de Operaciones & Liderazgo de Equipos',
    institution: 'Grupo Zena Pizza',
    description: 'Gestión integral del establecimiento, liderazgo de personal técnico y operativo, resolución de contingencias bajo alta demanda y optimización de procesos de producción.',
    skills: ['Liderazgo de Equipos', 'Gestión de Procesos', 'Resolución de Problemas', 'Control Operativo']
  },
  {
    period: '2013 - 2015',
    role: 'Técnico en Sistemas Microinformáticos y Redes (SMR)',
    institution: 'Formación Profesional de Grado Medio',
    description: 'Montaje y reparación de equipos microinformáticos, despliegue de redes locales, instalación y configuración de sistemas operativos y soporte técnico a usuarios.',
    skills: ['Hardware', 'Redes Locales', 'Windows Server', 'Linux', 'Soporte Técnico']
  }
];
