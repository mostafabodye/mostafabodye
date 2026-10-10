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
      if (hash === 'systems-hub') {
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

  const handleNavigate = (pageId) => {
    const target = VALID_PAGES.includes(pageId) ? pageId : 'home';
    setCurrentPage(target);
    window.history.replaceState(null, '', `#page-${target}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = translations[lang] || translations.ar;

  const pageTitles = {
    home: lang === 'ar' ? 'الرئيسية' : 'Home',
    ads: lang === 'ar' ? 'أكاديمية ومنظومة إدارة الحملات الإعلانية الشاملة + شات أدز' : 'Ads & Chat Ads Management',
    web: lang === 'ar' ? 'هندسة وتطوير المواقع والمتاجر الإلكترونية والمنصات التعليمية' : 'Websites, E-Commerce & LMS Platforms',
    systems: lang === 'ar' ? 'منصة برامج الويندوز والأنظمة المحاسبية + التفعيل بالكود' : 'Windows POS/ERP Software & Keygen Activation',
    portfolio: lang === 'ar' ? 'سابقة الأعمال ودراسات الحالة' : 'Portfolio & Case Studies',
    contact: lang === 'ar' ? 'عن الوكالة والتواصل المباشر' : 'About & Contact'
  };

  return (
    <div className={`min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-x-hidden selection:bg-blue-500 selection:text-white ${lang === 'ar' ? 'font-cairo' : 'font-inter'}`}>
      {/* Ambient Glowing Background Orbs & Grid */}
      <div className="fixed inset-0 -z-10 h-full min-h-[100dvh] w-full min-w-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/80" />
      </div>

      {/* Top Fixed Multi-Page Header Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        t={t}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Breadcrumb Bar on Inner Pages */}
      {currentPage !== 'home' && (
        <div className="pt-24 pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
          <div className="glass rounded-2xl px-4 py-3 border border-slate-800/90 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => handleNavigate('home')}
                className="text-slate-400 hover:text-cyan-400 font-bold flex items-center gap-1 transition cursor-pointer"
              >
                <Home size={14} />
                <span>{lang === 'ar' ? 'الرئيسية' : 'Home'}</span>
              </button>
              <span className="text-slate-600">/</span>
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
                        <span>حاسبة تفاعلية لحساب الميزانية والعملاء المتوقعين</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavigate('ads')}
                    className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black text-sm flex items-center justify-center gap-2 hover:opacity-95 transition cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <span>افتح صفحة إدارة الحملات وشات أدز</span>
                    <ArrowUpLeft size={18} />
                  </button>
                </div>

                {/* Portal 2: Web Development, E-Commerce & LMS */}
                <div className="glass rounded-3xl p-6 sm:p-8 border border-cyan-500/30 hover:border-cyan-400/60 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                        <Globe size={28} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        موبايل • تابلت • لابتوب • كمبيوتر
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-cyan-400 transition">
                      تطوير المواقع والمتاجر الإلكترونية والمنصات التعليمية
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5">
                      نصمم ونبرمج كافة أنواع المواقع بأفضل نظام متجاوب 100% مع جميع الأجهزة (موبايل، تابلت، لابتوب، كمبيوتر مكتبي) من المواقع التعريفية إلى المواقع المتكاملة والمتاجر الإلكترونية والمنصات التعليمية.
                    </p>
                    <div className="space-y-2 mb-6 text-xs sm:text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                        <span>متاجر إلكترونية مربوطة بالدفع الإلكتروني وشركات الشحن</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                        <span>منصات تعليمية (LMS) بحماية الفيديوهات والاختبارات والشهادات</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                        <span>محاكي تفاعلي لاختبار شكل الموقع على الموبايل والتابلت والكمبيوتر</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavigate('web')}
                    className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-sm flex items-center justify-center gap-2 hover:opacity-95 transition cursor-pointer shadow-lg shadow-cyan-500/20"
                  >
                    <span>افتح صفحة تطوير المواقع والمتاجر والمنصات</span>
                    <ArrowUpLeft size={18} />
                  </button>
                </div>

                {/* Portal 3: Windows Software & Keygen Activation */}
                <div className="glass rounded-3xl p-6 sm:p-8 border border-emerald-500/30 hover:border-emerald-400/60 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 shadow-lg">
                        <Monitor size={28} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        تفعيل بكود الترخيص
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-emerald-400 transition">
                      منصة برامج الويندوز والأنظمة المحاسبية (تفعيل بالكود)
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5">
                      برامج سطح مكتب حقيقية تعمل على الويندوز بدون إنترنت (كاشير وسوبر ماركت، مطاعم وكافيهات، عيادات طبية، مخازن، وشؤون موظفين) مع نظام حماية ببصمة الجهاز وتفعيل حصري بالكود للمشتري.
                    </p>
                    <div className="space-y-2 mb-6 text-xs sm:text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                        <span>تحميل مباشر لنسخة الويندوز لكل نظام وتجربتها لايف</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                        <span>شاشة قفل ببصمة الجهاز (Machine ID) تفتح فقط بكود التفعيل</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                        <span>أداة توليد أكواد التفعيل الرسمية الخاصة بالإدارة (Keygen)</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavigate('systems')}
                    className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-sm flex items-center justify-center gap-2 hover:opacity-95 transition cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    <span>افتح منصة برامج الويندوز والتفعيل بالكود</span>
                    <ArrowUpLeft size={18} />
                  </button>
                </div>

                {/* Portal 4: Portfolio & Winch Campaigns */}
                <div className="glass rounded-3xl p-6 sm:p-8 border border-purple-500/30 hover:border-purple-400/60 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
                        <Briefcase size={28} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-500/15 text-purple-300 border border-purple-500/30">
                        نتائج ومواقع حية
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-purple-400 transition">
                      سابقة الأعمال الشاملة ودراسات الحالة (Portfolio)
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5">
                      شاهد المواقع الحية ونتائج حملات جوجل الإعلانية الفعلية لجميع عملائنا: شركات أوناش الإنقاذ (المستشار، السعيد طه، علي سكر، ربيع، الشروق)، المجال للسلامة، مدير الصيانة المعتمد، وإعلانات الفيديو بالذكاء الاصطناعي.
                    </p>
                    <div className="space-y-2 mb-6 text-xs sm:text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-purple-400 shrink-0" />
                        <span>جميع مواقع وحملات أوناش الإنقاذ بروابطها المباشرة</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-purple-400 shrink-0" />
                        <span>مواقع الشركات والمنصات التدريبية والصفحات الإسلامية</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-purple-400 shrink-0" />
                        <span>معرض فيديوهات إعلانية 4K منتجة بالذكاء الاصطناعي</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavigate('portfolio')}
                    className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-black text-sm flex items-center justify-center gap-2 hover:opacity-95 transition cursor-pointer shadow-lg shadow-purple-500/20"
                  >
                    <span>افتح صفحة سابقة الأعمال الكاملة</span>
                    <ArrowUpLeft size={18} />
                  </button>
                </div>
              </div>
            </section>

            <About t={t} lang={lang} />
            <Skills t={t} lang={lang} />
            <Projects t={t} lang={lang} onNavigate={handleNavigate} />
            <Contact t={t} lang={lang} />
          </>
        )}

        {currentPage === 'ads' && (
          <AdsAcademyPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'web' && (
          <WebPlatformsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'systems' && (
          <div className="pt-6 pb-20">
            {/* Academic Explanation Banner for the Windows Licensing Mechanism */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-6">
              <div className="glass rounded-3xl p-6 sm:p-8 border border-amber-500/30">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3">
                      <KeyRound size={14} />
                      <span>منظومة برامج سطح المكتب للويندوز + التفعيل الرسمي بالكود</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-black text-white mb-3">
                      برامج ويندوز محاسبية وإدارية جاهزة للتحميل والتفعيل الفوري
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      يمكن للمشتري تحميل نسخة البرنامج مباشرة على جهاز الكمبيوتر أو اللابتوب، وعند فتح البرنامج يظهر له{' '}
                      <strong className="text-amber-400">رقم بصمة الجهاز (Machine ID)</strong>. يقوم المشتري بإرسال هذا الرقم لك عبر واتساب، فتقوم بتوليد{' '}
                      <strong className="text-emerald-400">كود التفعيل الرسمي (ACT-AM-...)</strong> وإرساله له ليفتح البرنامج فوراً مدى الحياة أو باشتراك سنوي.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 shrink-0">
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 text-center">
                      <div className="text-amber-400 font-black text-lg">1. تحميل</div>
                      <div className="text-[11px] text-slate-400">ينزل البرنامج على الويندوز</div>
                    </div>
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 text-center">
                      <div className="text-cyan-400 font-black text-lg">2. كود الجهاز</div>
                      <div className="text-[11px] text-slate-400">يرسل المشتري بصمة جهازه</div>
                    </div>
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 text-center">
                      <div className="text-emerald-400 font-black text-lg">3. التفعيل</div>
                      <div className="text-[11px] text-slate-400">تبعث له كود التفعيل فيفتح</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <SystemsHub lang={lang} />
          </div>
        )}

        {currentPage === 'portfolio' && (
          <div className="pt-4 pb-16">
            <Projects t={t} lang={lang} onNavigate={handleNavigate} />
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="pt-4 pb-16">
            <About t={t} lang={lang} />
            <Experience t={t} lang={lang} />
            <Contact t={t} lang={lang} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer t={t} lang={lang} onNavigate={handleNavigate} />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
