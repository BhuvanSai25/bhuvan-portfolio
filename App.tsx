import React from 'react';
import Navbar from './components/Layout/Navbar';
import Hero from './components/sections/Hero';
import SkillsMarquee from './components/ui/SkillsMarquee';
import CodingBadges from './components/sections/CodingBadges';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';
import StarBackground from './components/ui/StarBackground';
import GlowCursor from './components/ui/GlowCursor';

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30">
      {/* Background elements */}
      <StarBackground />
      <GlowCursor />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content Sections */}
      <main className="relative z-20">
        <Hero />
        <SkillsMarquee />
        <CodingBadges />
        <Experience />
        <Certifications />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;