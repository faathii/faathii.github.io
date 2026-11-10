import { useState } from 'react';
import { BlueprintHeader } from './components/blueprint/BlueprintHeader';
import { BlueprintHero } from './components/blueprint/BlueprintHero';
import { TechExplorer } from './components/TechExplorer';
import { BlueprintProjects } from './components/blueprint/BlueprintProjects';
import { BlueprintBOM } from './components/blueprint/BlueprintBOM';
import { BlueprintHistory } from './components/blueprint/BlueprintHistory';
import { BlueprintContact } from './components/blueprint/BlueprintContact';
import { BlueprintFooter } from './components/blueprint/BlueprintFooter';
import { ResumeModal } from './components/ResumeModal';
import { FloatingDock } from './components/FloatingDock';

export function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen modern-bg text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black pb-16 sm:pb-0">
      {/* Modern Header */}
      <BlueprintHeader onOpenCv={() => setIsResumeOpen(true)} />

      <main className="flex-grow">
        {/* Executive Hero */}
        <BlueprintHero onOpenCv={() => setIsResumeOpen(true)} />

        {/* Interactive 4-Pillars Tech Explorer */}
        <TechExplorer />

        {/* Featured Projects with Live 5s Carousel */}
        <BlueprintProjects />

        {/* Technical Skills Stack */}
        <BlueprintBOM />

        {/* Trayectoria & Formación */}
        <BlueprintHistory />

        {/* Direct Contact */}
        <BlueprintContact />
      </main>

      {/* Footer */}
      <BlueprintFooter />

      {/* Floating Quick Dock */}
      <FloatingDock onOpenResume={() => setIsResumeOpen(true)} />

      {/* Official Curriculum Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}

export default App;
