import React from 'react';
import { Language, PageView } from '../types/zakat';
import { translations } from '../translations/translations';
import { ShieldCheck, Lock, Award, Heart, BookOpen, Calculator } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: PageView) => void;
  lang: Language;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, lang }) => {
  const t = translations[lang];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-emerald-950 font-serif">
          About ZakatMint
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Empowering Muslims worldwide with precise, transparent, and 100% private Zakat calculation tools.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 font-serif">
          Our Core Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-950 text-base">
              <Lock className="w-5 h-5 text-emerald-800" />
              <span>Absolute Privacy First</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              We believe financial worship requires absolute discretion. ZakatMint executes all mathematical evaluations on-device in client memory. No account registration, servers, or external tracking exist.
            </p>
          </div>

          <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-950 text-base">
              <Award className="w-5 h-5 text-amber-700" />
              <span>Scholarly Transparency</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              We present formulas clearly and accommodate legitimate differences across Islamic schools of jurisprudence without claiming universal authority or issuing religious fatwas.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-emerald-950 text-white p-8 rounded-3xl shadow-xl text-center space-y-6">
        <h2 className="text-2xl font-bold font-serif text-white">
          Scholarly Disclaimer Notice
        </h2>
        <p className="text-emerald-200/90 text-sm max-w-2xl mx-auto leading-relaxed">
          ZakatMint serves as a mathematical estimation utility based on user inputs and chosen parameters. It does not replace personal consultation with a qualified Islamic scholar or local religious authority for complex estate, corporate, or disputed situations.
        </p>

        <button
          onClick={() => onNavigate('calculator')}
          className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-sm rounded-2xl shadow-md transition-all inline-flex items-center gap-2"
        >
          <Calculator className="w-4 h-4" />
          <span>{t.nav.startCalculator}</span>
        </button>
      </div>

    </div>
  );
};
