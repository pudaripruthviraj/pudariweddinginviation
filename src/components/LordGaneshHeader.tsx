import React from 'react';
import ganeshImage from '../assets/images/lord_ganesh_gold_1791130909426.jpg';

interface LordGaneshHeaderProps {
  currentLang?: 'en' | 'te';
  subtitle?: string;
  className?: string;
}

export const LordGaneshHeader: React.FC<LordGaneshHeaderProps> = ({
  currentLang = 'en',
  subtitle,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center select-none py-1 ${className}`}>
      {/* Sacred Lord Ganesh Emblem */}
      <div className="relative group">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-b from-[#F5D77F] via-[#C89B3C] to-[#8C5D0D] shadow-md ring-2 ring-[#C89B3C]/30 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
          <img
            src={ganeshImage}
            alt="Lord Ganesha"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        {/* Subtle auspicious diya glow */}
        <div className="absolute -inset-1 rounded-full bg-amber-400/20 blur-xs -z-10 pointer-events-none" />
      </div>

      {/* Auspicious Shloka */}
      <div className="mt-1 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-serif font-bold text-[#6B1D2F] tracking-widest uppercase">
        <span className="text-[#C89B3C]">✦</span>
        <span>{currentLang === 'te' ? 'శ్రీ గణేశాయ నమః' : 'Sri Ganeshayanamaha'}</span>
        <span className="text-[#C89B3C]">✦</span>
      </div>

      {subtitle && (
        <span className="text-[9px] font-serif text-amber-900/80 italic mt-0.5">
          {subtitle}
        </span>
      )}
    </div>
  );
};
