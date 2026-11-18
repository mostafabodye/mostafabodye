import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Search, 
  ArrowUpRight, 
  Check, 
  Eye, 
  MessageSquare, 
  Phone, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Play, 
  Globe, 
  FileText, 
  MousePointer, 
  TrendingUp,
  Award
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import ProjectModal from './ProjectModal';
import { getAssetUrl } from '../utils/assets';

export default function Projects({ t, lang, onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { id: 'all', label: t.projects?.all || (lang === 'ar' ? 'جميع الأعمال' : 'All Projects') },
    { id: 'winch', label: t.projects?.filterWinch || (lang === 'ar' ? '🚗 أوناش وسيارات' : '🚗 Winch & Fleet') },
    { id: 'legal', label: t.projects?.filterLegal || (lang === 'ar' ? '⚖️ منصات قانونية وسند' : '⚖️ LegalTech & Sanad') },
    { id: 'ecommerce', label: t.projects?.filterEcommerce || (lang === 'ar' ? '🛒 متاجر وبراندات' : '🛒 E-Commerce & Stores') },
    { id: 'medical', label: t.projects?.filterMedical || (lang === 'ar' ? '🏥 عيادات ومستشفيات' : '🏥 Medical & Clinics') },
    { id: 'corporate', label: t.projects?.filterCorporate || (lang === 'ar' ? '🏢 شركات ومقاولات B2B' : '🏢 Corporate & B2B') },
    { id: 'systems', label: t.projects?.filterSystems || (lang === 'ar' ? '💻 أنظمة تفاعلية (SaaS)' : '💻 Interactive SaaS') },
    { id: 'ads', label: t.projects?.filterAds || (lang === 'ar' ? '📈 إعلانات ممولة موثقة' : '📈 Paid Ads & Growth') },
    { id: 'ai', label: t.projects?.filterAi || (lang === 'ar' ? '🎬 استوديو الذكاء الاصطناعي' : '🎬 AI Studio') },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter || p.categories?.includes(activeFilter));

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/10 via-amber-500/10 to-purple-600/10 blur-[130px] pointer-events-none rounded-full" />
      
      <div className="container-max relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-bold">
            <Award className="w-4 h-4 text-amber-400" />
            <span>{lang === 'ar' ? 'معرض المشاريع والمنصات الكبرى 🏆' : 'Enterprise Projects & Live Platforms 🏆'}</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title text-3xl sm:text-5xl font-black text-white"
          >
            <span className="gradient-text">{t.projects?.title || (lang === 'ar' ? 'معرض الأعمال والمنصات التفاعلية' : 'Interactive Portfolio & Projects')}</span>
          </motion.h2>

          <p className="section-subtitle max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.projects?.subtitle || (lang === 'ar' 
              ? 'نماذج حية مختارة تغطي كبرى قطاعات البيزنس في مصر والشرق الأوسط بأنظمة برمجية وحملات إعلانية معتمدة' 
              : 'Handcrafted production platforms and multi-channel growth systems deployed across Egypt and the MENA region')}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-14">
          {filters.map((f) => {
            const count = f.id === 'all'
              ? projectsData.length
              : projectsData.filter((p) => p.category === f.id || p.categories?.includes(f.id)).length;

            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`group px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-105 border border-blue-400/50'
                    : 'glass text-slate-300 hover:text-white hover:border-slate-600 hover:bg-slate-800/60'
                }`}
              >
                <span>{f.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono transition-colors ${
                  activeFilter === f.id
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects 2-Column Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-8 sm:gap-10 mb-20"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => {
              const title = project.title[lang] || project.title.en;
              const subtitle = project.subtitle[lang] || project.subtitle.en;
              const summary = project.summary[lang] || project.summary.en;
              const features = project.features?.[lang] || project.features?.en || [];
              const cleanUrl = project.website 
                ? project.website.replace(/^https?:\/\//, '').replace(/\/$/, '')
                : (project.demoUrl && project.demoUrl.startsWith('http') 
                    ? project.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') 
                    : `${project.id}.am-agency.eg`);

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group bg-slate-900/70 backdrop-blur-md border border-slate-700/60 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 flex flex-col h-full shadow-2xl hover:shadow-blue-500/10"
                >
                  {/* Apple iMac Desktop Mockup Frame */}
                  <div className="relative pt-3 px-3 sm:pt-4 sm:px-4 bg-slate-950/80 border-b border-slate-800/80">
                    <div 
                      className="mac-monitor-frame relative group/screen cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Top Mac Window Bar */}
                      <div className="absolute top-0 left-0 right-0 h-6 bg-slate-900/95 border-b border-slate-800/90 flex items-center px-3 z-30 justify-between select-none pointer-events-none">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono truncate max-w-[200px] bg-slate-950/80 px-2.5 py-0.5 rounded border border-slate-800 text-center">
                          {cleanUrl}
                        </div>
                        <div className="w-6" />
                      </div>

                      {/* Screen Viewport with smooth auto-scroll on hover */}
                      <div className="mac-screen-content pt-6">
                        <img
                          src={getAssetUrl(project.image)}
                          alt={title}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80';
                          }}
                          className="w-full h-auto object-cover object-top"
                        />

                        {/* Top Hover Tip Banner */}
                        <div className="absolute top-8 inset-x-0 flex justify-center opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                          <span className="px-3 py-1 bg-slate-950/90 text-sky-400 text-[11px] font-semibold rounded-full border border-sky-500/40 shadow-xl backdrop-blur-sm flex items-center gap-1.5">
                            <MousePointer className="w-3.5 h-3.5 animate-bounce" />
                            <span>{t.projects?.hoverTip || (lang === 'ar' ? 'حرّك الماوس للتمرير التلقائي الكامل' : 'Hover to auto-scroll full page')}</span>
                          </span>
                        </div>

                        {/* Floating Badge on Screen */}
                        <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
                          <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-slate-950/90 backdrop-blur-md border border-slate-700/80 text-amber-400 shadow-xl">
                            {project.badge?.[lang] || project.badge?.en}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* iMac Aluminum Stand Neck & Base */}
                    <div className="mac-stand-neck" />
                    <div className="mac-stand-base" />
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 sm:p-7 flex flex-col flex-grow">
                    {/* Client & Country Badge */}
                    {project.client && (
                      <div className="flex items-center gap-2 mb-2.5 text-xs font-semibold text-slate-400">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="truncate">{project.client[lang] || project.client.en}</span>
                      </div>
                    )}

                    {/* Project Title */}
                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="text-lg sm:text-xl font-black mb-2 text-slate-100 group-hover:text-blue-400 transition-colors cursor-pointer leading-snug"
                    >
                      {title}
                    </h3>

                    {/* Subtitle / Summary */}
                    <p className="text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-3">
                      {summary || subtitle}
                    </p>

                    {/* Metrics / Results Chips */}
                    {project.results && project.results.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 p-3 mb-4 bg-slate-950/70 border border-slate-800/80 rounded-2xl">
                        {project.results.map((res, i) => (
                          <div key={i} className="text-center px-1">
                            <div className="text-xs sm:text-sm font-black text-amber-400">{res.value}</div>
                            <div className="text-[10px] text-slate-400 truncate mt-0.5">{res.label[lang] || res.label.en}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Features Badges */}
                    {features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {features.slice(0, 3).map((feat, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-slate-800/60 rounded-lg text-[11px] text-slate-300 border border-slate-700/60 flex items-center gap-1.5"
                          >
                            <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                            <span className="truncate max-w-[200px]">{feat}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-md text-[10px] sm:text-[11px] text-slate-300 border border-slate-700/50 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="flex items-center gap-2.5 pt-4 border-t border-slate-800/80 mt-auto">
                      {/* Button 1: Case Study */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-200 text-xs font-bold transition-all hover:scale-[1.02] cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span>{t.projects?.caseStudy || (lang === 'ar' ? 'دراسة الحالة والأرقام' : 'Case Study & Details')}</span>
                      </button>

                      {/* Button 2: Live Link / System */}
                      {project.demoUrl && (project.demoUrl.startsWith('http') || project.demoUrl.includes('.html')) ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-white text-xs font-bold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] cursor-pointer"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>
                            {project.demoUrl.includes('calculator') 
                              ? (lang === 'ar' ? 'الحاسبة الحية 🧮' : 'Calculator 🧮')
                              : project.demoUrl.includes('facebook.com')
                                ? (lang === 'ar' ? 'صفحة فيسبوك ↗' : 'Facebook Page ↗')
                                : (t.projects?.visitSite || (lang === 'ar' ? 'زيارة الموقع لايف ↗' : 'Live Website ↗'))}
                          </span>
                        </a>
                      ) : project.video ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-gradient-to-r from-purple-600 to-rose-600 rounded-xl text-white text-xs font-bold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] cursor-pointer"
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
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-slate-950 text-xs font-black transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-[1.02] cursor-pointer"
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
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-slate-950 text-xs font-black transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 hover:scale-[1.02] cursor-pointer"
                        >
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? 'نتائج الحملة 📊' : 'Campaign Stats 📊'}</span>
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
          className="text-center py-12 px-6 sm:px-12 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-md border border-amber-500/30 rounded-3xl max-w-3xl mx-auto shadow-2xl shadow-amber-500/5 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
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
