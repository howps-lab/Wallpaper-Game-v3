import { motion } from 'motion/react';

export default function CalligraphyFocus() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10 px-4"
      aria-hidden="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center justify-center w-full max-w-[44vw] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
      >
        {/* Soft atmospheric cloud halo behind ink to illuminate the characters over dark mountain passes */}
        <div className="absolute inset-0 -inset-x-6 -inset-y-4 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.06)_45%,transparent_70%)] pointer-events-none blur-xl -z-10" />

        {/* Central Animating Calligraphy Text - Reduced 50% */}
        <img
          src="/assets/aistudio/Animating_calligraphy_text_61345368.webp"
          alt="Animating Calligraphy - Destiny"
          className="w-full h-auto object-contain select-none drop-shadow-[0_2px_10px_rgba(255,255,255,0.35)]"
        />
      </motion.div>
    </div>
  );
}
