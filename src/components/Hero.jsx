import React from 'react';
import Cinematic3DHero from './Cinematic3DHero';

export default function Hero({ t, lang, onNavigate }) {
  return (
    <Cinematic3DHero t={t} lang={lang} onNavigate={onNavigate} />
  );
}
