import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe2,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Building2,
  Wrench,
  Stethoscope,
  ShoppingBag
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function MarketsShowcase({ lang = 'ar', onNavigate }) {
  const isRtl = lang === 'ar';
  const [activeMarket, setActiveMarket] = useState('all');

  const markets = [
    {
      id: 'ksa',
      country: 'المملكة العربية السعودية',
      countryEn: 'Saudi Arabia',
      flag: '🇸🇦',
      spend: '+180,000 ريال سعودي',
      spendEn: '+180,000 SAR Ad Spend',
      description: 'حملات استقطاب كبرى المؤسسات، إعلانات السناب شات ومحرك بحث جوجل وميتا للشركات والمراكز التجارية بالرياض وجدة والدمام.',
      campaigns: [
        {
          title: 'حملة شركة المجال الآمن',
          category: 'سلامة ومقاولات ومؤسسات كبرى',
          metrics: 'استقطاب عقود سنوية وكبرى الشركات • ROAS 14.2x',
          image: '/assets/images/almajal_hero.webp',
          featured: true,
          tag: 'الأكثر تأثيراً بالسعودية 🇸🇦'
        },
        {
          title: 'حملة راوند السعودية (Round KSA)',
          category: 'تجارة تجزئة ومطاعم وكافيهات',
          metrics: 'زيادة المبيعات المباشرة وخفض تكلفة الشراء • ROAS 8.5x',
          image: '/assets/images/campaign_round_ksa_1.jpg',
          featured: false,
          tag: 'مبيعات مباشرة'
        }
      ]
    },
    {
      id: 'eg',
      country: 'جمهورية مصر العربية',
      countryEn: 'Egypt',
      flag: '🇪🇬',
      spend: '+830,000 جنيه مصري',
      spendEn: '+830,000 EGP Ad Spend',
      description: 'حملات فيروسية مليونية وحملات متخصصة لأوناش الإنقاذ، شركات الصيانة المنزلية، والعيادات الطبية التي تصدرت نتائج جوجل وفيسبوك.',
      campaigns: [
        {
          title: 'حملة سبيرو سباتس (Spiro Spathis)',
          category: 'حملة فيروسية وانتشار مليوني',
          metrics: '+3.2 مليون وصول حقيقي • تفاعل كاسح ومبيعات غير مسبوقة',
          image: '/assets/images/campaign_spiro_spathis_clean.png',
          featured: true,
          tag: 'حملة فيروسية تاريخية 🇪🇬'
        },
        {
          title: 'حملات أوناش الإنقاذ السريعة (ونش السعيد والمستشار)',
          category: 'خدمات طوارئ وإعلانات بحث جوجل والاتصال المباشر',
          metrics: 'تصدر المركز الأول بجوجل بأقل سعر نقرة • معدل تحويل 42%',
          image: '/assets/images/winch_elsaeed_real.png',
          featured: false,
          tag: 'Call Ads & Search'
        },
        {
          title: 'حملة مدير الصيانة المعتمد',
          category: 'صيانة منزلية وأجهزة كهرومنزيلية',
          metrics: 'مئات طلبات الصيانة يومياً عبر واتساب وسناب شات وميتا',
          image: '/assets/images/modir_syana_preview.webp',
          featured: false,
          tag: 'خدمات منزلية'
        }
      ]
    },
    {
      id: 'uae',
      country: 'دولة الإمارات العربية المتحدة',
      countryEn: 'United Arab Emirates',
      flag: '🇦🇪',
      spend: '+350,000 درهم إماراتي',
      spendEn: '+350,000 AED Ad Spend',
      description: 'استهداف النخب ورجال الأعمال في دبي وأبوظبي، حملات العيادات التجميلية المتطورة والعقارات والاستشارات الاستثمارية.',
      campaigns: [
        {
          title: 'حملة عيادات ومراكز خلود الطبية',
          category: 'عيادات تخصصية وتجميل وأسنان',
          metrics: 'حجوزات يومية مؤكدة لكبار العملاء بدبي • ROAS 11.8x',
          image: '/assets/images/campaign_kulud_1.png',
          featured: true,
          tag: 'طبي وتجميلي فاخر 🇦🇪'
        },
        {
          title: 'حملة عقارات ميراج هيلز الفاخرة (Mirage Hills)',
          category: 'عقارات فاخرة واستثمار دولي',
          metrics: 'استقطاب مستثمرين دوليين وحجوزات فيلات فاخرة',
          image: '/assets/images/campaign_mirage_hills_1.png',
          featured: false,
          tag: 'عقارات فاخرة'
        }
      ]
    }
  ];

  const displayedMarkets = activeMarket === 'all'
    ? markets
    : markets.filter((m) => m.id === activeMarket);

  return (
    <section id="markets-wall" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Background radial accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-amber-500/15 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-black mb-4 shadow-lg shadow-cyan-500/10"
        >
          <Globe2 size={16} className="text-cyan-400" />
          <span>{isRtl ? 'جدار الأسواق الثلاثة • خبرة إقليمية حقيقية' : 'The 3 Regional Markets • Proven Presence'}</span>
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
              حملات وقصص نجاح عبر{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                3 دول عربية كبرى
              </span>
            </>
          ) : (
            <>
              Proven Campaigns Across{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                3 Major Arab Markets
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
            ? 'لا ندير إعلانات عشوائية.. بل نفهم بدقة سلوك المستهلك وقوة الشراء في كل سوق: من متطلبات البيزنس في الرياض وجدة، إلى النخب في دبي وأبوظبي، وحتى المنافسة الحامية في القاهرة والمحافظات.'
            : 'We understand consumer behavior, purchasing power, and platform nuances in each key market: KSA, Egypt, and the UAE.'}
        </motion.p>

        {/* Market Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setActiveMarket('all')}
            className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition cursor-pointer border ${
              activeMarket === 'all'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/25'
                : 'glass text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            {isRtl ? '🌐 جميع الأسواق' : '🌐 All Markets'}
          </button>
          {markets.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMarket(m.id)}
              className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition cursor-pointer border flex items-center gap-2 ${
                activeMarket === m.id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/25'
                  : 'glass text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <span>{m.flag}</span>
              <span>{isRtl ? m.country : m.countryEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Markets Columns */}
      <div className="space-y-12">
        {displayedMarkets.map((m) => (
          <div
            key={m.id}
            className="glass rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800/90 hover:border-amber-500/40 transition-all shadow-2xl relative overflow-hidden"
          >
            {/* Top Market Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl">{m.flag}</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {isRtl ? m.country : m.countryEn}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
                    {m.description}
                  </p>
                </div>
              </div>

              {/* Spend Badge */}
              <div className="px-5 py-2.5 rounded-2xl bg-amber-500/15 border border-amber-400/40 text-amber-300 font-black text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-amber-500/10">
                <TrendingUp size={18} className="text-amber-400" />
                <span>{isRtl ? m.spend : m.spendEn}</span>
              </div>
            </div>

            {/* Campaign Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {m.campaigns.map((camp, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden bg-slate-900/80 border border-slate-800 hover:border-cyan-400/50 transition-all group flex flex-col justify-between"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img
                      src={getAssetUrl(camp.image)}
                      alt={camp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-black bg-slate-950/80 text-amber-300 border border-amber-400/40 backdrop-blur-xs">
                      {camp.tag}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-cyan-400 mb-1">
                        {camp.category}
                      </div>
                      <h4 className="text-base sm:text-lg font-black text-white mb-2 group-hover:text-amber-300 transition">
                        {camp.title}
                      </h4>
                      <div className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed mb-4">
                        <CheckCircle2 size={14} className="text-amber-400 shrink-0 mt-0.5" />
                        <span>{camp.metrics}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onNavigate('portfolio')}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer border border-slate-700 hover:border-amber-400"
                    >
                      <span>{isRtl ? 'تفاصيل دراسة الحالة' : 'View Case Study'}</span>
                      <ExternalLink size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
