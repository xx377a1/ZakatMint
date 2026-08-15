import React from 'react';
import { Language, PageView } from '../types/zakat';
import { translations } from '../translations/translations';
import {
  Calculator,
  ShieldCheck,
  Eye,
  Lock,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Coins,
  Scale
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: PageView) => void;
  lang: Language;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, lang }) => {
  const t = translations[lang];

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-emerald-950/5 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/10 text-emerald-900 text-xs font-bold mb-6 border border-emerald-900/15">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{lang === 'ur' ? 'آسان، شفاف اور نجی زکوٰۃ حساب' : 'Private & Transparent Zakat Calculation'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-emerald-950 tracking-tight font-serif max-w-4xl mx-auto leading-tight">
            {t.hero.title}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('calculator')}
              id="hero-start-btn"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 hover:to-emerald-950 text-white font-extrabold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 active:scale-98"
            >
              <Calculator className="w-5 h-5 text-amber-400" />
              <span>{t.hero.startBtn}</span>
            </button>

            <button
              onClick={() => onNavigate('how-it-works')}
              id="hero-how-btn"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-emerald-950 font-bold text-base rounded-2xl border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <span>{t.hero.howBtn}</span>
              <ArrowRight className="w-4 h-4 text-emerald-800" />
            </button>
          </div>

          <p className="mt-6 text-xs text-slate-500 max-w-lg mx-auto">
            {t.hero.disclaimer}
          </p>
        </div>
      </section>

      {/* Feature Cards (Simple, Transparent, Private) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif mb-2">
              {t.features.simpleTitle}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.features.simpleDesc}
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif mb-2">
              {t.features.transparentTitle}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.features.transparentDesc}
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-amber-400 flex items-center justify-center mb-6">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif mb-2">
              {t.features.privateTitle}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.features.privateDesc}
            </p>
          </div>

        </div>
      </section>

      {/* How It Works Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold font-serif text-white">
              {t.howItWorksSection.title}
            </h2>
            <p className="text-emerald-200/80 text-sm mt-2">
              {t.howItWorksSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
            <div className="bg-emerald-900/60 p-5 rounded-2xl border border-emerald-800">
              <span className="text-amber-400 font-bold text-xs uppercase block mb-1">
                {t.howItWorksSection.step1}
              </span>
              <p className="text-xs text-emerald-100 leading-relaxed">
                {t.howItWorksSection.step1Desc}
              </p>
            </div>

            <div className="bg-emerald-900/60 p-5 rounded-2xl border border-emerald-800">
              <span className="text-amber-400 font-bold text-xs uppercase block mb-1">
                {t.howItWorksSection.step2}
              </span>
              <p className="text-xs text-emerald-100 leading-relaxed">
                {t.howItWorksSection.step2Desc}
              </p>
            </div>

            <div className="bg-emerald-900/60 p-5 rounded-2xl border border-emerald-800">
              <span className="text-amber-400 font-bold text-xs uppercase block mb-1">
                {t.howItWorksSection.step3}
              </span>
              <p className="text-xs text-emerald-100 leading-relaxed">
                {t.howItWorksSection.step3Desc}
              </p>
            </div>

            <div className="bg-emerald-900/60 p-5 rounded-2xl border border-emerald-800">
              <span className="text-amber-400 font-bold text-xs uppercase block mb-1">
                {t.howItWorksSection.step4}
              </span>
              <p className="text-xs text-emerald-100 leading-relaxed">
                {t.howItWorksSection.step4Desc}
              </p>
            </div>

            <div className="bg-emerald-900/60 p-5 rounded-2xl border border-emerald-800">
              <span className="text-amber-400 font-bold text-xs uppercase block mb-1">
                {t.howItWorksSection.step5}
              </span>
              <p className="text-xs text-emerald-100 leading-relaxed">
                {t.howItWorksSection.step5Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Fundamentals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold font-serif text-slate-900">
            {t.eduSection.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-lg font-bold text-emerald-950 font-serif mb-2">
              {t.eduSection.zakatTitle}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.eduSection.zakatDesc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-lg font-bold text-emerald-950 font-serif mb-2">
              {t.eduSection.nisabTitle}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.eduSection.nisabDesc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-lg font-bold text-emerald-950 font-serif mb-2">
              {t.eduSection.hawlTitle}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.eduSection.hawlDesc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-lg font-bold text-emerald-950 font-serif mb-2">
              {t.eduSection.assetsTitle}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.eduSection.assetsDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Large CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-950 to-emerald-900 text-white rounded-3xl p-10 text-center shadow-xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
            {t.cta.title}
          </h2>
          <p className="text-emerald-200/90 text-base max-w-xl mx-auto">
            {t.cta.subtitle}
          </p>
          <div>
            <button
              onClick={() => onNavigate('calculator')}
              id="cta-start-btn"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-base rounded-2xl shadow-lg transition-all transform hover:scale-105"
            >
              {t.cta.button}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
