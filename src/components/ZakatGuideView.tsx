import React, { useState } from 'react';
import { Language, PageView } from '../types/zakat';
import { translations } from '../translations/translations';
import { BookOpen, Scale, Wallet, Sparkles, TrendingUp, Store, Receipt, Users, CheckCircle2 } from 'lucide-react';

interface ZakatGuideViewProps {
  onNavigate: (view: PageView) => void;
  lang: Language;
}

export const ZakatGuideView: React.FC<ZakatGuideViewProps> = ({ onNavigate, lang }) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'basics' | 'metals' | 'investments' | 'business' | 'debts' | 'recipients'>('basics');

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-bold text-xs rounded-full uppercase tracking-wider inline-block">
          Scholarly Reference Guide
        </span>
        <h1 className="text-4xl font-extrabold text-emerald-950 font-serif">
          Comprehensive Zakat Guide
        </h1>
        <p className="text-slate-600 text-base">
          Detailed explanations on Zakatable assets, Nisab benchmarks, Hawl rules, and eligible recipients based on Islamic jurisprudence.
        </p>
      </div>

      {/* Guide Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
        {[
          { id: 'basics', label: 'Fundamentals & Nisab', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'metals', label: 'Gold, Silver & Jewellery', icon: <Sparkles className="w-4 h-4" /> },
          { id: 'investments', label: 'Investments & Crypto', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'business', label: 'Business & Trade Assets', icon: <Store className="w-4 h-4" /> },
          { id: 'debts', label: 'Debts & Deductions', icon: <Receipt className="w-4 h-4" /> },
          { id: 'recipients', label: '8 Eligible Recipients', icon: <Users className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        
        {activeTab === 'basics' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-emerald-950 font-serif border-b pb-3">
              1. Zakat Fundamentals & Nisab
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm">
              Zakat is an obligatory form of worship (Ibadah) and social justice in Islam, imposed on specific types of wealth held above a minimum threshold (Nisab) for one full Hijri lunar year (Hawl).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200 space-y-2">
                <h3 className="font-bold text-emerald-900 text-base">Gold Nisab Benchmark</h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Defined historically as 20 Mithqals, equivalent to <strong>87.48 grams of 24K pure gold</strong> (or 7.5 Tolas). If wealth is primarily maintained in gold bullion, this benchmark is applied.
                </p>
              </div>

              <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200 space-y-2">
                <h3 className="font-bold text-emerald-900 text-base">Silver Nisab Benchmark</h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Defined historically as 200 Dirhams, equivalent to <strong>612.36 grams of pure silver</strong> (or 52.5 Tolas). Because silver market value is lower, using Silver Nisab establishes a lower threshold, benefiting more poor recipients.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metals' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-emerald-950 font-serif border-b pb-3">
              2. Zakat on Gold, Silver & Personal Jewellery
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm">
              All raw gold, gold coins, silver bullion, and silver utensils are 100% subject to Zakat if total Nisab is met.
            </p>

            <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-3">
              <h3 className="font-bold text-amber-950 text-base">Scholarly Opinions on Personal-Use Jewellery</h3>
              <div className="space-y-2 text-xs text-slate-800">
                <p>
                  <strong>Hanafi School:</strong> All gold and silver jewellery (whether worn regularly or stored) is subject to 2.5% Zakat if total wealth reaches Nisab.
                </p>
                <p>
                  <strong>Shafi&apos;i, Maliki, and Hanbali Schools:</strong> Reasonable personal-use non-extravagant jewellery worn by women is exempt from Zakat. Stored or investment jewellery remains zakatable.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'investments' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-emerald-950 font-serif border-b pb-3">
              3. Zakat on Stocks, Funds & Digital Crypto
            </h2>
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Active Trading / Short-Term Speculation</h3>
                <p>Shares bought with the intention of reselling for short-term capital gains are treated as trade goods. Zakat is due on 100% of their current total market value at 2.5%.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Long-Term Dividend Portfolios</h3>
                <p>For shares held for long-term dividend yield, Zakat is calculated on the underlying liquid/zakatable assets of the company (cash + inventory + receivables). If exact company balance sheets are unknown, many contemporary scholars estimate 20% to 30% of total market cap value as zakatable base.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'business' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-emerald-950 font-serif border-b pb-3">
              4. Zakat on Business Assets & Trade Inventory
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm">
              Zakat applies to trade inventory (goods purchased or manufactured for resale) at wholesale market value on your Zakat due date.
            </p>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900">
              <strong>Fixed Capital Exemption:</strong> Office furniture, computers, manufacturing machinery, company delivery vehicles, and business real estate properties used for operations are completely exempt from Zakat.
            </div>
          </div>
        )}

        {activeTab === 'debts' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-emerald-950 font-serif border-b pb-3">
              5. Deducting Debts & Financial Obligations
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm">
              Debts due immediately or within the current lunar year are deductible from gross assets.
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
              <p><strong>Deductible:</strong> Outstanding bills, supplier invoices, short-term personal loans, upcoming 12-month installments of long-term loans.</p>
              <p><strong>Non-Deductible:</strong> Entire principal amount of 30-year home mortgages or long-term multi-decade debt that is not currently due.</p>
            </div>
          </div>
        )}

        {activeTab === 'recipients' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-emerald-950 font-serif border-b pb-3">
              6. The 8 Quranic Categories of Zakat Recipients (Asnaf)
            </h2>
            <p className="text-xs text-slate-600 mb-4">
              As specified in the Holy Quran (Surah At-Tawbah 9:60), Zakat distribution is restricted exclusively to eight eligible categories:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-800">
              {[
                { name: '1. Al-Fuqara (The Poor)', desc: 'Those who possess no wealth or possess wealth below Nisab.' },
                { name: '2. Al-Masakin (The Needy)', desc: 'Those in extreme hardship who cannot meet basic daily survival needs.' },
                { name: '3. Al-Amilina Aleyha (Zakat Collectors)', desc: 'Authorized administrators appointed to collect and distribute Zakat.' },
                { name: '4. Al-Muallafatu Qulubuhum (Reconciling Hearts)', desc: 'New Muslims or those whose hearts are being inclined toward Islam.' },
                { name: '5. Fir-Riqab (Freeing Slaves/Captives)', desc: 'Historically for freeing captives or those in bondage.' },
                { name: '6. Al-Gharimin (The Debt-Ridden)', desc: 'Those overburdened with legitimate debt they cannot repay.' },
                { name: '7. Fi Sabilillah (In the Cause of Allah)', desc: 'Those striving in defense or propagation of Islamic cause.' },
                { name: '8. Ibn Al-Sabil (The Stranded Traveler)', desc: 'Travelers cut off from funds during a journey.' }
              ].map((item) => (
                <div key={item.name} className="p-4 bg-emerald-950/5 rounded-2xl border border-emerald-900/10">
                  <span className="font-bold text-emerald-900 block text-sm mb-1">{item.name}</span>
                  <span className="text-slate-600">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
