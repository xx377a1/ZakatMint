import React from 'react';
import { Language, ZakatFormData } from '../../types/zakat';
import { formatCurrency, getCurrency } from '../../constants/currencies';
import { translations } from '../../translations/translations';
import { Receipt, Info } from 'lucide-react';

interface Step7LiabilitiesProps {
  formData: ZakatFormData;
  updateFormData: (updates: Partial<ZakatFormData>) => void;
  lang: Language;
}

export const Step7Liabilities: React.FC<Step7LiabilitiesProps> = ({
  formData,
  updateFormData,
  lang
}) => {
  const t = translations[lang];
  const currSymbol = getCurrency(formData.currency).symbol;

  const handleChange = (field: keyof ZakatFormData, valStr: string) => {
    const num = parseFloat(valStr);
    updateFormData({ [field]: isNaN(num) || num < 0 ? 0 : num });
  };

  const totalLiabilities =
    (formData.shortTermDebts || 0) +
    (formData.immediateBills || 0) +
    (formData.otherLiabilities || 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Total Liabilities Subtotal */}
      <div className="bg-red-50 border border-red-200 p-5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-600 text-white rounded-xl">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-red-700 uppercase tracking-wider block">
              {t.labels.totalLiabilities}
            </span>
            <span className="text-2xl font-bold text-red-900 font-serif">
              - {formatCurrency(totalLiabilities, formData.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Liabilities Inputs Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Short-Term Debts */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            {t.labels.shortTermDebts}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
              {currSymbol}
            </span>
            <input
              type="number"
              min="0"
              step="any"
              id="input-short-term-debts"
              value={formData.shortTermDebts || ''}
              onChange={(e) => handleChange('shortTermDebts', e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm"
            />
          </div>
        </div>

        {/* Immediate Bills */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            {t.labels.immediateBills}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
              {currSymbol}
            </span>
            <input
              type="number"
              min="0"
              step="any"
              id="input-immediate-bills"
              value={formData.immediateBills || ''}
              onChange={(e) => handleChange('immediateBills', e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm"
            />
          </div>
        </div>

        {/* Other Liabilities */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            {t.labels.otherLiabilities}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
              {currSymbol}
            </span>
            <input
              type="number"
              min="0"
              step="any"
              id="input-other-liabilities"
              value={formData.otherLiabilities || ''}
              onChange={(e) => handleChange('otherLiabilities', e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm"
            />
          </div>
        </div>
      </div>

      {/* Scholarly Guidance Box */}
      <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-xs text-slate-800 space-y-1.5">
        <p className="font-bold flex items-center gap-1.5 text-amber-950">
          <Info className="w-4 h-4 text-amber-700" />
          <span>Short-Term vs Long-Term Debt Deduction Rules</span>
        </p>
        <p className="text-slate-700 leading-relaxed">
          <strong>Immediate/Short-Term Debts:</strong> Debts due immediately or within the current Zakat year (e.g. current credit card balance, overdue rent, vendor invoices due) are deducted in full.
        </p>
        <p className="text-slate-700 leading-relaxed">
          <strong>Long-Term Loans (Mortgages/Student Loans):</strong> Contemporary scholarly bodies (such as AAOIFI and the Fiqh Council) recommend deducting only the upcoming 12-month installment payments rather than the entire multi-decade principal balance.
        </p>
      </div>
    </div>
  );
};
