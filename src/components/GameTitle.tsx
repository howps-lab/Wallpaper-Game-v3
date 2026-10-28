import { motion } from 'motion/react';

export default function GameTitle() {
  return (
    <div className="relative z-30 flex flex-col items-center justify-start text-center px-4 pt-16 sm:pt-18 md:pt-20 pb-4 pointer-events-none select-none max-w-4xl mx-auto">
      {/* Localized Subtle Halo for Crystal-Clear Text Definition Against Misty Mountain Fog */}
      <div className="absolute inset-0 -inset-x-20 -inset-y-6 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.52)_0%,rgba(0,0,0,0.22)_50%,transparent_75%)] pointer-events-none blur-2xl -z-10" />

      {/* Chinese Mythological Seal & Inscription */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mb-2 chinese-defined"
      >
        <span className="h-[1.5px] w-8 md:w-16 bg-gradient-to-r from-transparent via-[#ffd700] to-[#ffd700] drop-shadow-[0_1px_3px_rgba(0,0,0,1)]" />
        <span className="font-chinese text-xs md:text-sm tracking-[0.35em] text-[#fae5ad] font-semibold pl-1">
          天命之誓
        </span>
        <span className="h-[1.5px] w-8 md:w-16 bg-gradient-to-l from-transparent via-[#ffd700] to-[#ffd700] drop-shadow-[0_1px_3px_rgba(0,0,0,1)]" />
      </motion.div>

      {/* Main Title: HEAVEN’S OATH */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.14em] uppercase text-balance gold-text-gradient title-defined leading-tight select-none"
      >
        HEAVEN’S OATH
      </motion.h1>

      {/* Official Subtitle: From the ashes of the clouds, a saint is born. */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="font-body italic text-base sm:text-lg md:text-xl text-[#fff9ea] font-medium tracking-wide mt-2 max-w-xl text-balance subtitle-defined"
      >
        From the ashes of the clouds, a saint is born.
      </motion.p>
    </div>
  );
}
