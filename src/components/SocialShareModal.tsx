import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, Send, QrCode, Share2 } from 'lucide-react';
import { Language } from '../types/wedding';
import { translations } from '../data/translations';

interface SocialShareModalProps {
  currentLang: Language;
  onClose: () => void;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({ currentLang, onClose }) => {
  const t = translations[currentLang];
  const [copied, setCopied] = useState(false);

  const siteUrl = window.location.href;
  const shareMessage =
    currentLang === 'te'
      ? `|| శ్రీరస్తు శుభమస్తు || దీపిక & పృథ్వీరాజ్ ల వివాహ మహోత్సవ ఆహ్వాన పత్రిక. 💍 వివాహం: అక్టోబర్ 30, 2026 (ఉదయం 5:30) - విజయదుర్గ కళ్యాణ మండపం, చిత్తూరు. ✨ రిసెప్షన్: నవంబర్ 4, 2026 (సాయంత్రం) - మున్నూరు కాపు కళ్యాణ మండపం, నిజామాబాద్. ఆహ్వానాన్ని చూడండి: ${siteUrl}`
      : `|| Sri Rastuva Subhamastu || Wedding Invitation of Deepika & Pruthviraj. 💍 Wedding: Oct 30, 2026 (5:30 AM) at Vijayadurga Kalyana Mandapam, Chittoor. ✨ Reception: Nov 4, 2026 (Evening) at Munnuru Kapu Kalyana Mandapam, Nizamabad. View full invitation: ${siteUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank');
  };

  const handleTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(
      shareMessage
    )}`;
    window.open(url, '_blank');
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFDF9] border border-amber-200 rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-amber-900 hover:bg-amber-100 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#781B10]">
            <Share2 className="w-5 h-5" />
            <h3 className="text-lg font-display font-bold">
              {t.shareTitle}
            </h3>
          </div>
          <p className="text-xs text-amber-900/80">
            {t.shareSub}
          </p>
        </div>

        {/* QR Code preview for mobile scanner */}
        <div className="p-4 bg-white border border-amber-200 rounded-2xl text-center space-y-2">
          <QrCode className="w-28 h-28 text-[#781B10] mx-auto" />
          <span className="text-[11px] font-semibold text-amber-900 block">
            {t.qrInviteTitle}
          </span>
        </div>

        {/* Share Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleWhatsApp}
            className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{t.whatsappShare}</span>
          </button>

          <button
            onClick={handleTelegram}
            className="w-full py-2.5 px-4 bg-[#229ED9] hover:bg-[#1E8DC2] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4" />
            <span>{t.telegramShare}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full py-2.5 px-4 bg-amber-100 hover:bg-amber-200 text-[#781B10] text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer border border-amber-200"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.copiedText : t.copyLink}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
