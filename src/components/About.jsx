import React from 'react';
import { motion } from 'framer-motion';
import { Check, MapPin, Target, Wrench, Zap, ArrowRight, ArrowLeft } from 'lucide-react';

export default function About({ t, lang }) {
  const isRtl = lang === 'ar';

  const highlights = [
    t.about.highlights.webDev,
    t.about.highlights.responsive,
    t.about.highlights.gads,
    t.about.highlights.aiStudio,
    t.about.highlights.security,
    t.about.highlights.seo,
    t.about.highlights.api,
    t.about.highlights.conversion,
  ];

  return (
    <section id="about" className="py-20 relative">
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
            <span className="gradient-text">{t.about.title}</span>
          </motion.h2>
          <p className="section-subtitle max-w-2xl mx-auto">{t.about.subtitle}</p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {t.about.paragraph1}
            </p>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {t.about.paragraph2}
            </p>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {t.about.paragraph3}
            </p>

            {/* Checkmark Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm shadow-blue-500/30">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-slate-300 text-sm font-medium leading-tight">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats & Quick Facts */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* 3 Stats Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="card-base card-hover text-center p-4">
                <p className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1">+25</p>
                <p className="text-slate-400 text-xs font-medium">{t.about.stats.projects}</p>
              </div>

              <div className="card-base card-hover text-center p-4">
                <p className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1">+15</p>
                <p className="text-slate-400 text-xs font-medium">{t.about.stats.campaigns}</p>
              </div>

              <div className="card-base card-hover text-center p-4">
                <p className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1">+20</p>
                <p className="text-slate-400 text-xs font-medium">{t.about.stats.technologies}</p>
              </div>
            </div>

            {/* Quick Facts Card */}
            <div className="card-base card-hover space-y-5 bg-slate-900/60 border-slate-700/60 shadow-xl">
              <h3 className="text-lg font-bold text-slate-100 pb-2 border-b border-slate-800">
                {t.about.quickFacts.title}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold">{t.about.quickFacts.location}</p>
                    <p className="text-slate-100 text-sm font-medium mt-0.5">{t.about.quickFacts.locationValue}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">🎯</span>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold">{t.about.quickFacts.availability}</p>
                    <p className="text-slate-100 text-sm font-medium mt-0.5">{t.about.quickFacts.availabilityValue}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">⚙️</span>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold">{t.about.quickFacts.stack}</p>
                    <p className="text-slate-100 text-sm font-medium mt-0.5">{t.about.quickFacts.stackValue}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">⚡</span>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold">{t.about.quickFacts.response}</p>
                    <p className="text-emerald-400 text-sm font-bold mt-0.5">{t.about.quickFacts.responseValue}</p>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="btn-primary w-full text-center mt-6 block py-3 rounded-xl font-bold text-sm tracking-wide text-white"
              >
                {t.about.cta}
              </a>
            </div>
          </motion.div>
        </div>

        {/* 3-Step Approach Cards */}
        <div className="mt-20 grid md:grid-cols-3 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 text-center relative hover:border-blue-500/50 transition-all card-hover group"
          >
            <div className="text-5xl mb-3">📋</div>
            <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 opacity-30 group-hover:opacity-70 transition-opacity">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">
              {t.about.approach.planning.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.about.approach.planning.desc}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 text-center relative hover:border-purple-500/50 transition-all card-hover group"
          >
            <div className="text-5xl mb-3">💻</div>
            <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 opacity-30 group-hover:opacity-70 transition-opacity">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">
              {t.about.approach.development.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.about.approach.development.desc}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 text-center relative hover:border-emerald-500/50 transition-all card-hover group"
          >
            <div className="text-5xl mb-3">⚡</div>
            <div className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2 opacity-30 group-hover:opacity-70 transition-opacity">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">
              {t.about.approach.optimization.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.about.approach.optimization.desc}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
