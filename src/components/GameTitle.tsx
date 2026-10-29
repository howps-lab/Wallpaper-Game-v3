import { motion } from 'motion/react';

export default function GameTitle() {
  return (
    <div className="relative z-30 flex flex-col items-center justify-start text-center px-4 pt-16 sm:pt-18 md:pt-20 pb-4 pointer-events-none select-none max-w-4xl mx-auto">
      {/* Chinese Mythological Seal & Inscription */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mb-2 chinese-defined"
      >
        <span className="h-[1.5px] w-8 md:w-16 bg-gradient-to-r from-transparent via-[#ffd700] to-[#ffd700] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
        <span className="font-chinese text-xs md:text-sm tracking-[0.35em] text-[#fae5ad] font-semibold pl-1">
          天命之誓
        </span>
        <span className="h-[1.5px] w-8 md:w-16 bg-gradient-to-l from-transparent via-[#ffd700] to-[#ffd700] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
      </motion.div>

      {/* Main Title: Heaven’s Oath in Gokure Japan Demo font, solid black color (reduced 20%) */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="font-title text-lg sm:text-2xl md:text-3xl lg:text-4xl tracking-[0.05em] text-balance text-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)] leading-tight select-none"
      >
        Heaven’s Oath
      </motion.h1>

      {/* Official Subtitle: From the ashes of the clouds, a saint is born. */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="font-body italic text-sm sm:text-base md:text-lg text-[#1f2024] font-semibold tracking-wide mt-1.5 max-w-xl text-balance drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]"
      >
        From the ashes of the clouds, a saint is born.
      </motion.p>
    </div>
  );
}
