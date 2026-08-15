import React from 'react';
import { CurrencyCode, Language, MetalMarketData, ZakatFormData } from '../../types/zakat';
import { SUPPORTED_CURRENCIES, formatCurrency } from '../../constants/currencies';
import { translations } from '../../translations/translations';
import { Coins, RefreshCw, CheckCircle2, ShieldCheck, Info } from 'lucide-react';

interface Step1CurrencyProps {
  formData: ZakatFormData;
  updateFormData: (updates: Partial<ZakatFormData>) => void;
  metalData: MetalMarketData;
  onRefreshMetalPrices: (curr?: any) => void;
  lang: Language;
}

export const Step1Currency: React.FC<Step1CurrencyProps> = ({
  formData,
  updateFormData,
  metalData,
  onRefreshMetalPrices,
  lang
}) => {
  const t = translations[lang];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Currency Selection Grid */}
      <div>
        <label className="block text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">
          {t.labels.currency}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SUPPORTED_CURRENCIES.map((curr) => {
            const isSelected = formData.currency === curr.code;
            return (
              <button
                key={curr.code}
                type="button"
                onClick={() => updateFormData({ currency: curr.code as CurrencyCode })}
                id={`currency-select-${curr.code}`}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 relative ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-950/5 ring-2 ring-emerald-700/30 shadow-xs'
                    : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                }`}
              >
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-800 absolute top-3 right-3" />
                )}
                <span className="block text-2xl font-bold text-emerald-950 font-serif">
                  {curr.symbol}
                </span>
                <span className="block font-bold text-slate-800 text-sm mt-1">
                  {curr.code}
                </span>
                <span className="block text-xs text-slate-500 font-medium truncate">
                  {curr.name.split('(')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Metal Reference Rates Card */}
      <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-800/80 text-amber-300 mb-2 border border-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Coins className="w-3.5 h-3.5" />
              {metalData.isLive ? 'Real-Time Spot Market Price' : t.labels.useMarketPrices}
            </span>
            <h3 className="text-xl font-bold text-white font-serif">
              {lang === 'ur' ? 'سونے اور چاندی کے مارکیٹ نرخ' : 'Metal Benchmark Rates'}
            </h3>
            <p className="text-xs text-emerald-200/80 mt-1">
              {t.labels.livePricesSource}: <span className="font-semibold text-white">{metalData.source}</span> ({metalData.lastUpdated})
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRefreshMetalPrices(formData.currency)}
            id="refresh-metal-prices-btn"
            className="px-4 py-2 bg-emerald-800/80 hover:bg-emerald-800 text-emerald-100 rounded-xl text-xs font-bold border border-emerald-700 flex items-center gap-2 transition-all active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'ur' ? 'نرخ اپ ڈیٹ کریں' : 'Refresh Rates'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-emerald-900/60 border border-emerald-800/80 p-4 rounded-2xl">
            <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider block">
              24K Pure Gold Price
            </span>
            <div className="text-2xl font-bold text-white font-serif mt-1">
              {formatCurrency(metalData.goldPricePerGram, formData.currency)}
              <span className="text-xs text-emerald-300 font-normal"> / gram</span>
            </div>
          </div>

          <div className="bg-emerald-900/60 border border-emerald-800/80 p-4 rounded-2xl">
            <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
              Pure Silver Price
            </span>
            <div className="text-2xl font-bold text-white font-serif mt-1">
              {formatCurrency(metalData.silverPricePerGram, formData.currency)}
              <span className="text-xs text-emerald-300 font-normal"> / gram</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-emerald-800/60 flex items-center gap-2 text-xs text-emerald-200/90">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            {lang === 'ur'
              ? 'آپ اگلے مرحلے میں اپنی مرضی کے مطابق سونے یا چاندی کے نرخوں کو خود بھی تبدیل کر سکتے ہیں۔'
              : 'You can adjust or override these metal rates directly in Step 3 if needed.'}
          </span>
        </div>
      </div>
    </div>
  );
};
