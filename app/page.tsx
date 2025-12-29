'use client';

import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { EducationSection } from '@/components/education-section';
import { SkillsSection } from '@/components/skills-section';
import { ProjectsSection } from '@/components/projects-section';
import { ContactSection } from '@/components/contact-section';
import dynamic from 'next/dynamic';

const SplineBackground = dynamic(() => import('@/components/spline-background'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black/90 z-0" />,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      <SplineBackground />
      <Navigation />

      <main className="relative z-10 pointer-events-none [&>*]:pointer-events-auto">
        {/* pointer-events-none on main allows clicking through to Spline where there is gaps, 
            but child sections must re-enable pointer-events */}
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
            © 2025 Fahmi-Kzkf.
          </p>
        </div>
      </footer>
    </div>
  );
}