import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Target, ShieldCheck, MessageSquare, Phone, CheckCircle2,
  BarChart3, Zap, Globe, Users, Award, ArrowUpRight, Layers, Search, Play
} from 'lucide-react';

export default function AdsAcademyPage({ lang = 'ar', onNavigate }) {
  const isRtl = lang === 'ar';
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [monthlyBudget, setMonthlyBudget] = useState(15000);

  const platforms = [
    {
      id: 'google',
      name: isRtl ? 'إعلانات جوجل (Google Ads)' : 'Google Ads Ecosystem',
      badge: isRtl ? 'بحث + اتصال فوري + خرائط' : 'Search + Call-Only + Maps',
      color: 'from-blue-600 to-cyan-500',
      border: 'border-blue-500/40',
      icon: '🔍',
      desc: isRtl
        ? 'السيطرة الكاملة على الصفحة الأولى في محرك بحث جوجل؛ نصل للعميل في اللحظة التي يبحث فيها عن خدمتك بنية شراء مؤكدة 100%.'
        : 'Total first-page search dominance capturing high-intent buyers at the exact moment of need.',
      adTypes: isRtl
        ? [
            'حملات الاتصال المباشر (Call-Only Ads) للأوناش والطوارئ والخدمات الفورية',
            'حملات شبكة البحث (Search Ads) بهندسة الكلمات المفتاحية الدقيقة',
            'إعلانات خرائط جوجل (Google Maps) لجذب الزيارات والمكالمات المحلية',
            'حملات الأداء الأقصى (Performance Max) واليوتيوب والمتاجر (Shopping)'
          ]
        : [
            'Call-Only emergency response campaigns',
            'Exact & Phrase Match Search architecture',
            'Local Google Maps pin promotions',
            'Performance Max & Google Shopping feeds'
          ],
      metrics: { ctr: '18.5%', roas: '6.2X', conversion: '+340%' }
    },
    {
      id: 'chat-snap',
      name: isRtl ? 'شات أدز وسناب شات (Chat Ads & Snapchat Ads)' : 'Chat Ads & Snapchat Ads',
      badge: isRtl ? 'محادثات بيعية فورية + الخليج ومصر' : 'Conversational Funnels + GCC/EG',
      color: 'from-amber-500 to-yellow-500',
      border: 'border-amber-500/40',
      icon: '💬',
      desc: isRtl
        ? 'منظومة إعلانات المحادثات الفورية (Chat Ads) وإعلانات سناب شات؛ نحول المشاهد من الإعلان مباشرة إلى محادثة واتساب أو ماسنجر أو سناب شات لإتمام البيع في دقائق.'
        : 'Direct conversational advertising & Snapchat campaigns converting viewers straight into active WhatsApp, Messenger, and Snap threads.',
      adTypes: isRtl
        ? [
            'إعلانات Click-to-WhatsApp و Chat Ads بربط تلقائي مع رسائل الترحيب والرد السريع',
            'إعلانات سناب شات (Snap Ads & Story Ads) لاكتساح السوق السعودي والخليجي والمصري',
            'أتمتة محادثات الماسنجر وانستجرام دايركت (Chat Funnels) لتأهيل العميل قبل التحويل للمبيعات',
            'إعلانات الكتالوج التفاعلية على سناب شات والشات المباشر للمتاجر والعقارات'
          ]
        : [
            'Click-to-WhatsApp & Automated Chat Ads funnels',
            'Snapchat Story & Collection Ads for KSA/GCC & Egypt',
            'Messenger & Instagram DM conversational lead qualification',
            'Dynamic Catalog Chat Ads for E-Commerce & Real Estate'
          ],
      metrics: { ctr: '14.2%', roas: '5.4X', conversion: '+290%' }
    },
    {
      id: 'meta',
      name: isRtl ? 'إعلانات ميتا (Facebook & Instagram Ads)' : 'Meta Ads (Facebook & IG)',
      badge: isRtl ? 'ليد جينيريشن + متاجر + ريلز' : 'Lead Gen + Catalog + Reels',
      color: 'from-indigo-600 to-purple-600',
      border: 'border-indigo-500/40',
      icon: '📱',
      desc: isRtl
        ? 'استهداف ديموغرافي وسلوكي فائق الدقة عبر فيسبوك وانستجرام، مع تصميم نماذج تسجيل فورية (Instant Forms) وربط البيكسل والـ Conversion API.'
        : 'Precision demographic and behavioral targeting across Facebook and Instagram with server-side CAPI tracking.',
      adTypes: isRtl
        ? [
            'حملات استقطاب العملاء (Lead Generation) بأسئلة فلترة للعقارات والشركات والعيادات',
            'حملات المتاجر الإلكترونية (Advantage+ Shopping & Dynamic Catalog)',
            'إعلانات الريلز التفاعلية (Reels Ads) عالية الانتشار ومعدلات الـ Hook المرتفعة',
            'حملات إعادة الاستهداف الذكي (Retargeting & Lookalike Audiences)'
          ]
        : [
            'Qualified Instant Lead Forms for Real Estate & B2B',
            'Advantage+ Shopping & Dynamic Product Retargeting',
            'High-retention vertical Reels commercial campaigns',
            'Custom Lookalike & Server-Side CAPI audiences'
          ],
      metrics: { ctr: '9.8%', roas: '4.9X', conversion: '+260%' }
    },
    {
      id: 'tiktok',
      name: isRtl ? 'إعلانات تيك توك (TikTok Ads)' : 'TikTok For Business Ads',
      badge: isRtl ? 'انتشار فيروسي + مبيعات سريعة' : 'Viral Reach + Fast Sales',
      color: 'from-pink-600 to-rose-600',
      border: 'border-pink-500/40',
      icon: '🎬',
      desc: isRtl
        ? 'استغلال القوة الضاربة للفيديوهات القصيرة على تيك توك لتحقيق ملايين المشاهدات وتحويلها إلى طلبات شراء حقيقية للمتاجر والبراندات.'
        : 'Harnessing short-form viral video momentum on TikTok to drive massive brand awareness and instant store checkouts.',
      adTypes: isRtl
        ? [
            'إعلانات In-Feed و Spark Ads لتعزيز المحتوى الأصلي للبراند',
            'حملات TikTok Shop ومبيعات صفحات الهبوط السريعة',
            'هندسة أول 3 ثوانٍ (3-Second Hook) لخفض تكلفة الألف ظهور CPM',
            'ربط TikTok Pixel وتتبع أحداث الإضافة للسلة والشراء بدقة'
          ]
        : [
            'Native In-Feed & Spark Ads amplification',
            'High-velocity landing page conversion funnels',
            '3-Second viral hook retention engineering',
            'Full TikTok Pixel & Events API integration'
          ],
      metrics: { ctr: '11.6%', roas: '5.1X', conversion: '+310%' }
    },
    {
      id: 'b2b',
      name: isRtl ? 'إعلانات لينكدإن وإكس (LinkedIn & X Ads)' : 'LinkedIn & X (Twitter) Ads',
      badge: isRtl ? 'شركات B2B + مستثمرين' : 'B2B Enterprise + Investors',
      color: 'from-slate-700 to-blue-800',
      border: 'border-slate-500/40',
      icon: '💼',
      desc: isRtl
        ? 'الوصول المباشر لأصحاب الشركات، المديرين التنفيذيين، والمستثمرين في مصر والخليج لعقد الصفقات الكبرى والتوريدات.'
        : 'Direct executive outreach targeting C-level decision-makers, procurement heads, and Gulf investors.',
      adTypes: isRtl
        ? [
            'الاستهداف بالمسمى الوظيفي وحجم الشركة والقطاع الصناعي على LinkedIn',
            'رسائل InMail الممولة المباشرة لصناع القرار',
            'حملات X (تويتر) لاكتساح الترند والتفاعل في السوق السعودي والخليجي',
            'حملات تحميل البروفايل التعريفي وعروض الأسعار للشركات'
          ]
        : [
            'Job-title, industry & company-size B2B targeting',
            'Sponsored InMail executive outreach',
            'X (Twitter) trend & keyword takeover for KSA/GCC',
            'Whitepaper & B2B RFQ lead capture'
          ],
      metrics: { ctr: '7.4%', roas: '5.8X', conversion: '+195%' }
    }
  ];

  const academicSteps = [
    {
      num: '01',
      title: isRtl ? 'التحليل الأكاديمي للسوق والمنافسين' : 'Market & Competitor Intelligence',
      desc: isRtl
        ? 'ندرس حجم الطلب، كلمات البحث الفعلية، نقاط ضعف إعلانات المنافسين، ونحدد الميزة التنافسية العرض البيعي (USP) قبل إنفاق جنيه واحد.'
        : 'Deep keyword volume research, competitor ad teardown, and unique value proposition structuring before spending a single dollar.'
    },
    {
      num: '02',
      title: isRtl ? 'هندسة التتبع والبيكسل (Tracking & CAPI)' : 'Precision Pixel & CAPI Telemetry',
      desc: isRtl
        ? 'ربط Google Tag Manager و Google Analytics 4 وبيكسل فيسبوك وتيك توك وسناب شات لتتبع كل مكالمة، رسالة واتساب، أو عملية شراء.'
        : 'Full GTM, GA4, Meta/TikTok/Snap Pixel, and Server-Side Conversion API wiring to track every call, chat, and checkout.'
    },
    {
      num: '03',
      title: isRtl ? 'بناء هيكل الحملات والإعلانات البيعية' : 'Campaign Architecture & Ad Copy',
      desc: isRtl
        ? 'تقسيم المجموعات الإعلانية بدقة (SKAGs / Themed Ad Groups) مع صياغة نصوص إعلانية وتصاميم وفيديوهات تجبر العميل على التفاعل الفوري.'
        : 'Granular ad group segmentation paired with direct-response copywriting and thumb-stopping visual creatives.'
    },
    {
      num: '04',
      title: isRtl ? 'درع الحماية من النقرات الوهمية وهدر الميزانية' : 'Click-Fraud Shield & Negative Lists',
      desc: isRtl
        ? 'تطبيق قوائم الكلمات السلبية الصارمة وفلاتر الـ IP لمنع المنافسين والنقرات غير المجدية من استنزاف رصيد الإعلانات.'
        : 'Aggressive negative keyword blacklists and IP exclusion filters protecting your budget from competitor click fraud.'
    },
    {
      num: '05',
      title: isRtl ? 'اختبارات A/B والتحسين اليومي للمزايدة' : 'Daily Bid Optimization & A/B Testing',
      desc: isRtl
        ? 'مراقبة يومية لسعر النقرة (CPC) وتكلفة العميل (CPA)، وإيقاف الإعلانات الأقل أداءً وضخ الميزانية في الإعلانات الرابحة.'
        : 'Continuous split-testing of hooks, landing pages, and bidding strategies to compress CPA and maximize CTR.'
    },
    {
      num: '06',
      title: isRtl ? 'التوسع ومضاعفة الأرباح (ROAS Scaling)' : 'Profitable ROAS Scaling & Reporting',
      desc: isRtl
        ? 'توسيع نطاق الحملات الناجحة أفقياًورأسياً مع تقديم تقارير أكاديمية شفافة توضح عدد المكالمات والمبيعات والعائد على كل جنيه.'
        : 'Horizontal and vertical campaign scaling backed by transparent executive dashboards tracking real revenue growth.'
    }
  ];

  const estimatedClicks = Math.round(monthlyBudget / 4.5);
  const estimatedLeads = Math.round(estimatedClicks * 0.16);
  const estimatedSales = Math.round(estimatedLeads * 0.35);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-max space-y-20">
        {/* Academic Hero Header */}
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/50 p-8 sm:p-12 shadow-2xl">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-black">
              <Award className="w-4 h-4" />
              <span>
                {isRtl
                  ? 'الأكاديمية والمنظومة الاحترافية لإدارة الحملات الإعلانية — عبد السلام'
                  : 'Enterprise Media Buying & Ad Campaigns Academy'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              {isRtl ? (
                <>
                  هندسة وإدارة الحملات الإعلانية على{' '}
                  <span className="bg-gradient-to-r from-amber-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    جميع المنصات العالمية وشات أدز
                  </span>
                </>
              ) : (
                <>
                  Scientific Media Buying Across{' '}
                  <span className="bg-gradient-to-r from-amber-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    All Ad Platforms & Chat Ads
                  </span>
                </>
              )}
            </h1>

            <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-3xl">
              {isRtl
                ? 'نحن لا نطلق مجرد إعلانات ممولة؛ بل نبني منظومات استحواذ رقمية مبنية على علم البيانات وهندسة التحويل (CRO). ندير حملات جوجل أدز، شات أدز (Click-to-Chat & Snapchat Ads)، ميتا، تيك توك، ولينكدإن لتحويل الميزانية الإعلانية إلى مكالمات فورية ومبيعات حقيقية موثقة بالأرقام.'
                : 'We engineer full-funnel acquisition systems powered by data science, search intent, and conversational Chat Ads across Google, Snapchat, Meta, TikTok, and LinkedIn.'}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://wa.me/201098174992?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%8A%D8%A7%20%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A5%D8%B7%D9%84%D8%A7%D9%82%20%D9%88%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9%20%D8%AD%D9%85%D9%84%D8%A9%20%D8%A5%D8%B9%D9%84%D8%A7%D9%86%D9%8A%D8%A9%20%D8%A7%D8%AD%D8%AA%D8%B1%D8%A7%D9%81%D9%8A%D8%A9"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25 hover:scale-105 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isRtl ? 'اطلب خطة حملتك الإعلانية الآن عبر واتساب' : 'Launch Your Ad Campaign on WhatsApp'}</span>
              </a>

              <button
                onClick={() => onNavigate && onNavigate('portfolio')}
                className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
              >
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span>{isRtl ? 'شاهد نتائج الحملات السابقة بالأرقام' : 'View Verified Campaign Case Studies'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* All Advertising Platforms Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              {isRtl ? 'المنصات الإعلانية التي نديرها باحترافية' : 'Advertising Platforms We Master'}
            </h2>
            <p className="text-slate-400 text-xs sm:text-base">
              {isRtl
                ? 'تغطية شاملة لكافة قنوات الإعلان الرقمي بما فيها إعلانات البحث والاتصال المباشر، شات أدز، وسناب شات، والسوشيال ميديا'
                : 'Complete omnichannel execution across Search, Chat Ads, Snapchat, Social, and Video networks'}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {platforms.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-2xl bg-slate-900/70 border ${p.border} p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{p.icon}</span>
                      <h3 className="text-xl sm:text-2xl font-black text-white">{p.name}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r ${p.color} text-white`}>
                      {p.badge}
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{p.desc}</p>

                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-amber-400">
                      {isRtl ? 'أنواع الحملات والتخصصات:' : 'Campaign Capabilities:'}
                    </div>
                    {p.adTypes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-sm sm:text-lg font-black text-cyan-400">{p.metrics.ctr}</div>
                    <div className="text-[11px] text-slate-400">{isRtl ? 'متوسط النقر CTR' : 'Avg CTR'}</div>
                  </div>
                  <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-sm sm:text-lg font-black text-amber-400">{p.metrics.roas}</div>
                    <div className="text-[11px] text-slate-400">{isRtl ? 'العائد ROAS' : 'Avg ROAS'}</div>
                  </div>
                  <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-sm sm:text-lg font-black text-emerald-400">{p.metrics.conversion}</div>
                    <div className="text-[11px] text-slate-400">{isRtl ? 'نمو المبيعات' : 'Lead Growth'}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 6-Step Scientific Methodology */}
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-wider">
              {isRtl ? 'المنهجية الأكاديمية المعتمدة' : 'SCIENTIFIC MEDIA BUYING'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              {isRtl ? 'كيف ندير حملتك الإعلانية بـ 6 خطوات هندسية؟' : 'Our 6-Step Campaign Engineering Process'}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {academicSteps.map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/40 transition-all space-y-3"
              >
                <div className="text-3xl font-black bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">
                  {step.num}
                </div>
                <h3 className="text-base sm:text-lg font-black text-white">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Campaign ROI Estimator */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-950 border border-cyan-500/30 p-8 sm:p-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
                {isRtl ? 'حاسبة النتائج التقديرية للحملات 📊' : 'Interactive Campaign ROI Estimator 📊'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {isRtl ? 'احسب النتائج المتوقعة لحملتك الإعلانية' : 'Estimate Your Monthly Campaign Performance'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isRtl
                  ? 'حرك المؤشر لتحديد ميزانيتك الإعلانية الشهرية التقريبية وشاهد متوسط النقرات والمكالمات/المحادثات البيعية المتوقعة بناءً على نتائج عملائنا الفعليين:'
                  : 'Adjust the slider to estimate monthly clicks, calls/chat leads, and conversions based on our historical client benchmarks:'}
              </p>

              <div className="pt-2 space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-300">{isRtl ? 'الميزانية الشهرية:' : 'Monthly Ad Spend:'}</span>
                  <span className="text-amber-400 text-lg font-black">{monthlyBudget.toLocaleString()} EGP</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="2500"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800">
                <div className="text-xl sm:text-3xl font-black text-cyan-400">+{estimatedClicks.toLocaleString()}</div>
                <div className="text-xs text-slate-400 mt-1">{isRtl ? 'زيارة ونقرة مستهدفة' : 'Targeted Clicks'}</div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950/90 border border-amber-500/30">
                <div className="text-xl sm:text-3xl font-black text-amber-400">+{estimatedLeads.toLocaleString()}</div>
                <div className="text-xs text-slate-400 mt-1">{isRtl ? 'مكالمة ومحادثة شات' : 'Calls & Chat Leads'}</div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950/90 border border-emerald-500/30">
                <div className="text-xl sm:text-3xl font-black text-emerald-400">+{estimatedSales.toLocaleString()}</div>
                <div className="text-xs text-slate-400 mt-1">{isRtl ? 'عميل فعلي ومبيعات' : 'Closed Deals'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
