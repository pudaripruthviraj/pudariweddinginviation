import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { Language } from '../types/wedding';
import { translations } from '../data/translations';

interface CoupleStoryProps {
  currentLang: Language;
}

export const CoupleStory: React.FC<CoupleStoryProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-amber-200/80">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#781B10]">
            {t.storyTitle}
          </h2>
          <p className="text-sm sm:text-base text-amber-900/80">
            {t.storySub}
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Groom Card */}
          <div className="md:col-span-4 p-6 rounded-2xl bg-[#FFFDF9] border border-amber-200/80 shadow-xs space-y-3 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
              {t.groomTitle}
            </span>
            <h3 className="text-xl font-display font-bold text-[#781B10]">
              {t.groomName}
            </h3>
            <p className="text-sm text-amber-950/80 leading-relaxed">
              {t.groomBio}
            </p>
            <div className="pt-2 text-xs text-amber-800 font-medium">
              S/o Sri Pandari Srinivas & Smt. Radha
            </div>
          </div>

          {/* Center Couple Portrait */}
          <div className="md:col-span-4 relative flex justify-center">
            <div className="w-64 h-80 sm:w-72 sm:h-92 rounded-2xl overflow-hidden shadow-lg border-4 border-amber-200 bg-amber-50 relative">
              <img
                src="/src/assets/images/couple_traditional_portrait_1791062768888.jpg"
                alt="Pruthviraj and Sravanthi"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 inset-x-0 text-center text-white">
                <p className="text-xs font-serif italic text-amber-200">
                  Kalyana Thilakam
                </p>
              </div>
            </div>
          </div>

          {/* Bride Card */}
          <div className="md:col-span-4 p-6 rounded-2xl bg-[#FFFDF9] border border-amber-200/80 shadow-xs space-y-3 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
              {t.brideTitle}
            </span>
            <h3 className="text-xl font-display font-bold text-[#781B10]">
              {t.brideName}
            </h3>
            <p className="text-sm text-amber-950/80 leading-relaxed">
              {t.brideBio}
            </p>
            <div className="pt-2 text-xs text-amber-800 font-medium">
              D/o Sri Vangala Rammohan & Smt. Padmavathi
            </div>
          </div>
        </div>

        {/* Family Blessing Note */}
        <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/70 border border-amber-200 max-w-4xl mx-auto text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-amber-800">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span className="font-editorial text-lg italic font-semibold">
              Shubham Bhavatu
            </span>
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-sm sm:text-base text-amber-950 leading-relaxed font-serif">
            "{t.familyBlessing}"
          </p>
          <p className="text-xs text-amber-800/80 font-medium">
            Pandari & Vangala Families cordially seek your presence and blessings
          </p>
        </div>
      </div>
    </section>
  );
};
