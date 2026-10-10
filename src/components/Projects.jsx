import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, ArrowUpRight, Check, Eye, MessageSquare, Phone, Sparkles, ShieldCheck, Zap, Play } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import ProjectModal from './ProjectModal';
import { getAssetUrl } from '../utils/assets';

export default function Projects({ t, lang, onNavigate }) {
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
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-700/40">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 rounded-xl text-slate-200 text-xs font-bold transition-all"
                      >
                        <Eye className="w-4 h-4 text-blue-400" />
                        <span>{lang === 'ar' ? 'التفاصيل والنتائج' : 'Details & Metrics'}</span>
                      </button>

                      {project.demoUrl && project.demoUrl.startsWith('http') ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white text-xs font-bold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                        >
                          <span>
                            {project.demoUrl.includes('facebook.com')
                              ? (lang === 'ar' ? 'صفحة فيسبوك ↗' : 'Facebook Page ↗')
                              : (lang === 'ar' ? 'الموقع المباشر 🌐' : 'Live Site 🌐')}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : project.video ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-purple-500 to-rose-600 rounded-xl text-white text-xs font-bold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{lang === 'ar' ? 'تشغيل الفيديو 🎬' : 'Watch Video 🎬'}</span>
                        </button>
                      ) : project.demoUrl === '#systems-hub' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onNavigate) onNavigate('systems');
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-slate-950 text-xs font-black transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
                        >
                          <span>{lang === 'ar' ? 'فتح منصة البرامج 💻' : 'Open Systems Hub 💻'}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-slate-950 text-xs font-black transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25"
                        >
                          <span>{lang === 'ar' ? 'نتائج الحملة 📊' : 'Campaign Results 📊'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Ready for your own custom project/system? Direct Business CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center py-10 px-6 sm:px-10 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-md border border-amber-500/30 rounded-3xl max-w-3xl mx-auto shadow-2xl shadow-amber-500/5 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {lang === 'ar' ? 'حلول برمجية وتسويقية مخصصة لنشاطك التجاري' : 'Custom Software & Growth Systems for Your Business'}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {lang === 'ar' ? (
              <>
                جاهز لتطوير نشاطك أو <span className="text-gradient-gold">طلب نظام مخصص؟</span>
              </>
            ) : (
              <>
                Ready to Launch or Scale Your <span className="text-gradient-gold">Custom System?</span>
              </>
            )}
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {lang === 'ar'
              ? 'سواء كنت بحاجة لنظام كاشير ونقاط بيع، إدارة مطاعم أو عيادات، موقع ويب متكامل، أو حملة تسويقية تضاعف مبيعاتك — تواصل مع عبد السلام مباشرة للحصول على استشارة تقنية مجانية وعرض سعر فوري.'
              : 'Whether you need a POS system, restaurant OS, medical clinic hub, turnkey website, or high-ROI advertising campaign — connect directly with Abdel Salam for a free consultation and instant quote.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/201098174992?text=${encodeURIComponent(
                'مرحباً عبد السلام، أرغب في استشارة تقنية وطلب نظام مخصص لنشاطي التجاري.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 rounded-xl text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{lang === 'ar' ? 'تواصل عبر واتساب واطلب نظامك الآن 💬' : 'Chat on WhatsApp & Order Now 💬'}</span>
            </a>

            <a
              href="tel:01098174992"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-950 border border-slate-700 hover:border-amber-400 text-slate-200 hover:text-white rounded-xl font-bold text-sm transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ar' ? 'اتصال مباشر: 01098174992 📞' : 'Call: +20 1098174992 📞'}</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-[11px] text-slate-400 font-bold">
            <div className="flex items-center justify-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{lang === 'ar' ? 'تسليم خلال 24 ساعة' : '24H Delivery'}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{lang === 'ar' ? 'ضمان ودعم مستمر' : 'Full Warranty'}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{lang === 'ar' ? 'تدريب كامل لفريقك' : 'Staff Onboarding'}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox / Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        t={t}
        lang={lang}
        onNavigate={onNavigate}
      />
    </section>
  );
}
