import React, { useState } from 'react';
import { Heart, MessageSquare, Send, Sparkles, User, ThumbsUp } from 'lucide-react';
import { Language, GuestbookEntry } from '../types/wedding';
import { translations } from '../data/translations';
import { triggerAkshinthaluShower } from '../utils/confetti';

interface GuestbookProps {
  currentLang: Language;
  entries: GuestbookEntry[];
  onAddEntry: (entry: GuestbookEntry) => void;
  onLikeEntry: (id: string) => void;
}

export const Guestbook: React.FC<GuestbookProps> = ({
  currentLang,
  entries,
  onAddEntry,
  onLikeEntry,
}) => {
  const t = translations[currentLang];
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');

  const quickTeluguBlessings = [
    'ఆయురారోగ్య ఐశ్వర్యాలతో నూరేళ్ళు వర్ధిల్లండి!',
    'సదా మీ జంట లక్ష్మీనారాయణుల వలె సంతోషంగా ఉండాలి.',
    'నూరేళ్ళ పంట మీ దాంపత్యం, నిండు నూరేళ్ళు చల్లగా ఉండాలి.',
    'Wishing Deepika & Pruthviraj a blessed, joyous, and eternal marriage!',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry: GuestbookEntry = {
      id: `gb-${Date.now()}`,
      name: name.trim(),
      relation: relation.trim() || (currentLang === 'te' ? 'ఆత్మీయులు / బంధువులు' : 'Well Wisher'),
      message: message.trim(),
      language: currentLang,
      likes: 1,
      timestamp: 'Just now',
    };

    onAddEntry(newEntry);
    setName('');
    setRelation('');
    setMessage('');
    triggerAkshinthaluShower();
  };

  const handleLike = (id: string) => {
    onLikeEntry(id);
    triggerAkshinthaluShower();
  };

  return (
    <section id="guestbook" className="py-16 px-4 sm:px-6 lg:px-8 bg-kolam border-b border-amber-200/80">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#781B10]">
            {t.guestbookTitle}
          </h2>
          <p className="text-sm sm:text-base text-amber-900/80">
            {t.guestbookSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form to Write Blessing */}
          <div className="lg:col-span-5 bg-white border border-amber-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base sm:text-lg font-display font-bold text-[#781B10] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{t.writeBlessing}</span>
            </h3>

            {/* Quick Templates */}
            <div>
              <span className="text-[11px] font-semibold text-amber-900 block mb-1.5">
                {t.quickTeluguBlessings}
              </span>
              <div className="space-y-1.5">
                {quickTeluguBlessings.map((b, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMessage(b)}
                    className="w-full text-left text-xs p-2 rounded-lg bg-amber-50 hover:bg-amber-100/80 border border-amber-200/60 text-amber-950 transition-colors cursor-pointer"
                  >
                    "{b}"
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 pt-2 border-t border-amber-100">
              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  {t.yourName} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Srinivas Rao & Family"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#781B10]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  {t.yourRelation}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Groom's Uncle, College Friend, Peddamma"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#781B10]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  {t.yourBlessing} *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Type your heartfelt blessings in English or Telugu..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#781B10]"
                />
              </div>

              <button
                type="submit"
                disabled={!name.trim() || !message.trim()}
                className="w-full py-2.5 bg-[#781B10] hover:bg-[#991B1B] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.postBlessingBtn}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Display Blessings Wall */}
          <div className="lg:col-span-7 space-y-4">
            {entries.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-dashed border-amber-300 shadow-xs text-center space-y-3">
                <Sparkles className="w-8 h-8 text-[#C89B3C] mx-auto animate-pulse" />
                <h4 className="font-display font-bold text-base text-[#781B10]">
                  {currentLang === 'te' ? 'ఇంకా ఆశీస్సులు నమోదు కాలేదు' : 'No Blessings Posted Yet'}
                </h4>
                <p className="text-xs sm:text-sm text-amber-900/80 font-serif max-w-sm mx-auto">
                  {currentLang === 'te' 
                    ? 'దీపిక & పృథ్వీరాజ్ లకు మీ అమూల్యమైన శుభాకాంక్షలు మరియు ఆశీస్సులు తెలియజేసే తొలి గౌరవ అతిథి అవ్వండి!' 
                    : 'Be the first honored guest to post your heartfelt blessing for Deepika & Pruthviraj!'}
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[640px] overflow-y-auto pr-1">
                {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-2 hover:border-amber-300 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-[#781B10] text-sm">
                        {entry.name}
                      </h4>
                      <span className="text-[11px] text-amber-800 font-medium">
                        {entry.relation}
                      </span>
                    </div>

                    <span className="text-[10px] text-amber-700/80 font-mono">
                      {entry.timestamp}
                    </span>
                  </div>

                  <p className="text-sm text-amber-950/90 font-serif leading-relaxed italic pt-1">
                    "{entry.message}"
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-amber-100">
                    <span className="text-[10px] text-amber-700 uppercase font-semibold">
                      Auspicious Blessing
                    </span>

                    <button
                      onClick={() => handleLike(entry.id)}
                      className="px-2.5 py-1 rounded-md bg-amber-50 hover:bg-amber-100/90 text-xs font-semibold text-amber-900 border border-amber-200/70 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t.likeBlessing}</span>
                      <span className="font-mono text-amber-800 font-bold">({entry.likes})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
