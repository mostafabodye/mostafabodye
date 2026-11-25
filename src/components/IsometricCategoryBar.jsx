import React from 'react';
import { 
  Building2, 
  ShoppingCart, 
  GraduationCap, 
  Cpu, 
  Home, 
  Stethoscope, 
  Newspaper, 
  Plane,
  Truck
} from 'lucide-react';

export const CATEGORIES_LIST = [
  { id: 'companies', en: 'Companies', ar: 'شركات', icon: Building2 },
  { id: 'ecommerce', en: 'Ecommerce', ar: 'تجارة إلكترونية', icon: ShoppingCart },
  { id: 'courses', en: 'Courses', ar: 'كورسات', icon: GraduationCap },
  { id: 'systems', en: 'Systems', ar: 'أنظمة', icon: Cpu },
  { id: 'realestate', en: 'Real Estate', ar: 'عقارات', icon: Home },
  { id: 'medical', en: 'Medical', ar: 'طبي', icon: Stethoscope },
  { id: 'news', en: 'News', ar: 'أخبار', icon: Newspaper },
  { id: 'tourism', en: 'Tourism', ar: 'سياحة', icon: Plane },
  { id: 'winch', en: 'Fleet & Winch', ar: 'أوناش وسيارات', icon: Truck },
];

export default function IsometricCategoryBar({ activeCategory, onSelectCategory, lang = 'ar' }) {
  return (
    <div className="w-full relative z-40 bg-slate-950/90 backdrop-blur-md border-b border-purple-500/30 shadow-[0_10px_30px_rgba(147,51,234,0.15)]">
      {/* 3D Isometric Neon Bezel Container */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2">
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
          {CATEGORIES_LIST.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 shrink-0 cursor-pointer overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.6)] border-t border-cyan-300 scale-[1.02]'
                    : 'bg-[#12122a]/80 text-slate-300 hover:text-white hover:bg-purple-950/50 border border-purple-500/20 hover:border-purple-500/60'
                }`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 96% 100%, 4% 100%)',
                }}
              >
                {/* Glow bar on active */}
                {isActive && (
                  <span className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-300 shadow-[0_0_8px_#38bdf8]" />
                )}

                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white animate-pulse' : 'text-purple-400 group-hover:text-cyan-400 transition-colors'}`} />

                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[11px] sm:text-xs tracking-wide font-black">
                    {cat.en}
                  </span>
                  <span className={`text-[9px] font-cairo transition-opacity ${isActive ? 'text-cyan-100 opacity-90' : 'text-slate-400 opacity-70 group-hover:opacity-100'}`}>
                    {cat.ar}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
