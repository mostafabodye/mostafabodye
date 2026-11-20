import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  ArrowUpRight, 
  Sparkles, 
  Globe, 
  X, 
  MessageSquare, 
  Laptop,
  CheckCircle2,
  Building2,
  ShoppingCart,
  Truck,
  Scale,
  Stethoscope,
  Cpu,
  GraduationCap,
  Palmtree,
  Trophy
} from 'lucide-react';
import { enterpriseProjects } from '../data/enterpriseProjects';

export default function Projects({ t, lang = 'ar' }) {
  const isRtl = lang === 'ar';
  const [activeTab, setActiveTab] = useState('companies');
  const [previewProject, setPreviewProject] = useState(null);

  const tabs = [
    { id: 'companies', label: isRtl ? 'شركات B2B ومواقع تعريفية' : 'Companies', icon: Building2 },
    { id: 'ecommerce', label: isRtl ? 'متاجر إلكترونية وبراندات' : 'Ecommerce', icon: ShoppingCart },
    { id: 'winch', label: isRtl ? 'أوناش وسيارات ونقل' : 'Fleet & Winch', icon: Truck },
    { id: 'legal', label: isRtl ? 'منصات قانونية وأحوال مدنية' : 'Legal & Civil', icon: Scale },
    { id: 'medical', label: isRtl ? 'عيادات ومراكز طبية' : 'Medical', icon: Stethoscope },
    { id: 'systems', label: isRtl ? 'أنظمة سحابية وبوابات' : 'Systems', icon: Cpu },
    { id: 'courses', label: isRtl ? 'منصات تعليمية وأكاديميات' : 'Courses', icon: GraduationCap },
    { id: 'realestate', label: isRtl ? 'عقارات وسياحة' : 'Real Estate', icon: Palmtree },
    { id: 'all', label: isRtl ? 'جميع الأعمال (92+ موقع)' : 'All (92+ Sites)', icon: Trophy }
  ];

  const filteredProjects = activeTab === 'all'
    ? enterpriseProjects
    : (activeTab === 'realestate' 
        ? enterpriseProjects.filter(p => p.section === 'realestate' || p.section === 'tourism')
        : enterpriseProjects.filter(p => p.section === activeTab));

  return (
    <section id="projects" className="py-20 relative bg-slate-950 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-purple-600/10 via-blue-600/10 to-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Pill & Title */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-bold shadow-xl shadow-purple-500/10">
            <Laptop className="w-4 h-4 text-purple-400" />
            <span>{isRtl ? 'معرض المنصات والمواقع المباشرة | أكثر من 90+ موقع حقيقي' : 'Live Websites Showcase | 90+ Real Production Sites'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-100 to-purple-300 bg-clip-text text-transparent">
              {isRtl ? 'معرض الأعمال والمشاريع الحية' : 'Live Client Websites Gallery'}
            </span>
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {isRtl 
              ? 'تصفح كبرى المنصات والمواقع الحية المنفذة في مصر والسعودية والإمارات — حرّك الماوس فوق أي شاشة للمعاينة الكاملة للموقع من أوله لآخره'
              : 'Explore enterprise platforms deployed across Egypt, Saudi Arabia, and UAE — Hover over any monitor to smoothly auto-scroll the full webpage'}
          </p>
        </div>

        {/* 3D Horizontal Category Tabs Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-14 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const count = tab.id === 'all'
              ? enterpriseProjects.length
              : (tab.id === 'realestate' 
                  ? enterpriseProjects.filter(p => p.section === 'realestate' || p.section === 'tourism').length
                  : enterpriseProjects.filter(p => p.section === tab.id).length);

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-lg shadow-purple-500/30 scale-105 border border-purple-400/40'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-400 group-hover:text-white'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Current Active Section Badge Banner */}
        <div className="flex items-center justify-between mb-8 px-4 py-3 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>{isRtl ? 'القطاع المختار:' : 'Active Category:'}</span>
            <span className="text-purple-400 font-black">{tabs.find(t => t.id === activeTab)?.label}</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {filteredProjects.length} {isRtl ? 'موقع حي معتمد' : 'Live Websites'}
          </span>
        </div>

        {/* Dense 5-Column Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6 mb-16"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="website-card"
              >
                {/* Apple iMac Monitor Frame */}
                <div
                  className="website-monitor"
                  onClick={() => setPreviewProject(project)}
                >
                  {/* Full-Page Background Screencapture with 4.5s Hover Scroll */}
                  <div
                    className="website-screen-bg"
                    style={{ backgroundImage: `url(${project.image})` }}
                  >
                    {/* Country Badge */}
                    <div className="absolute top-2 left-2 z-10 pointer-events-none">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/85 text-amber-300 border border-slate-800/80 shadow">
                        {project.country}
                      </span>
                    </div>

                    {/* Hover Hint overlay icon */}
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-slate-900/90 text-[10px] text-purple-300 border border-purple-500/40 shadow-xl font-bold flex items-center gap-1">
                        <span>معاينة مكبرة 🔍</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Apple iMac Aluminum Neck & Base */}
                <div className="website-stand-neck" />
                <div className="website-stand-base" />

                {/* Clean Project Title & Direct Link */}
                <div className="text-center w-full px-1">
                  <h3
                    onClick={() => setPreviewProject(project)}
                    className="text-sm sm:text-base font-bold smoke-glow-purple truncate cursor-pointer hover:underline transition-colors block mb-1"
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Enterprise Call To Action Box */}
        <div className="text-center py-12 px-6 sm:px-12 bg-gradient-to-br from-slate-900 via-slate-900/90 to-purple-950/30 border border-purple-500/30 rounded-3xl max-w-4xl mx-auto shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isRtl ? 'جاهز لإطلاق موقع أو منصة تسيطر بها على مجالك؟' : 'Ready to Launch Your High-Converting Platform?'}</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-white">
            {isRtl ? 'اطلب تصميم وبرمجة موقعك الآن بنفس هذا المستوى العالمي' : 'Order Your Turnkey Enterprise Website Today'}
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {isRtl
              ? 'سواء كنت بحاجة لمنصة شركة، متجر إلكتروني، منصة ديسباتش وسيارات، مركز طبي، أو منصة قانونية — تواصل مباشرة مع عبد السلام للحصول على دراسة فنية وعرض سعر فوري.'
              : 'Whether you need a Corporate Website, E-Commerce Store, Winch Dispatch Network, Medical Hub, or Legal Portal — Contact Abdel Salam directly for an instant quote.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/201098174992?text=${encodeURIComponent(
                'مرحباً عبد السلام، شاهدت معرض أعمالك الرائع وأرغب في استشارة وتصميم موقع مثل هذه المشاريع لنشاطي التجاري.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 rounded-xl text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isRtl ? 'تواصل عبر واتساب واطلب موقعك الآن 💬' : 'Chat on WhatsApp & Order Now 💬'}</span>
            </a>

            <a
              href="tel:01098174992"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-900 border border-slate-700 hover:border-purple-400 text-slate-200 hover:text-white rounded-xl font-bold text-sm transition-all cursor-pointer"
            >
              <span>{isRtl ? 'اتصال مباشر: 01098174992 📞' : 'Direct Call: +20 1098174992 📞'}</span>
            </a>
          </div>

          {/* Strategic Contextual SEO Internal Linking Hub */}
          <div className="pt-8 border-t border-slate-800/80 mt-8 text-center">
            <p className="text-xs font-bold text-slate-400 mb-4 tracking-wide">
              {isRtl ? '🔗 شبكة خدمات وحلول النمو الرقمي المتكاملة:' : '🔗 Integrated Digital Growth & Platform Services:'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#page-ads"
                className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 text-slate-300 hover:text-blue-300 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                title="خبير إعلانات جوجل وتوسيع المبيعات"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>{isRtl ? 'إدارة حملات إعلانات جوجل (Google Ads)' : 'Google Ads Management'}</span>
              </a>

              <a
                href="#page-web"
                className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-300 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                title="تطوير متاجر إلكترونية ومنصات ويب متكاملة"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isRtl ? 'تطوير منصات ومتاجر إلكترونية احترافية' : 'Full-Stack Web & Stores'}</span>
              </a>

              <a
                href="#page-systems"
                className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/50 text-slate-300 hover:text-purple-300 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                title="أنظمة الذكاء الاصطناعي وأتمتة الأعمال"
              >
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>{isRtl ? 'أنظمة وحلول الذكاء الاصطناعي للأعمال' : 'AI Systems & Automation'}</span>
              </a>

              <a
                href="#page-contact"
                className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-amber-300 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                title="طلب استشارة سيو ونمو المبيعات"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{isRtl ? 'حجز استشارة سيو ونمو رقمي' : 'Free SEO & Growth Consultation'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Interactive Preview Lightbox Modal */}
      {previewProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div 
            onClick={() => setPreviewProject(null)}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
          />

          <div className="relative w-full max-w-4xl bg-slate-900 border border-purple-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  {previewProject.country}
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">{previewProject.title}</h3>
              </div>
              <button
                onClick={() => setPreviewProject(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Full-Page Screencapture Viewport */}
            <div className="overflow-y-auto p-4 sm:p-6 bg-slate-950 max-h-[70vh]">
              <img
                src={previewProject.image}
                alt={previewProject.title}
                className="w-full h-auto rounded-xl border border-slate-800 shadow-2xl"
              />
            </div>

            {/* Footer Actions */}
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href={previewProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-white font-bold text-sm shadow-lg shadow-purple-500/25 transition-all"
              >
                <Globe className="w-4 h-4" />
                <span>{isRtl ? 'زيارة الموقع المباشر ↗' : 'Visit Live Website ↗'}</span>
              </a>

              <a
                href={`https://wa.me/201098174992?text=${encodeURIComponent(
                  `مرحباً عبد السلام، أرغب في تنفيذ وبرمجة موقع مثل (${previewProject.title}) لنشاطي التجاري.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 rounded-xl text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isRtl ? 'طلب موقع مثل هذا عبر واتساب 💬' : 'Order Similar Website on WhatsApp 💬'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
