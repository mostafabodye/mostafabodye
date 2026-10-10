import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Send, ShieldCheck, Flame, Cpu, Monitor, Megaphone, Globe } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function Hero({ t, lang, onNavigate }) {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <section id="hero" className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden flex flex-col items-center justify-center">
      {/* Top Greeting Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-5 relative inline-flex justify-center"
      >
        <div className="border border-slate-600/80 bg-slate-900/60 backdrop-blur-md px-6 py-2 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-2 text-slate-200 shadow-lg shadow-black/40 z-10">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>{t.hero.helloBadge}</span>
        </div>

        {/* Decorative Spark Squiggle */}
        <div className="absolute -top-4 -right-6 text-orange-400 pointer-events-none hidden sm:block">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 10L10 14M12 6L14 12M18 8L16 13" className="origin-center rotate-[30deg]" />
          </svg>
        </div>
      </motion.div>

      {/* Main Title & Role Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative mb-5 text-center z-10 w-full px-4 max-w-4xl mx-auto"
      >
        <h1 className="text-[clamp(2rem,5.5vw,3.6rem)] font-black leading-tight tracking-tight text-white mb-3">
          {t.hero.greeting}{' '}
          <span className="text-orange-400 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
            {t.hero.name}
          </span>
          ,
          <br />
          <span className="text-slate-100 font-extrabold text-[0.85em]">
            {t.hero.role}
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-normal">
          {t.hero.tagline}
        </p>

        {/* Interactive Core Pillars Pills (Click to open each dedicated page) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('ads')}
            className="px-3.5 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'إدارة الحملات + شات أدز' : 'Ads & Chat Ads'}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate('web')}
            className="px-3.5 py-1.5 rounded-full bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/40 text-blue-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'مواقع ومتاجر ومنصات تعليمية' : 'Web, E-Commerce & LMS'}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate('systems')}
            className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'برامج ويندوز وتفعيل بالكود' : 'Windows POS & Keygen'}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate('portfolio')}
            className="px-3.5 py-1.5 rounded-full bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'سابقة الأعمال ودراسات الحالة' : 'Case Studies'}</span>
          </button>
        </div>
      </motion.div>

      {/* Visual Character Arch & Profile Container */}
      <div className="relative w-full flex flex-col items-center justify-end mt-4 pt-4 min-h-[380px] sm:min-h-[440px]">
        {/* Arch Backdrop */}
        <motion.div
          animate={{ backgroundColor: '#23293880' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute w-[92vw] max-w-2xl h-[260px] sm:h-[300px] rounded-t-full bottom-0 z-10 overflow-hidden border-t-2 border-x-2 border-slate-700/60 backdrop-blur-sm shadow-[0_-20px_50px_rgba(59,130,246,0.15)]"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.06)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60" />
        </motion.div>

        {/* Profile / Flyer Portrait */}
        <motion.div
          variants={{
            hidden: { y: 180, opacity: 0, scale: 0.85 },
            visible: {
              y: 0,
              opacity: 1,
              scale: 1,
              transition: { type: 'spring', stiffness: 100, damping: 16, duration: 0.8 }
            }
          }}
          initial="hidden"
          animate="visible"
          className="relative bottom-0 w-[270px] sm:w-[330px] h-[340px] sm:h-[400px] z-20 mb-0 flex items-end justify-center group"
        >
          <div className="w-full h-full relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl shadow-black/80 bg-slate-900 group-hover:border-amber-400 transition-colors">
            <img
              src={getAssetUrl('/profile.jpg')}
              alt={t.hero.altProfile}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-3 left-3 right-3 text-center px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/60 text-xs font-bold text-slate-200">
              <span className="text-amber-400">AM Marketing</span> • {t.hero.name}
            </div>
          </div>
        </motion.div>

        {/* Dual Bottom Pill CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative z-30 mt-6 sm:-mt-6 flex items-center p-1.5 border border-white/30 bg-slate-900/90 backdrop-blur-xl rounded-full shadow-2xl shadow-blue-500/10"
        >
          <motion.button
            onClick={() => {
              setActiveTab('projects');
              if (onNavigate) onNavigate('portfolio');
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-300 shadow-md cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-orange-500/30'
                : 'text-slate-300 hover:text-white bg-transparent'
            }`}
          >
            <span>{t.hero.projectsBtn}</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            onClick={() => {
              setActiveTab('hire');
              if (onNavigate) onNavigate('contact');
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
              activeTab === 'hire'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/30 shadow-md'
                : 'text-slate-300 hover:text-white bg-transparent'
            }`}
          >
            <span>{t.hero.hireMeBtn}</span>
            <Send className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
