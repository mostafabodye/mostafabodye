import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Globe, Phone } from 'lucide-react';

export default function Navbar({ lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#projects', label: t.nav.projects },
    { href: '#experience', label: t.nav.experience },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-3.5 glass-nav shadow-2xl' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container-max flex justify-between items-center">
        {/* Language Switcher & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500/50 cursor-pointer flex items-center justify-center bg-slate-800/60 backdrop-blur-sm hover:border-blue-400 hover:scale-105 transition-all shadow-lg shadow-blue-500/10"
            aria-label={t.nav.toggleLanguage}
            title={lang === 'ar' ? t.nav.switchToEnglish : t.nav.switchToArabic}
          >
            <span className="text-slate-100 font-extrabold text-xs tracking-wider">
              {lang === 'ar' ? 'EN' : 'عربي'}
            </span>
          </button>

          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-blue-600 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-sm text-gradient-gold">
                AM
              </div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-black text-white group-hover:text-blue-400 transition-colors leading-tight">
                {t.hero.name}
              </span>
              <span className="text-[10px] text-cyan-400 font-medium">
                AM Marketing
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-7 items-center glass backdrop-blur-md px-6 py-2 rounded-full border border-slate-700/50 shadow-xl shadow-black/40">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-300 hover:text-blue-400 transition-colors duration-300 relative group font-medium text-sm py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:w-full transition-all duration-300 w-0 rounded-full" />
            </a>
          ))}
        </div>

        {/* Right CTA Button & Quick Phone */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:01098174992"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/60 bg-slate-900/60 text-amber-400 text-xs font-bold hover:border-amber-400/50 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span dir="ltr">01098174992</span>
          </a>

          <a
            href="#contact"
            className="px-5 py-2 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-lg text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1"
          >
            <span>{t.nav.cta}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2 rounded-lg bg-slate-800/50 border border-slate-700/50"
          aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-blue-400" /> : <Menu className="w-6 h-6" />}
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
            className="md:hidden border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-2xl px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-200 hover:text-blue-400 font-semibold text-base py-1 border-b border-slate-900/60 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-3 flex flex-col gap-3">
                <a
                  href="tel:01098174992"
                  className="w-full text-center py-2.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 font-bold text-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">01098174992</span>
                </a>

                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-bold text-sm shadow-lg shadow-blue-500/30"
                >
                  {t.nav.cta}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
