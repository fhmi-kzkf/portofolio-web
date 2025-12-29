'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';
import { GlassCard } from '@/components/ui/glass-card';

const skills = [
  { name: 'Python', icon: '🐍', color: 'from-yellow-500/20 to-blue-500/20' },
  { name: 'Google Colab', icon: '📊', color: 'from-orange-500/20 to-red-500/20' },
  { name: 'HTML', icon: '🌐', color: 'from-orange-600/20 to-red-600/20' },
  { name: 'CSS', icon: '🎨', color: 'from-blue-500/20 to-cyan-500/20' },
  { name: 'JavaScript', icon: '⚡', color: 'from-yellow-400/20 to-orange-500/20' },
  { name: 'MongoDB', icon: '🍃', color: 'from-green-500/20 to-emerald-600/20' },
  { name: 'PHP', icon: '🔧', color: 'from-purple-500/20 to-indigo-600/20' },
  { name: 'Machine Learning', icon: '🤖', color: 'from-blue-500/20 to-purple-500/20' },
  { name: 'Data Analyst', icon: '📈', color: 'from-green-500/20 to-teal-500/20' },
  { name: 'Data Science', icon: '🔬', color: 'from-purple-500/20 to-pink-500/20' },
  { name: 'Data Engineering', icon: '⚙️', color: 'from-gray-500/20 to-blue-500/20' },
  { name: 'AI', icon: '🧠', color: 'from-indigo-500/20 to-purple-500/20' },
];

export function SkillsSection() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
            {t.skills.title}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <GlassCard intensity="high" className="p-6 text-center hover:bg-white/10 transition-colors h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${skill.color} border border-white/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow`}>
                    <span className="text-2xl">{skill.icon}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg">
                    {skill.name}
                  </h3>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}