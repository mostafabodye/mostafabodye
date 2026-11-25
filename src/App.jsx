import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Building2, 
  ShoppingCart, 
  GraduationCap, 
  Cpu, 
  Home, 
  Stethoscope, 
  Newspaper, 
  Plane,
  Truck,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  Phone,
  Code2,
  CheckCircle2,
  X,
  Laptop
} from 'lucide-react';
import { enterpriseProjects } from './data/enterpriseProjects';
import { getAssetUrl } from './utils/assets';

// ── 8 PRIMARY CATEGORIES MATCHING REFERENCE SITE ─────────────
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

// Floating code snippets & tech logos
const FLOATING_CODE_ITEMS = [
  'class Dev extends Human {',
  'const app = express()',
  'import React, { useState }',
  'wp_enqueue_script("theme-core")',
  'Shopify.theme.init()',
  'SELECT * FROM clients',
  'git push origin production',
  '<ThreeCanvas fov={45} />',
  'const roas = 18.7;',
  'border-radius: 12px; backdrop-filter: blur(16px);',
  'add_action("init", "setup_api")',
  'async function deployPlatform()',
  'tailwind.config.js { ... }',
  'export default function Portfolio()'
];

const FLOATING_ICONS = [
  { name: 'React', icon: '⚛️', color: '#61dafb' },
  { name: 'Next.js', icon: '▲', color: '#ffffff' },
  { name: 'WordPress', icon: '🌐', color: '#21759b' },
  { name: 'Shopify', icon: '🛍️', color: '#96bf48' },
  { name: 'PHP', icon: '🐘', color: '#777bb4' },
  { name: 'Three.js', icon: '🧊', color: '#06b6d4' },
  { name: 'Tailwind', icon: '🎨', color: '#38bdf8' },
  { name: 'Google Ads', icon: '📈', color: '#f59e0b' },
  { name: 'JavaScript', icon: '⚡', color: '#f7df1e' },
  { name: 'Node.js', icon: '🟢', color: '#22c55e' }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('courses');
  const [activeKey, setActiveKey] = useState('F');
  const [scrollY, setScrollY] = useState(0);
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);
  const [selectedModalProject, setSelectedModalProject] = useState(null);
  const [lang, setLang] = useState('en'); // 'en' or 'ar'
  const canvasRef = useRef(null);

  // Track window scroll for 3D camera progression
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard random typing simulator
  useEffect(() => {
    const keys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Space', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y'];
    const timer = setInterval(() => {
      setActiveKey(keys[Math.floor(Math.random() * keys.length)]);
    }, 250);
    return () => clearInterval(timer);
  }, []);

  // Background particle network on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.5,
      color: Math.random() > 0.5 ? '168, 85, 247' : '6, 182, 212'
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, 0.7)`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Filter projects by active category
  const categoryProjects = useMemo(() => {
    return enterpriseProjects.filter(p => p.section === activeCategory);
  }, [activeCategory]);

  // Split into 3 columns for alternating vertical marquee
  const [col1, col2, col3] = useMemo(() => {
    const c1 = [];
    const c2 = [];
    const c3 = [];
    categoryProjects.forEach((proj, idx) => {
      if (idx % 3 === 0) c1.push(proj);
      else if (idx % 3 === 1) c2.push(proj);
      else c3.push(proj);
    });
    const fill = (arr) => arr.length < 5 ? [...arr, ...arr, ...arr] : [...arr, ...arr];
    return [fill(c1), fill(c2), fill(c3)];
  }, [categoryProjects]);

  const currentCategoryMeta = NAV_CATEGORIES.find(c => c.id === activeCategory) || NAV_CATEGORIES[0];

  // Scroll to projects grid
  const scrollToProjects = () => {
    const el = document.getElementById('category-gallery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070712] text-white font-sans selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      
      {/* ══════════════════════════════════════════════════════════════════
          1. 3D ISOMETRIC TOP BEZEL NAVIGATION BAR (EXACT REFERENCE DESIGN)
      ══════════════════════════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c1e]/95 backdrop-blur-md border-b-2 border-purple-500/40 shadow-[0_10px_35px_rgba(147,51,234,0.25)]">
        <div className="w-full flex items-center justify-between px-2 sm:px-6 py-2">
          
          {/* Brand Emblem / Language Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="px-2.5 py-1 rounded-md text-[10px] font-black tracking-wider bg-purple-950/80 border border-purple-400 text-purple-200 hover:bg-purple-800 transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'AR | عربي' : 'EN | English'}
            </button>
            <span className="hidden md:inline-block font-mono text-xs font-bold text-slate-400">
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
                  onClick={() => setActiveCategory(cat.id)}
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
            >
              <MessageSquare size={13} />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>
      </header>

      {/* Background Interactive Particles Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Floating Code Snippets & Tech Logos Drift Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
        {FLOATING_CODE_ITEMS.map((snippet, i) => (
          <div
            key={`code-float-${i}`}
            className="absolute text-[10px] font-mono text-purple-300/40 bg-slate-900/60 border border-purple-500/20 px-3 py-1 rounded backdrop-blur-sm whitespace-nowrap"
            style={{
              left: `${(i * 17 + 5) % 94}%`,
              bottom: '-60px',
              animation: `floatUpDrift ${13 + (i % 5) * 3}s linear infinite`,
              animationDelay: `${(i * 1.8) % 11}s`,
            }}
          >
            {snippet}
          </div>
        ))}

        {FLOATING_ICONS.map((badge, i) => (
          <div
            key={`icon-float-${i}`}
            className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-cyan-500/30 text-xs font-bold backdrop-blur-md shadow-lg"
            style={{
              left: `${(i * 21 + 10) % 92}%`,
              bottom: '-60px',
              animation: `floatUpDrift ${15 + (i % 6) * 3}s linear infinite`,
              animationDelay: `${(i * 2.3) % 13}s`,
            }}
          >
            <span>{badge.icon}</span>
            <span style={{ color: badge.color }}>{badge.name}</span>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          2. STAGE 1: HERO PROCESSING & FLOATING 3D MECHANICAL KEYBOARD
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 pt-28 pb-12 flex flex-col items-center justify-center text-center px-4">
        
        {/* Stage Status Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-950/60 border border-purple-500/50 text-amber-400 text-xs font-black tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span>PROCESSING</span>
        </div>

        {/* Big Glowing DEVELOPMENT Title */}
        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase mb-6 drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]">
          DEVELOPMENT
        </h1>

        {/* 3D FLOATING MECHANICAL KEYBOARD WITH DEVELOPER HANDS TYPING */}
        <div className="w-full max-w-lg mb-8 relative">
          <div className="keyboard-perspective-box">
            <div className="mini-keyboard-surface mx-auto">
              
              {/* Row 1 */}
              <div className="kb-row">
                {['ESC', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'DEL'].map((k) => (
                  <div key={k} className={`kb-key ${activeKey === k ? 'key-active' : ''}`}>{k}</div>
                ))}
              </div>
              {/* Row 2 */}
              <div className="kb-row">
                {['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((k) => (
                  <div key={k} className={`kb-key ${activeKey === k ? 'key-active' : ''}`}>{k}</div>
                ))}
              </div>
              {/* Row 3 */}
              <div className="kb-row">
                {['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER'].map((k) => (
                  <div key={k} className={`kb-key ${activeKey === k ? 'key-active' : ''}`}>{k}</div>
                ))}
              </div>
              {/* Row 4 */}
              <div className="kb-row">
                {['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'SHIFT'].map((k) => (
                  <div key={k} className={`kb-key ${activeKey === k ? 'key-active' : ''}`}>{k}</div>
                ))}
              </div>
              {/* Row 5 */}
              <div className="kb-row justify-center">
                <div className={`kb-key kb-space ${activeKey === 'Space' ? 'key-active' : ''}`}>SPACE</div>
              </div>

              {/* Developer Hands Hovering and Typing */}
              <div className="keyboard-hands-container pointer-events-none">
                {/* Left Hand */}
                <div className="keyboard-hand hand-left">
                  <div className="finger-segment f-pinky" />
                  <div className="finger-segment f-ring" />
                  <div className="finger-segment f-middle" />
                  <div className="finger-segment f-index" />
                  <div className="finger-thumb-left" />
                  <div className="hand-palm" />
                </div>

                {/* Right Hand */}
                <div className="keyboard-hand hand-right">
                  <div className="finger-segment f-index" />
                  <div className="finger-segment f-middle" />
                  <div className="finger-segment f-ring" />
                  <div className="finger-segment f-pinky" />
                  <div className="finger-thumb-right" />
                  <div className="hand-palm" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll Prompt Indicator */}
        <div className="flex flex-col items-center gap-2 text-slate-400 text-xs font-mono animate-bounce cursor-pointer" onClick={scrollToProjects}>
          <span>SCROLL DOWN TO REVEAL DESK &amp; PROJECTS</span>
          <span className="text-lg">▼</span>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. STAGE 2: 3D ASSEMBLED DESK WITH OPPOSING VERTICAL MARQUEES
             + DEVELOPER PROFILE CARD (LEFT) & 3-COLUMN MARQUEE (RIGHT)
      ══════════════════════════════════════════════════════════════════ */}
      <section id="desk-section" className="relative z-20 py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT: DEVELOPER CODE & PROFILE IDENTITY */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Syntax Code Editor Window */}
            <div className="bg-[#0e0e1e] border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#141428] border-b border-purple-500/20 text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="ml-2 text-purple-300">portfolio.dev.ts</span>
                </div>
                <span className="text-[10px] text-cyan-400">TypeScript</span>
              </div>
              <div className="p-4 leading-relaxed text-slate-300">
                <div className="text-purple-400">class <span className="text-yellow-400">Dev</span> <span className="text-purple-400">extends</span> <span className="text-yellow-400">Human</span> &#123;</div>
                <div className="pl-4 text-cyan-300">constructor() &#123;</div>
                <div className="pl-8 text-slate-400">super();</div>
                <div className="pl-8 text-emerald-300">this.name = <span className="text-amber-300">"Abdel Salam (Mostafa Bodye)"</span>;</div>
                <div className="pl-8 text-emerald-300">this.coffee = <span className="text-cyan-400">true</span>;</div>
                <div className="pl-8 text-emerald-300">this.stack = [<span className="text-amber-300">"Shopify"</span>, <span className="text-amber-300">"WordPress"</span>, <span className="text-amber-300">"React"</span>, <span className="text-amber-300">"Three.js"</span>];</div>
                <div className="pl-4 text-cyan-300">&#125;</div>
                <div className="text-purple-400">&#125;</div>
              </div>
            </div>

            {/* Profile Identity Card */}
            <div className="bg-[#0d0d20]/95 border border-purple-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-4">
                {/* Glowing Avatar */}
                <div className="relative w-20 h-20 shrink-0">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-amber-400 animate-spin opacity-80" style={{ animationDuration: '6s' }} />
                  <img 
                    src={getAssetUrl('/assets/images/abdel-salam-portrait.jpg')} 
                    alt="Abdel Salam" 
                    className="relative w-full h-full rounded-full object-cover object-top border-2 border-slate-950"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-black tracking-wider text-amber-400 uppercase">
                    FULL STACK DEVELOPER • WORDPRESS &amp; SHOPIFY &amp; SALLA
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Abdel Salam (Mostafa Bodye)
                  </h3>
                  <div className="text-xs text-cyan-400 font-bold">
                    Senior Systems Architect &amp; Growth Lead
                  </div>
                </div>
              </div>

              <h4 className="text-base sm:text-lg font-black text-white mb-2 leading-snug">
                I Build Websites with the best UI/UX Experience
              </h4>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed font-cairo">
                {lang === 'en' 
                  ? 'Turning complex problems into elegant, profitable interactive Websites.'
                  : 'أحوّل المشاكل المعقدة إلى مواقع وتطبيقات تفاعلية أنيقة ومربحة.'}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {['WordPress', 'WooCommerce', 'Shopify', 'HTML', 'CSS', 'Bootstrap', 'JS', 'JQuery', 'React', 'Three.js', 'PHP', 'Custom plugins', 'Custom Themes'].map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-purple-950/40 border border-purple-500/30 text-slate-200">
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3">
                <button
                  onClick={scrollToProjects}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  MY PROJECTS
                </button>
                <a
                  href="https://wa.me/201098174992"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-xl border border-purple-400 text-white font-bold text-xs uppercase tracking-wider hover:bg-purple-950/50 transition cursor-pointer"
                >
                  CONTACT ME
                </a>
              </div>

            </div>

          </div>

          {/* RIGHT: THE 3 OPPOSING SCROLLING COLUMNS (⬆️ ⬇️ ⬆️) */}
          <div className="lg:col-span-7">
            <div 
              className="bg-slate-950 border-2 border-purple-500/40 rounded-3xl p-3 sm:p-4 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_80px_rgba(147,51,234,0.3)] relative"
              onMouseEnter={() => setIsMarqueeHovered(true)}
              onMouseLeave={() => setIsMarqueeHovered(false)}
            >
              {/* Top Banner on Screen */}
              <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 rounded-xl mb-3 border border-purple-500/20 text-xs">
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-cyan-400" />
                  <span className="font-black text-white">{currentCategoryMeta.en}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                    {categoryProjects.length} Projects
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-cairo">
                  {isMarqueeHovered ? '⏸ موقوف للمعاينة' : '⏵ شريط ثلاثي متحرك عكس بعض'}
                </div>
              </div>

              {/* 3 OPPOSING MARQUEE COLUMNS (520px height) */}
              <div className="relative h-[480px] sm:h-[540px] overflow-hidden rounded-2xl bg-[#090914] p-2 border border-slate-800">
                {/* Fade Gradients top & bottom */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#090914] to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#090914] to-transparent z-20 pointer-events-none" />

                <div className="grid grid-cols-3 gap-2.5 sm:gap-3 h-full">
                  
                  {/* COLUMN 1: MOVES UP ⬆️ */}
                  <div className="relative overflow-hidden h-full">
                    <div className={`marquee-strip strip-up ${isMarqueeHovered ? 'paused' : ''}`}>
                      {col1.map((p, idx) => (
                        <OpposingCard key={`c1-${p.id}-${idx}`} project={p} onSelect={setSelectedModalProject} />
                      ))}
                    </div>
                  </div>

                  {/* COLUMN 2: MOVES DOWN ⬇️ */}
                  <div className="relative overflow-hidden h-full">
                    <div className={`marquee-strip strip-down ${isMarqueeHovered ? 'paused' : ''}`}>
                      {col2.map((p, idx) => (
                        <OpposingCard key={`c2-${p.id}-${idx}`} project={p} onSelect={setSelectedModalProject} />
                      ))}
                    </div>
                  </div>

                  {/* COLUMN 3: MOVES UP ⬆️ */}
                  <div className="relative overflow-hidden h-full">
                    <div className={`marquee-strip strip-up ${isMarqueeHovered ? 'paused' : ''}`}>
                      {col3.map((p, idx) => (
                        <OpposingCard key={`c3-${p.id}-${idx}`} project={p} onSelect={setSelectedModalProject} />
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Monitor Stand Base */}
              <div className="w-24 h-4 bg-gradient-to-b from-slate-700 to-slate-900 mx-auto mt-2 rounded-b-sm border-x border-slate-600" />
              <div className="w-44 h-2 bg-gradient-to-r from-slate-600 via-slate-300 to-slate-600 mx-auto rounded-full shadow-lg" />
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. STAGE 3: THE FULL CATEGORY SHOWCASE SHELF (IMAGE 1 REFERENCE)
             Rows of Apple-Style Monitors with Hover Full-Page Scroll
      ══════════════════════════════════════════════════════════════════ */}
      <section id="category-gallery" className="relative z-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Category Header Badge (Matching Image 1) */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#12122a] border-2 border-purple-500/40 text-white font-black text-sm sm:text-base shadow-[0_0_30px_rgba(147,51,234,0.3)]">
            <span className="text-purple-400">{React.createElement(currentCategoryMeta.icon, { size: 18 })}</span>
            <span>{currentCategoryMeta.titleEn}</span>
            <span className="text-purple-400">•</span>
            <span className="font-cairo text-sm text-cyan-300">{currentCategoryMeta.titleAr}</span>
          </div>
        </div>

        {/* Dense Grid of Apple-Style Monitors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
          {categoryProjects.map((project) => (
            <div key={project.id} className="website-card group">
              {/* Apple iMac Monitor Frame */}
              <div 
                className="website-monitor"
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
          5. FOOTER & CONTACT
      ══════════════════════════════════════════════════════════════════ */}
      <footer className="relative z-20 border-t border-purple-500/30 bg-[#090918] py-12 px-4 text-center">
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
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
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
                ✕
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
              <span className="text-xs text-slate-400">{selectedModalProject.url}</span>
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

// Single Card in the 3 Opposing Marquee Columns
function OpposingCard({ project, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(project)}
      className="group relative bg-slate-900 border border-purple-500/30 hover:border-cyan-400 rounded-xl overflow-hidden mb-3 shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-[16/11] bg-slate-950 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-2 text-center gap-1">
          <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black uppercase shadow">
            PREVIEW 🔍
          </span>
          <span className="text-[10px] text-white font-bold flex items-center gap-1">
            <span>Visit Now</span>
            <ArrowUpRight className="w-3 h-3 text-cyan-300" />
          </span>
        </div>
        <div className="absolute top-1.5 left-1.5 z-10 pointer-events-none">
          <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-slate-950/80 text-amber-300 border border-slate-800">
            {project.country}
          </span>
        </div>
      </div>
      <div className="p-2 text-center bg-slate-900/95 border-t border-slate-800">
        <div className="text-[11px] font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
          {project.title}
        </div>
      </div>
    </div>
  );
}
