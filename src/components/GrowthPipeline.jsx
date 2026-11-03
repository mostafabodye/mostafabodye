import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Compass,
  Code2,
  Rocket,
  TrendingUp,
  ArrowDown,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function GrowthPipeline({ lang = 'ar' }) {
  const isRtl = lang === 'ar';

  const steps = [
    {
      num: '01',
      title: isRtl ? 'البحث والتدقيق الرقمي المعمق' : 'Market & Funnel Audit',
      desc: isRtl
        ? 'تحليل دقيق للمنافسين، وفحص نقاط الضعف في مسار العميل، وتحديد الجمهور المستهدف بدقة في السوق المصري أو الخليجي.'
        : 'Deep competitor research, consumer psychology breakdown, and identifying exact audience segments in target markets.',
      icon: Search,
      color: 'from-amber-400 to-orange-500'
    },
    {
      num: '02',
      title: isRtl ? 'هندسة العرض والتموضع (The Offer)' : 'Offer & Creative Strategy',
      desc: isRtl
        ? 'صياغة عروض بيع لا تُقاوم (Irresistible Offers)، وكتابة نصوص إعلانية تلامس رغبات ومخاوف العميل وتدفعه للشراء فوراً.'
        : 'Engineering compelling, high-converting copy and positioning that makes purchasing the only logical choice.',
      icon: Compass,
      color: 'from-cyan-400 to-blue-500'
    },
    {
      num: '03',
      title: isRtl ? 'بناء المنظومة والتتبع البرمجي الذكي' : 'Tech Stack & Conversion Infrastructure',
      desc: isRtl
        ? 'برمجة صفحات هبوط سريعة جداً، ربط حاسبات تفاعلية، أتمتة ردود الواتساب، وتثبيت التتبع الدقيق (Conversions API) لمنع هدر الميزانية.'
        : 'High-speed landing pages, interactive calculators, WhatsApp automation, and robust CAPI tracking setup.',
      icon: Code2,
      color: 'from-purple-400 to-pink-500'
    },
    {
      num: '04',
      title: isRtl ? 'إطلاق الحملات الممولة واختبار الزوايا' : 'Multi-Channel Paid Ads Blitz',
      desc: isRtl
        ? 'إطلاق منظم لحملات جوجل (Search & Call Ads)، ميتا، سناب شات، وتيك توك، واختبار زوايا إعلانية متعددة للوصول لأفضل تكلفة تحويل.'
        : 'Coordinated ad launches across Google, Meta, Snapchat, and TikTok with multi-angle creative split-testing.',
      icon: Rocket,
      color: 'from-emerald-400 to-teal-500'
    },
    {
      num: '05',
      title: isRtl ? 'التوسع ومضاعفة الأرباح والـ ROAS' : 'Scale & Revenue Maximization',
      desc: isRtl
        ? 'ضخ الميزانية في الحملات الرابحة فقط، استبعاد الهدر، ومضاعفة حجم المبيعات الصافية للبيزنس بأعلى كفاءة واستقرار.'
        : 'Aggressive scaling of winning ad sets, eliminating waste, and maximizing net profitability and ROAS.',
      icon: TrendingUp,
      color: 'from-amber-400 to-yellow-500'
    }
  ];

  return (
    <section id="growth-pipeline" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-black mb-4 shadow-lg shadow-cyan-500/10"
        >
          <Sparkles size={16} className="text-cyan-400" />
          <span>{isRtl ? 'منهجية العمل الميدانية • من الصفر حتى التوسع' : 'The Execution Engine • From Zero to Scale'}</span>
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
              مسار علمي محكم لنقل بيزنسك إلى{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                مستوى الاستقرار والنمو
              </span>
            </>
          ) : (
            <>
              A 5-Step Scientific Pipeline to{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Sustainable Scaling
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
            ? 'خطوات عملية واضحة تضمن بناء ماكينة مبيعات تعمل تلقائياً دون التخبط في تجارب مكلفة.'
            : 'Predictable, battle-tested execution steps engineered to build high-converting growth engines.'}
        </motion.p>
      </div>

      {/* 5 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass rounded-3xl p-6 border border-slate-800/90 hover:border-amber-400/50 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-black bg-gradient-to-r ${st.color} bg-clip-text text-transparent`}>
                    {st.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Icon size={20} className="text-amber-400" />
                  </div>
                </div>

                <h3 className="text-base font-black text-white mb-2.5 leading-snug group-hover:text-amber-300 transition">
                  {st.title}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                <span>{isRtl ? 'تنفيذ بمخرجات موثقة' : 'Verified Deliverables'}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
