import React, { useState } from 'react';
import {
  Globe,
  ShoppingCart,
  GraduationCap,
  Layers,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Search,
  CreditCard,
  Truck,
  PlayCircle,
  Award,
  Code2,
  ArrowUpLeft,
  Sparkles,
  Server,
  Lock
} from 'lucide-react';

const WEB_SOLUTIONS = [
  {
    id: 'corporate-landing',
    title: 'المواقع التعريفية وصفحات الهبوط البيعية (Corporate & Landing Pages)',
    subtitle: 'واجهة رقمية احترافية فائقة السرعة ومصممة لاقتناص العملاء',
    icon: Globe,
    badge: 'تحويل عالي (CRO)',
    accent: 'from-cyan-500 to-blue-600',
    description:
      'نصمم ونبرمج المواقع التعريفية للشركات والمؤسسات ومقدمي الخدمات (أوناش إنقاذ، شركات مقاولات، عيادات، مكاتب استشارية) وصفحات الهبوط المخصصة للحملات الإعلانية بأعلى سرعة تحميل وتوافق مع السيو.',
    features: [
      'سرعة تحميل فائقة أقل من 1.5 ثانية لتقليل معدل ارتداد الزوار من الإعلانات',
      'أزرار اتصال مباشر وواتساب عائم مربوطة بتتبع التحويلات (Conversion Tracking)',
      'هيكل برمجي متوافق 100% مع محركات البحث (Technical SEO & Schema Markup)',
      'تصميم عصري متجاوب تماماً مع الموبايل والتابلت واللابتوب والشاشات الكبيرة',
      'شهادات أمان SSL مجانية وحماية ضد هجمات الحجب (DDoS Protection)'
    ],
    deliverables: ['واجهة عربية/إنجليزية', 'ربط Google Analytics & Tag Manager', 'لوحة تحكم سهلة', 'استضافة سحابية سريعة'],
    idealFor: 'الشركات الخدمية، المكاتب الهندسية، العيادات، وحملات جوجل وسوشيال ميديا'
  },
  {
    id: 'ecommerce-stores',
    title: 'المتاجر الإلكترونية المتكاملة (Full E-Commerce Stores)',
    subtitle: 'منظومة بيع إلكتروني شاملة مع بوابات الدفع وشركات الشحن',
    icon: ShoppingCart,
    badge: 'بيع أوتوماتيكي 24/7',
    accent: 'from-emerald-500 to-teal-600',
    description:
      'بناء متاجر إلكترونية احترافية عالية الأمان تتيح لك عرض آلاف المنتجات وإدارة المخزون والطلبات، مع ربط كامل ببوابات الدفع الإلكتروني وشركات الشحن المحلية والدولية.',
    features: [
      'ربط بوابات الدفع الإلكتروني (Visa, MasterCard, فوري، فودافون كاش، InstaPay، مدى، Apple Pay)',
      'ربط أوتوماتيكي مع شركات الشحن (Bosta, Aramex, Mylerz, DHL) وحساب تكلفة الشحن حسب المحافظة',
      'نظام سلة تسوق ذكية واستعادة السلات المتروكة عبر واتساب والبريد الإلكتروني',
      'كوبونات خصم، عروض الخاطفة (Flash Sales)، ونظام نقاط الولاء للعملاء',
      'ربط كامل مع كتالوج فيسبوك وتيك توك وجوجل شوبينج (Dynamic Product Ads)'
    ],
    deliverables: ['لوحة إدارة المنتجات والمخزون', 'تطبيق ويب للموبايل (PWA)', 'تقارير مبيعات وأرباح تفصيلية', 'فواتير ضريبية إلكترونية'],
    idealFor: 'البراندات التجارية، محلات الملابس والإلكترونيات، تجار الجملة والتجزئة'
  },
  {
    id: 'educational-lms',
    title: 'المنصات التعليمية والأكاديميات (Educational Platforms & LMS)',
    subtitle: 'أكاديميات رقمية متكاملة للمحاضرين والمراكز التدريبية والمدارس',
    icon: GraduationCap,
    badge: 'حماية المحتوى والفيديوهات',
    accent: 'from-purple-500 to-indigo-600',
    description:
      'تطوير منصات تعليمية تفاعلية (Learning Management Systems) تُمكّن المحاضرين والمدربين والمؤسسات التعليمية من بيع الكورسات أونلاين، إدارة الطلاب، وإجراء الاختبارات وإصدار الشهادات.',
    features: [
      'حماية قصوى للفيديوهات ضد التحميل أو تصوير الشاشة مع علامة مائية متحركة برقم الطالب (DRM & Watermark)',
      'نظام بنوك أسئلة واختبارات إلكترونية بتصحيح تلقائي وتحديد مستوى الطالب',
      'إصدار شهادات إتمام معتمدة تلقائياً بصيغة PDF مع كود تحقق (QR Code Verification)',
      'طرق دفع متعددة للاشتراك في الكورسات (أكواد تفعيل فورية، فودافون كاش، فوري، بطاقات بنكية)',
      'غرف بث مباشر تفاعلية (Live Classes) ومنتديات نقاش بين الطلاب والمحاضر'
    ],
    deliverables: ['بوابة الطالب وبوابة المحاضر', 'نظام توليد أكواد وشحن المحفظة', 'تتبع نسبة مشاهدة الفيديوهات', 'تقارير حضور ودرجات أولياء الأمور'],
    idealFor: 'المدرسين، المحاضرين الجامعيين، مراكز التدريب المعتمدة، والأكاديميات المهنية'
  },
  {
    id: 'custom-portals',
    title: 'المواقع المتكاملة وبوابات الأعمال (Enterprise Web Portals & Custom SaaS)',
    subtitle: 'أنظمة ويب مخصصة وقواعد بيانات سحابية لإدارة أعمالك من أي مكان',
    icon: Layers,
    badge: 'برمجة خاصة (Custom)',
    accent: 'from-amber-500 to-orange-600',
    description:
      'تطوير مواقع وبوابات إلكترونية متكاملة متعددة الصلاحيات (Multi-Vendor / SaaS / CRM / Booking Portals) مصممة خصيصاً لتلبية دورة العمل الفريدة لمؤسستك بأعلى معايير الأمان وقابلية التوسع.',
    features: [
      'بنية برمجية حديثة (React, Next.js, Node.js, Cloud Databases) تتحمل آلاف المستخدمين المتزامنين',
      'أنظمة حجز مواعيد ذكية للعيادات والمستشفيات والشركات الخدمية مع تنبيهات واتساب تلقائية',
      'تعدد الصلاحيات (إدارة عليا، مشرفين، موظفي مبيعات، عملاء) مع سجل حركات كامل (Audit Log)',
      'واجهات برمجية (RESTful APIs) للربط مع تطبيقات الموبايل وأنظمة المحاسبة والـ ERP',
      'نسخ احتياطي سحابي يومي وتشفير كامل لبيانات العملاء والمؤسسة'
    ],
    deliverables: ['تحليل نظم كامل (System Analysis)', 'لوحات تحكم تحليلية (Dashboards)', 'ربط API خارجي', 'دعم فني وتطوير مستمر'],
    idealFor: 'الشركات الكبرى، المنصات الخدمية التشاركية، المستشفيات، وشركات العقارات'
  }
];

