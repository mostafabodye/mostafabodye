/**
 * Main Application Script - AM Marketing (عبد السلام)
 * إدارة معرض الأعمال، النوافذ المنبثقة، والقائمة الجانبية
 */

// بيانات المشاريع الاحتياطية (للتأكد من عمل الموقع حتى لو فُتح مباشرة بضغطة زر دون سيرفر محلي)
const fallbackProjects = [
  {
    "id": "gads-almajal",
    "category": "ads",
    "title": "شركة المجال للسلامة وأنظمة الإطفاء (Almajal Safety)",
    "subtitle": "إدارة حملات بحث جوجل وإعلانات الخرائط لخدمات الأمن والسلامة",
    "badge": "حملة حقيقية - Google Ads",
    "client": "شركة المجال للسلامة",
    "website": "https://almajal-safety.com/",
    "tags": ["Google Ads", "أنظمة إطفاء", "استهداف B2B", "Google Maps"],
    "summary": "إدارة متكاملة لحملات بحث جوجل لشركة المجال للسلامة الرائدة في توريد وتركيب وصيانة شبكات الإطفاء ومعدات السلامة المعتمدة.",
    "challenge": "المنافسة الشديدة وارتفاع تكلفة النقرة في قطاع السلامة والدفاع المدني وصعوبة الوصول للشركات والمصانع مباشرة.",
    "solution": "بناء حملات إعلانية متخصصة بنية شراء عالية للشركات، تحسين كلمات التوريد والتركيب، وتفعيل إعلانات خرائط جوجل للوصول المباشر.",
    "results": [
      { "label": "ارتفاع المكالمات", "value": "+240%" },
      { "label": "نسبة النقر CTR", "value": "11.4%" },
      { "label": "خفض تكلفة النقرة", "value": "-28%" }
    ],
    "image": "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1000&q=80",
    "demoUrl": "https://almajal-safety.com/",
    "isFeatured": true
  },
  {
    "id": "ads-mirage-hills",
    "category": "ads",
    "title": "حملة إطلاق كمبوند ميراج هيلز الفاخر (Mirage Hills Launch)",
    "subtitle": "استراتيجية إعلانية متكاملة وحملات Lead Generation للقطاع العقاري الراقي",
    "badge": "إعلانات عقارية - Real Estate",
    "client": "ميراج هيلز للتطوير العقاري",
    "tags": ["إعلانات عقارات", "Meta Ads", "Lead Generation", "استثمار خليجي"],
    "summary": "خطة إطلاق تسويقية شاملة للمشروع العقاري الفاخر ميراج هيلز، تضمنت تصاميم إبداعية مستهدفة للمستثمرين ورجال الأعمال لجمع بيانات عملاء محتملين بجودة شراء عالية.",
    "challenge": "ارتفاع تكلفة استقطاب المشترين في السوق العقاري التنافسي وصعوبة فرز العملاء الجادين.",
    "solution": "تصميم محتوى بصري فاخر يبرز المميزات الحصرية للمشروع مع نماذج تسجيل فورية (Instant Lead Forms) وفلترة دقيقة للجماهير المستهدفة.",
    "results": [
      { "label": "طلبات حجز ومعاينة", "value": "+340 عميل جاد" },
      { "label": "انخفاض تكلفة العميل (CPL)", "value": "-35%" },
      { "label": "معدل التحويل", "value": "14.2%" }
    ],
    "image": "assets/images/campaign_mirage_hills_1.png",
    "demoUrl": "#",
    "isFeatured": true
  },
  {
    "id": "ads-round-ksa",
    "category": "ads",
    "title": "حملة راوند السعودية للسياحة والجولات الخاصة (Round KSA Travel)",
    "subtitle": "حملات استقطاب الزوار والسياح في المدينة المنورة ومناطق المملكة",
    "badge": "سياحة وضيافة - KSA Tourism",
    "client": "شركة راوند السعودية للسياحة",
    "tags": ["سياحة وسفر", "السعودية", "Instagram Ads", "حجوزات مباشرة"],
    "summary": "إدارة وإطلاق حملات ترويجية لجولات سياحية حصرية وتجارب فريدة للمعتمرين والزوار في السعودية، مع التركيز على خدمة العملاء السريعة عبر الواتساب.",
    "challenge": "مواسم العمرة والسياحة المحدودة تتطلب استجابة سريعة وحملات مكثفة خلال فترات زمنية قصيرة.",
    "solution": "إطلاق حملات تفاعلية عبر انستجرام وتيك توك مع كول تو آكشن مباشر إلى محادثات الواتساب لحجز الجولات فوراً.",
    "results": [
      { "label": "حجوزات سياحية", "value": "+620 حجز" },
      { "label": "عائد الإنفاق ROAS", "value": "4.8X" },
      { "label": "تفاعل المتابعين", "value": "+450%" }
    ],
    "image": "assets/images/campaign_round_ksa_1.jpg",
    "demoUrl": "#",
    "isFeatured": true
  },
  {
    "id": "ads-spiro-spathis",
    "category": "ads",
    "title": "استراتيجية نمو وتوسع سبيرو سباتس (Spiro Spathis Growth Campaign)",
    "subtitle": "دراسة استراتيجية وكتابة محتوى إعلاني لحملة استعادة الصدارة للمشروب الوطني",
    "badge": "FMCG & Copywriting",
    "client": "سبيرو سباتس (Spiro Spathis)",
    "tags": ["كتابة إعلانية", "استراتيجية براندينج", "سوشيال ميديا", "FMCG"],
    "summary": "إعداد عرض استراتيجي متكامل وصياغة سيناريوهات ونصوص إعلانية احترافية تعتمد على السرد القصصي (Storytelling) لربط عراقة المنتج بروح الشباب اليوم (#احنا_بتوع_النهاردة).",
    "challenge": "الاستفادة من الزخم الجماهيري وتحويله إلى ولاء طويل الأمد للعلامة التجارية أمام المنافسين العالميين.",
    "solution": "بناء استراتيجية محتوى متعددة المراحل تمزج النوستالجيا المصرية بالروح العصرية وابتكار مفاهيم إعلانية مبتكرة.",
    "results": [
      { "label": "انتشار عضوي وتفاعل", "value": "Viral Impact" },
      { "label": "زيادة معدل الارتباط بالبراند", "value": "+280%" },
      { "label": "تغطية المحتوى", "value": "36 شريحة استراتيجية" }
    ],
    "image": "assets/images/campaign_spiro_spathis_clean.png",
    "demoUrl": "#",
    "isFeatured": true
  },
  {
    "id": "ads-kulud-pharmacy",
    "category": "ads",
    "title": "حملة تطبيق صيدليات خلود (Kulud Pharmacy App Launch)",
    "subtitle": "حملة إعلانات رقمية لتطبيق توصيل الأدوية ومستحضرات التجميل وصرف التأمين",
    "badge": "تطبيقات وتجارة إلكترونية - E-Commerce",
    "client": "مجموعة صيدليات خلود",
    "tags": ["إعلانات تطبيقات", "صيدليات ورعاية صحية", "App Installs", "تأمين طبي"],
    "summary": "تخطيط وإطلاق حملات إعلانية متكاملة لزيادة تنزيلات تطبيق صيدليات خلود والترويج لميزة صرف الروشتات الطبية بلمسة واحدة من الجوال والتوصيل الفوري.",
    "challenge": "إقناع العملاء بالانتقال من الشراء التقليدي من الصيدلية إلى الطلب عبر التطبيق وتسهيل رفع الوصفات الطبية.",
    "solution": "تصميم إعلانات بصرية مباشرة تسلط الضوء على سهولة صرف التأمين والتوصيل المجاني مع استهداف دقيق لجمهور العناية والصحة.",
    "results": [
      { "label": "تنزيلات التطبيق", "value": "+15,000 تثبيت" },
      { "label": "طلبات الروشتات عبر التطبيق", "value": "+190%" },
      { "label": "تكلفة التثبيت CPI", "value": "أقل بنسبة 32%" }
    ],
    "image": "assets/images/campaign_kulud_1.png",
    "demoUrl": "#",
    "isFeatured": true
  },
  {
    "id": "ads-labeeb-restaurant",
    "category": "ads",
    "title": "حملة وهوية مطعم لبيب اللبناني (Labeeb Casual Dining)",
    "subtitle": "خطة محتوى وأفكار إعلانية سينمائية لقطاع الضيافة والمطاعم الراقية",
    "badge": "مطاعم وضيافة - F&B",
    "client": "مطعم لبيب اللبناني",
    "tags": ["تسويق مطاعم", "هوية بصرية", "Food Styling", "فيديو وسوشيال"],
    "summary": "ابتكار مفاهيم تسويقية وأفكار فيديوهات مبتكرة تعكس الأجواء الفاخرة والأطباق اللبنانية الأصيلة تحت شعار: 'لبيب معك في كل الأوقات'.",
    "challenge": "تميز المطعم في بيئة سوقية مزدحمة بالمنافسين وجذب العائلات والشباب على حد سواء.",
    "solution": "صياغة 16 فكرة فيديو ومزيج حملات ترويجي يجمع بين تجربة المكان وتصوير الأطعمة الجذاب وتقديم عروض جاذبة.",
    "results": [
      { "label": "إقبال الزوار والحجوزات", "value": "+220%" },
      { "label": "مشاهدات الفيديوهات", "value": "+1.2M مشاهدة" },
      { "label": "تفاعل السوشيال ميديا", "value": "+350%" }
    ],
    "image": "assets/images/campaign_labeeb_1.png",
    "demoUrl": "#",
    "isFeatured": false
  },
  {
    "id": "gads-winch-network",
    "category": "ads",
    "title": "شبكة حملات أوناش الإنقاذ السريع (Winch Emergency Ads)",
    "subtitle": "إعلانات اتصال مباشر Call-Only على جوجل لمحاور وطرق الإنقاذ",
    "badge": "حملات حقيقية - Call Ads",
    "client": "مجموعة أوناش مصر",
    "website": "https://winch-enqaz.com/",
    "tags": ["Google Call Ads", "ونش إنقاذ", "استهداف لحظي 24/7", "مبيعات فورية"],
    "summary": "إطلاق وإدارة حملات اتصال مباشر لأكثر من موقع ونش إنقاذ (winch-enqaz.com, wenshenqazz.com, elsaeedwinch.com, alisokerwinch.com) لتغطية الحالات الطارئة على الطرق.",
    "challenge": "الحاجة لظهور فوري للمستخدم المتعطل على الطريق وتوليد مكالمة خلال ثوانٍ معدودة.",
    "solution": "تصميم حملات Call-Only مع زر اتصال مباشر ومزايدة ذكية في أوقات الذروة والطرق السريعة مع حظر الكلمات غير المجدية.",
    "results": [
      { "label": "مكالمات شهرية", "value": "+580 مكالمة" },
      { "label": "نسبة الاتصال CTR", "value": "18.5%" },
      { "label": "سرعة الاستجابة", "value": "لحظية" }
    ],
    "image": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80",
    "demoUrl": "https://winch-enqaz.com/",
    "isFeatured": true
  },
  {
    "id": "ai-video-haduta",
    "category": "ai",
    "title": "سلسلة قصص وروايات مرئية بالذكاء الاصطناعي - الحلقة 1",
    "subtitle": "إنتاج بصري سينمائي كامل بالـ AI مع خاتمة هوية AM Marketing الرسمية",
    "badge": "مونتاج + خاتمة A&M",
    "client": "استوديو AM الإبداعي",
    "tags": ["Runway Gen-3", "Midjourney", "خاتمة AM الرسمية", "صناعة محتوى 4K"],
    "summary": "إنتاج حلقات وسلسلة حكايات درامية بصرية فائقة الدقة تم توليد صورها وحركتها بالكامل بالذكاء الاصطناعي مع هندسة صوتية سينمائية وخاتمة الهوية المعتمدة للوكالة.",
    "challenge": "صعوبة تصوير مشاهد تاريخية وخيالية بالإنتاج التقليدي دون ميزانيات ضخمة.",
    "solution": "استخدام أقوى خوارزميات توليد الفيديو بالذكاء الاصطناعي ومطابقة الشخصيات والمشاهد وإخراج مونتاج متناسق ممهور بشعار الوكالة ورقم التواصل.",
    "results": [
      { "label": "دقة الفيديو", "value": "4K Ultra" },
      { "label": "توفير الميزانية", "value": "85%" },
      { "label": "كارت الخاتمة", "value": "A&M Branded" }
    ],
    "videoPreview": "assets/videos/haduta-1-branded.mp4",
    "image": "assets/images/poster_haduta_1.jpg",
    "demoUrl": "#",
    "isFeatured": true
  },
  {
    "id": "ai-video-haduta-2",
    "category": "ai",
    "title": "سلسلة قصص وروايات مرئية بالذكاء الاصطناعي - الحلقة 2",
    "subtitle": "إخراج سينمائي ومؤثرات خيالية مع كارت خاتمة A&M Marketing المعتمد",
    "badge": "4K AI Production + AM Outro",
    "client": "استوديو AM الإبداعي",
    "tags": ["قصص تاريخية AI", "سينما رقمية", "مونتاج 4K", "هوية بصرية"],
    "summary": "الحلقة الثانية من السلسلة الدرامية البصرية فائقة الدقة بتقنية 4K مع دمج كارت الخاتمة الرسمي لوكالة AM Marketing ورقم التواصل المباشر 01098174992.",
    "challenge": "الحفاظ على تتابع بصري سينمائي سلس ودمج هوية العلامة التجارية في نهاية الفيديو باحترافية تامة.",
    "solution": "تطبيق مؤثرات انتقال سلسة (Fade-in Outro) لشعار AM ورقم التواصل في ختام الفيديو دون تشويش المشهد الرئيسي.",
    "results": [
      { "label": "دقة العرض", "value": "2160x3840 4K" },
      { "label": "معدل الإطارات", "value": "60 FPS" },
      { "label": "خاتمة مخصصة", "value": "A&M Branded" }
    ],
    "videoPreview": "assets/videos/haduta-2-branded.mp4",
    "image": "assets/images/poster_haduta_2.jpg",
    "demoUrl": "#",
    "isFeatured": false
  },
  {
    "id": "ai-video-solo",
    "category": "ai",
    "title": "ريلز براند SOLO للأزياء ومنتجات العناية (SOLO Branding Reel)",
    "subtitle": "مونتاج فيديو ترويجي ديناميكي سريع مخصص لإعلانات فيسبوك وانستجرام",
    "badge": "فيديو إعلاني - Social Reel",
    "client": "براند SOLO للأزياء والعناية",
    "tags": ["مونتاج ريلز", "أزياء وعناية", "إعلانات انستجرام", "مبيعات أونلاين"],
    "summary": "إنتاج ومونتاج ريلز إعلاني احترافي بنمط الحركة السريعة والتأثيرات البصرية لزيادة مبيعات منتجات SOLO عبر منصات التواصل الاجتماعي.",
    "challenge": "جذب انتباه المشاهد في أول 3 ثوانٍ لدفع العميل للنقر على رابط الشراء.",
    "solution": "استخدام تقنيات المونتاج الإيقاعي مع موسيقى حماسية وإبراز تفاصيل المنتجات بزوايا تصوير عصرية.",
    "results": [
      { "label": "معدل التفاعل Hook Rate", "value": "44%" },
      { "label": "نسبة النقر CTR", "value": "6.8%" },
      { "label": "جودة العرض", "value": "Full HD 60fps" }
    ],
    "videoPreview": "assets/videos/solo_branding_promo.mp4",
    "image": "assets/images/poster_solo_branding.jpg",
    "demoUrl": "#",
    "isFeatured": true
  },
  {
    "id": "ai-video-investment",
    "category": "ai",
    "title": "فيديو موشن جرافيك الاستثمار بالذكاء الاصطناعي (AI Investment)",
    "subtitle": "فيديو تسويقي يشرح حلول الاستثمار الرقمي والتقنيات المالية الذكية",
    "badge": "موشن جرافيك - Fintech AI",
    "client": "حلول الاستثمار والتقنية المالية",
    "tags": ["Fintech", "فيديو موشن AI", "استثمار رقمي", "تسويق B2B"],
    "summary": "إنتاج فيديو موشن احترافي يشرح بأسلوب بصري سلس مفاهيم الاستثمار الحديثة وأتمتة التداول وتحليل البيانات بالذكاء الاصطناعي.",
    "challenge": "تبسيط المفاهيم المالية المعقدة وجعلها مشوقة وسهلة الفهم للمستثمرين والمبتدئين.",
    "solution": "تحريك عناصر بصرية ورسوم بيانية تفاعلية مع مؤثرات صوتية مستقبلية تشد الانتباه وتعزز الثقة.",
    "results": [
      { "label": "نسبة إكمال المشاهدة", "value": "78%" },
      { "label": "طلبات التسجيل بالمنصة", "value": "+260%" },
      { "label": "سلاسة التحريك", "value": "Ultra Smooth 60fps" }
    ],
    "videoPreview": "assets/videos/ai_investment_promo.mp4",
    "image": "assets/images/poster_ai_investment.jpg",
    "demoUrl": "#",
    "isFeatured": false
  },
  {
    "id": "ai-video-quran",
    "category": "ai",
    "title": "مونتاج ريلز القرآن الكريم - صفحة (بَلِّغُوا عَنِّي وَلَوْ آيَة)",
    "subtitle": "مونتاج ديني احترافي مع الشعار الذهبي الرسمي والهوية البصرية",
    "badge": "ريلز ومونتاج إسلامي",
    "client": "صفحة بَلِّغُوا عَنِّي ولو آية",
    "website": "https://www.facebook.com/profile.php?id=61579408292383",
    "tags": ["ريلز قرآن", "شعار ذهبي", "مونتاج متقدم", "فيسبوك وتيك توك"],
    "summary": "إعادة إنتاج ومونتاج فيديوهات القرآن الكريم مع إزالة الشعارات القديمة ودمج الشعار الذهبي الرسمي للروايات والريلز.",
    "challenge": "الحفاظ على جودة ونقاء الصوت والصورة واستبدال العلامات المائية بدقة دون التأثير على جمالية المشهد.",
    "solution": "تنفيذ معالجة بصرية متعددة الطبقات وإضافة الشعار الذهبي المتقن وشارة الصفحة الرسمية لزيادة الانتشار والمتابعين.",
    "results": [
      { "label": "جودة الفيديو", "value": "HD 60fps" },
      { "label": "انتشار الريلز", "value": "Viral Reach" },
      { "label": "نسبة الحفظ والمشاركة", "value": "+400%" }
    ],
    "videoPreview": "assets/videos/quran_reel_balligho.mp4",
    "image": "assets/images/poster_quran_reel.jpg",
    "demoUrl": "https://www.facebook.com/profile.php?id=61579408292383",
    "isFeatured": true
  },
  {
    "id": "ai-video-quran-landscape",
    "category": "ai",
    "title": "مونتاج قرآني لاندسكيب 16:9 - تأمل نبات الأرض",
    "subtitle": "إزالة العلامة المائية القديمة 100% ودمج الشعار الذهبي لصفحة (بَلِّغُوا عَنِّي ولو آية)",
    "badge": "مونتاج يوتيوب نقي تماماً",
    "client": "صفحة بَلِّغُوا عَنِّي ولو آية",
    "website": "https://www.facebook.com/profile.php?id=61579408292383",
    "tags": ["تأملات قرآنية", "شعار ذهبي نقي", "إزالة لوجو 100%", "Full HD"],
    "summary": "إعادة مونتاج وتنقية بصرية كاملة لمقطع قرآني طبيعي بنسبة 16:9 مع إزالة الشعار السابق بتقنية Delogo وإدراج الهوية الذهبية بدقة متناهية.",
    "challenge": "العلامة المائية القديمة كانت متداخلة مع المشهد الطبيعي وتسبب تشويهاً بصرياً.",
    "solution": "تطبيق فلتر Delogo المتقدم لإزالة الشعار القديم بنسبة 100% ثم تركيب الشعار الذهبي الملكي ثلاثي الأبعاد في الزاوية العلوية.",
    "results": [
      { "label": "تنقية الشعار القديم", "value": "100% Clean" },
      { "label": "أبعاد الفيديو", "value": "1920x1080 FHD" },
      { "label": "الهوية البصرية", "value": "Golden Royal" }
    ],
    "videoPreview": "assets/videos/quran_landscape_balligho.mp4",
    "image": "assets/images/poster_quran_landscape.jpg",
    "demoUrl": "https://www.facebook.com/profile.php?id=61579408292383",
    "isFeatured": false
  },
  {
    "id": "brand-balligho-identity",
    "category": "ai",
    "title": "تصميم الهوية البصرية والشعار الرسمي: (بَلِّغُوا عَنِّي وَلَوْ آيَة)",
    "subtitle": "مدالية ذهبية ملكية ثلاثية الأبعاد 3D مع شعار: آية تُبَلِّغُها ... قد تُغيِّر قلباً",
    "badge": "هوية بصرية 3D",
    "client": "قناة وصفحة بَلِّغُوا عَنِّي ولو آية",
    "website": "https://www.facebook.com/profile.php?id=61579408292383",
    "tags": ["تصميم شعار 3D", "هوية بصرية إسلامية", "ذهب ومخمل ملكي", "قناة قرآنية"],
    "summary": "ابتكار وتصميم الشعار الرسمي والهوية البصرية لقناة القرآن الكريم على هيئة مدالية ذهبية منحوتة ثلاثية الأبعاد مع المصحف الشريف والهلال وزخارف إسلامية دقيقة.",
    "challenge": "الحاجة إلى شعار إسلامي فريد ومهيب يليق بالمحتوى القرآني ويتميز عن الشعارات التقليدية المسطحة.",
    "solution": "توظيف تقنيات النمذجة والإضاءة السينمائية بالذكاء الاصطناعي لإنتاج مجسم ذهبي فخم يعلو خلفية مخملية كحلية مع عبارة دعوية مؤثرة.",
    "results": [
      { "label": "طراز التصميم", "value": "3D Royal Gold" },
      { "label": "دقة المخرجات", "value": "Ultra HD" },
      { "label": "الاستخدام", "value": "فيديوهات وبروفايل" }
    ],
    "image": "assets/images/balligho_quran_gold_coin.jpg",
    "demoUrl": "https://www.facebook.com/profile.php?id=61579408292383",
    "isFeatured": true
  },
  {
    "id": "web-realestate",
    "category": "web",
    "title": "منصة الابتكار والتطوير العقاري (Smart Real Estate)",
    "subtitle": "تصميم وتطوير واجهة مستخدم فائقة السرعة مع لوحة تحكم للعقارات",
    "badge": "تطوير مواقع (BUILD)",
    "client": "مشروع دراسة حالة (Case Study)",
    "tags": ["تطوير مواقع", "UI/UX", "SEO", "لوحة تحكم"],
    "summary": "إعادة هيكلة وتطوير موقع عقاري حديث يتيح للعملاء استعراض الفلل والشقق مع فلاتر ذكية وخريطة تفاعلية وحجز معاينة بضغطة زر.",
    "challenge": "الموقع القديم كان بطيئاً جداً ومعدل ارتداد الزوار مرتفع بنسبة 65% مما أضاع آلاف الفرص البيعية.",
    "solution": "إعادة بناء الواجهة بتقنيات حديثة متوافقة بنسبة 100% مع الجوال وتسريع التحميل ليكون أقل من ثانية واحدة.",
    "results": [
      { "label": "سرعة التحميل", "value": "0.9 ثانية" },
      { "label": "تقييم Google PageSpeed", "value": "98/100" },
      { "label": "زيادة طلبات المعاينة", "value": "+180%" }
    ],
    "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80",
    "demoUrl": "#",
    "isFeatured": true
  },
  {
    "id": "sec-defense",
    "category": "security",
    "title": "تأمين وحماية منصات التجارة الإلكترونية من الاختراق",
    "subtitle": "فحص ثغرات أمنية (Penetration Testing) وتثبيت جدار حماية سحابي",
    "badge": "أمن سيبراني (PROTECT)",
    "client": "منصات ومواقع تجارية",
    "tags": ["أمن مواقع", "سد ثغرات", "WAF جدار حماية", "تشفير بيانات"],
    "summary": "إجراء فحص شامل للمواقع لاكتشاف نقاط الضعف ضد هجمات SQL Injection و DDoS وتأمين بيانات بطاقات الدفع للعملاء.",
    "challenge": "تعرض المواقع لمحاولات اختراق متكررة وبطء في السيرفر أدى لتوقف المتجر أثناء الحملات.",
    "solution": "سد 5 ثغرات أمنية حرجة، تفعيل Cloudflare WAF، وتشفير قواعد البيانات مع مراقبة أمنية على مدار الساعة.",
    "results": [
      { "label": "صد الهجمات الخبيثة", "value": "100%" },
      { "label": "زمن التشغيل Uptime", "value": "99.98%" },
      { "label": "شهادة أمان مطابقة", "value": "A+ Grade" }
    ],
    "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80",
    "demoUrl": "#",
    "isFeatured": true
  }
]
;

