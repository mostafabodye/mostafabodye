import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpLeft,
  Sparkles,
  ShieldCheck,
  Monitor,
  Megaphone,
  Globe,
  Phone,
  Award
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function Hero({ t, lang, onNavigate }) {
  const isRtl = lang === 'ar';

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
    >
      {/* Exclusive AM Marketing Royal Gold & Cyan Ambient Glow */}
      <div className="absolute top-12 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-8 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Right / Main Executive Pitch Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-center lg:text-right space-y-6"
          >
            {/* Exclusive AM Marketing Agency Identity Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/15 via-slate-900/90 to-cyan-500/15 border border-amber-400/40 shadow-lg shadow-amber-500/10">
              <img
                src={getAssetUrl('/assets/images/am_marketing_3d_logo.jpg')}
                alt="AM Marketing"
                className="w-6 h-6 rounded-full object-cover border border-amber-400"
              />
              <span className="text-xs sm:text-sm font-black text-amber-300 tracking-wide">
                {isRtl
                  ? 'وكالة AM Marketing الرقمية | الهوية الرسمية — عبد السلام'
                  : 'AM Marketing Digital Agency | Official Portal — Abdel Salam'}
              </span>
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>

            {/* Agency Headline */}
            <h1 className="text-3xl sm:text-5xl xl:text-[3.4rem] font-black leading-[1.2] text-white">
              {isRtl ? (
                <>
                  منظومة متكاملة لـ{' '}
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                    إدارة الحملات الإعلانية والشات أدز
                  </span>{' '}
                  وتطوير{' '}
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    المواقع والمتاجر وبرامج الويندوز
                  </span>
                </>
              ) : (
                <>
                  Enterprise{' '}
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                    Ads & Chat Ads Management
                  </span>{' '}
                  & Full-Stack{' '}
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Web, E-Commerce, LMS & Windows POS
                  </span>
                </>
              )}
            </h1>

            {/* Detailed Academic & Practical Tagline */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {isRtl
                ? 'نجمع بين العلم الأكاديمي والخبرة الميدانية لمضاعفة مبيعاتك: إدارة احترافية لحملات جوجل وجميع منصات السوشيال والشات أدز، برمجة مواقع ومتاجر ومنصات تعليمية متوافقة 100% مع (الموبايل، التابلت، اللابتوب، والكمبيوتر)، وتطوير برامج ويندوز محاسبية تعمل بكود تفعيل رسمي.'
                : t.hero.tagline}
            </p>

            {/* Direct Multi-Page Navigation Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('ads')}
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-600/15 hover:from-amber-500/30 hover:to-orange-600/25 border border-amber-500/40 text-right transition group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0">
                    <Megaphone size={20} />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300">
                      {isRtl ? 'إدارة الحملات + شات أدز' : 'Ads & Chat Ads Academy'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isRtl ? 'جوجل • واتساب • سناب • ميتا • تيك توك' : 'Google, WhatsApp, Snap, Meta'}
                    </div>
                  </div>
                </div>
                <ArrowUpLeft className="w-4 h-4 text-amber-400 shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate && onNavigate('web')}
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-600/15 hover:from-cyan-500/30 hover:to-blue-600/25 border border-cyan-500/40 text-right transition group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center font-black shrink-0">
                    <Globe size={20} />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-black text-white group-hover:text-cyan-300">
                      {isRtl ? 'تطوير المواقع والمتاجر والمنصات' : 'Web, Stores & LMS'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isRtl ? 'متوافق 100% موبايل • تابلت • كمبيوتر' : '100% All-Device Responsive'}
                    </div>
                  </div>
                </div>
                <ArrowUpLeft className="w-4 h-4 text-cyan-400 shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate && onNavigate('systems')}
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-600/15 hover:from-emerald-500/30 hover:to-teal-600/25 border border-emerald-500/40 text-right transition group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shrink-0">
                    <Monitor size={20} />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-black text-white group-hover:text-emerald-300">
                      {isRtl ? 'برامج الويندوز والتفعيل بالكود' : 'Windows POS & Keygen'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isRtl ? 'كاشير • مطاعم • عيادات • مخازن' : 'Offline POS + Serial Keygen'}
                    </div>
                  </div>
                </div>
                <ArrowUpLeft className="w-4 h-4 text-emerald-400 shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate && onNavigate('portfolio')}
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-600/15 hover:from-purple-500/30 hover:to-pink-600/25 border border-purple-500/40 text-right transition group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center font-black shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-black text-white group-hover:text-purple-300">
                      {isRtl ? 'سابقة الأعمال ودراسات الحالة' : 'Live Client Portfolio'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isRtl ? 'مواقع وحملات الأوناش والشركات' : 'Verified Campaigns & Sites'}
                    </div>
                  </div>
                </div>
                <ArrowUpLeft className="w-4 h-4 text-purple-400 shrink-0" />
              </button>
            </div>

            {/* Bottom Fast Contact Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
              <a
                href="https://wa.me/201098174992"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/25 hover:scale-[1.02] transition flex items-center gap-2"
              >
                <span>{isRtl ? 'تواصل مباشر عبر واتساب: 01098174992' : 'WhatsApp Consultation: 01098174992'}</span>
                <ArrowUpLeft size={16} />
              </a>

              <a
                href="tel:01098174992"
                className="px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2"
              >
                <Phone size={15} className="text-amber-400" />
                <span>{isRtl ? 'اتصال هاتفي مباشر' : 'Direct Call'}</span>
              </a>
            </div>
          </motion.div>

          {/* Left / Exclusive AM Marketing Executive Visual Identity Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md">
              {/* Outer Royal Gold & Cyan Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-amber-500 via-cyan-500 to-purple-600 opacity-50 blur-lg" />

              <div className="relative rounded-3xl bg-slate-900/95 border-2 border-amber-400/50 shadow-2xl overflow-hidden p-4 sm:p-5">
                {/* Top Agency Header Bar inside Card */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <img
                      src={getAssetUrl('/assets/images/am_marketing_3d_logo.jpg')}
                      alt="AM Logo"
                      className="w-8 h-8 rounded-lg object-cover border border-amber-400/60"
                    />
                    <div>
                      <div className="text-xs font-black text-white">AM MARKETING AGENCY</div>
                      <div className="text-[10px] text-amber-400 font-bold">EXCLUSIVE DIGITAL IDENTITY</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[10px] font-black flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    متاح الآن
                  </span>
                </div>

                {/* Portrait Image */}
                <div className="relative h-[340px] sm:h-[380px] rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950">
                  <img
                    src={getAssetUrl('/profile.jpg')}
                    alt={t.hero.altProfile}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Bottom Overlay Identity */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-amber-500/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-base font-black text-white">{t.hero.name}</div>
                        <div className="text-xs text-amber-400 font-bold">
                          {isRtl ? 'خبير الإعلانات الممولة وتطوير المواقع والأنظمة' : 'Ads & Full-Stack Systems Architect'}
                        </div>
                      </div>
                      <ShieldCheck className="w-7 h-7 text-cyan-400 shrink-0" />
                    </div>
                  </div>
                </div>

                {/* 3 Executive Metrics Strip */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800 text-center">
                  <div className="bg-slate-950/80 rounded-xl p-2 border border-slate-800/80">
                    <div className="text-sm sm:text-base font-black text-amber-400">+50</div>
                    <div className="text-[10px] text-slate-400 font-semibold">موقع وحملة ناجحة</div>
                  </div>
                  <div className="bg-slate-950/80 rounded-xl p-2 border border-slate-800/80">
                    <div className="text-sm sm:text-base font-black text-cyan-400">100%</div>
                    <div className="text-[10px] text-slate-400 font-semibold">توافق كل الأجهزة</div>
                  </div>
                  <div className="bg-slate-950/80 rounded-xl p-2 border border-slate-800/80">
                    <div className="text-sm sm:text-base font-black text-emerald-400">24/7</div>
                    <div className="text-[10px] text-slate-400 font-semibold">دعم فني وتفعيل</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
