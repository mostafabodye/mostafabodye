import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Sparkles, MessageSquare, ArrowUpLeft, ShieldCheck, Zap } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function StoryVideoSection({ lang = 'ar', onNavigate }) {
  const isRtl = lang === 'ar';
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section id="founder-story" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/15 via-cyan-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 to-cyan-500/15 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-black mb-4 shadow-lg shadow-amber-500/10"
        >
          <Sparkles size={15} className="text-amber-400 animate-pulse" />
          <span>{isRtl ? 'حكاية البراند والمؤسس • قصة النمو' : 'Founder & Brand Story • Growth Journey'}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight"
        >
          {isRtl ? (
            <>
              اتعرف عليّا —{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                مين عبد السلام؟
              </span>
            </>
          ) : (
            <>
              Meet The Architect —{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                Who's Abdel Salam?
              </span>
            </>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base leading-relaxed"
        >
          {isRtl
            ? 'لسنا مجرد مبرمجين، ولسنا مجرد معلنين.. شاهد الفيديو وتعرّف كيف ندمج هندسة البرمجيات وأتمتة الذكاء الاصطناعي مع الحملات الإعلانية لبناء منظومات تصنع نمو الشركات الحقيقي.'
            : 'Not just an agency, not just a developer. Watch the video to see how we fuse full-stack engineering, AI automation, and targeted ads into cohesive growth engines.'}
        </motion.p>
      </div>

      {/* Cinematic Video Showcase Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden glass border-2 border-amber-500/30 shadow-2xl shadow-amber-500/10 group"
      >
        {/* Glow border ring */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-transparent to-cyan-500/20 pointer-events-none" />

        {/* Video Element */}
        <div className="relative aspect-video bg-slate-950 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={getAssetUrl('/assets/videos/who_is_abdelsalam.mp4')}
            className="w-full h-full object-cover"
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Play/Pause Overlay Button when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex flex-col items-center justify-center gap-4 transition-all group-hover:bg-slate-950/40">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 shadow-2xl shadow-amber-500/50 transform group-hover:scale-110 transition-transform">
                <Play size={40} className="fill-slate-950 translate-x-1" />
              </div>
              <span className="text-white text-sm sm:text-base font-black tracking-wide bg-slate-900/80 px-4 py-1.5 rounded-full border border-amber-400/30 shadow-lg">
                {isRtl ? 'اضغط لتشغيل الفيديو التعريفي (1:10 دقيقة)' : 'Click to Play Founder Story (1:10 min)'}
              </span>
            </div>
          )}

          {/* Quick Audio Mute Toggle */}
          {isPlaying && (
            <button
              onClick={toggleMute}
              className="absolute bottom-4 left-4 z-20 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-amber-400/40 flex items-center justify-center shadow-lg transition"
              title={isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          )}
        </div>
      </motion.div>

      {/* 3 Core Founder Pillars below the video */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10">
        <div className="glass rounded-2xl p-6 border border-amber-500/20 hover:border-amber-400/50 transition">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300 flex items-center justify-center mb-3">
            <Zap size={20} />
          </div>
          <h3 className="text-lg font-black text-white mb-1.5">
            {isRtl ? 'الفلسفة الجوهرية' : 'Core Philosophy'}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {isRtl
              ? 'البيزنس لا يحتاج مصاريف إعلانات أكثر.. بل يحتاج منظومة أذكى تحافظ على كل زائر وتحوله لصفقة.'
              : 'Businesses do not need more ad spending; they need smarter engines that convert every lead.'}
          </p>
        </div>

        <div className="glass rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400/50 transition">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 flex items-center justify-center mb-3">
            <ShieldCheck size={20} />
          </div>
          <h3 className="text-lg font-black text-white mb-1.5">
            {isRtl ? 'الترسانة التقنية' : 'The Tech Arsenal'}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {isRtl
              ? 'حاسبة تفاعلية تقفل الصفقات في ثوانٍ، وبوتات ذكاء اصطناعي 24/7، وحملات موجهة تحقق عائداً استثنائياً.'
              : 'Interactive calculators, 24/7 AI CRM bots, and high-ROAS targeted media buying campaigns.'}
          </p>
        </div>

        <div className="glass rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/50 transition">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 flex items-center justify-center mb-3">
            <MessageSquare size={20} />
          </div>
          <h3 className="text-lg font-black text-white mb-1.5">
            {isRtl ? 'شريك نمو مباشر' : 'Direct Growth Partner'}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {isRtl
              ? 'تتواصل مباشرة مع عبد السلام كمهندس واستراتيجي مبيعات مسؤول عن نتائج أرقامك، وليس مجرد موظف خدمة عملاء.'
              : 'Direct collaboration with Abdel Salam as your growth strategist and systems engineer.'}
          </p>
        </div>
      </div>

      {/* Call to Action Button */}
      <div className="text-center mt-10">
        <a
          href="https://wa.me/201098174992?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A3%D8%B3%D8%AA%D8%A7%D8%B0%20%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D8%B4%D8%A7%D9%87%D8%AF%D8%AA%D9%8F%20%D8%A7%D9%84%D9%81%D9%8A%D8%AF%D9%8A%D9%88%20%D8%A7%D9%84%D8%AA%D8%B9%D8%B1%D9%8A%D9%81%D9%8A%20%D9%88%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%84%D8%AA%D8%B7%D9%88%D9%8A%D8%B1%20%D9%85%D9%86%D8%B8%D9%88%D9%85%D8%A9%20%D8%A7%D9%84%D9%85%D8%A8%D9%8A%D8%B9%D8%A7%D8%AA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 transform hover:-translate-y-1 transition-all"
        >
          <MessageSquare size={20} className="text-slate-950" />
          <span>{isRtl ? 'تحدث مباشرة مع عبد السلام عبر واتساب' : 'Chat Directly With Abdel Salam on WhatsApp'}</span>
          <ArrowUpLeft size={18} className="text-slate-950" />
        </a>
      </div>
    </section>
  );
}