const DEVICE_MODES = [
  {
    id: 'mobile',
    name: 'موبايل (Smartphone)',
    dimensions: '390 × 844 px',
    widthClass: 'max-w-[360px]',
    icon: Smartphone,
    share: '78% من زوار الإعلانات',
    highlights: [
      'قوائم سفلية وأزرار اتصال سريعة سهلة الوصول بإبهام اليد الواحدة',
      'ضغط ذكي للصور والخطوط لفتح الموقع فوراً حتى على شبكات 4G الضعيفة',
      'عدم وجود أي انزياح أفقي (Zero Horizontal Overflow) على جميع شاشات أندرويد وآيفون'
    ]
  },
  {
    id: 'tablet',
    name: 'تابلت وآيباد (Tablet)',
    dimensions: '820 × 1180 px',
    widthClass: 'max-w-[640px]',
    icon: Tablet,
    share: '8% من الزوار',
    highlights: [
      'شبكة عرض مرنة (2-Column Fluid Grid) تستغل المساحة المتوسطة بأناقة',
      'دعم كامل للوضع الرأسي والأفقي (Portrait & Landscape Orientation)',
      'تجربة تصفح مثالية للكتالوجات والمنصات التعليمية وقراءة المحتوى'
    ]
  },
  {
    id: 'laptop',
    name: 'لابتوب (Laptop)',
    dimensions: '1366 × 768 px',
    widthClass: 'max-w-[900px]',
    icon: Laptop,
    share: '10% من الزوار',
    highlights: [
      'عرض بانورامي متوازن يجمع بين القوائم العلوية والتفاصيل التفاعلية',
      'تأثيرات حركية سلسة (Micro-interactions) عند تمرير الماوس',
      'لوحات تحكم وجداول بيانات واضحة وسهلة الاستخدام'
    ]
  },
  {
    id: 'desktop',
    name: 'كمبيوتر مكتبي (Desktop PC)',
    dimensions: '1920 × 1080 px (Full HD+)',
    widthClass: 'max-w-full',
    icon: Monitor,
    share: '4% من الزوار والشركات',
    highlights: [
      'استغلال كامل للشاشات العريضة (Ultra-Wide & 4K Ready) مع حاويات متزنة',
      'عرض متعدد الأعمدة (3-4 Columns) للمتاجر الكبرى والمنصات الإدارية',
      'أعلى دقة بصرية للصور والفيديوهات والرسوم البيانية'
    ]
  }
];

