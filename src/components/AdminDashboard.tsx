import React, { useState } from 'react';
import { ShieldCheck, Download, Search, Users, Utensils, Bed, Car, Check, X, Lock, Unlock, Phone, Mail } from 'lucide-react';
import { Language, GuestRsvp, SeatingTable } from '../types/wedding';
import { translations } from '../data/translations';

interface AdminDashboardProps {
  currentLang: Language;
  rsvps: GuestRsvp[];
  tables: SeatingTable[];
  onUpdateStatus: (id: string, status: GuestRsvp['status']) => void;
  onDeleteRsvp: (id: string) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentLang,
  rsvps,
  tables,
  onUpdateStatus,
  onDeleteRsvp,
  onClose,
}) => {
  const t = translations[currentLang];
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'tentative' | 'declined'>('all');

  const correctPin = '2026';

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === correctPin || pinInput.trim() === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery);

    if (!matchesSearch) return false;
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  });

  const totalAttendeesCount = rsvps
    .filter((r) => r.status === 'confirmed')
    .reduce((acc, curr) => acc + curr.guestCount, 0);

  const vegMealsCount = rsvps
    .filter((r) => r.status === 'confirmed' && (r.dietaryPreference === 'pure-veg' || r.dietaryPreference === 'jain'))
    .reduce((acc, curr) => acc + curr.guestCount, 0);

  const accommodationRoomsCount = rsvps
    .filter((r) => r.status === 'confirmed' && r.accommodationNeeded)
    .length;

  const transportCount = rsvps
    .filter((r) => r.status === 'confirmed' && r.transportAssistance)
    .length;

  const handleExportCsv = () => {
    const headers = [
      'Pass ID',
      'Full Name',
      'Email',
      'Phone',
      'Guest Count',
      'Status',
      'Dietary Preference',
      'Accommodation Needed',
      'Transport Needed',
      'Travel Notes',
      'Personal Message',
      'Date Submitted',
    ];

    const rows = rsvps.map((r) => [
      r.id,
      `"${r.fullName.replace(/"/g, '""')}"`,
      r.email,
      r.phone,
      r.guestCount,
      r.status,
      r.dietaryPreference,
      r.accommodationNeeded ? 'YES' : 'NO',
      r.transportAssistance ? 'YES' : 'NO',
      `"${(r.travelDetails || '').replace(/"/g, '""')}"`,
      `"${(r.personalNote || '').replace(/"/g, '""')}"`,
      r.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Kalyanam-Guest-List-Master.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FFFDF9] border border-amber-300 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Bar */}
        <div className="bg-[#781B10] px-6 py-4 text-white flex items-center justify-between border-b border-amber-900">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
            <h2 className="text-base sm:text-lg font-display font-bold">
              {t.adminTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Host PIN Passcode Gate */
          <div className="p-8 sm:p-12 text-center max-w-sm mx-auto space-y-4 my-auto">
            <div className="p-3 bg-amber-100 text-[#781B10] rounded-2xl w-fit mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-display font-bold text-[#781B10]">
              Secure Host Access
            </h3>
            <p className="text-xs text-amber-900/80">
              {t.pinUnlockPrompt}
            </p>

            <form onSubmit={handleUnlock} className="space-y-3 pt-2">
              <input
                type="password"
                maxLength={8}
                placeholder="Enter PIN (2026)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center text-lg tracking-widest font-mono py-2 bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#781B10]"
              />

              {pinError && (
                <p className="text-xs text-rose-600 font-semibold">
                  Incorrect PIN. Try default passcode: 2026
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2 bg-[#781B10] hover:bg-[#991B1B] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                {t.unlockDashboard}
              </button>

              <button
                type="button"
                onClick={() => {
                  setPinInput('2026');
                  setIsAuthenticated(true);
                }}
                className="w-full py-1 text-[11px] text-amber-800 underline font-semibold cursor-pointer"
              >
                One-Click Host Demo Unlock (PIN: 2026)
              </button>
            </form>
          </div>
        ) : (
          /* Real-Time Authenticated Management Interface */
          <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white border border-amber-200 rounded-xl p-3.5 space-y-1 shadow-xs">
                <span className="text-[11px] text-amber-800 font-medium block">
                  {t.totalRsvps}
                </span>
                <span className="text-xl font-bold font-mono text-amber-950">
                  {rsvps.length} Submissions
                </span>
              </div>

              <div className="bg-white border border-amber-200 rounded-xl p-3.5 space-y-1 shadow-xs">
                <span className="text-[11px] text-amber-800 font-medium block">
                  {t.totalAttending}
                </span>
                <span className="text-xl font-bold font-mono text-[#781B10]">
                  {totalAttendeesCount} Attendees
                </span>
              </div>

              <div className="bg-white border border-amber-200 rounded-xl p-3.5 space-y-1 shadow-xs">
                <span className="text-[11px] text-amber-800 font-medium block">
                  {t.vegMeals}
                </span>
                <span className="text-xl font-bold font-mono text-emerald-800">
                  {vegMealsCount} Meals
                </span>
              </div>

              <div className="bg-white border border-amber-200 rounded-xl p-3.5 space-y-1 shadow-xs">
                <span className="text-[11px] text-amber-800 font-medium block">
                  {t.hotelRooms}
                </span>
                <span className="text-xl font-bold font-mono text-amber-900">
                  {accommodationRoomsCount} Requests
                </span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-amber-600 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder={t.searchGuests}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#781B10]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <div className="flex items-center gap-1 bg-amber-100/70 p-1 rounded-lg border border-amber-200 text-xs">
                  {(['all', 'confirmed', 'tentative', 'declined'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize cursor-pointer transition-colors ${
                        statusFilter === s ? 'bg-white text-[#781B10] shadow-xs' : 'text-amber-900'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleExportCsv}
                  className="px-3 py-1.5 bg-[#781B10] hover:bg-[#991B1B] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.exportCsv}</span>
                </button>
              </div>
            </div>

            {/* Guest List Master Table */}
            <div className="bg-white border border-amber-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-amber-950">
                  <thead className="bg-amber-50/80 border-b border-amber-200 text-amber-900 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Pass ID & Guest Name</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4 text-center font-mono">Count</th>
                      <th className="py-3 px-4">Dining & Stay</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100">
                    {filteredRsvps.map((rsvp) => (
                      <tr key={rsvp.id} className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-mono text-[10px] text-amber-700 block">
                            {rsvp.id}
                          </span>
                          <span className="font-bold text-amber-950 text-xs sm:text-sm">
                            {rsvp.fullName}
                          </span>
                          {rsvp.personalNote && (
                            <p className="text-[11px] text-amber-800/80 italic mt-0.5 line-clamp-1">
                              "{rsvp.personalNote}"
                            </p>
                          )}
                        </td>

                        <td className="py-3 px-4 text-[11px] text-amber-900 space-y-0.5">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-amber-600" />
                            <span>{rsvp.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-amber-600" />
                            <span>{rsvp.phone}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-center font-mono font-bold text-sm text-amber-950">
                          {rsvp.guestCount}
                        </td>

                        <td className="py-3 px-4 text-[11px]">
                          <span className="font-medium text-amber-900 capitalize block">
                            {rsvp.dietaryPreference.replace('-', ' ')}
                          </span>
                          <div className="flex items-center gap-2 text-[10px] text-amber-700 mt-0.5">
                            {rsvp.accommodationNeeded && <span>• Hotel Stay</span>}
                            {rsvp.transportAssistance && <span>• Pickup</span>}
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <select
                            value={rsvp.status}
                            onChange={(e) =>
                              onUpdateStatus(rsvp.id, e.target.value as GuestRsvp['status'])
                            }
                            className={`px-2 py-1 rounded-md text-[11px] font-semibold border cursor-pointer ${
                              rsvp.status === 'confirmed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : rsvp.status === 'tentative'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-rose-50 text-rose-800 border-rose-200'
                            }`}
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="tentative">Tentative</option>
                            <option value="declined">Declined</option>
                          </select>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => onDeleteRsvp(rsvp.id)}
                            className="text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
