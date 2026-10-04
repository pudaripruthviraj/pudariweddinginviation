import React, { useState } from 'react';
import { MapPin, Navigation, Car, Plane, Train, Compass, ExternalLink, Check, Copy, Calendar, Clock } from 'lucide-react';
import { Language } from '../types/wedding';
import { translations } from '../data/translations';

interface InteractiveMapProps {
  currentLang: Language;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isTelugu = currentLang === 'te';
  const [activeVenueTab, setActiveVenueTab] = useState<'wedding' | 'reception'>('wedding');
  const [copiedAddress, setCopiedAddress] = useState(false);

  const venues = {
    wedding: {
      key: 'wedding',
      nameEn: 'Vijayadurga Kalyana Mandapam',
      nameTe: 'విజయదుర్గ కళ్యాణ మండపం',
      tagEn: '💍 Sacred Wedding Ceremony',
      tagTe: '💍 పవిత్ర వివాహ మహోత్సవం',
      dateEn: 'Friday, October 30, 2026',
      dateTe: 'శుక్రవారం, అక్టోబర్ 30, 2026',
      timeEn: 'Morning 5:30 AM (Subha Muhurtham)',
      timeTe: 'ఉదయం 5:30 గంటలకు (శుభ ముహూర్తం)',
      addressEn: 'Near Durgamma Temple, Vellore Road, Greamspet, Chittoor, Andhra Pradesh 517002',
      addressTe: 'దుర్గమ్మ గుడి దగ్గర, వెల్లూరు రోడ్డు, గ్రీమ్స్‌పేట్, చిత్తూరు, ఆంధ్రప్రదేశ్ 517002',
      coords: '13.2172,79.1003',
      mapsQuery: 'Vijayadurga Kalyana Mandapam Near Durgamma Temple Vellore Road Greamspet Chittoor',
      transitInfoEn: [
        { icon: Train, text: 'Chittoor Railway Station (CTO): ~5 mins (2.5 km)' },
        { icon: Train, text: 'Katpadi Junction (KPD): ~35 mins (30 km)' },
        { icon: Plane, text: 'Tirupati Airport (TIR) / Bangalore (BLR) connectivity' },
        { icon: Car, text: 'Spacious dedicated parking for guest vehicles & buses' },
      ],
      transitInfoTe: [
        { icon: Train, text: 'చిత్తూరు రైల్వే స్టేషన్ (CTO): కేవలం 5 నిమిషాలు (2.5 కి.మీ)' },
        { icon: Train, text: 'కాట్పాడి జంక్షన్ (KPD): దాదాపు 35 నిమిషాలు (30 కి.మీ)' },
        { icon: Plane, text: 'తిరుపతి విమానాశ్రయం / బెంగళూరు కనెక్టివిటీ' },
        { icon: Car, text: 'విశాలమైన అతిథుల వాహన మరియు బస్సుల పార్కింగ్ సదుపాయం' },
      ],
    },
    reception: {
      key: 'reception',
      nameEn: 'Munnuru Kapu Kalyana Mandapam',
      nameTe: 'మున్నూరు కాపు కళ్యాణ మండపం',
      tagEn: '✨ Grand Wedding Reception & Vindu',
      tagTe: '✨ ఘన వివాహ రిసెప్షన్ & విందు భోజనం',
      dateEn: 'Wednesday, November 4, 2026',
      dateTe: 'బుధవారం, నవంబర్ 4, 2026',
      timeEn: 'Evening 06:30 PM onwards',
      timeTe: 'సాయంత్రం 06:30 గంటల నుండి',
      addressEn: 'Shivaji Nagar, Nizamabad, Telangana 503001',
      addressTe: 'శివాజీ నగర్, నిజామాబాద్, తెలంగాణ 503001',
      coords: '18.6725,78.0941',
      mapsQuery: 'Munnuru Kapu Kalyana Mandapam Shivaji Nagar Nizamabad Telangana',
      transitInfoEn: [
        { icon: Train, text: 'Nizamabad Junction Railway Station (NZB): ~8 mins (3 km)' },
        { icon: Car, text: 'Nizamabad Central Bus Station (TSRTC): ~6 mins (2 km)' },
        { icon: Plane, text: 'Hyderabad RGIA Airport / NH-44 Express Corridor' },
        { icon: Car, text: 'Dedicated celebration banquet hall & banquet parking' },
      ],
      transitInfoTe: [
        { icon: Train, text: 'నిజామాబాద్ జంక్షన్ రైల్వే స్టేషన్ (NZB): ~8 నిమిషాలు (3 కి.మీ)' },
        { icon: Car, text: 'నిజామాబాద్ సెంట్రల్ బస్ స్టేషన్ (TSRTC): ~6 నిమిషాలు (2 కి.మీ)' },
        { icon: Plane, text: 'హైదరాబాద్ RGIA ఎయిర్‌పోర్ట్ / NH-44 హైవే కనెక్టివిటీ' },
        { icon: Car, text: 'కళ్యాణ మండపం ప్రత్యేక పార్కింగ్ సదుపాయం' },
      ],
    },
  };

