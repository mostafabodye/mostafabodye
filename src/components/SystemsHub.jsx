import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Monitor, Smartphone, CheckCircle, ExternalLink,
  ShoppingCart, Utensils, Stethoscope, Dumbbell, Building2,
  Store, Shirt, Laptop, Printer, Plus, Minus, Trash2, X,
  Search, ShieldCheck, ArrowRight, ArrowLeft, RefreshCw, Eye,
  Play, Wrench, Flame, HelpCircle
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function SystemsHub({ lang = 'ar' }) {
  const isRtl = lang === 'ar';

  // Industry Defaults mapping (solves "مطعم السلطان في كل مكان"!)
  const industryDefaults = {
    restaurant: isRtl ? 'مطعم وكافيه كازابلانكا' : 'Casablanca Restaurant & Cafe',
    market: isRtl ? 'سوبر ماركت النور ماركت' : 'Al-Noor Supermarket & Retail',
    clinic: isRtl ? 'عيادات رويال كير التخصصية' : 'Royal Care Medical Clinics',
    mobile: isRtl ? 'تكنو فون ستور للأجهزة' : 'TechnoPhone Electronics Store',
    fashion: isRtl ? 'إليجانس فاشون بوتيك' : 'Elegance Fashion Boutique',
    gym: isRtl ? 'أبطال اللياقة جيم & فيتنس' : 'Heroes Fitness & Gym Club',
    realestate: isRtl ? 'شركة الأفق للتطوير العقاري' : 'Al-Ofok Real Estate Developments',
    company: isRtl ? 'المجموعة الهندسية للصناعة والتشغيل' : 'Engineering Enterprise & Industry',
    maintenance: isRtl ? 'مركز مدير الصيانة المعتمد' : 'Modir Al-Syana Appliance Hub'
  };

  const [activeIndustry, setActiveIndustry] = useState('restaurant');
  const [businessName, setBusinessName] = useState(industryDefaults.restaurant);
  const [isCustomName, setIsCustomName] = useState(false);

  // Active Modals: 'pos' | 'restaurant' | 'clinic' | 'receipt' | 'video' | 'website_preview'
  const [activeModal, setActiveModal] = useState(null);
  const [previewSite, setPreviewSite] = useState(null);
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'mobile'

  // POS Simulator State
  const [cart, setCart] = useState([
    { id: 1, name: isRtl ? 'قهوة كلاسيك' : 'Classic Coffee', price: 45, qty: 2 },
    { id: 2, name: isRtl ? 'برجر سوبريم' : 'Supreme Burger', price: 120, qty: 1 }
  ]);
  const [receiptData, setReceiptData] = useState(null);

  // Restaurant Simulator State
  const [tables, setTables] = useState([
    { id: 1, name: isRtl ? 'طاولة 1 (صالة)' : 'Table 1 (Indoor)', status: 'busy', order: isRtl ? '2 قهوة + برجر' : '2 Coffee + Burger', total: 210 },
    { id: 2, name: isRtl ? 'طاولة 2 (صالة)' : 'Table 2 (Indoor)', status: 'free', order: null, total: 0 },
    { id: 3, name: isRtl ? 'طاولة 3 (تراس)' : 'Table 3 (Terrace)', status: 'busy', order: isRtl ? 'بيتزا فاميلي' : 'Family Pizza', total: 180 },
    { id: 4, name: isRtl ? 'طاولة 4 (VIP)' : 'Table 4 (VIP)', status: 'free', order: null, total: 0 }
  ]);
  const [selectedTable, setSelectedTable] = useState(null);

  // Clinic Simulator State
  const [patientName, setPatientName] = useState(isRtl ? 'محمد إبراهيم' : 'Mohamed Ibrahim');
  const [selectedDoctor, setSelectedDoctor] = useState(isRtl ? 'د. أحمد حسام (استشاري باطنة)' : 'Dr. Ahmed Hossam (Internal Med)');

  // Handle switching industry tab: updates realistic default name if not manually edited
  const handleSelectIndustry = (indId) => {
    setActiveIndustry(indId);
    if (!isCustomName) {
      setBusinessName(industryDefaults[indId] || (isRtl ? 'مؤسسة تجارية' : 'Commercial Enterprise'));
    }
  };

  // Industries Catalog
  const industries = [
    { id: 'restaurant', label: isRtl ? 'مطعم وكافيه' : 'Restaurant & Cafe', icon: Utensils },
    { id: 'market', label: isRtl ? 'سوبر ماركت ومحلات' : 'Supermarket & POS', icon: ShoppingCart },
    { id: 'clinic', label: isRtl ? 'عيادة ومجمع طبي' : 'Clinic & Medical', icon: Stethoscope },
    { id: 'maintenance', label: isRtl ? 'مراكز صيانة وتشغيل' : 'Appliance Repair', icon: Wrench },
    { id: 'mobile', label: isRtl ? 'محل موبايلات' : 'Mobile & Tech', icon: Smartphone },
    { id: 'fashion', label: isRtl ? 'محل ملابس وموضة' : 'Fashion Boutique', icon: Shirt },
    { id: 'gym', label: isRtl ? 'جيم ونادي رياضي' : 'Gym & Fitness', icon: Dumbbell },
    { id: 'realestate', label: isRtl ? 'عقارات ومشاريع' : 'Real Estate', icon: Building2 },
    { id: 'company', label: isRtl ? 'شركة أو مصنع' : 'Enterprise', icon: Laptop }
  ];

  // Systems Catalog
  const systems = [
    {
      id: 'pos',
      title: isRtl ? 'نظام الكاشير ونقاط البيع السريع' : 'Cloud POS & Cashier System',
      desc: isRtl
        ? 'بيع بالباركود والصور، إدارة ورديات، تصفية درج النقدية، مرتجعات، وطباعة إيصالات فورية.'
        : 'High-speed touch POS, barcode scanning, shift settlements, drawer audits, and instant thermal receipts.',
      icon: ShoppingCart,
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
      tag: isRtl ? 'بيع وورديات' : 'Retail POS',
      features: isRtl
        ? ['دعم قارئ الباركود وموازين الباركود', 'طباعة فواتير مبسطة وضريبية QR', 'تنبيهات فرق الخزينة والورديات']
        : ['Barcode & weighing scale integration', 'QR compliant receipt generation', 'Real-time cash drawer tracking'],
      canSimulate: true
    },
    {
      id: 'restaurant',
      title: isRtl ? 'نظام إدارة المطاعم والكافيهات' : 'Restaurant & Cafe OS',
      desc: isRtl
        ? 'خريطة الصالة والترابيزات لحظة بلحظة، شاشة مطبخ حية (KDS)، دليفري وتيك أواي، وحساب الخدمة والضريبة.'
        : 'Live interactive table floor plans, Kitchen Display System (KDS), delivery dispatch, and split-billing.',
      icon: Utensils,
      color: 'border-orange-500/40 text-orange-400 bg-orange-500/10',
      tag: isRtl ? 'صالة ومطبخ' : 'Hospitality',
      features: isRtl
        ? ['توزيع وإدارة طلبات الطاولات والكبائن', 'شاشة مطبخ فورية لإعداد الوجبات', 'ربط منيو الـ QR مع الكاشير']
        : ['Table and floor management', 'Instant kitchen ticket display', 'QR code contactless menu linkage'],
      canSimulate: true
    },
    {
      id: 'clinic',
      title: isRtl ? 'نظام إدارة العيادات والمراكز الطبية' : 'Clinic & Medical Center OS',
      desc: isRtl
        ? 'جدول مواعيد الأطباء، ملف المريض والتاريخ المرضي، طباعة الروشتة والكشف، وحجز المواعيد أونلاين.'
        : 'Doctor schedules, electronic patient medical records (EMR), automated prescription printing, and bookings.',
      icon: Stethoscope,
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
      tag: isRtl ? 'طبي وعيادات' : 'Healthcare',
      features: isRtl
        ? ['حجز مواعيد بالفترات المتاحة لكل طبيب', 'روشتة طبية إلكترونية جاهزة للطباعة', 'سجل زيارات وتقارير الإيرادات']
        : ['Smart appointment scheduling', 'One-click branded prescription print', 'Patient visit logs & billing'],
      canSimulate: true
    },
    {
      id: 'inventory',
      title: isRtl ? 'نظام المخازن وإدارة المشتريات' : 'Inventory & Supply Chain Hub',
      desc: isRtl
        ? 'حركة المخزون وتنبيهات النواقص، فواتير الشراء، حسابات الموردين، وإجراء الجرد والتسويات بدقة.'
        : 'Multi-warehouse stock tracking, low-stock alerts, supplier ledger invoices, and automated audit adjustments.',
      icon: Store,
      color: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10',
      tag: isRtl ? 'مخازن وموردين' : 'Warehouse ERP',
      features: isRtl
        ? ['تنبيه فوري عند وصول الصنف للحد الأدنى', 'كشف حساب تفصيلي لكل مورد', 'تسجيل أذونات الصرف والاستلام']
        : ['Automated reorder point notifications', 'Detailed supplier credit ledgers', 'Inbound & outbound stock slips'],
      canSimulate: false
    },
    {
      id: 'hr',
      title: isRtl ? 'نظام الموارد البشرية والرواتب' : 'HR & Payroll Management',
      desc: isRtl
        ? 'حضور وانصراف وتأخيرات، إدارة الإجازات، السلف والأقساط، وإصدار قسائم الرواتب الشهرية بضغطة زر.'
        : 'Biometric/app attendance, overtime & deductions, leave balances, loans, and automated monthly payroll slips.',
      icon: Laptop,
      color: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
      tag: isRtl ? 'موظفين ورواتب' : 'HR Management',
      features: isRtl
        ? ['احتساب ساعات العمل الإضافي والغياب', 'موافقة إلكترونية على طلبات الإجازات', 'إصدار كشف المرتبات الصافي']
        : ['Automated overtime & absence calculation', 'Digital leave approval workflow', 'Instant net salary pay-slips'],
      canSimulate: false
    },
    {
      id: 'admin',
      title: isRtl ? 'لوحة تحكم المواقع والشركات (CMS)' : 'Unified Web CMS & Master Dashboard',
      desc: isRtl
        ? 'إدارة محتوى موقعك بالكامل، استلام طلبات واستفسارات العملاء، وإحصائيات المبيعات والنمو لحظياً.'
        : 'Manage your website listings, customer inquiry funnel, analytics, and marketing leads in one screen.',
      icon: Monitor,
      color: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
      tag: isRtl ? 'لوحة تحكم' : 'Master CMS',
      features: isRtl
        ? ['تعديل أسعار وصور المنتجات والخدمات', 'صندوق طلبات وحجوزات العملاء الفورية', 'تقارير أداء الزيارات والتحويلات']
        : ['Direct product & pricing management', 'Unified inbound customer inbox', 'Conversion and traffic telemetry'],
      canSimulate: false
    }
  ];

  // Ready Websites Catalog (Including Modir Al-Syana!)
  const websites = [
    {
      id: 'modir-syana',
      title: isRtl ? 'موقع وتطبيق مدير الصيانة المعتمد (جاهز للبيع فورا)' : 'Modir Al-Syana Home Appliance Service (Live)',
      businessLabel: isRtl ? 'مركز مدير الصيانة المعتمد' : 'Modir Al-Syana Center',
      desc: isRtl
        ? 'موقع حقيقي متكامل لخدمات صيانة الأجهزة المنزلية (غسالات، ثلاجات، تكييفات، أفران)، مهيأ بمحركات البحث وتم تنقية أرقام الهواتف ليكون قالباً جاهزاً للتخصيص والبيع الفوري.'
        : 'Live turnkey portal for home appliances repair with 50+ service pages, SEO structure, ready for instant sale and client rebranding.',
      badge: isRtl ? '🔥 جاهز للبيع والتسليم 24H' : '🔥 Live Ready for Sale',
      img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      demoUrl: 'https://mustafaabdelsalam49-arch.github.io/project-1-/index.html',
      isLiveAvailable: true
    },
    {
      id: 'site-restaurant',
      title: isRtl ? 'موقع مطعم وكافيه عصري' : 'Modern Restaurant & Cafe Web',
      businessLabel: isRtl ? 'مطعم وكافيه كازابلانكا' : 'Casablanca Restaurant',
      desc: isRtl ? 'منيو متكامل بالصور والأسعار، طلب أونلاين، وحجز ترابيزة بضغطة زر.' : 'Full digital menu, online takeaway ordering, and table reservations.',
      badge: isRtl ? 'منيو + حجز ترابيزة' : 'Menu & Booking',
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      demoUrl: '#',
      isLiveAvailable: false
    },
    {
      id: 'site-clinic',
      title: isRtl ? 'موقع عيادة ومجمع طبي' : 'Specialized Clinic & Medical Portal',
      businessLabel: isRtl ? 'عيادات رويال كير التخصصية' : 'Royal Care Clinic',
      desc: isRtl ? 'استعراض الأطباء والتخصصات، وحجز المواعيد الشاغرة مباشرة بالتقويم.' : 'Physician directories, specialty profiles, and direct calendar appointment booking.',
      badge: isRtl ? 'حجز كشوفات وأطباء' : 'Doctor Booking',
      img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      demoUrl: '#',
      isLiveAvailable: false
    },
    {
      id: 'site-realestate',
      title: isRtl ? 'موقع عقارات وتسويق مشاريع' : 'Luxury Real Estate & Listings',
      businessLabel: isRtl ? 'الأفق للتطوير العقاري' : 'Al-Ofok Real Estate',
      desc: isRtl ? 'خريطة تفاعلية للوحدات، فلاتر بالأسعار والمساحات، وطلب معاينة فورية.' : 'Interactive property map, pricing filters, and instant inquiry lead forms.',
      badge: isRtl ? 'عقارات وخريطة تفاعلية' : 'Property Map',
      img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      demoUrl: '#',
      isLiveAvailable: false
    },
    {
      id: 'site-gym',
      title: isRtl ? 'موقع جيم ونادي رياضي' : 'Gym & Fitness Center Portal',
      businessLabel: isRtl ? 'أبطال اللياقة جيم' : 'Heroes Fitness Club',
      desc: isRtl ? 'باقات الاشتراك، جدول الكلاسات الأسبوعي، وحجز حصة تجريبية مجانية.' : 'Membership tiers, weekly trainer class schedules, and trial pass booking.',
      badge: isRtl ? 'اشتراكات وكلاسات' : 'Gym Memberships',
      img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      demoUrl: '#',
      isLiveAvailable: false
    },
    {
      id: 'site-mobile',
      title: isRtl ? 'متجر إلكتروني لمحل موبايلات' : 'Smart Electronics & Mobile E-Store',
      businessLabel: isRtl ? 'تكنو فون ستور' : 'TechnoPhone Store',
      desc: isRtl ? 'عروض الهواتف والإكسسوارات، سلة شراء، طلب تقسيط، وخدمات الصيانة.' : 'Smartphones & accessories, cart checkout, installment applications, and repair desk.',
      badge: isRtl ? 'متجر وتقسيط وصيانة' : 'E-Store & Credit',
      img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      demoUrl: '#',
      isLiveAvailable: false
    }
  ];

  // Cart calculations for POS
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartTax = Math.round(cartSubtotal * 0.14);
  const cartTotal = cartSubtotal + cartTax;

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const handleUpdateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleGenerateReceipt = () => {
    setReceiptData({
      bizName: businessName || (isRtl ? 'سوبر ماركت النور' : 'Al-Noor Retail POS'),
      invNumber: 'INV-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [...cart],
      subtotal: cartSubtotal,
      tax: cartTax,
      total: cartTotal
    });
    setActiveModal('receipt');
  };

  // Open live website preview
  const handleOpenPreview = (site) => {
    if (site.demoUrl && site.demoUrl.startsWith('http')) {
      setPreviewSite(site);
      setActiveModal('website_preview');
    } else {
      // Fallback
      alert(isRtl ? `جاري تجهيز استعراض التصميم المباشر لـ ${site.title}` : `Preparing live preview for ${site.title}`);
    }
  };

  return (
    <section id="systems-hub" className="py-24 relative overflow-hidden bg-slate-950/90 border-t border-slate-800/80">
      {/* Background Neon Lighting */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/10">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>{isRtl ? 'ديمو حي · أنظمة ومواقع سحابية جاهزة للتسليم الفوري' : 'Live Demos · Ready Cloud Systems & Web Portals'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            {isRtl ? (
              <>
                أنظمة ومواقع جاهزة <span className="text-gradient-gold">تشتغل لنشاطك من النهارده</span>
              </>
            ) : (
              <>
                Turnkey Systems & Websites <span className="text-gradient-gold">Ready to Deploy Today</span>
              </>
            )}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {isRtl
              ? 'جرّب بنفسك أونلاين: كاشير ومخازن، إدارة مطاعم وكافيهات، عيادات ومراكز طبية، موقع مدير الصيانة، ومواقع متكاملة لمختلف المجالات — مبرمجة ومطورة بواسطة عبد السلام (AM Marketing).'
              : 'Test live interactive demos: Retail POS, Restaurant OS, Medical Clinic EMR, Modir Al-Syana Portal, and industry websites — engineered by Abdel Salam (AM Marketing).'}
          </p>

          {/* 🎬 20-Second Video Intro Quick CTA */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setActiveModal('video')}
              className="px-5 py-2.5 rounded-full bg-slate-900 border border-amber-500/40 hover:border-amber-400 text-amber-400 hover:text-white hover:bg-slate-800 text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg shadow-amber-500/10 transition-all cursor-pointer group"
            >
              <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span>{isRtl ? 'فيديو تعريفي سريع (20 ثانية) 🎬' : '20-Sec Quick Video Tour 🎬'}</span>
            </button>
          </div>
        </div>

        {/* 🌟 Interactive Personalization Bar */}
        <div className="max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/90 to-slate-900 border border-amber-500/30 shadow-2xl shadow-amber-500/5 space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-amber-400">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {isRtl ? 'خصّص اسم التجربة لنشاطك التجاري:' : 'Customize live demo name for your business:'}
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              {isRtl ? 'يتغير تلقائياً حسب مجالك أو اكتب ما يناسبك ⚡' : 'Auto-adapts to your field or type custom ⚡'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Store className="absolute top-1/2 -translate-y-1/2 right-3.5 sm:right-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={businessName}
                onChange={(e) => {
                  setBusinessName(e.target.value);
                  setIsCustomName(true);
                }}
                placeholder={isRtl ? 'اكتب اسم محلك أو عيادتك أو نشاطك...' : 'Enter your store, clinic or company name...'}
                className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors font-bold"
              />
            </div>
            <button
              onClick={() => setActiveModal('pos')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Printer className="w-4 h-4" />
              <span>{isRtl ? 'جرّب طباعة فاتورة باسمك' : 'Print Demo Receipt'}</span>
            </button>
          </div>
        </div>

        {/* 🏢 Industry Quick Filters */}
        <div className="space-y-4">
          <p className="text-center text-xs sm:text-sm font-bold text-slate-400">
            {isRtl ? 'إنت شغّال في إيه؟ اختار مجالك وسيتغير الاسم والأنظمة المناسبة فوراً:' : 'Select your industry to see tailored systems and website demos:'}
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap">
            {industries.map((ind) => {
              const Icon = ind.icon;
              const isActive = activeIndustry === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => handleSelectIndustry(ind.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400 scale-105'
                      : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{ind.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 💻 Section 1: The 6 Core Cloud Systems */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                {isRtl ? 'أنظمة إدارة الأعمال السحابية (ERP & POS)' : 'Cloud Business Management Systems'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isRtl ? 'أنظمة حقيقية تعمل عبر السحابة أو بدون إنترنت على أجهزة الكاشير والكمبيوتر' : 'Production-grade systems running in the cloud or offline on POS machines'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systems.map((sys) => {
              const Icon = sys.icon;
              return (
                <div
                  key={sys.id}
                  className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-2xl hover:shadow-blue-500/5 group"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${sys.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-black bg-slate-800/80 border border-slate-700 text-slate-300">
                        {sys.tag}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <div>
                      <h4 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors">
                        {sys.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {sys.desc}
                      </p>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-2 pt-2 border-t border-slate-800/60">
                      {sys.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 mt-4 border-t border-slate-800 flex items-center gap-2">
                    {sys.canSimulate ? (
                      <button
                        onClick={() => setActiveModal(sys.id)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'جرّب النظام لايف' : 'Try Live Demo'}</span>
                      </button>
                    ) : (
                      <a
                        href={`https://wa.me/201098174992?text=${encodeURIComponent(
                          `مرحباً يا عبد السلام، أود الاطلاع على ديمو نظام ${sys.title} لنشاط: ${businessName}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-black flex items-center justify-center gap-1.5 border border-slate-700 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'طلب فيديو الديمو' : 'Request Demo'}</span>
                      </a>
                    )}

                    <a
                      href={`https://wa.me/201098174992?text=${encodeURIComponent(
                        `مرحباً يا عبد السلام، أود طلب نظام (${sys.title}) لنشاطي التجاري باسم: ${businessName}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1 transition-all"
                      title={isRtl ? 'اطلبه الآن على واتساب' : 'Order via WhatsApp'}
                    >
                      <span>{isRtl ? 'اطلبه الآن' : 'Order'}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🌐 Section 2: Ready Industry Websites */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
                {isRtl ? 'المواقع الإلكترونية الجاهزة للتسليم الفوري (Turnkey Ready Websites)' : 'Ready Turnkey Websites for Instant Handover'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isRtl ? 'مواقع حقيقية ومصممة بأعلى معايير الويب وسرعة التحميل جاهزة للبيع والتخصيص فوراً باسم العميل' : 'Live production websites optimized for SEO and conversion ready for instant rebranding'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((site) => (
              <div
                key={site.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-2xl group"
              >
                <div>
                  {/* Image with realistic industry brand label */}
                  <div className="relative h-44 overflow-hidden bg-slate-950">
                    <img
                      src={site.img}
                      alt={site.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Top Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-black bg-slate-950/85 backdrop-blur-md border border-slate-700 text-amber-400">
                        {site.badge}
                      </span>
                    </div>

                    {/* Realistic Brand Tag on Card (Not forced 'Sultan' everywhere!) */}
                    <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between">
                      <span className="text-xs font-black text-white drop-shadow-md bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-700/60">
                        {isCustomName ? businessName : site.businessLabel}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-2">
                    <h4 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                      {site.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {site.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Actions: Live Preview + WhatsApp Order */}
                <div className="p-5 pt-0 space-y-2">
                  <div className="flex gap-2">
                    {site.isLiveAvailable ? (
                      <button
                        onClick={() => handleOpenPreview(site)}
                        className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-blue-600/20 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'معاينة الموقع لايف 🌐' : 'Live Preview 🌐'}</span>
                      </button>
                    ) : (
                      <a
                        href={`https://wa.me/201098174992?text=${encodeURIComponent(
                          `مرحباً يا عبد السلام، أود الاطلاع على ديمو تصميم (${site.title})`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-black flex items-center justify-center gap-1.5 border border-slate-700 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'طلب المعاينة' : 'Preview'}</span>
                      </a>
                    )}

                    <a
                      href={`https://wa.me/201098174992?text=${encodeURIComponent(
                        `مرحباً يا عبد السلام، أود شراء أو حجز (${site.title}) باسم نشاطي: ${isCustomName ? businessName : site.businessLabel}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1 transition-all"
                      title={isRtl ? 'احجز الآن' : 'Claim'}
                    >
                      <span>{isRtl ? 'احجز الآن' : 'Claim'}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 🎬 MODAL: 20-Second Video Tour Explainer                  */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeModal === 'video' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-white">
                      {isRtl ? 'فيديو تعريفي بالمنظومة السحابية (20 ثانية)' : '20-Sec Turnkey Systems Explainer'}
                    </h3>
                    <p className="text-[11px] text-slate-400">AM Marketing • عبد السلام</p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-1.5 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center border border-slate-800">
                  <video
                    src={getAssetUrl('/assets/videos/ai_investment_promo.mp4')}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-black text-amber-400">
                    {isRtl ? 'ما الذي تحصل عليه مع كل نظام؟' : 'What is included in every system?'}
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isRtl ? 'تسليم وتركيب خلال 24 ساعة' : '24-hour instant deployment'}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isRtl ? 'يعمل بدون إنترنت أو سحابياً' : 'Works online and 100% offline'}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isRtl ? 'تدريب كامل لك ولفريق عملك' : 'Full onboarding & staff training'}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isRtl ? 'دعم فني وضمان استقرار 100%' : 'Direct support & uptime warranty'}</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="https://wa.me/201098174992?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%8A%D8%A7%20%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D8%B4%D9%81%D8%AA%20%D8%A7%D9%84%D9%81%D9%8A%D8%AF%D9%8A%D9%88%20%D8%A7%D9%84%D8%AA%D8%B9%D8%B1%D9%8A%D9%81%D9%8A%20%D9%88%D8%A3%D9%88%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D9%86%D8%B8%D8%A7%D9%85%20%D9%84%D9%86%D8%B4%D8%A7%D8%B7%D9%8A%20%D8%A7%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <span>{isRtl ? 'تواصل مع عبد السلام واطلب نظامك الآن 💬' : 'Contact Abdel Salam via WhatsApp 💬'}</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 🌐 MODAL: Live Website Iframe Sandbox Preview             */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeModal === 'website_preview' && previewSite && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col h-[92vh]"
            >
              {/* Sandbox Top Bar with Device Toggles */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-800 bg-slate-950">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-white">{previewSite.title}</h3>
                    <p className="text-[10px] text-emerald-400 font-bold">{isRtl ? 'معاينة حية ومباشرة' : 'Live Sandbox Preview'}</p>
                  </div>
                </div>

                {/* Device viewport toggle */}
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                        previewDevice === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {isRtl ? 'لابتوب 💻' : 'Desktop 💻'}
                    </button>
                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                        previewDevice === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {isRtl ? 'موبايل 📱' : 'Mobile 📱'}
                    </button>
                  </div>

                  <a
                    href={previewSite.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1"
                    title={isRtl ? 'فتح في نافذة كاملة' : 'Open in new tab'}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button onClick={() => setActiveModal(null)} className="p-2 text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Iframe Viewport Container */}
              <div className="flex-1 bg-slate-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-white ${
                    previewDevice === 'mobile' ? 'w-[375px]' : 'w-full'
                  }`}
                >
                  <iframe
                    src={previewSite.demoUrl}
                    title={previewSite.title}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  {isRtl ? 'هذا الموقع جاهز للتسليم ونقل الملكية وإضافة بياناتك فوراً.' : 'Ready for instant deployment and client data transfer.'}
                </p>
                <a
                  href={`https://wa.me/201098174992?text=${encodeURIComponent(
                    `مرحباً يا عبد السلام، قمت بمعاينة موقع (${previewSite.title}) وأود شراءه وتخصيصه فوراً.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                >
                  <span>{isRtl ? 'شراء وتخصيص الموقع فوراً عبر واتساب' : 'Claim & Rebrand via WhatsApp'}</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 🧾 MODAL: Interactive POS & Cashier Simulator             */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeModal === 'pos' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-white">
                      {isRtl ? 'محاكي شاشة الكاشير السريع (POS Simulator)' : 'Quick POS Cashier Simulator'}
                    </h3>
                    <p className="text-[11px] text-amber-400 font-bold">
                      {businessName}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                    {isRtl ? 'الأصناف السريعة (اضغط للإضافة):' : 'Quick Menu Items (Click to Add):'}
                  </h4>

                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: 1, name: isRtl ? 'قهوة كلاسيك' : 'Classic Coffee', price: 45, icon: '☕' },
                      { id: 2, name: isRtl ? 'برجر سوبريم' : 'Supreme Burger', price: 120, icon: '🍔' },
                      { id: 3, name: isRtl ? 'بيتزا ميكس جبن' : 'Cheese Pizza', price: 160, icon: '🍕' },
                      { id: 4, name: isRtl ? 'عصير مانجو فريش' : 'Fresh Mango', price: 50, icon: '🥭' },
                      { id: 5, name: isRtl ? 'شيبسي عائلي' : 'Family Chips', price: 30, icon: '🍟' },
                      { id: 6, name: isRtl ? 'مياه معدنية' : 'Mineral Water', price: 15, icon: '💧' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleAddToCart(item)}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all text-right cursor-pointer flex flex-col justify-between"
                      >
                        <span className="text-2xl mb-1">{item.icon}</span>
                        <span className="text-xs font-bold text-white">{item.name}</span>
                        <span className="text-xs font-black text-amber-400 mt-1">{item.price} {isRtl ? 'ج.م' : 'EGP'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-bold text-white">{isRtl ? 'فاتورة البيع الحالية' : 'Current Order'}</span>
                      <span className="text-[11px] text-slate-400">{cart.length} {isRtl ? 'أصناف' : 'items'}</span>
                    </div>

                    {cart.length === 0 ? (
                      <div className="py-12 text-center text-xs text-slate-500">
                        {isRtl ? 'السلة فارغة، اختر صنفاً لإضافته' : 'Cart is empty, add an item'}
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                            <div>
                              <p className="font-bold text-white">{item.name}</p>
                              <p className="text-[11px] text-slate-400">{item.price} x {item.qty} = {item.price * item.qty} {isRtl ? 'ج.م' : 'EGP'}</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleUpdateQty(item.id, -1)}
                                className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-black w-4 text-center text-white">{item.qty}</span>
                              <button
                                onClick={() => handleUpdateQty(item.id, 1)}
                                className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>{isRtl ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                      <span>{cartSubtotal} {isRtl ? 'ج.م' : 'EGP'}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>{isRtl ? 'ضريبة القيمة المضافة (14%):' : 'VAT (14%):'}</span>
                      <span>{cartTax} {isRtl ? 'ج.م' : 'EGP'}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-emerald-400 pt-1 border-t border-slate-800/80">
                      <span>{isRtl ? 'الإجمالي المطلوب:' : 'Grand Total:'}</span>
                      <span>{cartTotal} {isRtl ? 'ج.م' : 'EGP'}</span>
                    </div>

                    <button
                      onClick={handleGenerateReceipt}
                      disabled={cart.length === 0}
                      className="w-full mt-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>{isRtl ? 'إصدار وطباعة الإيصال الحراري' : 'Issue & Print Receipt'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 🍽️ MODAL: Interactive Restaurant Table Floor Plan         */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeModal === 'restaurant' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40 flex items-center justify-center">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-white">
                      {isRtl ? 'محاكي خريطة الصالة والترابيزات (Restaurant Floor Plan)' : 'Live Restaurant Floor Simulator'}
                    </h3>
                    <p className="text-[11px] text-amber-400 font-bold">
                      {isCustomName ? businessName : industryDefaults.restaurant}
                    </p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-1.5 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-xs text-slate-300">
                  {isRtl ? 'اضغط على أي طاولة لمعاينة حالة الطلب أو إرسال الأوردر للمطبخ فوراً:' : 'Click on any table to inspect live status or push order to kitchen:'}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {tables.map((tbl) => {
                    const isBusy = tbl.status === 'busy';
                    return (
                      <button
                        key={tbl.id}
                        onClick={() => setSelectedTable(tbl)}
                        className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                          isBusy
                            ? 'bg-rose-500/10 border-rose-500/40 text-rose-300 hover:border-rose-400'
                            : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:border-emerald-400'
                        }`}
                      >
                        <span className="text-2xl">{isBusy ? '🔴' : '🟢'}</span>
                        <span className="text-xs font-black">{tbl.name}</span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-950/80">
                          {isBusy ? (isRtl ? 'مشغولة' : 'Occupied') : (isRtl ? 'شاغرة' : 'Available')}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedTable && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white">{selectedTable.name}</span>
                      <span className="text-xs font-bold text-amber-400">
                        {selectedTable.total > 0 ? `${selectedTable.total} ${isRtl ? 'ج.م' : 'EGP'}` : ''}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      {selectedTable.order || (isRtl ? 'لا توجد طلبات جارية على هذه الطاولة.' : 'No active orders on this table.')}
                    </p>
                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => {
                          setTables((prev) =>
                            prev.map((t) =>
                              t.id === selectedTable.id
                                ? { ...t, status: t.status === 'busy' ? 'free' : 'busy', order: t.status === 'busy' ? null : (isRtl ? 'طلب جديد: 2 عصير فريش' : 'New Order: 2 Juices'), total: t.status === 'busy' ? 0 : 90 }
                                : t
                            )
                          );
                          setSelectedTable(null);
                        }}
                        className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        {selectedTable.status === 'busy' ? (isRtl ? 'تسوية الحساب وتفريغ الطاولة' : 'Settle & Free Table') : (isRtl ? 'فتح طاولة وإرسال طلب للمطبخ' : 'Open Table & Send Ticket')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 🏥 MODAL: Interactive Clinic Prescription Generator       */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeModal === 'clinic' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-white">
                      {isRtl ? 'محاكي الروشتة الطبية الذكية' : 'Medical Prescription Generator'}
                    </h3>
                    <p className="text-[11px] text-amber-400 font-bold">
                      {/* Fixed: Uses clinic name, NEVER restaurant! */}
                      {isCustomName && activeIndustry === 'clinic' ? businessName : industryDefaults.clinic}
                    </p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-1.5 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">{isRtl ? 'اسم المريض:' : 'Patient Name:'}</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">{isRtl ? 'الطبيب المعالج:' : 'Doctor:'}</label>
                  <input
                    type="text"
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>

                {/* Simulated Prescription Paper (Branded with Clinic Name!) */}
                <div className="p-5 rounded-xl bg-white text-slate-900 space-y-3 shadow-lg border border-slate-200">
                  <div className="border-b border-slate-300 pb-2 flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-black text-blue-900">
                        {isCustomName && activeIndustry === 'clinic' ? businessName : industryDefaults.clinic}
                      </h4>
                      <p className="text-[10px] text-slate-600">{selectedDoctor}</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500">{new Date().toLocaleDateString()}</span>
                  </div>

                  <p className="text-[11px] font-bold">
                    {isRtl ? 'اسم المريض: ' : 'Patient: '} <span className="underline">{patientName}</span>
                  </p>

                  <div className="py-2 space-y-1.5 font-mono text-[11px]">
                    <p className="font-black text-blue-900 text-sm">℞</p>
                    <p className="pl-4">1. Panadol Extra 500mg - 1 tab every 8 hrs</p>
                    <p className="pl-4">2. Augmentin 1g - 1 tab twice daily after meal</p>
                    <p className="pl-4">3. Vitamin C 1000mg Effervescent - once daily</p>
                  </div>

                  <div className="border-t border-slate-200 pt-2 flex justify-end text-[10px] text-slate-500 font-bold">
                    <span>{isRtl ? 'توقيع الطبيب المعتمد' : 'Doctor Signature'}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(isRtl ? 'تم إرسال الروشتة للطباعة بنجاح!' : 'Prescription sent to printer!')}
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-600/20"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isRtl ? 'طباعة الروشتة الطبية 🖨️' : 'Print Medical Rx 🖨️'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 🖨️ MODAL: Realistic Thermal Receipt Popup                */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeModal === 'receipt' && receiptData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white text-slate-950 rounded-2xl shadow-2xl p-6 z-10 font-mono text-xs space-y-4"
            >
              <div className="text-center space-y-1 border-b-2 border-dashed border-slate-300 pb-3">
                <h3 className="font-black text-base tracking-wider">{receiptData.bizName}</h3>
                <p className="text-[10px] text-slate-600 font-sans">{isRtl ? 'إيصال دفع إلكتروني ضريبي' : 'Tax Payment Receipt'}</p>
                <p className="text-[10px] text-slate-500">{receiptData.date}</p>
                <p className="text-[10px] text-slate-500 font-bold">{receiptData.invNumber}</p>
              </div>

              <div className="space-y-1.5 border-b-2 border-dashed border-slate-300 pb-3">
                <div className="flex justify-between font-bold text-[11px] pb-1 border-b border-slate-200">
                  <span>{isRtl ? 'الصنف' : 'Item'}</span>
                  <span>{isRtl ? 'الكمية x السعر' : 'Qty x Price'}</span>
                </div>
                {receiptData.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-[11px]">
                    <span>{it.name}</span>
                    <span>{it.qty} x {it.price} = {it.qty * it.price}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-[11px] border-b-2 border-dashed border-slate-300 pb-3">
                <div className="flex justify-between text-slate-600">
                  <span>{isRtl ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                  <span>{receiptData.subtotal} {isRtl ? 'ج.م' : 'EGP'}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{isRtl ? 'ضريبة القيمة المضافة (14%):' : 'VAT (14%):'}</span>
                  <span>{receiptData.tax} {isRtl ? 'ج.م' : 'EGP'}</span>
                </div>
                <div className="flex justify-between font-black text-sm pt-1 text-slate-950">
                  <span>{isRtl ? 'الإجمالي المدفوع:' : 'Grand Total:'}</span>
                  <span>{receiptData.total} {isRtl ? 'ج.م' : 'EGP'}</span>
                </div>
              </div>

              <div className="text-center pt-1 space-y-1">
                <div className="inline-block p-2 bg-slate-100 rounded-lg border border-slate-200">
                  <span className="text-xl">🏁 📱 📊</span>
                </div>
                <p className="text-[9px] text-slate-400 font-sans">
                  {isRtl ? 'شكراً لتعاملكم معنا • نظام كاشير AM Marketing' : 'Thank you for your visit • Powered by AM Marketing'}
                </p>
              </div>

              <div className="pt-2 flex gap-2 font-sans">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'طباعة الإيصال' : 'Print'}</span>
                </button>
                <button
                  onClick={() => setActiveModal('pos')}
                  className="py-2 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs cursor-pointer"
                >
                  {isRtl ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
