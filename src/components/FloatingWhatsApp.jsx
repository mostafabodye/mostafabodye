import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingWhatsApp({ lang }) {
  const isRtl = lang === 'ar';

  return (
    <aside
      aria-label="WhatsApp Contact"
      className={`fixed bottom-6 ${
        isRtl ? 'left-6' : 'right-6'
      } z-40`}
    >
      <motion.a
        href="https://wa.me/201098174992?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%8A%D8%A7%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-3 rounded-full shadow-2xl shadow-emerald-500/40 border border-emerald-300 transition-all"
      >
        {/* Pulsing Aura Ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 animate-ping pointer-events-none" />

        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 2.016.822 3.125.822 3.18 0 5.765-2.586 5.765-5.766.001-3.18-2.583-5.766-5.764-5.766zm4.187 7.747c-.173.488-.868.892-1.378.948-.35.038-.807.059-2.316-.566-1.929-.798-3.177-2.766-3.272-2.894-.097-.128-.778-1.036-.778-1.974 0-.939.492-1.401.666-1.593.174-.192.38-.24.507-.24.126 0 .253.002.363.007.116.006.27-.044.423.323.159.381.542 1.32.59 1.417.048.096.079.208.016.335-.063.128-.095.207-.19.319-.095.112-.2.25-.286.335-.095.096-.194.2-.083.391.111.191.494.815 1.059 1.319.728.649 1.341.85 1.532.946.19.096.302.08.413-.048.111-.128.476-.557.603-.748.127-.191.254-.159.428-.095.175.063 1.11.524 1.301.619.19.095.317.143.365.222.047.079.047.46-.126.948zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.176L2 22l4.957-1.399C8.384 21.493 10.144 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
        </svg>

        <span className="text-xs font-black tracking-wide">
          {isRtl ? 'واتساب مباشر' : 'WhatsApp'}
        </span>
      </motion.a>
    </aside>
  );
}
