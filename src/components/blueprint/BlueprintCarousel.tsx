import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlueprintCarouselProps {
  images: string[];
  title: string;
  className?: string;
  aspectRatio?: string;
}

export const BlueprintCarousel: React.FC<BlueprintCarouselProps> = ({
  images,
  title,
  className = '',
  aspectRatio = 'aspect-video'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const total = images.length;

  useEffect(() => {
    if (total <= 1 || isPaused) return;

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, isPaused]);

  if (total === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handleDotClick = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(idx);
  };

  return (
    <div
      className={`relative rounded border border-cyan-500/30 overflow-hidden bg-[#030914] group/carousel ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Aspect Ratio Container */}
      <div className={`relative w-full ${aspectRatio} flex items-center justify-center overflow-hidden`}>
        {images.map((imgSrc, idx) => (
          <img
            key={idx}
            src={imgSrc}
            alt={`${title} - Foto ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-0 scale-100' : 'opacity-0 -z-10 pointer-events-none'
            }`}
          />
        ))}

        {/* Technical Reticle Corners */}
        <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-cyan-400 pointer-events-none z-10" />
        <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-cyan-400 pointer-events-none z-10" />
        <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-cyan-400 pointer-events-none z-10" />
        <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-cyan-400 pointer-events-none z-10" />

        {/* Blueprint Top Badge: Calibration / Auto Indicator */}
        {total > 1 && (
          <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded bg-[#050d1a]/85 backdrop-blur-md border border-cyan-500/50 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
            <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-cyan-400 animate-ping'}`} />
            <span>{isPaused ? 'PAUSADO' : 'AUTO: 5s'}</span>
          </div>
        )}

        {/* Left Arrow Button */}
        {total > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Foto anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded bg-[#050d1a]/90 hover:bg-cyan-500 border border-cyan-500/60 hover:border-cyan-300 text-cyan-300 hover:text-black flex items-center justify-center transition-all shadow-[0_0_12px_rgba(0,0,0,0.8)] cursor-pointer active:scale-90"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}

        {/* Right Arrow Button */}
        {total > 1 && (
          <button
            onClick={handleNext}
            aria-label="Siguiente foto"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded bg-[#050d1a]/90 hover:bg-cyan-500 border border-cyan-500/60 hover:border-cyan-300 text-cyan-300 hover:text-black flex items-center justify-center transition-all shadow-[0_0_12px_rgba(0,0,0,0.8)] cursor-pointer active:scale-90"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}

        {/* Bottom Technical Indicator Bar */}
        {total > 1 && (
          <div className="absolute bottom-2 inset-x-0 z-10 flex items-center justify-between px-3 pointer-events-none">
            {/* Counter */}
            <div className="px-2 py-0.5 rounded bg-[#050d1a]/85 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono text-cyan-300 tracking-wider">
              [ 0{currentIndex + 1} / 0{total} ]
            </div>

            {/* Clickable Dots */}
            <div className="flex items-center gap-1.5 pointer-events-auto bg-[#050d1a]/85 backdrop-blur-md px-2 py-1 rounded border border-cyan-500/40">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => handleDotClick(idx, e)}
                  aria-label={`Ir a foto ${idx + 1}`}
                  className={`transition-all rounded-sm cursor-pointer ${
                    idx === currentIndex
                      ? 'w-4 h-1.5 bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]'
                      : 'w-1.5 h-1.5 bg-cyan-800/80 hover:bg-cyan-400'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
