import React, { useState } from 'react';
import {
  Calculator,
  Globe,
  Menu,
  X,
  History,
  BookOpen,
  HelpCircle,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';
import { Language, PageView } from '../types/zakat';
import { translations } from '../translations/translations';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  historyCount: number;
  onOpenHistory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  lang,
  onLanguageChange,
  historyCount,
  onOpenHistory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const isRtl = lang === 'ur';

  const navLinks: { view: PageView; label: string; icon: React.ReactNode }[] = [
    { view: 'home', label: t.nav.home, icon: <Layers className="w-4 h-4" /> },
    { view: 'calculator', label: t.nav.calculator, icon: <Calculator className="w-4 h-4" /> },
    { view: 'how-it-works', label: t.nav.howItWorks, icon: <Sparkles className="w-4 h-4" /> },
    { view: 'guide', label: t.nav.guide, icon: <BookOpen className="w-4 h-4" /> },
    { view: 'faq', label: t.nav.faq, icon: <HelpCircle className="w-4 h-4" /> },
    { view: 'about', label: t.nav.about, icon: <Info className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 text-left focus:outline-hidden group"
            id="nav-logo-btn"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-105 transition-transform duration-200">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21a9 9 0 1 1 9-9c0 1.48-.36 2.88-1 4.11a9 9 0 0 1-8 4.89z" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-emerald-950 font-serif">
                Zakat<span className="text-amber-600">Mint</span>
              </span>
              <span className="block text-[11px] font-medium text-emerald-800/80 -mt-1 tracking-wider uppercase">
                {lang === 'ur' ? 'شفاف و نجی زکوٰۃ' : 'Precision & Privacy'}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => onNavigate(link.view)}
                  id={`nav-link-${link.view}`}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center gap-2 ${
                    active
                      ? 'bg-emerald-900/10 text-emerald-900'
                      : 'text-slate-600 hover:text-emerald-900 hover:bg-emerald-50'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Switcher */}
            <div className="flex items-center bg-emerald-900/5 p-1 rounded-xl border border-emerald-900/10">
              <button
                onClick={() => onLanguageChange('en')}
                id="lang-btn-en"
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === 'en'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('ur')}
                id="lang-btn-ur"
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === 'ur'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-900'
                }`}
              >
                اردو
              </button>
            </div>

            {/* History Button */}
            <button
              onClick={onOpenHistory}
              id="history-btn"
              title={t.nav.history}
              className="relative p-2.5 rounded-xl text-slate-700 hover:text-emerald-900 hover:bg-emerald-50 border border-slate-200 transition-colors"
            >
              <History className="w-5 h-5" />
              {historyCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {historyCount}
                </span>
              )}
            </button>

            {/* Start Calculator Primary Button */}
            <button
              onClick={() => onNavigate('calculator')}
              id="header-start-calc-btn"
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 hover:to-emerald-950 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>{t.nav.startCalculator}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            {/* Quick Language Toggle on Mobile */}
            <button
              onClick={() => onLanguageChange(lang === 'en' ? 'ur' : 'en')}
              className="p-2 text-xs font-bold text-emerald-900 bg-emerald-100/60 rounded-lg flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'en' ? 'اردو' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="p-2.5 text-slate-700 hover:text-emerald-900 hover:bg-emerald-50 rounded-xl"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-emerald-900/10 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => {
                  onNavigate(link.view);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-[15px] font-semibold px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                  currentView === link.view
                    ? 'bg-emerald-900 text-white'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onOpenHistory();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <History className="w-4 h-4 text-emerald-800" />
              <span>{t.nav.history} ({historyCount})</span>
            </button>
          </div>

          <button
            onClick={() => {
              onNavigate('calculator');
              setMobileMenuOpen(false);
            }}
            className="w-full py-3 bg-gradient-to-r from-emerald-800 to-emerald-900 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md"
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>{t.nav.startCalculator}</span>
          </button>
        </div>
      )}
    </header>
  );
};
