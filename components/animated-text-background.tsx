'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';

const backgroundTexts = {
  en: [
    'DATA ANALYSIS',
    'PYTHON',
    'MACHINE LEARNING',
    'DATA SCIENCE',
    'JAVASCRIPT',
    'MONGODB',
    'HTML CSS',
    'PHP',
    'GOOGLE COLAB',
    'ALGORITHMS',
    'STATISTICS',
    'VISUALIZATION',
    'BACKEND',
    'FRONTEND',
    'FULLSTACK'
  ],
  id: [
    'ANALISIS DATA',
    'PYTHON',
    'PEMBELAJARAN MESIN',
    'SAINS DATA',
    'JAVASCRIPT',
    'MONGODB',
    'HTML CSS',
    'PHP',
    'GOOGLE COLAB',
    'ALGORITMA',
    'STATISTIK',
    'VISUALISASI',
    'BACKEND',
    'FRONTEND',
    'FULLSTACK'
  ]
};

function FloatingText({ text, delay, duration, x, y }: {
  text: string;
  delay: number;
  duration: number;
  x: string;
  y: string;
}) {
  return (
    <motion.div
      className="absolute text-white/5 font-bold text-2xl md:text-4xl lg:text-6xl select-none pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0, 0.05, 0.03, 0],
        scale: [0.8, 1.2, 1, 0.9],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 10 + 5,
        ease: "easeInOut"
      }}
    >
      {text}
    </motion.div>
  );
}

export function AnimatedTextBackground() {
  const { locale } = useLanguage();
  const texts = backgroundTexts[locale];

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {texts.map((text, index) => (
        <FloatingText
          key={`${text}-${locale}-${index}`}
          text={text}
          delay={index * 2}
          duration={8 + Math.random() * 4}
          x={`${Math.random() * 80 + 10}%`}
          y={`${Math.random() * 80 + 10}%`}
        />
      ))}
      
      {/* Additional scattered texts for more density */}
      {texts.slice(0, 8).map((text, index) => (
        <FloatingText
          key={`${text}-extra-${locale}-${index}`}
          text={text}
          delay={index * 3 + 15}
          duration={10 + Math.random() * 6}
          x={`${Math.random() * 70 + 15}%`}
          y={`${Math.random() * 70 + 15}%`}
        />
      ))}
    </div>
  );
}