import { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, Shield, ChevronRight } from 'lucide-react';

interface Realm {
  id: string;
  name: string;
  chineseName: string;
  tagline: string;
  description: string;
  guardian: string;
  relic: string;
  image: string;
  atmosphere: string;
}

const REALMS: Realm[] = [
  {
    id: 'jade-heaven',
    name: 'Jade Heaven',
    chineseName: '玉皇极境',
    tagline: 'A celestial palace hidden above the clouds',
    description:
      'Floating high above the endless cloud ocean, Jade Heaven was once the seat of the immortal emperors. Its white marble bridges and jade pagodas now drift in eternal dawn, awaiting the return of the sovereign spirit.',
    guardian: 'Nine-Winged Cloud Dragon',
    relic: 'Mirror of Celestial Truth',
    image: '/images/realm-jade-heaven.jpg',
    atmosphere: 'Luminous Dawn · Floating Sky-Arches · Divine Radiance',
  },
  {
    id: 'silent-peaks',
    name: 'The Silent Peaks',
    chineseName: '寂灭群峰',
    tagline: 'An ancient mountain range where forgotten gods sleep',
    description:
      'Colossal granite spires that pierce the heavens, into which titanic effigies of slumbering deities were carved eons ago. Weathered shrines cling to vertical precipices where silence is sacred and storms never cease.',
    guardian: 'Stone Warden of the High Shrines',
    relic: 'Bell of Unbroken Slumber',
    image: '/images/realm-silent-peaks.jpg',
    atmosphere: 'Eternal Mist · Weathered Monoliths · Pine Solitude',
  },
  {
    id: 'crimson-abyss',
    name: 'The Crimson Abyss',
    chineseName: '赤血禁渊',
    tagline: 'A forbidden realm where broken celestial oaths linger',
    description:
      'A volcanic chasm torn through obsidian peaks during the Shattering of Heaven. Broken talisman chains suspend giant stone gates over glowing embers of divine wrath, where fallen oaths still whisper in the wind.',
    guardian: 'Vermilion Seal Wraith',
    relic: 'Blade of the Shattered Vow',
    image: '/images/realm-crimson-abyss.jpg',
    atmosphere: 'Floating Embers · Obsidian Chasm · Forbidden Glyphs',
  },
];

interface RealmsSectionProps {
  onSelectRealm?: (realm: Realm) => void;
}

export default function RealmsSection({ onSelectRealm }: RealmsSectionProps) {
  const [activeRealm, setActiveRealm] = useState<Realm>(REALMS[0]);

  return (
    <section id="realms" className="relative z-30 py-28 md:py-36 px-6 lg:px-12 bg-[#06070a] text-[#ede8db] border-t border-[#d4af37]/15 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#d4af37]/50" />
            <span className="font-chinese text-xs md:text-sm tracking-[0.3em] text-[#d4af37]">
              九天异界
            </span>
            <span className="w-8 h-[1px] bg-[#d4af37]/50" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[0.14em] uppercase gold-text-gradient gold-text-glow leading-tight">
            THE REALMS BEYOND THE CLOUDS
          </h2>
          <p className="font-body italic text-lg sm:text-xl text-[#b8ad96] mt-3 max-w-xl mx-auto">
            Venture across sacred lands where ancient powers slumber and broken destinies await.
          </p>
        </div>

        {/* Realm Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12">
          {REALMS.map((realm) => {
            const isActive = activeRealm.id === realm.id;
            return (
              <button
                key={realm.id}
                onClick={() => setActiveRealm(realm)}
                className={`group relative px-5 py-2.5 rounded-sm transition-all duration-300 font-display text-xs md:text-sm tracking-[0.2em] uppercase cursor-pointer flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-[#181610] text-[#f7e7c4] border border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                    : 'bg-[#0a0b0e] text-[#8e8574] border border-zinc-800/80 hover:text-[#dcd4c3] hover:border-[#d4af37]/40'
                }`}
              >
                <span className="font-chinese text-[11px] opacity-75">{realm.chineseName}</span>
                <span>{realm.name}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Realm Showcase Display */}
        <div className="relative rounded-sm border border-[#d4af37]/30 bg-[#0a0c10] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Realm Visual Canvas */}
          <div className="relative lg:col-span-7 h-[360px] sm:h-[440px] lg:h-full min-h-[400px] overflow-hidden">
            <img
              src={activeRealm.image}
              alt={activeRealm.name}
              className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
            />
            {/* Subtle Gradient Vignette Over Realm Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-black/30 lg:bg-gradient-to-r lg:from-transparent lg:to-[#0a0c10]" />

            {/* Atmosphere Badge */}
            <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 bg-[#06070a]/80 backdrop-blur-md border border-[#d4af37]/30 text-[11px] font-display tracking-widest text-[#d5cbba]">
              {activeRealm.atmosphere}
            </div>
          </div>

          {/* Realm Narrative & Details */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-gradient-to-b from-[#0d0f14] to-[#08090d]">
            <div>
              <div className="flex items-center gap-2 text-xs font-display tracking-[0.25em] text-[#d4af37] mb-2 uppercase">
                <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Sanctuary Codex</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl tracking-wide text-[#f5ebd7] font-bold">
                {activeRealm.name}
              </h3>
              <p className="font-body italic text-base sm:text-lg text-[#d4af37]/90 mt-1 mb-6">
                {activeRealm.tagline}
              </p>

              <p className="font-body text-base sm:text-lg text-[#c5bca8] leading-relaxed mb-8">
                {activeRealm.description}
              </p>

              {/* Realm Attributes */}
              <div className="space-y-4 pt-6 border-t border-zinc-800/80">
                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-[#d4af37] shrink-0 mt-1" />
                  <div>
                    <span className="text-[11px] font-display tracking-widest text-[#8a7f6c] uppercase block">
                      Celestial Guardian
                    </span>
                    <span className="text-sm font-display tracking-wide text-[#eae2d0]">
                      {activeRealm.guardian}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0 mt-1" />
                  <div>
                    <span className="text-[11px] font-display tracking-widest text-[#8a7f6c] uppercase block">
                      Sacred Relic
                    </span>
                    <span className="text-sm font-display tracking-wide text-[#eae2d0]">
                      {activeRealm.relic}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interaction Button */}
            <div className="mt-8 pt-6">
              <button
                onClick={() => onSelectRealm && onSelectRealm(activeRealm)}
                className="w-full py-3 px-4 border border-[#d4af37]/50 hover:border-[#d4af37] bg-[#14130d] hover:bg-[#201d14] text-[#f7e7c4] text-xs font-display tracking-[0.25em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer rounded-sm group"
              >
                <span>COMMUNE WITH {activeRealm.name.toUpperCase()}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export { REALMS };
export type { Realm };
