import React from 'react';
import { Language, PageView } from '../types/zakat';
import { translations } from '../translations/translations';
import { Calculator, ArrowRight, ShieldCheck, Scale, Coins, Check } from 'lucide-react';

interface HowItWorksViewProps {
  onNavigate: (view: PageView) => void;
  lang: Language;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onNavigate, lang }) => {
  const t = translations[lang];

  const steps = [
    {
      num: '01',
      title: lang === 'ur' ? 'اثاثہ جات درج کریں' : 'Step 1: Gather & Enter Assets',
      desc: lang === 'ur'
        ? 'اپنے تمام زکوٰۃ کے قابل اثاثے جیسے نقد رقم، بینک ڈیپازٹ، سونا، چاندی، حصص اور تجارتی مال منتخب کردہ کرنسی میں درج کریں۔'
        : 'Input all your eligible wealth including cash on hand, bank account balances, physical gold & silver, stocks, mutual funds, and merchandise held for trade.',
      tip: 'Personal-use equipment, primary home, and vehicles are exempt.'
    },
    {
      num: '02',
      title: lang === 'ur' ? 'قرضے اور کٹوتیاں منہا کریں' : 'Step 2: Deduct Short-Term Liabilities',
      desc: lang === 'ur'
        ? 'فوری واجب الادا قرضے، زائد الميعاد بل اور اگلے ۱۲ ماہ کے اقساط کو منہا کریں۔'
        : 'Deduct debts and bills currently due or scheduled within the immediate lunar year.',
      tip: 'Long-term principal balances on multi-year mortgages are generally excluded.'
    },
    {
      num: '03',
      title: lang === 'ur' ? 'نصاب کا انتخاب کریں' : 'Step 3: Select Nisab Benchmark',
      desc: lang === 'ur'
        ? 'سونے کے نصاب (۸۷.۴۸ گرام) یا چاندی کے نصاب (۶۱۲.۳۶ گرام) کا انتخاب کریں۔'
        : 'Choose between Gold Nisab (87.48g 24K) or Silver Nisab (612.36g pure silver) based on current live or custom benchmark rates.',
      tip: 'Silver Nisab is lower and generally recommended for broader charity benefit.'
    },
    {
      num: '04',
      title: lang === 'ur' ? 'حساب کی تصدیق کریں' : 'Step 4: Automatic 2.5% Rate Calculation',
      desc: lang === 'ur'
        ? 'اگر آپ کا خالص قابلِ زکوٰۃ مال نصاب کی حد کو پہنچ جائے تو اس پر ۲.۵ فیصد زکوٰۃ خود بخود لگائی جائے گی۔'
        : 'If Net Zakatable Wealth meets or exceeds the selected Nisab threshold and Hawl duration is completed, 2.5% Zakat is applied.',
      tip: '2.5% applies to lunar year cycles (or 2.577% if calculated using Solar Gregorian calendar).'
    },
    {
      num: '05',
      title: lang === 'ur' ? 'نتائج حاصل کریں اور پی ڈی ایف ڈاؤن لوڈ کریں' : 'Step 5: Review & Download Statement',
      desc: lang === 'ur'
        ? 'اپنا تفصیلی نتیجہ دیکھیں۔ پرنٹ کریں، پی ڈی ایف کی صورت میں رپورٹ لیں یا لوکل ہسٹری میں محفوظ کریں۔'
        : 'View complete breakdown, export a formatted PDF statement, print, or save locally without creating an account.',
      tip: 'Your data stays completely on your personal device.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-emerald-950 font-serif">
          {t.nav.howItWorks}
        </h1>
        <p className="text-slate-600 text-lg">
          A step-by-step walkthrough of how ZakatMint evaluates your annual Zakat obligation.
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((s) => (
          <div
            key={s.num}
            className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 text-amber-400 font-extrabold text-xl flex items-center justify-center shrink-0 font-serif shadow-sm">
              {s.num}
            </div>

            <div className="space-y-2 flex-1">
              <h3 className="text-xl font-bold text-slate-900 font-serif">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-3 p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 font-medium inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{s.tip}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-6">
        <button
          onClick={() => onNavigate('calculator')}
          className="px-8 py-4 bg-gradient-to-r from-emerald-800 to-emerald-900 text-white font-extrabold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-3"
        >
          <Calculator className="w-5 h-5 text-amber-400" />
          <span>{t.nav.startCalculator}</span>
        </button>
      </div>

    </div>
  );
};
