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
        ? 'أهلاً بك في وكالة AM Marketing! 🚀\nأنا مساعدك الذكي 🤖 تحت أمرك للإجابة على استفساراتك فوراً حول:\n• باقات وأسعار الحملات الإعلانية والشات أدز\n• برمجة المواقع والمتاجر التفاعلية\n• حاسبة المقايسات وصيد العملاء\n• برامج الويندوز المحاسبية وأنظمة الكاشير\n\nكيف يمكنني مساعدتك اليوم؟'
        : 'Welcome to AM Marketing! 🚀\nI am your 24/7 AI Smart Assistant 🤖 here to help you with:\n• Ad Campaigns & Chat Ads packages\n• Responsive Websites & E-Commerce\n• Interactive Cost Calculators\n• Offline Windows POS & Keygen Systems\n\nHow can I help you today?',
      time: 'الآن'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPills = isRtl ? [
    { label: '💰 باقات وأسعار الإعلانات', query: 'باقات وأسعار الإعلانات' },
    { label: '🌐 تصميم موقع أو متجر', query: 'تكلفة تصميم وبرمجة موقع' },
    { label: '🧮 حاسبة المقايسات التفاعلية', query: 'تجربة حاسبة المقايسات' },
    { label: '💻 برامج الويندوز والكاشير', query: 'برامج الكاشير والأنظمة' },
    { label: '📞 حجز استشارة مع عبد السلام', query: 'تواصل مباشر مع عبد السلام' }
  ] : [
    { label: '💰 Ads Packages & Pricing', query: 'Ads Packages & Pricing' },
    { label: '🌐 Web & Store Development', query: 'Website Development Cost' },
    { label: '🧮 Live Cost Calculator', query: 'Try Cost Calculator' },
    { label: '💻 Windows POS Software', query: 'Windows POS Systems' },
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

    // Simulate smart AI response based on knowledge base
    setTimeout(() => {
      const botResponse = generateBotResponse(query, isRtl);
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse.text, link: botResponse.link, time: 'الآن' }]);
      setIsTyping(false);
    }, 700);
  };

  const generateBotResponse = (query, isArabic) => {
    const q = query.toLowerCase();

    if (q.includes('حاسب') || q.includes('مقايس') || q.includes('calc') || q.includes('cost')) {
      return {
        text: isArabic
          ? '🧮 حاسبة المقايسات التفاعلية هي أحدث أدواتنا لصيد العملاء في 4 مجالات كبرى:\n1. تشطيبات وديكور (بالمتر المربع)\n2. أقساط عقارية ومقدمات\n3. عيادات وتجميل وخصومات مجمعة\n4. باقات إدارة السوشيال ميديا\n\nتقدر تجربها لايف بالضغط على الزر أدناه 👇'
          : '🧮 Our Interactive Cost Calculator features 4 high-converting verticals: Finishing, Real Estate, Clinics, and Marketing retainers. You can try the live tool directly below 👇',
        link: { url: 'calculator.html', label: isArabic ? 'تشغيل الحاسبة التفاعلية لايف 🧮' : 'Open Live Calculator 🧮' }
      };
    }

    if (q.includes('إعلان') || q.includes('حمل') || q.includes('شات') || q.includes('ads') || q.includes('campaign')) {
      return {
        text: isArabic
          ? '📢 منظومة إدارة الحملات الإعلانية في AM Marketing:\n• إدارة حملات Meta (فيسبوك وإنستجرام)، Google Search & YouTube، Snapchat، وTikTok.\n• روبوتات Chat Ads لفلترة العملاء وإغلاق المبيعات في الرسائل فوراً.\n• تبدأ الباقات الشهرية من 2,500 ج.م مع متابعة وإحصائيات يومية ونسبة ROAS قياسية.'
          : '📢 AM Marketing Ad Campaign Management:\n• Meta (Facebook & IG), Google Search, Snapchat & TikTok Ads.\n• Automated Chat Ads to close sales inside DMs.\n• Retainers start from 2,500 EGP / $80 with real-time KPI dashboards.',
        link: { url: 'https://wa.me/201098174992?text=' + encodeURIComponent('مرحباً عبد السلام، أرغب في الاستفسار عن باقات الحملات الإعلانية والشات أدز'), label: isArabic ? 'طلب باقة إعلانية عبر واتساب 💬' : 'Order Ad Package on WhatsApp 💬' }
      };
    }

    if (q.includes('موقع') || q.includes('متجر') || q.includes('منص') || q.includes('web') || q.includes('store') || q.includes('lms')) {
      return {
        text: isArabic
          ? '🌐 تطوير المواقع والمتاجر والمنصات التعليمية:\n• برمجة مواقع سريعة وفائقة الأمان.\n• متوافقة 100% مع جميع الأجهزة (موبايل، تابلت، كمبيوتر).\n• لوحة تحكم عربية سهلة لإدارة المنتجات والطلبات بدون أي تعقيد.\n• تسليم كامل مع استضافة ودومين رسمي وربط بوابات الدفع.'
          : '🌐 Full-Stack Web & E-Commerce Development:\n• 100% Responsive on Mobile, Tablet & Desktop.\n• Custom admin dashboards, payment gateway integration, and high SEO speed.',
        link: { url: 'https://wa.me/201098174992?text=' + encodeURIComponent('مرحباً عبد السلام، أرغب في تفاصيل وأسعار برمجة موقع أو متجر إلكتروني'), label: isArabic ? 'استشارة برمجة موقعك عبر واتساب 💬' : 'Consult Web Project on WhatsApp 💬' }
      };
    }

    if (q.includes('ويندوز') || q.includes('كاشير') || q.includes('pos') || q.includes('برامج') || q.includes('تفعيل') || q.includes('keygen')) {
      return {
        text: isArabic
          ? '💻 منصة برامج الويندوز التجارية (AM Systems):\n• 5 برامج سطح مكتب تعمل أوفلاين بدون إنترنت (كاشير، مطاعم وكافيهات، عيادات، إدارة مخازن، شؤون موظفين HR).\n• مدمج معها نظام حماية متطور ببصمة الجهاز Hardware ID وتوليد كود تفعيل Serial Keygen رسمي لكل عميل.'
          : '💻 AM Desktop Systems Hub:\n• 5 offline Windows applications (Retail POS, Restaurant, Clinic, Inventory, HR).\n• Hardware ID licensing with official Serial Keygen generator.',
        link: { url: '#systems-hub', label: isArabic ? 'تصفح منصة برامج الويندوز 💻' : 'Explore Windows Systems Hub 💻' }
      };
    }

    if (q.includes('تواصل') || q.includes('واتس') || q.includes('رقم') || q.includes('phone') || q.includes('call') || q.includes('contact')) {
      return {
        text: isArabic
          ? '📞 يمكنك التواصل المباشر مع مصطفى عبد السلام عبر:\n• هاتف / واتساب: 01098174992 (+201098174992)\n• متاح للرد على استفساراتكم وحجز المعاينات وجلسات الاستشارة على مدار الساعة.'
          : '📞 Direct Contact with Mostafa Abdel Salam:\n• Phone / WhatsApp: +201098174992\n• Available 24/7 for strategy consultations and project orders.',
        link: { url: 'https://wa.me/201098174992', label: isArabic ? 'فتح محادثة واتساب الآن 🟢' : 'Open WhatsApp Now 🟢' }
      };
    }

    // Default smart fallback
    return {
      text: isArabic
        ? 'يسعدنا خدمتك! للإجابة الدقيقة على هذا الاستفسار وتحديد تفاصيل مشروعك، يمكنك التواصل فوراً مع عبد السلام عبر واتساب مباشرة بضغطة زر واحدة 👇'
        : 'We would love to help you! To get personalized details and discuss your project, contact Abdel Salam directly on WhatsApp 👇',
      link: { url: 'https://wa.me/201098174992?text=' + encodeURIComponent(`مرحباً عبد السلام، استفسار عبر البوت: ${query}`), label: isArabic ? 'متابعة الاستفسار عبر واتساب 💬' : 'Continue on WhatsApp 💬' }
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
            className="mb-4 w-[360px] sm:w-[400px] max-w-[92vw] h-[520px] max-h-[80vh] bg-slate-950/95 backdrop-blur-2xl border-2 border-emerald-500/50 rounded-3xl shadow-2xl shadow-emerald-500/20 flex flex-col overflow-hidden"
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
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </h4>
                  <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>{isRtl ? 'متصل الآن 24/7 • جاهز للرد' : 'Online 24/7 • Ready to Help'}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
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
                    className={`max-w-[85%] rounded-2xl p-3.5 shadow-md leading-relaxed whitespace-pre-line ${
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
        aria-label="Toggle AI Business Chatbot"
      >
        {/* Pulsing Aura Ping */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 animate-ping pointer-events-none" />

        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-slate-950 font-black" />
        ) : (
          <div className="flex items-center gap-1.5">
            <Bot className="w-5 h-5 fill-slate-950" />
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
        )}

        <span className="text-xs font-black tracking-wide">
          {isOpen
            ? (isRtl ? 'تصغير المحادثة' : 'Close Chat')
            : (isRtl ? 'مساعد AM الذكي 🤖💬' : 'AM AI Assistant 🤖💬')}
        </span>
      </motion.button>

    </div>
  );
}
