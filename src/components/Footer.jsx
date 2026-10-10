import React from 'react';
import { Github, Facebook, Phone, Heart, ArrowUpRight } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function Footer({ t, lang }) {
  return (
    <footer className="relative border-t border-slate-800 bg-slate-950/80 backdrop-blur-md pt-16 pb-12 overflow-hidden">
      <div className="container-max">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={getAssetUrl('/assets/images/am_marketing_3d_logo.jpg')}
                alt="AM Marketing 3D Logo"
                className="w-11 h-11 rounded-xl object-cover border border-amber-400/50 shadow-lg shadow-blue-500/20 shrink-0"
              />
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t.footer.brand.name}
                </h3>
                <span className="text-xs text-amber-400 font-semibold">
                  {t.footer.brand.badge}
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              {t.footer.brand.desc1} <br />
              <span className="text-slate-300 font-medium">
                {t.footer.brand.desc2}
              </span>
            </p>

            <p className="text-slate-500 text-xs">
              {t.footer.brand.copyright}
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 mb-4 tracking-wider uppercase">
              {t.footer.links.navigation}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#hero" className="text-slate-400 hover:text-blue-400 transition-colors">
                  {t.footer.links.home}
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-400 hover:text-blue-400 transition-colors">
                  {t.footer.links.about}
                </a>
              </li>
              <li>
                <a href="#skills" className="text-slate-400 hover:text-blue-400 transition-colors">
                  {t.footer.links.skills}
                </a>
              </li>
              <li>
                <a href="#projects" className="text-slate-400 hover:text-blue-400 transition-colors">
                  {t.footer.links.projects}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-blue-400 transition-colors">
                  {t.footer.links.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Official Channels */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 mb-4 tracking-wider uppercase">
              {t.footer.links.resources}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="#projects"
                  className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 font-bold"
                >
                  <span>🚀 {lang === 'ar' ? 'معرض الأعمال والمشاريع' : 'Client Portfolio'}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/AbdelsalamMarketing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/201098174992"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <span>WhatsApp (+20 1098174992)</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61579408292383"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>قناة بَلِّغُوا عَنِّي ولو آية</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits Line */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1 text-slate-400">
            <span>{lang === 'ar' ? 'صُمّم وبُني بـ' : 'Built with'}</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" />
            <span>{lang === 'ar' ? 'باستخدام React وNext.js وTailwind CSS' : 'using React, Next.js & Tailwind CSS'}</span>
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-400 transition-colors">
              {t.footer.legal.privacy}
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              {t.footer.legal.terms}
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Colored Line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30" />
    </footer>
  );
}
