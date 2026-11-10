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
            className="fixed bottom-4 right-4 z-50 px-3.5 py-2 rounded-xl bg-[#14161f]/95 hover:bg-[#1a1d29] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-orange-500/50"
            title="Abrir Monografía Técnica en Libro Físico 3D (Atajo: tecla B)"
          >
            <BookOpen className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">Ver Libro 3D</span>
            <span className="sm:hidden">3D</span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-300 font-bold border border-orange-500/30">
              EXTRA
            </span>
          </button>
        </>
      )}
    </>
  );
}

export default App;
