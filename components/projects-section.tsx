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
    title: 'Auto Data Mining Tools With Streamlit and Python',
    description: 'Manual data mining can be tedious and time-consuming. To streamline this process, I built an interactive web application using Python and Streamlit that automates key data mining tasks—classification, clustering, regression, and association rule mining. Users can upload CSV or Excel files, or select built-in sample datasets, and instantly run multiple machine learning algorithms with comprehensive evaluation metrics and insightful visualizations.',
    tags: ['Python', 'Data Mining'],
    gradient: 'from-blue-600/20 to-purple-600/20',
    image: '/public/images/Auto Datamining.jpg' // pastikan gambar ada di folder public/images
  },
  {
    id: 2,
    title: 'Auto Data Analisis With Streamlit and Python',
    description: 'Im excited to share a Data Analytics Tool I built using Streamlit that enables users to upload CSV datasets and perform comprehensive analytics - from data cleaning 🧹 and descriptive statistics 📈 to predictive modeling 🤖 and clustering 🔍.',
    tags: ['Python', 'Data Analysis'],
    gradient: 'from-green-600/20 to-blue-600/20',
    image: '/public/images/Data Analaitik Tools.jpg'
  },
  {
    id: 3,
    title: 'Project Web For My Brand Astral Project',
    description: 'Website For Everyone Who Loves Anime And Manga Poster,Shirt and Hoodie',
    tags: ['Html', 'Bootstrap'],
    gradient: 'from-purple-600/20 to-pink-600/20',
    image: '/public/images/Astral Project Web.jpg'
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
                      <button className="flex items-center text-gray-400 hover:text-white transition-colors">
                        <Github className="h-4 w-4 mr-1" />
                        <span className="text-sm">Code</span>
                      </button>
                      <button className="flex items-center text-gray-400 hover:text-white transition-colors">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        <span className="text-sm">Demo</span>
                      </button>
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