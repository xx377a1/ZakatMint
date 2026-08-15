import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Language, MetalMarketData, ZakatFormData, ZakatResult } from '../../types/zakat';
import { formatCurrency } from '../../constants/currencies';
import { generateZakatPdf } from '../../utils/pdfGenerator';
import { translations } from '../../translations/translations';
import {
  CheckCircle2,
  XCircle,
  Download,
  Printer,
  Share2,
  RotateCcw,
  Edit2,
  BookmarkPlus,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Calculator,
  HelpCircle
} from 'lucide-react';

interface StepResultProps {
  formData: ZakatFormData;
  result: ZakatResult;
  onStartNew: () => void;
  onEditCalculation: () => void;
  onSaveToHistory: () => void;
  lang: Language;
}

export const StepResult: React.FC<StepResultProps> = ({
  formData,
  result,
  onStartNew,
  onEditCalculation,
  onSaveToHistory,
  lang
}) => {
  const t = translations[lang];
  const [showFormula, setShowFormula] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (result.isAboveNisab && result.estimatedZakat > 0) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Ignore if canvas-confetti environment restricts canvas
      }
    }
  }, [result.isAboveNisab, result.estimatedZakat]);

  const handleDownloadPdf = () => {
    generateZakatPdf(formData, result, lang);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const text = `ZakatMint Summary:\nNet Zakatable Wealth: ${formatCurrency(
      result.breakdown.netZakatableWealth,
      formData.currency
    )}\nEstimated Zakat (2.5%): ${formatCurrency(
      result.estimatedZakat,
      formData.currency
    )}\nCalculated safely on ZakatMint.`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleSave = () => {
    onSaveToHistory();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const b = result.breakdown;

  // Calculate visual bar percentages
  const maxValue = Math.max(b.netZakatableWealth, result.nisabThresholdValue) || 1;
  const wealthPct = Math.min(100, Math.round((b.netZakatableWealth / maxValue) * 100));
  const nisabPct = Math.min(100, Math.round((result.nisabThresholdValue / maxValue) * 100));

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Primary Result Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden print-card">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between gap-4 mb-6 border-b border-emerald-800/80 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-emerald-950 flex items-center justify-center font-bold">
              Z
            </div>
            <span className="font-bold text-amber-400 text-sm tracking-wider uppercase">
              {t.labels.estimatedZakat}
            </span>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-800/90 text-emerald-100 border border-emerald-700">
            Zakat Rate: 2.5%
          </span>
        </div>

        {/* Large Estimated Zakat Amount */}
        <div className="my-4 text-center sm:text-left">
          <div className="text-4xl sm:text-6xl font-extrabold font-serif text-white tracking-tight">
            {formatCurrency(result.estimatedZakat, formData.currency)}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-semibold">
            {result.isAboveNisab ? (
              <span className="px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                {t.labels.aboveNisab}
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-slate-400" />
                {t.labels.belowNisab}
              </span>
            )}

            <span className="text-emerald-200/80">
              {result.isAboveNisab ? t.labels.aboveNisabMsg : t.labels.belowNisabMsg}
            </span>
          </div>
        </div>

        {/* Visual Progress / Comparison Bar */}
        <div className="mt-8 pt-6 border-t border-emerald-800/80 space-y-3">
          <div className="text-xs font-bold text-emerald-200/90 flex justify-between">
            <span>Net Zakatable Wealth vs Nisab Threshold</span>
            <span>Nisab: {formatCurrency(result.nisabThresholdValue, formData.currency)}</span>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[11px] text-emerald-300 mb-1">
                <span>Net Wealth: {formatCurrency(b.netZakatableWealth, formData.currency)}</span>
                <span>{wealthPct}%</span>
              </div>
              <div className="h-3 w-full bg-emerald-950/80 rounded-full overflow-hidden p-0.5 border border-emerald-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${wealthPct}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>
                  Nisab ({result.nisabBasis === 'gold' ? 'Gold 87.48g' : 'Silver 612.36g'})
                </span>
                <span>{nisabPct}%</span>
              </div>
              <div className="h-2 w-full bg-emerald-950/80 rounded-full overflow-hidden p-0.5 border border-emerald-800/60">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: `${nisabPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Numerical Figures Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 print-card">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block">Total Assets</span>
          <span className="text-lg font-bold text-slate-900 font-serif">
            {formatCurrency(b.totalAssets, formData.currency)}
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block">Liabilities</span>
          <span className="text-lg font-bold text-red-700 font-serif">
            - {formatCurrency(b.totalLiabilities, formData.currency)}
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block">Net Wealth</span>
          <span className="text-lg font-bold text-emerald-950 font-serif">
            {formatCurrency(b.netZakatableWealth, formData.currency)}
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block">Nisab Threshold</span>
          <span className="text-lg font-bold text-amber-700 font-serif">
            {formatCurrency(result.nisabThresholdValue, formData.currency)}
          </span>
        </div>
      </div>

      {/* Expandable Calculation Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden no-print">
        <button
          type="button"
          onClick={() => setShowFormula(!showFormula)}
          id="expand-formula-breakdown-btn"
          className="w-full p-4 text-left font-bold text-sm text-slate-800 flex items-center justify-between hover:bg-slate-50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-800" />
            <span>{t.labels.howCalculated}</span>
          </span>
          {showFormula ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
        </button>

        {showFormula && (
          <div className="p-5 border-t border-slate-100 bg-slate-50 text-xs text-slate-700 space-y-3 animate-fadeIn">
            <div className="space-y-1">
              <p className="font-semibold text-slate-900">1. Total Zakatable Assets</p>
              <p className="text-slate-600 font-mono">
                Cash ({formatCurrency(b.cashSubtotal, formData.currency)}) + Gold ({formatCurrency(b.goldSubtotal, formData.currency)}) + Silver ({formatCurrency(b.silverSubtotal, formData.currency)}) + Investments ({formatCurrency(b.investmentsSubtotal, formData.currency)}) + Business ({formatCurrency(b.businessSubtotal, formData.currency)}) + Other ({formatCurrency(b.customSubtotal, formData.currency)}) = {formatCurrency(b.totalAssets, formData.currency)}
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-semibold text-slate-900">2. Net Zakatable Wealth Calculation</p>
              <p className="text-slate-600 font-mono">
                {formatCurrency(b.totalAssets, formData.currency)} − {formatCurrency(b.totalLiabilities, formData.currency)} = {formatCurrency(b.netZakatableWealth, formData.currency)}
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-semibold text-slate-900">3. Nisab Comparison & Rate</p>
              <p className="text-slate-600 font-mono">
                {formatCurrency(b.netZakatableWealth, formData.currency)} {result.isAboveNisab ? '≥' : '<'} {formatCurrency(result.nisabThresholdValue, formData.currency)} ({result.nisabBasis.toUpperCase()} NISAB)
              </p>
              <p className="text-emerald-800 font-semibold font-mono">
                Zakat Due = {formatCurrency(b.netZakatableWealth, formData.currency)} × 2.5% = {formatCurrency(result.estimatedZakat, formData.currency)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadPdf}
            id="result-download-pdf-btn"
            className="px-4 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all active:scale-95"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>{t.labels.downloadPdf}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            id="result-print-btn"
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>{t.labels.printResults}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            id="result-share-btn"
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors"
          >
            <Share2 className="w-4 h-4 text-slate-600" />
            <span>{copied ? 'Copied to Clipboard!' : t.labels.shareSummary}</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            id="result-save-history-btn"
            disabled={saved}
            className={`px-4 py-2.5 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors ${
              saved
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-emerald-100/80 hover:bg-emerald-100 text-emerald-900'
            }`}
          >
            <BookmarkPlus className="w-4 h-4" />
            <span>{saved ? 'Saved to History!' : t.labels.saveToHistory}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onEditCalculation}
            id="result-edit-calc-btn"
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Entries</span>
          </button>

          <button
            type="button"
            onClick={onStartNew}
            id="result-start-new-btn"
            className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span>{t.labels.startNew}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
