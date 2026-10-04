import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Facebook, Github, Send, ArrowUpRight, MessageSquare, Check, Sparkles } from 'lucide-react';

export default function Contact({ t, lang }) {
  const isRtl = lang === 'ar';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: t.contact.form.serviceOptions[0],
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    const text = encodeURIComponent(
      `مرحباً يا مصطفى (عبد السلام)،\nأنا: ${formData.name}\nرقم الهاتف: ${formData.phone}\n${formData.email ? `البريد: ${formData.email}\n` : ''}الخدمة المطلوبة: ${formData.service}\nالتفاصيل: ${formData.message}`
    );

    window.open(`https://wa.me/201098174992?text=${text}`, '_blank');
    setSubmitted(true);
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`طلب مشروع / استشارة من ${formData.name} - ${formData.service}`);
    const body = encodeURIComponent(
      `الاسم: ${formData.name}\nالهاتف: ${formData.phone}\nالبريد: ${formData.email}\nالخدمة: ${formData.service}\n\nالرسالة والتفاصيل:\n${formData.message}`
    );
    window.location.href = `mailto:mostafabodye@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            <span className="gradient-text">{t.contact.title}</span>
          </motion.h2>
          <p className="section-subtitle max-w-2xl mx-auto">{t.contact.subtitle}</p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Column 1: Direct Contact Channels */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-3 text-slate-100">
                {t.contact.connectTitle}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {t.contact.connectDesc}
              </p>
            </div>

            <div className="space-y-4">
              {/* WhatsApp & Phone */}
              <a
                href="https://wa.me/201098174992"
                target="_blank"
                rel="noopener noreferrer"
                className="card-base card-hover group flex gap-4 items-center bg-slate-900/60 border-slate-700/60 p-4 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  💬
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-400 text-xs font-semibold">{t.contact.labels.phone}</p>
                  <p className="text-slate-100 font-bold group-hover:text-emerald-400 transition-colors text-sm sm:text-base font-num" dir="ltr">
                    +20 1098174992
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
              </a>

              {/* Direct Call */}
              <a
                href="tel:01098174992"
                className="card-base card-hover group flex gap-4 items-center bg-slate-900/60 border-slate-700/60 p-4 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  📞
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-400 text-xs font-semibold">{lang === 'ar' ? 'اتصال هاتفي مباشر' : 'Direct Phone Call'}</p>
                  <p className="text-slate-100 font-bold group-hover:text-amber-400 transition-colors text-sm sm:text-base font-num" dir="ltr">
                    01098174992
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition-colors flex-shrink-0" />
              </a>

              {/* Facebook Page */}
              <a
                href="https://www.facebook.com/AbdelsalamMarketing/"
                target="_blank"
                rel="noopener noreferrer"
                className="card-base card-hover group flex gap-4 items-center bg-slate-900/60 border-slate-700/60 p-4 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  🌐
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-400 text-xs font-semibold">{t.contact.labels.facebook}</p>
                  <p className="text-slate-100 font-bold group-hover:text-blue-400 transition-colors text-sm truncate">
                    AbdelsalamMarketing
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors flex-shrink-0" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/mostafabodye"
                target="_blank"
                rel="noopener noreferrer"
                className="card-base card-hover group flex gap-4 items-center bg-slate-900/60 border-slate-700/60 p-4 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  🐙
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-400 text-xs font-semibold">{t.contact.labels.github}</p>
                  <p className="text-slate-100 font-bold group-hover:text-purple-400 transition-colors text-sm truncate">
                    github.com/mostafabodye
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors flex-shrink-0" />
              </a>
            </div>

            {/* Guarantee Note */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs leading-relaxed flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>{t.contact.quickGuarantee}</span>
            </div>
          </motion.div>

          {/* Column 2: Interactive Contact & Quote Form */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-base bg-slate-900/80 border-slate-700/70 p-6 sm:p-8 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <span>{t.contact.form.title}</span>
            </h3>

            <form onSubmit={handleSubmitWhatsApp} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold text-xs mb-1.5">
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.form.placeholders.name}
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold text-xs mb-1.5">
                    {t.contact.form.phone}
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.contact.form.placeholders.phone}
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-all text-left font-num"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold text-xs mb-1.5">
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  dir="ltr"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.contact.form.placeholders.email}
                  className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-all text-left"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold text-xs mb-1.5">
                  {t.contact.form.service}
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-all"
                >
                  {t.contact.form.serviceOptions.map((opt, idx) => (
                    <option key={idx} value={opt} className="bg-slate-900 text-slate-100">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold text-xs mb-1.5">
                  {t.contact.form.message}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contact.form.placeholders.message}
                  className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>{t.contact.button.sendWhatsApp}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmitEmail}
                  className="py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>{t.contact.button.sendEmail}</span>
                </button>
              </div>

              {submitted && (
                <p className="text-emerald-400 text-xs text-center font-bold mt-2">
                  ✓ {lang === 'ar' ? 'تم فتح تطبيق واتساب لإرسال رسالتك مباشرة!' : 'WhatsApp launched to send your message directly!'}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
