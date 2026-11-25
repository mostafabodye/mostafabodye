import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  ArrowUpRight, 
  Sparkles, 
  Code2, 
  Terminal, 
  Layers, 
  ChevronDown, 
  CheckCircle2,
  Phone,
  MessageSquare,
  ShieldCheck,
  Laptop
} from 'lucide-react';
import { enterpriseProjects } from '../data/enterpriseProjects';
import { getAssetUrl } from '../utils/assets';
import IsometricCategoryBar, { CATEGORIES_LIST } from './IsometricCategoryBar';

// Floating code snippets & tech icons for background
const FLOATING_SNIPPETS = [
  'const app = express()',
  'import { useState } from "react"',
  'wp_enqueue_script("custom-script")',
  'add_action("init", "register_post_type")',
  'export default function Page()',
  '<ThreeCanvas camera={{ fov: 45 }} />',
  'await prisma.project.findMany()',
  'tailwind.config.js { theme: { ... } }',
  'Shopify.theme.init()',
  'git push origin production',
  'const [roas, setRoas] = useState(18.7)',
  'SELECT * FROM clients WHERE status = "active"',
  'new GoogleAdsClient({ id: "am-agency" })',
  'fetch("/api/generate-reel")',
  'border-radius: 16px; backdrop-filter: blur(20px);'
];

const TECH_BADGES = [
  { name: 'React', icon: '⚛️', color: '#61dafb' },
  { name: 'Next.js', icon: '▲', color: '#ffffff' },
  { name: 'WordPress', icon: '🌐', color: '#21759b' },
  { name: 'WooCommerce', icon: '🛍️', color: '#96588a' },
  { name: 'Shopify', icon: '🛒', color: '#96bf48' },
  { name: 'Three.js', icon: '🧊', color: '#06b6d4' },
  { name: 'PHP', icon: '🐘', color: '#777bb4' },
  { name: 'Tailwind CSS', icon: '🎨', color: '#38bdf8' },
  { name: 'Google Ads', icon: '📈', color: '#f59e0b' },
  { name: 'AI Studio', icon: '🎬', color: '#ec4899' },
  { name: 'JavaScript', icon: '⚡', color: '#f7df1e' },
  { name: 'Node.js', icon: '🟢', color: '#22c55e' },
];

