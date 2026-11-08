import { useState } from 'react';
import { BlueprintHeader } from './components/blueprint/BlueprintHeader';
import { BlueprintHero } from './components/blueprint/BlueprintHero';
import { TerminalSection } from './components/TerminalSection';
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
    <div className="min-h-screen blueprint-grid text-zinc-100 flex flex-col font-mono selection:bg-cyan-500 selection:text-black pb-16 sm:pb-0">
      {/* Blueprint Technical Header */}
      <BlueprintHeader onOpenCv={() => setIsResumeOpen(true)} />

      <main className="flex-grow">
        {/* Engineering Title Block & Hero */}
        <BlueprintHero onOpenCv={() => setIsResumeOpen(true)} />

        {/* Embedded CLI Terminal for System Calibration */}
        <TerminalSection />

        {/* Blueprint Specifications & Projects */}
        <BlueprintProjects />

        {/* B.O.M. (Bill of Materials & Skills Inventory) */}
        <BlueprintBOM />

        {/* Technical Revision History & Academic Records */}
        <BlueprintHistory />

        {/* Communication & Direct Contact */}
        <BlueprintContact />
      </main>

      {/* Blueprint Footer */}
      <BlueprintFooter />

      {/* Quick Tablet Dock */}
      <FloatingDock onOpenResume={() => setIsResumeOpen(true)} />

      {/* Official Curriculum / Datasheet Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}

export default App;
