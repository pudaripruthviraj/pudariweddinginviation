import React, { useState } from 'react';
import { 
  Navigation, Car, MapPin, ExternalLink, Check, Copy, Compass, 
  Bike, ShieldCheck, ChevronRight, X
} from 'lucide-react';
import { Language } from '../types/wedding';

interface RideNavigatorProps {
  currentLang: Language;
  venueName?: string;
  venueAddress?: string;
  latitude?: number;
  longitude?: number;
}

export const RideNavigator: React.FC<RideNavigatorProps> = ({
  currentLang,
  venueName = 'Sri Raja Rajeshwari Palace & Convention',
  venueAddress = 'Near Shamshabad / PVNR Bypass, Hyderabad, Telangana 500077',
  latitude = 17.2403,
  longitude = 78.4294,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedApp, setSelectedApp] = useState<'uber' | 'ola' | 'rapido' | 'gmaps'>('uber');

  // Deep links for ride-sharing apps
  const encodedVenue = encodeURIComponent(venueName);
  
  const uberUrl = `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=${latitude}&dropoff[longitude]=${longitude}&dropoff[nickname]=${encodedVenue}`;
  
  const olaUrl = `https://book.olacabs.com/?lat=${latitude}&lng=${longitude}&drop_name=${encodedVenue}`;
  
  const rapidoUrl = `https://m.rapido.bike/?dest_lat=${latitude}&dest_lng=${longitude}&dest_title=${encodedVenue}`;
  
  const gmapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&destination_name=${encodedVenue}`;
  
  const appleMapsUrl = `http://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${venueName}, ${venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLaunchRide = (app: 'uber' | 'ola' | 'rapido' | 'gmaps' | 'apple') => {
    let targetUrl = uberUrl;
    if (app === 'ola') targetUrl = olaUrl;
    else if (app === 'rapido') targetUrl = rapidoUrl;
    else if (app === 'gmaps') targetUrl = gmapsUrl;
    else if (app === 'apple') targetUrl = appleMapsUrl;

    window.open(targetUrl, '_blank');
  };

  return (
    <div className="w-full space-y-3">
      {/* Primary Interactive 'Navigate' Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 px-4 bg-gradient-to-r from-[#4A0E17] via-[#781B10] to-[#4A0E17] text-white text-xs font-bold rounded-2xl shadow-md hover:brightness-110 transition-all flex items-center justify-between cursor-pointer border border-[#C89B3C]/70 group relative overflow-hidden active:scale-98"
      >
        <div className="absolute inset-0 animate-gold-shimmer pointer-events-none opacity-30 group-hover:opacity-60" />
        <div className="flex items-center gap-2 relative z-10">
          <div className="p-1.5 bg-amber-100/20 rounded-lg text-amber-300 group-hover:scale-110 transition-transform">
            <Navigation className="w-4 h-4 fill-amber-300" />
          </div>
          <div className="text-left">
            <span className="block text-xs font-serif uppercase tracking-wider text-amber-200">
              {currentLang === 'te' ? 'రైడ్ బుక్ చేయండి / నావిగేషన్' : 'Navigate & Book Ride'}
            </span>
            <span className="block text-[10px] text-amber-100/80 font-normal">
              Uber · Ola · Rapido · Google Maps
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-black/20 px-2.5 py-1 rounded-xl relative z-10 group-hover:translate-x-0.5 transition-transform">
          <span>{currentLang === 'te' ? 'ఎంచుకోండి' : 'Choose App'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </button>

      {/* Quick Launch Chips (Instant 1-Tap Trigger directly on card) */}
      <div className="grid grid-cols-4 gap-1.5 pt-0.5">
        {/* Uber */}
        <button
          onClick={() => handleLaunchRide('uber')}
          className="p-2 rounded-xl bg-black text-white hover:bg-neutral-800 transition-all flex flex-col items-center justify-center gap-1 shadow-xs cursor-pointer border border-neutral-700"
          title="Book Uber to Venue"
        >
          <span className="text-[11px] font-black tracking-tight leading-none text-white">Uber</span>
          <span className="text-[9px] text-neutral-300 font-medium">Cab</span>
        </button>

        {/* Ola */}
        <button
          onClick={() => handleLaunchRide('ola')}
          className="p-2 rounded-xl bg-[#000000] text-emerald-400 hover:bg-neutral-800 transition-all flex flex-col items-center justify-center gap-1 shadow-xs cursor-pointer border border-emerald-600/40"
          title="Book Ola to Venue"
        >
          <span className="text-[11px] font-black tracking-tight leading-none text-emerald-400">Ola</span>
          <span className="text-[9px] text-emerald-200 font-medium">Auto/Cab</span>
        </button>

        {/* Rapido */}
        <button
          onClick={() => handleLaunchRide('rapido')}
          className="p-2 rounded-xl bg-[#FFDD00] text-neutral-950 hover:bg-[#F0D000] transition-all flex flex-col items-center justify-center gap-1 shadow-xs cursor-pointer border border-amber-500/40"
          title="Book Rapido to Venue"
        >
          <div className="flex items-center gap-0.5">
            <Bike className="w-3 h-3 text-neutral-950" />
            <span className="text-[11px] font-black tracking-tight leading-none">Rapido</span>
          </div>
          <span className="text-[9px] text-neutral-800 font-bold">Auto/Bike</span>
        </button>

        {/* Maps GPS */}
        <button
          onClick={() => handleLaunchRide('gmaps')}
          className="p-2 rounded-xl bg-white text-[#4A0E17] hover:bg-amber-50 transition-all flex flex-col items-center justify-center gap-1 shadow-xs cursor-pointer border border-[#C89B3C]/70"
          title="Google Maps GPS"
        >
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[9px] text-neutral-900 font-bold">Directions</span>
        </button>
      </div>

      {/* Copy Address Shortcut */}
      <div className="flex items-center justify-between text-[11px] text-amber-900 pt-1 px-1">
        <span className="truncate pr-2 text-[10px] text-amber-950 font-medium">
          📍 {venueAddress}
        </span>
        <button
          onClick={handleCopyAddress}
          className="shrink-0 text-[10px] font-bold text-[#781B10] hover:underline flex items-center gap-1 cursor-pointer bg-amber-100/70 px-2 py-0.5 rounded-md"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? (currentLang === 'te' ? 'కాపీ చేయబడింది!' : 'Copied!') : (currentLang === 'te' ? 'చిరునామా కాపీ' : 'Copy')}</span>
        </button>
      </div>

      {/* Ride-Sharing Selector Bottom Sheet / Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-[#FFFDF8] border-t-2 sm:border-2 border-[#C89B3C] rounded-t-3xl sm:rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#4A0E17] text-amber-300 rounded-xl">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-[#4A0E17]">
                    {currentLang === 'te' ? 'రైడ్ ఎంచుకోండి' : 'Choose Your Ride'}
                  </h3>
                  <p className="text-[10px] text-amber-800">
                    Direct dropoff at Sri Raja Rajeshwari Palace
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-amber-100 text-amber-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Destination Highlight */}
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#4A0E17]">
                <MapPin className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
                <span>{venueName}</span>
              </div>
              <p className="text-[11px] text-amber-900/90 pl-5 leading-relaxed">
                {venueAddress}
              </p>
              <div className="pl-5 pt-1 text-[10px] text-amber-800 font-mono">
                Coordinates: {latitude}° N, {longitude}° E
              </div>
            </div>

            {/* Ride App Options */}
            <div className="space-y-2">
              {/* Option 1: Uber */}
              <button
                onClick={() => handleLaunchRide('uber')}
                className="w-full p-3 rounded-2xl border border-neutral-300 bg-white hover:bg-neutral-50 transition-all flex items-center justify-between cursor-pointer group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-black text-xs">
                    Uber
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-xs text-neutral-900 block group-hover:text-[#4A0E17]">
                      Uber Cab (Go / Premier / XL)
                    </span>
                    <span className="text-[10px] text-neutral-500 block">
                      Direct pickup to wedding palace gates
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#4A0E17]">
                  <span>Book</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </div>
              </button>

              {/* Option 2: Ola */}
              <button
                onClick={() => handleLaunchRide('ola')}
                className="w-full p-3 rounded-2xl border border-emerald-200 bg-white hover:bg-emerald-50/40 transition-all flex items-center justify-between cursor-pointer group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-950 text-emerald-400 flex items-center justify-center font-black text-xs">
                    Ola
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-xs text-neutral-900 block group-hover:text-[#4A0E17]">
                      Ola Cabs (Mini / Prime / Auto)
                    </span>
                    <span className="text-[10px] text-neutral-500 block">
                      Instant or scheduled ride
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#4A0E17]">
                  <span>Book</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </div>
              </button>

              {/* Option 3: Rapido */}
              <button
                onClick={() => handleLaunchRide('rapido')}
                className="w-full p-3 rounded-2xl border border-amber-300 bg-white hover:bg-amber-50/50 transition-all flex items-center justify-between cursor-pointer group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFDD00] text-neutral-950 flex items-center justify-center font-black text-[11px]">
                    Rapido
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-xs text-neutral-900 block group-hover:text-[#4A0E17]">
                      Rapido (Auto / Cab / Bike)
                    </span>
                    <span className="text-[10px] text-neutral-500 block">
                      Fast local city connectivity
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#4A0E17]">
                  <span>Book</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </div>
              </button>

              {/* Option 4: Google Maps GPS Navigation */}
              <button
                onClick={() => handleLaunchRide('gmaps')}
                className="w-full p-3 rounded-2xl border border-blue-200 bg-blue-50/30 hover:bg-blue-50/80 transition-all flex items-center justify-between cursor-pointer group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    <Compass className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-xs text-neutral-900 block group-hover:text-blue-700">
                      Google Maps GPS
                    </span>
                    <span className="text-[10px] text-neutral-500 block">
                      Turn-by-turn driving & traffic route
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-blue-700">
                  <span>Start</span>
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                </div>
              </button>
            </div>

            {/* Parking & Proximity Info */}
            <div className="pt-1 border-t border-amber-200/80 flex items-center justify-between text-[10px] text-amber-900">
              <span>✈️ ~12 Mins to Airport (RGIA)</span>
              <span>🅿️ Valet for 450+ Cars</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
