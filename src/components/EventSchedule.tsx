import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Shirt, ChevronRight, Check } from 'lucide-react';
import { Language, EventItem } from '../types/wedding';
import { translations } from '../data/translations';
import { INITIAL_EVENTS } from '../data/weddingData';

interface EventScheduleProps {
  currentLang: Language;
}

export const EventSchedule: React.FC<EventScheduleProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [filter, setFilter] = useState<'all' | 'pre-wedding' | 'ceremony' | 'reception'>('all');
  const [copiedEventId, setCopiedEventId] = useState<string | null>(null);

  const filteredEvents = INITIAL_EVENTS.filter((evt) => {
    if (filter === 'all') return true;
    return evt.category === filter;
  });

  const handleAddEventToCalendar = (evt: EventItem) => {
    const title = encodeURIComponent(
      currentLang === 'te' ? `${evt.titleTe} - పృథ్వీరాజ్ & స్రవంతి వివాహం` : `${evt.titleEn} - Pruthviraj & Sravanthi Wedding`
    );
    const details = encodeURIComponent(
      currentLang === 'te'
        ? `${evt.descriptionTe}\nసమయం: ${evt.timeTe}\nవేదిక: ${evt.venueTe}\nదుస్తులు: ${evt.attireTe}`
        : `${evt.descriptionEn}\nTime: ${evt.timeEn}\nVenue: ${evt.venueEn}\nAttire: ${evt.attireEn}`
    );
    const location = encodeURIComponent(currentLang === 'te' ? evt.venueTe : evt.venueEn);

    // Approximate ISO strings based on event date
    let startIso = '20261126T045400Z';
    let endIso = '20261126T083000Z';
    if (evt.id === 'pasupu-danchudu') {
      startIso = '20261124T020000Z';
      endIso = '20261124T050000Z';
    } else if (evt.id === 'pellikoduku-cheyadam') {
      startIso = '20261124T103000Z';
      endIso = '20261124T133000Z';
    } else if (evt.id === 'sangeet-mehendi') {
      startIso = '20261125T130000Z';
      endIso = '20261125T173000Z';
    } else if (evt.id === 'reception-vindu') {
      startIso = '20261126T133000Z';
      endIso = '20261126T180000Z';
    }

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
    window.open(url, '_blank');
    setCopiedEventId(evt.id);
    setTimeout(() => setCopiedEventId(null), 3000);
  };

  return (
    <section id="schedule" className="py-16 px-4 sm:px-6 lg:px-8 bg-kolam border-b border-amber-200/80">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#781B10]">
            {t.eventsSectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-amber-900/80">
            {t.eventsSectionSub}
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-amber-100/70 border border-amber-200 rounded-xl max-w-xl mx-auto">
          {[
            { id: 'all', label: t.filterAll },
            { id: 'pre-wedding', label: t.filterPre },
            { id: 'ceremony', label: t.filterCeremony },
            { id: 'reception', label: t.filterReception },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-white text-[#781B10] shadow-xs'
                  : 'text-amber-900 hover:text-[#781B10]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Events Timeline / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((evt, idx) => {
            const isMuhurtham = evt.id === 'subha-muhurtham';
            return (
              <div
                key={evt.id}
                className={`relative rounded-2xl p-6 transition-all border ${
                  isMuhurtham
                    ? 'bg-gradient-to-br from-rose-50/90 via-amber-50 to-white border-rose-300 ring-2 ring-rose-200 shadow-md md:col-span-2'
                    : 'bg-white border-amber-200/90 shadow-xs hover:border-amber-300'
                }`}
              >
                {/* Event Category and Numerical index */}
                <div className="flex items-center justify-between text-xs text-amber-800 font-medium mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-amber-700 font-bold">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span>
                      {currentLang === 'te' ? evt.dateStrTe : evt.dateStrEn}
                    </span>
                  </div>
                  {isMuhurtham && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-md">
                      <Sparkles className="w-3 h-3" />
                      {currentLang === 'te' ? 'ప్రధాన ముహూర్తం' : 'Prime Muhurtham'}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-display font-bold text-[#781B10]">
                  {currentLang === 'te' ? evt.titleTe : evt.titleEn}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-amber-950/85 leading-relaxed">
                  {currentLang === 'te' ? evt.descriptionTe : evt.descriptionEn}
                </p>

                {/* Cultural Significance Callout */}
                <div className="mt-4 p-3 rounded-lg bg-amber-50/80 border border-amber-200/60 text-xs text-amber-900 space-y-1">
                  <span className="font-semibold text-amber-950 block">
                    {t.significanceLabel}
                  </span>
                  <p className="leading-relaxed">
                    {currentLang === 'te' ? evt.significanceTe : evt.significanceEn}
                  </p>
                </div>

                {/* Metadata Row: Time, Venue, Attire */}
                <div className="mt-4 pt-3 border-t border-amber-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-amber-950/90">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-amber-900 block">Time:</span>
                      <span>{currentLang === 'te' ? evt.timeTe : evt.timeEn}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-amber-900 block">Venue:</span>
                      <span>{currentLang === 'te' ? evt.venueTe : evt.venueEn}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 sm:col-span-2">
                    <Shirt className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-amber-900 block">
                        {t.attireLabel}
                      </span>
                      <span>{currentLang === 'te' ? evt.attireTe : evt.attireEn}</span>
                    </div>
                  </div>
                </div>

                {/* Add to Calendar Action */}
                <div className="mt-4 flex items-center justify-end">
                  <button
                    onClick={() => handleAddEventToCalendar(evt)}
                    className="px-3 py-1.5 text-xs font-semibold text-[#781B10] bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedEventId === evt.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Opening Calendar...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{t.calendarExport}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
