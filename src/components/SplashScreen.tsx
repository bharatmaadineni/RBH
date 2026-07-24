import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Radio, Volume2 } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // Sequence stages
    const timer1 = setTimeout(() => setStage(1), 300);
    const timer2 = setTimeout(() => setStage(2), 1100);
    const timer3 = setTimeout(() => setStage(3), 2200);
    const timer4 = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <motion.div
      id="rbh-splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Background Red Ambient Glowing Radial Light */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.8, 1.2, 1], opacity: [0.2, 0.45, 0.3] }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          className="w-[500px] h-[500px] rounded-full bg-[#E50914] blur-[150px] opacity-30"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Animated Icon Box */}
        <motion.div
          initial={{ scale: 0, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="relative mb-6"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#E50914] flex items-center justify-center shadow-[0_0_50px_rgba(229,9,20,0.6)] border border-solid border-white/20">
            <Music className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-pulse" />
          </div>

          {/* Equalizer Wave Pill Badges */}
          <div className="absolute -bottom-2 inset-x-0 flex justify-center gap-1">
            <motion.div 
              animate={{ height: [6, 16, 8, 20, 6] }} 
              transition={{ repeat: Infinity, duration: 0.8 }} 
              className="w-1 bg-white rounded-full" 
            />
            <motion.div 
              animate={{ height: [12, 6, 22, 10, 12] }} 
              transition={{ repeat: Infinity, duration: 0.7, delay: 0.1 }} 
              className="w-1 bg-white rounded-full" 
            />
            <motion.div 
              animate={{ height: [18, 10, 6, 24, 18] }} 
              transition={{ repeat: Infinity, duration: 0.9, delay: 0.2 }} 
              className="w-1 bg-white rounded-full" 
            />
            <motion.div 
              animate={{ height: [8, 20, 12, 8, 8] }} 
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }} 
              className="w-1 bg-white rounded-full" 
            />
          </div>
        </motion.div>

        {/* Brand Text Entrance */}
        <div className="overflow-hidden py-1">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex items-center justify-center gap-2 sm:gap-3"
          >
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white drop-shadow-[0_0_25px_rgba(229,9,20,0.5)] flex items-center gap-2">
              <span className="text-[#E50914]">RBH</span>
              <span className="font-light text-white tracking-normal text-4xl sm:text-6xl">music</span>
            </h1>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 10 }}
          transition={{ duration: 0.5 }}
          className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#A7A7A7] mt-3"
        >
          High Fidelity Music Platform
        </motion.p>
      </div>

      {/* Loading Bar at Bottom */}
      <div className="absolute bottom-12 w-48 sm:w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 2.6, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-r from-[#E50914] via-[#FF3B5C] to-[#E50914] rounded-full shadow-[0_0_12px_#E50914]"
        />
      </div>

      {/* Skip Button (allows fast dismiss) */}
      <button
        onClick={onComplete}
        className="absolute bottom-4 text-[11px] font-bold uppercase tracking-wider text-white/40 hover:text-white transition-colors cursor-pointer py-1 px-3"
      >
        Skip Intro
      </button>
    </motion.div>
  );
};
