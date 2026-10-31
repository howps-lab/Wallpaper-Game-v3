import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw } from 'lucide-react';

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
    id: 'heroine-mage',
    name: 'Celestial Azure Sorceress',
    src: '/assets/aistudio/heroine-mage_4714f533.webp',
    alt: 'Celestial Azure Sorceress channeling divine astral energy upon the sacred summit',
  },
];

export default function HeroCharacter({
  mouseOffset = { x: 0, y: 0 },
  isParallaxActive = true,
}: HeroCharacterProps) {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
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

  const handleRotateHero = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % HEROES.length);
  };

  const currentHero = HEROES[currentHeroIndex];

  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-end items-end pointer-events-none select-none z-20 overflow-hidden h-[60vh] md:h-[84vh] lg:h-[88vh] pr-0 sm:pr-4 md:pr-10 lg:pr-14 xl:pr-16 -mr-2 sm:mr-0">
      {/* "Change Hero" Button: 20% smaller, positioned just above and to the right of the hero with zero overlap */}
      <div className="absolute top-[6%] sm:top-[8%] md:top-[10%] lg:top-[11%] right-3 sm:right-6 md:right-8 lg:right-12 z-30 pointer-events-auto">
        <button
          onClick={handleRotateHero}
          className="group relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border border-[#d4af37]/80 hover:border-[#ffd700] bg-[#0c0b08]/85 hover:bg-[#16140d]/95 backdrop-blur-md text-[#f5ecd8] hover:text-white font-display text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.16em] uppercase font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.65),0_0_10px_rgba(212,175,55,0.22)] hover:shadow-[0_0_16px_rgba(255,215,0,0.4)] active:scale-95 transition-all duration-300 cursor-pointer select-none whitespace-nowrap"
          aria-label="Change Hero"
          title="Switch between Celestial Warriors"
        >
          <RotateCw className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-[#d4af37] group-hover:text-[#ffd700] transition-transform duration-500 group-hover:rotate-180" />
          <span className="relative z-10 transition-colors">
            Change Hero
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
            initial={{ x: 140, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -140, opacity: 0 }}
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
                className="max-h-[56vh] md:max-h-[80vh] lg:max-h-[84vh] w-auto object-contain object-bottom select-none"
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
