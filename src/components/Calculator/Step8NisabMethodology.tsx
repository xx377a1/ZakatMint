import React from 'react';
import { Language, MetalMarketData, ZakatFormData } from '../../types/zakat';
import { formatCurrency } from '../../constants/currencies';
import { GOLD_NISAB_GRAMS, SILVER_NISAB_GRAMS } from '../../constants/metalDefaults';
import { translations } from '../../translations/translations';
import { Sparkles, Scale, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

interface Step8NisabMethodologyProps {
  formData: ZakatFormData;
  updateFormData: (updates: Partial<ZakatFormData>) => void;
  metalData: MetalMarketData;
  lang: Language;
}

export const Step8NisabMethodology: React.FC<Step8NisabMethodologyProps> = ({
  formData,
  updateFormData,
  metalData,
  lang
}) => {
  const t = translations[lang];

  const goldNisabValue = GOLD_NISAB_GRAMS * metalData.goldPricePerGram;
  const silverNisabValue = SILVER_NISAB_GRAMS * metalData.silverPricePerGram;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Nisab Selector Section */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">
          {lang === 'ur' ? 'نصاب کی بنیاد منتخب کریں' : 'Choose Your Nisab Basis'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Gold Nisab Option */}
          <button
            type="button"
            onClick={() => updateFormData({ nisabBasis: 'gold' })}
            id="nisab-select-gold"
            className={`p-5 rounded-2xl border text-left transition-all relative ${
              formData.nisabBasis === 'gold'
                ? 'border-amber-500 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white ring-2 ring-amber-500/30 shadow-md'
                : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50'
            }`}
          >
            {formData.nisabBasis === 'gold' && (
              <CheckCircle2 className="w-5 h-5 text-amber-600 absolute top-4 right-4" />
            )}
            <div className="flex items-center gap-2 text-amber-700 font-bold text-base mb-1">
              <Sparkles className="w-5 h-5" />
              <span>{t.labels.goldNisab}</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              87.48 grams of 24K Gold
            </p>
            <div className="text-2xl font-bold text-slate-900 font-serif">
              {formatCurrency(goldNisabValue, formData.currency)}
            </div>
            <p className="text-[11px] text-amber-800 font-medium mt-2 bg-amber-100/60 p-2 rounded-lg inline-block">
              Recommended if wealth is primarily in gold or standard currencies.
            </p>
          </button>

          {/* Silver Nisab Option */}
          <button
            type="button"
            onClick={() => updateFormData({ nisabBasis: 'silver' })}
            id="nisab-select-silver"
            className={`p-5 rounded-2xl border text-left transition-all relative ${
              formData.nisabBasis === 'silver'
                ? 'border-emerald-700 bg-emerald-950/5 ring-2 ring-emerald-700/30 shadow-md'
                : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
            }`}
          >
            {formData.nisabBasis === 'silver' && (
              <CheckCircle2 className="w-5 h-5 text-emerald-800 absolute top-4 right-4" />
            )}
            <div className="flex items-center gap-2 text-slate-800 font-bold text-base mb-1">
              <Scale className="w-5 h-5 text-emerald-700" />
              <span>{t.labels.silverNisab}</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              612.36 grams of Pure Silver
            </p>
            <div className="text-2xl font-bold text-slate-900 font-serif">
              {formatCurrency(silverNisabValue, formData.currency)}
            </div>
            <p className="text-[11px] text-emerald-900 font-medium mt-2 bg-emerald-100/60 p-2 rounded-lg inline-block">
              More beneficial for the poor as it enables broader Zakat distribution.
            </p>
          </button>

        </div>
      </div>

      {/* Methodology Settings */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide">
          {t.labels.methodology}
        </label>
        <select
          value={formData.methodology}
          onChange={(e) => updateFormData({ methodology: e.target.value as any })}
          id="select-methodology"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-white"
        >
          <option value="standard">Standard Global Majority Consensus (Recommended)</option>
          <option value="hanafi">Hanafi School Orientation (Includes all gold/silver jewellery)</option>
          <option value="custom">Custom School Settings</option>
        </select>
        <p className="text-xs text-slate-500">
          Different Islamic schools and scholars may differ on certain assets, debts, and Nisab approaches.
        </p>
      </div>

      {/* Hawl Completion Question */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          {t.labels.hawlQuestion}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => updateFormData({ hawlStatus: 'yes' })}
            id="hawl-status-yes"
            className={`p-3.5 rounded-xl border text-xs font-bold transition-all text-center ${
              formData.hawlStatus === 'yes'
                ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {t.labels.yes}
          </button>

          <button
            type="button"
            onClick={() => updateFormData({ hawlStatus: 'no' })}
            id="hawl-status-no"
            className={`p-3.5 rounded-xl border text-xs font-bold transition-all text-center ${
              formData.hawlStatus === 'no'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {t.labels.no}
          </button>

          <button
            type="button"
            onClick={() => updateFormData({ hawlStatus: 'not_sure' })}
            id="hawl-status-not-sure"
            className={`p-3.5 rounded-xl border text-xs font-bold transition-all text-center ${
              formData.hawlStatus === 'not_sure'
                ? 'bg-slate-800 text-white border-slate-800 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {t.labels.notSure}
          </button>
        </div>

        {formData.hawlStatus === 'no' && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{t.labels.hawlNoWarning}</span>
          </div>
        )}

        {formData.hawlStatus === 'not_sure' && (
          <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-800 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-600 shrink-0" />
            <span>{t.labels.hawlNotSureWarning}</span>
          </div>
        )}
      </div>
    </div>
  );
};
