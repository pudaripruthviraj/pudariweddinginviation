import React from 'react';
import { Calendar, MapPin, Sparkles, Heart } from 'lucide-react';
import { Language } from '../types/wedding';
import { translations } from '../data/translations';
import { triggerAkshinthaluShower } from '../utils/confetti';

interface HeroProps {
  currentLang: Language;
  onOpenRsvp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenRsvp }) => {
  const t = translations[currentLang];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-kolam">
      {/* Decorative Traditional Toranam Header Garland Motif */}
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 mb-6">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent flex-1" />
        <span className="text-xs sm:text-sm tracking-widest text-[#B45309] font-serif uppercase font-semibold">
          {t.auspiciousGreeting}
        </span>
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent flex-1" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Traditional Announcement & Auspicious Details */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-6">
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-amber-800 uppercase">
            {t.heroKicker}
          </p>

          {/* Couple Names */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[#781B10] tracking-tight leading-tight">
              {t.groomName}
            </h1>
            <div className="flex items-center justify-center lg:justify-start gap-4 py-1">
              <div className="w-12 h-px bg-amber-400" />
              <span className="text-lg sm:text-xl font-editorial italic text-amber-700 font-medium">
                {t.andSymbol}
              </span>
              <div className="w-12 h-px bg-amber-400" />
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[#781B10] tracking-tight leading-tight">
              {t.brideName}
            </h1>
          </div>

          {/* Auspicious Muhurtham Banner */}
          <div className="p-4 sm:p-5 rounded-xl bg-white/90 border border-amber-200 shadow-xs space-y-2.5">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-[#991B1B] font-semibold text-sm sm:text-base">
              <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t.weddingDateFull}</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              {t.muhurthamTime}
            </p>
            <div className="flex items-start justify-center lg:justify-start gap-2 text-xs sm:text-sm text-amber-900/90 pt-1 border-t border-amber-100">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{t.venueLocationHero}</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
            <button
              onClick={onOpenRsvp}
              className="w-full sm:w-auto px-6 py-3 bg-[#781B10] hover:bg-[#991B1B] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-rose-300" />
              <span>{t.rsvpNowBtn}</span>
            </button>

            <button
              onClick={triggerAkshinthaluShower}
              className="w-full sm:w-auto px-6 py-3 bg-amber-100/90 hover:bg-amber-200/90 text-[#781B10] border border-amber-300 text-sm font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>{t.blessTheCouple}</span>
            </button>
          </div>
        </div>

        {/* Right Column: High-Fidelity Majestic Mandapam Visual */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-xl border-4 border-amber-200/90 bg-amber-50 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3">
            <img
              src="/images/deepika_Pruthvi"
              alt="Sacred Telangana Wedding Mandapam with Marigolds and Brass Lamps"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle warm scrim for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <p className="text-xs uppercase tracking-wider font-semibold text-amber-300">
                {currentLang === 'te' ? '|| శుభ వివాహం & రిసెప్షన్ ||' : '|| Sacred Wedding & Reception ||'}
              </p>
              <p className="text-xs sm:text-sm font-medium drop-shadow-sm">
                {currentLang === 'te' 
                  ? 'విజయదుర్గ కళ్యాణ మండపం (చిత్తూరు) · మున్నూరు కాపు మండపం (నిజామాబాద్)' 
                  : 'Vijayadurga Mandapam (Chittoor) · Munnuru Kapu Mandapam (Nizamabad)'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