let allProjects = [];

document.addEventListener('DOMContentLoaded', () => {
  const portfolioGrid = document.getElementById('portfolio-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectModal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');

  // تحميل بيانات المشاريع
  fetch('assets/data/projects.json')
    .then(res => {
      if (!res.ok) throw new Error('Cannot load json');
      return res.json();
    })
    .then(data => {
      allProjects = data;
      renderProjects('all');
    })
    .catch(() => {
      // استخدام البيانات الاحتياطية في حال الفتح المحلي المباشر بدون سيرفر
      allProjects = Array.isArray(fallbackProjects) ? fallbackProjects : (fallbackProjects.value || []);
      renderProjects('all');
    });

  // تصفية المشاريع حسب الفئة
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'border-blue-500');
        b.classList.add('bg-slate-900/60', 'text-slate-300', 'border-slate-700/60');
      });
      btn.classList.remove('bg-slate-900/60', 'text-slate-300', 'border-slate-700/60');
      btn.classList.add('bg-blue-600', 'text-white', 'border-blue-500');

      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });

  function renderProjects(filter) {
    if (!portfolioGrid) return;

    const filtered = filter === 'all' 
      ? allProjects 
      : allProjects.filter(p => p.category === filter);

    portfolioGrid.innerHTML = filtered.map(item => `
      <div class="glass-card group overflow-hidden flex flex-col justify-between" data-id="${item.id}">
        <div>
          <div class="relative overflow-hidden aspect-video">
            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div class="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-cyan-400 border border-cyan-500/30">
              ${item.badge}
            </div>
            ${item.videoPreview ? `
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                <div class="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/40 transform group-hover:scale-110 transition-transform">
                  ▶
                </div>
              </div>
            ` : ''}
          </div>
          <div class="p-5">
            <div class="flex flex-wrap gap-1.5 mb-3">
              ${item.tags.map(t => `<span class="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">${t}</span>`).join('')}
            </div>
            <h3 class="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">${item.title}</h3>
            <p class="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">${item.summary}</p>
          </div>
        </div>
        <div class="px-5 pb-5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
          <span class="text-xs text-amber-400 font-medium">${item.client}</span>
          <button onclick="openProjectModal('${item.id}')" class="text-xs font-bold text-blue-400 hover:text-cyan-300 flex items-center gap-1 transition-colors">
            عرض التفاصيل والنتائج ←
          </button>
        </div>
      </div>
    `).join('');
  }

  // إغلاق المودال
  if (modalClose && projectModal) {
    const closeModal = () => {
      projectModal.classList.add('hidden');
      const v = projectModal.querySelector('video');
      if (v) v.pause();
    };

    modalClose.addEventListener('click', closeModal);

    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }
});

