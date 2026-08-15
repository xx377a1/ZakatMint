import React from 'react';
import { Language, ZakatFormData } from '../../types/zakat';
import { formatCurrency, getCurrency } from '../../constants/currencies';
import { translations } from '../../translations/translations';
import { TrendingUp, Info } from 'lucide-react';

interface Step4InvestmentsProps {
  formData: ZakatFormData;
  updateFormData: (updates: Partial<ZakatFormData>) => void;
  lang: Language;
}

export const Step4Investments: React.FC<Step4InvestmentsProps> = ({
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

  const investmentsSubtotal =
    (formData.shares || 0) +
    (formData.investmentFunds || 0) +
    (formData.crypto || 0) +
    (formData.otherInvestments || 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Subtotal Banner */}
      <div className="bg-emerald-950/5 border border-emerald-900/10 p-5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-800 text-amber-400 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {t.labels.subtotal}
            </span>
            <span className="text-2xl font-bold text-emerald-950 font-serif">
              {formatCurrency(investmentsSubtotal, formData.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Shares & Stocks */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            {t.labels.shares}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
              {currSymbol}
            </span>
            <input
              type="number"
              min="0"
              step="any"
              id="input-shares"
              value={formData.shares || ''}
              onChange={(e) => handleChange('shares', e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm"
            />
          </div>
        </div>

        {/* Investment Funds */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            {t.labels.investmentFunds}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
              {currSymbol}
            </span>
            <input
              type="number"
              min="0"
              step="any"
              id="input-investment-funds"
              value={formData.investmentFunds || ''}
              onChange={(e) => handleChange('investmentFunds', e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm"
            />
          </div>
        </div>

        {/* Crypto */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            {t.labels.crypto}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
              {currSymbol}
            </span>
            <input
              type="number"
              min="0"
              step="any"
              id="input-crypto"
              value={formData.crypto || ''}
              onChange={(e) => handleChange('crypto', e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm"
            />
          </div>
        </div>

        {/* Other Investments */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            {t.labels.otherInvestments}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
              {currSymbol}
            </span>
            <input
              type="number"
              min="0"
              step="any"
              id="input-other-investments"
              value={formData.otherInvestments || ''}
              onChange={(e) => handleChange('otherInvestments', e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm"
            />
          </div>
        </div>
      </div>

      {/* Scholarly Guidance Box */}
      <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-xs text-slate-800 space-y-1.5">
        <p className="font-bold flex items-center gap-1.5 text-amber-900">
          <Info className="w-4 h-4 text-amber-700" />
          <span>Investment Valuation Guidance</span>
        </p>
        <p className="text-slate-700 leading-relaxed">
          Investment treatment depends on intent:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1 pl-1">
          <li><strong>Active Trading / Day Trading:</strong> Zakat is calculated on 100% of the current market value.</li>
          <li><strong>Long-term Holding for Dividends:</strong> Zakat is calculated on the company&apos;s liquid/zakatable assets (or accumulated dividends), not fixed equipment or property. Many scholars estimate 20% to 30% of market value if detailed company asset breakdowns are unavailable.</li>
        </ul>
      </div>
    </div>
  );
};
