import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Language } from '../types/wedding';
import { triggerAkshinthaluShower } from '../utils/confetti';
import ganeshImage from '../../public/images/lord_ganesh_gold_1791130909426.jpg'';

interface ScratchCardDateProps {
  currentLang: Language;
}

export const ScratchCardDate: React.FC<ScratchCardDateProps> = ({ currentLang }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isScratching, setIsScratching] = useState(false);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // Royal Rich Gold Foil Metallic Gradient
    const goldGrad = ctx.createLinearGradient(0, 0, width, height);
    goldGrad.addColorStop(0, '#F5DE98');
    goldGrad.addColorStop(0.25, '#D4AF37');
    goldGrad.addColorStop(0.5, '#F9E7B3');
    goldGrad.addColorStop(0.75, '#C89B3C');
    goldGrad.addColorStop(1, '#9E7420');

    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle Sparkle Shimmer Texture Overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let i = 0; i < 40; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const radius = Math.random() * 2 + 0.5;
      ctx.beginPath();
      ctx.arc(rx, ry, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Outer Imperial Maroon Border
    ctx.strokeStyle = '#54121E';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(5, 5, width - 10, height - 10);

    // Inner Delicate Gold Accent Line
    ctx.strokeStyle = '#FFE89E';
    ctx.lineWidth = 1;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Auspicious Symbols at Top Center
    ctx.fillStyle = '#54121E';
    ctx.font = 'bold 13px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ ॐ ✦', width / 2, 26);

    // Scratch Instruction Text
    ctx.font = 'bold 13px "Cinzel", Georgia, serif';
    ctx.fillStyle = '#54121E';
    const titleText = currentLang === 'te' 
      ? '✨ శుభ ముహూర్తం స్క్రాచ్ చేయండి ✨' 
      : '✨ SCRATCH TO REVEAL DATE ✨';
    ctx.fillText(titleText, width / 2, height / 2 + 6);

    ctx.font = '600 10.5px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#6B1D2F';
    const subText = currentLang === 'te' 
      ? 'బంగారు పొరను వేలితో రుద్దండి (Touch & Scratch)' 
      : 'Gently scratch the royal gold foil';
    ctx.fillText(subText, width / 2, height / 2 + 27);

    // Corner Filigrees
    ctx.font = 'bold 12px serif';
    ctx.fillStyle = '#54121E';
    ctx.fillText('⚜', 20, 22);
    ctx.fillText('⚜', width - 20, 22);
    ctx.fillText('⚜', 20, height - 20);
    ctx.fillText('⚜', width - 20, height - 20);

    setIsRevealed(false);
    setScratchPercent(0);
  };

  useEffect(() => {
    initCanvas();
  }, [currentLang]);

  const scratch = (clientX: number, clientY: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkScratchCompletion();
  };

  const checkScratchCompletion = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    let transparentCount = 0;
    const totalPixels = data.length / 4;

    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) {
        transparentCount += 4;
      }
    }

    const percent = Math.min(100, Math.round((transparentCount / totalPixels) * 100));
    setScratchPercent(percent);

    if (percent > 45 && !isRevealed) {
      handleRevealAll();
    }
  };

  const handleRevealAll = () => {
    setIsRevealed(true);
    setScratchPercent(100);
    triggerAkshinthaluShower();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="w-full space-y-2 py-1">
      {/* Scratch Header & Progress */}
      <div className="flex items-center justify-between text-xs px-1">
        <span className="font-serif font-bold text-[#54121E] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
          <span>{currentLang === 'te' ? 'శుభ లగ్న దర్శనం' : 'Auspicious Muhurtham Card'}</span>
        </span>

        {isRevealed ? (
          <span className="text-emerald-700 font-bold text-xs flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>{currentLang === 'te' ? 'దర్శన భాగ్యం!' : 'Revealed!'}</span>
          </span>
        ) : (
          <span className="text-[#6B1D2F] font-mono text-[10px] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
            {scratchPercent}% {currentLang === 'te' ? 'స్క్రాచ్ అయింది' : 'Scratched'}
          </span>
        )}
      </div>

      {/* Royal Box Container - Synced with Ivory & Wine Palette */}
      <div className="relative w-full h-42 rounded-2xl overflow-hidden border-2 border-[#C89B3C] shadow-md select-none touch-none bg-gradient-to-br from-[#FFFBF7] via-[#FFFDF9] to-[#FDF4E7]">
        
        {/* UNDERNEATH LAYER: The Revealed Royal Date Details */}
        <div className="absolute inset-0 p-3.5 flex flex-col justify-between text-center relative z-0">
          
          {/* Header with Lord Ganesh */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-1.5">
              <div className="w-5 h-5 rounded-full overflow-hidden p-0.5 bg-[#C89B3C]">
                <img src={ganeshImage} alt="Lord Ganesha" className="w-full h-full object-cover rounded-full" />
              </div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#6B1D2F] font-serif">
                {currentLang === 'te' ? '|| శ్రీరస్తు · శుభమస్తు ||' : '|| SACRED CELEBRATION DATES ||'}
              </span>
            </div>
            
            {/* Wedding Muhurtham Details */}
            <div className="pt-0.5">
              <h3 className="text-sm sm:text-base font-display font-bold text-[#54121E]">
                {currentLang === 'te' ? '💍 వివాహం: శుక్రవారం, అక్టోబర్ 30, 2026' : '💍 Wedding: Friday, October 30, 2026'}
              </h3>
              <p className="text-xs font-bold text-[#781B10]">
                {currentLang === 'te' 
                  ? 'శుభ ముహూర్తం: ఉదయం 5:30 గంటలకు' 
                  : 'Subha Muhurtham: 5:30 AM'}
              </p>
              <p className="text-[10px] font-serif text-amber-950/85">
                {currentLang === 'te' 
                  ? 'విజయదుర్గ కళ్యాణ మండపం, వెల్లూరు రోడ్డు, చిత్తూరు' 
                  : 'Vijayadurga Kalyana Mandapam, Vellore Road, Chittoor'}
              </p>
            </div>
          </div>

          {/* Reception Footer */}
          <div className="pt-1.5 border-t border-[#C89B3C]/40 text-[10px] text-amber-950 flex items-center justify-between font-serif">
            <span className="font-bold text-[#781B10]">
              {currentLang === 'te' ? '✨ రిసెప్షన్: నవంబర్ 4 (సాయంత్రం)' : '✨ Reception: Nov 4 (Evening)'}
            </span>
            <span className="font-bold text-[#54121E]">
              {currentLang === 'te' ? 'మున్నూరు కాపు మండపం, నిజామాబాద్' : 'Munnuru Kapu Mandapam, Nizamabad'}
            </span>
          </div>
        </div>

        {/* TOP LAYER: Golden Foil Scratch Canvas */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            width={380}
            height={168}
            className="absolute inset-0 w-full h-full cursor-pointer touch-none z-10 transition-opacity duration-500"
            onMouseDown={(e) => { setIsScratching(true); scratch(e.clientX, e.clientY); }}
            onMouseMove={(e) => { if (isScratching) scratch(e.clientX, e.clientY); }}
            onMouseUp={() => setIsScratching(false)}
            onTouchStart={(e) => { setIsScratching(true); scratch(e.touches[0].clientX, e.touches[0].clientY); }}
            onTouchMove={(e) => { if (isScratching) scratch(e.touches[0].clientX, e.touches[0].clientY); }}
            onTouchEnd={() => setIsScratching(false)}
          />
        )}
      </div>

      {/* Fallback & Reset Controls */}
      <div className="flex items-center justify-between text-[11px] pt-0.5 px-1">
        <button
          onClick={handleRevealAll}
          className="text-[#6B1D2F] hover:text-[#54121E] font-bold underline cursor-pointer"
        >
          {isRevealed ? '' : (currentLang === 'te' ? 'నేరుగా చూడండి (Instant Reveal)' : 'Tap to Reveal Instantly')}
        </button>

        {isRevealed && (
          <button
            onClick={initCanvas}
            className="text-amber-900 hover:text-[#54121E] font-semibold flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{currentLang === 'te' ? 'మళ్ళీ స్క్రాచ్ చేయండి' : 'Scratch Again'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
