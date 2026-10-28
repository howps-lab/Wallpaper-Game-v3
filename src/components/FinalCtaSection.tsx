import { motion } from 'motion/react';
import { ChevronUp } from 'lucide-react';

interface FinalCtaSectionProps {
  onEnterWorld: () => void;
  onScrollToTop: () => void;
}

export default function FinalCtaSection({
  onEnterWorld,
  onScrollToTop,
}: FinalCtaSectionProps) {
  return (
    <section className="relative z-30 py-28 md:py-36 px-6 lg:px-12 bg-[#050608] text-[#ede8db] border-t border-[#d4af37]/20 overflow-hidden text-center">
      {/* Background Radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.06)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Sacred Seal Medallion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#d4af37]/70 p-2 mb-8 bg-[#100f0a] shadow-[0_0_25px_rgba(212,175,55,0.25)] flex items-center justify-center"
        >
          <img
            src="/images/sacred-emblem.png"
            alt="Heaven's Oath Sacred Seal"
            className="w-full h-full object-contain filter brightness-110"
          />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl tracking-[0.14em] uppercase gold-text-gradient gold-text-glow leading-tight max-w-3xl mx-auto"
        >
          YOUR DESTINY AWAITS BEYOND THE CLOUDS
        </motion.h2>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-body italic text-xl sm:text-2xl text-[#f3dfa2] mt-4 mb-10 tracking-wide"
        >
          The heavens have fallen. The oath remains.
        </motion.p>

        {/* Action Button: ENTER THE WORLD */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button
            onClick={onEnterWorld}
            className="group relative px-10 py-4 bg-gradient-to-b from-[#1c1912] to-[#0e0c08] border border-[#d4af37] hover:border-[#fff2a8] text-[#f7e7c4] hover:text-white rounded-sm transition-all duration-300 font-display text-xs md:text-sm tracking-[0.25em] uppercase font-bold gold-border-glow shadow-[0_0_35px_rgba(212,175,55,0.35)] cursor-pointer overflow-hidden flex items-center gap-3 active:scale-[0.98]"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-[#ffd700]/20 to-transparent transition-transform duration-1000 ease-out" />
            <span>ENTER THE WORLD</span>
          </button>

          <button
            onClick={onScrollToTop}
            className="inline-flex items-center gap-2 px-6 py-3.5 border border-zinc-800 hover:border-[#d4af37]/50 bg-[#0a0b0e] hover:bg-[#15161c] text-[#a89e89] hover:text-[#eae2d0] rounded-sm transition-all font-display text-xs tracking-[0.2em] uppercase cursor-pointer"
          >
            <ChevronUp className="w-4 h-4 text-[#d4af37]" />
            <span>RETURN TO SUMMIT</span>
          </button>
        </motion.div>
      </div>

      {/* Cinematic Site Footer */}
      <footer className="mt-24 pt-8 border-t border-zinc-900/80 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs font-display tracking-[0.2em] text-[#716958] gap-4">
        <div>
          <span>HEAVEN’S OATH</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span>CELESTIAL CHRONICLES</span>
        </div>
        <p className="font-body italic text-sm text-[#8c8270]">
          From the ashes of the clouds, a saint is born.
        </p>
      </footer>
    </section>
  );
}
