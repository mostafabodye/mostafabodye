import React, { useState, useEffect } from 'react';
import {
  Megaphone,
  Globe,
  Monitor,
  Briefcase,
  ArrowUpLeft,
  CheckCircle2,
  Sparkles,
  Home,
  KeyRound,
  ShieldCheck,
  Smartphone,
  Laptop
} from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveSuperSystems from './components/InteractiveSuperSystems';
import StoryVideoSection from './components/StoryVideoSection';
import MarketsShowcase from './components/MarketsShowcase';
import NumbersAndResults from './components/NumbersAndResults';
import GrowthPipeline from './components/GrowthPipeline';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import SystemsHub from './components/SystemsHub';
import AdsAcademyPage from './components/AdsAcademyPage';
import WebPlatformsPage from './components/WebPlatformsPage';
import { translations } from './data/translations';

const VALID_PAGES = ['home', 'ads', 'web', 'systems', 'portfolio', 'contact'];

export default function App() {
  const [lang, setLang] = useState('ar');
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#page-', '').replace('#', '');
    if (hash === 'systems-hub') return 'systems';
    if (hash === 'projects') return 'portfolio';
    if (VALID_PAGES.includes(hash)) return hash;
    return 'home';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#page-', '').replace('#', '');
      if (hash === 'interactive-systems') {
        setCurrentPage('home');
        setTimeout(() => {
          const el = document.getElementById('interactive-systems');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (hash === 'systems-hub') {
        setCurrentPage('systems');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'projects') {
        setCurrentPage('portfolio');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (VALID_PAGES.includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const t = translations[lang];

  const handleNavigate = (pageId) => {
    if (pageId === 'interactive-systems') {
      if (currentPage !== 'home') {
        setCurrentPage('home');
      }
      window.history.replaceState(null, '', `#interactive-systems`);
      setTimeout(() => {
        const el = document.getElementById('interactive-systems');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }
    const target = VALID_PAGES.includes(pageId) ? pageId : 'home';
    setCurrentPage(target);
    window.history.replaceState(null, '', `#page-${target}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageTitles = {
    home: lang === 'ar' ? 'الرئيسية' : 'Home',
    ads: lang === 'ar' ? 'إدارة الحملات وشات أدز' : 'Ads & Chat Ads',
    web: lang === 'ar' ? 'تطوير المواقع والمتاجر' : 'Web & E-Commerce',
    systems: lang === 'ar' ? 'برامج الويندوز والتفعيل' : 'Windows POS & Keygen',
    portfolio: lang === 'ar' ? 'سابقة الأعمال' : 'Portfolio',
    contact: lang === 'ar' ? 'التواصل' : 'Contact'
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-cairo selection:bg-amber-500 selection:text-slate-950">
      {/* Global Navigation Bar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        t={t}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Internal Page Indicator & Quick Switcher Strip (Sub-header) */}
      {currentPage !== 'home' && (
        <div className="pt-20 pb-3 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
          <div className="container-max flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">أنت تتصفح الآن:</span>
              <span className="text-amber-400 font-black">{pageTitles[currentPage]}</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {VALID_PAGES.filter((p) => p !== currentPage).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handleNavigate(p)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-[11px] font-bold border border-slate-800 transition cursor-pointer"
                >
                  {p === 'home'
                    ? 'الرئيسية'
                    : p === 'ads'
                    ? 'إدارة الحملات وشات أدز'
                    : p === 'web'
                    ? 'تطوير المواقع والمتاجر'
                    : p === 'systems'
                    ? 'برامج الويندوز والتفعيل'
                    : p === 'portfolio'
                    ? 'سابقة الأعمال'
                    : 'التواصل'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area by Dedicated Page */}
      <main className="relative w-full min-w-0 overflow-x-clip">
        {currentPage === 'home' && (
          <>
            <Hero t={t} lang={lang} onNavigate={handleNavigate} />

            {/* Interactive Super Systems: Clinics, HR, POS, Towing & Google Ads */}
            <InteractiveSuperSystems lang={lang} />

            {/* Founder Story Video Section: Meet Abdel Salam */}
            <StoryVideoSection lang={lang} onNavigate={handleNavigate} />

            {/* Verified Numbers & Results ("أرقام وليست وعوداً") */}
            <NumbersAndResults lang={lang} />

            {/* 3 Regional Markets Wall (جدار الأسواق الثلاثة: السعودية ومصر والإمارات) */}
            <MarketsShowcase lang={lang} onNavigate={handleNavigate} />

            {/* 5-Step Growth Engine Pipeline */}
            <GrowthPipeline lang={lang} />

            {/* Dedicated Multi-Page Academic & Enterprise Portals Showcase */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold mb-3">
                  <Sparkles size={14} />
                  <span>أقسام وصفحات الوكالة المتخصصة</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
                  تصفح أقسامنا المتخصصة في صفحات مستقلة ومفصلة
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
                  صممنا لك بوابات متخصصة تغطي كافة احتياجاتك الرقمية: من إدارة الحملات الإعلانية والشات أدز، إلى تطوير المواقع والمتاجر والمنصات التعليمية المتوافقة مع كل الأجهزة، وحتى برامج الويندوز المحاسبية المفعّلة بالكود.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Portal 1: Ads & Chat Ads */}
                <div className="glass rounded-3xl p-6 sm:p-8 border border-amber-500/30 hover:border-amber-400/60 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 shadow-lg">
                        <Megaphone size={28} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        صفحة متخصصة شاملة
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-amber-400 transition">
                      إدارة الحملات الإعلانية الشاملة + شات أدز (Chat Ads)
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5">
                      منهجية أكاديمية وعملية لإدارة الإعلانات الممولة على جوجل (Google Search & Call Ads)، إعلانات الشات والمحادثات الفورية (Click-to-WhatsApp & Messenger)، سناب شات، ميتا، وتيك توك مع حاسبة العائد التفاعلية.
                    </p>
                    <div className="space-y-2 mb-6 text-xs sm:text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
                        <span>إعلانات شات أدز (واتساب وماسنجر) بأوتوميشن الردود</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
                        <span>تصدر نتائج بحث جوجل وحماية الميزانية من النقرات الوهمية</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
                        <span>تتبع إيرادات المبيعات والـ ROAS بـ Pixel و Conversions API</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavigate('ads')}
                    className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <span>فتح صفحة إدارة الحملات والشات أدز</span>
                    <ArrowUpLeft size={16} />
                  </button>
                </div>

                {/* Portal 2: Web, Stores & LMS */}
                <div className="glass rounded-3xl p-6 sm:p-8 border border-cyan-500/30 hover:border-cyan-400/60 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-lg">
                        <Globe size={28} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        صفحة متخصصة شاملة
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-cyan-400 transition">
                      تطوير المواقع والمتاجر والمنصات التعليمية (LMS)
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5">
                      برمجة مواقع شركات، متاجر سريعة، ومنصات كورسات تفاعلية متوافقة 100% مع كافة الأجهزة (الموبايل، التابلت، اللابتوب، الكمبيوتر) مع معايير سرعة 100/100 وسيو متصدر.
                    </p>
                    <div className="space-y-2 mb-6 text-xs sm:text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                        <span>تصميم متجاوب بالكامل وفائق النعومة (Responsive 100%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                        <span>بوابات دفع إلكتروني محلية ودولية (فوري، فيزا، تابي، تمارا)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                        <span>أنظمة إدارة كورسات ومنصات تدريب LMS متقدمة</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavigate('web')}
                    className="w-full py-3.5 px-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-cyan-500/20"
                  >
                    <span>فتح صفحة المواقع والمتاجر والمنصات</span>
                    <ArrowUpLeft size={16} />
                  </button>
                </div>

                {/* Portal 3: Windows Desktop POS & Keygen Systems */}
                <div className="glass rounded-3xl p-6 sm:p-8 border border-emerald-500/30 hover:border-emerald-400/60 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 shadow-lg">
                        <Monitor size={28} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        برامج ويندوز مفعلة بكود رسمي
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-emerald-400 transition">
                      أنظمة وبرامج الويندوز للمحلات والمطاعم والعيادات (Offline POS)
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5">
                      تطوير برامج سطح مكتب (Desktop Applications) متخصصة تعمل بدون إنترنت وبسرعة صاروخية، مع نظام حماية وتفعيل رسمي بكود خاص بكل جهاز (Machine ID Keygen) مع تجربة محاكاة التفعيل حية.
                    </p>
                    <div className="space-y-2 mb-6 text-xs sm:text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                        <span>نظام كاشير ونقاط بيع وطباعة فواتير حرارية وسريعة</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                        <span>إدارة المخزون، الحسابات، الأرباح، والتقارير اليومية</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                        <span>مولد سيريالات وتراخيص رسمية (Machine ID Activation)</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavigate('systems')}
                    className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    <span>فتح صفحة برامج الويندوز والمحاكاة</span>
                    <ArrowUpLeft size={16} />
                  </button>
                </div>

                {/* Portal 4: Live Client Portfolio */}
                <div className="glass rounded-3xl p-6 sm:p-8 border border-purple-500/30 hover:border-purple-400/60 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                        <Briefcase size={28} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-500/15 text-purple-300 border border-purple-500/30">
                        +24 مشروع ودراسة حالة موثقة
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-purple-400 transition">
                      سابقة الأعمال ودراسات الحالة (Portfolio & Case Studies)
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5">
                      استعراض شامل لكافة مشاريعنا الواقعية: حملات إعلانات جوجل لمواقع الأوناش وشركات مكافحة الحريق، متاجر إلكترونية حية، منصات ذكاء اصطناعي، وفيديوهات موشن جرافيكس.
                    </p>
                    <div className="space-y-2 mb-6 text-xs sm:text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-purple-400 shrink-0" />
                        <span>مشاريع ونش إنقاذ حقيقية ومواقع تتصدر جوجل وسيو محلي</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-purple-400 shrink-0" />
                        <span>حملات إعلانات B2B و B2C ناجحة بملايين المشاهدات</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-purple-400 shrink-0" />
                        <span>أدوات ذكاء اصطناعي ومولدات مقايسات تفاعلية</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavigate('portfolio')}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-purple-500/20"
                  >
                    <span>فتح سابقة الأعمال الكاملة</span>
                    <ArrowUpLeft size={16} />
                  </button>
                </div>
              </div>
            </section>

            {/* Quick About Strip */}
            <About t={t} lang={lang} />

            {/* Full Skills Showcase */}
            <Skills t={t} lang={lang} />

            {/* Selected Projects Grid */}
            <Projects t={t} lang={lang} />

            {/* Professional Experience */}
            <Experience t={t} lang={lang} />

            {/* Contact Section */}
            <Contact t={t} lang={lang} />
          </>
        )}

        {/* Dedicated Page 1: Ads & Chat Ads Academy */}
        {currentPage === 'ads' && (
          <AdsAcademyPage lang={lang} onNavigate={handleNavigate} />
        )}

        {/* Dedicated Page 2: Web, Stores & LMS Platforms */}
        {currentPage === 'web' && (
          <WebPlatformsPage lang={lang} onNavigate={handleNavigate} />
        )}

        {/* Dedicated Page 3: Windows Systems Hub */}
        {currentPage === 'systems' && (
          <SystemsHub lang={lang} onNavigate={handleNavigate} />
        )}

        {/* Dedicated Page 4: Full Portfolio & Case Studies */}
        {currentPage === 'portfolio' && (
          <div className="pt-24 pb-16">
            <Projects t={t} lang={lang} isStandalonePage={true} />
          </div>
        )}

        {/* Dedicated Page 5: About & Contact */}
        {currentPage === 'contact' && (
          <div className="pt-24 pb-16">
            <About t={t} lang={lang} />
            <Contact t={t} lang={lang} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer t={t} lang={lang} onNavigate={handleNavigate} />

      {/* Floating Fast WhatsApp Action Button */}
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
