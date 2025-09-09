'use client';

import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { EducationSection } from '@/components/education-section';
import { SkillsSection } from '@/components/skills-section';
import { ProjectsSection } from '@/components/projects-section';
import { ContactSection } from '@/components/contact-section';
import { FloatingCube } from '@/components/floating-cube';
import { AnimatedTextBackground } from '@/components/animated-text-background';

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      <AnimatedTextBackground />
      <FloatingCube />
      <Navigation />
      
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Fahmi. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}