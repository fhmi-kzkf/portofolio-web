'use client';

import { useLanguage } from '@/hooks/use-language';
import type { SiteContent } from '@/lib/content-types';
import Link from 'next/link';
import { useLenis } from '@studio-freight/react-lenis';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const ScrollReveal = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedBarcode = () => {
  return (
    <div className="flex items-center h-full w-full py-2 animate-[wipe-right_2s_ease-in-out_infinite_alternate]">
      {[...Array(60)].map((_, i) => {
        const w = Math.max(1, 16 - Math.floor(i * 0.8));
        const mr = Math.floor(1 + Math.pow(i, 1.35) * 0.5);
        return (
          <div
            key={i}
            className="h-full bg-green-01 shrink-0"
            style={{ width: `${w}px`, marginRight: `${mr}px` }}
          />
        );
      })}
    </div>
  );
};

export function PortfolioPage({ content }: { content: SiteContent }) {
  const { locale, t } = useLanguage();
  const lenis = useLenis();
  const { profile } = content;

  const localized = (value: { en: string; id: string }, fallback: string) =>
    value[locale]?.trim() || value.en?.trim() || value.id?.trim() || fallback;

  const firstName = profile.name.trim().split(/\s+/)[0] || 'Fahmi';
  const logo = `${firstName.charAt(0).toUpperCase()}.`;

  const rolePairs: string[][] = [];
  for (let i = 0; i < profile.roles.length; i += 2) {
    rolePairs.push(profile.roles.slice(i, i + 2));
  }

  const navItems = [
    { id: 'about', label: 'About' },
    ...(content.experience.length > 0
      ? [{ id: 'experience', label: t.experience.title }]
      : []),
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenis) {
      lenis.scrollTo(element, { offset: -80, duration: 1.2 });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-dark-01 relative overflow-x-hidden text-white-01 font-neue-montreal selection:bg-green-01 selection:text-dark-01">
      {/* Navigation */}
      <div className="sticky top-0 left-0 right-0 z-50 p-[1.11vw] md:px-[2.22vw] md:py-[1.6vw] lg:px-[2.7vw] bg-dark-01/90 backdrop-blur-sm border-b border-white-01/10">
        <div className="m-auto w-full grid grid-cols-4 md:grid-cols-12 gap-2 xl:gap-[1.38vw] items-center">
          <div className="col-span-2 flex items-center">
            <Link href="/" className="inline-flex items-center group">
              <span className="font-medium text-xl xl:text-[1.5vw] tracking-tight hover:text-green-01 transition-colors">
                {logo}
              </span>
            </Link>
          </div>
          <div className="hidden md:flex col-span-10 justify-end items-center">
            <ul className="flex items-center gap-5 xl:gap-[1.94vw]">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-white-01 hover:text-green-01 transition-colors text-base xl:text-[1.11vw] uppercase font-medium"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <main className="w-full flex flex-col">
        {/* Hero Section */}
        <div className="p-[1.11vw] md:px-[2.22vw] lg:px-[2.7vw] relative overflow-hidden">
          <div className="absolute right-[-20%] md:right-[-10%] top-[10%] md:top-[0%] w-[300px] h-[300px] md:w-[700px] md:h-[700px] xl:w-[50vw] xl:h-[50vw] opacity-30 mix-blend-screen pointer-events-none z-0">
            <img src="/sphere_left.svg" className="absolute inset-0 w-full h-full animate-spin-slow" alt="" />
            <img src="/sphere_right.svg" className="absolute inset-0 w-full h-full animate-spin-slow-reverse" alt="" />
          </div>

          <section className="py-4 md:py-6 lg:py-8 xl:py-[1.8vw] m-auto w-full relative z-10">
            <div className="pt-10 md:pt-16 xl:pt-[3vw]">
              <div className="w-full grid grid-cols-4 md:grid-cols-12 gap-2 xl:gap-[1.38vw]">
                <div className="col-span-12 flex flex-col gap-8 md:flex-row md:flex-wrap md:justify-between lg:col-span-10">
                  {rolePairs.map((pair, index) => (
                    <div
                      key={`${pair[0]}-${index}`}
                      className="flex flex-col gap-4 w-full md:max-w-[352px] xl:max-w-[24.44vw]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-lg xl:text-[1.25vw] font-medium text-white-01 uppercase">
                          {pair[0]}
                        </div>
                        {pair[1] && (
                          <div
                            className="text-lg xl:text-[1.25vw] font-medium uppercase text-right text-green-01"
                          >
                            {pair[1]}
                          </div>
                        )}
                      </div>
                      <div className="w-full h-[95px] xl:h-[6.59vw] flex justify-start border-b border-green-01/30 pb-2 overflow-hidden">
                        <AnimatedBarcode />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-span-12 pt-10 pb-12 md:pt-14 md:pb-8 xl:pt-[3vw] xl:pb-[2vw]">
                  <div className="mb-4">
                    <h1 className="text-[3.125rem] md:text-[7.66vw] md:tracking-[-0.25rem] font-medium leading-none text-white-01">
                      Crafting digital <br className="hidden md:block" /> experiences.
                    </h1>
                  </div>
                  <div>
                    <p className="text-[1.5rem] md:text-[3.47vw] md:tracking-[-0.1rem] font-normal leading-none text-white-01/80 max-w-4xl">
                      {localized(profile.heroDescription, t.hero.description)}
                    </p>
                  </div>
                  <span className="block w-full h-[1px] bg-white-01/20 mt-12 xl:mt-[2.22vw]"></span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Ticker Section */}
        <div className="h-[120px] md:h-[200px] xl:h-[15vw] overflow-hidden bg-white-01 flex items-center border-y-2 border-dark-01">
          <div className="w-full flex items-center h-full group">
            <div className="flex gap-8 items-center animate-ticker group-hover:[animation-play-state:paused] whitespace-nowrap will-change-transform">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex gap-8 items-center">
                  <span className="text-[6rem] md:text-[8rem] xl:text-[10vw] font-medium text-dark-01 leading-none uppercase">
                    {profile.name}
                  </span>
                  <div className="relative flex items-center justify-center px-4">
                    <img src="/star.svg" alt="star" className="w-[30px] h-[30px] xl:w-[2.5vw] xl:h-[2.5vw] animate-spin-slow opacity-80" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="p-[1.11vw] md:px-[2.22vw] lg:px-[2.7vw] bg-dark-01">
          <section className="py-14 md:py-20 m-auto w-full border-t border-white-01/10">
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] xl:min-h-[40vw] border border-white-01/20 overflow-hidden">
                <div className="relative bg-dark-01 border-b lg:border-b-0 lg:border-r border-white-01/20 p-8 flex items-center justify-center overflow-hidden">
                  <div className="hidden lg:block absolute right-0 top-1/2 w-[30%] h-[1px] bg-green-01/50"></div>
                  <div className="hidden lg:block absolute right-[-5px] top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-dark-01 border-2 border-green-01 z-20"></div>

                  <div className="relative w-[300px] h-[300px] xl:w-[25vw] xl:h-[25vw] flex items-center justify-center">
                    <div className="absolute inset-0 border border-white-01/20 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-6 xl:inset-[1.5vw] border border-white-01/10 rounded-full"></div>
                    <div className="absolute inset-12 xl:inset-[3vw] border border-white-01/5 rounded-full animate-spin-slow"></div>

                    <div className="relative w-[60%] h-[60%] rounded-full overflow-hidden border border-green-01/30 z-10 group">
                      <div className="absolute inset-0 bg-green-01/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-multiply"></div>
                      <img
                        src={profile.photoUrl || '/images/foto%20diri%20gsa.jpeg'}
                        alt={profile.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative bg-[#ffffff] text-dark-01 p-8 lg:p-16 xl:p-[5vw] flex flex-col justify-center overflow-hidden">
                  <div className="absolute top-6 left-6 xl:top-[2vw] xl:left-[2vw] text-xs xl:text-[0.7vw] font-bold tracking-widest uppercase text-dark-01/80">ABOUT</div>
                  <div className="absolute top-6 right-6 xl:top-[2vw] xl:right-[2vw] text-xs xl:text-[0.7vw] font-bold tracking-widest uppercase text-dark-01/80">PROFILE</div>

                  <div className="relative z-10 w-full max-w-2xl m-auto">
                    <h2 className="text-[2rem] lg:text-[2.5rem] xl:text-[3vw] font-medium leading-tight mb-8 tracking-tight">
                      {localized(profile.aboutGreeting, t.about.greeting)}
                    </h2>
                    <div className="w-16 lg:w-[4vw] h-[1px] bg-dark-01/30 mb-8"></div>
                    <div className="flex flex-col gap-6 text-base lg:text-[1.1vw] leading-relaxed text-dark-01/70">
                      {localized(profile.aboutContent, t.about.content)
                        .split('\n\n')
                        .filter(Boolean)
                        .map((paragraph: string, index: number) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 xl:bottom-[2vw] xl:left-[2vw] text-xs xl:text-[0.7vw] font-bold tracking-widest text-dark-01/80">001.</div>
                  <div className="absolute bottom-6 right-6 xl:bottom-[2vw] xl:right-[2vw] text-xs xl:text-[0.7vw] font-bold tracking-widest uppercase text-dark-01/80">
                    {firstName}
                  </div>

                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[150px] h-[150px] xl:w-[12vw] xl:h-[12vw] border-[12px] border-dashed border-dark-01/10 rounded-full animate-spin-slow pointer-events-none"></div>
                </div>
              </div>

              <div className="flex flex-col w-full mt-12 mb-8 xl:mt-[3vw] xl:mb-[3.33vw]">
                <span className="w-full h-[1px] bg-white-01/20 mb-4"></span>
                <div className="flex items-center justify-between opacity-50">
                  <img src="/double_elips_white.svg" className="w-[21px] h-[21px] xl:w-[1.45vw] xl:h-[1.45vw]" alt="shape" />
                  <img src="/star_circle_white.svg" className="w-[21px] h-[21px] xl:w-[1.45vw] xl:h-[1.45vw]" alt="shape" />
                </div>
              </div>
            </ScrollReveal>
          </section>
        </div>

        {/* Experience Section */}
        {content.experience.length > 0 && (
          <div id="experience" className="p-[1.11vw] md:px-[2.22vw] lg:px-[2.7vw] bg-dark-01">
            <section className="py-14 md:py-20 m-auto w-full border-t border-white-01/10">
              <ScrollReveal>
                <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-20 lg:items-start">
                  <div className="col-span-12 lg:col-span-5">
                    <h2 className="text-[1.875rem] md:text-[3.375rem] lg:text-[3.75vw] font-medium text-white-01 leading-none">
                      {t.experience.title}
                    </h2>
                  </div>
                  <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
                    {content.experience.map((item) => (
                      <div
                        key={item.id}
                        className="relative py-8 px-8 lg:py-[2vw] lg:px-[2vw] flex flex-col justify-between bg-white-01/5 hover:bg-green-01 group transition-colors duration-300 border border-white-01/10"
                      >
                        <div className="flex items-center justify-between mb-8">
                          <span className="text-white-01 group-hover:text-dark-01 text-base xl:text-[1vw] font-medium uppercase transition-colors">
                            {item.period || 'Experience'}
                          </span>
                          <Briefcase className="w-7 h-7 xl:w-[2vw] xl:h-[2vw] text-white-01 group-hover:text-dark-01 group-hover:scale-110 transition-all" />
                        </div>
                        <div className="flex flex-col">
                          <div className="text-[1.5rem] md:text-[2vw] font-medium text-white-01 group-hover:text-dark-01 transition-colors leading-tight mb-2">
                            {item.role}
                          </div>
                          {item.company && (
                            <div className="text-[1rem] md:text-[1.18vw] text-white-01/70 group-hover:text-dark-01/80 transition-colors uppercase tracking-widest">
                              {item.company}
                            </div>
                          )}
                          {item.description && (
                            <p className="mt-4 text-white-01/70 group-hover:text-dark-01/80 text-sm md:text-[1vw] leading-relaxed transition-colors">
                              {item.description}
                            </p>
                          )}
                          {item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-5">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 border border-white-01/20 group-hover:border-dark-01/20 text-white-01/70 group-hover:text-dark-01/80 text-[0.65rem] xl:text-[0.7vw] uppercase tracking-widest transition-colors"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-6 inline-flex items-center gap-2 text-xs xl:text-[0.75vw] uppercase tracking-widest font-bold text-white-01 group-hover:text-dark-01 transition-colors"
                            >
                              Detail
                              <img src="/arrow_top_right_white.svg" className="w-3 h-3 group-hover:invert" alt="" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </section>
          </div>
        )}

        {/* Education Section */}
        {content.education.length > 0 && (
          <div id="education" className="p-[1.11vw] md:px-[2.22vw] lg:px-[2.7vw] bg-dark-01">
            <section className="py-14 md:py-20 m-auto w-full border-t border-white-01/10">
              <ScrollReveal>
                <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-20 lg:items-start">
                  <div className="col-span-12 lg:col-span-5">
                    <h2 className="text-[1.875rem] md:text-[3.375rem] lg:text-[3.75vw] font-medium text-white-01 leading-none">
                      {t.education.title}
                    </h2>
                  </div>
                  <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
                    {content.education.map((item) => (
                      <div
                        key={item.id}
                        className="relative py-8 px-8 lg:py-[2vw] lg:px-[2vw] flex flex-col justify-between bg-white-01/5 hover:bg-green-01 group transition-colors duration-300 border border-white-01/10"
                      >
                        <div className="flex items-center justify-between mb-8">
                          <span className="text-white-01 group-hover:text-dark-01 text-base xl:text-[1vw] font-medium uppercase transition-colors">
                            {item.year || 'Education'}
                          </span>
                          {item.icon.startsWith('/') ? (
                            <img
                              src={item.icon}
                              alt=""
                              className="w-8 h-8 xl:w-[2.2vw] xl:h-[2.2vw] group-hover:scale-110 transition-transform"
                            />
                          ) : (
                            <span className="text-[2rem] group-hover:scale-110 transition-transform">
                              {item.icon || '🎓'}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <div className="text-[1.5rem] md:text-[2vw] font-medium text-white-01 group-hover:text-dark-01 transition-colors leading-tight mb-2">
                            {item.degree}
                          </div>
                          <div className="text-[1rem] md:text-[1.18vw] text-white-01/70 group-hover:text-dark-01/80 transition-colors uppercase tracking-widest">
                            {item.institution}
                          </div>
                          {item.description && (
                            <p className="mt-4 text-white-01/70 group-hover:text-dark-01/80 text-sm md:text-[1vw] leading-relaxed transition-colors">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </section>
          </div>
        )}

        {/* Skills Section */}
        {content.skills.length > 0 && (
          <div id="skills" className="p-[1.11vw] md:px-[2.22vw] lg:px-[2.7vw] bg-dark-01">
            <section className="py-14 md:py-20 m-auto w-full border-t border-white-01/10">
              <ScrollReveal>
                <h2 className="text-[1.875rem] md:text-[3.375rem] lg:text-[3.75vw] font-medium text-white-01 leading-none mb-12">
                  {t.skills.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-[1.38vw]">
                  {content.skills.map((skill, index) => (
                    <div
                      key={skill.id}
                      className={`relative p-6 lg:p-[2vw] flex flex-col justify-between aspect-square md:aspect-[4/3] group transition-all duration-500 hover:-translate-y-2 ${
                        index % 3 === 2 ? 'bg-[#c9c9c9]' : 'bg-white-01'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-dark-01 text-xs md:text-sm xl:text-[0.9vw] font-medium uppercase tracking-widest">{skill.tag1}</span>
                        <span className="text-dark-01 text-xs md:text-sm xl:text-[0.9vw] font-medium uppercase tracking-widest">{skill.tag2}</span>
                      </div>

                      <div className="flex flex-col items-center justify-center text-center flex-1 py-4">
                        {skill.icon.startsWith('/') ? (
                          <img src={skill.icon} alt={skill.name} className="w-16 h-16 xl:w-[5vw] xl:h-[5vw] mb-6 md:mb-[1.5vw]" />
                        ) : (
                          <span className="text-5xl mb-6 md:mb-[1.5vw]">{skill.icon || '⚡'}</span>
                        )}
                        <h3 className="text-[2rem] md:text-[2.2vw] font-medium text-dark-01 leading-none tracking-tight mb-6 md:mb-[1.5vw]">
                          {skill.name}
                        </h3>
                        <div className="w-16 md:w-[4vw] h-[1px] bg-dark-01/30 mb-6 md:mb-[1.5vw]"></div>
                        <p className="text-dark-01/80 text-sm md:text-[1vw] max-w-[85%] leading-relaxed">
                          {skill.description}
                        </p>
                      </div>

                      <div className="flex items-end justify-between">
                        <span className="text-dark-01 text-sm xl:text-[1vw] font-bold">
                          {String(index + 1).padStart(3, '0')}.
                        </span>
                        <span className="text-dark-01 text-xs md:text-sm xl:text-[0.9vw] font-medium uppercase tracking-widest opacity-80">
                          SKILL
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </section>
          </div>
        )}

        {/* Projects Section */}
        {content.projects.length > 0 && (
          <div id="projects" className="p-[1.11vw] md:px-[2.22vw] lg:px-[2.7vw] bg-dark-01">
            <section className="py-14 md:py-20 m-auto w-full border-t border-white-01/10">
              <ScrollReveal>
                <h2 className="text-[1.875rem] md:text-[3.375rem] lg:text-[3.75vw] font-medium text-white-01 leading-none mb-12">
                  {t.projects.title}
                </h2>
                <div className="flex flex-col gap-6 md:gap-8 xl:gap-[2vw]">
                  {content.projects.map((project, index) => (
                    <div
                      key={project.id}
                      className="grid grid-cols-1 lg:grid-cols-2 border border-white-01/20 group hover:border-green-01/50 transition-colors duration-500 lg:min-h-[400px] xl:min-h-[25vw]"
                    >
                      <div className="relative border-b lg:border-b-0 lg:border-r border-white-01/20 p-8 xl:p-[3vw] flex items-center justify-center overflow-hidden bg-dark-01 min-h-[300px]">
                        <div className="absolute top-4 left-4 xl:top-[1.5vw] xl:left-[1.5vw] flex gap-[4px] z-20">
                          <div className="w-[6px] h-[6px] xl:w-[0.4vw] xl:h-[0.4vw] rounded-full bg-green-01"></div>
                          <div className="w-[6px] h-[6px] xl:w-[0.4vw] xl:h-[0.4vw] rounded-full border border-white-01/50"></div>
                          <div className="w-[6px] h-[6px] xl:w-[0.4vw] xl:h-[0.4vw] rounded-full border border-white-01/50"></div>
                        </div>
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            className="w-[90%] h-[90%] object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                          />
                        ) : (
                          <div className="w-[90%] h-[90%] border border-white-01/10 flex items-center justify-center bg-white-01/5">
                            <span className="text-[5rem] font-medium text-white-01/10">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col relative bg-dark-01">
                        <div className="absolute top-4 left-4 xl:top-[1.5vw] xl:left-[1.5vw] text-[0.65rem] xl:text-[0.7vw] uppercase font-bold tracking-widest text-white-01 z-20">
                          {project.tags[0] || 'PRJ'}
                        </div>
                        <div className="absolute top-4 right-4 xl:top-[1.5vw] xl:right-[1.5vw] text-[0.65rem] xl:text-[0.7vw] uppercase font-bold tracking-widest text-white-01 z-20">
                          {project.tags[1] || 'DEV'}
                        </div>

                        <div className="flex-1 flex items-center justify-center p-8 lg:p-12 xl:p-[4vw] border-b border-white-01/20 relative overflow-hidden min-h-[150px]">
                          <h3 className="text-[1.75rem] md:text-[2rem] xl:text-[2.2vw] font-medium text-white-01 text-center group-hover:text-green-01 transition-colors leading-tight relative z-10 max-w-[90%]">
                            {project.title}
                          </h3>
                          <div className="absolute inset-0 bg-green-01/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        </div>

                        <div className="flex-1 flex items-center justify-center p-8 lg:p-12 xl:p-[4vw] relative overflow-hidden min-h-[150px]">
                          <p className="text-white-01/80 text-sm md:text-base xl:text-[1.1vw] text-center max-w-[85%] leading-relaxed relative z-10 group-hover:opacity-0 transition-opacity duration-300">
                            {project.description}
                          </p>

                          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                            {project.demoUrl && (
                              <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-dark-01 bg-green-01 px-6 py-2 md:px-8 md:py-3 rounded-full uppercase text-xs xl:text-[0.8vw] font-bold tracking-widest hover:scale-105 transition-transform flex items-center gap-2">
                                Demo <img src="/arrow_top_right_white.svg" className="w-3 h-3 xl:w-[0.8vw] xl:h-[0.8vw] invert-[1]" alt="" />
                              </a>
                            )}
                            {project.githubUrl && (
                              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-white-01 border border-white-01/30 px-6 py-2 md:px-8 md:py-3 rounded-full uppercase text-xs xl:text-[0.8vw] font-bold tracking-widest hover:border-green-01 hover:text-green-01 transition-colors flex items-center gap-2">
                                Code <img src="/arrow_top_right_white.svg" className="w-3 h-3 xl:w-[0.8vw] xl:h-[0.8vw]" alt="" />
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="absolute bottom-4 left-4 xl:bottom-[1.5vw] xl:left-[1.5vw] text-[0.65rem] xl:text-[0.7vw] font-bold tracking-widest text-white-01 z-20 pointer-events-none">
                          {String(index + 1).padStart(3, '0')}.
                        </div>
                        <div className="absolute bottom-4 right-4 xl:bottom-[1.5vw] xl:right-[1.5vw] text-[0.65rem] xl:text-[0.7vw] uppercase font-bold tracking-widest text-white-01 z-20 pointer-events-none">
                          {project.tags[2] || 'APP'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </section>
          </div>
        )}

        {/* Contact Section */}
        <div id="contact" className="p-[1.11vw] md:px-[2.22vw] lg:px-[2.7vw] bg-dark-01">
          <section className="py-14 md:py-24 m-auto w-full border-t border-white-01/10 text-center">
            <ScrollReveal>
              <h2 className="text-[3.125rem] md:text-[7.66vw] md:tracking-[-0.25rem] font-medium leading-none text-white-01 mb-6">
                {t.contact.title}
              </h2>
              <p className="text-[1.25rem] md:text-[2vw] font-normal text-white-01/70 mb-16 max-w-3xl mx-auto">
                {t.contact.description}
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 xl:gap-[2vw]">
                {profile.socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative py-4 px-8 lg:py-[1.5vw] lg:px-[3vw] flex items-center justify-center bg-white-01/5 hover:bg-green-01 transition-colors duration-300 border border-white-01/10 cursor-pointer overflow-hidden w-full md:w-auto min-w-[200px]"
                  >
                    <span className="text-white-01 group-hover:text-dark-01 text-lg xl:text-[1.25vw] font-medium uppercase transition-colors tracking-widest">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-white-01 text-dark-01 overflow-hidden relative">
          <div className="p-[1.11vw] md:px-[2.22vw] lg:px-[2.7vw] pt-16 md:pt-24 pb-8 flex flex-col gap-12 md:gap-24">
            <div className="flex items-start gap-6">
              <div className="bg-dark-01 text-white-01 w-16 h-16 md:w-[6vw] md:h-[6vw] rounded-2xl flex items-center justify-center font-bold text-2xl md:text-[2.5vw] hover:bg-green-01 hover:text-dark-01 transition-colors duration-300">
                {logo}
              </div>
              <h2 className="text-2xl md:text-[2.5vw] font-medium leading-tight max-w-md">
                Unlock your full <br className="hidden md:block" /> potential with AI.
              </h2>
            </div>

            <div className="w-full flex items-center py-4 md:py-8 overflow-hidden relative">
              <div className="absolute top-0 w-full h-[1px] bg-dark-01/20"></div>
              <div className="absolute bottom-0 w-full h-[1px] bg-dark-01/20"></div>
              <div className="flex gap-12 md:gap-[4vw] items-center animate-ticker whitespace-nowrap will-change-transform w-max">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex gap-12 md:gap-[4vw] items-center shrink-0">
                    <span className="shrink-0 text-[8rem] md:text-[18vw] font-medium tracking-tight leading-none text-dark-01 hover:text-green-01 transition-colors duration-300">
                      {firstName}
                    </span>
                    <div className="shrink-0 flex items-center justify-center">
                      <img src="/star.svg" alt="star" className="w-[40px] h-[40px] md:w-[6vw] md:h-[6vw] hover:rotate-180 transition-transform duration-700" />
                    </div>
                    <span className="shrink-0 text-[8rem] md:text-[18vw] font-medium tracking-tight leading-none text-dark-01 hover:text-green-01 transition-colors duration-300">
                      {profile.name.split(/\s+/).slice(1).join(' ') || profile.name}
                    </span>
                    <div className="shrink-0 flex items-center justify-center">
                      <img src="/star.svg" alt="star" className="w-[40px] h-[40px] md:w-[6vw] md:h-[6vw] hover:rotate-180 transition-transform duration-700" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-4 items-end pb-8">
              <div className="lg:col-span-6 flex flex-col gap-6">
                <p className="text-xl md:text-[1.5vw] font-medium tracking-tight">Innovate. Customize. Collaborate.</p>
                <a href="#contact" className="text-3xl md:text-[3vw] font-bold border-b-[4px] md:border-b-[0.4vw] border-dark-01 self-start hover:text-green-01 hover:border-green-01 transition-all duration-300 flex items-center gap-2 pb-1">
                  Find out more
                  <img src="/arrow_top_right_black.svg" className="w-8 h-8 md:w-[2.5vw] md:h-[2.5vw]" alt="arrow" />
                </a>
              </div>
              <div className="lg:col-span-6 flex justify-between lg:justify-end gap-12 xl:gap-[6vw]">
                <div className="flex flex-col gap-4">
                  <span className="text-xs md:text-sm uppercase tracking-widest font-medium opacity-50 mb-2">Socials</span>
                  {profile.socials.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base md:text-[1.1vw] font-medium hover:text-green-01 transition-colors"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-xs md:text-sm uppercase tracking-widest font-medium opacity-50 mb-2">{'//'}</span>
                  <a href="#about" className="text-base md:text-[1.1vw] font-medium hover:text-green-01 transition-colors">About</a>
                  {content.experience.length > 0 && (
                    <a href="#experience" className="text-base md:text-[1.1vw] font-medium hover:text-green-01 transition-colors">Experience</a>
                  )}
                  <a href="#projects" className="text-base md:text-[1.1vw] font-medium hover:text-green-01 transition-colors">Projects</a>
                  <a href="#contact" className="text-base md:text-[1.1vw] font-medium hover:text-green-01 transition-colors">Contact</a>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-dark-01/10">
              <span className="text-sm font-medium opacity-50" suppressHydrationWarning>
                © {new Date().getFullYear()} {profile.name.toUpperCase()}
              </span>
              <span className="text-sm font-medium uppercase tracking-widest opacity-50">Built with Next.js</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
