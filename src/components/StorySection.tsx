import { motion } from 'motion/react';

export default function StorySection() {
  return (
    <section id="legend" className="relative z-30 py-28 md:py-36 px-6 lg:px-12 bg-gradient-to-b from-[#06070a] via-[#090b10] to-[#06070a] text-[#ede8db] overflow-hidden">
      {/* Background Subtle Ink Wash & Paper Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url('/textures/paper-grain.png')` }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none blur-3xl"
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Editorial Chapter Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="font-display text-xs tracking-[0.3em] uppercase text-[#d4af37]">
              The Genesis Chronicle
            </span>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[0.12em] uppercase gold-text-gradient gold-text-glow leading-tight max-w-3xl">
            WHEN HEAVEN FELL, A LEGEND AWOKE
          </h2>

          {/* Antique Gold Seal Ornament */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-[#d4af37]" />
            <div className="w-5 h-5 rotate-45 border border-[#d4af37] flex items-center justify-center bg-[#100f0a]">
              <div className="w-2 h-2 bg-[#d4af37]" />
            </div>
            <span className="h-[1px] w-16 md:w-24 bg-gradient-to-l from-transparent via-[#d4af37]/40 to-[#d4af37]" />
          </div>
        </div>

        {/* Story Prose Passages */}
        <div className="space-y-8 md:space-y-10 text-center font-body text-xl sm:text-2xl md:text-[1.65rem] leading-relaxed text-[#dcd4c3] font-light max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.1 }}
          >
            Before the first dynasty was carved into stone, the Celestial Realm stood above the mortal world, guarded by ancient dragons and immortal saints.
          </motion.p>

          {/* Dramatic Breakout Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.2 }}
            className="py-4 my-6"
          >
            <p className="font-display text-2xl sm:text-3xl md:text-4xl tracking-[0.15em] uppercase text-[#fae8b4] font-medium drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              Then came the Shattering of Heaven.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.1 }}
          >
            The celestial gates broke. The stars fell silent. Sacred mountains disappeared beneath an endless sea of clouds, and the gods abandoned their thrones.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.1 }}
            className="text-[#f5ecd7] font-normal"
          >
            From the ashes of the heavens, one solitary warrior emerged — carrying a forgotten oath that even the immortals feared to speak.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.1 }}
          >
            Across ruined shrines, haunted forests, and mountains where dragons sleep beneath the stone, the warrior must uncover the truth behind the celestial catastrophe.
          </motion.p>

          {/* Climax Lines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.3 }}
            className="pt-6 border-t border-[#d4af37]/20 mt-12 flex flex-col items-center gap-4"
          >
            <p className="font-display tracking-[0.08em] text-xl sm:text-2xl text-[#f3dfa2]">
              To restore the balance between Heaven and Earth, the oath must be fulfilled.
            </p>
            <p className="font-body italic text-lg sm:text-xl text-[#b8ad96]">
              But every divine blessing demands a sacrifice.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
