import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface HeroCharacterProps {
  mouseOffset?: { x: number; y: number };
  isParallaxActive?: boolean;
}

const HEROES = [
  {
    id: 'hero-immortal',
    name: 'Celestial Immortal Warrior',
    src: '/images/hero-warrior.webp',
    alt: 'Celestial Immortal Warrior looking out at the sacred mountain peaks',
  },
  {
    id: 'heroine-celestial',
    name: 'Celestial Heroine',
    src: '/images/heroine-warrior.webp',
    alt: 'Celestial Heroine with divine sword and flowing robes looking out at the sacred mountain peaks',
  },
  {
    id: 'dark-mage',
    name: 'Shadow Crimson Mage',
    src: '/images/dark-mage.webp',
    alt: 'Shadow Crimson Mage with hooded dark robes and fiery staff upon the sacred summit',
  },
  {
    id: 'monk-warrior',
    name: 'Dragon Crest Monk Warrior',
    src: '/images/monk-warrior.webp',
    alt: 'Dragon Crest Monk Warrior standing victorious upon the sacred summit with flowing red sash',
  },
  {
    id: 'celestial-archer',
    name: 'Moonlit Feather Archer',
    src: '/images/celestial-archer.webp',
    alt: 'Moonlit Feather Archer with golden winged bow and flowing white silk robes upon the sacred summit',
  },
  {
    id: 'vermilion-heroine',
    name: 'Vermilion Lotus Swordswoman',
    src: '/images/celestial-heroine.webp',
    alt: 'Vermilion Lotus Swordswoman with ornate sheathed blade upon lotus altar on the sacred summit',
  },
  {
    id: 'guandao-general',
    name: 'Dragon Glaive Warlord',
    src: '/assets/aistudio/guandao-warrior_36e30cd0.webp',
    alt: 'Dragon Glaive Warlord with celestial guandao polearm and flowing crimson cape atop the mountain peak',
  },
  {
    id: 'spear-heroine',
    name: 'Silver Frost Spear Maiden',
    src: '/assets/aistudio/spear-warrior_a339063e.webp',
    alt: 'Silver Frost Spear Maiden in golden armor with red-tasseled spear and billowing white cloak upon lotus altar',
  },
  {
    id: 'flame-blade-master',
    name: 'Blazing Sun Blade Master',
    src: '/assets/aistudio/blade-warrior_694eeb67.webp',
    alt: 'Blazing Sun Blade Master with flaming celestial saber and flowing crimson cape atop the summit rock',
  },
];

export default function HeroCharacter({
  mouseOffset = { x: 0, y: 0 },
  isParallaxActive = true,
}: HeroCharacterProps) {
  // Store [currentIndex, direction] where direction is 1 (next / right) or -1 (prev / left)
  const [[currentHeroIndex, direction], setHeroState] = useState<[number, number]>([0, 1]);
  const [imageError, setImageError] = useState(false);

  // Preload all hero assets for instantaneous, seamless switching
  useEffect(() => {
    HEROES.forEach((hero) => {
      const img = new Image();
      img.src = hero.src;
    });
  }, []);

  // Foreground parallax movement
  const parallaxX = isParallaxActive ? mouseOffset.x * 22 : 0;
  const parallaxY = isParallaxActive ? mouseOffset.y * 12 : 0;

  const handleNextHero = useCallback(() => {
    setHeroState(([prev]) => [(prev + 1) % HEROES.length, 1]);
  }, []);

  const handlePrevHero = useCallback(() => {
    setHeroState(([prev]) => [(prev - 1 + HEROES.length) % HEROES.length, -1]);
  }, []);

  // Keyboard navigation: ArrowRight / ArrowLeft to rotate hero
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if focus is inside an input, textarea, or editable element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextHero();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevHero();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNextHero, handlePrevHero]);

  const currentHero = HEROES[currentHeroIndex];

  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-end items-end pointer-events-none select-none z-20 overflow-hidden h-[60vh] md:h-[84vh] lg:h-[88vh] pr-0 sm:pr-4 md:pr-10 lg:pr-14 xl:pr-16 -mr-2 sm:mr-0">
      {/* Hero Switcher: Compact dual-arrow control with prominent touch targets and no text */}
      <div className="absolute top-[6%] sm:top-[8%] md:top-[10%] lg:top-[11%] right-3 sm:right-6 md:right-8 lg:right-12 z-30 pointer-events-auto">
        <div
          className="relative inline-flex items-center rounded-full border border-[#d4af37]/80 hover:border-[#ffd700] bg-[#0c0b08]/85 hover:bg-[#16140d]/95 backdrop-blur-md p-1 shadow-[0_2px_14px_rgba(0,0,0,0.65),0_0_12px_rgba(212,175,55,0.25)] hover:shadow-[0_0_18px_rgba(255,215,0,0.45)] transition-all duration-300 select-none"
          role="group"
          aria-label="Switch hero character"
        >
          {/* Previous Hero Button */}
          <button
            onClick={handlePrevHero}
            className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-[#ffd700] hover:text-white hover:bg-[#d4af37]/25 active:bg-[#d4af37]/40 active:scale-90 transition-all duration-200 cursor-pointer"
            aria-label="Previous Hero (Left Arrow)"
            title="Previous Hero (← key)"
          >
            <ArrowLeft className="w-4 h-4 sm:w-4 sm:h-4 stroke-[3] filter drop-shadow-[0_0_4px_rgba(255,215,0,0.6)]" />
          </button>

          {/* Celestial Divider */}
          <div className="w-[1px] h-4 bg-gradient-to-b from-transparent via-[#d4af37]/60 to-transparent mx-0.5" />

          {/* Next Hero Button */}
          <button
            onClick={handleNextHero}
            className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-[#ffd700] hover:text-white hover:bg-[#d4af37]/25 active:bg-[#d4af37]/40 active:scale-90 transition-all duration-200 cursor-pointer"
            aria-label="Next Hero (Right Arrow)"
            title="Next Hero (→ key)"
          >
            <ArrowRight className="w-4 h-4 sm:w-4 sm:h-4 stroke-[3] filter drop-shadow-[0_0_4px_rgba(255,215,0,0.6)]" />
          </button>
        </div>
      </div>

      {/* Hero Figure with Parallax and Animated Rotation Transition */}
      <div
        className="relative flex justify-end items-end will-change-transform transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentHero.id}
            initial={{ x: direction * 140, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 140, opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-end items-end"
          >
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet={currentHero.src}
              />
              <img
                src={currentHero.src}
                alt={currentHero.alt}
                onError={() => setImageError(true)}
                className="max-h-[56vh] md:max-h-[80vh] lg:max-h-[84vh] w-auto max-w-[90vw] md:max-w-[75vw] lg:max-w-[65vw] object-contain object-bottom select-none"
              />
            </picture>
          </motion.div>
        </AnimatePresence>

        {/* Fallback silhouette if image fails to load */}
        {imageError && (
          <div className="w-[320px] h-[580px] flex items-end justify-center">
            <div className="w-48 h-96 bg-gradient-to-t from-black via-zinc-900 to-transparent rounded-t-full opacity-80 blur-xs" />
          </div>
        )}
      </div>
    </div>
  );
}
