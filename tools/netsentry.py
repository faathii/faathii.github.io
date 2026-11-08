#!/usr/bin/env python3
"""
=============================================================================
  NETSENTRY v1.0 — Fast Concurrent Port Scanner & HTTP Hardening Auditor
  Autor: Hamza El Fathi Sofyani
  Acreditación: Certificado en Ciberseguridad | Cisco Networking Academy
  Descripción: Herramienta de auditoría perimetral de red desarrollada en
               Python puro (sin dependencias externas). Utiliza hilos
               concurrentes para descubrimiento de servicios y análisis
               estático de cabeceras de seguridad web.
=============================================================================
"""

import socket
import ssl
import sys
import time
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor
from typing import Dict, List, Tuple

# ANSI Colors for Professional Terminal Output
class Colors:
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    MAGENTA = '\033[95m'
    WHITE = '\033[97m'
    GRAY = '\033[90m'
    BOLD = '\033[1m'
    RESET = '\033[0m'

COMMON_PORTS = {
    21: "FTP (File Transfer)",
    22: "SSH (Secure Shell)",
    23: "TELNET (Unencrypted - Insecure!)",
    25: "SMTP (Mail)",
    53: "DNS (Domain Name System)",
    80: "HTTP (Web Plaintext)",
    110: "POP3 (Mail)",
    143: "IMAP (Mail)",
    443: "HTTPS (Web SSL/TLS)",
    3306: "MySQL Database",
    5432: "PostgreSQL Database",
    6379: "Redis Cache Server",
    8080: "HTTP-Proxy / Dev Web",
    8443: "HTTPS-Alt / Admin Panel"
}

SECURITY_HEADERS = [
    ("Strict-Transport-Security", "Protección contra ataques Downgrade y MitM"),
    ("Content-Security-Policy", "Mitigación de Cross-Site Scripting (XSS) e inyecciones"),
    ("X-Frame-Options", "Prevención de secuestro de clics (Clickjacking)"),
    ("X-Content-Type-Options", "Prevención de MIME-sniffing"),
    ("Referrer-Policy", "Control de filtración de metadatos en peticiones salientes"),
    ("Permissions-Policy", "Restricción de APIs del navegador (Cámara, Mic, Geo)")
]

def print_banner(target: str):
    print(f"\n{Colors.CYAN}{Colors.BOLD}╔═════════════════════════════════════════════════════════════════════════╗")
    print(f"║   NETSENTRY v1.0 // AUDITORÍA PERIMETRAL DE RED & HARDENING HTTP        ║")
    print(f"║   Ingeniería de Sistemas & Ciberseguridad — Cisco Certified Academy     ║")
    print(f"╚═════════════════════════════════════════════════════════════════════════╝{Colors.RESET}")
    print(f"{Colors.GRAY}[*] Objetivo de análisis :{Colors.RESET} {Colors.WHITE}{Colors.BOLD}{target}{Colors.RESET}")
    print(f"{Colors.GRAY}[*] Protocolo de sondeo  :{Colors.RESET} TCP Connect con ThreadPoolExecutor")
    print(f"{Colors.GRAY}[*] Marca temporal       :{Colors.RESET} {time.strftime('%Y-%m-%d %H:%M:%S')}\n")

def scan_port(target: str, port: int, timeout: float = 1.0) -> Tuple[int, bool, str]:
    """Prueba de conexión TCP al puerto objetivo con banner grabbing básico."""
    service_name = COMMON_PORTS.get(port, "Desconocido")
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(timeout)
            result = s.connect_ex((target, port))
            if result == 0:
                banner = ""
                # Intento de lectura de banner rápido
                try:
                    s.settimeout(0.5)
                    s.sendall(b"HEAD / HTTP/1.0\r\n\r\n")
                    raw = s.recv(128).decode('utf-8', errors='ignore')
                    first_line = raw.splitlines()[0] if raw else ""
                    if first_line:
                        banner = f" [{first_line[:30]}]"
                except Exception:
                    pass
                return (port, True, f"{service_name}{banner}")
    except Exception:
        pass
    return (port, False, service_name)

def audit_http_headers(target: str) -> Dict[str, any]:
    """Audita cabeceras de seguridad HTTP/HTTPS si el puerto web está abierto."""
    urls = [f"https://{target}", f"http://{target}"]
    for url in urls:
        try:
            req = urllib.request.Request(
                url,
                headers={"User-Agent": "NetSentry-Audit-Tool/1.0 (Security Scanner)"}
            )
            # Desactivar verificación estricta para pruebas de laboratorios con cert autofirmado
            ctx = ssl.create_default_context()
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE

            with urllib.request.urlopen(req, timeout=3.0, context=ctx) as response:
                headers = dict(response.info().items())
                return {"active_url": url, "headers": headers, "error": None}
        except urllib.error.HTTPError as e:
            return {"active_url": url, "headers": dict(e.headers.items()), "error": None}
        except Exception as e:
            continue
    return {"active_url": None, "headers": {}, "error": "Servicio HTTP no accesible"}

