import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, Github, ArrowUpRight, Check, Eye } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import ProjectModal from './ProjectModal';
import { getAssetUrl } from '../utils/assets';

export default function Projects({ t, lang }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { id: 'all', label: t.projects.all },
    { id: 'web', label: t.projects.filterWeb },
    { id: 'ads', label: t.projects.filterAds },
    { id: 'ai', label: t.projects.filterAi },
    { id: 'security', label: t.projects.filterSecurity },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter || p.categories?.includes(activeFilter));

  return (
    <section id="projects" className="py-20 relative">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            <span className="gradient-text">{t.projects.title}</span>
          </motion.h2>
          <p className="section-subtitle max-w-2xl mx-auto">{t.projects.subtitle}</p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeFilter === f.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                  : 'glass text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects 2-Column Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-16"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => {
              const title = project.title[lang] || project.title.en;
              const subtitle = project.subtitle[lang] || project.subtitle.en;
              const summary = project.summary[lang] || project.summary.en;
              const features = project.features?.[lang] || project.features?.en || [];

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-2xl hover:shadow-blue-500/10"
                >
                  {/* Top Image Box */}
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="relative h-52 sm:h-60 overflow-hidden cursor-pointer bg-slate-950"
                  >
                    {/* Dynamic Gradient Tint Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-35 transition-opacity duration-300 z-10`}
                    />

                    {/* Image with zoom */}
                    <img
                      src={getAssetUrl(project.image)}
                      alt={title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Badge on corner */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-amber-400">
                        {project.badge?.[lang] || project.badge?.en}
                      </span>
                    </div>

                    {/* Search preview hover icon */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 shadow-xl group-hover:scale-110 transition-transform">
                        <Search className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="text-lg sm:text-xl font-bold mb-2 text-slate-100 group-hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {title}
                    </h3>

                    <p className="text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed flex-grow line-clamp-3">
                      {summary}
                    </p>

                    {/* Features Badges */}
                    {features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {features.slice(0, 3).map((feat, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-slate-700/40 rounded-md text-[11px] text-slate-300 border border-slate-600/40 flex items-center gap-1"
                          >
                            <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                            <span>{feat}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full text-[11px] text-slate-300 border border-slate-700/60 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-700/40">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 rounded-xl text-slate-200 text-xs font-bold transition-all"
                      >
                        <Eye className="w-4 h-4 text-blue-400" />
                        <span>{lang === 'ar' ? 'التفاصيل والنتائج' : 'Details & Metrics'}</span>
                      </button>

                      {project.demoUrl && project.demoUrl !== '#' && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white text-xs font-bold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                        >
                          <span>{t.projects.liveDemo}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Want to see more? GitHub Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center py-12 px-6 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl max-w-3xl mx-auto card-hover"
        >
          <h3 className="text-2xl font-bold mb-3 text-slate-100">
            {t.projects.viewMore}
          </h3>
          <p className="text-slate-400 text-sm mb-6 max-w-xl mx-auto leading-relaxed">
            {t.projects.viewMoreDesc}
          </p>
          <a
            href="https://github.com/mostafabodye"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
          >
            <Github className="w-5 h-5" />
            <span>{t.projects.githubCTA}</span>
          </a>
        </motion.div>
      </div>

      {/* Lightbox / Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        t={t}
        lang={lang}
      />
    </section>
  );
}
