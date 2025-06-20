'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Instagram, Linkedin } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/fhmi-kzkf',
    color: 'hover:text-gray-300',
    description: 'Check out my code repositories'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/fahmi-raditya-a590b62a6/',
    color: 'hover:text-blue-400',
    description: 'Connect with me professionally'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com/fhmi.py',
    color: 'hover:text-pink-400',
    description: 'Follow my daily updates'
  }
];

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {t.contact.title}
          </h2>
          
          <p className="text-gray-300 text-lg mb-12">
            {t.contact.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm hover:bg-gray-900/90 transition-all duration-300 group hover:border-gray-600">
                  <CardContent className="p-6">
                    <Button
                      variant="ghost"
                      size="lg"
                      asChild
                      className={`w-full h-auto flex flex-col items-center space-y-3 p-6 text-gray-300 ${social.color} transition-colors group-hover:bg-transparent`}
                    >
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        <social.icon className="h-8 w-8" />
                        <div>
                          <div className="font-semibold text-lg">{social.name}</div>
                          <div className="text-sm text-gray-400 mt-1">
                            {social.description}
                          </div>
                        </div>
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}