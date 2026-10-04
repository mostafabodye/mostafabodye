import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Skills({ t }) {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const categories = [
    { id: 'frontend', title: t.skills.categories.frontend.title, icon: t.skills.categories.frontend.icon },
    { id: 'marketing', title: t.skills.categories.marketing.title, icon: t.skills.categories.marketing.icon },
    { id: 'aiStudio', title: t.skills.categories.aiStudio.title, icon: t.skills.categories.aiStudio.icon },
    { id: 'security', title: t.skills.categories.security.title, icon: t.skills.categories.security.icon },
  ];

  const skillLists = {
    frontend: [
      { name: t.skills.frontend.react, icon: "⚛️", level: "Senior", desc: "Hooks, Context, Custom Hooks, Performance" },
      { name: t.skills.frontend.nextjs, icon: "▲", level: "Expert", desc: "App Router, SSR, Server Actions, SEO" },
      { name: t.skills.frontend.javascript, icon: "📜", level: "Advanced", desc: "ES6+, Async/Await, Web APIs, DOM" },
      { name: t.skills.frontend.typescript, icon: "🔷", level: "Advanced", desc: "Types, Generics, Interfaces, Strict Code" },
      { name: t.skills.frontend.tailwind, icon: "🎨", level: "Expert", desc: "Responsive, Dark Mode, Animations, Custom Theme" },
      { name: t.skills.frontend.html5, icon: "🏗️", level: "Expert", desc: "Semantic HTML5, Microdata, Accessibility" },
      { name: t.skills.frontend.css3, icon: "✨", level: "Advanced", desc: "Flexbox, CSS Grid, Transitions, Keyframes" },
      { name: t.skills.frontend.redux, icon: "🔄", level: "Advanced", desc: "Redux Toolkit, RTK Query, Global State" },
      { name: t.skills.frontend.api, icon: "🔌", level: "Advanced", desc: "RESTful Endpoints, Fetch/Axios, Webhooks" },
      { name: t.skills.frontend.performance, icon: "⚡", level: "Advanced", desc: "Core Web Vitals, Lazy Loading, 95+ PageSpeed" },
    ],
    marketing: [
      { name: t.skills.marketing.gadsSearch, icon: "🔍", level: "Master", desc: "High-Intent Keyword Architecture, B2B, B2C" },
      { name: t.skills.marketing.gadsCall, icon: "📞", level: "Master", desc: "Call-Only campaigns for Emergency & Immediate Sales" },
      { name: t.skills.marketing.gadsMaps, icon: "📍", level: "Expert", desc: "Google My Business & Local Map Extension Dominance" },
      { name: t.skills.marketing.metaAds, icon: "🎯", level: "Advanced", desc: "Facebook & Instagram Reels Lead Gen & Scaling" },
      { name: t.skills.marketing.leadGen, icon: "📥", level: "Expert", desc: "High-Ticket Lead Generation & Screening Funnels" },
      { name: t.skills.marketing.seo, icon: "🚀", level: "Advanced", desc: "Technical On-Page, Schema.org, Search Console" },
      { name: t.skills.marketing.copywriting, icon: "✍️", level: "Advanced", desc: "Direct-Response Arabic Copywriting & Storytelling" },
      { name: t.skills.marketing.cro, icon: "📊", level: "Advanced", desc: "Landing Page A/B Testing, Heatmaps, Friction Removal" },
    ],
    aiStudio: [
      { name: t.skills.aiStudio.runway, icon: "🎥", level: "Master", desc: "Text-to-Video, Video-to-Video, Camera Directing" },
      { name: t.skills.aiStudio.midjourney, icon: "🖼️", level: "Master", desc: "Photorealistic Art, Commercial Visuals, Midjourney V6" },
      { name: t.skills.aiStudio.motion, icon: "🎞️", level: "Advanced", desc: "4K 60FPS Video Rendering & Dynamic Transitions" },
      { name: t.skills.aiStudio.voice, icon: "🎙️", level: "Advanced", desc: "Spatial Audio Engineering & Multilingual Voiceovers" },
      { name: t.skills.aiStudio.delogo, icon: "🧼", level: "Expert", desc: "100% Clean Delogo Video Inpainting & Restoration" },
      { name: t.skills.aiStudio.quranReels, icon: "👑", level: "Master", desc: "3D Royal Emblem Production & Spiritual Reverence Reels" },
    ],
    security: [
      { name: t.skills.security.cloudflare, icon: "☁️", level: "Advanced", desc: "WAF Rules, Bot Management, Rate Limiting, CDN" },
      { name: t.skills.security.pentest, icon: "🛡️", level: "Advanced", desc: "Vulnerability Scanning, OWASP Top 10, SQLi Prevention" },
      { name: t.skills.security.hardening, icon: "🔒", level: "Advanced", desc: "Headers Security, CSP, XSS Mitigation, HTTPS SSL" },
      { name: t.skills.security.git, icon: "🐙", level: "Expert", desc: "Git Workflow, Branching, Pull Requests, CI/CD" },
      { name: t.skills.security.hosting, icon: "🚀", level: "Advanced", desc: "Vercel, Node Servers, Linux VPS, cPanel Deployment" },
      { name: t.skills.security.analytics, icon: "📈", level: "Advanced", desc: "GA4, Google Tag Manager, Conversion Tracking" },
    ]
  };

  const currentSkills = skillLists[activeCategory] || skillLists.frontend;

  return (
    <section id="skills" className="py-20 relative">
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
            <span className="gradient-text">{t.skills.title}</span>
          </motion.h2>
          <p className="section-subtitle max-w-2xl mx-auto">{t.skills.subtitle}</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                  : 'glass text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Animated Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16"
          >
            {currentSkills.map((skill, idx) => (
              <div
                key={idx}
                className="card-base card-hover bg-slate-900/60 border-slate-700/60 p-5 flex items-start gap-4 group"
              >
                <div className="text-3xl p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex-shrink-0 group-hover:scale-110 group-hover:border-blue-500/50 transition-all">
                  {skill.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-bold text-slate-100 text-sm sm:text-base group-hover:text-blue-400 transition-colors truncate">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                    {skill.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 4 Pillars / Traits Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all card-hover">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-base font-bold text-slate-100 mb-2">
              {t.skills.traits.quickLearner.title}
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              {t.skills.traits.quickLearner.desc}
            </p>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all card-hover">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-base font-bold text-slate-100 mb-2">
              {t.skills.traits.bestPractices.title}
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              {t.skills.traits.bestPractices.desc}
            </p>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 text-center hover:border-pink-500/50 transition-all card-hover">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="text-base font-bold text-slate-100 mb-2">
              {t.skills.traits.continuousGrowth.title}
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              {t.skills.traits.continuousGrowth.desc}
            </p>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 text-center hover:border-amber-500/50 transition-all card-hover">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-base font-bold text-slate-100 mb-2">
              {t.skills.traits.userFocus.title}
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              {t.skills.traits.userFocus.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