  const currentVenue = venues[activeVenueTab];

  const handleCopyAddress = () => {
    const text = isTelugu ? currentVenue.addressTe : currentVenue.addressEn;
    navigator.clipboard.writeText(`${isTelugu ? currentVenue.nameTe : currentVenue.nameEn}, ${text}`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentVenue.mapsQuery)}`;
    window.open(url, '_blank');
  };

  const handleAppleMaps = () => {
    const url = `http://maps.apple.com/?q=${encodeURIComponent(currentVenue.mapsQuery)}&ll=${currentVenue.coords}`;
    window.open(url, '_blank');
  };

  const handleUber = () => {
    const url = `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[nickname]=${encodeURIComponent(
      isTelugu ? currentVenue.nameTe : currentVenue.nameEn
    )}`;
    window.open(url, '_blank');
  };

  const handleOla = () => {
    const url = `https://www.olacabs.com/`;
    window.open(url, '_blank');
  };

  return (
    <section id="venue" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-amber-200/80">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#781B10]">
            {t.venueTitle}
          </h2>
          <p className="text-sm sm:text-base text-amber-900/80">
            {t.venueSub}
          </p>
        </div>

        {/* Dual Venue Switcher Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-amber-50 rounded-2xl border border-amber-300 shadow-sm max-w-lg w-full">
            <button
              onClick={() => setActiveVenueTab('wedding')}
              className={`flex-1 py-3 px-3 sm:px-5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeVenueTab === 'wedding'
                  ? 'bg-[#54121E] text-white shadow-md'
                  : 'text-amber-900 hover:bg-amber-100/60'
              }`}
            >
              <span>💍</span>
              <div className="text-left">
                <span className="block leading-tight">{isTelugu ? 'వివాహం (చిత్తూరు)' : 'Wedding (Chittoor)'}</span>
                <span className="text-[10px] opacity-80 block">{isTelugu ? 'అక్టోబర్ 30, ఉదయం 5:30' : 'Oct 30 · 5:30 AM'}</span>
              </div>
            </button>

            <button
              onClick={() => setActiveVenueTab('reception')}
              className={`flex-1 py-3 px-3 sm:px-5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeVenueTab === 'reception'
                  ? 'bg-[#54121E] text-white shadow-md'
                  : 'text-amber-900 hover:bg-amber-100/60'
              }`}
            >
              <span>✨</span>
              <div className="text-left">
                <span className="block leading-tight">{isTelugu ? 'రిసెప్షన్ (నిజామాబాద్)' : 'Reception (Nizamabad)'}</span>
                <span className="text-[10px] opacity-80 block">{isTelugu ? 'నవంబర్ 4, సాయంత్రం' : 'Nov 4 · Evening'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Venue Information Card & Interactive Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Venue Details & Quick Ride Booking */}
          <div className="lg:col-span-6 space-y-5">
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-amber-200 shadow-xs space-y-4">
              
              <div className="inline-block px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#54121E]">
                {isTelugu ? currentVenue.tagTe : currentVenue.tagEn}
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 bg-amber-100 text-[#781B10] rounded-xl shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-[#781B10]">
                    {isTelugu ? currentVenue.nameTe : currentVenue.nameEn}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-amber-950/85 leading-relaxed">
                    {isTelugu ? currentVenue.addressTe : currentVenue.addressEn}
                  </p>
                </div>
              </div>

              {/* Date & Time Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-amber-100 text-xs text-amber-950">
                <div className="flex items-center gap-2 p-2 bg-amber-50/60 rounded-lg">
                  <Calendar className="w-4 h-4 text-amber-800 shrink-0" />
                  <span className="font-semibold">{isTelugu ? currentVenue.dateTe : currentVenue.dateEn}</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-amber-50/60 rounded-lg">
                  <Clock className="w-4 h-4 text-amber-800 shrink-0" />
                  <span className="font-semibold">{isTelugu ? currentVenue.timeTe : currentVenue.timeEn}</span>
                </div>
              </div>

              {/* Copy Address Button */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleCopyAddress}
                  className="px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100/70 hover:bg-amber-200/70 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAddress ? (isTelugu ? 'చిరునామా కాపీ అయింది!' : 'Address Copied!') : (isTelugu ? 'పూర్తి చిరునామా కాపీ చేయండి' : 'Copy Full Address')}</span>
                </button>
              </div>

              {/* Map App Navigators */}
              <div className="pt-3 border-t border-amber-100 grid grid-cols-2 gap-2">
                <button
                  onClick={handleGoogleMaps}
                  className="px-3 py-2.5 text-xs font-semibold text-white bg-[#54121E] hover:bg-[#781B10] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </button>
                <button
                  onClick={handleAppleMaps}
                  className="px-3 py-2.5 text-xs font-semibold text-amber-950 bg-white border border-amber-300 hover:bg-amber-50 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-700" />
                  <span>Apple Maps</span>
                </button>
              </div>

              {/* Cabs / Transit Deeplinks */}
              <div className="pt-1 grid grid-cols-2 gap-2">
                <button
                  onClick={handleUber}
                  className="px-3 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>{t.bookUber}</span>
                </button>
                <button
                  onClick={handleOla}
                  className="px-3 py-2 text-xs font-semibold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Car className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.bookOla}</span>
                </button>
              </div>
            </div>

            {/* Proximity / Connectivity Highlights */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-2.5">
              <span className="font-semibold text-amber-900 block text-sm">
                {isTelugu ? 'ప్రయాణ సౌకర్యాలు & దూరాలు:' : 'Travel Connectivity & Proximity:'}
              </span>

              {(isTelugu ? currentVenue.transitInfoTe : currentVenue.transitInfoEn).map((info, idx) => {
                const IconComponent = info.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5">
                    <IconComponent className="w-4 h-4 text-amber-800 shrink-0" />
                    <span>{info.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Map Blueprint Card */}
          <div className="lg:col-span-6 bg-[#FFFDF9] border border-amber-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between text-xs text-amber-900">
              <span className="font-semibold tracking-wide uppercase">
                {isTelugu ? 'ప్రత్యక్ష మ్యాప్ నావిగేషన్' : 'Live Navigation Map'}
              </span>
              <span className="px-2 py-0.5 bg-rose-100 text-[#54121E] font-bold rounded-full text-[11px]">
                {activeVenueTab === 'wedding' ? 'Chittoor' : 'Nizamabad'}
              </span>
            </div>

            {/* Visual Route Blueprint SVG Card */}
            <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-amber-200 bg-[#FAF7EE] flex items-center justify-center p-4">
              <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
                {activeVenueTab === 'wedding' ? (
                  // Chittoor Wedding Map SVG
                  <>
                    <path d="M 50,320 Q 280,240 550,120" stroke="#E2D9C5" strokeWidth="26" fill="none" />
                    <path d="M 50,320 Q 280,240 550,120" stroke="#F59E0B" strokeWidth="3" strokeDasharray="8 6" fill="none" />
                    <text x="180" y="270" fill="#B45309" fontSize="11" fontWeight="bold">
                      Vellore Road / Greamspet Highway
                    </text>

                    {/* Durgamma Temple Landmark */}
                    <g transform="translate(190, 160)">
                      <circle cx="0" cy="0" r="14" fill="#F59E0B" opacity="0.25" />
                      <circle cx="0" cy="0" r="6" fill="#D97706" />
                      <text x="14" y="4" fill="#92400E" fontSize="10" fontWeight="bold">
                        Durgamma Temple Landmark
                      </text>
                    </g>

                    {/* Chittoor Railway Station */}
                    <g transform="translate(100, 310)">
                      <circle cx="0" cy="0" r="14" fill="#3B82F6" opacity="0.2" />
                      <circle cx="0" cy="0" r="6" fill="#1D4ED8" />
                      <text x="12" y="4" fill="#1E3A8A" fontSize="10" fontWeight="bold">
                        Chittoor Station (~5 mins)
                      </text>
                    </g>

                    {/* Katpadi Junction Highway */}
                    <g transform="translate(480, 110)">
                      <circle cx="0" cy="0" r="14" fill="#6B7280" opacity="0.2" />
                      <circle cx="0" cy="0" r="6" fill="#374151" />
                      <text x="-140" y="4" fill="#374151" fontSize="10" fontWeight="bold">
                        Towards Katpadi / Vellore
                      </text>
                    </g>

                    {/* Vijayadurga Kalyana Mandapam Destination Marker */}
                    <g transform="translate(320, 190)" className="animate-bounce">
                      <circle cx="0" cy="0" r="26" fill="#DC2626" opacity="0.25" />
                      <circle cx="0" cy="0" r="11" fill="#991B1B" />
                      <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
                      <path d="M 0,-26 L 7,-10 L -7,-10 Z" fill="#991B1B" />
                      <rect x="-105" y="-60" width="210" height="28" rx="8" fill="#54121E" />
                      <text x="0" y="-42" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">
                        Vijayadurga Kalyana Mandapam
                      </text>
                    </g>
                  </>
                ) : (
                  // Nizamabad Reception Map SVG
                  <>
                    <path d="M 60,80 L 540,320" stroke="#E2D9C5" strokeWidth="26" fill="none" />
                    <path d="M 60,80 L 540,320" stroke="#F59E0B" strokeWidth="3" strokeDasharray="8 6" fill="none" />
                    <text x="210" y="180" fill="#B45309" fontSize="11" fontWeight="bold">
                      Shivaji Nagar Road / NH-44 Link
                    </text>

                    {/* Nizamabad Junction Station */}
                    <g transform="translate(120, 110)">
                      <circle cx="0" cy="0" r="14" fill="#3B82F6" opacity="0.2" />
                      <circle cx="0" cy="0" r="6" fill="#1D4ED8" />
                      <text x="12" y="4" fill="#1E3A8A" fontSize="10" fontWeight="bold">
                        Nizamabad Junction (~8 mins)
                      </text>
                    </g>

                    {/* TSRTC Bus Station */}
                    <g transform="translate(460, 290)">
                      <circle cx="0" cy="0" r="14" fill="#6B7280" opacity="0.2" />
                      <circle cx="0" cy="0" r="6" fill="#374151" />
                      <text x="-150" y="4" fill="#374151" fontSize="10" fontWeight="bold">
                        Central Bus Station (~6 mins)
                      </text>
                    </g>

                    {/* Munnuru Kapu Kalyana Mandapam Destination Marker */}
                    <g transform="translate(310, 200)" className="animate-bounce">
                      <circle cx="0" cy="0" r="26" fill="#DC2626" opacity="0.25" />
                      <circle cx="0" cy="0" r="11" fill="#991B1B" />
                      <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
                      <path d="M 0,-26 L 7,-10 L -7,-10 Z" fill="#991B1B" />
                      <rect x="-115" y="-60" width="230" height="28" rx="8" fill="#54121E" />
                      <text x="0" y="-42" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">
                        Munnuru Kapu Kalyana Mandapam
                      </text>
                    </g>
                  </>
                )}
              </svg>

              {/* Floating Action Overlay */}
              <div className="absolute bottom-3 right-3 bg-white/95 border border-amber-300 rounded-xl p-3 shadow-md text-xs space-y-1">
                <span className="font-bold text-[#54121E] block">
                  {isTelugu ? currentVenue.nameTe : currentVenue.nameEn}
                </span>
                <span className="font-mono text-amber-900 block text-[11px]">
                  {currentVenue.coords} · {activeVenueTab === 'wedding' ? 'Chittoor' : 'Nizamabad'}
                </span>
                <button
                  onClick={handleGoogleMaps}
                  className="text-xs text-[#B45309] hover:underline flex items-center gap-1 cursor-pointer font-bold pt-0.5"
                >
                  <span>{isTelugu ? 'గూగుల్ మ్యాప్స్ లో నావిగేట్ చేయండి' : 'Launch Google Maps Navigation'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
