'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const projects = [
    {
      id: 1,
      title: 'ChainSense – Supply Chain Risk Analyzer',
      description: 'ChainSense is a comprehensive supply chain risk analysis platform',
      tags: ['Python', 'Streamlit', 'Supply Chain'],
      gradient: 'from-blue-600/20 to-purple-600/20',
      image: '/projects/chainsense.png',
      githubUrl: 'https://github.com/fhmi-kzkf/ChainSense',
      demoUrl: 'https://chainsense.streamlit.app/'
    },
    {
      id: 2,
      title: 'FlowForge – An Interactive ETL Platform for Everyone!',
      description: 'FlowForge is a "state-of-the-art interactive web-based ETL platform" built with Python and Streamlit.',
      tags: ['Python', 'Data Engineering', 'ETL'],
      gradient: 'from-green-600/20 to-blue-600/20',
      image: '/projects/flowforge.png',
      githubUrl: 'https://github.com/fhmi-kzkf/FlowForge',
      demoUrl: 'https://flowforge.streamlit.app/'
    },
    {
      id: 3,
      title: 'DataMind – A Comprehensive Data Analysis & Machine Learning Platform',
      description: 'A comprehensive web-based data analysis & ML platform built with Streamlit. Upload CSV/Excel files, perform advanced EDA, clean data, create visualizations, train multiple ML models, and compare results.',
      tags: ['Machine Learning', 'Data Analysis'],
      gradient: 'from-purple-600/20 to-pink-600/20',
      image: '/projects/datamind.png',
      githubUrl: 'https://github.com/fhmi-kzkf/DataMind',
      demoUrl: 'https://datamind-automl.streamlit.app/'
    },
    {
      id: 4,
      title: 'IntelliLearn AI',
      description: 'IntelliLearn AI is a comprehensive AI learning platform designed for learners of all levels (Beginner, Intermediate, Advanced). The platform offers a micro-learning approach with interactive quizzes, gamification features, and AI tutor integration to make learning AI concepts engaging and effective.',
      tags: ['Django', 'Learning Platform'],
      gradient: 'from-green-600/20 to-blue-600/20',
      image: '/projects/intelilearn.png',
      githubUrl: 'https://github.com/fhmi-kzkf/IntelliLearn-AI',
      demoUrl: ''
    },
    {
      id: 5,
      title: 'LearnInSnap',
      description: 'LearnInSnap is an interactive educational platform that offers bite-sized courses for college students to quickly acquire practical digital skills. Each course is designed to be completed in under 30 minutes, making it perfect for students with busy schedules.',
      tags: ['Html', 'Typescript', 'React'],
      gradient: 'from-purple-600/20 to-pink-600/20',
      image: '/projects/learninsnap.png',
      githubUrl: 'https://github.com/fhmi-kzkf/learninsnap',
      demoUrl: 'https://learninsnap.vercel.app/'
    },
    {
      id: 6,
      title: 'DataNest - Data Catalog Management System',
      description: 'DataNest is a Streamlit-based web application for managing data catalogs with three levels of complexity. It\'s designed to help data scientists, analysts, and data teams organize, analyze, and manage their datasets efficiently.',
      tags: ['Streamlit', 'Data Catalog'],
      gradient: 'from-green-600/20 to-blue-600/20',
      image: '/projects/datanest.png',
      githubUrl: 'https://github.com/fhmi-kzkf/DataNest',
      demoUrl: 'https://datanest-proto.streamlit.app/'
    },
    {
      id: 7,
      title: 'SkillGap',
      description: 'A hybrid machine learning approach for dynamic skill gap analysis and personalized course recommendations to bridge career pathway gaps.',
      tags: ['Machine Learning', 'Natural Language Processing'],
      gradient: 'from-green-600/20 to-blue-600/20',
      image: '/projects/skillgap.png',
      githubUrl: 'https://github.com/fhmi-kzkf/SkillGap',
      demoUrl: 'https://skillgap-course.streamlit.app/'
    },
    {
      id: 8,
      title: 'DataDeck',
      description: 'An interactive dashboard built with Streamlit to analyze NFT collections using the OpenSea API v2. View key statistics, recent sales activity, and browse NFT assets with their traits.',
      tags: ['Streamlit', 'NFT Dashboard'],
      gradient: 'from-purple-600/20 to-pink-600/20',
      image: '/projects/datadeck.png',
      githubUrl: 'https://github.com/fhmi-kzkf/DataDeck',
      demoUrl: 'https://datadeck-nft.streamlit.app/'
    },
    {
      id: 9,
      title: 'Prediksi Diabetes',
      description: 'This project predicts whether a patient has diabetes based on medical data using machine learning algorithms.',
      tags: ['Machine Learning', 'Diabetes Prediction', 'Medical Data Analysis'],
      gradient: 'from-green-600/20 to-blue-600/20',
      image: '/projects/diabetes.png',
      githubUrl: 'https://github.com/fhmi-kzkf/prediksi-diabetes',
      demoUrl: 'https://prediksi-diabetes-ml.streamlit.app/'
    }
  ];

  useEffect(() => {
    const cards = document.querySelectorAll('.project-card');

    // Check if we are on mobile to disable complex parallax logic if needed, 
    // or just adjust speeds. For now, keep it simple.

    cards.forEach((card, index) => {
      // Create a floating effect with different speeds for "antigravity" feel
      // Odd items move differently than even items
      const speed = (index % 3 + 1) * 20;

      gsap.to(card, {
        y: -speed, // Move up slightly as we scroll down to create parallax
        scrollTrigger: {
          trigger: card,
          start: "top bottom+=100",
          end: "bottom top",
          scrub: 1,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
            {t.projects.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-card h-full" // Added class for GSAP selection
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm hover:bg-gray-800/90 transition-all duration-300 h-full hover:border-blue-500/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] overflow-hidden">
                    <div className="relative h-48 w-full overflow-hidden">
                      {project.image ? (
                        // If image exists, show it (with hover zoom effect)
                        <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>
                      ) : (
                        // Fallback Gradient Pattern
                        <div className={`w-full h-full bg-gradient-to-br ${project.gradient} relative group-hover:scale-105 transition-transform duration-500`}>
                          <div className="absolute inset-0 opacity-30" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '20px 20px'
                          }} />
                          <div className="flex items-center justify-center h-full">
                            <span className="text-white/40 font-bold text-5xl select-none">{project.id.toString().padStart(2, '0')}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-white mb-3 text-left">
                        {project.title}
                      </h3>

                      <p className="text-gray-300 mb-4 line-clamp-3 text-left">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-gray-800 text-gray-300 border-gray-600">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-4 mt-4">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-400 hover:text-white transition-colors hover:scale-105 transform duration-200"
                          >
                            <Github className="h-4 w-4 mr-1" />
                            <span className="text-sm">Code</span>
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-400 hover:text-white transition-colors hover:scale-105 transform duration-200"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            <span className="text-sm">Demo</span>
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}