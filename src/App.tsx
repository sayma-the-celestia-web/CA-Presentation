import { BackgroundCanvas } from './components/BackgroundCanvas';
import { HeroSection } from './components/HeroSection';
import { SpeedGapSection } from './components/SpeedGapSection';
import { HierarchySection } from './components/HierarchySection';
import { MultiLevelSection } from './components/MultiLevelSection';
import { RequestSimulator } from './components/RequestSimulator';
import { MappingSection } from './components/MappingSection';
import { QuizSection } from './components/QuizSection';
import { SummarySection } from './components/SummarySection';
import { Navigation } from './components/Navigation';

export default function App() {
  return (
    <div className="relative min-h-screen selection:bg-[#0984E3] selection:text-white">
      <BackgroundCanvas />
      <Navigation />
      <main className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24 pb-24">
        <HeroSection id="hero" />
        <SpeedGapSection id="why-cache" />
        <HierarchySection id="hierarchy" />
        <MultiLevelSection id="cache-levels" />
        <RequestSimulator id="cache-operation" />
        <MappingSection id="mapping" />
        <QuizSection id="quiz" />
        <SummarySection id="summary" />
      </main>
    </div>
  )
}
