import { motion } from 'motion/react';

interface ThemeItem {
  number: string;
  chinese: string;
  title: string;
  exposition: string;
}

const THEMES: ThemeItem[] = [
  {
    number: '01',
    chinese: '宿命与自由',
    title: 'Destiny Versus Free Will',
    exposition:
      'The celestial constellations were mapped before mortal birth, yet every sword swing against the storm defies the silent verdict of the stars.',
  },
  {
    number: '02',
    chinese: '长生之代价',
    title: 'The Price of Immortality',
    exposition:
      'To drink from the springs of longevity is to witness all who loved you dissolve like morning mist. The divine realm is built upon eternal grief.',
  },
  {
    number: '03',
    chinese: '古神与天龙',
    title: 'Forgotten Gods and Ancient Dragons',
    exposition:
      'Colossal beings who shaped the mountain roots before mortal kingdoms arose. They do not bow to heaven, nor do they seek prayer.',
  },
  {
    number: '04',
    chinese: '人天之羁绊',
    title: 'The Bond Between Mortals and Heaven',
    exposition:
      'Heaven is not an unreachable cloud; it is the mirror of earthly devotion and broken promises, reflecting every mortal tear into celestial thunder.',
  },
  {
    number: '05',
    chinese: '不灭之誓言',
    title: 'The Power of a Promise That Survives Death',
    exposition:
      'When temples crumble and gods turn to ash, the spoken oath of a solitary saint echoes across millennia, refusing to fade into oblivion.',
  },
];

export default function CelestialOathSection() {
  return (
    <section id="oath" className="relative z-30 py-28 md:py-36 px-6 lg:px-12 bg-gradient-to-b from-[#06070a] via-[#0b0c10] to-[#06070a] text-[#ede8db] border-t border-[#d4af37]/15 overflow-hidden">
      {/* Background Seal Emblem Silhouette */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.035] pointer-events-none select-none">
        <img
          src="/images/sacred-emblem.png"
          alt=""
          className="w-full h-full object-contain filter invert brightness-200"
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#d4af37]/50" />
            <span className="font-chinese text-xs md:text-sm tracking-[0.3em] text-[#d4af37]">
              万古天誓
            </span>
            <span className="w-8 h-[1px] bg-[#d4af37]/50" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[0.14em] uppercase gold-text-gradient gold-text-glow leading-tight">
            THE CELESTIAL OATH
          </h2>
          <p className="font-body italic text-lg sm:text-xl text-[#b8ad96] mt-3 max-w-xl mx-auto">
            The fundamental truths etched into the broken pillars of the Upper Heavens.
          </p>
        </div>

        {/* Editorial Layout for Central Themes */}
        <div className="divide-y divide-[#d4af37]/15">
          {THEMES.map((theme, index) => (
            <motion.div
              key={theme.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: index * 0.1 }}
              className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline group"
            >
              {/* Number and Chinese Character Stamp */}
              <div className="md:col-span-3 flex items-center gap-4">
                <span className="font-display font-light text-2xl md:text-3xl text-[#d4af37]/50 group-hover:text-[#d4af37] transition-colors">
                  {theme.number}
                </span>
                <span className="h-4 w-[1px] bg-[#d4af37]/30" />
                <span className="font-chinese text-sm md:text-base tracking-[0.2em] text-[#9c917d] group-hover:text-[#fae8b4] transition-colors">
                  {theme.chinese}
                </span>
              </div>

              {/* Theme Title */}
              <div className="md:col-span-4">
                <h3 className="font-display text-xl sm:text-2xl tracking-wide text-[#f5ebd7] group-hover:text-[#fae8b4] transition-colors">
                  {theme.title}
                </h3>
              </div>

              {/* Narrative Exposition */}
              <div className="md:col-span-5">
                <p className="font-body text-lg sm:text-xl leading-relaxed text-[#c2b7a2]">
                  {theme.exposition}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
