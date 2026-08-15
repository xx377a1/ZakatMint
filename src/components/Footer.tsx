import React from 'react';
import { ShieldCheck, Lock, Heart, FileText, ChevronRight } from 'lucide-react';
import { Language, PageView } from '../types/zakat';
import { translations } from '../translations/translations';

interface FooterProps {
  onNavigate: (view: PageView) => void;
  lang: Language;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang, onOpenPrivacy }) => {
  const t = translations[lang];

  return (
    <footer className="bg-emerald-950 text-emerald-100/90 pt-16 pb-12 border-t border-emerald-900 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Column 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-emerald-950 shadow-sm">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 21a9 9 0 1 1 9-9c0 1.48-.36 2.88-1 4.11a9 9 0 0 1-8 4.89z" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-serif">
                Zakat<span className="text-amber-400">Mint</span>
              </span>
            </div>

            <p className="text-emerald-200/80 text-sm max-w-md leading-relaxed">
              {t.footer.motto}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-emerald-300 pt-2">
              <span className="flex items-center gap-1.5 bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-800">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                100% On-Device Privacy
              </span>
              <span className="flex items-center gap-1.5 bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                No Account Required
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider text-amber-400">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-sm text-emerald-200/80">
              <li>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  {t.nav.calculator}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  {t.nav.howItWorks}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guide')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  {t.nav.guide}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  {t.nav.faq}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  {t.nav.about}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Privacy & Legal */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider text-amber-400">
              {t.footer.legal}
            </h3>
            <ul className="space-y-2 text-sm text-emerald-200/80">
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  {t.footer.privacy}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  {t.footer.terms}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Notice Banner */}
        <div className="mt-8 p-4 bg-emerald-900/40 border border-emerald-800/80 rounded-2xl text-xs text-emerald-200/80 leading-relaxed">
          <p className="font-semibold text-amber-400 mb-1">Scholarly Disclaimer</p>
          <p>{t.footer.disclaimerNotice}</p>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/60 gap-3 pt-4">
          <p>© {new Date().getFullYear()} ZakatMint. {t.footer.allRightsReserved}</p>
          <p className="flex items-center gap-1">
            Built with integrity & precision for the Ummah
          </p>
        </div>
      </div>
    </footer>
  );
};
