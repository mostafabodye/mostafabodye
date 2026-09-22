/**
 * Interactive ROI & Pricing Calculator - AM Marketing (عبد السلام)
 * حاسبة تقدير التكلفة والمدة والعوائد المتوقعة للمشاريع
 */

document.addEventListener('DOMContentLoaded', () => {
  const serviceSelect = document.getElementById('calc-service');
  const scopeRange = document.getElementById('calc-scope');
  const scopeValueLabel = document.getElementById('calc-scope-label');
  const estPrice = document.getElementById('calc-est-price');
  const estTime = document.getElementById('calc-est-time');
  const estRoi = document.getElementById('calc-est-roi');
  const calcWhatsappBtn = document.getElementById('calc-whatsapp-btn');

  if (!serviceSelect || !scopeRange) return;

  const serviceData = {
    web: {
      name: "تصميم وتطوير موقع إلكتروني",
      scopeLabels: ["صفحة هبوط تعريفية (Landing Page)", "موقع تعريفي للشركات (Corporate)", "متجر إلكتروني متكامل (E-Commerce)", "منصة مخصصة مع نظام إدارة (Web App)"],
      basePrices: [250, 450, 850, 1500], // بالريال السعودي أو المعادل
      currencies: "ر.س",
      deliveryDays: ["2 - 4 أيام", "5 - 7 أيام", "8 - 12 يوم", "14 - 21 يوم"],
      roiExpected: ["سرعة فائقة وتحويل زوار أعلى بنسبة 150%", "بناء ثقة العلامة وظهور احترافي", "زيادة إتمام الطلبات ونظام دفع آمن", "أتمتة العمليات وتوفير وقت الفريق"]
    },
    ads: {
      name: "حملات إعلانات جوجل والسوشيال ميديا",
      scopeLabels: ["إطلاق واختبار حملة إعلانية (Google/Meta)", "حملة شهرية متكاملة لزيادة المبيعات", "حملة متعددة المنصات (Google + TikTok + Insta)", "إدارة إعلانية متقدمة وتوسيع النطاق (Scaling)"],
      basePrices: [300, 600, 1100, 2000],
      currencies: "ر.س",
      deliveryDays: ["جاهزة خلال 48 ساعة", "إدارة شهرية مستمرة", "إدارة شهرية شاملة", "إشراف يومي وتحسين مستمر"],
      roiExpected: ["استهداف دقيق وتوليد عملاء محتملين", "عائد إنفاق إعلاني متوقع 3X - 5X", "انتشار واسع ووصول لأكثر من 150 ألف عميل", "هيمنة على الكلمات المفتاحية في مجالك"]
    },
    ai: {
      name: "صناعة فيديوهات ومحتوى بالذكاء الاصطناعي",
      scopeLabels: ["فيديو إعلاني قصير تيك توك/ريلز (15-30 ثانية)", "حزمة 3 فيديوهات إعلانية سينمائية", "حزمة شهرية (8 فيديوهات ريلز + تعليق صوتي)", "فيديو مذيع رقمي افتراضي مخصص للبراند"],
      basePrices: [150, 380, 800, 1200],
      currencies: "ر.س",
      deliveryDays: ["تسليم خلال 24 ساعة", "خلال 3 أيام", "مجدولة على مدار الشهر", "خلال 5 أيام عمل"],
      roiExpected: ["جذب انتباه فوري وتفاعل مضاعف بنسبة 200%", "تنويع زوايا الإعلان وتقليل كلفة الاقتناء", "تواجد يومي يبني جمهوراً وفياً", "هوية بصرية مستقبلية تميزك عن كل المنافسين"]
    },
    protect: {
      name: "حماية وأمن المواقع (Cybersecurity)",
      scopeLabels: ["فحص أمني سريع وكشف الثغرات (Audit)", "تأمين الموقع وسد الثغرات وشهادات الأمان", "جدار حماية WAF ومراقبة مستمرة ضد DDoS", "تأمين شامل للسيرفرات وقواعد البيانات وتشفيرها"],
      basePrices: [200, 450, 900, 1600],
      currencies: "ر.س",
      deliveryDays: ["نفس اليوم (24 ساعة)", "خلال 48 ساعة", "إعداد فوري ومراقبة شهرية", "خلال 3 - 5 أيام"],
      roiExpected: ["تقرير شامل بنقاط الضعف وخطة العلاج", "حماية كاملة من محاولات الاختراق الشائعة", "استقرار 99.9% ومنع توقف الموقع أثناء البيع", "أمان معتمد لبيانات العملاء وبطاقات الدفع"]
    }
  };

  function updateCalculator() {
    const selectedServiceKey = serviceSelect.value;
    const currentService = serviceData[selectedServiceKey] || serviceData.web;
    const scopeIndex = parseInt(scopeRange.value, 10);

    const scopeTitle = currentService.scopeLabels[scopeIndex];
    const price = currentService.basePrices[scopeIndex];
    const time = currentService.deliveryDays[scopeIndex];
    const roi = currentService.roiExpected[scopeIndex];

    scopeValueLabel.innerText = scopeTitle;
    estPrice.innerText = `ابتداءً من ${price} ${currentService.currencies}`;
    estTime.innerText = time;
    estRoi.innerText = roi;

    // تحديث رابط الواتساب بالخدمة المحددة
    if (calcWhatsappBtn) {
      const message = encodeURIComponent(
        `مرحباً يا عبد السلام، استعلمت من حاسبة موقعك عن خدمة (${currentService.name}) - باقة (${scopeTitle}) المقدرة بـ (${price} ${currentService.currencies}).\nأود البدء ومناقشة تفاصيل المشروع.`
      );
      calcWhatsappBtn.href = `https://wa.me/201098174992?text=${message}`;
    }
  }

  serviceSelect.addEventListener('change', updateCalculator);
  scopeRange.addEventListener('input', updateCalculator);

  // تشغيل أولي
  updateCalculator();
});
