import React from 'react';
import { Language, ZakatFormData } from '../../types/zakat';
import { formatCurrency, getCurrency } from '../../constants/currencies';
import { translations } from '../../translations/translations';
import { Wallet, Landmark, HandCoins, Info } from 'lucide-react';

interface Step2CashProps {
  formData: ZakatFormData;
  updateFormData: (updates: Partial<ZakatFormData>) => void;
  lang: Language;
}

export const Step2Cash: React.FC<Step2CashProps> = ({ formData, updateFormData, lang }) => {
  const t = translations[lang];
  const currSymbol = getCurrency(formData.currency).symbol;

  const handleChange = (field: keyof ZakatFormData, valueStr: string) => {
    const num = parseFloat(valueStr);
    updateFormData({ [field]: isNaN(num) || num < 0 ? 0 : num });
  };

  const cashSubtotal =
    (formData.cashHome || 0) +
    (formData.cashBankCurrent || 0) +
    (formData.cashBankSavings || 0) +
    (formData.cashBankOther || 0) +
    (formData.loanReceivable || 0) +
    (formData.moneyReceivable || 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Subtotal Banner */}
      <div className="bg-emerald-950/5 border border-emerald-900/10 p-5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-800 text-amber-400 rounded-xl">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {t.labels.subtotal}
            </span>
            <span className="text-2xl font-bold text-emerald-950 font-serif">
              {formatCurrency(cashSubtotal, formData.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Card 1: Cash on Hand */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-emerald-950 font-bold border-b border-slate-100 pb-3">
          <Wallet className="w-5 h-5 text-emerald-700" />
          <span>{lang === 'ur' ? 'نقد رقم (گھر پر یا ساتھ)' : 'Cash & Physical Currency'}</span>
        </div>

        <div>
          <label className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
            <span>{t.labels.cashAtHome}</span>
            <span className="text-slate-400 font-normal">Physical notes & wallet</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
              {currSymbol}
            </span>
            <input
              type="number"
              min="0"
              step="any"
              id="input-cash-home"
              value={formData.cashHome || ''}
              onChange={(e) => handleChange('cashHome', e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm transition-all"
            />
          </div>
        </div>
      </div>

      {/* Card 2: Bank & Savings */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-emerald-950 font-bold border-b border-slate-100 pb-3">
          <Landmark className="w-5 h-5 text-emerald-700" />
          <span>{lang === 'ur' ? 'بینک اکاؤنٹس اور والٹ' : 'Bank & Savings Accounts'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.labels.cashAtBankCurrent}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
                {currSymbol}
              </span>
              <input
                type="number"
                min="0"
                step="any"
                id="input-cash-bank-current"
                value={formData.cashBankCurrent || ''}
                onChange={(e) => handleChange('cashBankCurrent', e.target.value)}
                placeholder="0"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.labels.cashAtBankSavings}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
                {currSymbol}
              </span>
              <input
                type="number"
                min="0"
                step="any"
                id="input-cash-bank-savings"
                value={formData.cashBankSavings || ''}
                onChange={(e) => handleChange('cashBankSavings', e.target.value)}
                placeholder="0"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm transition-all"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t.labels.cashAtBankOther}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
              {currSymbol}
            </span>
            <input
              type="number"
              min="0"
              step="any"
              id="input-cash-bank-other"
              value={formData.cashBankOther || ''}
              onChange={(e) => handleChange('cashBankOther', e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm transition-all"
            />
          </div>
        </div>
      </div>

      {/* Card 3: Receivables & Loans */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-emerald-950 font-bold border-b border-slate-100 pb-3">
          <HandCoins className="w-5 h-5 text-emerald-700" />
          <span>{lang === 'ur' ? 'قابلِ وصول رقم اور قرضے' : 'Loans & Money Owed to You'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.labels.recoverableLoans}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
                {currSymbol}
              </span>
              <input
                type="number"
                min="0"
                step="any"
                id="input-loan-receivable"
                value={formData.loanReceivable || ''}
                onChange={(e) => handleChange('loanReceivable', e.target.value)}
                placeholder="0"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.labels.moneyReceivable}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-semibold pointer-events-none">
                {currSymbol}
              </span>
              <input
                type="number"
                min="0"
                step="any"
                id="input-money-receivable"
                value={formData.moneyReceivable || ''}
                onChange={(e) => handleChange('moneyReceivable', e.target.value)}
                placeholder="0"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-slate-900 font-semibold text-sm transition-all"
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
          <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <span>Include loans you expect to recover in the near future. Bad or unrecoverable debts are generally excluded.</span>
        </p>
      </div>
    </div>
  );
};
