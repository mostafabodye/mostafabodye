import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowUpRight,
  Phone,
  Home,
  Megaphone,
  Globe,
  Monitor,
  Briefcase,
  UserCheck
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function Navbar({ lang, setLang, t, currentPage = 'home', onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navPages = [
    {
      id: 'home',
      label: lang === 'ar' ? 'الرئيسية' : 'Home',
      icon: Home
    },
    {
      id: 'ads',
      label: lang === 'ar' ? 'إدارة الحملات وشات أدز' : 'Ads & Chat Ads',
      badge: lang === 'ar' ? 'أكاديمي' : 'PRO',
      badgeColor: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300',
      icon: Megaphone
    },
    {
      id: 'web',
      label: lang === 'ar' ? 'تطوير المواقع والمتاجر' : 'Web, Stores & LMS',
      badge: lang === 'ar' ? 'شامل' : 'ALL',
      badgeColor: 'bg-purple-500/20 border-purple-500/50 text-purple-300',
      icon: Globe
    },
    {
      id: 'systems',
      label: lang === 'ar' ? 'برامج الويندوز والتفعيل' : 'Windows POS & Keygen',
      badge: 'EXE',
      badgeColor: 'bg-amber-500/20 border-amber-500/50 text-amber-300',
      icon: Monitor
    },
    {
      id: 'portfolio',
      label: lang === 'ar' ? 'سابقة الأعمال' : 'Portfolio',
      icon: Briefcase
    },
    {
      id: 'contact',
      label: lang === 'ar' ? 'عن الوكالة والتواصل' : 'About & Contact',
      icon: UserCheck
    }
  ];

  const handleSelectPage = (pageId) => {
    if (onNavigate) {
      onNavigate(pageId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-3 glass-nav shadow-2xl' : 'py-4 bg-slate-950/75 backdrop-blur-lg border-b border-slate-800/60'
      }`}
    >
      <div className="container-max flex justify-between items-center gap-2">
        {/* Language Switcher & Brand Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-blue-500/50 cursor-pointer flex items-center justify-center bg-slate-800/60 backdrop-blur-sm hover:border-blue-400 hover:scale-105 transition-all shadow-lg shadow-blue-500/10"
            aria-label={t.nav.toggleLanguage}
            title={lang === 'ar' ? t.nav.switchToEnglish : t.nav.switchToArabic}
          >
            <span className="text-slate-100 font-extrabold text-[11px] tracking-wider">
              {lang === 'ar' ? 'EN' : 'عربي'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectPage('home')}
            className="flex items-center gap-2 group text-right cursor-pointer"
          >
            <img
              src={getAssetUrl('/assets/images/am_marketing_3d_logo.jpg')}
              alt="AM Marketing Logo"
              className="w-10 h-10 rounded-xl object-cover border border-amber-400/50 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-black text-white group-hover:text-blue-400 transition-colors leading-tight">
                {t.hero.name}
              </span>
              <span className="text-[10px] text-cyan-400 font-bold">
                AM Marketing
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Multi-Page Navigation Pills */}
        <div className="hidden xl:flex gap-1.5 items-center glass backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-700/60 shadow-xl shadow-black/40">
          {navPages.map((page) => {
            const Icon = page.icon;
            const isActive = currentPage === page.id;
            return (
              <button
                key={page.id}
                type="button"
                onClick={() => handleSelectPage(page.id)}
                className={`transition-all duration-300 relative group font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white shadow-lg shadow-blue-500/25 border border-blue-400/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-400 group-hover:text-cyan-400'}`} />
                <span>{page.label}</span>
                {page.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[9px] font-black border ${
                      isActive ? 'bg-amber-400 text-slate-950 border-amber-300' : page.badgeColor
                    }`}
                  >
                    {page.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Medium Desktop Compact Nav */}
        <div className="hidden md:flex xl:hidden gap-1 items-center glass backdrop-blur-md px-2.5 py-1.5 rounded-2xl border border-slate-700/60">
          {navPages.map((page) => {
            const isActive = currentPage === page.id;
            return (
              <button
                key={page.id}
                type="button"
                onClick={() => handleSelectPage(page.id)}
                className={`transition-all font-bold text-[11px] px-2.5 py-1.5 rounded-xl cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {page.label}
              </button>
            );
          })}
        </div>

        {/* Right CTA Button & Quick Phone */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <a
            href="tel:01098174992"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700/60 bg-slate-900/70 text-amber-400 text-xs font-bold hover:border-amber-400/50 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span dir="ltr">01098174992</span>
          </a>

          <button
            type="button"
            onClick={() => handleSelectPage('contact')}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl text-white font-bold text-xs tracking-wide shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>{t.nav.cta}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-200 hover:text-white p-2 rounded-xl bg-slate-800/80 border border-slate-700/70 flex items-center gap-1.5"
          aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
        >
          <span className="text-xs font-bold text-cyan-400 px-1">
            {lang === 'ar' ? 'الصفحات' : 'Pages'}
          </span>
          {mobileMenuOpen ? <X className="w-5 h-5 text-blue-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b border-slate-800/80 bg-slate-950/98 backdrop-blur-2xl px-5 py-5 overflow-hidden"
          >
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              {lang === 'ar' ? 'اختر الصفحة للانتقال المباشر:' : 'Select a Dedicated Page:'}
            </div>
            <div className="flex flex-col gap-2">
              {navPages.map((page) => {
                const Icon = page.icon;
                const isActive = currentPage === page.id;
                return (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => handleSelectPage(page.id)}
                    className={`w-full text-right font-bold text-sm py-3 px-4 rounded-xl border transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-blue-500/60 text-white'
                        : 'bg-slate-900/70 border-slate-800/80 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{page.label}</span>
                    </div>
                    {page.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${page.badgeColor}`}>
                        {page.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-3 flex flex-col gap-2.5">
                <a
                  href="tel:01098174992"
                  className="w-full text-center py-2.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 font-bold text-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">01098174992</span>
                </a>

                <a
                  href="https://wa.me/201098174992"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25"
                >
                  {lang === 'ar' ? 'تواصل مباشر عبر واتساب 💬' : 'Direct WhatsApp Chat 💬'}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
