import { useState, useEffect } from 'react';
import { BookPortfolio } from './components/book/BookPortfolio';
import { CinematicShowcase } from './components/showcase/CinematicShowcase';
import { BookOpen } from 'lucide-react';

export function App() {
  const [viewMode, setViewMode] = useState<'showcase' | 'book'>('showcase');

  // Allow pressing 'B' to toggle 3D book mode anytime
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'b' || e.key === 'B') {
        setViewMode((prev) => (prev === 'showcase' ? 'book' : 'showcase'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {viewMode === 'book' ? (
        <BookPortfolio onBackToDeck={() => setViewMode('showcase')} />
      ) : (
        <>
          <CinematicShowcase onOpenBook={() => setViewMode('book')} />

          {/* Floating Pill in Bottom-Right Corner for Direct 3D Book Launch */}
          <button
            onClick={() => setViewMode('book')}
            className="fixed bottom-12 right-6 z-50 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2.5 shadow-[0_10px_35px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-300"
            title="Abrir Monografía Técnica en Libro Físico 3D (Atajo: tecla B)"
          >
            <BookOpen className="w-4 h-4 text-slate-950" />
            <span className="hidden sm:inline">Ver en Libro 3D</span>
            <span className="sm:hidden">Libro 3D</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950/20 text-slate-950 font-bold">
              EXTRA
            </span>
          </button>
        </>
      )}
    </>
  );
}

export default App;
