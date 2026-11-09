import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Send, Check, Download } from 'lucide-react';
import hamzaImg from '../../assets/hamza.jpg';

export const BlueprintContact: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contacto" className="py-16 sm:py-24 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title Block */}
        <div className="mb-10 pb-6 border-b border-cyan-500/20">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold mb-2">
            <span className="w-2 h-2 bg-cyan-400" />
            <span>HOJA 05 // CANAL DE COMUNICACIÓN & DATOS DE CONTACTO</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            ESTABLECER CONTACTO TÉCNICO
          </h2>
          <p className="text-xs sm:text-sm text-cyan-200/70 mt-1 max-w-xl font-sans sm:font-mono">
            Disponible para puestos de ingeniería de sistemas, arquitectura de software, IoT y ciberseguridad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Engineering Title Block Card (2 cols) */}
          <div className="md:col-span-2 blueprint-card p-6 rounded-lg border border-cyan-500/40 space-y-5 text-xs">
            <div className="pb-3 border-b border-cyan-500/20 flex items-center gap-3.5">
              <div className="w-12 h-16 rounded border border-cyan-400/50 overflow-hidden shrink-0 shadow-sm">
                <img
                  src={hamzaImg}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest block">
                  CANAL DE TRANSMISIÓN OFICIAL
                </span>
                <p className="font-bold text-white text-sm mt-0.5">{PERSONAL_INFO.name}</p>
                <p className="text-cyan-400 text-[11px]">{PERSONAL_INFO.title}</p>
              </div>
            </div>

            <div className="space-y-3 font-mono">
              <div className="p-3 bg-cyan-950/40 border border-cyan-500/20 rounded">
                <span className="text-[10px] text-cyan-500 uppercase block mb-1">CORREO ELECTRÓNICO</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white hover:text-cyan-300 font-bold break-all">
                  {PERSONAL_INFO.email}
                </a>
              </div>

              <div className="p-3 bg-cyan-950/40 border border-cyan-500/20 rounded">
                <span className="text-[10px] text-cyan-500 uppercase block mb-1">TELÉFONO // WHATSAPP</span>
                <span className="text-white font-bold">{PERSONAL_INFO.phone}</span>
              </div>

              <div className="p-3 bg-cyan-950/40 border border-cyan-500/20 rounded">
                <span className="text-[10px] text-cyan-500 uppercase block mb-1">BASE OPERATIVA</span>
                <span className="text-white font-bold">{PERSONAL_INFO.location}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="./Curriculum_Hamza_El_Fathi_Sofyani.pdf"
                download="Curriculum_Hamza_El_Fathi_Sofyani.pdf"
                className="w-full py-2.5 px-3 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(34,211,238,0.3)]"
              >
                <Download className="w-4 h-4" />
                <span>DESCARGAR CURRICULUM EN PDF</span>
              </a>
            </div>
          </div>

          {/* Form (3 cols) */}
          <div className="md:col-span-3 blueprint-card p-6 sm:p-8 rounded-lg border border-cyan-500/40">
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              {sent && (
                <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>TRANSMISIÓN EXITOSA: El mensaje se ha recibido correctamente.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-cyan-400 text-[11px] mb-1.5 uppercase tracking-wider">
                    REMITENTE / NOMBRE
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ING. / EMPRESA"
                    className="w-full px-3 py-2 rounded bg-cyan-950/40 border border-cyan-500/40 text-white placeholder-cyan-700 text-xs focus:outline-none focus:border-cyan-300"
                  />
                </div>

                <div>
                  <label className="block text-cyan-400 text-[11px] mb-1.5 uppercase tracking-wider">
                    DIRECCIÓN DE RESPUESTA / EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contacto@empresa.com"
                    className="w-full px-3 py-2 rounded bg-cyan-950/40 border border-cyan-500/40 text-white placeholder-cyan-700 text-xs focus:outline-none focus:border-cyan-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-cyan-400 text-[11px] mb-1.5 uppercase tracking-wider">
                  MEMORIA TÉCNICA / MENSAJE
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detalles sobre el proyecto, propuesta o consulta..."
                  className="w-full px-3 py-2 rounded bg-cyan-950/40 border border-cyan-500/40 text-white placeholder-cyan-700 text-xs focus:outline-none focus:border-cyan-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded bg-cyan-950 border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>DESPACHAR MENSAJE DE CONTACTO</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
