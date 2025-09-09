import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

export function ProjectsSection() {
  const { t } = useLanguage();

  const projects = [
  {
    id: 1,
    title: 'ChainSense – Supply Chain Risk Analyzer',
    description: 'ChainSense is a comprehensive supply chain risk analysis platform',
    tags: ['Python', 'Streamlit', 'Supply Chain'],
    gradient: 'from-blue-600/20 to-purple-600/20',
    image: '',
    githubUrl: 'https://github.com/fhmi-kzkf/ChainSense',
    demoUrl: 'https://chainsense.streamlit.app/'
  },
  {
    id: 2,
    title: 'FlowForge – An Interactive ETL Platform for Everyone!',
    description: 'FlowForge is a "state-of-the-art interactive web-based ETL platform" built with Python and Streamlit.',
    tags: ['Python', 'Data Engineering', 'ETL'],
    gradient: 'from-green-600/20 to-blue-600/20',
    image: '',
    githubUrl: 'https://github.com/fhmi-kzkf/FlowForge',
    demoUrl: 'https://flowforge.streamlit.app/'
  },
  {
    id: 3,
    title: 'DataMind – A Comprehensive Data Analysis & Machine Learning Platform',
    description: 'A comprehensive web-based data analysis & ML platform built with Streamlit. Upload CSV/Excel files, perform advanced EDA, clean data, create visualizations, train multiple ML models, and compare results.',
    tags: ['Machine Learning', 'Data Analysis'],
    gradient: 'from-purple-600/20 to-pink-600/20',
    image: '',
    githubUrl: 'https://github.com/fhmi-kzkf/DataMind',
    demoUrl: 'https://datamind-automl.streamlit.app/'
  },
  {
    id: 4,
    title: 'IntelliLearn AI',
    description: 'IntelliLearn AI is a comprehensive AI learning platform designed for learners of all levels (Beginner, Intermediate, Advanced). The platform offers a micro-learning approach with interactive quizzes, gamification features, and AI tutor integration to make learning AI concepts engaging and effective.',
    tags: ['Django', 'Learning Platform'],
    gradient: 'from-green-600/20 to-blue-600/20',
    image: '',
    githubUrl: 'https://github.com/fhmi-kzkf/IntelliLearn-AI',
    demoUrl: ''
  },
  {
    id: 5,
    title: 'LearnInSnap',
    description: 'LearnInSnap is an interactive educational platform that offers bite-sized courses for college students to quickly acquire practical digital skills. Each course is designed to be completed in under 30 minutes, making it perfect for students with busy schedules.',
    tags: ['Html', 'Typescript', 'React'],
    gradient: 'from-purple-600/20 to-pink-600/20',
    image: '',
    githubUrl: 'https://github.com/fhmi-kzkf/learninsnap',
    demoUrl: 'https://learninsnap.vercel.app/'
  },
  {
    id: 6,
    title: 'Project Web For My Brand Astral Project',
    description: 'Website For Everyone Who Loves Anime And Manga Poster,Shirt and Hoodie',
    tags: ['Html', 'Bootstrap'],
    gradient: 'from-green-600/20 to-blue-600/20',
    image: '',
    githubUrl: '',
    demoUrl: ''
  }
];

  return (
    <section id="projects" className="py-20 relative">
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
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm hover:bg-gray-900/90 transition-all duration-300 h-full group-hover:border-gray-600">
                  <CardContent className="p-6">
                    <div className={`w-full h-32 bg-gradient-to-br ${project.gradient} border border-white/10 rounded-lg mb-6 opacity-80 group-hover:opacity-100 transition-opacity`}>
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white text-4xl font-bold opacity-50">
                          {project.id}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-gray-800 text-gray-300 border-gray-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex space-x-4">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-400 hover:text-white transition-colors hover:scale-105 transform duration-200"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        <span className="text-sm">Code</span>
                      </a>
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-400 hover:text-white transition-colors hover:scale-105 transform duration-200"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        <span className="text-sm">Demo</span>
                      </a>
                    </div>
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