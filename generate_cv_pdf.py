import os
import sys
from PIL import Image, ImageDraw
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit

# 1. Process hamza3.jpg into high-res circular photo with anti-aliasing
def prepare_circular_photo():
    src_path = 'imagenes/hamza3.jpg'
    out_path = 'imagenes/hamza3_circular.png'
    
    im = Image.open(src_path).convert("RGBA")
    w, h = im.size
    crop_size = min(w, h)
    left = (w - crop_size) // 2
    top = 0
    cropped = im.crop((left, top, left + crop_size, top + crop_size))
    
    # Scale to high resolution 800x800
    target_size = 800
    cropped = cropped.resize((target_size, target_size), Image.Resampling.LANCZOS)
    
    # Create circular mask
    mask = Image.new('L', (target_size, target_size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, target_size, target_size), fill=255)
    
    # Apply mask
    output = Image.new('RGBA', (target_size, target_size), (0, 0, 0, 0))
    output.paste(cropped, (0, 0), mask=mask)
    output.save(out_path, format="PNG")
    return out_path

def build_pdf(out_pdf_path):
    photo_path = prepare_circular_photo()
    
    # Page size: A4
    page_w, page_h = A4 # 595.28 x 841.89
    c = canvas.Canvas(out_pdf_path, pagesize=A4)
    c.setTitle("Curriculum Vitae - Hamza El Fathi Sofyani")
    c.setAuthor("Hamza El Fathi Sofyani")
    c.setSubject("Ingeniero de Sistemas Ciberfísicos, Edge AI & Ciberseguridad")

    # Colors
    c_navy_bg     = HexColor("#0a1122")   # Left bar background
    c_cyan_accent = HexColor("#00bcd4")   # Tech cyan
    c_cyan_light  = HexColor("#7dd3fc")   # Light cyan text
    c_emerald     = HexColor("#10b981")   # Emerald accent
    c_white       = HexColor("#ffffff")
    c_sidebar_txt = HexColor("#cbd5e1")   # Slate-300
    c_sidebar_mut = HexColor("#94a3b8")   # Slate-400
    
    c_right_title = HexColor("#0f172a")   # Dark slate
    c_right_sub   = HexColor("#0e7490")   # Dark cyan/teal
    c_right_body  = HexColor("#334155")   # Slate-700
    c_right_mut   = HexColor("#64748b")   # Slate-500
    c_border_light= HexColor("#e2e8f0")   # Light gray border
    c_tag_bg      = HexColor("#f8fafc")   # Very light gray card

    sidebar_w = 196

    # 1. Backgrounds
    # Right column background (Pure White)
    c.setFillColor(c_white)
    c.rect(0, 0, page_w, page_h, fill=1, stroke=0)

    # Left sidebar background (Deep Technical Navy)
    c.setFillColor(c_navy_bg)
    c.rect(0, 0, sidebar_w, page_h, fill=1, stroke=0)

    # Decorative thin cyan divider line
    c.setStrokeColor(c_cyan_accent)
    c.setLineWidth(1.2)
    c.line(sidebar_w, 0, sidebar_w, page_h)

    # =========================================================================
    # LEFT COLUMN: Photo, Contact, Education, Certs, Languages, Core Strengths
    # =========================================================================
    
    # Photo placement
    photo_diameter = 86
    photo_x = (sidebar_w - photo_diameter) / 2
    photo_y = page_h - 110
    
    # Outer cyan glowing ring
    c.setStrokeColor(c_cyan_accent)
    c.setLineWidth(2.2)
    c.circle(photo_x + photo_diameter/2, photo_y + photo_diameter/2, photo_diameter/2 + 2.5, stroke=1, fill=0)
    
    # Draw photo
    c.drawImage(photo_path, photo_x, photo_y, width=photo_diameter, height=photo_diameter, mask='auto')

    # Available badge below photo
    badge_w = 126
    badge_h = 14
    badge_x = (sidebar_w - badge_w) / 2
    badge_y = photo_y - 18
    c.setFillColor(HexColor("#064e3b"))
    c.setStrokeColor(c_emerald)
    c.setLineWidth(0.8)
    c.roundRect(badge_x, badge_y, badge_w, badge_h, 3, fill=1, stroke=1)
    
    c.setFillColor(c_emerald)
    c.setFont("Helvetica-Bold", 7.2)
    c.drawCentredString(sidebar_w / 2, badge_y + 3.8, "● DISPONIBLE // INCORPORACIÓN")

    # Helper function for left section header
    def draw_left_section_header(y_pos, title_text):
        c.setFillColor(c_cyan_accent)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(16, y_pos, title_text.upper())
        c.setStrokeColor(HexColor("#1e293b"))
        c.setLineWidth(0.8)
        c.line(16, y_pos - 4, sidebar_w - 16, y_pos - 4)
        c.setStrokeColor(c_cyan_accent)
        c.setLineWidth(1.5)
        c.line(16, y_pos - 4, 38, y_pos - 4)
        return y_pos - 15

    # 1. CONTACT INFO
    curr_y = badge_y - 23
    curr_y = draw_left_section_header(curr_y, "Contacto Directo")

    contact_items = [
        ("UBICACIÓN", "Ávila / Madrid, España"),
        ("TELÉFONO", "+34 609 38 64 12"),
        ("EMAIL", "hamzaelfathisofyani@gmail.com"),
        ("GITHUB", "github.com/faathii"),
        ("PORTFOLIO", "faathii.github.io (Online)")
    ]

    for label, val in contact_items:
        c.setFillColor(c_cyan_light)
        c.setFont("Helvetica-Bold", 6.8)
        c.drawString(16, curr_y, label)
        c.setFillColor(c_white)
        c.setFont("Helvetica", 7.4)
        if len(val) > 24:
            c.setFont("Helvetica", 6.6)
        c.drawString(16, curr_y - 9.5, val)
        curr_y -= 21

    # 2. FORMACIÓN ACADÉMICA
    curr_y -= 3
    curr_y = draw_left_section_header(curr_y, "Formación Académica")

    edu_items = [
        ("Grado en Ing. Informática", "UNED (Cursando actualmente)", "2025 - Actualidad"),
        ("Especialización Ciberseguridad", "Formación Técnica Avanzada (540h)", "2024 - 2025"),
        ("Técnico SMR (Grado Medio)", "Sistemas Microinformáticos y Redes", "2013 - 2015"),
        ("Acceso Universidad (+25)", "Prueba Oficial Superada", "2024")
    ]

    for title, subtitle, period in edu_items:
        c.setFillColor(c_white)
        c.setFont("Helvetica-Bold", 7.6)
        c.drawString(16, curr_y, title)
        
        c.setFillColor(c_cyan_light)
        c.setFont("Helvetica-Oblique", 6.8)
        c.drawString(16, curr_y - 8.5, subtitle)
        
        c.setFillColor(c_sidebar_mut)
        c.setFont("Helvetica", 6.5)
        c.drawString(16, curr_y - 16.5, period)
        curr_y -= 25.5

    # 3. CERTIFICACIONES OFICIALES CISCO
    curr_y -= 2
    curr_y = draw_left_section_header(curr_y, "Certificaciones Cisco")

    # Cisco badges images
    badge_cyberops = 'imagenes/cisco-cyberops-associate.png'
    badge_intro = 'imagenes/cisco-intro-cybersecurity.png'

    # Cert 1
    if os.path.exists(badge_cyberops):
        c.drawImage(badge_cyberops, 16, curr_y - 12, width=15, height=15, mask='auto')
        tx = 35
    else:
        tx = 16
    c.setFillColor(c_white)
    c.setFont("Helvetica-Bold", 7.4)
    c.drawString(tx, curr_y, "Cisco CyberOps Associate")
    c.setFillColor(c_sidebar_txt)
    c.setFont("Helvetica", 6.4)
    c.drawString(tx, curr_y - 8.5, "Verified Networking Academy • SOC & Threat")
    curr_y -= 21

    # Cert 2
    if os.path.exists(badge_intro):
        c.drawImage(badge_intro, 16, curr_y - 12, width=15, height=15, mask='auto')
        tx = 35
    else:
        tx = 16
    c.setFillColor(c_white)
    c.setFont("Helvetica-Bold", 7.4)
    c.drawString(tx, curr_y, "Introduction to Cybersecurity")
    c.setFillColor(c_sidebar_txt)
    c.setFont("Helvetica", 6.4)
    c.drawString(tx, curr_y - 8.5, "Verified Networking Academy • Defense")
    curr_y -= 19

    # Cisco modules mini list
    c.setFillColor(c_cyan_light)
    c.setFont("Helvetica-Bold", 6.8)
    c.drawString(16, curr_y + 1, "5 MÓDULOS TÉCNICOS ACREDITADOS:")
    curr_y -= 8
    modules = [
        "Defensa Perimetral & Firewalls (SPI)",
        "Detección de Amenazas & Malware",
        "Criptografía & Claves PKI (SHA-256)",
        "Seguridad de Redes & Conmutación",
        "Gobernanza & Protección de Activos"
    ]
    for m in modules:
        c.setFillColor(c_emerald)
        c.setFont("Helvetica-Bold", 6.5)
        c.drawString(16, curr_y, "✓")
        c.setFillColor(c_sidebar_txt)
        c.setFont("Helvetica", 6.5)
        c.drawString(24, curr_y, m)
        curr_y -= 9.5

    # 4. IDIOMAS & APTITUDES
    curr_y -= 4
    curr_y = draw_left_section_header(curr_y, "Idiomas & Aptitudes")

    c.setFillColor(c_white)
    c.setFont("Helvetica-Bold", 7.2)
    c.drawString(16, curr_y, "Español: ")
    c.setFillColor(c_sidebar_txt)
    c.setFont("Helvetica", 7.2)
    c.drawString(52, curr_y, "Nativo")

    c.setFillColor(c_white)
    c.setFont("Helvetica-Bold", 7.2)
    c.drawString(98, curr_y, "Inglés: ")
    c.setFillColor(c_sidebar_txt)
    c.setFont("Helvetica", 7.2)
    c.drawString(128, curr_y, "B1 Técnico")
    curr_y -= 13

    aptitudes = "Liderazgo de equipos • Resolución de incidencias bajo alta presión • Autodidacta • Adaptación a nuevas tecnologías."
    c.setFillColor(c_sidebar_mut)
    c.setFont("Helvetica-Oblique", 6.4)
    lines = simpleSplit(aptitudes, "Helvetica-Oblique", 6.4, sidebar_w - 32)
    for l in lines:
        c.drawString(16, curr_y, l)
        curr_y -= 8.5


    # =========================================================================
    # RIGHT COLUMN: Header, Profile, Projects (iQsense, Sentry, Crypto, Omni),
    #               Work Experience, Technical Stack (B.O.M.)
    # =========================================================================
    
    rx = sidebar_w + 18
    rw = page_w - rx - 18 # 363.28 pt width
    
    # Right Header
    ry = page_h - 38
    c.setFillColor(c_right_title)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(rx, ry, "HAMZA EL FATHI SOFYANI")
    
    ry -= 14
    c.setFillColor(c_right_sub)
    c.setFont("Helvetica-Bold", 8.8)
    c.drawString(rx, ry, "INGENIERO DE SISTEMAS CIBERFÍSICOS  |  EDGE AI  |  CIBERSEGURIDAD  |  FULL-STACK")
    
    # Sub-bar separator
    ry -= 7
    c.setStrokeColor(HexColor("#06b6d4"))
    c.setLineWidth(1.5)
    c.line(rx, ry, rx + 65, ry)
    c.setStrokeColor(c_border_light)
    c.setLineWidth(0.8)
    c.line(rx + 65, ry, rx + rw, ry)

    # Right section header helper
    def draw_right_header(y_pos, title, badge_text=""):
        c.setFillColor(c_right_title)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(rx, y_pos, title.upper())
        
        if badge_text:
            tw = c.stringWidth(badge_text, "Helvetica-Bold", 6.5)
            bx = rx + rw - tw - 10
            c.setFillColor(HexColor("#ecfeff"))
            c.setStrokeColor(HexColor("#a5f3fc"))
            c.setLineWidth(0.6)
            c.roundRect(bx, y_pos - 1, tw + 10, 11, 2.5, fill=1, stroke=1)
            c.setFillColor(HexColor("#0891b2"))
            c.setFont("Helvetica-Bold", 6.5)
            c.drawString(bx + 5, y_pos + 1.8, badge_text)
            
        c.setStrokeColor(c_border_light)
        c.setLineWidth(0.8)
        c.line(rx, y_pos - 4, rx + rw, y_pos - 4)
        c.setStrokeColor(c_cyan_accent)
        c.setLineWidth(1.5)
        c.line(rx, y_pos - 4, rx + 45, y_pos - 4)
        return y_pos - 14

    # 1. PERFIL PROFESIONAL
    ry -= 15
    ry = draw_right_header(ry, "Perfil Profesional")
    
    profile_text = (
        "Técnico IT e Ingeniero de Sistemas especializado en infraestructura de sistemas, ciberseguridad defensiva "
        "certificada por Cisco y creación de modelos de Inteligencia Artificial aplicados a Edge Computing (Raspberry Pi 5) "
        "y análisis de series temporales. Amplia solvencia en administración de entornos Windows Server (Active Directory), "
        "Linux, Microsoft 365 / Entra ID y virtualización. Combina ingeniería de hardware físico (diseño y ruteo de PCBs en KiCad) "
        "con desarrollo de software de alta concurrencia en Python, C# (.NET), C++ y TypeScript. Enfoque determinista en resolución "
        "de incidencias críticas, auditoría perimetral y optimización de procesos operativos."
    )
    c.setFillColor(c_right_body)
    c.setFont("Helvetica", 7.2)
    p_lines = simpleSplit(profile_text, "Helvetica", 7.2, rw)
    for l in p_lines:
        c.drawString(rx, ry, l)
        ry -= 9.6

    # 2. PROYECTOS DESTACADOS & INGENIERÍA
    ry -= 5
    ry = draw_right_header(ry, "Proyectos de Ingeniería & Innovación", "PRODUCCIÓN & LAB")

    projects = [
        {
            "name": "iQsense 2.0 — Sistema Ciberfísico & Edge AI para Control Climático",
            "tech": "Edge AI (ONNX) • Raspberry Pi 5 • KiCad PCB 2-Layers • Python Daemon • Telemetría",
            "desc": "Modelo de IA entrenado para predicción en tiempo real de Déficit de Presión de Vapor (VPD) e inercia térmica (<18ms). Placa PCB dedicada acoplada al GPIO, telemetría continua de 12 sensores radiculares y control proactivo de 13 actuadores físicos."
        },
        {
            "name": "HFS-Sentry — Suite Modular de Ciberseguridad & Diagnóstico Perimetral",
            "tech": "Pure Python 3 (Zero Dependencies) • Sockets Asíncronos • ThreadPool • UFW / iptables",
            "desc": "Ecosistema táctico de 7 herramientas: escaneo de puertos concurrente con banner grabbing, ingesta forense de logs SSH con script de bloqueo activo, verificación X.509/TLS, sweep ARP/ICMP y monitor FIM con hashes SHA-256."
        },
        {
            "name": "CryptoQuant — Motor Cuantitativo de Trading & IA Predictiva",
            "tech": "Machine Learning • Time-Series (OHLCV) • Validación Walk-Forward • Node.js • WebSockets",
            "desc": "Entrenamiento de modelos supervisados sobre millones de ticks de series temporales financieras. Feature engineering de 45 variables estocásticas por vela, erradicación de look-ahead bias y ejecución de baja latencia."
        },
        {
            "name": "OmniStream — Agregador Unificado de Streaming & Deep Linking",
            "tech": "Python Desktop • pywebview Bridge • TMDb API • Custom URI Protocol • PyInstaller .exe",
            "desc": "App de escritorio que unifica el catálogo legal de 9 plataformas en España (Netflix, Prime, etc.) con resolución nativa de protocolos URI de escritorio (nflx://) y empaquetado autónomo con wizard de instalación."
        }
    ]

    for p in projects:
        c.setFillColor(c_right_title)
        c.setFont("Helvetica-Bold", 8.0)
        c.drawString(rx, ry, p["name"])
        
        c.setFillColor(c_right_sub)
        c.setFont("Helvetica-Bold", 6.8)
        c.drawString(rx, ry - 8.2, f"Tecnologías: {p['tech']}")
        
        c.setFillColor(c_right_body)
        c.setFont("Helvetica", 7.0)
        d_lines = simpleSplit(p["desc"], "Helvetica", 7.0, rw)
        cur_desc_y = ry - 17.0
        for dl in d_lines:
            c.drawString(rx, cur_desc_y, dl)
            cur_desc_y -= 8.4
        ry = cur_desc_y - 3.5

    # 3. EXPERIENCIA PROFESIONAL
    ry -= 3
    ry = draw_right_header(ry, "Experiencia Profesional & Liderazgo")

    experiences = [
        {
            "role": "Encargado de Operaciones & Liderazgo de Equipos",
            "company": "Grupo Zena Pizza",
            "period": "Sep 2018 – Oct 2024",
            "points": [
                "Gestión integral del establecimiento, coordinación y liderazgo de personal operativo bajo alta demanda.",
                "Optimización de tiempos de producción, auditoría de estándares de calidad y resolución técnica de contingencias."
            ]
        },
        {
            "role": "Encargado Técnico de Operaciones y Maquinaria",
            "company": "Multilogic S.L.",
            "period": "Mar 2017 – Mar 2018",
            "points": [
                "Supervisión y calibración de maquinaria técnica especializada, control de rendimientos y formación de operadores."
            ]
        }
    ]

    for exp in experiences:
        # Line 1: Role
        c.setFillColor(c_right_title)
        c.setFont("Helvetica-Bold", 7.8)
        c.drawString(rx, ry, exp["role"])
        
        # Period on the right
        c.setFillColor(c_right_mut)
        c.setFont("Helvetica-Bold", 6.8)
        tw = c.stringWidth(exp["period"], "Helvetica-Bold", 6.8)
        c.drawString(rx + rw - tw, ry, exp["period"])
        
        # Line 2: Company in cyan
        ry -= 8.5
        c.setFillColor(c_right_sub)
        c.setFont("Helvetica-Bold", 7.0)
        c.drawString(rx, ry, f"Empresa: {exp['company']}")
        
        # Bullets
        cur_exp_y = ry - 8.5
        for pt in exp["points"]:
            c.setFillColor(c_cyan_accent)
            c.setFont("Helvetica-Bold", 7.0)
            c.drawString(rx + 2, cur_exp_y, "▪")
            c.setFillColor(c_right_body)
            c.setFont("Helvetica", 6.8)
            lines = simpleSplit(pt, "Helvetica", 6.8, rw - 14)
            for l in lines:
                c.drawString(rx + 11, cur_exp_y, l)
                cur_exp_y -= 8.2
        ry = cur_exp_y - 2.0

    # 4. REPERTORIO TÉCNICO & COMPETENCIAS (B.O.M. STACK)
    ry -= 2
    ry = draw_right_header(ry, "Competencias Técnicas (B.O.M. Stack)")

    tech_categories = [
        ("Sistemas & Cloud", "Windows Server, Active Directory, Linux (Debian, Kali, Ubuntu), M365, Entra ID, VMware, Docker."),
        ("Programación & IA", "Python (Asyncio, NumPy, Pandas, Scikit-Learn), C# (.NET Core), C++, Java, APIs REST, WebSockets, Git."),
        ("Redes & Seguridad", "Cisco CyberOps, Hardening perimetral, TCP/IP, VLANs, VPNs, Wireshark, Nmap, RSA, SHA-256, UFW/iptables."),
        ("Hardware & CAD", "Diseño de PCBs (KiCad), Raspberry Pi 5, ESP32, Blender Python API, CAD paramétrico, Impresión 3D FDM.")
    ]

    card_w = (rw - 8) / 2
    card_h = 28.5
    
    for i, (cat_title, cat_skills) in enumerate(tech_categories):
        cx = rx + (i % 2) * (card_w + 8)
        cy = ry - (i // 2) * (card_h + 4.5) - card_h
        
        # Mini card with subtle technical border
        c.setFillColor(c_tag_bg)
        c.setStrokeColor(c_border_light)
        c.setLineWidth(0.6)
        c.roundRect(cx, cy, card_w, card_h, 3, fill=1, stroke=1)
        
        c.setFillColor(c_right_title)
        c.setFont("Helvetica-Bold", 6.8)
        c.drawString(cx + 6, cy + card_h - 9, cat_title.upper())
        
        c.setFillColor(c_right_body)
        c.setFont("Helvetica", 6.1)
        sk_lines = simpleSplit(cat_skills, "Helvetica", 6.1, card_w - 12)
        sk_y = cy + card_h - 17.0
        for skl in sk_lines[:2]:
            c.drawString(cx + 6, sk_y, skl)
            sk_y -= 7.4

    # Save PDF
    c.showPage()
    c.save()
    print(f"Successfully generated 1-page PDF: {out_pdf_path}")

if __name__ == "__main__":
    out_pdf = "Curriculum_Hamza_El_Fathi_Sofyani.pdf"
    build_pdf(out_pdf)
