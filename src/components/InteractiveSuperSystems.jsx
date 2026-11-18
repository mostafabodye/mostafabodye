import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Stethoscope, Users, ShoppingCart, Truck, ShieldCheck,
  Sparkles, CheckCircle2, Calculator, Calendar, Clock,
  DollarSign, Receipt, Printer, Send, QrCode, Fingerprint,
  TrendingUp, BarChart3, AlertCircle, Phone, ArrowUpLeft,
  Volume2, VolumeX, RefreshCw, Plus, Minus, Trash2, Award
} from 'lucide-react';
import { playBeep, playSuccess, playCash, playClick, toggleSound, isSoundEnabled } from '../utils/soundUtils';

export default function InteractiveSuperSystems({ lang = 'ar' }) {
  const isRtl = lang === 'ar';
  const [activeTab, setActiveTab] = useState('clinic'); // 'clinic' | 'hr' | 'pos' | 'winch' | 'ads'
  const [soundOn, setSoundOn] = useState(true);

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  // ----------------------------------------------------
  // 1. CLINIC SYSTEM STATE
  // ----------------------------------------------------
  const [consultationFee, setConsultationFee] = useState(450);
  const [dailyPatients, setDailyPatients] = useState(24);
  const [workingDays, setWorkingDays] = useState(24);
  const [patientCac, setPatientCac] = useState(95);

  // Clinic Booking Form
  const [clinicSpecialty, setClinicSpecialty] = useState('dental');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const monthlyGrossRevenue = consultationFee * dailyPatients * workingDays;
  const newPatientsPerMonth = Math.round(dailyPatients * workingDays * 0.45);
  const monthlyAdSpend = newPatientsPerMonth * patientCac;
  const netEstimatedProfit = monthlyGrossRevenue - monthlyAdSpend;
  const roasMultiplier = monthlyAdSpend > 0 ? (monthlyGrossRevenue / monthlyAdSpend).toFixed(1) : '6.5';

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!patientName) return;
    playSuccess();
    const code = 'RX-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(code);
    setBookingConfirmed(true);
  };

  // ----------------------------------------------------
  // 2. HR & ATTENDANCE SYSTEM STATE
  // ----------------------------------------------------
  const [biometricScanning, setBiometricScanning] = useState(false);
  const [clockInSuccess, setClockInSuccess] = useState(false);
  const [lastCheckInTime, setLastCheckInTime] = useState(null);
  const [leaveStatus, setLeaveStatus] = useState('pending'); // 'pending' | 'approved' | 'rejected'

  const handleBiometricScan = () => {
    playClick();
    setBiometricScanning(true);
    setTimeout(() => {
      playBeep();
      setBiometricScanning(false);
      setClockInSuccess(true);
      const timeStr = new Date().toLocaleTimeString(isRtl ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastCheckInTime(timeStr);
      playSuccess();
    }, 1200);
  };

  // ----------------------------------------------------
  // 3. POS & SUPERMARKET SYSTEM STATE
  // ----------------------------------------------------
  const initialProducts = [
    { id: 101, nameAr: 'حليب كامل الدسم 1 لتر', nameEn: 'Whole Milk 1L', price: 42, icon: '🥛', category: 'dairy', stock: 48 },
    { id: 102, nameAr: 'جبنة رومي فاخرة 250جم', nameEn: 'Rumi Cheese 250g', price: 95, icon: '🧀', category: 'dairy', stock: 19 },
    { id: 103, nameAr: 'زيت عباد الشمس 800 مل', nameEn: 'Sunflower Oil 800ml', price: 78, icon: '🌻', category: 'grocery', stock: 35 },
    { id: 104, nameAr: 'أرز مصري درجة أولى 1 كجم', nameEn: 'Egyptian Rice 1kg', price: 34, icon: '🍚', category: 'grocery', stock: 80 },
    { id: 105, nameAr: 'عصير برتقال طبيعي 1 لتر', nameEn: 'Orange Juice 1L', price: 35, icon: '🍊', category: 'beverages', stock: 22 },
    { id: 106, nameAr: 'شوكولاتة مكسرات بريميوم', nameEn: 'Premium Nut Chocolate', price: 65, icon: '🍫', category: 'snacks', stock: 54 }
  ];

  const [posCart, setPosCart] = useState([
    { id: 101, nameAr: 'حليب كامل الدسم 1 لتر', nameEn: 'Whole Milk 1L', price: 42, qty: 2, icon: '🥛' },
    { id: 105, nameAr: 'عصير برتقال طبيعي 1 لتر', nameEn: 'Orange Juice 1L', price: 35, qty: 1, icon: '🍊' }
  ]);
  const [receiptPrinted, setReceiptPrinted] = useState(false);
  const [lastReceiptNumber, setLastReceiptNumber] = useState('INV-8842');

  const addToCart = (product) => {
    playBeep();
    setPosCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setReceiptPrinted(false);
  };

  const updateCartQty = (id, delta) => {
    playClick();
    setPosCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
    setReceiptPrinted(false);
  };

  const cartSubtotal = posCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const vatTax = Math.round(cartSubtotal * 0.14);
  const cartTotal = cartSubtotal + vatTax;

  const handleCheckout = () => {
    if (posCart.length === 0) return;
    playCash();
    const inv = 'INV-' + Math.floor(1000 + Math.random() * 9000);
    setLastReceiptNumber(inv);
    setReceiptPrinted(true);
  };

  // ----------------------------------------------------
  // 4. TOWING & EMERGENCY DISPATCH STATE
  // ----------------------------------------------------
  const [winchSimPickup, setWinchSimPickup] = useState('طريق السويس - أمام مدينتي ك 38');
  const [winchSimCar, setWinchSimCar] = useState('مرسيدس C200 (ملاكي منخفض)');
  const [winchDispatched, setWinchDispatched] = useState(false);

  const handleSimDispatch = () => {
    playClick();
    setTimeout(() => {
      playSuccess();
      setWinchDispatched(true);
    }, 600);
  };

  return (
    <section className="relative py-20 bg-slate-950/90 border-y border-slate-800/80 overflow-hidden" id="interactive-systems">
      {/* Background Cyber Gradients */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative z-10 px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-slate-900 to-cyan-500/20 border border-amber-400/40 shadow-lg shadow-amber-500/10">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="text-xs sm:text-sm font-black text-amber-300">
              {isRtl ? 'مختبر الأنظمة والبرمجيات الحية التفاعلية ⚡' : 'Live Interactive Enterprise Systems Lab ⚡'}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {isRtl ? 'جرب بنفسك الآن' : 'Test Live'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {isRtl ? (
              <>
                لا نبيع وعوداً إنشائية..{' '}
                <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  جرّب برمجياتنا وأنظمتنا الحية
                </span>{' '}
                قبل أن تبدأ معنا!
              </>
            ) : (
              <>
                We Don't Sell Promises.{' '}
                <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Test Our Live Operating Systems
                </span>{' '}
                Right Now!
              </>
            )}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {isRtl
              ? 'صممنا لك نماذج تشغيل تفاعلية كاملة (عيادات طبية، حضور وانصراف HR، كاشير وسوبر ماركت، شبكات أوناش، وإثباتات حملات) لتلمس بنفسك الفارق بين الهواة والمهندسين الحقيقيين.'
              : 'Interact directly with full functional simulators: Medical Clinic OS, Enterprise HR Biometrics, Next-Gen Supermarket POS, and Towing Dispatch Engine.'}
          </p>

          {/* Sound Effect Toggle */}
          <div className="flex justify-center pt-2">
            <button
              onClick={handleToggleSound}
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 hover:border-amber-400/50 text-slate-300 transition"
              title="تفعيل / كتم المؤثرات الصوتية التفاعلية"
            >
              {soundOn ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isRtl ? 'المؤثرات الصوتية التفاعلية: مفعلة 🔊' : 'Audio Feedback: ON 🔊'}</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isRtl ? 'المؤثرات الصوتية: مكتومة 🔇' : 'Audio Feedback: MUTED 🔇'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Systems Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          <button
            onClick={() => { playClick(); setActiveTab('clinic'); }}
            className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 border ${
              activeTab === 'clinic'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-emerald-400 shadow-lg shadow-emerald-600/30 scale-105'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-emerald-300" />
            <span>{isRtl ? '🏥 حاسبة ونظام العيادات الذكي' : '🏥 ClinicOS & ROI Calc'}</span>
          </button>

          <button
            onClick={() => { playClick(); setActiveTab('hr'); }}
            className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 border ${
              activeTab === 'hr'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-blue-400 shadow-lg shadow-blue-600/30 scale-105'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <Fingerprint className="w-4 h-4 text-blue-300" />
            <span>{isRtl ? '👥 نظام HR وحضور الشركات' : '👥 Enterprise HR & Attendance'}</span>
          </button>

          <button
            onClick={() => { playClick(); setActiveTab('pos'); }}
            className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 border ${
              activeTab === 'pos'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black border-amber-300 shadow-lg shadow-amber-500/30 scale-105'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4 text-slate-950" />
            <span>{isRtl ? '🛒 كاشير ونقاط بيع السوبرماركت' : '🛒 HyperPOS Retail'}</span>
          </button>

          <button
            onClick={() => { playClick(); setActiveTab('winch'); }}
            className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 border ${
              activeTab === 'winch'
                ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white border-red-400 shadow-lg shadow-red-600/30 scale-105'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4 text-red-300" />
            <span>{isRtl ? '🚨 شبكة أوناش الإنقاذ والطوارئ' : '🚨 Towing Dispatch Network'}</span>
          </button>

          <button
            onClick={() => { playClick(); setActiveTab('ads'); }}
            className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 border ${
              activeTab === 'ads'
                ? 'bg-gradient-to-r from-purple-600 to-fuchsia-700 text-white border-purple-400 shadow-lg shadow-purple-600/30 scale-105'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-purple-300" />
            <span>{isRtl ? '📊 خزينة إثباتات الحملات الحقيقية' : '📊 Verified Ads & ROAS Vault'}</span>
          </button>
        </div>

        {/* Active System Showcase Box */}
        <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
          <AnimatePresence mode="wait">
            
            {/* ==================================================== */}
            {/* TAB 1: CLINICOS PRO & MEDICAL ROI CALCULATOR         */}
            {/* ==================================================== */}
            {activeTab === 'clinic' && (
              <motion.div
                key="clinic"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4" /> ClinicOS Pro & Medical Revenue Engine
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                      {isRtl ? 'حاسبة أرباح ونظام تشغيل العيادات والمراكز الطبية' : 'Medical Clinic Revenue & Patient Acquisition OS'}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                      {isRtl ? 'توليد كشوفات + متابعة أرباح' : 'Lead Gen + Patient CRM'}
                    </span>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Interactive ROI Calculator */}
                  <div className="lg:col-span-7 space-y-6 bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
                    <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-emerald-400" />
                      {isRtl ? 'حاسبة عوائد وأرباح العيادة التفاعلية:' : 'Interactive Clinic Revenue Calculator:'}
                    </h4>

                    {/* Slider 1: Consultation Fee */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-400">{isRtl ? 'سعر الكشف / الاستشارة:' : 'Consultation Fee:'}</span>
                        <span className="text-emerald-400 font-mono text-sm">{consultationFee} {isRtl ? 'ج.م' : 'EGP'}</span>
                      </div>
                      <input
                        type="range" min="150" max="1500" step="50"
                        value={consultationFee}
                        onChange={(e) => { playClick(); setConsultationFee(Number(e.target.value)); }}
                        className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Slider 2: Daily Patients */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-400">{isRtl ? 'متوسط عدد المرضى يومياً:' : 'Daily Patients:'}</span>
                        <span className="text-emerald-400 font-mono text-sm">{dailyPatients} {isRtl ? 'مريض/كشف' : 'Patients'}</span>
                      </div>
                      <input
                        type="range" min="5" max="60" step="1"
                        value={dailyPatients}
                        onChange={(e) => { playClick(); setDailyPatients(Number(e.target.value)); }}
                        className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Slider 3: Working Days */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-400">{isRtl ? 'أيام العمل شهرياً:' : 'Working Days/Month:'}</span>
                        <span className="text-emerald-400 font-mono text-sm">{workingDays} {isRtl ? 'يوم' : 'Days'}</span>
                      </div>
                      <input
                        type="range" min="16" max="30" step="1"
                        value={workingDays}
                        onChange={(e) => { playClick(); setWorkingDays(Number(e.target.value)); }}
                        className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Live Metric Cards Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                        <span className="text-[11px] text-slate-400 block mb-1">{isRtl ? 'إجمالي الإيرادات' : 'Gross Revenue'}</span>
                        <span className="text-lg font-black text-white font-mono">{monthlyGrossRevenue.toLocaleString()} ج</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                        <span className="text-[11px] text-slate-400 block mb-1">{isRtl ? 'ميزانية الإعلانات' : 'Ad Budget'}</span>
                        <span className="text-lg font-black text-amber-400 font-mono">{monthlyAdSpend.toLocaleString()} ج</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 text-center bg-emerald-500/5">
                        <span className="text-[11px] text-emerald-400 block mb-1">{isRtl ? 'صافي أرباح العيادة' : 'Net Clinic Profit'}</span>
                        <span className="text-lg font-black text-emerald-400 font-mono">{netEstimatedProfit.toLocaleString()} ج</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                        <span className="text-[11px] text-slate-400 block mb-1">{isRtl ? 'عائد الإعلانات ROAS' : 'ROAS Multiplier'}</span>
                        <span className="text-lg font-black text-cyan-400 font-mono">{roasMultiplier}x</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Live Appointment & Digital Rx Simulator */}
                  <div className="lg:col-span-5 bg-slate-950/80 p-6 rounded-2xl border border-emerald-500/30 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        {isRtl ? 'محاكاة حجز كشف فوري وروشتة ذكية' : 'Live Booking & Digital Rx'}
                      </h4>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                        CRM Ready
                      </span>
                    </div>

                    {!bookingConfirmed ? (
                      <form onSubmit={handleConfirmBooking} className="space-y-3 text-xs">
                        <div>
                          <label className="block text-slate-400 mb-1 font-semibold">{isRtl ? 'التخصص الطبي:' : 'Specialty:'}</label>
                          <select
                            value={clinicSpecialty}
                            onChange={(e) => setClinicSpecialty(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                          >
                            <option value="dental">🦷 {isRtl ? 'طب وزراعة وتجميل الأسنان' : 'Dental & Implantology'}</option>
                            <option value="derma">✨ {isRtl ? 'الجلدية والليزر والتجميل' : 'Dermatology & Laser'}</option>
                            <option value="pediatric">👶 {isRtl ? 'طب الأطفال وحديثي الولادة' : 'Pediatrics'}</option>
                            <option value="ortho">🦴 {isRtl ? 'عظام ومفاصل وعمود فقري' : 'Orthopedics'}</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1 font-semibold">{isRtl ? 'اسم المريض:' : 'Patient Name:'}</label>
                          <input
                            type="text"
                            placeholder={isRtl ? 'مثال: أستاذ أحمد محمود' : 'e.g. John Doe'}
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1 font-semibold">{isRtl ? 'رقم الهاتف للتأكيد (واتساب):' : 'Phone (WhatsApp):'}</label>
                          <input
                            type="tel"
                            placeholder="01xxxxxxxxx"
                            value={patientPhone}
                            onChange={(e) => setPatientPhone(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                            dir="ltr"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{isRtl ? 'تأكيد الحجز وتوليد الروشتة الرقمية' : 'Confirm & Generate Digital Rx'}</span>
                        </button>
                      </form>
                    ) : (
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/40 space-y-3 text-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                          ✓
                        </div>
                        <h5 className="font-bold text-white text-sm">
                          {isRtl ? 'تم تسجيل كشف المريض بنجاح!' : 'Patient Booked Successfully!'}
                        </h5>
                        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-left font-mono text-xs space-y-1" dir="ltr">
                          <div className="text-emerald-400 font-bold">RX CODE: {bookingCode}</div>
                          <div className="text-slate-300">PATIENT: {patientName}</div>
                          <div className="text-slate-400">SPECIALTY: {clinicSpecialty.toUpperCase()}</div>
                          <div className="text-slate-400">STATUS: CONFIRMED & QUEUED</div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const msg = `مرحباً ${patientName}، تم تأكيد حجزك في العيادة بكود ${bookingCode}، نتمنى لك دوام الصحة والعافية.`;
                              window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
                            }}
                            className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{isRtl ? 'إرسال لواتساب المريض' : 'WhatsApp Patient'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => { setBookingConfirmed(false); setPatientName(''); }}
                            className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
                          >
                            {isRtl ? 'حجز جديد' : 'New'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==================================================== */}
            {/* TAB 2: WORKFORCE HR & SMART ATTENDANCE               */}
            {/* ==================================================== */}
            {activeTab === 'hr' && (
              <motion.div
                key="hr"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                  <div>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Users className="w-4 h-4" /> WorkForce HR Enterprise & Biometric Portal
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                      {isRtl ? 'نظام HR وإدارة الشركات وتسجيل الحضور والانصراف بالبصمة' : 'Enterprise HR, Payroll & Biometric Attendance System'}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
                    {isRtl ? 'حساب تأخيرات + رواتب + إجازات' : 'Biometrics + KPI Matrix'}
                  </span>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Biometric Clock-in Scanner */}
                  <div className="lg:col-span-5 bg-slate-950/80 p-6 rounded-2xl border border-blue-500/30 text-center space-y-5">
                    <h4 className="text-sm font-bold text-white flex items-center justify-center gap-2">
                      <Fingerprint className="w-4 h-4 text-blue-400" />
                      {isRtl ? 'جهاز البصمة الحيوية لتسجيل الحضور:' : 'Interactive Biometric Terminal:'}
                    </h4>

                    {/* Fingerprint Scanner Interactive Button */}
                    <div className="relative inline-block my-2">
                      <button
                        type="button"
                        onClick={handleBiometricScan}
                        disabled={biometricScanning}
                        className={`w-32 h-32 rounded-3xl flex flex-col items-center justify-center transition-all duration-300 relative border-2 ${
                          biometricScanning
                            ? 'bg-blue-600/30 border-blue-400 animate-pulse shadow-2xl shadow-blue-500/50 scale-95'
                            : clockInSuccess
                            ? 'bg-emerald-500/20 border-emerald-400 shadow-xl shadow-emerald-500/30'
                            : 'bg-slate-900 border-slate-700 hover:border-blue-400 shadow-xl shadow-slate-950 hover:scale-105'
                        }`}
                      >
                        <Fingerprint className={`w-16 h-16 ${
                          biometricScanning ? 'text-blue-400' : clockInSuccess ? 'text-emerald-400' : 'text-slate-400 group-hover:text-blue-300'
                        }`} />
                        <span className="text-[10px] font-bold mt-1 text-slate-400">
                          {biometricScanning ? (isRtl ? 'جاري المسح...' : 'Scanning...') : (isRtl ? 'المس بالبصمة' : 'Touch Scanner')}
                        </span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      {isRtl
                        ? 'اضغط على زر البصمة لمحاكاة تسجيل حضور الموظف بدقة الميلي ثانية مع ربطها براتب الشهر تلقائياً.'
                        : 'Click to simulate biometric check-in with millisecond precision linked to payroll.'}
                    </p>

                    {clockInSuccess && (
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold text-center">
                        ✓ {isRtl ? `تم تسجيل حضور م. أحمد كريم (${lastCheckInTime}) - لا يوجد تأخير` : `Ahmed Karim clocked in at ${lastCheckInTime} - On Time`}
                      </div>
                    )}
                  </div>

                  {/* Right: Enterprise Dashboard Stats & Leave Approvals */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Live Department Overview Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                        <span className="text-[11px] text-slate-400 block mb-0.5">{isRtl ? 'الموظفين الحاضرين' : 'Present Staff'}</span>
                        <span className="text-xl font-black text-emerald-400 font-mono">48 / 52</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                        <span className="text-[11px] text-slate-400 block mb-0.5">{isRtl ? 'تأخير مسجل' : 'Late Check-ins'}</span>
                        <span className="text-xl font-black text-amber-400 font-mono">2</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                        <span className="text-[11px] text-slate-400 block mb-0.5">{isRtl ? 'إجازات معتمدة' : 'On Leave'}</span>
                        <span className="text-xl font-black text-blue-400 font-mono">2</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                        <span className="text-[11px] text-slate-400 block mb-0.5">{isRtl ? 'نسبة الانضباط' : 'Discipline Rate'}</span>
                        <span className="text-xl font-black text-white font-mono">96.2%</span>
                      </div>
                    </div>

                    {/* Interactive Leave Request Approval Simulation */}
                    <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-200">
                          {isRtl ? 'طلب إجازة عاجل بحاجة لاعتماد المدير:' : 'Pending Leave Request:'}
                        </h4>
                        <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                          {leaveStatus === 'pending' ? (isRtl ? 'قيد الانتظار' : 'Pending') : leaveStatus === 'approved' ? (isRtl ? 'تمت الموافقة' : 'Approved') : (isRtl ? 'مرفوض' : 'Rejected')}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                        <div className="font-bold text-white">سارة عبد الرحمن • قسم التسويق والميديا</div>
                        <div className="text-slate-400">{isRtl ? 'نوع الإجازة: إجازة اعتيادية (يومان) • الرصيد المتبقي: 14 يوم' : 'Type: Annual Leave (2 Days) • Remaining: 14 Days'}</div>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => { playSuccess(); setLeaveStatus('approved'); }}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                            leaveStatus === 'approved' ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isRtl ? 'اعتماد الإجازة وخصمها من الرصيد' : 'Approve Leave'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => { playClick(); setLeaveStatus('rejected'); }}
                          className={`py-2 px-4 rounded-xl text-xs font-bold transition ${
                            leaveStatus === 'rejected' ? 'bg-red-600 text-white' : 'bg-slate-800 hover:bg-red-600/30 text-red-400 border border-red-500/30'
                          }`}
                        >
                          {isRtl ? 'رفض' : 'Reject'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==================================================== */}
            {/* TAB 3: HYPERPOS ULTRA (SUPERMARKET & RETAIL CASHIER) */}
            {/* ==================================================== */}
            {activeTab === 'pos' && (
              <motion.div
                key="pos"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                      <ShoppingCart className="w-4 h-4" /> HyperPOS Ultra • Cloud & Desktop Cashier Engine
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                      {isRtl ? 'نظام كاشير ونقاط البيع الفائق للمحلات والسوبر ماركت الكبيرة' : 'Next-Gen Retail & Supermarket POS Terminal'}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                    {isRtl ? 'باركود صوتي + فاتورة ضريبية فورية' : 'Sound Barcode + E-Invoice'}
                  </span>
                </div>

                <div className="grid lg:grid-cols-12 gap-6 items-start">
                  {/* Left: Product Catalog Grid */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                      <span>{isRtl ? 'اضغط على أي صنف لإضافته للسلة (مع صوت الباركود 🔊):' : 'Click item to scan & add (with audio beep 🔊):'}</span>
                      <span className="text-amber-400 text-[11px]">{initialProducts.length} {isRtl ? 'أصناف معروضة' : 'Items'}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {initialProducts.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => addToCart(p)}
                          className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-400/60 transition text-right group relative overflow-hidden hover:scale-[1.02] active:scale-95 shadow-md"
                        >
                          <div className="text-3xl mb-2">{p.icon}</div>
                          <h5 className="font-bold text-white text-xs leading-snug line-clamp-1 group-hover:text-amber-300 transition">
                            {isRtl ? p.nameAr : p.nameEn}
                          </h5>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80">
                            <span className="font-mono font-bold text-amber-400 text-xs">{p.price} ج</span>
                            <span className="text-[10px] text-slate-500 font-mono">#{p.id}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right: Cashier Cart & Thermal Receipt Preview */}
                  <div className="lg:col-span-5 bg-slate-950/90 p-5 rounded-2xl border border-amber-500/30 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Receipt className="w-4 h-4 text-amber-400" />
                        {isRtl ? 'فاتورة العميل الحالية:' : 'Current Customer Bill:'}
                      </h4>
                      <button
                        type="button"
                        onClick={() => { playClick(); setPosCart([]); setReceiptPrinted(false); }}
                        className="text-[11px] text-slate-500 hover:text-red-400 transition"
                      >
                        {isRtl ? 'تفريغ السلة' : 'Clear'}
                      </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {posCart.length === 0 ? (
                        <div className="text-center py-6 text-xs text-slate-500">
                          {isRtl ? 'السلة فارغة. اضغط على أي صنف من اليسار لمسح الباركود.' : 'Cart empty. Click an item to scan.'}
                        </div>
                      ) : (
                        posCart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800/80 text-xs">
                            <div className="flex items-center gap-2">
                              <span>{item.icon}</span>
                              <span className="text-slate-200 font-semibold">{isRtl ? item.nameAr : item.nameEn}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-amber-400">{item.price * item.qty} ج</span>
                              <div className="flex items-center gap-1 bg-slate-950 rounded-lg border border-slate-800 px-1">
                                <button type="button" onClick={() => updateCartQty(item.id, -1)} className="px-1 text-slate-400 hover:text-white">-</button>
                                <span className="font-mono text-[11px] px-1 text-white">{item.qty}</span>
                                <button type="button" onClick={() => updateCartQty(item.id, 1)} className="px-1 text-slate-400 hover:text-white">+</button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Totals Summary */}
                    <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>{isRtl ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                        <span className="font-mono font-bold text-white">{cartSubtotal} ج</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>{isRtl ? 'ضريبة القيمة المضافة (14%):' : 'VAT (14%):'}</span>
                        <span className="font-mono text-slate-300">{vatTax} ج</span>
                      </div>
                      <div className="flex justify-between text-sm font-black text-amber-300 pt-1 border-t border-slate-800">
                        <span>{isRtl ? 'الإجمالي النهائي المطلوب:' : 'Grand Total:'}</span>
                        <span className="font-mono text-base">{cartTotal} ج</span>
                      </div>
                    </div>

                    {/* Checkout & Print Action */}
                    {!receiptPrinted ? (
                      <button
                        type="button"
                        onClick={handleCheckout}
                        disabled={posCart.length === 0}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:brightness-110 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 disabled:opacity-40"
                      >
                        <Printer className="w-4 h-4" />
                        <span>{isRtl ? 'إصدار الفاتورة الضريبية (Ka-Ching 💵)' : 'Checkout & Print (Ka-Ching 💵)'}</span>
                      </button>
                    ) : (
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                        <div className="text-xs font-bold text-emerald-400">
                          ✓ {isRtl ? `تمت العملية بنجاح! رقم الفاتورة: ${lastReceiptNumber}` : `Paid Successfully! Receipt #${lastReceiptNumber}`}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const text = `فاتورة مشتريات رقم ${lastReceiptNumber} بقيمة إجمالية ${cartTotal} ج. شكراً لزيارتكم!`;
                            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                          }}
                          className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{isRtl ? 'إرسال الفاتورة لواتساب العميل' : 'Send via WhatsApp'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==================================================== */}
            {/* TAB 4: TOWING & EMERGENCY DISPATCH NETWORK           */}
            {/* ==================================================== */}
            {activeTab === 'winch' && (
              <motion.div
                key="winch"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                  <div>
                    <span className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Truck className="w-4 h-4" /> RescueDispatch Egypt • National Towing Engine
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                      {isRtl ? 'منظومة وشبكة أوناش الإنقاذ السريع (350+ ونش في كل طرق مصر)' : 'National Towing Dispatch & Fast Rescue Engine'}
                    </h3>
                  </div>
                  <a
                    href="https://winchmagdyelharby.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-red-600/20 text-red-400 border border-red-500/40 hover:bg-red-600 hover:text-white transition"
                  >
                    <span>{isRtl ? 'عرض موقع ونش مجدي الحربي (Live 35 SEO Pages)' : 'View Winch Magdy Live'}</span>
                    <ArrowUpLeft className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4 text-xs text-slate-300 leading-relaxed">
                    <p>
                      {isRtl
                        ? 'قمنا بهندسة ونشر منصات أوناش الإنقاذ (ونش مجدي الحربي، ونش حجازي، ونش السعيد، ونش علي سكر) مع 35 صفحة سيو محلية وربط كامل مع تتبع اتصالات Google Ads و GTM.'
                        : 'Engineered high-converting towing platforms with 35 programmatic SEO landing pages, 10-minute ETA positioning, and Google Ads call tracking.'}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                        <span className="text-lg font-black text-amber-400 block font-mono">10 د</span>
                        <span className="text-[11px] text-slate-400">{isRtl ? 'متوسط وقت الوصول' : 'Average ETA'}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                        <span className="text-lg font-black text-emerald-400 block font-mono">35 URL</span>
                        <span className="text-[11px] text-slate-400">{isRtl ? 'صفحات سيو مخصصة' : 'Programmatic SEO'}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                        <span className="text-lg font-black text-red-400 block font-mono">GTM + Ads</span>
                        <span className="text-[11px] text-slate-400">{isRtl ? 'تتبع تحويلات دقيق' : 'Call Conversion Tag'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-slate-950/90 p-5 rounded-2xl border border-red-500/30 space-y-3">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      {isRtl ? 'محاكاة إرسال أوردر إنقاذ لجروبات الكباتن:' : 'Simulate Group Dispatch Broadcast:'}
                    </h4>

                    <div className="space-y-2 text-xs">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-0.5">{isRtl ? 'مكان العطل:' : 'Location:'}</label>
                        <input
                          type="text" value={winchSimPickup}
                          onChange={(e) => setWinchSimPickup(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-0.5">{isRtl ? 'نوع السيارة:' : 'Vehicle:'}</label>
                        <input
                          type="text" value={winchSimCar}
                          onChange={(e) => setWinchSimCar(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleSimDispatch}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs transition shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'توزيع الأوردر واحتساب العمولة' : 'Broadcast to Drivers Group'}</span>
                      </button>

                      {winchDispatched && (
                        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold text-center">
                          ✓ {isRtl ? 'تم إرسال الطلب لكابتن ونش متمركز على بعد 4 كم (عمولة محصلة: 50 ج)' : 'Order Dispatched to Driver (50 EGP Commission Recorded)'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==================================================== */}
            {/* TAB 5: VERIFIED GOOGLE ADS & ROAS VAULT              */}
            {/* ==================================================== */}
            {activeTab === 'ads' && (
              <motion.div
                key="ads"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                  <div>
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4" /> Verified Google Ads Accounts & Battle-Tested ROAS
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                      {isRtl ? 'خزينة الحملات الواقعية والأرقام الموثقة من داخل الحسابات الإعلانية' : 'Verified Google & Meta Ads Campaigns Portfolio'}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold">
                    {isRtl ? '+12 مليون جنيه ميزانيات مدارة' : '+12M EGP Managed Budgets'}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Campaign Card 1: Spiro Spathis */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-400/50 transition">
                    <div className="text-xs font-bold text-amber-400 mb-1">{isRtl ? 'مشروبات وطنية' : 'FMCG & Beverage'}</div>
                    <h4 className="font-bold text-white text-sm mb-2">{isRtl ? 'سبيرو سباتس (Spiro Spathis)' : 'Spiro Spathis Egypt'}</h4>
                    <p className="text-slate-400 text-xs mb-3">حملات انتشار واكتساح للسوشيال ميديا بملايين المشاهدات وأعلى معدلات تفاعل.</p>
                    <div className="text-[11px] font-mono text-emerald-400 font-bold">+3.2M Impressions • Viral Reach</div>
                  </div>

                  {/* Campaign Card 2: Kulud Clinics */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-400/50 transition">
                    <div className="text-xs font-bold text-emerald-400 mb-1">{isRtl ? 'قطاع طبي وتجميل' : 'Medical & Healthcare'}</div>
                    <h4 className="font-bold text-white text-sm mb-2">{isRtl ? 'عيادات الخلود الطبية' : 'Kulud Medical Clinics'}</h4>
                    <p className="text-slate-400 text-xs mb-3">إعلانات جوجل وسوشيال استهدفت كشوفات التجميل والأسنان بأقل تكلفة للمريض.</p>
                    <div className="text-[11px] font-mono text-emerald-400 font-bold">ROAS 5.4x • CPA -48%</div>
                  </div>

                  {/* Campaign Card 3: Al Majal Fire Safety */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-400/50 transition">
                    <div className="text-xs font-bold text-red-400 mb-1">{isRtl ? 'أنظمة صناعية B2B' : 'B2B Fire Systems'}</div>
                    <h4 className="font-bold text-white text-sm mb-2">{isRtl ? 'شركة المجال لمكافحة الحريق' : 'Al-Majal Fire Fighting'}</h4>
                    <p className="text-slate-400 text-xs mb-3">حملات بحث B2B استهدفت مديري المصانع والشركات الكبرى لعقود سنوية بملايين الجنيهات.</p>
                    <div className="text-[11px] font-mono text-emerald-400 font-bold">+18 Enterprise B2B Contracts</div>
                  </div>

                  {/* Campaign Card 4: Winch Network */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-400/50 transition">
                    <div className="text-xs font-bold text-cyan-400 mb-1">{isRtl ? 'طوارئ سيارات 24/7' : 'Automotive Emergency'}</div>
                    <h4 className="font-bold text-white text-sm mb-2">{isRtl ? 'شبكة أوناش الإنقاذ في مصر' : 'Egypt Towing Network'}</h4>
                    <p className="text-slate-400 text-xs mb-3">حملات اتصالات فورية (Call-Only) تتصدر في 35 منطقة وطريق سريع مع تتبع دقيق.</p>
                    <div className="text-[11px] font-mono text-emerald-400 font-bold">+1,400 Monthly Phone Calls</div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
