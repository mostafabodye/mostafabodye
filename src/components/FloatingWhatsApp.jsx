import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Send,
  X,
  Bot,
  Sparkles,
  Phone,
  ArrowUpLeft,
  Calculator,
  ChevronDown
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function FloatingWhatsApp({ lang }) {
  const isRtl = lang === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: isRtl
        ? 'أهلاً بك في وكالة AM Marketing! 🚀\nأنا مساعدك الذكي 🤖 تحت أمرك للإجابة الفورية والشاملة على كافة استفساراتك حول:\n\n• 🌐 برمجة وتطوير المواقع والمتاجر الإلكترونية\n• ⏱️ مواعيد ومدد تسليم المشاريع بدقة\n• 📢 باقات وأسعار الحملات الإعلانية والشات أدز\n• 💻 برامج الويندوز المحاسبية وأنظمة الكاشير مدى الحياة\n• 🧮 حاسبة مقايسات وتشطيب الشقق بالماركات المعتمدة\n• 💳 طرق الدفع والتقسيط والضمانات\n\nكيف يمكنني مساعدتك اليوم؟'
        : 'Welcome to AM Marketing! 🚀\nI am your 24/7 AI Smart Assistant 🤖 here to help you with:\n• Responsive Websites & E-Commerce\n• Project Delivery Timelines\n• Ad Campaigns & Chat Ads packages\n• Offline Windows POS & Accounting Software\n• Interactive Cost Estimators\n• Payment & Warranty Terms\n\nHow can I help you today?',
      time: 'الآن'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPills = isRtl ? [
    { label: '💰 باقات وأسعار المواقع', query: 'بكام عمل موقع أو متجر' },
    { label: '⏱️ مدة ووقت التسليم', query: 'يخلص في كام وقت ومدة التسليم' },
    { label: '📢 باقات الحملات الإعلانية', query: 'أسعار باقات الإعلانات والتسويق' },
    { label: '💻 برامج الكاشير والمحاسبة', query: 'برامج الكاشير والأنظمة بكام' },
    { label: '🧮 حاسبة مقايسات الشقق', query: 'حاسبة مقايسات وتفصيل التشطيب' },
    { label: '💳 طرق الدفع والتقسيط', query: 'طرق الدفع ونظام السداد' },
    { label: '🛡️ الضمان والدعم الفني', query: 'تفاصيل الضمان والدعم الفني' },
    { label: '📞 التواصل مع عبد السلام', query: 'تواصل مباشر مع عبد السلام' }
  ] : [
    { label: '💰 Website Pricing', query: 'Website development cost and pricing' },
    { label: '⏱️ Delivery Timeline', query: 'How long does a website take to build' },
    { label: '📢 Ads Packages', query: 'Ad Campaigns Packages & Pricing' },
    { label: '💻 Windows POS Hub', query: 'Windows POS Systems cost' },
    { label: '🧮 Cost Calculator', query: 'Try Cost Calculator' },
    { label: '🛡️ Warranty & Support', query: 'Warranty and support details' },
    { label: '📞 Chat with Abdel Salam', query: 'Direct WhatsApp Contact' }
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    // Add user message
    const userMsg = { sender: 'user', text: query, time: 'الآن' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate smart AI response based on rich knowledge base
    setTimeout(() => {
      const botResponse = generateBotResponse(query, isRtl);
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse.text, link: botResponse.link, time: 'الآن' }]);
      setIsTyping(false);
    }, 500);
  };

  // --- ARABIC TEXT NORMALIZATION HELPER ---
  const normalizeText = (txt) => {
    return txt
      .toLowerCase()
      .replace(/[أإآ]/g, 'ا')
      .replace(/[ة]/g, 'ه')
      .replace(/[ى]/g, 'ي')
      .replace(/[ئؤ]/g, 'ء')
      .replace(/[\u064B-\u065F]/g, '') // remove Arabic diacritics
      .trim();
  };

  // --- SMART KNOWLEDGE BASE & INTENT ENGINE ---
  const generateBotResponse = (query, isArabic) => {
    const q = normalizeText(query);
    const rawLower = query.toLowerCase();

    // 1. Target subjects detection
    const isAskingPOS = q.includes('كاشير') || q.includes('ويندوز') || q.includes('برنامج') || q.includes('برامج') || q.includes('سيستم') || q.includes('pos') || q.includes('keygen') || q.includes('محاسب');
    const isAskingFinishing = q.includes('تشطيب') || q.includes('تشطب') || q.includes('شطب') || q.includes('مقايس') || q.includes('شقه') || q.includes('ديكور') || q.includes('سيراميك') || q.includes('دهان') || q.includes('سباك') || q.includes('رخام') || q.includes('بورسلين') || q.includes('finishing');
    const isAskingWeb = q.includes('موقع') || q.includes('متجر') || q.includes('سايت') || q.includes('ويب') || q.includes('منص') || q.includes('لاندنج') || q.includes('برمج') || q.includes('مبرمج') || q.includes('store') || q.includes('web') || q.includes('site') || q.includes('landing');
    const isAskingAds = q.includes('اعلان') || q.includes('حمل') || q.includes('تسويق') || q.includes('سوشيال') || q.includes('فيسبوك') || q.includes('انستجرام') || q.includes('شات اد') || q.includes('سناب') || q.includes('تيك توك') || q.includes('ممول') || q.includes('ليد') || q.includes('ads') || q.includes('marketing');

    // 2. Action / Attribute questions
    const isAskingPrice = q.includes('بكام') || q.includes('بكم') || q.includes('سعر') || q.includes('اسعار') || q.includes('تكلف') || q.includes('فلوس') || q.includes('كام') || q.includes('ميزاني') || q.includes('price') || q.includes('cost') || q.includes('how much');
    const isAskingTime = q.includes('يخلص') || q.includes('تخلص') || q.includes('وقت') || q.includes('مده') || q.includes('مدة') || q.includes('ايام') || q.includes('يوم') || q.includes('سريع') || q.includes('تسليم') || q.includes('استلام') || q.includes('استلم') || q.includes('تستلم') || q.includes('ميعاد') || q.includes('مواعيد') || q.includes('اد ايه') || q.includes('قد ايه') || q.includes('امتى') || q.includes('متى') || q.includes('time') || q.includes('duration') || q.includes('days') || q.includes('how long');

    const isCash = (q.includes(' كاش') || q.startsWith('كاش')) && !q.includes('كاشير');
    const isAskingPayment = q.includes('دفع') || q.includes('سداد') || q.includes('تقسيط') || q.includes('اقساط') || q.includes('قسط') || q.includes('فودافون') || q.includes('انستاباي') || isCash || q.includes('بنك') || q.includes('تحويل') || q.includes('عربون') || q.includes('payment') || q.includes('installment');
    const isAskingWarranty = q.includes('ضمان') || q.includes('دعم') || q.includes('صيان') || q.includes('عطل') || q.includes('مشكل') || q.includes('باك اب') || q.includes('نسخ') || q.includes('تعديل') || q.includes('warranty') || q.includes('support');
    const isAskingPortfolio = q.includes('سابق') || q.includes('اعمال') || q.includes('شغل') || q.includes('نماذج') || q.includes('مشاريع') || q.includes('معرض') || q.includes('portfolio') || q.includes('sample');
    const isAskingLocation = q.includes('مكان') || q.includes('مقر') || q.includes('عنوان') || q.includes('فين') || q.includes('اقابلك') || q.includes('اجي') || q.includes('مقابل') || q.includes('location') || q.includes('office') || q.includes('address');
    const isAskingHosting = q.includes('استضاف') || q.includes('دومين') || q.includes('سيرفر') || q.includes('ايميل') || q.includes('hosting') || q.includes('domain');
    const isAskingContact = q.includes('عبد السلام') || q.includes('تواصل') || q.includes('واتس') || q.includes('رقم') || q.includes('اتصل') || q.includes('فون') || q.includes('موبايل') || q.includes('call') || q.includes('phone') || q.includes('contact');
    const isAskingServices = q.includes('خدمات') || q.includes('خدمه') || q.includes('بتعملو') || q.includes('بتعملوا') || q.includes('شغالين') || q.includes('مجال') || q.includes('بقدم') || q.includes('بتقدم') || q.includes('كتالوج') || q.includes('services');
    const isAskingDiscount = q.includes('خصم') || q.includes('عروض') || q.includes('عرض') || q.includes('تخفيض') || q.includes('ديسكونت') || q.includes('discount') || q.includes('offer');
    const isAskingStart = q.includes('ابدا') || q.includes('بدا') || q.includes('خطوات') || q.includes('اتعاقد') || q.includes('تعاقد') || q.includes('اشتغل معاك') || q.includes('how to start');
    const isAskingOwner = q.includes('مين انت') || q.includes('مين حضرتك') || q.includes('مين مصطفي') || q.includes('مين عبد السلام') || q.includes('مين صاحب') || q.includes('نبذه') || q.includes('عنك') || q.includes('عنكم') || q.includes('who are you') || q.includes('about');
    const isGreeting = q.includes('سلام') || q.includes('ازيك') || q.includes('مرحبا') || q.includes('اهلا') || q.includes('صباح') || q.includes('مساء') || q.includes('عامل ايه') || q.includes('hello') || q.includes('hi') || q.includes('hey');

    // --- CASE 1: DELIVERY TIMELINE (يخلص في كام وقت / هياخد كام يوم) ---
    if (isAskingTime) {
      if (isAskingWeb) {
        return {
          text: isArabic
            ? '⏱️ مدة تنفيذ وتسليم المواقع والمتاجر الإلكترونية:\n\n• 🚀 صفحات الهبوط السريعة (Landing Pages):\n  يتم تسليمها جاهزة بالكامل خلال 3 إلى 5 أيام عمل فقط!\n\n• 🏢 المواقع التعريفية للشركات والعيادات:\n  من 5 إلى 7 أيام عمل (شاملة معرض الأعمال وتهيئة SEO).\n\n• 🛒 المتاجر الإلكترونية المتكاملة (E-Commerce):\n  من 7 إلى 12 يوم عمل (شاملة لوحة التحكم، ربط بوابات الدفع فيزا وفودافون كاش، وربط شركات الشحن والتوصيل).\n\n• 🎓 المنصات التعليمية والأنظمة الخاصة:\n  من 15 إلى 25 يوم عمل حسب حجم الميزات.\n\n✅ بنلتزم بالموعد في العقد بنسبة 100% مع ضمان التسليم بدون أي تأخير!'
            : '⏱️ Website Delivery Timelines:\n\n• Landing Pages: 3 to 5 business days.\n• Corporate Websites: 5 to 7 business days.\n• E-Commerce Stores: 7 to 12 business days (including payment gateways & shipping).\n• Custom LMS Platforms: 15 to 25 business days.',
          link: {
            url: 'https://wa.me/201098174992?text=' + encodeURIComponent('مرحباً عبد السلام، أود الاستفسار عن مدة تسليم وتجهيز موقعي وبدء العمل فوراً'),
            label: isArabic ? 'تحديد موعد استلام موقعك عبر واتساب 💬' : 'Schedule Delivery on WhatsApp 💬'
          }
        };
      }

      if (isAskingAds) {
        return {
          text: isArabic
            ? '⏱️ موعد إطلاق الحملات الإعلانية والشات أدز:\n\n• ⚡ إطلاق وتفعيل الإعلانات خلال 24 إلى 48 ساعة فقط من استلام تفاصيل المنتجات والخدمات!\n• 🤖 ربط وتفعيل روبوت الشات أدز للرد الفوري على رسائل العملاء وإغلاق المبيعات في نفس اليوم!'
            : '⏱️ Ad Campaigns Launch Timeline:\n\n• Launch within 24 to 48 hours after receiving business details and creatives.',
          link: {
            url: 'https://wa.me/201098174992?text=' + encodeURIComponent('مرحباً عبد السلام، أرغب في إطلاق حملة إعلانية سريعة لزيادة المبيعات'),
            label: isArabic ? 'إطلاق حملتك الإعلانية الآن 💬' : 'Launch Ad Campaign 💬'
          }
        };
      }

      if (isAskingPOS) {
        return {
          text: isArabic
            ? '⏱️ موعد تسليم وتثبيت برامج الكاشير والمحاسبة:\n\n• ⚡ تسليم فوري وتثبيت وتوليد السيريال والأكواد للأجهزة خلال 24 ساعة فقط!\n• 📹 تدريب مسجل ومباشر لك ولطاقم العمل على استخدام السيستم بكل سهولة.'
            : '⏱️ POS Software Deployment:\n\n• Instant setup & activation within 24 hours with Hardware ID licensing.',
          link: {
            url: 'https://wa.me/201098174992?text=' + encodeURIComponent('مرحباً عبد السلام، أود تثبيت وتفعيل برنامج الكاشير فوراً'),
            label: isArabic ? 'طلب برنامج الكاشير فوراً 💻' : 'Order POS System 💻'
          }
        };
      }

      if (isAskingFinishing) {
        return {
          text: isArabic
            ? '⏱️ مدد وجداول تشطيب الشقق والوحدات:\n\n• 🏗️ تتراوح مدة التشطيب الكامل من 45 إلى 75 يوم عمل بحسب المساحة وجدول مراحل التأسيس (السباكة، الكهرباء، المحارة) والفنش النهائي (الجبسم بورد، الدهانات، السيراميك، الألوميتال) وتسليم مفتاح على أعلى مستوى!'
            : '⏱️ Apartment Finishing Timelines:\n\n• From 45 to 75 business days according to area and finishing specs.',
          link: {
            url: 'calculator.html',
            label: isArabic ? 'فتح حاسبة المقايسات ومخطط التشطيب 🧮' : 'Open Finishing Calculator 🧮'
          }
        };
      }

      // General timeline reply
      return {
        text: isArabic
          ? '⏱️ مواعيد ومدد تسليم المشاريع في AM Marketing:\n\n• 🚀 صفحات الهبوط (Landing Pages): من 3 إلى 5 أيام عمل فقط!\n• 🛒 المتاجر الإلكترونية المتكاملة: من 7 إلى 12 يوم عمل.\n• 🏢 المواقع التعريفية للشركات: من 5 إلى 7 أيام عمل.\n• 📢 إطلاق الحملات الإعلانية والشات أدز: تفعيل خلال 24 إلى 48 ساعة فقط!\n• 💻 برامج الكاشير والمحاسبة: تسليم وتثبيت فوري خلال 24 ساعة!\n• 🏗️ تشطيب الشقق والوحدات: من 45 إلى 75 يوم عمل حسب المساحة.\n\nجميع المواعيد بنلتزم بيها تعاقدياً بنسبة 100% وبند شرط جزائي للالتزام بالوقت!'
          : '⏱️ Project Delivery Timelines:\n\n• Landing Pages: 3 to 5 business days.\n• E-Commerce Stores: 7 to 12 business days.\n• Corporate Sites: 5 to 7 business days.\n• Ad Campaigns: 24 to 48 hours.\n• POS Software: Instant within 24 hours.\n• Apartment Finishing: 45 to 75 business days.',
        link: {
          url: 'https://wa.me/201098174992?text=' + encodeURIComponent('مرحباً عبد السلام، أرغب في تحديد موعد البدء ومدة تسليم مشروعي'),
          label: isArabic ? 'تحديد موعد البدء عبر واتساب 💬' : 'Schedule Start on WhatsApp 💬'
        }
      };
    }

    // --- CASE 2: WEBSITE & STORE PRICING (بكام عملا موقع / تكلفة المتجر) ---
    if (isAskingWeb) {
      return {
        text: isArabic
          ? '🌐 باقات وأسعار تصميم وبرمجة المواقع والمتاجر الإلكترونية:\n\n1️⃣ صفحة هبوط تسويقية سريعة (High-Converting Landing Page):\n   • تبدأ من 2,500 إلى 3,900 ج.م (مثالية للإعلانات، سريعة جداً مع نموذج حجز مباشر وزر واتساب وتتبع بيكسل).\n\n2️⃣ موقع تعريفي متكامل لشركة أو مكتب أو عيادة:\n   • تبدأ من 4,500 إلى 6,500 ج.م (متعدد الصفحات، معرض أعمال، تعريف بالخدمات، وتهيئة محركات البحث SEO).\n\n3️⃣ متجر إلكتروني احترافي متكامل (E-Commerce Store):\n   • تبدأ من 6,500 إلى 9,500 ج.م (لوحة تحكم عربية سهلة لإدارة المنتجات، ربط بوابات الدفع الإلكتروني فيزا وفودافون كاش، وربط الشحن الأوتوماتيكي).\n\n4️⃣ منصات تعليمية وأنظمة ويب خاصة (LMS / Custom Web Apps):\n   • تبدأ من 12,000 ج.م حسب حجم الميزات وحماية الفيديوهات ونظام الاختبارات والشهادات.\n\n🎁 جميع الباقات تشمل: استضافة سحابية فائقة السرعة + دومين رسمي مجاناً + دعم فني وصيانة مجانية لمدة 6 أشهر!'
          : '🌐 Website & E-Commerce Pricing Packages:\n\n1️⃣ Landing Page: 2,500 - 3,900 EGP ($80 - $130)\n2️⃣ Corporate / Clinic Website: 4,500 - 6,500 EGP ($150 - $210)\n3️⃣ Full E-Commerce Store: 6,500 - 9,500 EGP ($210 - $310)\n4️⃣ Custom Web Apps & LMS: Starting from 12,000 EGP ($390+)\n\n🎁 All packages include free high-speed cloud hosting, official .com domain, and free maintenance.',
        link: {
          url: 'https://wa.me/201098174992?text=' + encodeURIComponent('مرحباً عبد السلام، أود الاستفسار عن باقات وأسعار المواقع والمتاجر واختيار الأنسب لي'),
          label: isArabic ? 'طلب عرض سعر لموقعك عبر واتساب 💬' : 'Get Website Quote on WhatsApp 💬'
        }
      };
    }

    // --- CASE 3: AD CAMPAIGNS & MARKETING PRICING (بكام الاعلانات) ---
    if (isAskingAds) {
      return {
        text: isArabic
          ? '📢 باقات إدارة الحملات الإعلانية والتسويق الرقمي (AM Marketing):\n\n• 🟢 باقة الانطلاق (Starter) - 5,000 ج/شهر:\n  إدارة حملة إعلانية واحدة (Meta فيسبوك وإنستجرام) + 6 تصميمات احترافية + تتبع الرسائل.\n\n• ⭐ باقة النمو والمبيعات (Growth Pro) - 8,500 ج/شهر [الأكثر طلباً]:\n  إعلانات ممولة Meta & Google + قمع مبيعات (Funnel) + روبوت شات أدز لفلترة الزبائن في الرسائل وإغلاق البيع فوراً + تدريب فريق مبيعاتك.\n\n• 👑 باقة السيطرة والتوسع (Enterprise) - 15,000 ج/شهر:\n  فريق تسويق كامل: إدارة إعلانات Meta وGoogle وTikTok وSnapchat + فيديوهات موشن ريلز + تقارير أسبوعية ونسبة ROAS قياسية!\n\n🎯 ميزانية الإعلانات تحددها بنفسك بحسب حجم السوق وهدف مبيعاتك اليومي.'
          : '📢 Ad Campaign Management Packages:\n\n• Starter Package: 5,000 EGP/mo (Meta Ads + 6 creatives + DM tracking)\n• Growth Pro [Most Popular]: 8,500 EGP/mo (Meta + Google + Sales Funnel + Chat Ads Bot + Sales Team Training)\n• Enterprise Scaling: 15,000 EGP/mo (Full agency team across Meta, Google, TikTok, Reels & Motion Graphics).',
        link: {
          url: 'https://wa.me/201098174992?text=' + encodeURIComponent('مرحباً عبد السلام، أود حجز باقة إعلانية لتكبير مبيعات مشروعي'),
          label: isArabic ? 'حجز باقة إعلانية عبر واتساب 💬' : 'Book Ad Package on WhatsApp 💬'
        }
      };
    }

    // --- CASE 4: DESKTOP POS & KEYGEN SYSTEMS (برنامج الكاشير بكام) ---
    if (isAskingPOS) {
      return {
        text: isArabic
          ? '💻 أسعار وتفاصيل برامج الويندوز والمحاسبة (AM Systems):\n\n✅ ميزة حصرية كبرى: البرنامج ملكك مدى الحياة بضمان دائم، بدون أي اشتراكات شهرية أو سنوية!\n\n• 🛒 برنامج نقاط البيع والكاشير للمحلات والسوبرماركت (Retail POS): يبدأ من 2,500 ج.م.\n• 🍽️ برنامج إدارة المطاعم والكافيهات (شاشات مطبخ وديليفري وطاولات): يبدأ من 3,000 ج.م.\n• 🏥 برنامج إدارة العيادات والمراكز الطبية وملفات المرضى: يبدأ من 3,500 ج.م.\n• 📦 برنامج إدارة المخازن والمبيعات وحسابات الموردين: يبدأ من 2,900 ج.م.\n\n🔒 مدمج مع البرامج نظام أمان متطور برقم بصمة الجهاز (Hardware ID) وكود تفعيل رسمي Serial Keygen لكل جهاز.'
          : '💻 AM Desktop Systems & POS Pricing:\n\n✅ Lifetime ownership license — Zero monthly or yearly renewal fees!\n\n• Retail POS Software: from 2,500 EGP ($80)\n• Restaurant & Cafe Management: from 3,000 EGP ($100)\n• Clinic & Medical Center System: from 3,500 EGP ($115)\n• Inventory & Warehouse Manager: from 2,900 EGP ($95)\n\n🔒 Includes Hardware ID licensing generator and automated offline backup.',
        link: {
          url: '#systems-hub',
          label: isArabic ? 'تصفح منصة برامج الويندوز والكاشير 💻' : 'Explore Windows Systems Hub 💻'
        }
      };
    }

    // --- CASE 5: FINISHING & APARTMENT ESTIMATOR (اسعار ومقايسة التشطيب) ---
    if (isAskingFinishing) {
      return {
        text: isArabic
          ? '🏗️ أسعار ومقايسات تشطيب الشقق والديكور بالماركات المعتمدة:\n\nيمكنك حساب تكلفتك بالمتر واختيار الماركات بنفسك فوراً عبر حاسبة المقايسات الذكية على موقعنا:\n• 🔹 تشطيب اقتصادي: حوالي 3,200 ج.م / م² (سيراميك كليوباترا، دهانات سيبس، أسلاك معتمدة).\n• 🔹 سوبر لوكس بلس [الأكثر طلباً]: حوالي 4,800 ج.م / م² (سيراميك الجوهرة، سلك السويدي، جوتن فينوماستيك، بيت نور جبسم بورد كناوف).\n• 🔹 الترا لوكس VIP: حوالي 6,900 ج.م / م² (بورسلين إسباني، أطقم جروهي دفن، دهانات ليدي، بديل رخام وخشب، ألوميتال جامبو عازل).\n\n📏 بنقدملك معاينة هندسية ورفع مقاسات وتحديد التكلفة الدقيقة لشقتك داخل القاهرة والجيزة!'
          : '🏗️ Apartment Finishing & Renovation Pricing:\n\n• Economy Lux: ~3,200 EGP/sqm (Cleopatra ceramics, Sipes paint)\n• Super Lux Plus: ~4,800 EGP/sqm (Gawhara ceramics, El Sewedy wiring, Jotun Fenomastic, Knauf gypsum board)\n• Ultra Lux VIP: ~6,900 EGP/sqm (Spanish porcelain, Grohe concealed sets, Lady velvet paint, Jumbo soundproof aluminum).\n\nTry our live interactive finishing builder below 👇',
        link: {
          url: 'calculator.html',
          label: isArabic ? 'فتح حاسبة مقايسة الشقق فوراً 🧮' : 'Open Finishing Calculator 🧮'
        }
      };
    }

    // --- CASE 6: WARRANTY & AFTER-SALE SUPPORT (الضمان والصيانة) ---
    if (isAskingWarranty) {
      return {
        text: isArabic
          ? '🛡️ الضمان والدعم الفني وخدمات ما بعد التسليم:\n\n• 🔒 ضمان برمجي كامل لمدة عام كامل ضد أي أخطاء برمجية مع إصلاحها فوراً بدون أي تكلفة إضافية.\n• 🛠️ دعم فني وصيانة مجانية لمدة 3 إلى 6 أشهر تشمل التحديثات والتعديلات البسيطة.\n• 💾 نسخ احتياطي تلقائي (Auto Cloud Backup) يومي وأسبوعي لحماية بياناتك ومبيعاتك من أي فقدان.\n• 📹 تدريب مسجل بالفيديو لشرح كيفية إدارة لوحة التحكم بنفسك وبكل سهولة من الموبايل أو الكمبيوتر!'
          : '🛡️ Warranty & After-Sale Support:\n\n• 1-Year full software warranty against bugs with immediate fixes.\n• 3 to 6 months of free technical support and maintenance.\n• Automated daily/weekly cloud backups for data safety.\n• Recorded video training for managing your dashboard effortlessly.',
        link: {
          url: 'https://wa.me/201098174992?text=' + encodeURIComponent('مرحباً عبد السلام، أود الاستفسار عن تفاصيل الضمان والدعم الفني لمشروعي'),
          label: isArabic ? 'التحدث مع الدعم الفني عبر واتساب 💬' : 'Chat with Support on WhatsApp 💬'
        }
      };
    }

    // --- CASE 7: PAYMENT METHODS & INSTALLMENTS (طرق الدفع والتقسيط) ---
    if (isAskingPayment) {
      return {
        text: isArabic
          ? '💳 طرق الدفع ونظام السداد في AM Marketing:\n\n• 🤝 نظام الدفعات للمواقع والمشاريع البرمجية:\n  - 50% دفعة أولى عند التعاقد والبدء في التنفيذ.\n  - 25% بعد مراجعة النسخة التجريبية الأولى واعتماد التعديلات.\n  - 25% المتبقية عند التسليم النهائي وتفعيل النطاق الرسمي.\n\n• 📲 وسائل التحويل المعتمدة:\n  - إنستاباي (InstaPay) فوري.\n  - فودافون كاش / أورنج كاش / اتصالات كاش.\n  - تحويل بنكي رسمي (CIB / QNB / البنك الأهلي).\n  - أو كاش عند المقابلة المباشرة وتوقيع العقد في القاهرة والجيزة.'
          : '💳 Payment Methods & Installment Plans:\n\n• Milestones: 50% upfront upon contract, 25% upon demo review, and 25% upon final deployment.\n• Accepted methods: InstaPay, Vodafone Cash, Official Bank Transfer (CIB/QNB), and Cash on delivery.',
        link: {
          url: 'https://wa.me/201098174992?text=' + encodeURIComponent('مرحباً عبد السلام، أود الاستفسار عن نظام الدفع وبدء المشروع'),
          label: isArabic ? 'تأكيد طريقة السداد عبر واتساب 💬' : 'Confirm Payment on WhatsApp 💬'
        }
      };
    }

    // --- CASE 8: GENERAL PRICING QUESTION (بكام / الأسعار) ---
    if (isAskingPrice) {
      return {
        text: isArabic
          ? '💰 أسعار خدمات AM Marketing باختصار:\n\n1. 🌐 المواقع والمتاجر: تبدأ من 2,500 ج.م لصفحات الهبوط وحتى 9,500 ج.م للمتاجر المتكاملة.\n2. 📢 باقات الإعلانات والتسويق: 5,000 ج (انطلاق) / 8,500 ج (نمو وشات أدز) / 15,000 ج (سيطرة).\n3. 💻 برامج الكاشير والمحاسبة: تبدأ من 2,500 ج.م ترخيص مدى الحياة بدون اشتراكات.\n4. 🏗️ تشطيب الشقق والمقاولات: يبدأ من 3,200 ج/م² حتى 6,900 ج/م² بالماركات المعتمدة.\n\nأخبرني بنوع الخدمة التي تود معرفة تفاصيلها بدقة وسأساعدك فوراً!'
          : '💰 Quick Pricing Overview:\n\n1. Websites & Stores: from 2,500 to 9,500 EGP.\n2. Ads & Social Media Management: 5,000 / 8,500 / 15,000 EGP monthly.\n3. Desktop POS Software: from 2,500 EGP (Lifetime license, no monthly fees).\n4. Apartment Finishing: 3,200 to 6,900 EGP/sqm.\n\nWhich service would you like specific details about?',
        link: {
          url: 'calculator.html',
          label: isArabic ? 'استخدم حاسبة التسعير التفاعلية 🧮' : 'Use Interactive Calculator 🧮'
        }
      };
    }

    // --- CASE 9: SERVICES CATALOG (بتعملوا ايه / الخدمات) ---
    if (isAskingServices) {
      return {
        text: isArabic
          ? '🚀 خدمات وحلول AM Marketing المتكاملة:\n\n1️⃣ 🌐 برمجة وتطوير المواقع والمتاجر التفاعلية:\n   صفحات هبوط تسويقية، مواقع شركات ومكاتب، متاجر إلكترونية ببوابات دفع وشحن، ومنصات تعليمية.\n\n2️⃣ 📢 إدارة الحملات الإعلانية الممولة وبوتات الشات أدز:\n   فيسبوك، جوجل، إنستجرام، وتيك توك مع قمع مبيعات ذكي لمضاعفة الليدات والمبيعات.\n\n3️⃣ 💻 أنظمة الويندوز والكاشير والمحاسبة (AM Systems):\n   برامج للمحلات والمطاعم والعيادات والمخازن ملكك مدى الحياة بدون اشتراكات.\n\n4️⃣ 🧮 حاسبة مقايسات وتشطيب الشقق والديكور:\n   حساب تكلفة المتر واختيار الماركات بالكامل وتوليد مقايسة تفصيلية معتمدة.\n\nعن أي خدمة تود معرفة تفاصيلها الآن؟'
          : '🚀 AM Marketing Core Services:\n\n1. High-speed Websites & E-Commerce\n2. Targeted Ad Campaigns & Chat Ads Automation\n3. Windows POS & Cashier Software (Lifetime license)\n4. Interactive Apartment Finishing Cost Estimators.\n\nWhich service would you like to know more about?',
        link: {
          url: '#services',
          label: isArabic ? 'استعراض كافة الخدمات 🚀' : 'Explore All Services 🚀'
        }
      };
    }

    // --- CASE 10: DISCOUNTS & OFFERS (العروض والخصومات) ---
    if (isAskingDiscount) {
      return {
        text: isArabic
          ? '🎁 العروض والخصومات الحالية في AM Marketing:\n\n• 🏷️ خصم فوري 15% على برمجة المواقع والمتاجر الإلكترونية عند التعاقد خلال هذا الأسبوع.\n• 🌐 دومين رسمي (.com) + استضافة سريعة مشفرة بـ SSL مجاناً بالكامل للسنة الأولى.\n• ⭐ خصم خاص يصل إلى 25% عند دمج خدمة تصميم الموقع مع باقة إدارة الحملات الإعلانية!\n\nتواصل معنا الآن لتثبيت الخصم وحجزه لمشروعك!'
          : '🎁 Current Special Offers:\n\n• 15% discount on websites and e-commerce stores.\n• Free official .com domain + high-speed cloud hosting for the 1st year.\n• Up to 25% off when combining Web Development with Ad Campaigns.',
        link: {
          url: 'https://wa.me/201098174992?text=' + encodeURIComponent('مرحباً عبد السلام، أرغب في الاستفادة من خصم الـ 15% وعروض الباقات لمشروعي'),
          label: isArabic ? 'تثبيت الخصم عبر واتساب 💬' : 'Claim Discount on WhatsApp 💬'
        }
      };
    }

    // --- CASE 11: HOW TO START / ONBOARDING (خطوات الشغل وازاي ابدأ) ---
    if (isAskingStart) {
      return {
        text: isArabic
          ? '🚀 خطوات البدء والتعاقد مع AM Marketing بسيطة وسريعة:\n\n1️⃣ بنتفق هاتفياً أو عبر واتساب على تفاصيل مشروعك ونوع الباقة الأنسب لك.\n2️⃣ بنرسل لك تفاصيل التعاقد وفاتورة رسمية لتأكيد الدفعة الأولى (50%).\n3️⃣ بنبدأ العمل فوراً وبنشاركك نسخة تجريبية لايف للمعاينة وإبداء أي ملاحظات وتعديلات.\n4️⃣ بعد اعتمادك، بنسلمك كافة بيانات الاستضافة والدومين ولوحة التحكم مع فيديو شرح تدريبي كامل لك ولطاقمك!\n\nجاهز للبدء الآن؟ اضغط الزر بالأسفل لننطلق فوراً!'
          : '🚀 How to get started:\n\n1. We discuss your project scope & choose the best package.\n2. Confirm the 50% milestone payment.\n3. We develop and share a live demo for your feedback.\n4. Final deployment with full credentials and training videos.',
        link: {
          url: 'https://wa.me/201098174992?text=' + encodeURIComponent('مرحباً عبد السلام، أنا جاهز لبدء المشروع وأود بدء الخطوات الرسمية'),
          label: isArabic ? 'البدء في المشروع فوراً عبر واتساب 💬' : 'Start Project on WhatsApp 💬'
        }
      };
    }

    // --- CASE 12: ABOUT OWNER & AGENCY (عن مصطفى عبد السلام) ---
    if (isAskingOwner) {
      return {
        text: isArabic
          ? '👤 نبذة عن مصطفى عبد السلام ووكالة AM Marketing:\n\n• 💼 مصطفى عبد السلام: مطوّر ويب متكامل (Full-Stack)، خبير نمو رقمي وإعلانات ممولة، وصانع أنظمة وأتمتة بالذكاء الاصطناعي.\n• 🚀 مؤسس وكالة AM Marketing للحلول البرمجية والتسويقية، بخبرة عملية في قيادة حملات إعلانية وتطوير منصات برمجية وأنظمة كاشير في مصر ودول الخليج العربي.\n• 🎯 شعارنا دائماً: دقة في التسليم، احترافية في الكود، ونتائج بيعية ملموسة تعود عليك بأعلى عائد استثماري (ROAS)!'
          : '👤 About Mostafa Abdel Salam & AM Marketing:\n\n• Mostafa Abdel Salam: Full-Stack Developer, Digital Growth & Ads Strategist, and AI Systems Builder.\n• Founder of AM Marketing Agency, serving businesses across Egypt and GCC with cutting-edge tech and high-converting marketing.',
        link: {
          url: 'https://wa.me/201098174992',
          label: isArabic ? 'تواصل مع مصطفى عبد السلام 💬' : 'Contact Mostafa Abdel Salam 💬'
        }
      };
    }

    // --- CASE 13: PORTFOLIO & WORK SAMPLES (سابقة أعمال / نماذج) ---
    if (isAskingPortfolio) {
      return {
        text: isArabic
          ? '🌟 سابقة أعمال وقصص نجاح AM Marketing:\n\nنفخر بتنفيذ عشرات المشاريع المتطورة في مصر ودول الخليج:\n• 💻 أنظمة الذكاء الاصطناعي: روبوتات الشات الذكية (NexusBot) ومنظومات أتمتة الإعلانات وتوليد العملاء (LeadScout) وصناعة المحتوى (ViralForge).\n• 🌐 المواقع والمتاجر: مواقع شركات عقارية، ومتاجر تجزئة نشطة، ومنصات تعليمية سريعة.\n• 📢 الحملات الإعلانية: تحقيق ملايين المشاهدات وآلاف الليدات المؤهلة لشركات تشطيب ومراكز طبية وشركات عقارات.\n• 🖥️ برامج الكاشير: أنظمة تعمل في مئات المحلات والمطاعم والعيادات أوفلاين باستقرار 100%.\n\nيمكنك تصفح معرض المشاريع كاملاً على هذه الصفحة في قسم "معرض الأعمال"!'
          : '🌟 Our Portfolio & Case Studies:\n\n• AI Systems: NexusBot, LeadScout scraper, ViralForge repurposer.\n• Web & E-Commerce: High-speed stores, booking platforms, corporate portals.\n• Ad Campaigns: Multi-million reach with industry-leading ROAS.\n• Desktop POS: Hundreds of retail, restaurant, and clinic installations.',
        link: {
          url: '#projects',
          label: isArabic ? 'مشاهدة معرض الأعمال والنتائج 🚀' : 'Explore Portfolio Projects 🚀'
        }
      };
    }

    // --- CASE 14: LOCATION & MEETINGS (مكانكم فين / المقابلات) ---
    if (isAskingLocation) {
      return {
        text: isArabic
          ? '📍 مقر AM Marketing والاجتماعات المباشرة:\n\n• 🏙️ مقرنا: القاهرة والجيزة، مصر.\n• 🤝 المقابلات المباشرة (In-Person Meetings):\n  متاح ترتيب جلسة عمل شخصية في مكتبك أو في مقر العمل لمناقشة تفاصيل العقود والمشاريع داخل القاهرة والجيزة.\n• 🌐 الخدمة عن بُعد (Online):\n  نقدم خدماتنا لكافة محافظات مصر ولعملائنا الكرام في السعودية والإمارات والكويت والخليج العربي عبر اجتماعات Zoom وواتساب بدقة واحترافية متناهية.\n\nيسعدنا تشريفك والتعاون معك في أي وقت!'
          : '📍 Office Location & In-Person Meetings:\n\n• Location: Cairo & Giza, Egypt.\n• In-person meetings available across Cairo & Giza for project kickoff and contracts.\n• Remote full-service for clients across GCC via Zoom and WhatsApp.',
        link: {
          url: 'https://wa.me/201098174992?text=' + encodeURIComponent('مرحباً عبد السلام، أود تنسيق موعد مقابلة واجتماع لمناقشة مشروعي'),
          label: isArabic ? 'تنسيق موعد اجتماع عبر واتساب 💬' : 'Book a Meeting on WhatsApp 💬'
        }
      };
    }

    // --- CASE 15: HOSTING & DOMAIN (الاستضافة والدومين) ---
    if (isAskingHosting) {
      return {
        text: isArabic
          ? '🌐 خدمات الاستضافة السحابية وحجز الدومينات:\n\n• ⚡ استضافة سريعة جداً (Cloud Hosting): سيرفرات فائقة السرعة مع معدل تشغيل 99.9% uptime.\n• 🔒 شهادة أمان SSL مجانية مشفرة: لتأمين بيانات موقعك وظهور القفل الأخضر لزوّارك.\n• 🏷️ دومين رسمي معتمد (.com / .net / .org): يتم حجزه وتسجيله باسمك بالكامل.\n• ✉️ إيميلات رسمية للشركة (Business Emails): مثل info@yourcompany.com للتواصل الرسمي مع عملائك.'
          : '🌐 Cloud Hosting & Domain Services:\n\n• Ultra-fast cloud SSD hosting with 99.9% uptime.\n• Free SSL security certificate included.\n• Official .com domain registration in your name.\n• Custom business email accounts.',
        link: {
          url: 'https://wa.me/201098174992?text=' + encodeURIComponent('مرحباً عبد السلام، أرغب في حجز استضافة ودومين رسمي لموقعي'),
          label: isArabic ? 'طلب استضافة ودومين عبر واتساب 💬' : 'Get Hosting & Domain on WhatsApp 💬'
        }
      };
    }

    // --- CASE 16: DIRECT CONTACT (عبد السلام / رقم الهاتف) ---
    if (isAskingContact) {
      return {
        text: isArabic
          ? '📞 التواصل المباشر مع مصطفى عبد السلام:\n\n• 📱 هاتف وواتساب: 01098174992 (+201098174992)\n• 🕒 المواعيد: متاح للرد على استفساراتكم وحجز الجلسات الاستشارية والمشاريع على مدار الساعة.\n\nيمكنك النقر على الزر أدناه لبدء المحادثة معه فوراً عبر الواتساب 👇'
          : '📞 Direct Contact with Mostafa Abdel Salam:\n\n• Phone & WhatsApp: +201098174992\n• Available 24/7 for strategy consultations and project onboarding.\n\nClick below to open WhatsApp chat directly 👇',
        link: {
          url: 'https://wa.me/201098174992?text=' + encodeURIComponent('مرحباً عبد السلام، أود التحدث معك مباشرة بخصوص مشروع جديد'),
          label: isArabic ? 'فتح شات واتساب مع عبد السلام الآن 💬' : 'Open WhatsApp with Abdel Salam 💬'
        }
      };
    }

    // --- CASE 17: GREETINGS (السلام عليكم / أهلاً) ---
    if (isGreeting) {
      return {
        text: isArabic
          ? 'أهلاً وسهلاً بك! 👋 سعيد جداً بتواصلك معي.\nأنا المساعد الذكي لوكالة AM Marketing (بإشراف مصطفى عبد السلام).\n\nأنا هنا للإجابة فوراً وبدقة على كافة أسئلتك حول:\n• 🌐 أسعار وباقات المواقع والمتاجر الإلكترونية\n• ⏱️ مواعيد ومدد تسليم المشاريع بدقة\n• 📢 باقات الحملات الإعلانية والشات أدز\n• 💻 برامج الكاشير والمحاسبة بدون أي اشتراكات\n• 🧮 حاسبة مقايسات الشقق والتشطيبات\n• 💳 طرق الدفع والتقسيط والضمانات\n\nتفضل بسؤالك أو استفسارك وسأجيبك في ثوانٍ! 😊'
          : 'Hello and welcome! 👋 I am your AM Marketing Smart Assistant.\n\nI am here to answer your questions about:\n• Web & E-Commerce development & pricing 🌐\n• Delivery timelines ⏱️\n• Ad campaigns & Chat Ads packages 📢\n• Windows POS software & offline cashier systems 💻\n• Interactive Cost Estimators 🧮\n\nFeel free to ask any question!',
        link: {
          url: 'https://wa.me/201098174992',
          label: isArabic ? 'محادثة عبد السلام مباشرة عبر واتساب 🟢' : 'Direct WhatsApp Contact 🟢'
        }
      };
    }

    // --- DEFAULT SMART HELPFUL FALLBACK ---
    return {
      text: isArabic
        ? `أهلاً بك يا فندم! بخصوص سؤالك عن "${query}":\n\nأنا جاهز للإجابة الفورية والشاملة على استفسارك. يمكنك إخباري بمزيد من التفاصيل، أو اختيار أحد الأقسام التالية لمعرفة كافة التفاصيل فوراً:\n\n1️⃣ 🌐 أسعار ومدد تسليم المواقع والمتاجر (من 2,500 ج.م وتسليم 3-5 أيام).\n2️⃣ ⏱️ مواعيد التسليم لجميع الخدمات البرمجية والإعلانية.\n3️⃣ 📢 باقات الحملات الإعلانية الممولة والشات أدز.\n4️⃣ 💻 برامج الكاشير والأنظمة المحاسبية للويندوز ترخيص دائم.\n5️⃣ 💳 طرق الدفع والتقسيط وشهادات الضمان.\n\nأو يمكنك التحدث مباشرة مع مصطفى عبد السلام هاتفياً أو عبر الواتساب بضغطة زر واحدة 👇`
        : `Happy to help with your inquiry regarding "${query}":\n\nFeel free to specify details or choose from our top services below, or chat directly with Mostafa Abdel Salam on WhatsApp 👇`,
      link: {
        url: 'https://wa.me/201098174992?text=' + encodeURIComponent(`مرحباً عبد السلام، استفسار عبر البوت: ${query}`),
        label: isArabic ? 'متابعة الاستفسار عبر واتساب 💬' : 'Continue on WhatsApp 💬'
      }
    };
  };

  return (
    <div className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-50 flex flex-col items-end`}>
      
      {/* Interactive AI Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.25 }}
            className="mb-4 w-[360px] sm:w-[410px] max-w-[92vw] h-[530px] max-h-[82vh] bg-slate-950/95 backdrop-blur-2xl border-2 border-emerald-500/50 rounded-3xl shadow-2xl shadow-emerald-500/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 shadow-md">
                    <Bot className="w-6 h-6 fill-slate-950" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                    <span>{isRtl ? 'مساعد AM Marketing الذكي' : 'AM Marketing AI Bot'}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold">v3.5 Pro ⚡</span>
                  </h4>
                  <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>{isRtl ? 'متصل الآن 24/7 • إجابات فورية ذكية' : 'Online 24/7 • Instant Answers'}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
                  title={isRtl ? 'إغلاق المحادثة' : 'Close chat'}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Pills Bar */}
            <div className="px-3 py-2 bg-slate-900/60 border-b border-slate-800/80 overflow-x-auto no-scrollbar flex gap-1.5 shrink-0">
              {quickPills.map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(pill.query)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-slate-700/60 hover:border-emerald-500/40 text-[11px] font-bold whitespace-nowrap transition cursor-pointer"
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-slate-200">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 shadow-md leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    
                    {msg.link && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800">
                        <a
                          href={msg.link.url}
                          target={msg.link.url.startsWith('http') || msg.link.url.endsWith('.html') ? '_blank' : '_self'}
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-[11px] shadow-md transition"
                        >
                          <span>{msg.link.label}</span>
                          <ArrowUpLeft className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-500 px-1 mt-1">{msg.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-slate-400 text-xs bg-slate-900/80 px-3 py-2 rounded-xl w-fit border border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] text-slate-400 mr-1">{isRtl ? 'المساعد الذكي يكتب...' : 'AI Bot typing...'}</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input & Send Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isRtl ? 'اكتب سؤالك أو استفسارك هنا...' : 'Type your question here...'}
                className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                title={isRtl ? 'إرسال' : 'Send'}
              >
                <Send className="w-4 h-4 fill-slate-950" />
              </button>
            </form>

            {/* Quick WhatsApp Handoff Footer */}
            <div className="px-3 py-2 bg-slate-950 border-t border-slate-900 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">
                {isRtl ? 'تحويل للمبيعات مباشرة:' : 'Direct Sales Chat:'}
              </span>
              <a
                href="https://wa.me/201098174992?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%8A%D8%A7%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%83%20%D9%85%D8%A8%D8%A7%D8%B4%D8%B1%D8%A9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>واتساب 01098174992</span>
                <Phone className="w-3 h-3" />
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Main Launcher Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black px-4 py-3 rounded-full shadow-2xl shadow-emerald-500/40 border-2 border-emerald-300 transition-all cursor-pointer"
        aria-label="Open AI Assistant Chat"
      >
        <div className="relative">
          <Bot className="w-6 h-6 fill-slate-950" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
        </div>
        <div className="flex flex-col text-right leading-tight">
          <span className="text-xs font-black">
            {isRtl ? 'المساعد الذكي' : 'AI Assistant'}
          </span>
          <span className="text-[10px] font-bold text-slate-900/80">
            {isRtl ? 'اسأل واستفسر فوراً 💬' : 'Ask Anything 24/7 💬'}
          </span>
        </div>
      </motion.button>

    </div>
  );
}
