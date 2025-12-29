'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';
import { GlassCard } from '@/components/ui/glass-card';
import { GraduationCap, Calendar } from 'lucide-react';

export function EducationSection() {
  const { t } = useLanguage();

  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
            {t.education.title}
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <GlassCard intensity="medium" className="p-8 hover:bg-white/10 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {t.education.degree}
                  </h3>
                  <div className="flex items-center text-gray-300 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{t.education.institution}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}