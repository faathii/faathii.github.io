import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Copy, Check, Send, MessageSquare, Phone, MapPin, Mail, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contacto" className="py-20 md:py-28 relative bg-zinc-50/50 dark:bg-zinc-950/60 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3 border border-emerald-500/20">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contacto Profesional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            ¿Hablamos sobre tu proyecto o equipo?
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 max-w-lg">
            Disponible para puestos de Ingeniería de Sistemas, Ciberseguridad, IoT y desarrollo de software de alta fiabilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Direct Info (2 cols) */}
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
                Información de Contacto
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Email Directo</span>
                  </p>
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/60 dark:border-zinc-700/60">
                    <span className="text-xs font-mono text-zinc-800 dark:text-zinc-200 truncate">
                      {PERSONAL_INFO.email}
                    </span>
                    <button
                      onClick={handleCopyEmail}
                      aria-label="Copiar email"
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shrink-0 cursor-pointer"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Teléfono</span>
                  </p>
                  <p className="text-sm font-mono font-medium text-zinc-800 dark:text-zinc-200 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/60 dark:border-zinc-700/60">
                    {PERSONAL_INFO.phone}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Ubicación</span>
                  </p>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {PERSONAL_INFO.location}
                  </p>
                </div>
              </div>

              {/* CV Download banner */}
              <div className="pt-5 mt-5 border-t border-zinc-100 dark:border-zinc-800">
                <a
                  href="./Curriculum_Hamza_El_Fathi_Sofyani.pdf"
                  download="Curriculum_Hamza_El_Fathi_Sofyani.pdf"
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Descargar Curriculum PDF</span>
                </a>
              </div>

              {/* Social Channels */}
              <div className="pt-4 flex gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-750 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-750 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-500" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form (3 cols) */}
          <div className="md:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4"
            >
              {sent && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>¡Mensaje recibido! Te responderé lo antes posible.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Tu Nombre
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Laura Martínez"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Tu Correo
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="laura@empresa.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Mensaje o Consulta
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Cuéntame sobre la posición, proyecto o idea que quieres comentar..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl font-semibold text-sm text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-zinc-950 transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
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
