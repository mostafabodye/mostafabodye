import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  ShoppingCart, 
  GraduationCap, 
  Cpu, 
  Home, 
  Stethoscope, 
  Newspaper, 
  Plane,
  ExternalLink,
  ArrowUpRight,
  MessageSquare,
  X
} from 'lucide-react';
import { enterpriseProjects } from './data/enterpriseProjects';
import Cinematic3DHero from './components/Cinematic3DHero';

// ── 8 PRIMARY CATEGORIES (MATCHING USER REFERENCE SCREENSHOT) ─────────────
const NAV_CATEGORIES = [
  { id: 'companies', en: 'Companies', ar: 'شركات', icon: Building2, titleEn: 'Companies Websites', titleAr: 'مواقع الشركات' },
  { id: 'ecommerce', en: 'Ecommerce', ar: 'تجارة إلكترونية', icon: ShoppingCart, titleEn: 'Ecommerce Websites', titleAr: 'مواقع المتاجر والبراندات' },
  { id: 'courses', en: 'Courses', ar: 'كورسات', icon: GraduationCap, titleEn: 'Courses Websites', titleAr: 'منصات الكورسات والتعليم' },
  { id: 'systems', en: 'Systems', ar: 'أنظمة', icon: Cpu, titleEn: 'Systems & Dashboards', titleAr: 'أنظمة الشركات ولوحات التحكم' },
  { id: 'realestate', en: 'Real Estate', ar: 'عقارات', icon: Home, titleEn: 'Real Estate Websites', titleAr: 'مواقع ومنصات العقارات' },
  { id: 'medical', en: 'Medical', ar: 'طبي', icon: Stethoscope, titleEn: 'Medical Websites', titleAr: 'مواقع العيادات والمراكز الطبية' },
  { id: 'news', en: 'News', ar: 'أخبار', icon: Newspaper, titleEn: 'News Portals', titleAr: 'بوابات ومواقع الأخبار' },
  { id: 'tourism', en: 'Tourism', ar: 'سياحة', icon: Plane, titleEn: 'Tourism Websites', titleAr: 'مواقع السياحة والرحلات' },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('companies');
  const [selectedModalProject, setSelectedModalProject] = useState(null);
  const [lang, setLang] = useState('en');

  // Filter projects by active category
  const categoryProjects = useMemo(() => {
    const projs = enterpriseProjects.filter(p => p.section === activeCategory || (activeCategory === 'realestate' && p.section === 'tourism'));
    return projs.length > 0 ? projs : enterpriseProjects.slice(0, 15);
  }, [activeCategory]);

  const currentCategoryMeta = NAV_CATEGORIES.find(c => c.id === activeCategory) || NAV_CATEGORIES[0];

  // Scroll to projects grid
  const scrollToProjects = () => {
    const el = document.getElementById('category-gallery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    scrollToProjects();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      
      {/* ══════════════════════════════════════════════════════════════════
          1. 3D ISOMETRIC TOP BEZEL NAVIGATION BAR (EXACT REFERENCE DESIGN)
      ══════════════════════════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0a20]/95 backdrop-blur-md border-b-2 border-purple-500/50 shadow-[0_10px_35px_rgba(147,51,234,0.3)]">
        <div className="w-full flex items-center justify-between px-3 sm:px-6 py-2">
          
          {/* Brand Emblem / Language Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="px-2.5 py-1 rounded-md text-[10px] font-black tracking-wider bg-purple-950/80 border border-purple-400 text-purple-200 hover:bg-purple-800 transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'AR | عربي' : 'EN | English'}
            </button>
            <span className="hidden md:inline-block font-mono text-xs font-bold text-slate-300">
              <span className="text-purple-400">&lt;</span>Abdel Salam<span className="text-cyan-400">/&gt;</span>
            </span>
          </div>

          {/* 3D Isometric Navigation Tabs (Exactly as in Reference Screenshot) */}
          <nav className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
            {NAV_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`group relative flex items-center gap-2 px-3 sm:px-4 py-2 text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#00b4d8] text-white shadow-[0_0_20px_rgba(0,180,216,0.7)] border-t-2 border-white'
                      : 'bg-[#15152b] text-slate-300 hover:text-white hover:bg-purple-950/60 border border-purple-500/30'
                  }`}
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 94% 100%, 6% 100%)',
                  }}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-purple-400 group-hover:text-cyan-400'}`} />
                  <div className="flex flex-col text-left leading-tight">
                    <span className="font-extrabold tracking-wide text-[11px] sm:text-xs">
                      {cat.en}
                    </span>
                    <span className={`text-[9px] font-cairo ${isActive ? 'text-cyan-100' : 'text-slate-400'}`}>
                      {cat.ar}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Direct WhatsApp Call Action */}
          <div className="shrink-0 flex items-center gap-2">
            <a
              href="https://wa.me/201098174992"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
            >
              <MessageSquare size={13} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>

        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════
          2. AUTHENTIC THREE.JS 3D HERO + CSS3D LAPTOP TIMELINE
             - Rotating Metallic Gold Cube + Wireframe (Stage 1)
             - Factory Conveyor Belt + Smoke + Blue Laser Plane (Stage 2)
             - 3D Laptop with CSS3D Screen & 3 Scrolling Columns (Stage 3)
             - Developer Profile Reveal with Code Background
      ══════════════════════════════════════════════════════════════════ */}
      <Cinematic3DHero onExploreProjects={scrollToProjects} />

      {/* ══════════════════════════════════════════════════════════════════
          3. FULL CATEGORY SHOWCASE GALLERY (2 ROWS OF APPLE-STYLE MONITORS)
      ══════════════════════════════════════════════════════════════════ */}
      <section id="category-gallery" className="relative z-30 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#0a0a0a]">
        
        {/* Category Header Badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#12122a] border-2 border-purple-500/40 text-white font-black text-sm sm:text-base shadow-[0_0_30px_rgba(147,51,234,0.3)]">
            <span className="text-purple-400">{React.createElement(currentCategoryMeta.icon, { size: 18 })}</span>
            <span>{currentCategoryMeta.titleEn}</span>
            <span className="text-purple-400">•</span>
            <span className="font-cairo text-sm text-cyan-300">{currentCategoryMeta.titleAr}</span>
            <span className="ml-2 text-xs font-mono px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300">
              {categoryProjects.length} Projects
            </span>
          </div>
        </div>

        {/* Dense Grid of Apple-Style Monitors with Smooth Hover Scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categoryProjects.map((project) => (
            <div key={project.id} className="website-card group">
              {/* Apple iMac Monitor Frame */}
              <div 
                className="website-monitor cursor-pointer"
                onClick={() => setSelectedModalProject(project)}
              >
                {/* Full-Page Background with Smooth 4.5s Hover Scroll */}
                <div 
                  className="website-screen-bg"
                  style={{ backgroundImage: `url(${project.image})` }}
                >
                  {/* Country Flag Badge */}
                  <div className="absolute top-2 left-2 z-10 pointer-events-none">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/85 text-amber-300 border border-slate-800 shadow">
                      {project.country}
                    </span>
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/90 text-[10px] text-cyan-300 border border-cyan-500/40 shadow-xl font-bold">
                      معاينة مكبرة 🔍
                    </span>
                  </div>
                </div>
              </div>

              {/* Aluminum Stand */}
              <div className="website-stand-neck" />
              <div className="website-stand-base" />

              {/* Title & Visit Link */}
              <div className="text-center w-full px-1">
                <h3 
                  onClick={() => setSelectedModalProject(project)}
                  className="text-sm font-bold smoke-glow-purple truncate cursor-pointer hover:underline mb-1"
                  title={project.title}
                >
                  {project.title}
                </h3>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 font-bold transition-colors group/link"
                >
                  <span>Visit Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. FOOTER & CONTACT
      ══════════════════════════════════════════════════════════════════ */}
      <footer className="relative z-30 border-t border-purple-500/30 bg-[#070712] py-14 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-2xl font-black text-white">
            جاهز لإطلاق موقعك القادم بأعلى معايير الـ UI/UX؟
          </h3>
          <p className="text-sm text-slate-400 font-cairo">
            تواصل مباشرة مع عبد السلام (Mostafa Bodye) لمناقشة مشروعك وبدء التنفيذ فوراً.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://wa.me/201098174992"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg"
            >
              واتساب مباشر: 01098174992 💬
            </a>
            <a
              href="tel:01098174992"
              className="px-6 py-3 rounded-xl border border-slate-700 text-slate-200 font-bold text-xs hover:bg-slate-800"
            >
              اتصال هاتفي: 01098174992 📞
            </a>
          </div>
          <div className="text-xs text-slate-600 pt-6">
            © 2026 Abdel Salam (Mostafa Bodye) • All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════════════════════════
          MODAL LIGHTBOX PREVIEW
      ══════════════════════════════════════════════════════════════════ */}
      {selectedModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            onClick={() => setSelectedModalProject(null)}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md cursor-pointer"
          />
          <div className="relative w-full max-w-4xl bg-slate-900 border border-purple-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  {selectedModalProject.country}
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">{selectedModalProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedModalProject(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-slate-950">
              <img 
                src={selectedModalProject.image} 
                alt={selectedModalProject.title} 
                className="w-full rounded-xl border border-slate-800 shadow-2xl"
              />
            </div>
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
              <span className="text-xs text-slate-400 truncate max-w-md">{selectedModalProject.url}</span>
              <a
                href={selectedModalProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-bold text-xs shadow-lg transition"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
