import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, hex_color):
    """Set background color of a table cell."""
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    """Set inner padding for a table cell in dxa (1 pt = 20 dxa)."""
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'''
        <w:tcMar {nsdecls("w")}>
            <w:top w:w="{top}" w:type="dxa"/>
            <w:bottom w:w="{bottom}" w:type="dxa"/>
            <w:left w:w="{left}" w:type="dxa"/>
            <w:right w:w="{right}" w:type="dxa"/>
        </w:tcMar>
    ''')
    tcPr.append(tcMar)

def remove_table_borders(table):
    """Remove all default borders from a table."""
    tblPr = table._tbl.tblPr
    tblBorders = parse_xml(f'''
        <w:tblBorders {nsdecls("w")}>
            <w:top w:val="none" w:sz="0" w:space="0" w:color="auto"/>
            <w:left w:val="none" w:sz="0" w:space="0" w:color="auto"/>
            <w:bottom w:val="none" w:sz="0" w:space="0" w:color="auto"/>
            <w:right w:val="none" w:sz="0" w:space="0" w:color="auto"/>
            <w:insideH w:val="none" w:sz="0" w:space="0" w:color="auto"/>
            <w:insideV w:val="none" w:sz="0" w:space="0" w:color="auto"/>
        </w:tblBorders>
    ''')
    tblPr.append(tblBorders)

def add_sidebar_header(cell, text):
    """Adds a stylish header in the sidebar."""
    p = cell.add_paragraph()
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.line_spacing = 1.05
    run = p.add_run(text.upper())
    run.font.name = "Arial"
    run.font.size = Pt(10)
    run.font.bold = True
    run.font.color.rgb = RGBColor(0, 188, 212) # Tech Cyan

    # Decorative line under header
    p_line = cell.add_paragraph()
    p_line.paragraph_format.space_before = Pt(0)
    p_line.paragraph_format.space_after = Pt(6)
    r_line = p_line.add_run("―" * 22)
    r_line.font.name = "Arial"
    r_line.font.size = Pt(6)
    r_line.font.color.rgb = RGBColor(30, 58, 95)

