import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, CheckCircle2, Award, BookOpen } from 'lucide-react';

export default function Experience({ t, lang }) {
  const isRtl = lang === 'ar';

  return (
    <section id="experience" className="py-20 relative">
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
            <span className="gradient-text">{t.experience.title}</span>
          </motion.h2>
          <p className="section-subtitle max-w-2xl mx-auto">{t.experience.subtitle}</p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Column 1: Professional Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
              <span>{t.experience.sections.professional}</span>
            </h3>

            {/* Timeline Wrapper */}
            <div className="space-y-8 relative">
              {/* Vertical Gradient Line */}
              <div
                className={`absolute ${
                  isRtl ? 'right-2.5' : 'left-2.5'
                } top-2 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-60`}
              />

              {t.experience.jobs.map((job, idx) => (
                <div
                  key={idx}
                  className={`card-base card-hover relative group ${
                    isRtl ? 'pr-9 pl-6' : 'pl-9 pr-6'
                  } bg-slate-900/60 border-slate-700/60`}
                >
                  {/* Glowing Milestone Circle Node */}
                  <div
                    className={`absolute ${
                      isRtl ? '-right-3.5' : '-left-3.5'
                    } top-6 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-slate-950 group-hover:scale-125 transition-transform shadow-lg shadow-blue-500/50`}
                  />

                  <div className="mb-3">
                    <h4 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                      {job.title}
                    </h4>
                    <p className="text-blue-400 font-semibold text-xs sm:text-sm">
                      {job.company}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5 font-medium">
                      {job.period}
                    </p>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm mb-4 leading-relaxed">
                    {job.desc}
                  </p>

                  {/* Bullet Achievements */}
                  <ul className="space-y-2 mb-4">
                    {job.achievements.map((item, aIdx) => (
                      <li key={aIdx} className="text-slate-400 text-xs flex gap-2 items-start leading-relaxed">
                        <span className="text-blue-400 font-black flex-shrink-0 mt-0.5">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
                    {job.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 bg-slate-800/80 rounded text-[10px] text-slate-400 border border-slate-700/60 hover:border-blue-500/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Education & Certifications */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full" />
              <span>{t.experience.sections.education}</span>
            </h3>

            <div className="space-y-6">
              {t.experience.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="card-base card-hover bg-slate-900/60 border-slate-700/60 flex items-start gap-4 p-5"
                >
                  <div className="text-3xl p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 flex-shrink-0">
                    {idx === 0 ? '🎓' : idx === 1 ? '📜' : '🤖'}
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-base font-bold text-slate-100">
                        {edu.degree}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400">
                        {edu.badge}
                      </span>
                    </div>

                    <p className="text-purple-400 font-semibold text-xs mb-1">
                      {edu.institution}
                    </p>
                    <p className="text-slate-500 text-xs mb-2">{edu.year}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{edu.desc}</p>
                  </div>
                </div>
              ))}

              {/* Continuous Learning Card */}
              <div className="card-base card-hover bg-slate-900/60 border-slate-700/60 p-6">
                <h4 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📚</span>
                  <span>{t.experience.sections.continuousLearning}</span>
                </h4>

                <ul className="space-y-3">
                  {t.experience.learningPoints.map((point, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