// فتح نافذة تفاصيل المشروع
window.openProjectModal = function(id) {
  const project = allProjects.find(p => p.id === id);
  const modal = document.getElementById('project-modal');
  if (!project || !modal) return;

  document.getElementById('modal-title').innerText = project.title;
  document.getElementById('modal-subtitle').innerText = project.subtitle;
  document.getElementById('modal-badge').innerText = project.badge;
  document.getElementById('modal-summary').innerText = project.summary;
  document.getElementById('modal-challenge').innerText = project.challenge;
  document.getElementById('modal-solution').innerText = project.solution;

  // النتائج
  const resultsContainer = document.getElementById('modal-results');
  resultsContainer.innerHTML = project.results.map(r => `
    <div class="bg-slate-900/90 border border-cyan-500/20 rounded-lg p-3 text-center">
      <div class="text-lg font-extrabold text-cyan-400 font-num">${r.value}</div>
      <div class="text-xs text-slate-400 mt-1">${r.label}</div>
    </div>
  `).join('');

  // عرض الفيديو أو الصورة
  const mediaContainer = document.getElementById('modal-media');
  if (project.videoPreview) {
    mediaContainer.innerHTML = `
      <video src="${project.videoPreview}" controls autoplay muted loop class="w-full rounded-xl max-h-[350px] object-cover border border-slate-700"></video>
    `;
  } else {
    mediaContainer.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="w-full rounded-xl max-h-[350px] object-cover border border-slate-700" />
    `;
  }

  // زر واتساب مخصص للمشروع
  const modalWhatsappBtn = document.getElementById('modal-whatsapp-btn');
  if (modalWhatsappBtn) {
    const msg = encodeURIComponent(
      `مرحباً يا عبد السلام، أعجبني مشروع (${project.title}) في معرض أعمالك، وأود تنفيذ مشروع مشابه لنشاطي التجاري.`
    );
    modalWhatsappBtn.href = `https://wa.me/201098174992?text=${msg}`;
  }

  modal.classList.remove('hidden');
};