def add_main_header(cell, text):
    """Adds a stylish header in the main column."""
    p = cell.add_paragraph()
    p.paragraph_format.space_before = Pt(9)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.05
    run = p.add_run(text.upper())
    run.font.name = "Arial"
    run.font.size = Pt(11.5)
    run.font.bold = True
    run.font.color.rgb = RGBColor(15, 23, 42) # Slate 900

    # Line under header
    p_line = cell.add_paragraph()
    p_line.paragraph_format.space_before = Pt(0)
    p_line.paragraph_format.space_after = Pt(5)
    r1 = p_line.add_run("━━━")
    r1.font.name = "Arial"
    r1.font.size = Pt(8)
    r1.font.bold = True
    r1.font.color.rgb = RGBColor(6, 182, 212) # Cyan
    r2 = p_line.add_run("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    r2.font.name = "Arial"
    r2.font.size = Pt(8)
    r2.font.color.rgb = RGBColor(226, 232, 240) # Light Slate

def build_curriculum_docx(output_path):
    doc = docx.Document()
    
    # Page Setup: A4, 1.0 cm margins to give plenty of space with larger fonts
    section = doc.sections[0]
    section.page_width = Inches(8.27)  # A4 width (210 mm)
    section.page_height = Inches(11.69) # A4 height (297 mm)
    section.top_margin = Inches(0.4)
    section.bottom_margin = Inches(0.4)
    section.left_margin = Inches(0.4)
    section.right_margin = Inches(0.4)

    # Main 2-Column Table (Sidebar + Main)
    table = doc.add_table(rows=1, cols=2)
    remove_table_borders(table)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False

    col_sidebar = table.columns[0]
    col_main = table.columns[1]
    col_sidebar.width = Inches(2.45) # ~6.2 cm
    col_main.width = Inches(5.02)    # ~12.7 cm

    cell_left = table.cell(0, 0)
    cell_right = table.cell(0, 1)

    set_cell_background(cell_left, "0A1122")   # Dark Navy
    set_cell_background(cell_right, "FFFFFF")  # Pure White

    set_cell_margins(cell_left, top=140, bottom=140, left=180, right=160)
    set_cell_margins(cell_right, top=140, bottom=140, left=200, right=140)

    # =========================================================================
    # LEFT COLUMN (SIDEBAR): Photo, Contact, Education, Cisco Certs, Languages
    # =========================================================================

    # 1. Circular Photo
    photo_path = 'imagenes/hamza3_circular.png'
    if not os.path.exists(photo_path):
        photo_path = 'imagenes/hamza3.jpg'
    
    p_img = cell_left.add_paragraph()
    p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_img.paragraph_format.space_before = Pt(4)
    p_img.paragraph_format.space_after = Pt(4)
    r_img = p_img.add_run()
    r_img.add_picture(photo_path, width=Inches(1.3))

    # Status Pill
    p_status = cell_left.add_paragraph()
    p_status.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_status.paragraph_format.space_before = Pt(0)
    p_status.paragraph_format.space_after = Pt(6)
    r_status = p_status.add_run("● DISPONIBLE // INCORPORACIÓN")
    r_status.font.name = "Arial"
    r_status.font.size = Pt(7.5)
    r_status.font.bold = True
    r_status.font.color.rgb = RGBColor(16, 185, 129) # Emerald

    # 2. CONTACTO DIRECTO
    add_sidebar_header(cell_left, "Contacto Directo")

    contact_info = [
        ("UBICACIÓN", "Ávila / Madrid, España"),
        ("TELÉFONO", "+34 609 38 64 12"),
        ("EMAIL", "hamzaelfathisofyani@gmail.com"),
        ("GITHUB", "github.com/faathii"),
        ("PORTFOLIO", "faathii.github.io")
    ]
    for lbl, val in contact_info:
        p = cell_left.add_paragraph()
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.line_spacing = 1.05
        
        r_lbl = p.add_run(f"{lbl}\n")
        r_lbl.font.name = "Arial"
        r_lbl.font.size = Pt(7.5)
        r_lbl.font.bold = True
        r_lbl.font.color.rgb = RGBColor(125, 211, 252) # Light Cyan

        r_val = p.add_run(val)
        r_val.font.name = "Arial"
        r_val.font.size = Pt(8.5)
        r_val.font.color.rgb = RGBColor(241, 245, 249) # White-Slate

    # 3. FORMACIÓN ACADÉMICA
    add_sidebar_header(cell_left, "Formación Académica")

    education = [
        ("Grado en Ing. Informática", "UNED (Cursando actualmente)", "2025 - Actualidad"),
        ("Especialización Ciberseguridad", "Formación Técnica Avanzada (540h)", "2024 - 2025"),
        ("Técnico SMR (Grado Medio)", "Sistemas Microinformáticos y Redes", "2013 - 2015"),
        ("Acceso Universidad (+25)", "Prueba Oficial Superada", "2024")
    ]
    for deg, inst, yrs in education:
        p = cell_left.add_paragraph()
        p.paragraph_format.space_before = Pt(2.5)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.line_spacing = 1.05
        
        r_deg = p.add_run(f"{deg}\n")
        r_deg.font.name = "Arial"
        r_deg.font.size = Pt(9.0)
        r_deg.font.bold = True
        r_deg.font.color.rgb = RGBColor(255, 255, 255)

        r_inst = p.add_run(f"{inst}\n")
        r_inst.font.name = "Arial"
        r_inst.font.size = Pt(8.0)
        r_inst.font.italic = True
        r_inst.font.color.rgb = RGBColor(125, 211, 252)

        r_yrs = p.add_run(yrs)
        r_yrs.font.name = "Arial"
        r_yrs.font.size = Pt(7.5)
        r_yrs.font.color.rgb = RGBColor(148, 163, 184)

    # 4. CERTIFICACIONES CISCO
    add_sidebar_header(cell_left, "Certificaciones Cisco")

    cisco_certs = [
        ("Cisco CyberOps Associate", "Verified Networking Academy • SOC & Threats"),
        ("Introduction to Cybersecurity", "Verified Networking Academy • Defense")
    ]
    for c_title, c_sub in cisco_certs:
        p = cell_left.add_paragraph()
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.line_spacing = 1.05
        
        r_c = p.add_run(f"■ {c_title}\n")
        r_c.font.name = "Arial"
        r_c.font.size = Pt(8.5)
        r_c.font.bold = True
        r_c.font.color.rgb = RGBColor(255, 255, 255)

        r_sub = p.add_run(f"   {c_sub}")
        r_sub.font.name = "Arial"
        r_sub.font.size = Pt(7.5)
        r_sub.font.color.rgb = RGBColor(148, 163, 184)

    # 5 Módulos acreditados
    p_mod_title = cell_left.add_paragraph()
    p_mod_title.paragraph_format.space_before = Pt(4)
    p_mod_title.paragraph_format.space_after = Pt(1)
    r_mt = p_mod_title.add_run("5 MÓDULOS TÉCNICOS:")
    r_mt.font.name = "Arial"
    r_mt.font.size = Pt(7.5)
    r_mt.font.bold = True
    r_mt.font.color.rgb = RGBColor(125, 211, 252)

    modules = [
        "Defensa Perimetral & Firewalls (SPI)",
        "Detección de Amenazas & Malware",
        "Criptografía & Claves PKI (SHA-256)",
        "Seguridad de Redes & Conmutación",
        "Gobernanza & Protección de Activos"
    ]
    for m in modules:
        p_m = cell_left.add_paragraph()
        p_m.paragraph_format.space_before = Pt(0.5)
        p_m.paragraph_format.space_after = Pt(0)
        p_m.paragraph_format.line_spacing = 1.05
        r_chk = p_m.add_run("✓ ")
        r_chk.font.name = "Arial"
        r_chk.font.size = Pt(7.5)
        r_chk.font.bold = True
        r_chk.font.color.rgb = RGBColor(16, 185, 129)
        r_txt = p_m.add_run(m)
        r_txt.font.name = "Arial"
        r_txt.font.size = Pt(7.5)
        r_txt.font.color.rgb = RGBColor(203, 213, 225)

    # 5. IDIOMAS & APTITUDES
    add_sidebar_header(cell_left, "Idiomas & Aptitudes")
    p_lang = cell_left.add_paragraph()
    p_lang.paragraph_format.space_before = Pt(1)
    p_lang.paragraph_format.space_after = Pt(3)
    p_lang.paragraph_format.line_spacing = 1.05
    r_l1 = p_lang.add_run("• Español: ")
    r_l1.font.bold = True
    r_l1.font.size = Pt(8.5)
    r_l1.font.color.rgb = RGBColor(255, 255, 255)
    r_l2 = p_lang.add_run("Nativo\n")
    r_l2.font.size = Pt(8.5)
    r_l2.font.color.rgb = RGBColor(203, 213, 225)
    r_l3 = p_lang.add_run("• Inglés: ")
    r_l3.font.bold = True
    r_l3.font.size = Pt(8.5)
    r_l3.font.color.rgb = RGBColor(255, 255, 255)
    r_l4 = p_lang.add_run("B1 Técnico")
    r_l4.font.size = Pt(8.5)
    r_l4.font.color.rgb = RGBColor(203, 213, 225)

    p_apt = cell_left.add_paragraph()
    p_apt.paragraph_format.space_before = Pt(2)
    p_apt.paragraph_format.space_after = Pt(0)
    p_apt.paragraph_format.line_spacing = 1.1
    r_apt = p_apt.add_run("Liderazgo de equipos • Resolución de incidencias bajo alta presión • Autodidacta • Adaptación a nuevas tecnologías.")
    r_apt.font.name = "Arial"
    r_apt.font.size = Pt(7.5)
    r_apt.font.italic = True
    r_apt.font.color.rgb = RGBColor(148, 163, 184)


    # =========================================================================
    # RIGHT COLUMN: Main Heading, Profile, Projects, Experience, B.O.M. Stack
    # =========================================================================

    # 1. Main Title
    p_name = cell_right.add_paragraph()
    p_name.paragraph_format.space_before = Pt(0)
    p_name.paragraph_format.space_after = Pt(2)
    r_name = p_name.add_run("HAMZA EL FATHI SOFYANI")
    r_name.font.name = "Arial"
    r_name.font.size = Pt(22)
    r_name.font.bold = True
    r_name.font.color.rgb = RGBColor(15, 23, 42) # Slate 900

    p_sub = cell_right.add_paragraph()
    p_sub.paragraph_format.space_before = Pt(0)
    p_sub.paragraph_format.space_after = Pt(4)
    r_sub = p_sub.add_run("INGENIERO DE SISTEMAS CIBERFÍSICOS  |  EDGE AI  |  CIBERSEGURIDAD")
    r_sub.font.name = "Arial"
    r_sub.font.size = Pt(9.5)
    r_sub.font.bold = True
    r_sub.font.color.rgb = RGBColor(14, 116, 144) # Cyan/Teal

    # 2. PERFIL PROFESIONAL
    add_main_header(cell_right, "Perfil Profesional")
    
    p_prof = cell_right.add_paragraph()
    p_prof.paragraph_format.space_before = Pt(2)
    p_prof.paragraph_format.space_after = Pt(4)
    p_prof.paragraph_format.line_spacing = 1.15
    r_prof = p_prof.add_run(
        "Técnico IT e Ingeniero de Sistemas especializado en infraestructura de sistemas, ciberseguridad defensiva "
        "certificada por Cisco y creación de modelos de Inteligencia Artificial aplicados a Edge Computing (Raspberry Pi 5) "
        "y análisis de series temporales. Amplia solvencia en administración de entornos Windows Server (Active Directory), "
        "Linux, Microsoft 365 / Entra ID y virtualización. Combina ingeniería de hardware físico (diseño y ruteo de PCBs en KiCad) "
        "con desarrollo de software de alta concurrencia en Python, C# (.NET), C++ y TypeScript. Enfoque determinista en resolución "
        "de incidencias críticas, auditoría perimetral y optimización de procesos operativos."
    )
    r_prof.font.name = "Arial"
    r_prof.font.size = Pt(8.5)
    r_prof.font.color.rgb = RGBColor(51, 65, 85)

    # 3. PROYECTOS DE INGENIERÍA & INNOVACIÓN
    add_main_header(cell_right, "Proyectos de Ingeniería & Innovación")

    projects = [
        {
            "title": "iQsense 2.0 — Sistema Ciberfísico & Edge AI para Control Climático",
            "tech": "Edge AI (ONNX) • Raspberry Pi 5 • KiCad PCB 2-Capas • Python Daemon • Telemetría",
            "desc": "Modelo de IA entrenado para predicción en tiempo real de Déficit de Presión de Vapor (VPD) e inercia térmica (<18ms). Placa PCB dedicada acoplada al GPIO, telemetría continua de 12 sensores radiculares y control proactivo de 13 actuadores físicos."
        },
        {
            "title": "HFS-Sentry — Suite Modular de Ciberseguridad & Diagnóstico Perimetral",
            "tech": "Pure Python 3 (Zero Dependencies) • Sockets Asíncronos • ThreadPool • UFW / iptables",
            "desc": "Ecosistema táctico de 7 herramientas: escaneo de puertos concurrente con banner grabbing, ingesta forense de logs SSH con script de bloqueo activo, verificación X.509/TLS, sweep ARP/ICMP y monitor FIM con hashes SHA-256."
        },
        {
            "title": "CryptoQuant — Motor Cuantitativo de Trading & IA Predictiva",
            "tech": "Machine Learning • Series Temporales (OHLCV) • Validación Walk-Forward • Node.js • WebSockets",
            "desc": "Entrenamiento de modelos supervisados sobre millones de ticks de series temporales financieras. Feature engineering de 45 variables estocásticas por vela, erradicación de look-ahead bias y ejecución de baja latencia."
        },
        {
            "title": "OmniStream — Agregador Unificado de Streaming & Deep Linking",
            "tech": "Python Desktop • pywebview Bridge • TMDb API • Custom URI Protocol • PyInstaller .exe",
            "desc": "App de escritorio que unifica el catálogo legal de 9 plataformas en España (Netflix, Prime, etc.) con resolución nativa de protocolos URI de escritorio (nflx://) y empaquetado autónomo con wizard de instalación."
        }
    ]

    for p in projects:
        p_proj = cell_right.add_paragraph()
        p_proj.paragraph_format.space_before = Pt(3)
        p_proj.paragraph_format.space_after = Pt(0)
        p_proj.paragraph_format.line_spacing = 1.1
        
        r_pt = p_proj.add_run(f"• {p['title']}\n")
        r_pt.font.name = "Arial"
        r_pt.font.size = Pt(9.2)
        r_pt.font.bold = True
        r_pt.font.color.rgb = RGBColor(15, 23, 42)

        r_ptech = p_proj.add_run(f"  Tecnologías: {p['tech']}\n")
        r_ptech.font.name = "Arial"
        r_ptech.font.size = Pt(7.8)
        r_ptech.font.bold = True
        r_ptech.font.color.rgb = RGBColor(14, 116, 144)

        r_pdesc = p_proj.add_run(f"  {p['desc']}")
        r_pdesc.font.name = "Arial"
        r_pdesc.font.size = Pt(8.2)
        r_pdesc.font.color.rgb = RGBColor(51, 65, 85)

    # 4. EXPERIENCIA PROFESIONAL & LIDERAZGO
    add_main_header(cell_right, "Experiencia Profesional & Liderazgo")

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
        p_exp = cell_right.add_paragraph()
        p_exp.paragraph_format.space_before = Pt(3)
        p_exp.paragraph_format.space_after = Pt(1)
        p_exp.paragraph_format.line_spacing = 1.1
        
        r_er = p_exp.add_run(f"• {exp['role']}  ")
        r_er.font.name = "Arial"
        r_er.font.size = Pt(9.0)
        r_er.font.bold = True
        r_er.font.color.rgb = RGBColor(15, 23, 42)

        r_ec = p_exp.add_run(f"| {exp['company']} ({exp['period']})")
        r_ec.font.name = "Arial"
        r_ec.font.size = Pt(8.2)
        r_ec.font.italic = True
        r_ec.font.color.rgb = RGBColor(14, 116, 144)

        for pt in exp["points"]:
            p_pt = cell_right.add_paragraph()
            p_pt.paragraph_format.space_before = Pt(0)
            p_pt.paragraph_format.space_after = Pt(1)
            p_pt.paragraph_format.line_spacing = 1.1
            r_b = p_pt.add_run("   ▪ ")
            r_b.font.name = "Arial"
            r_b.font.size = Pt(7.5)
            r_b.font.bold = True
            r_b.font.color.rgb = RGBColor(6, 182, 212)
            r_ptxt = p_pt.add_run(pt)
            r_ptxt.font.name = "Arial"
            r_ptxt.font.size = Pt(8.2)
            r_ptxt.font.color.rgb = RGBColor(51, 65, 85)

    # 5. COMPETENCIAS TÉCNICAS (B.O.M. STACK)
    add_main_header(cell_right, "Competencias Técnicas (B.O.M. Stack)")

    tech_stack = [
        ("Sistemas & Cloud:", "Windows Server, Active Directory, Linux (Debian, Kali, Ubuntu), M365, Entra ID, VMware, Docker."),
        ("Programación & IA:", "Python (Asyncio, NumPy, Pandas, Scikit-Learn), C# (.NET Core), C++, Java, APIs REST, WebSockets, Git."),
        ("Redes & Seguridad:", "Cisco CyberOps, Hardening perimetral, TCP/IP, VLANs, VPNs, Wireshark, Nmap, RSA, SHA-256, UFW/iptables."),
        ("Hardware & CAD:", "Diseño de PCBs (KiCad), Raspberry Pi 5, ESP32, Blender Python API, CAD paramétrico, Impresión 3D FDM.")
    ]

    for cat_name, cat_desc in tech_stack:
        p_t = cell_right.add_paragraph()
        p_t.paragraph_format.space_before = Pt(1.5)
        p_t.paragraph_format.space_after = Pt(0.5)
        p_t.paragraph_format.line_spacing = 1.1
        
        r_cn = p_t.add_run(f"▪ {cat_name} ")
        r_cn.font.name = "Arial"
        r_cn.font.size = Pt(8.2)
        r_cn.font.bold = True
        r_cn.font.color.rgb = RGBColor(14, 116, 144)

        r_cd = p_t.add_run(cat_desc)
        r_cd.font.name = "Arial"
        r_cd.font.size = Pt(8.0)
        r_cd.font.color.rgb = RGBColor(51, 65, 85)

    doc.save(output_path)
    print(f"Word Document successfully saved to {output_path}")

if __name__ == "__main__":
    out_docx = "Curriculum_Hamza_El_Fathi_Sofyani.docx"
    build_curriculum_docx(out_docx)
