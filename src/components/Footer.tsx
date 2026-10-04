import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { Language } from '../types/wedding';
import { translations } from '../data/translations';
import { triggerAkshinthaluShower } from '../utils/confetti';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <footer className="bg-[#21130D] text-amber-100 py-12 px-4 sm:px-6 lg:px-8 border-t border-amber-900/60">
      <div className="max-w-6xl mx-auto space-y-8 text-center">
        {/* Sacred Shloka */}
        <div className="max-w-2xl mx-auto space-y-1">
          <p className="font-serif italic text-amber-300 text-sm sm:text-base">
            {currentLang === 'te'
              ? '|| మంగళం భగవాన్ విష్ణుః మంగళం గరుడధ్వజః | మంగళం పుండరీకాక్షః మంగళాయ తనో హరిః ||'
              : '|| Mangalam Bhagavan Vishnuh Mangalam Garudadhvajah | Mangalam Pundarikakshah Mangalaya Tano Harih ||'}
          </p>
          <p className="text-xs text-amber-400/80 font-display">
            Deepika & Pruthviraj Kalyana Mahotsavam
          </p>
        </div>

        {/* Wordmark & Date */}
        <div className="space-y-2">
          <h3 className="text-2xl font-display font-bold text-amber-200">
            {t.appTitle}
          </h3>
          <p className="text-xs sm:text-sm text-amber-300/80">
            Wedding: Friday, Oct 30, 2026 (Chittoor) · Reception: Wednesday, Nov 4, 2026 (Nizamabad)
          </p>
        </div>

        {/* Floating Flower Petal CTA in Footer */}
        <div>
          <button
            onClick={triggerAkshinthaluShower}
            className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-full text-xs font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.blessTheCouple}</span>
          </button>
        </div>

        {/* Quiet Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-amber-300/70 pt-2 border-t border-amber-900/40">
          <a href="#schedule" className="hover:text-amber-200 transition-colors">
            {t.navEvents}
          </a>
          <a href="#gallery" className="hover:text-amber-200 transition-colors">
            {t.navGallery}
          </a>
          <a href="#rsvp" className="hover:text-amber-200 transition-colors">
            {t.navRsvp}
          </a>
          <a href="#venue" className="hover:text-amber-200 transition-colors">
            {t.navVenue}
          </a>
          <a href="#registry" className="hover:text-amber-200 transition-colors">
            {t.navRegistry}
          </a>
          <a href="#guestbook" className="hover:text-amber-200 transition-colors">
            {t.navGuestbook}
          </a>
          <a href="#seating" className="hover:text-amber-200 transition-colors">
            {t.navSeating}
          </a>
          <a href="#budget" className="hover:text-amber-200 transition-colors">
            {t.navBudget}
          </a>
        </div>

        {/* Family signatures */}
        <p className="text-[11px] text-amber-400/60">
          With prayers & warmth from Pandari & Vangala Families · Hyderabad, Telangana
        </p>
      </div>
    </footer>
  );
};
