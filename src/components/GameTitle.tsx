import { motion } from 'motion/react';

export default function GameTitle() {
  return (
    <div className="relative z-30 flex flex-col items-center justify-start text-center px-4 pt-16 sm:pt-18 md:pt-20 pb-4 pointer-events-none select-none max-w-4xl mx-auto">
      {/* Retained Chinese Inscription */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mb-2.5 chinese-defined"
      >
        <span className="h-[1.5px] w-8 md:w-16 bg-gradient-to-r from-transparent via-[#ffd700] to-[#ffd700] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
        <span className="font-chinese text-xs md:text-sm tracking-[0.35em] text-[#fae5ad] font-semibold pl-1">
          天命之誓
        </span>
        <span className="h-[1.5px] w-8 md:w-16 bg-gradient-to-l from-transparent via-[#ffd700] to-[#ffd700] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
      </motion.div>

      {/* Main Title: Attached PNG File (Responsive for Mobile, Tablet, and Desktop) */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center items-center"
      >
        <img
          src="/assets/aistudio/main_title_0b0a0576.png"
          alt="Heaven's Oath"
          className="w-48 sm:w-64 md:w-80 lg:w-[22rem] max-w-[85vw] h-auto object-contain select-none drop-shadow-[0_1px_2px_rgba(255,255,255,0.45)]"
        />
      </motion.h1>
    </div>
  );
}
