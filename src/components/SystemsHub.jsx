import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Monitor, Smartphone, CheckCircle, ExternalLink,
  ShoppingCart, Utensils, Stethoscope, Dumbbell, Building2,
  Store, Shirt, Laptop, Printer, Plus, Minus, Trash2, X,
  Search, ShieldCheck, ArrowRight, ArrowLeft, RefreshCw, Eye,
  Play, Pause, RotateCcw, Wrench, Flame, HelpCircle,
  Download, Key, Copy, Check, Lock, Unlock, Cpu, HardDrive, Terminal
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

  // Platform Mode: 'windows' | 'cloud'
  const [platformTab, setPlatformTab] = useState('windows');

  // Active Modals: 'pos' | 'restaurant' | 'clinic' | 'receipt' | 'video' | 'website_preview' | 'activate_sim' | 'keygen'
  const [activeModal, setActiveModal] = useState(null);
  const [previewSite, setPreviewSite] = useState(null);
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'mobile'

  // Windows Activation Simulator State
  const [simMachineId, setSimMachineId] = useState('AM-9817-4F2A-88B1');
  const [simInputKey, setSimInputKey] = useState('');
  const [simIsActivated, setSimIsActivated] = useState(false);
  const [simCopied, setSimCopied] = useState(false);

  // Abdel Salam's Keygen Tool State
  const [keygenInputMachine, setKeygenInputMachine] = useState('AM-9817-4F2A-88B1');
  const [keygenClientName, setKeygenClientName] = useState('سوبر ماركت النور');
  const [keygenLicenseType, setKeygenLicenseType] = useState('lifetime');
  const [generatedKey, setGeneratedKey] = useState('');
  const [keygenCopied, setKeygenCopied] = useState(false);

  // 20-Second Interactive Tour State (4 steps x 5s = 20s total)
  const [tourStep, setTourStep] = useState(0);
  const [tourPlaying, setTourPlaying] = useState(true);

  useEffect(() => {
    if (activeModal !== 'video' || !tourPlaying) return;
    const interval = setInterval(() => {
      setTourStep((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeModal, tourPlaying]);

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

  // 💻 Windows Desktop Offline Software Catalog (Matching CodeMatrix architecture)
  const windowsApps = [
    {
      id: 'win-pos',
      title: isRtl ? 'برنامج الكاشير ونقاط البيع السريع' : 'Retail POS & Touch Cashier',
      exeName: 'AM-Marketing-Cashier-Setup.exe',
      icon: ShoppingCart,
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
      tag: isRtl ? 'كاشير وورديات' : 'Retail POS',
      size: '88 MB',
      os: 'Windows 10 / 11',
      desc: isRtl
        ? 'بيع بالباركود الفوري، طباعة إيصالات حرارية وضريبية، إدارة ورديات الخزينة، ويعمل 100% بدون نت على جهاز الكاشير.'
        : 'High-speed touch POS, barcode scanning, shift audits, and instant thermal receipts. Runs 100% offline.',
      features: isRtl
        ? ['يعمل 100% بدون إنترنت', 'متوافق مع كل طابعات الفواتير والباركود', 'تقارير أرباح وخزينة يومية']
        : ['Runs 100% offline', 'Universal printer & barcode support', 'Daily drawer & profit reports']
    },
    {
      id: 'win-restaurant',
      title: isRtl ? 'برنامج إدارة المطاعم والكافيهات' : 'Restaurant & Cafe OS',
      exeName: 'AM-Marketing-Restaurant-Setup.exe',
      icon: Utensils,
      color: 'border-orange-500/40 text-orange-400 bg-orange-500/10',
      tag: isRtl ? 'صالة ومطابخ' : 'Hospitality',
      size: '88 MB',
      os: 'Windows 10 / 11',
      desc: isRtl
        ? 'خريطة الصالة والترابيزات الحية، شاشة تحضير أوردرات المطبخ (KDS)، حساب الخدمة والضريبة، وطلبات التيك أواي والدليفري.'
        : 'Live interactive table floor plans, Kitchen Display System (KDS), delivery dispatch, and split-billing.',
      features: isRtl
        ? ['توزيع الطاولات والكبائن لحظياً', 'توجيه طلبات الأقسام لطابعات المطبخ', 'أداء سريع ومستقر في ضغط العمل']
        : ['Live table allocation', 'Department kitchen ticket routing', 'Ultra-fast during rush hours']
    },
    {
      id: 'win-clinic',
      title: isRtl ? 'برنامج إدارة العيادات والمراكز الطبية' : 'Clinic & Medical Center OS',
      exeName: 'AM-Marketing-Clinic-Setup.exe',
      icon: Stethoscope,
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
      tag: isRtl ? 'عيادات وروشتات' : 'Healthcare',
      size: '88 MB',
      os: 'Windows 10 / 11',
      desc: isRtl
        ? 'حجز وتنظيم مواعيد المرضى، ملف التاريخ الطبي، طباعة روشتات إلكترونية أنيقة، وإدارة حسابات الكشف والعيادة.'
        : 'Doctor schedules, electronic patient medical records (EMR), automated prescription printing, and patient queue billing.',
      features: isRtl
        ? ['طباعة روشتة طبية باسم عيادتك', 'سجل زيارات وتشخيصات كل مريض', 'حفظ بيانات المرضى بأمان على جهازك']
        : ['Branded prescription printing', 'Electronic Medical Records (EMR)', 'Patient data stored safely on your PC']
    },
    {
      id: 'win-inventory',
      title: isRtl ? 'برنامج المخازن وإدارة المشتريات' : 'Inventory & Warehouse Hub',
      exeName: 'AM-Marketing-Inventory-Setup.exe',
      icon: Store,
      color: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10',
      tag: isRtl ? 'مخازن وموردين' : 'Warehouse ERP',
      size: '88 MB',
      os: 'Windows 10 / 11',
      desc: isRtl
        ? 'حركات المخزون، تنبيهات النواقص والحد الأدنى، فواتير الشراء، حسابات وأرصدة الموردين، وإجراء الجرد والتسويات بدقة.'
        : 'Multi-warehouse stock tracking, low-stock alerts, supplier ledgers, inbound & outbound inventory slips.',
      features: isRtl
        ? ['تنبيه فوري بالنواقص قبل نفادها', 'كشف حساب تفصيلي لكل مورد', 'جرد سريع بالباركود والتسويات']
        : ['Automated low-stock alerts', 'Detailed supplier credit ledgers', 'Barcode-assisted physical stock audit']
    },
    {
      id: 'win-hr',
      title: isRtl ? 'برنامج الموارد البشرية وشؤون الموظفين' : 'HR & Payroll Management',
      exeName: 'AM-Marketing-HR-Setup.exe',
      icon: Laptop,
      color: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
      tag: isRtl ? 'موظفين ورواتب' : 'HR Management',
      size: '88 MB',
      os: 'Windows 10 / 11',
      desc: isRtl
        ? 'حضور وانصراف وتأخيرات، إدارة الإجازات، السلف والأقساط، واحتساب الرواتب الصافية وطباعة قسائم القبض الشهرية.'
        : 'Biometric attendance, leave balances, loans & deductions, automated net payroll calculation and monthly payslips.',
      features: isRtl
        ? ['احتساب ساعات العمل والغياب آلياً', 'إصدار مفردات المرتب بضغطة واحدة', 'ملف كامل لكل موظف وعقوده']
        : ['Automated overtime & absence calculation', 'One-click payroll slip generation', 'Comprehensive employee document file']
    }
  ];

  const handleSimulateDownload = (app) => {
    const content = `====================================================\nAM Marketing — ${app.title}\nملف التثبيت: ${app.exeName}\nالحجم: 88 MB · نظام التشغيل: ${app.os}\n====================================================\n\nخطوات التثبيت والتفعيل:\n1. قم بتثبيت البرنامج بنقرة واحدة (ملف Setup.exe مستقل مع محرك SQLite محلي).\n2. انسخ كود الجهاز (Machine ID) الذي يظهر في شاشة البرنامج.\n3. أرسل كود الجهاز إلى عبد السلام على واتساب (01098174992) لاستلام كود التفعيل مدى الحياة.\n\nAM Marketing • عبد السلام\nواتساب: +201098174992\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${app.exeName.replace('.exe', '')}-Setup-Guide.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateKeygenKey = () => {
    const cleanId = (keygenInputMachine || 'AM-9817-4F2A').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const reversed = cleanId.split('').reverse().join('').slice(0, 8);
    const code = `ACT-AM-${reversed}-${keygenLicenseType === 'lifetime' ? 'LIFE' : 'YEAR'}-9941`;
    setGeneratedKey(code);
  };
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

  // 🎬 20-Second Interactive Systems Tour Stages (4 stages x 5s = 20s total)
  const tourStages = [
    {
      step: 0,
      time: isRtl ? '00:00 - 00:05 ثوانٍ' : '00:00 - 00:05 sec',
      badge: isRtl ? 'المحطة 1: الكاشير ونقاط البيع' : 'Stage 1: Retail POS',
      icon: ShoppingCart,
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
      title: isRtl ? 'أنظمة نقاط البيع السريع والكاشير (Cloud POS)' : 'Cloud Cashier & Retail POS',
      desc: isRtl
        ? 'بيع بالباركود الفوري، طباعة إيصالات حرارية وضريبية QR، تصفية درج النقدية، وإقفال ورديات بدقة 100% بدون إنترنت أو سحابياً.'
        : 'Touch barcode billing, thermal QR receipt printing, cash drawer audits, and offline-first cloud sync.',
      highlights: isRtl
        ? ['إصدار فاتورة في أقل من ثانيتين', 'متوافق مع كل طابعات الفواتير والباركود', 'تقارير أرباح وخزينة يومية ولحظية']
        : ['Sub-2-sec invoice generation', 'Universal thermal printer support', 'Daily shift & profit audits'],
      ctaLabel: isRtl ? 'جرّب الكاشير وطباعة الفاتورة 🖨️' : 'Test Cashier & Receipt 🖨️',
      action: () => setActiveModal('pos')
    },
    {
      step: 1,
      time: isRtl ? '00:05 - 00:10 ثوانٍ' : '00:05 - 00:10 sec',
      badge: isRtl ? 'المحطة 2: المطاعم والكافيهات' : 'Stage 2: Restaurant OS',
      icon: Utensils,
      color: 'border-orange-500/40 text-orange-400 bg-orange-500/10',
      title: isRtl ? 'إدارة الصالة والترابيزات وشاشات المطابخ (KDS)' : 'Restaurant Floor & Kitchen KDS',
      desc: isRtl
        ? 'خريطة تفاعلية حية لحالة الطاولات (مشغولة / شاغرة)، شاشة مطبخ فورية لإعداد الوجبات، وربط منيو الـ QR مع الكاشير.'
        : 'Interactive live table floor plan, Kitchen Display System (KDS), delivery tracking, and QR menu sync.',
      highlights: isRtl
        ? ['توزيع طلبات الصالة، التيك أواي والدليفري', 'منع تأخير أوردرات المطبخ بشاشات فورية', 'حساب تلقائي لنسب الخدمة والضريبة']
        : ['Dine-in, takeaway & dispatch routes', 'Zero-delay kitchen order tickets', 'Automatic service charge & tax calculation'],
      ctaLabel: isRtl ? 'جرّب خريطة الترابيزات الحية 🍽️' : 'Test Floor Plan 🍽️',
      action: () => setActiveModal('restaurant')
    },
    {
      step: 2,
      time: isRtl ? '00:10 - 00:15 ثانية' : '00:10 - 00:15 sec',
      badge: isRtl ? 'المحطة 3: العيادات والمراكز الطبية' : 'Stage 3: Clinic OS',
      icon: Stethoscope,
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
      title: isRtl ? 'إدارة العيادات والروشتات الإلكترونية' : 'Medical Clinic & Smart Rx System',
      desc: isRtl
        ? 'تنظيم جدول مواعيد وحجوزات المرضى، الاحتفاظ بالتاريخ المرضي، وطباعة روشتات طبية مخصصة باسم عيادتك بضغطة زر واحدة.'
        : 'Automated appointment slots, patient visit history, and instant branded digital prescription generation.',
      highlights: isRtl
        ? ['سجل إلكتروني متكامل لكل مريض (EMR)', 'روشتة طبية أنيقة تحمل اسم عيادتك وطبيبك', 'تنظيم طابور الانتظار وحسابات الكشف']
        : ['Electronic Medical Records (EMR)', 'Clinic branded prescription slips', 'Patient queue & doctor fees ledger'],
      ctaLabel: isRtl ? 'جرّب كتابة وطباعة روشتة 🏥' : 'Test Prescription 🏥',
      action: () => setActiveModal('clinic')
    },
    {
      step: 3,
      time: isRtl ? '00:15 - 00:20 ثانية' : '00:15 - 00:20 sec',
      badge: isRtl ? 'المحطة 4: مواقع حية جاهزة للتسليم' : 'Stage 4: Turnkey Websites',
      icon: Wrench,
      color: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
      title: isRtl ? 'موقع وتطبيق مدير الصيانة ومواقع الشركات' : 'Turnkey Ready Sites (Modir Al-Syana)',
      desc: isRtl
        ? 'مواقع إنترنت وتطبيقات حقيقية مصممة ومبرمجة بالكامل، جاهزة للتسليم والتخصيص خلال 24 ساعة (معاينات فورية متاحة الآن).'
        : 'Production-ready web portals with SEO architecture, ready for immediate delivery, custom rebranding within 24 hours.',
      highlights: isRtl
        ? ['موقع مدير الصيانة المعتمد جاهز للبيع فوراً', 'معاينة مباشرة في المتصفح (موبايل ولابتوب)', 'تسليم كامل مع الاستضافة والدعم والتدريب']
        : ['Modir Al-Syana appliance site ready for instant sale', 'Live in-browser sandbox preview (Mobile/Desktop)', 'Turnkey hosting, domain setup & training'],
      ctaLabel: isRtl ? 'عاين موقع مدير الصيانة المباشر 🌐' : 'Preview Modir Al-Syana 🌐',
      action: () => {
        const site = websites.find(w => w.id === 'modir-syana');
        if (site) handleOpenPreview(site);
      }
    }
  ];

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
              <span>{isRtl ? 'جولة تعريفية بالأنظمة (20 ثانية) 🎬' : '20-Sec Interactive Systems Tour 🎬'}</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 💻 PLATFORM SELECTOR: Windows Offline vs Cloud & Demos   */}
        {/* ======================================================== */}
        <div className="flex items-center justify-center pt-2">
          <div className="p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap gap-1 shadow-2xl backdrop-blur-md">
            <button
              onClick={() => setPlatformTab('windows')}
              className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                platformTab === 'windows'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Laptop className="w-4 h-4 text-cyan-400" />
              <span>{isRtl ? '💻 برامج ويندوز للأجهزة (بدون نت 100%)' : '💻 Windows Desktop (Offline 100%)'}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                {isRtl ? 'تفعيل بكود 🔑' : 'Key Lock 🔑'}
              </span>
            </button>

            <button
              onClick={() => setPlatformTab('cloud')}
              className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                platformTab === 'cloud'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-4 h-4 text-emerald-400" />
              <span>{isRtl ? '🌐 أنظمة ومواقع سحابية أونلاين' : '🌐 Cloud & Web Portals'}</span>
            </button>
          </div>
        </div>

        {platformTab === 'windows' ? (
          <div className="space-y-12">
            {/* Top Windows Offline Showcase Card */}
            <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 relative overflow-hidden shadow-2xl space-y-8">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                <div className="space-y-5 flex-1">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    <HardDrive className="w-4 h-4" />
                    <span>{isRtl ? 'بيشتغل من غير نت 100% · ملف تثبيت واحد · ويندوز 10 و 11' : '100% Offline · Single EXE Installer · Windows 10 & 11'}</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                    {isRtl ? (
                      <>
                        برامج ويندوز للأجهزة... <span className="text-gradient-gold">بياناتك على جهازك بأمان</span>
                      </>
                    ) : (
                      <>
                        Windows Desktop Apps... <span className="text-gradient-gold">Your Data Stays on Your Machine</span>
                      </>
                    )}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                    {isRtl
                      ? 'أنظمة كاشير، مطاعم، عيادات، ومخازن مجهزة للعمل المباشر على كمبيوتر نشاطك التجاري. سرعة خارقة، استقرار تام حتى بدون اتصال بالإنترنت، وتفعيل برخصة تجارية بكود الجهاز لمرة واحدة مدى الحياة.'
                      : 'High-speed desktop business suites for retail, restaurants, clinics, and warehouses. 100% offline database, rock-solid stability, and one-time hardware activation key.'}
                  </p>

                  {/* 3 Steps matching CodeMatrix */}
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-black text-xs flex items-center justify-center">1</div>
                      <h4 className="text-xs font-black text-white">{isRtl ? 'حمّل البرنامج' : 'Download Setup'}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{isRtl ? 'ملف واحد · ويندوز 10 و 11 · 88 MB' : 'Single file · Win 10 & 11 · 88 MB'}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-black text-xs flex items-center justify-center">2</div>
                      <h4 className="text-xs font-black text-white">{isRtl ? 'جرّبه 3 أيام ببلاش' : '3-Day Free Trial'}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{isRtl ? 'بكل المميزات، ومن غير تسجيل' : 'Full features, zero sign-up'}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center">3</div>
                      <h4 className="text-xs font-black text-white">{isRtl ? 'قفّله بكود على واتساب' : 'Activate via Code'}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{isRtl ? 'تبعتلنا كود الجهاز ونبعتلك كود التفعيل' : 'Send Machine ID, get activation key'}</p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => setActiveModal('activate_sim')}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
                    >
                      <Key className="w-4 h-4" />
                      <span>{isRtl ? 'جرّب شاشة التفعيل الحي في المتصفح 🖥️' : 'Test Activation Screen Simulator 🖥️'}</span>
                    </button>

                    <button
                      onClick={() => setActiveModal('keygen')}
                      className="px-5 py-2.5 rounded-xl bg-slate-950 border border-amber-500/40 hover:border-amber-400 text-amber-400 font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isRtl ? 'أداة عبد السلام لتوليد مفاتيح التفعيل 👑' : 'Abdel Salam Keygen Tool 👑'}</span>
                    </button>
                  </div>
                </div>

                {/* Right Side: 3D Logo Showcase */}
                <div className="w-full lg:w-80 shrink-0 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/90 border border-slate-800 text-center space-y-4 shadow-xl">
                  <div className="relative group">
                    <img
                      src={getAssetUrl('/assets/images/am_marketing_3d_logo.jpg')}
                      alt="AM Marketing 3D Software Logo"
                      className="w-40 h-40 rounded-3xl object-cover shadow-2xl shadow-blue-500/30 border-2 border-amber-400/50 group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-400/80 text-amber-400 font-black text-[10px] shadow-lg">
                      AM 3D Logo
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-white">AM Marketing Desktop Apps</h4>
                    <p className="text-[11px] text-slate-400">Microsoft WebView2 + SQLite Local Engine</p>
                    <p className="text-[10px] text-emerald-400 font-bold">100% Offline · Windows 10/11 Single EXE</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Windows Applications Cards Grid */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                    <HardDrive className="w-5 h-5 text-cyan-400" />
                    <span>{isRtl ? 'برامج ويندوز الجاهزة للتحميل والتثبيت' : 'Ready Windows Desktop Installers'}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {isRtl ? 'ملفات تثبيت رسمية (Setup.exe) مجهزة بشعار AM Marketing ثلاثي الأبعاد الفخم' : 'Production installers with AM Marketing 3D app icon'}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {windowsApps.map((app) => (
                  <div
                    key={app.id}
                    className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-2xl hover:shadow-blue-500/5 group"
                  >
                    <div className="space-y-4">
                      {/* Top Header with 3D Logo Icon */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={getAssetUrl('/assets/images/am_marketing_3d_logo.jpg')}
                            alt={app.title}
                            className="w-12 h-12 rounded-xl object-cover border border-amber-400/40 shadow-md group-hover:scale-105 transition-transform shrink-0"
                          />
                          <div>
                            <span className="font-mono text-[11px] font-bold text-amber-400 break-all block">
                              {app.exeName}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {app.size} · {app.os}
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-slate-800 border border-slate-700 text-slate-300">
                          {app.tag}
                        </span>
                      </div>

                      {/* Title & Desc */}
                      <div>
                        <h4 className="text-base font-black text-white group-hover:text-blue-400 transition-colors">
                          {app.title}
                        </h4>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          {app.desc}
                        </p>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-1.5 pt-2 border-t border-slate-800/60">
                        {app.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="pt-5 border-t border-slate-800 flex flex-col gap-2">
                      <button
                        onClick={() => handleSimulateDownload(app)}
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'تحميل البرنامج (88 MB)' : 'Download Setup (88 MB)'}</span>
                      </button>

                      <div className="flex gap-2">
                        <a
                          href={`https://wa.me/201098174992?text=${encodeURIComponent(
                            `مرحباً عبد السلام، أرغب في طلب كود تفعيل لبرنامج: ${app.title} (${app.exeName})`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 rounded-xl bg-slate-950 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Key className="w-3 h-3" />
                          <span>{isRtl ? 'طلب التفعيل' : 'Get Key'}</span>
                        </a>

                        <button
                          onClick={() => setActiveModal('activate_sim')}
                          className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                          title={isRtl ? 'محاكاة التفعيل' : 'Simulate Activation'}
                        >
                          {isRtl ? 'معاينة القفل 🔒' : 'Lock Demo 🔒'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Switch to Cloud Footer Banner */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
              <div>
                <h4 className="text-sm font-black text-white">
                  {isRtl ? 'هل تفضل العمل عبر السحابة أو استعراض مواقع الويب الجاهزة؟' : 'Prefer cloud-based systems or ready web templates?'}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {isRtl ? 'تصفح ديمو الكاشير السحابي، المطاعم، العيادات، وموقع مدير الصيانة لايف في المتصفح' : 'Explore online cloud demos and Modir Al-Syana ready portal'}
                </p>
              </div>
              <button
                onClick={() => setPlatformTab('cloud')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span>{isRtl ? 'تصفّح الأنظمة والمواقع السحابية 🌐' : 'Browse Cloud Systems 🌐'}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-16">
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

        {/* Switch to Windows Offline Footer Banner */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div>
            <h4 className="text-sm font-black text-white">
              {isRtl ? 'ترغب في تشغيل النظام على جهازك بدون إنترنت 100%؟' : 'Need this system running 100% offline on your PC?'}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {isRtl ? 'حمّل برامج ويندوز المكتبية (ملف تثبيت واحد · تفعيل دائم بكود الجهاز عبر واتساب)' : 'Download Windows desktop installers (Single EXE · Lifetime hardware key)'}
            </p>
          </div>
          <button
            onClick={() => setPlatformTab('windows')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shrink-0 shadow-lg shadow-blue-600/20"
          >
            <Laptop className="w-4 h-4" />
            <span>{isRtl ? 'برامج ويندوز المكتبية (أوفلاين) 💻' : 'Windows Desktop Offline 💻'}</span>
          </button>
        </div>
      </div>
    )}
  </div>

      {/* ======================================================== */}
      {/* 🎬 MODAL: 20-Second Interactive Systems Showcase Tour     */}
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
              className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-white">
                      {isRtl ? 'جولة تعريفية بالمنظومة السحابية (20 ثانية)' : '20-Sec Cloud Systems Live Tour'}
                    </h3>
                    <p className="text-[11px] text-amber-400 font-bold">AM Marketing • عبد السلام</p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 20-Second Progress Indicator Bar */}
              <div className="w-full bg-slate-950 px-6 pt-3 pb-2 border-b border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-white">
                      {isRtl ? `المحطة ${tourStep + 1} من 4: ${tourStages[tourStep].badge}` : `Stage ${tourStep + 1} of 4: ${tourStages[tourStep].badge}`}
                    </span>
                  </div>
                  <span className="font-mono text-amber-400">{tourStages[tourStep].time}</span>
                </div>

                {/* 4 Steps timeline pills */}
                <div className="grid grid-cols-4 gap-2">
                  {tourStages.map((stg, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setTourStep(idx);
                        setTourPlaying(false);
                      }}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        tourStep === idx
                          ? 'bg-amber-400 ring-2 ring-amber-400/30 shadow-lg shadow-amber-400/20'
                          : tourStep > idx
                          ? 'bg-emerald-500'
                          : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Stage Visual Content */}
              <div className="p-6 sm:p-8 space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tourStep}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Stage Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950/90 border border-slate-800">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 ${tourStages[tourStep].color}`}>
                          {React.createElement(tourStages[tourStep].icon, { className: 'w-7 h-7' })}
                        </div>
                        <div className="space-y-1">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-800 border border-slate-700 text-amber-400">
                            {tourStages[tourStep].badge}
                          </span>
                          <h4 className="text-base sm:text-lg font-black text-white">
                            {tourStages[tourStep].title}
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                            {tourStages[tourStep].desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div className="grid sm:grid-cols-3 gap-3">
                      {tourStages[tourStep].highlights.map((h, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-200">
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="font-bold">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Quick Launch CTA for this stage */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => {
                          const action = tourStages[tourStep].action;
                          if (action) action();
                        }}
                        className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition-all"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>{tourStages[tourStep].ctaLabel}</span>
                      </button>

                      <a
                        href="https://wa.me/201098174992?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D8%B4%D9%81%D8%AA%20%D8%A7%D9%84%D8%AC%D9%88%D9%84%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B9%D8%B1%D9%8A%D9%81%D9%8A%D8%A9%20%D9%88%D8%A3%D9%88%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D9%86%D8%B8%D8%A7%D9%85%20%D9%84%D9%86%D8%B4%D8%A7%D8%B7%D9%8A"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-5 rounded-xl bg-slate-950 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 hover:text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <span>{isRtl ? 'طلب النظام عبر واتساب 💬' : 'Order via WhatsApp 💬'}</span>
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Tour Playback Controls & Replay */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTourPlaying(!tourPlaying)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      {tourPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 text-amber-400" />
                          <span>{isRtl ? 'إيقاف مؤقت' : 'Pause'}</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
                          <span>{isRtl ? 'تشغيل تلقائي' : 'Auto Play'}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setTourStep(0);
                        setTourPlaying(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
                      <span>{isRtl ? 'إعادة من البداية' : 'Restart'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setTourStep((prev) => (prev > 0 ? prev - 1 : 3))}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                      title={isRtl ? 'السابق' : 'Previous'}
                    >
                      {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setTourStep((prev) => (prev < 3 ? prev + 1 : 0))}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                      title={isRtl ? 'التالي' : 'Next'}
                    >
                      {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Developer / Portfolio Note */}
                <p className="text-[11px] text-center text-slate-400">
                  {isRtl
                    ? '💡 المنظومة بالكامل جاهزة ومبرمجة بواسطة عبد السلام (AM Marketing) — تسليم وتركيب ودعم فني متكامل.'
                    : '💡 All systems are turnkey-engineered by Abdel Salam (AM Marketing) — complete setup, deployment & warranty.'}
                </p>
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

      {/* ======================================================== */}
      {/* 🖥️ MODAL: Windows 11-Style License Activation Simulator  */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeModal === 'activate_sim' && (
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
              className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col font-sans"
            >
              {/* Windows 11 Title Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 select-none">
                <div className="flex items-center gap-2">
                  <img
                    src={getAssetUrl('/assets/images/am_marketing_3d_logo.jpg')}
                    alt="AM Logo"
                    className="w-4 h-4 rounded object-cover"
                  />
                  <span className="text-xs font-bold text-slate-300">
                    AM Marketing — {isRtl ? 'إدارة ترخيص وتفعيل البرنامج' : 'License Activation Manager'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-700 hover:bg-slate-600 cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-slate-700 hover:bg-slate-600 cursor-pointer" />
                  <button
                    onClick={() => setActiveModal(null)}
                    className="p-1 text-slate-400 hover:text-white hover:bg-red-500/80 rounded transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Activation Window Body */}
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <img
                    src={getAssetUrl('/assets/images/am_marketing_3d_logo.jpg')}
                    alt="AM Marketing 3D"
                    className="w-16 h-16 rounded-2xl object-cover border border-amber-400/40 shadow-lg shrink-0"
                  />
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-black text-white">
                      {isRtl ? 'منظومة AM Marketing للأجهزة المكتبية' : 'AM Marketing Desktop System'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isRtl ? 'نظام الحماية وتنشيط رخصة التشغيل' : 'Hardware Lock & Lifetime License Validator'}
                    </p>
                    <div className="pt-1">
                      {simIsActivated ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          <CheckCircle className="w-3 h-3" />
                          {isRtl ? 'مفعّل مدى الحياة (رخصة دائمة)' : 'Activated (Lifetime License)'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          <Lock className="w-3 h-3" />
                          {isRtl ? 'نسخة تجريبية (متبقي 3 أيام)' : 'Trial Mode (3 Days Remaining)'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Machine ID Box */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                    <span>{isRtl ? 'كود جهازك الفريد (Hardware Machine ID):' : 'Hardware Machine ID:'}</span>
                    <span className="text-[10px] text-amber-400">{isRtl ? 'مبني على رقم الماذربورد والمعالج' : 'Bound to motherboard UUID'}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm font-black text-amber-400 text-center tracking-wider">
                      {simMachineId}
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(simMachineId);
                        setSimCopied(true);
                        setTimeout(() => setSimCopied(false), 2000);
                      }}
                      className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      title={isRtl ? 'نسخ الكود' : 'Copy'}
                    >
                      {simCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{simCopied ? (isRtl ? 'تم النسخ!' : 'Copied!') : (isRtl ? 'نسخ' : 'Copy')}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {isRtl
                      ? '📌 انسخ هذا الكود وأرسله إلى عبد السلام على واتساب لتوليد كود التفعيل الخاص بجهازك.'
                      : '📌 Copy this code and send it to Abdel Salam on WhatsApp to receive your lifetime key.'}
                  </p>
                </div>

                {/* Activation Key Input & Actions */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">
                    {isRtl ? 'أدخل كود التفعيل (Activation Key):' : 'Enter Activation Key:'}
                  </label>
                  <input
                    type="text"
                    value={simInputKey}
                    onChange={(e) => setSimInputKey(e.target.value)}
                    placeholder="ACT-AM-XXXX-XXXX-9941"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm tracking-wider focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      if (simInputKey.trim().length > 6) {
                        setSimIsActivated(true);
                      } else {
                        alert(isRtl ? 'يرجى إدخال كود التفعيل أو الضغط على تجربة التفعيل التلقائي' : 'Please enter an activation key or try auto-demo');
                      }
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>{isRtl ? 'تفعيل البرنامج مدى الحياة 🚀' : 'Activate Lifetime License 🚀'}</span>
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSimInputKey('ACT-AM-1B88-A2F4-LIFE-9941');
                        setSimIsActivated(true);
                      }}
                      className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isRtl ? 'جرّب التفعيل التلقائي (ديمو)' : 'Auto-Fill Test Key (Demo)'}</span>
                    </button>

                    <a
                      href={`https://wa.me/201098174992?text=${encodeURIComponent(
                        `مرحباً عبد السلام، أرغب في تفعيل برنامج ويندوز. كود جهازي هو: ${simMachineId}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-xl bg-slate-950 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{isRtl ? 'طلب الكود عبر واتساب 💬' : 'Request via WhatsApp 💬'}</span>
                    </a>
                  </div>
                </div>

                {simIsActivated && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-1"
                  >
                    <h4 className="text-sm font-black text-emerald-400">
                      {isRtl ? '🎉 مبروك! تم تفعيل نسختك بنجاح مدى الحياة' : '🎉 Successfully Activated Lifetime License!'}
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      {isRtl
                        ? 'تم تثبيت الرخصة محلياً على جهازك. تم فك كل القيود والبرنامج يعمل بكامل كفاءته بدون إنترنت.'
                        : 'License verified & sealed locally. All limits unlocked, 100% offline access ready.'}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 👑 MODAL: Abdel Salam's Secret Keygen Tool                */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeModal === 'keygen' && (
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
              className="relative w-full max-w-xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col font-sans"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-white">
                      {isRtl ? 'أداة عبد السلام لتوليد مفاتيح التفعيل (Admin Keygen)' : 'Abdel Salam Activation Key Generator'}
                    </h3>
                    <p className="text-[11px] text-amber-400 font-bold">خاص بـ عبد السلام • AM Marketing</p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-1.5 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isRtl
                    ? 'ضع كود الجهاز (Machine ID) الذي أرسله لك العميل، ثم اضغط توليد الكود لإنشاء مفتاح تفعيل مشفر مرتبط بهذا الجهاز فقط.'
                    : 'Paste the client Machine ID to generate an encrypted hardware-bound activation key.'}
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      {isRtl ? 'كود جهاز العميل (Machine ID):' : 'Client Machine ID:'}
                    </label>
                    <input
                      type="text"
                      value={keygenInputMachine}
                      onChange={(e) => setKeygenInputMachine(e.target.value)}
                      placeholder="AM-9817-4F2A-88B1"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-mono text-sm tracking-wider focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      {isRtl ? 'اسم العميل / النشاط التجاري:' : 'Client / Store Name:'}
                    </label>
                    <input
                      type="text"
                      value={keygenClientName}
                      onChange={(e) => setKeygenClientName(e.target.value)}
                      placeholder="سوبر ماركت النور"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      {isRtl ? 'نوع الترخيص:' : 'License Type:'}
                    </label>
                    <select
                      value={keygenLicenseType}
                      onChange={(e) => setKeygenLicenseType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="lifetime">{isRtl ? 'رخصة تجارية دائمة مدى الحياة (Lifetime)' : 'Commercial Lifetime'}</option>
                      <option value="yearly">{isRtl ? 'اشتراك سنوي (1 سنة)' : 'Annual Subscription (1 Year)'}</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleGenerateKeygenKey}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <Key className="w-4 h-4" />
                  <span>{isRtl ? 'توليد كود التفعيل المشفر الآن ⚡' : 'Generate Encrypted Key Now ⚡'}</span>
                </button>

                {generatedKey && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400">
                        {isRtl ? 'كود التفعيل جاهز للإرسال للعميل:' : 'Generated Key Ready for Client:'}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold">100% Valid</span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center font-mono text-sm font-black text-emerald-400 tracking-wider">
                      {generatedKey}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(generatedKey);
                          setKeygenCopied(true);
                          setTimeout(() => setKeygenCopied(false), 2000);
                        }}
                        className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {keygenCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>{keygenCopied ? (isRtl ? 'تم النسخ!' : 'Copied!') : (isRtl ? 'نسخ الكود' : 'Copy Key')}</span>
                      </button>

                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(
                          `مرحباً ${keygenClientName}، إليك كود التفعيل الرسمي لبرنامجك من AM Marketing:\n\nكود التفعيل: ${generatedKey}\n\nشكراً لتعاملك مع عبد السلام (AM Marketing).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>{isRtl ? 'إرسال للعميل عبر واتساب 💬' : 'Send via WhatsApp 💬'}</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
