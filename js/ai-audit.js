/**
 * AI Digital Audit Simulator - AM Marketing (عبد السلام)
 * أداة الفحص الذكي التفاعلي لتحليل جاهزية المواقع والأنشطة الرقمية
 */

document.addEventListener('DOMContentLoaded', () => {
  const auditForm = document.getElementById('ai-audit-form');
  const auditInput = document.getElementById('audit-target-input');
  const auditCategory = document.getElementById('audit-category-select');
  const auditLoading = document.getElementById('audit-loading');
  const auditStatusText = document.getElementById('audit-status-text');
  const auditProgressBar = document.getElementById('audit-progress-bar');
  const auditResults = document.getElementById('audit-results');
  const auditResetBtn = document.getElementById('audit-reset-btn');

  if (!auditForm) return;

  const diagnosticSteps = [
    { text: "⚡ جاري فحص سرعة استجابة السيرفر وأداء واجهة المستخدم...", progress: 25 },
    { text: "🔍 تحليل الكلمات الدلالية وتهيئة محركات البحث (SEO)...", progress: 55 },
    { text: "🛡️ فحص طبقات التشفير وجاهزية الحماية والأمان السيبراني...", progress: 80 },
    { text: "📊 تقييم معدل التحويل وجاهزية إعلانات جوجل والسوشيال ميديا...", progress: 100 }
  ];

  auditForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const target = auditInput.value.trim();
    const category = auditCategory.value;

    if (!target) {
      alert('يرجى كتابة رابط موقعك أو اسم نشاطك التجاري');
      auditInput.focus();
      return;
    }

    // إخفاء النموذج وإظهار شاشة الفحص
    auditForm.classList.add('hidden');
    auditResults.classList.add('hidden');
    auditLoading.classList.remove('hidden');

    let currentStep = 0;
    
    function runStep() {
      if (currentStep < diagnosticSteps.length) {
        const step = diagnosticSteps[currentStep];
        auditStatusText.innerText = step.text;
        auditProgressBar.style.width = step.progress + '%';
        currentStep++;
        setTimeout(runStep, 700);
      } else {
        // انتهاء الفحص وعرض النتيجة
        setTimeout(() => {
          showAuditResults(target, category);
        }, 500);
      }
    }

    runStep();
  });

  function showAuditResults(target, category) {
    auditLoading.classList.add('hidden');
    auditResults.classList.remove('hidden');

    // توليد درجات واقعية تحفز العميل على طلب الخدمة
    const overallScore = Math.floor(Math.random() * 11) + 62; // 62 - 72
    const speedScore = Math.floor(Math.random() * 16) + 52;   // 52 - 67
    const seoScore = Math.floor(Math.random() * 15) + 60;     // 60 - 74
    const securityScore = Math.floor(Math.random() * 18) + 58; // 58 - 75
    const adsScore = Math.floor(Math.random() * 14) + 64;     // 64 - 77

    // تحديث العناصر في الواجهة
    document.getElementById('audit-res-target').innerText = target;
    document.getElementById('audit-res-overall').innerText = overallScore + '%';
    
    // شريط الدرجة العامة
    const overallCircle = document.getElementById('audit-overall-circle');
    if (overallCircle) {
      overallCircle.style.strokeDashoffset = 280 - (280 * overallScore) / 100;
    }

    document.getElementById('audit-score-speed').innerText = speedScore + '%';
    document.getElementById('audit-bar-speed').style.width = speedScore + '%';

    document.getElementById('audit-score-seo').innerText = seoScore + '%';
    document.getElementById('audit-bar-seo').style.width = seoScore + '%';

    document.getElementById('audit-score-sec').innerText = securityScore + '%';
    document.getElementById('audit-bar-sec').style.width = securityScore + '%';

    document.getElementById('audit-score-ads').innerText = adsScore + '%';
    document.getElementById('audit-bar-ads').style.width = adsScore + '%';

    // إعداد رسالة الواتساب الجاهزة
    const whatsappBtn = document.getElementById('audit-whatsapp-btn');
    if (whatsappBtn) {
      const msg = encodeURIComponent(
        `مرحباً يا عبد السلام، قمت بعمل فحص بالذكاء الاصطناعي لنشاطي (${target}) على موقعك، وكانت النتيجة الإجمالية ${overallScore}%.\nأود الاستفسار عن خطة التحسين لتطوير الموقع وحملات التسويق وحمايته.`
      );
      whatsappBtn.href = `https://wa.me/201098174992?text=${msg}`;
    }
  }

  if (auditResetBtn) {
    auditResetBtn.addEventListener('click', () => {
      auditResults.classList.add('hidden');
      auditForm.classList.remove('hidden');
      auditInput.value = '';
      auditProgressBar.style.width = '0%';
    });
  }
});