def evaluate_security_headers(headers: Dict[str, str]) -> Tuple[int, List[Dict[str, str]]]:
    """Evalúa la presencia de cabeceras de hardening y calcula la puntuación."""
    results = []
    found_count = 0
    lower_headers = {k.lower(): v for k, v in headers.items()}

    for header, desc in SECURITY_HEADERS:
        val = lower_headers.get(header.lower())
        if val:
            found_count += 1
            results.append({"header": header, "status": "PRESENTE", "val": val[:40], "desc": desc})
        else:
            results.append({"header": header, "status": "AUSENTE", "val": "NO CONFIGURADO", "desc": desc})

    score = int((found_count / len(SECURITY_HEADERS)) * 100)
    return score, results

def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "127.0.0.1"

    # Resolver IP si se introdujo un hostname
    try:
        target_ip = socket.gethostbyname(target)
    except socket.gaierror:
        print(f"{Colors.RED}[!] Error: No se puede resolver el host '{target}'{Colors.RESET}")
        sys.exit(1)

    print_banner(f"{target} ({target_ip})")

    # Fase 1: Escaneo de Puertos Concurrente
    print(f"{Colors.BOLD}{Colors.CYAN}--- [FASE 1: DESCUBRIMIENTO DE PUERTOS & SERVICIOS] ---{Colors.RESET}")
    start_time = time.time()
    open_ports = []

    with ThreadPoolExecutor(max_workers=20) as executor:
        futures = [executor.submit(scan_port, target_ip, port) for port in sorted(COMMON_PORTS.keys())]
        for future in futures:
            port, is_open, desc = future.result()
            if is_open:
                open_ports.append((port, desc))
                # Telnet o puertos inseguros alertan en rojo
                color = Colors.RED if port in (21, 23) else Colors.GREEN
                print(f"  {Colors.BOLD}{color}[+] Puerto {port:5d}/TCP ABIERTO{Colors.RESET} -> {Colors.WHITE}{desc}{Colors.RESET}")

    elapsed = time.time() - start_time
    if not open_ports:
        print(f"  {Colors.GRAY}[i] No se detectaron puertos estándar abiertos en este rango.{Colors.RESET}")
    print(f"\n{Colors.GRAY}[*] Escaneo de {len(COMMON_PORTS)} puertos completado en {elapsed:.2f}s.{Colors.RESET}\n")

    # Fase 2: Auditoría de Cabeceras Web (si aplica)
    has_web = any(p in [80, 443, 8080, 8443] for p, _ in open_ports)
    if has_web or target != "127.0.0.1":
        print(f"{Colors.BOLD}{Colors.CYAN}--- [FASE 2: AUDITORÍA DE CABECERAS HTTP / HARDENING] ---{Colors.RESET}")
        audit = audit_http_headers(target)
        if audit["active_url"]:
            print(f"  {Colors.WHITE}Servicio web inspeccionado:{Colors.RESET} {Colors.BOLD}{audit['active_url']}{Colors.RESET}")
            score, header_results = evaluate_security_headers(audit["headers"])

            # Calificación
            if score >= 80:
                grade_color, grade = Colors.GREEN, "GRADO A (Seguridad Alta)"
            elif score >= 50:
                grade_color, grade = Colors.YELLOW, "GRADO B (Seguridad Media / Mejorable)"
            else:
                grade_color, grade = Colors.RED, "GRADO F (Riesgo Elevado / Vulnerable a XSS/Clickjacking)"

            print(f"  {Colors.WHITE}Puntuación de Hardening:{Colors.RESET} {grade_color}{Colors.BOLD}{score}/100 — {grade}{Colors.RESET}\n")

            print(f"  {'CABECERA':<30} {'ESTADO':<12} {'DETALLE':<35}")
            print(f"  {'-'*30} {'-'*12} {'-'*35}")
            for res in header_results:
                st_color = Colors.GREEN if res["status"] == "PRESENTE" else Colors.RED
                print(f"  {res['header']:<30} {st_color}{res['status']:<12}{Colors.RESET} {res['desc']:<35}")
        else:
            print(f"  {Colors.GRAY}[i] No se detectó un servicio HTTP/HTTPS activo para auditar cabeceras.{Colors.RESET}")

    # Fase 3: Directrices de Remediación
    print(f"\n{Colors.BOLD}{Colors.CYAN}--- [FASE 3: RECOMENDACIONES DE HARDENING // DIRECTRICES CISCO] ---{Colors.RESET}")
    if any(p in (21, 23) for p, _ in open_ports):
        print(f"  {Colors.RED}[!] ALERTA CRÍTICA: Deshabilitar servicios de texto plano (Telnet/FTP). Migrar a SSH/SFTP.{Colors.RESET}")
    if open_ports:
        ports_str = " ".join(str(p) for p, _ in open_ports if p not in (80, 443))
        if ports_str:
            print(f"  {Colors.YELLOW}[*] Regla UFW recomendada:{Colors.RESET} sudo ufw default deny incoming && sudo ufw allow 22/tcp")
    print(f"  {Colors.GREEN}[✓] Inspección finalizada sin disrupción de servicio.{Colors.RESET}\n")

if __name__ == "__main__":
    main()
