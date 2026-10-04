import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Share2, Sparkles, Menu, X, ShieldCheck } from 'lucide-react';
import { Language } from '../types/wedding';
import { translations } from '../data/translations';
import { weddingMusic } from '../utils/audioPlayer';
import { triggerAkshinthaluShower } from '../utils/confetti';

interface NavbarProps {
  currentLang: Language;
  onToggleLang: () => void;
  onOpenShare: () => void;
  onToggleAdmin: () => void;
  isAdminActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onToggleLang,
  onOpenShare,
  onToggleAdmin,
  isAdminActive,
}) => {
  const t = translations[currentLang];
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = weddingMusic.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsub;
  }, []);

  const handleMusicToggle = () => {
    weddingMusic.toggle();
  };

  const navLinks = [
    { href: '#schedule', label: t.navEvents },
    { href: '#gallery', label: t.navGallery },
    { href: '#rsvp', label: t.navRsvp },
    { href: '#venue', label: t.navVenue },
    { href: '#registry', label: t.navRegistry },
    { href: '#guestbook', label: t.navGuestbook },
    { href: '#seating', label: t.navSeating },
    { href: '#budget', label: t.navBudget },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-amber-200/70 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element Brand */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-display font-bold tracking-wide text-[#781B10] hover:text-[#991B1B] transition-colors whitespace-nowrap"
        >
          {t.appTitle}
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-amber-950">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#B45309] transition-colors pb-1 border-b-2 border-transparent hover:border-[#D97706]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Akshinthalu Shower Action */}
          <button
            onClick={triggerAkshinthaluShower}
            title={t.blessTheCouple}
            className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">{t.blessTheCouple}</span>
          </button>

          {/* Music Audio Toggle */}
          <button
            onClick={handleMusicToggle}
            title={isPlaying ? 'Mute Shehnai' : 'Play Auspicious Shehnai'}
            className="p-2 text-amber-900 hover:bg-amber-100/70 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Music"
          >
            {isPlaying ? (
              <Volume2 className="w-5 h-5 text-amber-700 animate-pulse" />
            ) : (
              <VolumeX className="w-5 h-5 text-amber-800/70" />
            )}
          </button>

          {/* Share Button */}
          <button
            onClick={onOpenShare}
            title="Share Wedding Invite"
            className="p-2 text-amber-900 hover:bg-amber-100/70 rounded-lg transition-colors cursor-pointer"
            aria-label="Share Wedding"
          >
            <Share2 className="w-5 h-5 text-amber-800" />
          </button>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="px-3 py-1.5 text-xs font-bold text-[#781B10] bg-rose-50 border border-rose-200/80 hover:bg-rose-100/80 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            title="Switch Language"
          >
            {t.langToggle}
          </button>

          {/* Admin Toggle */}
          <button
            onClick={onToggleAdmin}
            title="Host Admin Dashboard"
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isAdminActive ? 'bg-amber-600 text-white' : 'text-amber-800 hover:bg-amber-100/70'
            }`}
            aria-label="Host Admin"
          >
            <ShieldCheck className="w-5 h-5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-amber-950 hover:bg-amber-100/70 rounded-lg cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF9] border-b border-amber-200 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-amber-950 hover:bg-amber-50 rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-amber-200 flex items-center justify-between">
            <button
              onClick={() => {
                onToggleAdmin();
                setIsMobileMenuOpen(false);
              }}
              className="text-sm font-semibold text-amber-800 py-1"
            >
              {isAdminActive ? 'Exit Admin Mode' : t.navAdmin}
            </button>
            <button
              onClick={() => {
                onToggleLang();
                setIsMobileMenuOpen(false);
              }}
              className="text-sm font-bold text-[#781B10] py-1"
            >
              Language: {t.langToggle}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
