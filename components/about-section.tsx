'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent } from '@/components/ui/card';

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
            {t.about.title}
          </h2>

          <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <span className="text-4xl mb-4 block">{t.about.greeting}</span>
              </div>
              
              <div className="text-gray-300 leading-relaxed space-y-4">
                {t.about.content.split('\n\n').map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-lg"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}