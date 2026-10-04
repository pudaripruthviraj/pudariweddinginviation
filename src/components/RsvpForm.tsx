import React, { useState } from 'react';
import { Check, Mail, Phone, User, Users, Heart, Sparkles, QrCode, Copy, Send, Calendar, Download } from 'lucide-react';
import { Language, GuestRsvp } from '../types/wedding';
import { translations } from '../data/translations';
import { INITIAL_EVENTS } from '../data/weddingData';
import { triggerAkshinthaluShower } from '../utils/confetti';

interface RsvpFormProps {
  currentLang: Language;
  onAddRsvp: (rsvp: GuestRsvp) => void;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({ currentLang, onAddRsvp }) => {
  const t = translations[currentLang];

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [attendingEvents, setAttendingEvents] = useState<string[]>([
    'subha-muhurtham',
    'reception-vindu',
  ]);
  const [dietaryPreference, setDietaryPreference] = useState<GuestRsvp['dietaryPreference']>('pure-veg');
  const [accommodationNeeded, setAccommodationNeeded] = useState(false);
  const [transportAssistance, setTransportAssistance] = useState(false);
  const [travelDetails, setTravelDetails] = useState('');
  const [personalNote, setPersonalNote] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedRsvp, setConfirmedRsvp] = useState<GuestRsvp | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  const toggleEvent = (eventId: string) => {
    if (attendingEvents.includes(eventId)) {
      setAttendingEvents(attendingEvents.filter((id) => id !== eventId));
    } else {
      setAttendingEvents([...attendingEvents, eventId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const uniqueId = `KV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newRsvp: GuestRsvp = {
        id: uniqueId,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        guestCount: Number(guestCount) || 1,
        attendingEvents,
        dietaryPreference,
        accommodationNeeded,
        transportAssistance,
        travelDetails: travelDetails.trim(),
        personalNote: personalNote.trim(),
        status: 'confirmed',
        createdAt: new Date().toISOString().split('T')[0],
      };

      onAddRsvp(newRsvp);
      setConfirmedRsvp(newRsvp);
      setIsSubmitting(false);
      setShowEmailModal(true);
      triggerAkshinthaluShower();
    }, 600);
  };

  const handleCopyPass = () => {
    if (!confirmedRsvp) return;
    const text = `Kalyana Mahotsavam Wedding Pass\nGuest: ${confirmedRsvp.fullName}\nPass ID: ${confirmedRsvp.id}\nAttendees: ${confirmedRsvp.guestCount}\nWedding: Oct 30, 2026 (5:30 AM) - Vijayadurga Kalyana Mandapam, Chittoor\nReception: Nov 4, 2026 (Evening) - Munnuru Kapu Kalyana Mandapam, Nizamabad`;
    navigator.clipboard.writeText(text);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2500);
  };

  return (
    <section id="rsvp" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-amber-200/80">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#781B10]">
            {t.rsvpTitle}
          </h2>
          <p className="text-sm sm:text-base text-amber-900/80">
            {t.rsvpSub}
          </p>
        </div>

        {confirmedRsvp ? (
          /* Confirmation Success Card & Digital Pass */
          <div className="rounded-2xl border-2 border-amber-300 bg-[#FFFDF9] p-6 sm:p-8 shadow-md space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-700">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[#781B10]">
                {t.rsvpSuccessTitle}
              </h3>
              <p className="text-xs sm:text-sm text-amber-900/90 max-w-lg mx-auto">
                {t.rsvpSuccessPassMsg}
              </p>
            </div>

            {/* Official Digital Invite Card */}
            <div className="max-w-md mx-auto p-5 rounded-xl border border-amber-200 bg-amber-50/70 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700">
                    Official Digital Pass
                  </span>
                  <h4 className="text-base font-display font-bold text-[#781B10]">
                    {confirmedRsvp.fullName}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-amber-800 font-semibold block">Pass ID</span>
                  <span className="font-mono text-xs font-bold text-amber-950">{confirmedRsvp.id}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-amber-950">
                <div>
                  <span className="text-amber-800 block">Total Attendees:</span>
                  <span className="font-bold">{confirmedRsvp.guestCount} Guests</span>
                </div>
                <div>
                  <span className="text-amber-800 block">Food Preference:</span>
                  <span className="font-bold capitalize">{confirmedRsvp.dietaryPreference.replace('-', ' ')}</span>
                </div>
                <div>
                  <span className="text-amber-800 block">Auspicious Date:</span>
                  <span className="font-bold">Nov 26, 2026 (10:24 AM)</span>
                </div>
                <div>
                  <span className="text-amber-800 block">Venue:</span>
                  <span className="font-bold">Shamshabad, Hyderabad</span>
                </div>
              </div>

              {/* QR Verification Mock Canvas */}
              <div className="pt-3 border-t border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white border border-amber-200 rounded-lg">
                    <QrCode className="w-8 h-8 text-[#781B10]" />
                  </div>
                  <div className="text-[10px] text-amber-900 leading-tight">
                    <span className="font-semibold block text-amber-950">Verified Pass</span>
                    <span>Present at venue reception desk</span>
                  </div>
                </div>

                <button
                  onClick={handleCopyPass}
                  className="px-3 py-1.5 text-xs font-semibold text-amber-900 bg-white border border-amber-300 hover:bg-amber-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedPass ? 'Copied!' : 'Copy Pass'}</span>
                </button>
              </div>
            </div>

            {/* Email dispatch notice & trigger */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setShowEmailModal(true)}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#781B10] hover:bg-[#991B1B] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>View Automated Email Confirmation</span>
              </button>

              <button
                onClick={() => setConfirmedRsvp(null)}
                className="w-full sm:w-auto px-4 py-2.5 bg-amber-100 text-amber-950 text-xs sm:text-sm font-semibold rounded-lg hover:bg-amber-200 transition-colors cursor-pointer"
              >
                Register Another Family Member
              </button>
            </div>
          </div>
        ) : (
          /* RSVP Input Form */
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl bg-[#FFFDF9] border border-amber-200/90 shadow-xs space-y-6"
          >
            {/* Row 1: Name, Email, Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1.5">
                  {t.fullNameLabel} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-amber-600 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Vangala"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#781B10]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1.5">
                  {t.emailLabel} *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-amber-600 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="ramesh@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#781B10]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1.5">
                  {t.phoneLabel} *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-amber-600 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98480 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#781B10]"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Guests Count & Dietary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1.5">
                  {t.guestsCountLabel}
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-amber-600 absolute left-3 top-3" />
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#781B10] cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests (Family)'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1.5">
                  {t.dietaryLabel}
                </label>
                <select
                  value={dietaryPreference}
                  onChange={(e) => setDietaryPreference(e.target.value as GuestRsvp['dietaryPreference'])}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#781B10] cursor-pointer"
                >
                  <option value="pure-veg">{t.dietVeg}</option>
                  <option value="telangana-traditional">{t.dietTraditional}</option>
                  <option value="jain">{t.dietJain}</option>
                  <option value="no-preference">{t.dietNoPref}</option>
                </select>
              </div>
            </div>

            {/* Events Attending Checklist */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-amber-950">
                {t.eventsAttendingLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {INITIAL_EVENTS.map((evt) => {
                  const checked = attendingEvents.includes(evt.id);
                  return (
                    <div
                      key={evt.id}
                      onClick={() => toggleEvent(evt.id)}
                      className={`p-3 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                        checked
                          ? 'bg-amber-100/80 border-amber-400 text-amber-950 font-medium'
                          : 'bg-white border-amber-200 text-amber-900/80 hover:bg-amber-50'
                      }`}
                    >
                      <span className="line-clamp-1">
                        {currentLang === 'te' ? evt.titleTe : evt.titleEn}
                      </span>
                      <div
                        className={`w-4 h-4 rounded-sm flex items-center justify-center border ${
                          checked ? 'bg-[#781B10] border-[#781B10] text-white' : 'border-amber-300 bg-white'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Accommodation & Travel Support Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <label className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/60 border border-amber-200 cursor-pointer text-xs text-amber-950">
                <input
                  type="checkbox"
                  checked={accommodationNeeded}
                  onChange={(e) => setAccommodationNeeded(e.target.checked)}
                  className="mt-0.5 rounded text-[#781B10] focus:ring-[#781B10]"
                />
                <div>
                  <span className="font-semibold block">{t.accommodationLabel}</span>
                  <span className="text-[11px] text-amber-800">We have reserved suites at Shamshabad for relatives.</span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/60 border border-amber-200 cursor-pointer text-xs text-amber-950">
                <input
                  type="checkbox"
                  checked={transportAssistance}
                  onChange={(e) => setTransportAssistance(e.target.checked)}
                  className="mt-0.5 rounded text-[#781B10] focus:ring-[#781B10]"
                />
                <div>
                  <span className="font-semibold block">{t.transportLabel}</span>
                  <span className="text-[11px] text-amber-800">Airport & Secunderabad station pick-up shuttles available.</span>
                </div>
              </label>
            </div>

            {/* Conditional Travel details input */}
            {(accommodationNeeded || transportAssistance) && (
              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  {t.travelDetailsLabel}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flight 6E-241 arriving RGIA at 2:30 PM on Nov 25"
                  value={travelDetails}
                  onChange={(e) => setTravelDetails(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#781B10]"
                />
              </div>
            )}

            {/* Personal Note */}
            <div>
              <label className="block text-xs font-semibold text-amber-950 mb-1">
                {t.personalNoteLabel}
              </label>
              <textarea
                rows={2}
                placeholder="Share your prayers or a message for Pruthvi & Sravanthi..."
                value={personalNote}
                onChange={(e) => setPersonalNote(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#781B10]"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#781B10] hover:bg-[#991B1B] text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? t.submittingRsvp : t.submitRsvpBtn}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Automated Email Confirmation Simulation Modal */}
      {showEmailModal && confirmedRsvp && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowEmailModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-amber-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Email Header */}
            <div className="bg-[#781B10] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-300" />
                <span className="font-semibold text-sm">Automated Email Notification</span>
              </div>
              <span className="text-[11px] font-mono text-amber-200">Delivered</span>
            </div>

            {/* Email Body Preview */}
            <div className="p-6 space-y-4 text-xs text-slate-800 bg-[#FFFDF9] max-h-[70vh] overflow-y-auto">
              <div className="border-b border-amber-100 pb-3 space-y-1">
                <p><span className="font-semibold text-amber-950">To:</span> {confirmedRsvp.fullName} &lt;{confirmedRsvp.email}&gt;</p>
                <p><span className="font-semibold text-amber-950">Subject:</span> RSVP Confirmed: Pruthviraj & Sravanthi Kalyana Mahotsavam (Pass #{confirmedRsvp.id})</p>
                <p><span className="font-semibold text-amber-950">Date:</span> {new Date().toLocaleDateString()}</p>
              </div>

              <div className="space-y-3 font-serif text-sm leading-relaxed text-amber-950">
                <p className="font-bold text-base text-[#781B10]">
                  Dear {confirmedRsvp.fullName},
                </p>
                <p>
                  Namaskaram! We are overjoyed to receive your RSVP confirmation for our wedding celebrations. Your presence will make our union truly auspicious and memorable.
                </p>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs font-sans space-y-2">
                  <div className="font-bold text-[#781B10] uppercase tracking-wider text-[10px]">
                    Your Wedding Digital Access Pass
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p><span className="font-semibold">Confirmation Pass ID:</span> {confirmedRsvp.id}</p>
                      <p><span className="font-semibold">Attendees:</span> {confirmedRsvp.guestCount} Member(s)</p>
                      <p><span className="font-semibold">Dining:</span> {confirmedRsvp.dietaryPreference.replace('-', ' ')}</p>
                    </div>
                    <div className="p-2 bg-white rounded border border-amber-300">
                      <QrCode className="w-10 h-10 text-[#781B10]" />
                    </div>
                  </div>
                </div>
                <p className="text-xs font-sans text-amber-900 leading-relaxed">
                  <strong>💍 Wedding:</strong> Vijayadurga Kalyana Mandapam, Near Durgamma Temple, Vellore Road, Greamspet, Chittoor (Friday, Oct 30, 2026 at 5:30 AM)<br />
                  <strong>✨ Grand Reception:</strong> Munnuru Kapu Kalyana Mandapam, Shivaji Nagar, Nizamabad (Wednesday, Nov 4, 2026, Evening)
                </p>
                <p className="text-xs font-sans text-amber-900">
                  Looking forward to welcoming you with traditional poornakumbham and fragrant talambralu.
                </p>
                <p className="font-bold text-[#781B10] pt-2">
                  Warm Regards,<br />
                  Deepika & Pruthviraj<br />
                  Families & Elders
                </p>
              </div>
            </div>

            <div className="p-4 bg-amber-50 border-t border-amber-200 flex justify-end">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 bg-[#781B10] text-white text-xs font-semibold rounded-lg hover:bg-[#991B1B] cursor-pointer"
              >
                Close Notification
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
