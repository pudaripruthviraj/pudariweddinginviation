import React, { useState } from 'react';
import { DollarSign, Plus, Check, Trash2, PieChart, Download, IndianRupee, Tag } from 'lucide-react';
import { Language, BudgetItem } from '../types/wedding';
import { translations } from '../data/translations';

interface BudgetCalculatorProps {
  currentLang: Language;
  items: BudgetItem[];
  onAddItem: (item: BudgetItem) => void;
  onTogglePaid: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({
  currentLang,
  items,
  onAddItem,
  onTogglePaid,
  onDeleteItem,
}) => {
  const t = translations[currentLang];
  const [totalTargetBudget, setTotalTargetBudget] = useState<number>(1800000);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New item form
  const [category, setCategory] = useState('mandapam');
  const [itemTitle, setItemTitle] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [actualCost, setActualCost] = useState('');
  const [vendorNotes, setVendorNotes] = useState('');

  const totalEstimated = items.reduce((acc, curr) => acc + curr.estimatedCost, 0);
  const totalActual = items.reduce((acc, curr) => acc + curr.actualCost, 0);
  const balanceRemaining = totalTargetBudget - totalActual;
  const percentSpent = Math.min(100, Math.round((totalActual / totalTargetBudget) * 100));

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle.trim()) return;

    const newItem: BudgetItem = {
      id: `b-${Date.now()}`,
      category,
      itemEn: itemTitle.trim(),
      itemTe: itemTitle.trim(),
      estimatedCost: Number(estimatedCost) || 0,
      actualCost: Number(actualCost) || Number(estimatedCost) || 0,
      paid: false,
      vendorNotes: vendorNotes.trim(),
    };

    onAddItem(newItem);
    setIsAddModalOpen(false);
    setItemTitle('');
    setEstimatedCost('');
    setActualCost('');
    setVendorNotes('');
  };

  const handleExportCsv = () => {
    const headers = ['Category', 'Item Description', 'Estimated (INR)', 'Actual (INR)', 'Status', 'Vendor Notes'];
    const rows = items.map((i) => [
      i.category,
      `"${i.itemEn.replace(/"/g, '""')}"`,
      i.estimatedCost,
      i.actualCost,
      i.paid ? 'PAID' : 'PENDING',
      `"${i.vendorNotes.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Telangana-Wedding-Budget-Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="budget" className="py-16 px-4 sm:px-6 lg:px-8 bg-kolam border-b border-amber-200/80">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#781B10]">
              {t.budgetTitle}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-amber-900/80">
              {t.budgetSub}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 bg-white border border-amber-300 hover:bg-amber-50 text-amber-950 text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-700" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-[#781B10] hover:bg-[#991B1B] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.addExpenseBtn}</span>
            </button>
          </div>
        </div>

        {/* Top Summary Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-xs space-y-1">
            <span className="text-xs text-amber-800 font-medium block">
              {t.totalBudget}
            </span>
            <div className="text-xl sm:text-2xl font-display font-bold text-amber-950 font-mono tabular-nums">
              ₹{totalTargetBudget.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-amber-700/80 flex items-center justify-between pt-1">
              <span>Target Ceiling</span>
              <button
                onClick={() => {
                  const val = prompt('Enter new total budget ceiling (INR):', String(totalTargetBudget));
                  if (val && !isNaN(Number(val))) setTotalTargetBudget(Number(val));
                }}
                className="text-[11px] text-[#B45309] underline font-semibold cursor-pointer"
              >
                Edit Target
              </button>
            </div>
          </div>

          <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-xs space-y-1">
            <span className="text-xs text-amber-800 font-medium block">
              {t.totalSpent}
            </span>
            <div className="text-xl sm:text-2xl font-display font-bold text-[#781B10] font-mono tabular-nums">
              ₹{totalActual.toLocaleString('en-IN')}
            </div>
            <div className="w-full bg-amber-100 rounded-full h-1.5 mt-2">
              <div
                className="bg-[#781B10] h-1.5 rounded-full"
                style={{ width: `${percentSpent}%` }}
              />
            </div>
          </div>

          <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-xs space-y-1">
            <span className="text-xs text-amber-800 font-medium block">
              {t.balanceRemaining}
            </span>
            <div
              className={`text-xl sm:text-2xl font-display font-bold font-mono tabular-nums ${
                balanceRemaining >= 0 ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              ₹{balanceRemaining.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-amber-700/80 pt-1">
              {balanceRemaining >= 0 ? 'Healthy surplus remaining' : 'Budget exceeded'}
            </div>
          </div>
        </div>

        {/* Expenses Table */}
        <div className="bg-white border border-amber-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-amber-950">
              <thead className="bg-amber-50/80 border-b border-amber-200 text-amber-900 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Item & Category</th>
                  <th className="py-3.5 px-4 font-mono">Estimated</th>
                  <th className="py-3.5 px-4 font-mono">Actual Cost</th>
                  <th className="py-3.5 px-4">Payment Status</th>
                  <th className="py-3.5 px-4">Vendor Notes</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-semibold text-amber-950 block text-xs sm:text-sm">
                        {currentLang === 'te' ? item.itemTe : item.itemEn}
                      </span>
                      <span className="text-[10px] text-amber-700 font-medium capitalize">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono font-medium text-amber-900">
                      ₹{item.estimatedCost.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-amber-950">
                      ₹{item.actualCost.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => onTogglePaid(item.id)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer transition-colors ${
                          item.paid
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                      >
                        {item.paid ? 'Paid' : 'Pending'}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-[11px] text-amber-800/80 max-w-xs truncate">
                      {item.vendorNotes || '—'}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="p-1 text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                        title="Delete expense"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-amber-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-display font-bold text-[#781B10]">
              Add Wedding Expense
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-amber-950 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg"
                >
                  <option value="mandapam">{t.categoryMandapam}</option>
                  <option value="catering">{t.categoryCatering}</option>
                  <option value="jewelry">{t.categoryJewelry}</option>
                  <option value="photo">{t.categoryPhoto}</option>
                  <option value="music">{t.categoryMusic}</option>
                  <option value="purohit">{t.categoryPurohit}</option>
                  <option value="travel">{t.categoryTravel}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-amber-950 mb-1">
                  Item Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fresh Marigold Stage Entrance Decor"
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-amber-950 mb-1">
                    Estimated (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="50000"
                    value={estimatedCost}
                    onChange={(e) => setEstimatedCost(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-amber-950 mb-1">
                    Actual (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="48000"
                    value={actualCost}
                    onChange={(e) => setActualCost(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-amber-950 mb-1">
                  Vendor Name & Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hyderabad Florist - advance 50% paid"
                  value={vendorNotes}
                  onChange={(e) => setVendorNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-amber-900 hover:bg-amber-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#781B10] text-white font-semibold rounded-lg hover:bg-[#991B1B] cursor-pointer"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
