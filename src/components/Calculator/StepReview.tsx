import React from 'react';
import { Language, MetalMarketData, ZakatFormData } from '../../types/zakat';
import { formatCurrency } from '../../constants/currencies';
import { calculateAssetBreakdown } from '../../utils/zakatEngine';
import { translations } from '../../translations/translations';
import { Edit2, ShieldCheck, ArrowRight, CheckCircle, Calculator } from 'lucide-react';

interface StepReviewProps {
  formData: ZakatFormData;
  metalData: MetalMarketData;
  onJumpToStep: (step: number) => void;
  onCalculate: () => void;
  lang: Language;
}

export const StepReview: React.FC<StepReviewProps> = ({
  formData,
  metalData,
  onJumpToStep,
  onCalculate,
  lang
}) => {
  const t = translations[lang];

  const breakdown = calculateAssetBreakdown(
    formData,
    metalData.goldPricePerGram,
    metalData.silverPricePerGram
  );

  const sections = [
    { title: 'Cash & Savings', subtotal: breakdown.cashSubtotal, step: 2 },
    { title: 'Gold Holdings', subtotal: breakdown.goldSubtotal, step: 3 },
    { title: 'Silver Holdings', subtotal: breakdown.silverSubtotal, step: 3 },
    { title: 'Shares & Investments', subtotal: breakdown.investmentsSubtotal, step: 4 },
    { title: 'Business Assets', subtotal: breakdown.businessSubtotal, step: 5 },
    { title: 'Custom Assets', subtotal: breakdown.customSubtotal, step: 6 }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Assets Summary List */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
            {t.labels.totalAssets}
          </h3>
          <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 overflow-hidden">
            {sections.map((sec) => (
              <div
                key={sec.title}
                className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div>
                  <span className="font-semibold text-slate-800 text-sm">{sec.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-emerald-950 text-sm font-serif">
                    {formatCurrency(sec.subtotal, formData.currency)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onJumpToStep(sec.step)}
                    className="p-1.5 text-slate-400 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
                    title={t.labels.edit}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 p-4 bg-emerald-950/5 rounded-2xl flex items-center justify-between font-bold text-slate-900 text-base">
            <span>{t.labels.totalAssets}</span>
            <span className="font-serif text-emerald-950 text-xl">
              {formatCurrency(breakdown.totalAssets, formData.currency)}
            </span>
          </div>
        </div>

        {/* Liabilities */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-red-800 uppercase tracking-wider">
              {t.labels.totalLiabilities}
            </h3>
            <button
              type="button"
              onClick={() => onJumpToStep(7)}
              className="text-xs text-red-700 hover:underline flex items-center gap-1 font-semibold"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{t.labels.edit}</span>
            </button>
          </div>
          <div className="p-4 bg-red-50/80 border border-red-200 rounded-2xl flex items-center justify-between font-bold text-red-900 text-base">
            <span>Deductible Debts & Bills</span>
            <span className="font-serif text-xl">
              - {formatCurrency(breakdown.totalLiabilities, formData.currency)}
            </span>
          </div>
        </div>

        {/* Net Wealth */}
        <div className="p-5 bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-2xl flex items-center justify-between shadow-md">
          <div>
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
              {t.labels.netWealth}
            </span>
            <span className="text-xs text-emerald-200/80">
              (Total Assets − Eligible Liabilities)
            </span>
          </div>
          <span className="text-2xl font-bold font-serif text-white">
            {formatCurrency(breakdown.netZakatableWealth, formData.currency)}
          </span>
        </div>

        {/* Nisab Basis Summary */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs text-slate-700">
          <div>
            <span className="font-bold text-slate-900 block">Selected Nisab Method:</span>
            <span>
              {formData.nisabBasis === 'gold'
                ? 'Gold Nisab (87.48g 24K Gold)'
                : 'Silver Nisab (612.36g Pure Silver)'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(8)}
            className="text-xs text-emerald-800 font-bold hover:underline flex items-center gap-1"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Change</span>
          </button>
        </div>

      </div>

      {/* Calculate Primary CTA */}
      <button
        type="button"
        onClick={onCalculate}
        id="review-calculate-now-btn"
        className="w-full py-4 bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 hover:to-emerald-950 text-white font-extrabold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 active:scale-98"
      >
        <Calculator className="w-6 h-6 text-amber-400" />
        <span>{t.labels.calculateBtn}</span>
      </button>
    </div>
  );
};
