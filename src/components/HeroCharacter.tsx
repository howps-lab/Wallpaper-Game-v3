import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, ArrowLeft, ArrowRight } from 'lucide-react';

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
      {/* "Change Hero" Button: Positioned above and to the right of the hero with thick, aesthetic arrows */}
      <div className="absolute top-[6%] sm:top-[8%] md:top-[10%] lg:top-[11%] right-3 sm:right-6 md:right-8 lg:right-12 z-30 pointer-events-auto">
        <button
          onClick={handleNextHero}
          className="group relative inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full border border-[#d4af37]/80 hover:border-[#ffd700] bg-[#0c0b08]/85 hover:bg-[#16140d]/95 backdrop-blur-md text-[#f5ecd8] hover:text-white font-display text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.16em] uppercase font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.65),0_0_10px_rgba(212,175,55,0.22)] hover:shadow-[0_0_16px_rgba(255,215,0,0.4)] active:scale-95 transition-all duration-300 cursor-pointer select-none whitespace-nowrap"
          aria-label="Change Hero (Press Left or Right arrow key)"
          title="Change Hero (Click arrows or press ← / → keys)"
        >
          <RotateCw className="w-2.5 h-2.5 text-[#d4af37] group-hover:text-[#ffd700] transition-transform duration-500 group-hover:rotate-180 shrink-0" />
          <span className="relative z-10 transition-colors">
            Change Hero
          </span>

          {/* Thick, aesthetic celestial gold arrow controls */}
          <span className="inline-flex items-center gap-1 ml-0.5 px-1.5 py-0.5 rounded-full bg-black/60 border border-[#d4af37]/40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_1px_4px_rgba(0,0,0,0.7)]">
            <span
              onClick={(e) => {
                e.stopPropagation();
                handlePrevHero();
              }}
              className="p-0.5 rounded hover:bg-[#d4af37]/25 text-[#ffd700] hover:text-white transition-all hover:scale-115 active:scale-90 cursor-pointer"
              title="Previous Hero (← key)"
            >
              <ArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.75] filter drop-shadow-[0_0_3px_rgba(255,215,0,0.5)]" />
            </span>
            <span className="w-[1px] h-2.5 bg-[#d4af37]/35" />
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleNextHero();
              }}
              className="p-0.5 rounded hover:bg-[#d4af37]/25 text-[#ffd700] hover:text-white transition-all hover:scale-115 active:scale-90 cursor-pointer"
              title="Next Hero (→ key)"
            >
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.75] filter drop-shadow-[0_0_3px_rgba(255,215,0,0.5)]" />
            </span>
          </span>
        </button>
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
