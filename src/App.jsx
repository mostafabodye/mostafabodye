import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import SystemsHub from './components/SystemsHub';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { translations } from './data/translations';

export default function App() {
  const [lang, setLang] = useState('ar');

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = translations[lang] || translations.ar;

  return (
    <div className={`min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-x-hidden selection:bg-blue-500 selection:text-white ${lang === 'ar' ? 'font-cairo' : 'font-inter'}`}>
      {/* Ambient Glowing Background Orbs & Grid - Twin of Keroles Site */}
      <div className="fixed inset-0 -z-10 h-full min-h-[100dvh] w-full min-w-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/80" />
      </div>

      {/* Top Fixed Header Navbar */}
      <Navbar lang={lang} setLang={setLang} t={t} />

      {/* Main Content Sections */}
      <main className="relative w-full min-w-0 overflow-x-clip">
        <Hero t={t} lang={lang} />
        <About t={t} lang={lang} />
        <Skills t={t} lang={lang} />
        <Projects t={t} lang={lang} />
        <SystemsHub lang={lang} />
        <Experience t={t} lang={lang} />
        <Contact t={t} lang={lang} />
      </main>

      {/* Footer */}
      <Footer t={t} lang={lang} />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
