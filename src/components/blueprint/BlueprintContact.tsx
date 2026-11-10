import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Send, Check, Download, FileText, Mail, Phone, MapPin } from 'lucide-react';
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
    <section id="contacto" className="py-16 sm:py-24 font-sans border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title Block */}
        <div className="mb-10 pb-6 border-b border-cyan-500/20">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Contacto Directo</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            ¿Hablamos de un nuevo reto?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 max-w-xl leading-relaxed">
            Disponible para puestos de ingeniería de software, arquitectura IoT, ciberseguridad o desarrollo de productos tecnológicos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Contact Details Card (2 cols) */}
          <div className="md:col-span-2 modern-card p-6 sm:p-7 rounded-2xl border border-cyan-500/20 shadow-lg space-y-5">
            <div className="pb-4 border-b border-cyan-500/15 flex items-center gap-4">
              <div className="w-14 h-16 rounded-xl border border-cyan-400/40 overflow-hidden shrink-0 shadow-md">
                <img
                  src={hamzaImg}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="font-bold text-white text-base">{PERSONAL_INFO.name}</p>
                <p className="text-cyan-400 text-xs font-mono font-medium">{PERSONAL_INFO.title}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] text-emerald-400 font-medium">Disponible para incorporación</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-medium">Correo Electrónico</span>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white hover:text-cyan-300 font-medium text-xs break-all transition-colors">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start gap-3">
                <Phone className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-medium">Teléfono / WhatsApp</span>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="text-white hover:text-cyan-300 font-medium text-xs transition-colors">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-medium">Ubicación</span>
                  <span className="text-white font-medium text-xs">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href="./Curriculum_Hamza_El_Fathi_Sofyani.pdf"
                download="Curriculum_Hamza_El_Fathi_Sofyani.pdf"
                className="flex-1 py-2.5 px-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(34,211,238,0.25)]"
              >
                <Download className="w-4 h-4" />
                <span>CV en PDF</span>
              </a>

              <a
                href="./Curriculum_Hamza_El_Fathi_Sofyani.docx"
                download="Curriculum_Hamza_El_Fathi_Sofyani.docx"
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 font-medium text-xs flex items-center justify-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>CV en Word</span>
              </a>
            </div>
          </div>

          {/* Form (3 cols) */}
          <div className="md:col-span-3 modern-card p-6 sm:p-8 rounded-2xl border border-cyan-500/20 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-2">Enviar Mensaje</h3>
            <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
              Escríbeme para colaborar, concertar una entrevista o solicitar más detalles técnicos.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {sent && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2.5">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Mensaje enviado correctamente. Me pondré en contacto contigo a la brevedad.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 text-xs font-medium mb-1.5">
                    Tu Nombre o Empresa
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/80 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 text-xs font-medium mb-1.5">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contacto@empresa.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/80 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 text-xs font-medium mb-1.5">
                  Mensaje o Propuesta
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Cuéntame sobre la posición, proyecto o propuesta técnica..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/80 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Mensaje</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
