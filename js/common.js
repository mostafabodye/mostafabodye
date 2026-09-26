/**
 * Shared Global Navigation & Interactions - AM Marketing (عبد السلام)
 * Handles mobile dropdown menu, header transparency, and responsive utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  // تفعيل وإدارة زر وقائمة الموبايل في كافة الصفحات
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    const iconSvg = mobileMenuBtn.querySelector('svg');
    const hamburgerSvgContent = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>';
    const closeSvgContent = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';

    const toggleMenu = (forceState) => {
      const isCurrentlyHidden = mobileMenu.classList.contains('hidden');
      const shouldOpen = typeof forceState === 'boolean' ? forceState : isCurrentlyHidden;

      if (shouldOpen) {
        mobileMenu.classList.remove('hidden');
        if (iconSvg) iconSvg.innerHTML = closeSvgContent;
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      } else {
        mobileMenu.classList.add('hidden');
        if (iconSvg) iconSvg.innerHTML = hamburgerSvgContent;
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    };

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // إغلاق القائمة عند النقر على أي رابط داخلها
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // إغلاق القائمة عند النقر في أي مكان خارجها
    document.addEventListener('click', (e) => {
      if (!mobileMenu.classList.contains('hidden')) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          toggleMenu(false);
        }
      }
    });

    // إغلاق القائمة عند الضغط على مفتاح Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        toggleMenu(false);
      }
    });
  }

  // تأثير شفافية وظلال شريط التنقل عند التمرير
  const header = document.querySelector('header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add('shadow-xl', 'bg-slate-950/95');
      } else {
        header.classList.remove('shadow-xl', 'bg-slate-950/95');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }
});