const WebPlatformsPage = ({ onNavigate }) => {
  const [selectedDevice, setSelectedDevice] = useState('mobile');
  const [previewType, setPreviewType] = useState('ecommerce');

  const activeDevice = DEVICE_MODES.find((d) => d.id === selectedDevice) || DEVICE_MODES[0];

  return (
    <div className="min-h-screen pt-28 pb-24 relative z-10">
      {/* Page Hero */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="glass rounded-3xl p-8 md:p-12 border border-cyan-500/20 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-bold mb-6">
              <Code2 size={16} className="text-cyan-400" />
              <span>هندسة وتطوير المواقع المتكاملة والمتاجر والمنصات التعليمية</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              نبني مواقع إلكترونية{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                متوافقة 100% مع جميع الأجهزة
              </span>{' '}
              من المواقع التعريفية إلى المتاجر والمنصات التعليمية
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              الموقع الإلكتروني هو مقر شركتك الرقمي الذي يستقبل عملاء الحملات الإعلانية على مدار الساعة. لذلك نعتمد في{' '}
              <strong className="text-white">AM Marketing</strong> على أحدث تقنيات البرمجة السحابية وتصميم تجربة المستخدم (UI/UX) لضمان عمل موقعك بكفاءة وسرعة فائقة على{' '}
              <span className="text-cyan-300 font-bold">الموبايل، التابلت، اللابتوب، والكمبيوتر المكتبي</span> دون أي أخطاء في العرض.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-cyan-400 mb-1">100%</div>
                <div className="text-xs text-slate-400">توافق موبايل وتابلت وكمبيوتر</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-emerald-400 mb-1">&lt; 1.5s</div>
                <div className="text-xs text-slate-400">سرعة فتح الصفحات</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-purple-400 mb-1">SEO Ready</div>
                <div className="text-xs text-slate-400">تهيئة كاملة لمحركات البحث</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-amber-400 mb-1">SSL + DRM</div>
                <div className="text-xs text-slate-400">أمان وحماية قصوى للبيانات</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Main Web Solutions Breakdown */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-cyan-400 font-bold text-sm tracking-wider uppercase block mb-2">
            حلول الويب الشاملة
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
            جميع أنواع المواقع والمنصات بأعلى المعايير الهندسية
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            سواء كنت تحتاج موقعاً تعريفياً سريعاً لحملاتك الإعلانية، أو متجراً إلكترونياً متكاملاً، أو منصة تعليمية محمية، نوفر لك الحل البرمجي المتكامل.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {WEB_SOLUTIONS.map((sol) => {
            const IconComp = sol.icon;
            return (
              <div
                key={sol.id}
                className="glass rounded-3xl p-6 sm:p-8 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sol.accent} flex items-center justify-center text-white shadow-lg shrink-0`}>
                      <IconComp size={28} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-cyan-300 border border-cyan-500/20">
                      {sol.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-cyan-400/90 text-xs sm:text-sm font-semibold mb-4">
                    {sol.subtitle}
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {sol.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      المميزات والخصائص التقنية:
                    </h4>
                    {sol.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {sol.deliverables.map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/70 text-slate-300 text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 rounded-2xl p-3.5 border border-slate-800">
                    <p className="text-xs text-slate-400">
                      <strong className="text-white">مناسب لـ:</strong> {sol.idealFor}
                    </p>
                    <a
                      href={`https://wa.me/201098174992?text=${encodeURIComponent(`مرحباً أستاذ عبد السلام، أرغب في الاستفسار عن تصميم وتطوير: ${sol.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold hover:opacity-95 transition shrink-0"
                    >
                      <span>اطلب عرض سعر</span>
                      <ArrowUpLeft size={14} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Multi-Device Compatibility Simulator */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="glass rounded-3xl p-6 sm:p-10 border border-blue-500/20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold mb-3">
              <Sparkles size={14} />
              <span>محاكي التوافق مع جميع الشاشات (Responsive Design Lab)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              اختبر بنفسك كيف تتكيف مواقعنا مع كل جهاز
            </h2>
            <p className="text-slate-400 text-sm">
              اضغط على نوع الجهاز ونوع المشروع لترى كيف نضبط أبعاد العناصر والخطوط والقوائم لتعمل بسلاسة على الموبايل، التابلت، اللابتوب، والكمبيوتر المكتبي.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {DEVICE_MODES.map((dev) => {
                const DevIcon = dev.icon;
                const isSelected = selectedDevice === dev.id;
                return (
                  <button
                    key={dev.id}
                    type="button"
                    onClick={() => setSelectedDevice(dev.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
                    }`}
                  >
                    <DevIcon size={16} />
                    <span>{dev.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">نموذج المعاينة:</span>
              {[
                { id: 'ecommerce', label: 'متجر إلكتروني' },
                { id: 'lms', label: 'منصة تعليمية' },
                { id: 'corporate', label: 'موقع شركة خدمية' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setPreviewType(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    previewType === t.id
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Device Info Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
              <div className="text-xs text-slate-400 mb-1">الجهاز النشط حالياً</div>
              <div className="text-lg font-black text-white flex items-center justify-between">
                <span>{activeDevice.name}</span>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {activeDevice.dimensions}
                </span>
              </div>
              <div className="mt-2 text-xs text-emerald-400 font-semibold">
                يمثل حوالي {activeDevice.share}
              </div>
            </div>

            <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
              <div className="text-xs text-slate-400 mb-2 font-bold">معايير الهندسة المتجاوبة المطبقة على هذا الجهاز:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeDevice.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Simulated Viewport Frame */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-4 sm:p-8 flex justify-center overflow-hidden">
            <div
              className={`w-full ${activeDevice.widthClass} transition-all duration-500 bg-slate-900 border-2 border-slate-700 rounded-2xl overflow-hidden shadow-2xl`}
            >
              {/* Browser Top Bar */}
              <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="bg-slate-900 px-3 py-1 rounded-md text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                  <Lock size={10} className="text-emerald-400" />
                  <span>
                    {previewType === 'ecommerce'
                      ? 'https://store-demo.am-marketing.eg'
                      : previewType === 'lms'
                      ? 'https://academy-demo.am-marketing.eg'
                      : 'https://corporate-demo.am-marketing.eg'}
                  </span>
                </div>
                <div className="text-[11px] text-cyan-400 font-bold">{activeDevice.id.toUpperCase()}</div>
              </div>

              {/* Simulated Website Content Inside Viewport */}
              <div className="p-4 sm:p-6 space-y-5">
                {/* Simulated Header */}
                <div className="flex items-center justify-between bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <div className="font-black text-white text-sm flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block" />
                    <span>
                      {previewType === 'ecommerce'
                        ? 'متجر النخبة الإلكتروني'
                        : previewType === 'lms'
                        ? 'أكاديمية المستقبل التعليمية'
                        : 'المؤسسة الدولية للخدمات'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedDevice !== 'mobile' && (
                      <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400">
                        <span>الرئيسية</span>
                        <span>الأقسام</span>
                        <span>العروض</span>
                        <span>تواصل معنا</span>
                      </div>
                    )}
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs">
                      {previewType === 'ecommerce' ? 'سلة التسوق (3)' : previewType === 'lms' ? 'حساب الطالب' : 'اتصل الآن'}
                    </span>
                  </div>
                </div>

                {/* Simulated Banner */}
                <div className="rounded-2xl p-5 bg-gradient-to-r from-cyan-900/50 via-blue-900/40 to-purple-900/50 border border-cyan-500/30">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">
                    {previewType === 'ecommerce'
                      ? 'خصم 30% + شحن سريع لجميع المحافظات'
                      : previewType === 'lms'
                      ? 'بث مباشر + فيديوهات محمية + شهادات معتمدة'
                      : 'استجابة فورية خلال 15 دقيقة في جميع المحافظات'}
                  </span>
                  <h4 className="text-base sm:text-xl font-black text-white mt-2 mb-1">
                    {previewType === 'ecommerce'
                      ? 'تسوق أحدث المنتجات الأصلية مع الدفع عند الاستلام أو أونلاين'
                      : previewType === 'lms'
                      ? 'ابدأ رحلتك التعليمية مع نخبة المحاضرين واختبارات التقييم الذكية'
                      : 'واجهة رقمية احترافية تحول زوار إعلانات جوجل والسوشيال إلى عملاء فعليين'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    تصميم متجاوب بالكامل مع شاشة {activeDevice.name} بدون أي تقطيع أو خروج عن الإطار.
                  </p>
                </div>

                {/* Simulated Dynamic Grid based on Device */}
                <div
                  className={`grid gap-3 ${
                    selectedDevice === 'mobile'
                      ? 'grid-cols-1'
                      : selectedDevice === 'tablet'
                      ? 'grid-cols-2'
                      : 'grid-cols-3'
                  }`}
                >
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5">
                      <div className="h-20 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 mb-3 flex items-center justify-center text-cyan-400">
                        {previewType === 'ecommerce' ? (
                          <ShoppingCart size={24} />
                        ) : previewType === 'lms' ? (
                          <PlayCircle size={24} />
                        ) : (
                          <ShieldCheck size={24} />
                        )}
                      </div>
                      <div className="font-bold text-white text-xs mb-1">
                        {previewType === 'ecommerce'
                          ? `منتج مميز رقم #${item} - متوفر بالمخزون`
                          : previewType === 'lms'
                          ? `المحاضرة التدريبية #${item} + اختبار تفاعلي`
                          : `خدمة احترافية متكاملة #${item}`}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
                        <span className="text-emerald-400 font-bold">
                          {previewType === 'ecommerce' ? '1,250 ج.م' : previewType === 'lms' ? '12 درس فيديو' : 'متاح 24/7'}
                        </span>
                        <span className="text-cyan-300 font-semibold">
                          {previewType === 'ecommerce' ? '+ أضف للسلة' : previewType === 'lms' ? 'مشاهدة الآن' : 'اطلب الخدمة'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Comparison: E-Commerce & LMS Ecosystems */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* E-Commerce Stack */}
          <div className="glass rounded-3xl p-6 sm:p-8 border border-emerald-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CreditCard size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">منظومة المتاجر الإلكترونية والربط المالي</h3>
                <p className="text-xs text-slate-400">كل ما يحتاجه التاجر لإدارة المبيعات والشحن والتحصيل</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
                <div className="text-emerald-400 font-bold text-sm mb-1 flex items-center gap-2">
                  <CreditCard size={16} /> بوابات الدفع الإلكتروني
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  تفعيل الدفع بالفيزا والماستركارد، محفظة فودافون كاش، إنستا باي، فوري، والدفع عند الاستلام (COD).
                </p>
              </div>
              <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
                <div className="text-cyan-400 font-bold text-sm mb-1 flex items-center gap-2">
                  <Truck size={16} /> الربط مع شركات الشحن
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  إصدار بوليصات الشحن تلقائياً وتتبع حالة الطلب لحظة بلحظة من المخزن حتى باب العميل.
                </p>
              </div>
              <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
                <div className="text-purple-400 font-bold text-sm mb-1 flex items-center gap-2">
                  <Search size={16} /> ربط بيكسل وكتالوج الإعلانات
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  مزامنة المنتجات والأسعار تلقائياً مع Meta Pixel و TikTok Pixel و Google Merchant Center.
                </p>
              </div>
              <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
                <div className="text-amber-400 font-bold text-sm mb-1 flex items-center gap-2">
                  <Server size={16} /> إدارة المخزون والفروع
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  تنبيهات بنواقص المخزون، تقارير المنتجات الأكثر مبيعاً، وإمكانية الربط مع نظام الكاشير.
                </p>
              </div>
            </div>
          </div>

          {/* LMS Educational Stack */}
          <div className="glass rounded-3xl p-6 sm:p-8 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">منظومة المنصات التعليمية والأكاديميات</h3>
                <p className="text-xs text-slate-400">حماية المحتوى التعليمي وإدارة الطلاب والاختبارات</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
                <div className="text-purple-400 font-bold text-sm mb-1 flex items-center gap-2">
                  <ShieldCheck size={16} /> تشفير وحماية الفيديوهات
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  منع التحميل غير الشرعي مع إظهار رقم هاتف وكود الطالب كعلامة مائية متحركة فوق الفيديو.
                </p>
              </div>
              <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
                <div className="text-cyan-400 font-bold text-sm mb-1 flex items-center gap-2">
                  <Award size={16} /> الاختبارات والشهادات الذكية
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  امتحانات محددة بوقت، اشتراط النجاح لفتح المحاضرة التالية، وشهادات PDF معتمدة.
                </p>
              </div>
              <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
                <div className="text-emerald-400 font-bold text-sm mb-1 flex items-center gap-2">
                  <Zap size={16} /> أكواد الشحن والتفعيل الفوري
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  توليد آلاف أكواد التفعيل (Scratch Cards) لبيع الكورسات في السناتر أو عبر فودافون كاش.
                </p>
              </div>
              <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
                <div className="text-amber-400 font-bold text-sm mb-1 flex items-center gap-2">
                  <Smartphone size={16} /> متابعة الطلاب وأولياء الأمور
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  تقارير تفصيلية بعدد مرات مشاهدة الحصة ودرجات الواجبات والاختبارات لكل طالب.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-cyan-950/90 via-slate-900 to-purple-950/90 border border-cyan-500/30 text-center">
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
            هل أنت جاهز لإنشاء موقعك أو متجرك أو منصتك التعليمية؟
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            تواصل معنا الآن للحصول على استشارة تقنية مجانية وخطة تنفيذ كاملة لمشروعك متوافقة مع جميع الأجهزة ومربوطة بحملاتك الإعلانية.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/201098174992?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A3%D8%B3%D8%AA%D8%A7%D8%B0%20%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D9%88%D8%AA%D8%B7%D9%88%D9%8A%D8%B1%20%D9%85%D9%88%D9%82%D8%B9%20%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%20%D9%85%D8%AA%D9%83%D8%A7%D9%85%D9%84"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-sm hover:opacity-95 transition shadow-lg shadow-cyan-500/25"
            >
              تواصل عبر واتساب: 01098174992
            </a>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                className="px-7 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition"
              >
                تصفح سابقة أعمال المواقع والأنظمة
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebPlatformsPage;
