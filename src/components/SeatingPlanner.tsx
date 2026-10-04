import React, { useState } from 'react';
import { Users, Plus, X, UserCheck, Move, LayoutGrid, Check, Sparkles } from 'lucide-react';
import { Language, SeatingTable, GuestRsvp } from '../types/wedding';
import { translations } from '../data/translations';

interface SeatingPlannerProps {
  currentLang: Language;
  tables: SeatingTable[];
  rsvps: GuestRsvp[];
  onAssignGuest: (tableId: string, guestId: string) => void;
  onUnassignGuest: (tableId: string, guestId: string) => void;
  onAddTable: (table: SeatingTable) => void;
}

export const SeatingPlanner: React.FC<SeatingPlannerProps> = ({
  currentLang,
  tables,
  rsvps,
  onAssignGuest,
  onUnassignGuest,
  onAddTable,
}) => {
  const t = translations[currentLang];
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);
  const [isNewTableOpen, setIsNewTableOpen] = useState(false);
  const [newTableName, setNewTableName] = useState('');
  const [newTableCapacity, setNewTableCapacity] = useState('8');
  const [newTableZone, setNewTableZone] = useState<SeatingTable['zone']>('vip-mandapam');

  // Track assigned guest IDs across all tables
  const assignedIds = new Set<string>();
  tables.forEach((t) => t.assignedGuestIds.forEach((id) => assignedIds.add(id)));

  // Unassigned confirmed attendees
  const unassignedGuests = rsvps.filter((r) => r.status === 'confirmed' && !assignedIds.has(r.id));

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, guestId: string) => {
    e.dataTransfer.setData('text/plain', guestId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnTable = (e: React.DragEvent, tableId: string) => {
    e.preventDefault();
    const guestId = e.dataTransfer.getData('text/plain');
    if (guestId) {
      onAssignGuest(tableId, guestId);
      if (selectedGuestId === guestId) setSelectedGuestId(null);
    }
  };

  const handleTableClick = (tableId: string) => {
    if (selectedGuestId) {
      onAssignGuest(tableId, selectedGuestId);
      setSelectedGuestId(null);
    }
  };

  const handleAddNewTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableName.trim()) return;

    const newT: SeatingTable = {
      id: `table-${Date.now()}`,
      nameEn: newTableName.trim(),
      nameTe: newTableName.trim(),
      capacity: Number(newTableCapacity) || 8,
      zone: newTableZone,
      assignedGuestIds: [],
    };

    onAddTable(newT);
    setIsNewTableOpen(false);
    setNewTableName('');
  };

  return (
    <section id="seating" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-amber-200/80">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#781B10]">
              {t.seatingTitle}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-amber-900/80">
              {t.seatingSub}
            </p>
          </div>

          <button
            onClick={() => setIsNewTableOpen(true)}
            className="self-start sm:self-auto px-4 py-2 bg-[#781B10] hover:bg-[#991B1B] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addTableBtn}</span>
          </button>
        </div>

        {/* Visual Mandapam Blueprint Notice */}
        <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Tip:</strong> Drag a guest into any table, or click a guest in the tray below and then click a table to assign.
            </span>
          </div>
          {selectedGuestId && (
            <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md">
              Guest Selected! Click a table to seat them.
            </span>
          )}
        </div>

        {/* Unassigned Guest Drawer / Tray */}
        <div className="bg-[#FFFDF9] border border-amber-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-amber-900">
            <span className="font-bold uppercase tracking-wider text-[#781B10]">
              {t.unassignedGuests} ({unassignedGuests.length})
            </span>
            <span className="text-[11px] text-amber-800">
              Showing confirmed RSVPs awaiting seats
            </span>
          </div>

          <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1">
            {unassignedGuests.map((g) => {
              const isSelected = selectedGuestId === g.id;
              return (
                <div
                  key={g.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, g.id)}
                  onClick={() => setSelectedGuestId(isSelected ? null : g.id)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-grab active:cursor-grabbing transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#781B10] text-white border-[#781B10] ring-2 ring-amber-400'
                      : 'bg-white border-amber-200 hover:border-amber-400 text-amber-950'
                  }`}
                  title="Drag or click to assign"
                >
                  <Move className="w-3 h-3 text-amber-600 opacity-60" />
                  <span>{g.fullName}</span>
                  <span className="text-[10px] font-mono opacity-80">({g.guestCount}p)</span>
                </div>
              );
            })}

            {unassignedGuests.length === 0 && (
              <p className="text-xs text-emerald-800 font-medium py-2">
                All confirmed guests have been assigned tables!
              </p>
            )}
          </div>
        </div>

        {/* Mandapam Stage Layout Indicator */}
        <div className="py-2.5 px-4 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 rounded-xl text-center shadow-xs">
          <span className="text-xs sm:text-sm font-display font-bold uppercase tracking-widest text-[#781B10]">
            👑 Sacred Wedding Mandapam Stage (Kalyana Vedika) 👑
          </span>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.map((table) => {
            const assignedMembers = rsvps.filter((r) => table.assignedGuestIds.includes(r.id));
            const totalPeople = assignedMembers.reduce((acc, curr) => acc + curr.guestCount, 0);
            const isFull = totalPeople >= table.capacity;

            return (
              <div
                key={table.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropOnTable(e, table.id)}
                onClick={() => handleTableClick(table.id)}
                className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                  selectedGuestId
                    ? 'border-amber-400 bg-amber-50/50 hover:bg-amber-100/60 cursor-pointer shadow-md'
                    : 'bg-[#FFFDF9] border-amber-200 shadow-xs'
                }`}
              >
                <div>
                  {/* Table Header */}
                  <div className="flex items-start justify-between gap-2 border-b border-amber-100 pb-2">
                    <div>
                      <h4 className="text-sm sm:text-base font-display font-bold text-[#781B10]">
                        {currentLang === 'te' ? table.nameTe : table.nameEn}
                      </h4>
                      <span className="text-[10px] text-amber-700 font-medium capitalize">
                        Zone: {table.zone.replace('-', ' ')}
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        isFull ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {totalPeople}/{table.capacity} Seats
                    </span>
                  </div>

                  {/* Assigned Guests List */}
                  <div className="mt-3 space-y-1.5 min-h-[90px]">
                    {assignedMembers.map((g) => (
                      <div
                        key={g.id}
                        className="flex items-center justify-between p-1.5 bg-white border border-amber-100 rounded-lg text-xs text-amber-950"
                      >
                        <div className="truncate">
                          <span className="font-semibold">{g.fullName}</span>
                          <span className="text-[10px] text-amber-700 ml-1">({g.guestCount} guests)</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onUnassignGuest(table.id, g.id);
                          }}
                          className="p-1 text-amber-600 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                          title="Remove from table"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    {assignedMembers.length === 0 && (
                      <div className="h-full flex items-center justify-center border-2 border-dashed border-amber-200 rounded-lg py-5 text-amber-800/60 text-xs">
                        Drop guest here or click to assign
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-amber-100 flex items-center justify-between text-[11px] text-amber-800">
                  <span>Capacity: {table.capacity}</span>
                  {selectedGuestId && (
                    <span className="font-bold text-[#781B10] animate-pulse">
                      Click to Seat Here
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Table Modal */}
      {isNewTableOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsNewTableOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-amber-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-display font-bold text-[#781B10]">
              Add New Seating Table
            </h3>

            <form onSubmit={handleAddNewTable} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-amber-950 mb-1">
                  Table Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. High School Buddies / Cousins Row"
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-amber-950 mb-1">
                  Seating Capacity
                </label>
                <input
                  type="number"
                  min="2"
                  max="20"
                  value={newTableCapacity}
                  onChange={(e) => setNewTableCapacity(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-amber-950 mb-1">
                  Mandapam Zone
                </label>
                <select
                  value={newTableZone}
                  onChange={(e) => setNewTableZone(e.target.value as SeatingTable['zone'])}
                  className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg"
                >
                  <option value="vip-mandapam">Mandapam Front Stage VIP</option>
                  <option value="groom-family">Groom's Family</option>
                  <option value="bride-family">Bride's Family</option>
                  <option value="friends">Friends & Colleagues</option>
                  <option value="dining-hall">Dining Hall</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewTableOpen(false)}
                  className="px-4 py-2 text-amber-900 hover:bg-amber-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#781B10] text-white font-semibold rounded-lg hover:bg-[#991B1B] cursor-pointer"
                >
                  Create Table
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
