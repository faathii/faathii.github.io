import React from 'react';
import { Moon, Sun, Terminal, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-1.5">
              Hamza
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block -mt-1 font-mono">Dev & Hardware Lab</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600 dark:text-zinc-300">
          <a href="#proyectos" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            Proyectos
          </a>
          <a href="#aptitudes" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            Aptitudes
          </a>
          <a href="#trayectoria" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            Trayectoria
          </a>
          <a href="#contacto" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            Contacto
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            aria-label="Cambiar tema"
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-zinc-700" />}
          </button>

          <a
            href="#contacto"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-zinc-950 transition-all shadow-sm hover:shadow"
          >
            <span>Hablemos</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};

