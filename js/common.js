/**
 * Shared Global Navigation & Interactions - AM Marketing (عبد السلام)
 */

document.addEventListener('DOMContentLoaded', () => {
  // تفعيل زر قائمة الموبايل في كافة الصفحات
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // إغلاق القائمة عند النقر على أي رابط داخلها
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // تأثير شفافية شريط التنقل عند التمرير
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('shadow-xl', 'bg-slate-950/95');
      } else {
        header.classList.remove('shadow-xl', 'bg-slate-950/95');
      }
    });
  }
});
