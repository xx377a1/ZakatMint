import React from 'react';
import { Language, ZakatFormData } from '../../types/zakat';
import { formatCurrency, getCurrency } from '../../constants/currencies';
import { translations } from '../../translations/translations';
import { Store, ShieldAlert } from 'lucide-react';

interface Step5BusinessProps {
  formData: ZakatFormData;
  updateFormData: (updates: Partial<ZakatFormData>) => void;
  lang: Language;
}

export const Step5Business: React.FC<Step5BusinessProps> = ({
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

  const businessSubtotal =
    (formData.businessCash || 0) +
    (formData.tradingInventory || 0) +
    (formData.goodsForResale || 0) +
    (formData.tradeReceivables || 0) +
    (formData.otherBusinessAssets || 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Subtotal Banner */}
      <div className="bg-emerald-950/5 border border-emerald-900/10 p-5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-800 text-amber-400 rounded-xl">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {t.labels.subtotal}
            </span>
            <span className="text-2xl font-bold text-emerald-950 font-serif">
              {formatCurrency(businessSubtotal, formData.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Business Cash */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            {t.labels.businessCash}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
              {currSymbol}
            </span>
            <input
              type="number"
              min="0"
              step="any"
              id="input-business-cash"
              value={formData.businessCash || ''}
              onChange={(e) => handleChange('businessCash', e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm"
            />
          </div>
        </div>

        {/* Trading Inventory */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            {t.labels.tradingInventory}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
              {currSymbol}
            </span>
            <input
              type="number"
              min="0"
              step="any"
              id="input-trading-inventory"
              value={formData.tradingInventory || ''}
              onChange={(e) => handleChange('tradingInventory', e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm"
            />
          </div>
        </div>

        {/* Goods Held for Resale */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            {t.labels.resaleGoods}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
              {currSymbol}
            </span>
            <input
              type="number"
              min="0"
              step="any"
              id="input-resale-goods"
              value={formData.goodsForResale || ''}
              onChange={(e) => handleChange('goodsForResale', e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm"
            />
          </div>
        </div>

        {/* Trade Receivables */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            {t.labels.tradeReceivables}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
              {currSymbol}
            </span>
            <input
              type="number"
              min="0"
              step="any"
              id="input-trade-receivables"
              value={formData.tradeReceivables || ''}
              onChange={(e) => handleChange('tradeReceivables', e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm"
            />
          </div>
        </div>

        {/* Other Business Assets */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            {t.labels.otherBusinessAssets}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
              {currSymbol}
            </span>
            <input
              type="number"
              min="0"
              step="any"
              id="input-other-business"
              value={formData.otherBusinessAssets || ''}
              onChange={(e) => handleChange('otherBusinessAssets', e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm"
            />
          </div>
        </div>
      </div>

      {/* Fixed Assets Exemption Banner */}
      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-slate-800 space-y-1">
        <p className="font-bold flex items-center gap-1.5 text-emerald-950">
          <ShieldAlert className="w-4 h-4 text-emerald-700" />
          <span>Exemption on Capital & Fixed Assets</span>
        </p>
        <p className="text-slate-700 leading-relaxed">
          Operational business equipment, factory machinery, delivery vehicles, store fixtures, and office buildings used to run the business are <strong>exempt from Zakat</strong>. Only cash, liquid stock, and trade goods intended for resale are included.
        </p>
      </div>
    </div>
  );
};
