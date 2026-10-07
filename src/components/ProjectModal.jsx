import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle, TrendingUp, AlertCircle, Lightbulb, MessageSquare, Sparkles } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function ProjectModal({ project, isOpen, onClose, t, lang }) {
  const isRtl = lang === 'ar';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const title = project.title[lang] || project.title.en;
  const subtitle = project.subtitle[lang] || project.subtitle.en;
  const summary = project.summary[lang] || project.summary.en;
  const challenge = project.challenge[lang] || project.challenge.en;
  const solution = project.solution[lang] || project.solution.en;
  const features = project.features?.[lang] || project.features?.en || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Dialog Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 border border-blue-500/30 text-blue-400">
                {project.badge?.[lang] || project.badge?.en}
              </span>
              <span className="text-slate-400 text-xs font-semibold hidden sm:inline">
                {project.client?.[lang] || project.client?.en}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label={t.projects.lightbox.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="overflow-y-auto p-6 space-y-6">
            {/* Project Media Banner (Image or Video) */}
            <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden border border-slate-800 bg-black flex items-center justify-center">
              {project.video ? (
                <video
                  src={getAssetUrl(project.video)}
                  poster={getAssetUrl(project.image)}
                  controls
                  playsInline
                  autoPlay
                  muted
                  loop
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <img
                  src={getAssetUrl(project.image)}
                  alt={title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80';
                  }}
                  className="w-full h-full object-cover object-center"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">{title}</h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 drop-shadow">{subtitle}</p>
              </div>
            </div>

            {/* Tags Bar */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Summary */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {summary}
            </p>

            {/* Results Counters */}
            {project.results && project.results.length > 0 && (
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                {project.results.map((res, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-lg sm:text-2xl font-black text-amber-400">
                      {res.value}
                    </p>
                    <p className="text-slate-400 text-xs font-semibold mt-0.5">
                      {res.label[lang] || res.label.en}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Challenge & Solution Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{t.projects.details.challenge}</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {challenge}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Lightbulb className="w-4 h-4" />
                  <span>{t.projects.details.solution}</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {solution}
                </p>
              </div>
            </div>

            {/* Features List */}
            {features.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-sm font-bold text-slate-200">
                  {lang === 'ar' ? 'أبرز مميزات العمل:' : 'Core Execution Deliverables:'}
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between gap-4">
            <span className="text-slate-500 text-xs hidden sm:inline">
              {t.projects.lightbox.hint}
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                {t.projects.lightbox.close}
              </button>

              {project.demoUrl && project.demoUrl.startsWith('http') && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 transition-all flex items-center gap-1.5 shadow-lg shadow-blue-500/25"
                >
                  <span>{lang === 'ar' ? 'زيارة الموقع المباشر 🌐' : 'Open Live Site 🌐'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.demoUrl === '#systems-hub' && (
                <a
                  href="#systems-hub"
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 transition-all flex items-center gap-1.5 shadow-lg shadow-amber-500/25"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'تجربة وتحميل الأنظمة ⚡' : 'Try & Download ⚡'}</span>
                </a>
              )}

              {(!project.demoUrl || !project.demoUrl.startsWith('http')) && project.demoUrl !== '#systems-hub' && (
                <a
                  href={`https://wa.me/201098174992?text=${encodeURIComponent(
                    `مرحباً عبد السلام، أرغب في استشارة وطلب تنفيذ عمل مماثل لـ: ${project.title?.[lang] || project.title?.ar}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/25"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'طلب تنفيذ عمل مماثل 💬' : 'Order Similar 💬'}</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
