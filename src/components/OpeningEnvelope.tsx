import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { Language } from '../types/wedding';
import { weddingMusic } from '../utils/audioPlayer';

interface OpeningEnvelopeProps {
  onOpen: () => void;
  currentLang: Language;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ onOpen, currentLang }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    
    // Play Ritviz - Sage synchronously on direct user gesture to ensure browser audio approval
    weddingMusic.start();
    
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 600);
  };

  const isTelugu = currentLang === 'te';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none overflow-y-auto"
      onClick={handleOpenClick}
    >
      {/* Outer Envelope Card Presentation Shell */}
      <div 
        className={`w-full max-w-[380px] sm:max-w-[400px] relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C89B3C] ring-4 ring-[#E6C594]/50 transition-all duration-700 cursor-pointer ${
          isOpening 
            ? 'scale-110 opacity-0 -translate-y-10 pointer-events-none' 
            : 'scale-100 opacity-100 hover:scale-[1.01]'
        }`}
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(200, 155, 60, 0.3)',
        }}
      >
        {/* FOREGROUND CARD ARTWORK: Crisp Luxury Indian Wedding Blush Rose & Peacock Palace Invitation Card */}
        <div className="relative w-full aspect-[9/14] bg-[#FFF9F7] overflow-hidden">
          <img
            src="/src/assets/images/blush_peacock_arch_1791066357714.jpg"
            alt="Wedding Invitation Envelope"
            className="w-full h-full object-cover object-center block"
          />

          {/* Golden Gilded Border Frame Inset on the Card */}
          <div className="absolute inset-2 border border-[#C89B3C]/70 rounded-2xl pointer-events-none ring-1 ring-amber-300/30" />
          <div className="absolute inset-3 border border-[#C89B3C]/30 rounded-xl pointer-events-none" />

          {/* Four Corner Gilded Filigrees */}
          <span className="absolute top-3.5 left-3.5 text-[#C89B3C] text-xs pointer-events-none drop-shadow-xs">⚜</span>
          <span className="absolute top-3.5 right-3.5 text-[#C89B3C] text-xs pointer-events-none drop-shadow-xs">⚜</span>
          <span className="absolute bottom-3.5 left-3.5 text-[#C89B3C] text-xs pointer-events-none drop-shadow-xs">⚜</span>
          <span className="absolute bottom-3.5 right-3.5 text-[#C89B3C] text-xs pointer-events-none drop-shadow-xs">⚜</span>

          {/* INNER ARCH CALLIGRAPHIC CONTENT OVERLAY: Clean, legible, royal typography in deep wine maroon */}
          <div className="absolute inset-0 flex flex-col items-center justify-between pt-6 pb-5 px-6 sm:px-8 text-center pointer-events-auto">
            
            {/* Top Invocation Header with Lord Ganesh */}
            <div className="space-y-0.5 pt-0.5">
              <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-b from-[#F5D77F] via-[#C89B3C] to-[#8C5D0D] mx-auto shadow-sm ring-1 ring-[#C89B3C]/40 overflow-hidden">
                <img
                  src="/src/assets/images/lord_ganesh_gold_1791130909426.jpg"
                  alt="Lord Ganesha"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className="text-[10px] text-[#6B1D2F] font-serif uppercase tracking-widest font-bold pt-0.5">
                {isTelugu ? '|| శ్రీ గణేశాయ నమః ||' : '|| SRI GANESHAYANAMAHA ||'}
              </p>
              <p className="text-[9px] text-[#7A2635] font-serif italic">
                {isTelugu ? '|| శ్రీరస్తు · శుభమస్తు · అవిఘ్నమస్తు ||' : 'Together with their beloved parents & families'}
              </p>
            </div>

            {/* Arch Center: Couple Names & Parent Lineage */}
            <div className="my-auto py-1 space-y-1 max-w-[280px]">
              <p className="text-[8.5px] sm:text-[9.5px] font-editorial italic text-amber-950/85">
                {isTelugu ? 'పెద్దల ఆశీస్సులతో జరుగబోవు శుభ వివాహం' : 'Request your gracious presence at the wedding celebrations of'}
              </p>

              {/* Groom & Bride Names with Parents */}
              <div className="space-y-1 py-0.5">
                {/* Bride Deepika */}
                <div>
                  <h1 className="text-xl sm:text-2xl font-display font-bold text-[#54121E] tracking-tight drop-shadow-xs">
                    {isTelugu ? 'దీపిక' : 'Deepika'}
                  </h1>
                  <p className="text-[8.5px] sm:text-[9px] text-amber-900 font-serif leading-tight">
                    {isTelugu ? 'శ్రీమతి ఎన్. ఉష & శ్రీ ఎన్. నాగరాజులు గార్ల సుపుత్రిక' : 'D/o Smt. N. Usha & Sri N. Nagarajulu'}
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-[#C89B3C]">
                  <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#C89B3C]" />
                  <span className="text-xs font-editorial italic text-[#C89B3C] font-bold">
                    {isTelugu ? 'సమేత' : '&'}
                  </span>
                  <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#C89B3C]" />
                </div>

                {/* Groom Pruthviraj */}
                <div>
                  <h1 className="text-xl sm:text-2xl font-display font-bold text-[#54121E] tracking-tight drop-shadow-xs">
                    {isTelugu ? 'పృథ్వీరాజ్' : 'Pruthviraj'}
                  </h1>
                  <p className="text-[8.5px] sm:text-[9px] text-amber-900 font-serif leading-tight">
                    {isTelugu ? 'శ్రీమతి పి. గంగామణి & శ్రీ పి. సాయన్న గార్ల సుపుత్రుడు' : 'S/o Smt. P. Gangamani & Sri P. Sayanna'}
                  </p>
                </div>
              </div>

              {/* Muhurtham & Reception Dates & Venues */}
              <div className="pt-1 space-y-1 border-t border-[#C89B3C]/40 mt-1">
                {/* Wedding in Chittoor */}
                <div className="space-y-0.2">
                  <p className="text-[10px] sm:text-[11px] font-serif font-bold text-[#6B1D2F]">
                    {isTelugu ? '💍 వివాహం: అక్టోబర్ 30, 2026 - ఉదయం 5:30' : '💍 Wedding: 30 October 2026 · 5:30 AM'}
                  </p>
                  <p className="text-[9px] font-serif text-amber-950/85 leading-tight">
                    {isTelugu 
                      ? 'విజయదుర్గ కళ్యాణ మండపం, వెల్లూరు రోడ్డు, చిత్తూరు' 
                      : 'Vijayadurga Kalyana Mandapam, Chittoor'}
                  </p>
                </div>

                {/* Reception in Nizamabad */}
                <div className="space-y-0.2 pt-0.5 border-t border-[#C89B3C]/20">
                  <p className="text-[10px] sm:text-[11px] font-serif font-bold text-[#6B1D2F]">
                    {isTelugu ? '✨ రిసెప్షన్: నవంబర్ 4, 2026 - సాయంత్రం' : '✨ Reception: 4 November 2026 · Evening'}
                  </p>
                  <p className="text-[9px] font-serif text-amber-950/85 leading-tight">
                    {isTelugu 
                      ? 'మున్నూరు కాపు కళ్యాణ మండపం, శివాజీ నగర్, నిజామాబాద్' 
                      : 'Munnuru Kapu Kalyana Mandapam, Nizamabad'}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom: Auspicious Royal Wax Seal Medallion (Interactive CTA) */}
            <div className="pb-1 w-full flex flex-col items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenClick();
                }}
                disabled={isOpening}
                className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-[#F5D77F] via-[#D4AF37] to-[#8C5D0D] p-1 shadow-xl flex items-center justify-center cursor-pointer transition-transform hover:scale-108 active:scale-95 animate-pulse-glow ${
                  isOpening ? 'animate-seal-pop' : ''
                }`}
                title="Tap to Open Invitation"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#54121E] to-[#3B0B14] border-2 border-[#FFE89E] flex flex-col items-center justify-center text-white shadow-inner">
                  <span className="text-amber-200 text-xs sm:text-sm font-bold font-serif">D & P</span>
                  <span className="text-[8px] sm:text-[9px] font-bold tracking-widest uppercase text-amber-200 mt-0.5 font-serif">
                    {isTelugu ? 'ముద్ర' : 'SEAL'}
                  </span>
                </div>
              </button>

              {/* 1-Tap Unveil Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenClick();
                }}
                disabled={isOpening}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-[#54121E] via-[#781B10] to-[#54121E] text-white font-bold text-xs rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer relative overflow-hidden border border-[#C89B3C]/70 group active:scale-98"
              >
                <div className="absolute inset-0 animate-gold-shimmer pointer-events-none opacity-40 group-hover:opacity-70" />
                <Sparkles className="w-3.5 h-3.5 text-[#F3D27C] animate-diya-flicker relative z-10" />
                <span className="relative z-10 tracking-wide font-serif uppercase text-[11px] sm:text-xs">
                  {isTelugu ? 'ఆహ్వానాన్ని తెరవండి' : 'Tap Card to Open Envelope'}
                </span>
                <Heart className="w-3 h-3 text-rose-300 fill-rose-300 relative z-10" />
              </button>

              <p className="text-[9px] text-[#54121E]/90 font-serif italic text-center">
                {isTelugu 
                  ? 'రిత్విజ్ - సేజ్ (Ritviz - Sage) సంగీతంతో వేడుక ప్రారంభమవుతుంది 🎵' 
                  : 'Experience with Ritviz - Sage festive music 🎵'}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
