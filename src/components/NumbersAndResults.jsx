import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Award,
  DollarSign,
  Users,
  Target,
  BarChart3,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function NumbersAndResults({ lang = 'ar' }) {
  const isRtl = lang === 'ar';

  const stats = [
    {
      value: '+207',
      label: isRtl ? 'براند وشركة ناجحة' : 'Successful Brands',
      sub: isRtl ? 'عيادات، أوناش، صيانة، عقارات، وتجارة' : 'Clinics, Winches, Maintenance & Real Estate',
      icon: Users,
      color: 'from-amber-400 to-orange-500',
      border: 'border-amber-400/40'
    },
    {
      value: '18.7x',
      label: isRtl ? 'أعلى عائد إعلاني (ROAS)' : 'Peak ROAS Achieved',
      sub: isRtl ? 'تحقيق مضاعفة حقيقية لكل قرش مدفوع' : 'Direct Revenue Multiple per Ad Spend',
      icon: TrendingUp,
      color: 'from-cyan-400 to-blue-500',
      border: 'border-cyan-400/40'
    },
    {
      value: '+1.36M',
      label: isRtl ? 'ميزانيات إعلانية مدارة (بالجنيه)' : 'Total Ad Budget Managed (EGP Eq.)',
      sub: isRtl ? 'صرف موثق على جوجل، ميتا، وسناب شات' : 'Documented on Google, Meta, Snapchat & X',
      icon: DollarSign,
      color: 'from-emerald-400 to-teal-500',
      border: 'border-emerald-400/40'
    },
    {
      value: '+6',
      label: isRtl ? 'سنوات خبرة في هندسة النمو' : 'Years Experience',
      sub: isRtl ? 'دمج هندسة البرمجيات مع الميديا بايينج' : 'Software Engineering Meets Media Buying',
      icon: Award,
      color: 'from-purple-400 to-pink-500',
      border: 'border-purple-400/40'
    }
  ];

  const highlights = [
    {
      title: isRtl ? 'متابعة الـ ROI والـ ROAS لحظة بلحظة' : 'Real-Time ROI & ROAS Monitoring',
      desc: isRtl
        ? 'لا نعتمد على التقارير الشهرية المتأخرة.. بل نراقب لوحات البيانات الإعلانية لحظة بلحظة مع خوارزميات التتبع المتقدم (CAPI & Server-Side Tracking) لضمان عدم إهدار أي مليم.'
        : 'Server-side CAPI tracking and real-time dashboards ensuring zero wasted ad spend.'
    },
    {
      title: isRtl ? 'خفض تكلفة استقطاب العميل (CPL) حتى 45%' : 'Lower Cost per Lead (CPL) by up to 45%',
      desc: isRtl
        ? 'بفضل هندسة العروض الإعلانية (Irresistible Offers) والتكامل مع صفحات الهبوط الفائقة السرعة وبوتات الواتساب التفاعلية التي تصطاد العميل وتغلق الصفقة فوراً.'
        : 'High-speed landing pages and instant WhatsApp automated bots cutting customer acquisition costs.'
    },
    {
      title: isRtl ? 'تنوع استثنائي عبر كافة القطاعات الحيوية' : 'Cross-Industry Experience & Adaptability',
      desc: isRtl
        ? 'من خدمات الطوارئ وأوناش الإنقاذ في مصر، إلى أنظمة السلامة والمقاولات في السعودية (المجال الآمن)، وحتى عيادات التجميل ومشاريع الاستثمار العقاري في الإمارات.'
        : 'From emergency winch services in Egypt to fire safety enterprises in KSA and aesthetic clinics in the UAE.'
    }
  ];

  return (
    <section id="numbers-proof" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-amber-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-black mb-4 shadow-lg shadow-amber-500/10"
        >
          <BarChart3 size={16} className="text-amber-400" />
          <span>{isRtl ? 'أرقام حقيقية موثقة • وليست مجرد وعود' : 'Numbers & Proof • Not Just Promises'}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight"
        >
          {isRtl ? (
            <>
              سجل نتائج مبني على{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                الربحية والأداء الفعلي
              </span>
            </>
          ) : (
            <>
              Growth Track Record Powered by{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                True Profitability & ROAS
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
            ? 'في عالم الإعلانات الرقمية، الكلام سهل.. لكن الأرقام في مديري الإعلانات وحسابات البنوك هي المقياس الوحيد للنجاح.'
            : 'In performance marketing, words are easy. Documented ad metrics and bank receipts are the only measure of true growth.'}
        </motion.p>
      </div>

      {/* 4 Big Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`glass rounded-3xl p-6 border ${s.border} hover:scale-[1.02] transition-all flex flex-col justify-between shadow-xl`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-white mb-4">
                  <Icon size={24} className="text-amber-400" />
                </div>
                <div className={`text-4xl sm:text-5xl font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-2`}>
                  {s.value}
                </div>
                <div className="text-base font-black text-white mb-1">
                  {s.label}
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800/80">
                {s.sub}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3 Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((h, idx) => (
          <div
            key={idx}
            className="glass rounded-2xl p-6 sm:p-7 border border-slate-800/90 hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-3 text-amber-400 font-black text-base sm:text-lg">
                <CheckCircle2 size={20} className="shrink-0 text-amber-400" />
                <span>{h.title}</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {h.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