export default function Cinematic3DHero({ t, lang = 'ar', onNavigate }) {
  const isRtl = lang === 'ar';
  const [activeCategory, setActiveCategory] = useState('companies');
  const [activeKey, setActiveKey] = useState('F');
  const [isHoveringMarquee, setIsHoveringMarquee] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const canvasRef = useRef(null);

  // Filter projects by active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return enterpriseProjects;
    return enterpriseProjects.filter(p => p.section === activeCategory || (activeCategory === 'realestate' && p.section === 'tourism'));
  }, [activeCategory]);

  // Distribute projects into 3 columns for alternating vertical marquee
  const [col1, col2, col3] = useMemo(() => {
    const c1 = [];
    const c2 = [];
    const c3 = [];
    filteredProjects.forEach((proj, idx) => {
      if (idx % 3 === 0) c1.push(proj);
      else if (idx % 3 === 1) c2.push(proj);
      else c3.push(proj);
    });
    // Ensure sufficient items for seamless continuous looping by duplicating if needed
    const fill = (arr) => arr.length < 5 ? [...arr, ...arr, ...arr] : [...arr, ...arr];
    return [fill(c1), fill(c2), fill(c3)];
  }, [filteredProjects]);

  // Typing key simulator
  useEffect(() => {
    const keys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Space', 'Tab', 'Q', 'W', 'E', 'R'];
    const interval = setInterval(() => {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      setActiveKey(randomKey);
    }, 280);
    return () => clearInterval(interval);
  }, []);

  // Background interactive canvas with connected particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const dots = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.6 + 0.6,
      color: Math.random() > 0.5 ? '168, 85, 247' : '6, 182, 212'
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connection lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0) dot.x = width;
        if (dot.x > width) dot.x = 0;
        if (dot.y < 0) dot.y = height;
        if (dot.y > height) dot.y = 0;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dot.color}, 0.6)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${dot.color}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-[#070712] text-white overflow-hidden pt-16">
      {/* 3D Top Categories Bezel Ribbon */}
      <IsometricCategoryBar 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory} 
        lang={lang} 
      />

      {/* Floating Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Ambient Radial Spotlights */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[400px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[350px] bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Floating Tech Icons & Code Snippets Rising in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {FLOATING_SNIPPETS.map((snippet, i) => (
          <div
            key={`snippet-${i}`}
            className="floating-code-snippet absolute text-[10px] font-mono text-purple-300/40 bg-slate-900/60 border border-purple-500/20 px-3 py-1 rounded-md backdrop-blur-sm whitespace-nowrap"
            style={{
              left: `${(i * 18 + 7) % 94}%`,
              bottom: '-60px',
              animation: `floatUpDrift ${14 + (i % 6) * 3}s linear infinite`,
              animationDelay: `${(i * 1.7) % 12}s`,
            }}
          >
            {snippet}
          </div>
        ))}

        {TECH_BADGES.map((badge, i) => (
          <div
            key={`badge-${i}`}
            className="floating-tech-badge absolute flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-cyan-500/30 text-xs font-bold backdrop-blur-md shadow-lg"
            style={{
              left: `${(i * 22 + 12) % 92}%`,
              bottom: '-60px',
              animation: `floatUpDrift ${16 + (i % 5) * 3}s linear infinite`,
              animationDelay: `${(i * 2.1) % 14}s`,
            }}
          >
            <span>{badge.icon}</span>
            <span style={{ color: badge.color }}>{badge.name}</span>
          </div>
        ))}
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 py-10 sm:py-16">
        
        {/* Stage Processing Header */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-amber-400 text-xs font-black tracking-widest uppercase shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>PROCESSING</span>
            <span>•</span>
            <span className="text-purple-300">{CATEGORIES_LIST.find(c => c.id === activeCategory)?.en.toUpperCase()}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
            <span className="bg-gradient-to-r from-white via-slate-100 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">
              DEVELOPMENT &amp; PLATFORMS
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-cairo max-w-xl mx-auto">
            {isRtl 
              ? 'مشاريع حقيقية متطورة مصممة بأعلى معايير الـ UI/UX والسرعة — تصفح الشرائط المتحركة أدناه' 
              : 'Production-ready platforms built with world-class UI/UX and maximum performance.'}
          </p>
        </div>

        {/* 2-COLUMN SPLIT: LEFT (Developer Hands on Keyboard + Code Profile) | RIGHT (3D Opposing Scroll Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ========================================================
              LEFT COLUMN: Developer Profile + 3D Typing Keyboard Hands
             ======================================================== */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Developer Profile Header Card */}
            <div className="w-full bg-slate-900/80 border border-purple-500/30 rounded-3xl p-6 sm:p-7 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-600/20 to-transparent pointer-events-none rounded-tr-3xl" />
              
              {/* Profile Avatar & Title */}
              <div className="flex flex-col sm:flex-row items-center gap-5 mb-5">
                {/* Glowing Avatar */}
                <div className="relative w-24 h-24 shrink-0">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-amber-400 animate-spin opacity-80 blur-xs" style={{ animationDuration: '6s' }} />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-950 bg-slate-950">
                    <img 
                      src={getAssetUrl('/assets/images/abdel-salam-portrait.jpg')} 
                      alt="Abdel Salam" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Name & Badge */}
                <div className="text-center sm:text-left">
                  <div className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-black tracking-wider uppercase mb-1">
                    FULL STACK DEVELOPER • SHOPIFY &amp; WORDPRESS
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {t.hero?.name || 'عبد السلام (Mostafa Bodye)'}
                  </h3>
                  <p className="text-xs text-cyan-400 font-bold mt-0.5">
                    Senior Systems Architect &amp; Growth Lead
                  </p>
                </div>
              </div>

              {/* Headline Pitch */}
              <h4 className="text-lg sm:text-xl font-extrabold text-white leading-snug mb-3">
                I Build Websites with the Best{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  UI/UX Experience
                </span>
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed mb-5 font-cairo">
                {isRtl
                  ? 'تحويل الأفكار المعقدة إلى مواقع وتطبيقات تفاعلية مربحة، سريعة، ومتصدرة لمحركات البحث بأحدث التقنيات.'
                  : 'Turning complex problems into elegant, profitable, and highly engaging interactive websites.'}
              </p>

              {/* Skills Tags Strip */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                {['WordPress', 'WooCommerce', 'Shopify', 'React', 'Three.js', 'Next.js', 'PHP', 'Tailwind', 'Custom Plugins', 'Google Ads'].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-purple-950/40 border border-purple-500/30 text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* CTA Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] cursor-pointer"
                >
                  MY PROJECTS
                </button>

                <a
                  href="https://wa.me/201098174992"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-xl border border-purple-500/50 hover:border-purple-400 text-white font-bold text-xs tracking-wider uppercase hover:bg-purple-950/40 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare size={14} className="text-emerald-400" />
                  <span>CONTACT ME</span>
                </a>
              </div>
            </div>

            {/* 3D Perspective Mechanical Keyboard with Hands Typing */}
            <div className="w-full bg-[#0d0d1e]/90 border border-purple-500/20 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-500/20 text-xs font-mono text-purple-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-[11px] text-slate-400 ml-2">interactive-developer-deck.tsx</span>
                </div>
                <span className="text-[10px] text-emerald-400 animate-pulse font-bold">● LIVE TYPING</span>
              </div>

              {/* 3D Tilted Keyboard Body */}
              <div className="keyboard-perspective-box pt-2 pb-4">
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
                  {/* Space Row */}
                  <div className="kb-row justify-center">
                    <div className={`kb-key kb-space ${activeKey === 'Space' ? 'key-active' : ''}`}>SPACE</div>
                  </div>

                  {/* Animated Hands Hovering over Keyboard */}
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

              <div className="text-center pt-2 text-[11px] text-slate-400 font-mono">
                &gt; Hands actively writing production code &amp; scaling systems.
              </div>
            </div>

          </div>

          {/* ========================================================
              RIGHT COLUMN: The 3D Desk / Screen with OPPOSING SCROLLING STRIPS
              (عمود طالع وعمود نازل وعمود طالع - شريط متحرك عكس بعض)
             ======================================================== */}
          <div className="lg:col-span-7">
            
            {/* The 3D Perspective Desktop Monitor Frame */}
            <div className="relative desk-3d-scene">
              
              {/* Outer iMac Bezel Container */}
              <div 
                className="relative bg-slate-950 border-2 border-purple-500/40 rounded-3xl p-3 sm:p-4 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_80px_rgba(147,51,234,0.25)] overflow-hidden"
                onMouseEnter={() => setIsHoveringMarquee(true)}
                onMouseLeave={() => setIsHoveringMarquee(false)}
              >
                {/* Monitor Top Status Bar */}
                <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 rounded-xl mb-3 border border-purple-500/20 text-xs">
                  <div className="flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-slate-200">
                      {CATEGORIES_LIST.find(c => c.id === activeCategory)?.en} Showcase
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono">
                      {filteredProjects.length} Websites
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-cairo">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{isHoveringMarquee ? 'موقوف للمعاينة ⏸' : 'حركة تفاعلية مستمرة ⏵'}</span>
                  </div>
                </div>

                {/* THE 3 OPPOSING SCROLLING COLUMNS (Height: 520px) */}
                <div className="relative h-[480px] sm:h-[540px] overflow-hidden rounded-2xl bg-[#090914] p-2 border border-slate-800">
                  
                  {/* Top & Bottom Fade Overlay Masks for Smooth Vanishing */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#090914] via-[#090914]/80 to-transparent z-20 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#090914] via-[#090914]/80 to-transparent z-20 pointer-events-none" />

                  {/* 3-Column Grid */}
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3 h-full">
                    
                    {/* COLUMN 1: MOVES UP ⬆️ */}
                    <div className="relative overflow-hidden h-full">
                      <div className={`marquee-strip strip-up ${isHoveringMarquee ? 'paused' : ''}`}>
                        {col1.map((project, idx) => (
                          <ProjectThumbnailCard 
                            key={`col1-${project.id}-${idx}`} 
                            project={project} 
                            onSelect={setSelectedPreview} 
                          />
                        ))}
                      </div>
                    </div>

                    {/* COLUMN 2: MOVES DOWN ⬇️ */}
                    <div className="relative overflow-hidden h-full">
                      <div className={`marquee-strip strip-down ${isHoveringMarquee ? 'paused' : ''}`}>
                        {col2.map((project, idx) => (
                          <ProjectThumbnailCard 
                            key={`col2-${project.id}-${idx}`} 
                            project={project} 
                            onSelect={setSelectedPreview} 
                          />
                        ))}
                      </div>
                    </div>

                    {/* COLUMN 3: MOVES UP ⬆️ */}
                    <div className="relative overflow-hidden h-full">
                      <div className={`marquee-strip strip-up ${isHoveringMarquee ? 'paused' : ''}`}>
                        {col3.map((project, idx) => (
                          <ProjectThumbnailCard 
                            key={`col3-${project.id}-${idx}`} 
                            project={project} 
                            onSelect={setSelectedPreview} 
                          />
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Monitor Stand */}
                <div className="w-24 h-4 bg-gradient-to-b from-slate-700 to-slate-900 mx-auto mt-2 rounded-b-sm border-x border-slate-600" />
                <div className="w-44 h-2 bg-gradient-to-r from-slate-600 via-slate-300 to-slate-600 mx-auto rounded-full shadow-lg" />
              </div>

              {/* Bottom Direct Hint */}
              <p className="text-center text-slate-400 text-xs mt-3 font-cairo">
                💡 <span className="text-purple-300 font-bold">نصيحة:</span> وجّه الماوس نحو أي موقع لإيقاف الشريط أو اضغط عليه لفتحه مباشرة بملء الشاشة.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* QUICK PREVIEW LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPreview(null)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-purple-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    {selectedPreview.country}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white">{selectedPreview.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedPreview(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Screencapture Display */}
              <div className="flex-1 overflow-y-auto p-4 bg-slate-950">
                <img 
                  src={selectedPreview.image} 
                  alt={selectedPreview.title} 
                  className="w-full rounded-xl border border-slate-800 shadow-2xl"
                />
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  {selectedPreview.url}
                </div>
                <a
                  href={selectedPreview.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
                >
                  <span>Visit Live Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Single Project Thumbnail Card in the Moving Columns
function ProjectThumbnailCard({ project, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(project)}
      className="project-thumb-card group relative bg-slate-900 border border-purple-500/30 hover:border-cyan-400 rounded-xl overflow-hidden mb-3 shadow-md hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 cursor-pointer"
    >
      {/* Thumbnail Aspect Ratio Container */}
      <div className="relative aspect-[16/11] bg-slate-950 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-2 text-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black uppercase shadow">
            PREVIEW 🔍
          </span>
          <span className="text-[10px] text-white font-bold flex items-center gap-1">
            <span>Visit Now</span>
            <ArrowUpRight className="w-3 h-3 text-cyan-300" />
          </span>
        </div>

        {/* Country Badge */}
        <div className="absolute top-1.5 left-1.5 z-10 pointer-events-none">
          <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-slate-950/80 text-amber-300 border border-slate-800">
            {project.country}
          </span>
        </div>
      </div>

      {/* Title Bar */}
      <div className="p-2 text-center bg-slate-900/95 border-t border-slate-800">
        <div className="text-[11px] font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
          {project.title}
        </div>
      </div>
    </div>
  );
}
