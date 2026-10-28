import { useState } from 'react';

interface HeroCharacterProps {
  mouseOffset?: { x: number; y: number };
  isParallaxActive?: boolean;
}

export default function HeroCharacter({
  mouseOffset = { x: 0, y: 0 },
  isParallaxActive = true,
}: HeroCharacterProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Foreground subject moves in slight opposition to background for depth perception
  const parallaxX = isParallaxActive ? mouseOffset.x * 22 : 0;
  const parallaxY = isParallaxActive ? mouseOffset.y * 12 : 0;

  return (
    <div
      className="absolute inset-x-0 bottom-0 flex justify-end items-end pointer-events-none select-none z-20 overflow-hidden h-[60vh] md:h-[84vh] lg:h-[88vh] pr-0 sm:pr-4 md:pr-10 lg:pr-14 xl:pr-16 -mr-2 sm:mr-0"
      aria-hidden="true"
    >
      <div
        className="relative flex justify-end items-end will-change-transform transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
        }}
      >


        {/* Hero Figure Container with Natural Breathing and Wind Motion */}
        <div className="relative animate-float-breathing">
          <div className="relative animate-robe-sway">
            {/* Desktop and Mobile Responsive Hero Images */}
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="/images/hero-warrior-mobile.png"
              />
              <img
                src="/images/hero-warrior.png"
                alt="Celestial Immortal Warrior looking out at the sacred mountain peaks"
                onLoad={() => setIsLoaded(true)}
                onError={() => setImageError(true)}
                className={`max-h-[56vh] md:max-h-[80vh] lg:max-h-[84vh] w-auto object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.92)] transition-opacity duration-1000 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </picture>

            {/* In case of fallback or before image load, styled silhouette */}
            {imageError && (
              <div className="w-[320px] h-[580px] flex items-end justify-center">
                <div className="w-48 h-96 bg-gradient-to-t from-black via-zinc-900 to-transparent rounded-t-full opacity-80 blur-xs" />
              </div>
            )}
          </div>
        </div>

        {/* Ambient Mist Grounding the Rock Base into the Viewport Edge */}
        <div className="absolute -bottom-8 inset-x-[-20%] h-36 bg-gradient-to-t from-[#06070a] via-[#06070a]/80 to-transparent blur-md pointer-events-none" />
      </div>
    </div>
  );
}
