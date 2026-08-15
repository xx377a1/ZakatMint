import React from 'react';
import { GoldPurity, Language, MetalMarketData, WeightUnit, ZakatFormData } from '../../types/zakat';
import { formatCurrency } from '../../constants/currencies';
import { calculateGoldValue, calculateSilverValue } from '../../utils/zakatEngine';
import { translations } from '../../translations/translations';
import { Coins, Sparkles, Scale, Info } from 'lucide-react';

interface Step3GoldSilverProps {
  formData: ZakatFormData;
  updateFormData: (updates: Partial<ZakatFormData>) => void;
  metalData: MetalMarketData;
  lang: Language;
}

export const Step3GoldSilver: React.FC<Step3GoldSilverProps> = ({
  formData,
  updateFormData,
  metalData,
  lang
}) => {
  const t = translations[lang];

  const goldVal = calculateGoldValue(formData.gold, metalData.goldPricePerGram);
  const silverVal = calculateSilverValue(formData.silver, metalData.silverPricePerGram);
  const totalPreciousMetals = goldVal + silverVal;

  const updateGold = (field: string, value: any) => {
    updateFormData({
      gold: {
        ...formData.gold,
        [field]: value
      }
    });
  };

  const updateSilver = (field: string, value: any) => {
    updateFormData({
      silver: {
        ...formData.silver,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Metals Total Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-emerald-950/5 border border-amber-500/30 p-5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500 text-emerald-950 rounded-xl shadow-xs">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {lang === 'ur' ? 'سونا اور چاندی کی کل مالیت' : 'Metals Total Value'}
            </span>
            <span className="text-2xl font-bold text-emerald-950 font-serif">
              {formatCurrency(totalPreciousMetals, formData.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Gold Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-base">
            <Sparkles className="w-5 h-5" />
            <span>{t.labels.gold}</span>
          </div>
          <span className="text-sm font-bold text-emerald-900 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200">
            {formatCurrency(goldVal, formData.currency)}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Weight Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.labels.weight}
            </label>
            <input
              type="number"
              min="0"
              step="any"
              id="input-gold-weight"
              value={formData.gold.weight || ''}
              onChange={(e) => updateGold('weight', parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm"
            />
          </div>

          {/* Unit Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.labels.unit}
            </label>
            <select
              value={formData.gold.unit}
              onChange={(e) => updateGold('unit', e.target.value as WeightUnit)}
              id="select-gold-unit"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm bg-white"
            >
              <option value="grams">{t.labels.grams}</option>
              <option value="tolas">{t.labels.tolas}</option>
              <option value="ounces">{t.labels.ounces}</option>
            </select>
          </div>

          {/* Purity Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.labels.purity}
            </label>
            <select
              value={formData.gold.purity}
              onChange={(e) => updateGold('purity', e.target.value as GoldPurity)}
              id="select-gold-purity"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm bg-white"
            >
              <option value="24K">24K (Pure - 99.9%)</option>
              <option value="22K">22K (Jewellery - 91.7%)</option>
              <option value="21K">21K (Jewellery - 87.5%)</option>
              <option value="18K">18K (Jewellery - 75.0%)</option>
              <option value="custom">Custom Purity %</option>
            </select>
          </div>
        </div>

        {/* Custom Purity % Input if custom selected */}
        {formData.gold.purity === 'custom' && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Custom Purity Percentage (1 - 100%)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={formData.gold.customPurityPct || 100}
              onChange={(e) => updateGold('customPurityPct', parseFloat(e.target.value) || 100)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
            />
          </div>
        )}

        {/* Custom Price Override */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">
            {t.labels.manualPricePrompt} (Optional)
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={formData.gold.manualPricePerGram || ''}
            onChange={(e) => updateGold('manualPricePerGram', parseFloat(e.target.value) || 0)}
            placeholder={`Default: ${metalData.goldPricePerGram} / gram`}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700"
          />
        </div>
      </div>

      {/* Silver Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-slate-700 font-bold text-base">
            <Scale className="w-5 h-5 text-slate-500" />
            <span>{t.labels.silver}</span>
          </div>
          <span className="text-sm font-bold text-emerald-900 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {formatCurrency(silverVal, formData.currency)}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.labels.weight}
            </label>
            <input
              type="number"
              min="0"
              step="any"
              id="input-silver-weight"
              value={formData.silver.weight || ''}
              onChange={(e) => updateSilver('weight', parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.labels.unit}
            </label>
            <select
              value={formData.silver.unit}
              onChange={(e) => updateSilver('unit', e.target.value as WeightUnit)}
              id="select-silver-unit"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm bg-white"
            >
              <option value="grams">{t.labels.grams}</option>
              <option value="tolas">{t.labels.tolas}</option>
              <option value="ounces">{t.labels.ounces}</option>
            </select>
          </div>
        </div>

        {/* Custom Silver Price Override */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">
            {t.labels.manualPricePrompt} (Optional)
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={formData.silver.manualPricePerGram || ''}
            onChange={(e) => updateSilver('manualPricePerGram', parseFloat(e.target.value) || 0)}
            placeholder={`Default: ${metalData.silverPricePerGram} / gram`}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700"
          />
        </div>
      </div>

      {/* Scholarly Note on Personal Jewellery */}
      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-950 space-y-1">
        <p className="font-bold flex items-center gap-1.5 text-emerald-900">
          <Info className="w-4 h-4 text-emerald-700" />
          <span>Note on Gold & Silver Jewellery Treatment</span>
        </p>
        <p className="text-slate-700 leading-relaxed">
          Scholarship differs regarding personal-use gold jewellery. According to the Hanafi school, all gold and silver above Nisab is zakatable regardless of purpose. Other schools (Shafi&apos;i, Maliki, Hanbali) exempt reasonable personal-use non-extravagant jewellery. You may include or exclude items in accordance with your chosen methodology.
        </p>
      </div>
    </div>
  );
};
