'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';
import { GlassCard } from '@/components/ui/glass-card';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  const { t } = useLanguage();

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
      <div className="container mx-auto px-4 z-10">

        {/* Main Glass Card Layout */}
        <GlassCard className="max-w-[1400px] w-full mx-auto min-h-[80vh] flex flex-col items-center justify-center relative p-8 sm:p-12 lg:p-20 overflow-visible">

          {/* Background Typography (Layered behind the 3D content potentially) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden rounded-3xl">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-[12vw] sm:text-[15vw] font-black text-white whitespace-nowrap opacity-5 z-0 tracking-tighter"
            >
              PORTFOLIO
            </motion.h1>
          </div>

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-left space-y-6"
            >
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight">
                FAHMI<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  RADITYA
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-lg leading-relaxed border-l-2 border-white/20 pl-6">
                {t.hero.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-6">
                <motion.button
                  onClick={scrollToProjects}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 bg-white text-black font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                >
                  View Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>

            {/* 3D Placeholder/Context Area 
                The actual SplineBackground is fixed behind everything, so this is just for spacing 
                or to hold interaction instructions.
            */}
            <div className="hidden lg:flex items-center justify-center h-full min-h-[400px]">
              {/* 
                  Empty div to balance the grid. 
                  The 3D scene (SplineBackground) is visually here but physically in the background.
                */}
            </div>

          </div>


          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 right-8"
          >
            <ChevronDown className="h-6 w-6 text-gray-400" />
          </motion.div>

        </GlassCard>
      </div>
    </section>
  );
}