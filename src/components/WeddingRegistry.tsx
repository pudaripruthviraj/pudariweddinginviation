import React, { useState } from 'react';
import { Gift, QrCode, Copy, Check, Heart, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { Language, RegistryItem } from '../types/wedding';
import { translations } from '../data/translations';
import { triggerAkshinthaluShower } from '../utils/confetti';

interface WeddingRegistryProps {
  currentLang: Language;
  items: RegistryItem[];
  onClaimItem: (itemId: string, guestName: string) => void;
}

export const WeddingRegistry: React.FC<WeddingRegistryProps> = ({
  currentLang,
  items,
  onClaimItem,
}) => {
  const t = translations[currentLang];
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [claimingItemId, setClaimingItemId] = useState<string | null>(null);
  const [claimerName, setClaimerName] = useState('');
  const [showShagunModal, setShowShagunModal] = useState(false);

  const upiId = '';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleClaimSubmit = (itemId: string) => {
    if (!claimerName.trim()) return;
    onClaimItem(itemId, claimerName.trim());
    setClaimingItemId(null);
    setClaimerName('');
    triggerAkshinthaluShower();
  };

  return (
    <section id="registry" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-amber-200/80">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#781B10]">
            {t.registryTitle}
          </h2>
          <p className="text-sm sm:text-base text-amber-900/80">
            {t.registrySub}
          </p>
        </div>

        {/* Traditional Cultural Note: Blessings First */}
        <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 max-w-4xl mx-auto text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            {t.blessingFirstHeader}
          </span>
          <p className="text-sm text-amber-950 font-serif leading-relaxed">
            {t.blessingFirstBody}
          </p>
        </div>

        {/* Digital Chadivimpu & UPI Shagun Section */}
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#FFFDF9] border border-amber-200/90 shadow-xs flex flex-col sm:flex-row items-center gap-6">
          {/* Mock UPI QR Frame */}
          <div className="p-4 bg-white border-2 border-amber-300 rounded-xl shadow-xs shrink-0 text-center">
            <QrCode className="w-32 h-32 sm:w-36 sm:h-36 text-[#781B10] mx-auto" />
            <span className="mt-2 block text-[10px] font-bold tracking-wider uppercase text-amber-800">
              UPI Scan & Pay
            </span>
          </div>

          <div className="space-y-3 text-center sm:text-left flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
              Digital Shagun / Chadivimpulu
            </span>
            <h3 className="text-lg sm:text-xl font-display font-bold text-[#781B10]">
              {t.chadivimpuTitle}
            </h3>
            <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed">
              {t.chadivimpuSub}
            </p>

            <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <button
                onClick={handleCopyUpi}
                className="px-4 py-2 bg-amber-100/90 hover:bg-amber-200/90 text-[#781B10] text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="font-mono">{copiedUpi ? t.copiedText : t.copyUpiId}</span>
              </button>

              <button
                onClick={() => setShowShagunModal(true)}
                className="px-4 py-2 bg-[#781B10] hover:bg-[#991B1B] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Bank Transfer Details
              </button>
            </div>
          </div>
        </div>

        {/* Curated Wishlist Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-amber-100 pb-2">
            <h3 className="text-lg sm:text-xl font-display font-bold text-[#781B10]">
              {t.wishlistTab}
            </h3>
            <span className="text-xs text-amber-800 font-medium">
              Optional blessings wishlist
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  item.claimed
                    ? 'bg-amber-50/50 border-amber-200 opacity-90'
                    : 'bg-[#FFFDF9] border-amber-200/90 hover:border-amber-300 shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-amber-800">
                    <span className="font-medium">
                      {currentLang === 'te' ? item.categoryTe : item.categoryEn}
                    </span>
                    <span className="font-mono font-bold text-amber-950">
                      ₹{item.priceEstimate.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <h4 className="text-base font-display font-bold text-[#781B10]">
                    {currentLang === 'te' ? item.titleTe : item.titleEn}
                  </h4>

                  <p className="text-xs text-amber-950/80 leading-relaxed">
                    {currentLang === 'te' ? item.descriptionTe : item.descriptionEn}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-amber-100">
                  {item.claimed ? (
                    <div className="flex items-center justify-between text-xs font-medium text-amber-900 bg-amber-100/70 p-2 rounded-lg">
                      <span className="flex items-center gap-1.5 text-amber-800">
                        <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                        <span>{t.claimedBadge}</span>
                      </span>
                      {item.claimedBy && (
                        <span className="font-bold text-[#781B10]">by {item.claimedBy}</span>
                      )}
                    </div>
                  ) : claimingItemId === item.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Your Name (e.g. Ramesh Mama)"
                        value={claimerName}
                        onChange={(e) => setClaimerName(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-amber-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#781B10]"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleClaimSubmit(item.id)}
                          className="flex-1 py-1.5 bg-[#781B10] text-white text-xs font-semibold rounded-md hover:bg-[#991B1B] cursor-pointer"
                        >
                          Confirm Blessing
                        </button>
                        <button
                          onClick={() => setClaimingItemId(null)}
                          className="px-2 py-1.5 text-xs text-amber-900 hover:bg-amber-100 rounded-md cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setClaimingItemId(item.id)}
                      className="w-full py-2 bg-amber-100 hover:bg-amber-200 text-[#781B10] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>{t.markClaimedBtn}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shagun Bank Details Modal */}
      <></>
    </section>
  );
};
