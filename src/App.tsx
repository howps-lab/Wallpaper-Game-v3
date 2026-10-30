/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import HeroCharacter from './components/HeroCharacter';
import ParticleEffects from './components/ParticleEffects';
import Navigation from './components/Navigation';
import GameTitle from './components/GameTitle';
import CalligraphyFocus from './components/CalligraphyFocus';
import StorySection from './components/StorySection';
import RealmsSection, { Realm } from './components/RealmsSection';
import CelestialOathSection from './components/CelestialOathSection';
import FinalCtaSection from './components/FinalCtaSection';
import LoreModal from './components/LoreModal';

export default function App() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isLoreModalOpen, setIsLoreModalOpen] = useState(false);
  const [selectedRealmForModal, setSelectedRealmForModal] =
    useState<Realm | null>(null);

  // Parallax tracking with gentle damping
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const normX = (e.clientX / innerWidth) * 2 - 1;
    const normY = (e.clientY / innerHeight) * 2 - 1;
    setMouseOffset({ x: normX, y: normY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnterWorld = () => {
    setIsLoreModalOpen(true);
  };

  const handleRealmSelect = (realm: Realm) => {
    setSelectedRealmForModal(realm);
    setIsLoreModalOpen(true);
  };

  return (
    <div className="relative min-h-screen text-[#ede8db] font-serif overflow-x-hidden selection:bg-amber-600/30 selection:text-amber-200">
      {/* 1. Global Fixed Background Video (z-0) */}
      <BackgroundVideo />

      {/* 2. Global Atmospheric Particles & Mist (z-10) */}
      <ParticleEffects />

      {/* 3. Top Navigation (z-50) */}
      <Navigation
        onNavigate={scrollToSection}
        onEnterWorld={handleEnterWorld}
      />

      {/* 4. Full-Screen Cinematic Opening Viewport (z-20) */}
      <main className="relative z-20 min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Game Title & Official Subtitle */}
        <GameTitle />

        {/* Central Animating Calligraphy Focus on top of Background Video */}
        <CalligraphyFocus />

        {/* Independent Foreground Hero Warrior Component */}
        <HeroCharacter mouseOffset={mouseOffset} />

        {/* Discover the Legend Prompt / Scroll Indicator */}
        <button
          onClick={() => scrollToSection('legend')}
          className="relative z-30 pb-6 flex flex-col items-center select-none cursor-pointer group pointer-events-auto transition-transform hover:-translate-y-0.5 active:translate-y-0"
          aria-label="Discover the Legend"
        >
          <span className="font-display text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#fff5dc] font-semibold group-hover:text-[#ffd700] mb-2 transition-colors subtitle-defined">
            DISCOVER THE LEGEND
          </span>
          <div className="w-5 h-8 rounded-full border border-[#d4af37]/50 group-hover:border-[#d4af37] flex items-start justify-center p-1 transition-colors bg-black/20 backdrop-blur-xs">
            <div className="w-1 h-2 bg-[#d4af37] rounded-full animate-bounce" />
          </div>
        </button>
      </main>

      {/* 5. Cinematic Lore & Story Section */}
      <StorySection />

      {/* 6. The Realms Beyond The Clouds */}
      <RealmsSection onSelectRealm={handleRealmSelect} />

      {/* 7. The Celestial Oath Themes */}
      <CelestialOathSection />

      {/* 8. Final Call To Action */}
      <FinalCtaSection
        onEnterWorld={handleEnterWorld}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* 9. Interactive Lore & Sanctum Codex Modal */}
      <LoreModal
        isOpen={isLoreModalOpen}
        onClose={() => {
          setIsLoreModalOpen(false);
          setSelectedRealmForModal(null);
        }}
        initialRealm={selectedRealmForModal}
      />
    </div>
  );
}
