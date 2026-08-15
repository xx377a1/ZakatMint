import React, { useState, useEffect } from 'react';
import {
  CalculationHistoryItem,
  CurrencyCode,
  Language,
  MetalMarketData,
  PageView,
  ZakatFormData,
  ZakatResult
} from './types/zakat';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { Wizard } from './components/Calculator/Wizard';
import { HowItWorksView } from './components/HowItWorksView';
import { ZakatGuideView } from './components/ZakatGuideView';
import { FAQView } from './components/FAQView';
import { AboutView } from './components/AboutView';
import { HistoryDrawer } from './components/HistoryDrawer';
import { PrivacyModal } from './components/PrivacyModal';
import {
  fetchLiveMetalPrices,
  getReferenceMetalPrices
} from './constants/metalDefaults';
import {
  clearAllHistory,
  deleteHistoryItem,
  loadHistory,
  renameHistoryItem,
  saveHistoryItem
} from './utils/storage';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<PageView>('home');

  const [metalData, setMetalData] = useState<MetalMarketData>(() =>
    getReferenceMetalPrices('PKR')
  );

  const [history, setHistory] = useState<CalculationHistoryItem[]>(() => loadHistory());

  const [historyOpen, setHistoryOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // Sync RTL direction on html element when language changes
  useEffect(() => {
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Fetch live metal rates on initial load
  useEffect(() => {
    let isMounted = true;
    fetchLiveMetalPrices('PKR').then((res) => {
      if (isMounted && res) {
        setMetalData(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefreshMetalPrices = async (targetCurrency?: CurrencyCode) => {
    const currency = targetCurrency || metalData.currency;
    const updated = await fetchLiveMetalPrices(currency);
    setMetalData(updated);
  };

  const handleSaveToHistory = (formData: ZakatFormData, result: ZakatResult) => {
    const newItem: CalculationHistoryItem = {
      id: 'calc_' + Date.now(),
      title: `Zakat ${new Date().getFullYear()} (${result.nisabBasis.toUpperCase()})`,
      savedAt: new Date().toISOString(),
      currency: formData.currency,
      formData,
      result
    };
    const updated = saveHistoryItem(newItem);
    setHistory(updated);
  };

  const handleDeleteHistorySingle = (id: string) => {
    const updated = deleteHistoryItem(id);
    setHistory(updated);
  };

  const handleRenameHistorySingle = (id: string, newTitle: string) => {
    const updated = renameHistoryItem(id, newTitle);
    setHistory(updated);
  };

  const handleClearAllHistory = () => {
    const updated = clearAllHistory();
    setHistory(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-emerald-950/5 text-slate-800 selection:bg-emerald-800 selection:text-white font-sans">
      
      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={(v) => {
          setCurrentView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        onLanguageChange={setLang}
        historyCount={history.length}
        onOpenHistory={() => setHistoryOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={(v) => {
              setCurrentView(v);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            lang={lang}
          />
        )}

        {currentView === 'calculator' && (
          <Wizard
            metalData={metalData}
            onRefreshMetalPrices={handleRefreshMetalPrices}
            lang={lang}
            onSaveToHistory={handleSaveToHistory}
          />
        )}

        {currentView === 'how-it-works' && (
          <HowItWorksView
            onNavigate={(v) => {
              setCurrentView(v);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            lang={lang}
          />
        )}

        {currentView === 'guide' && (
          <ZakatGuideView
            onNavigate={(v) => {
              setCurrentView(v);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            lang={lang}
          />
        )}

        {currentView === 'faq' && (
          <FAQView
            onNavigate={(v) => {
              setCurrentView(v);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            lang={lang}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onNavigate={(v) => {
              setCurrentView(v);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            lang={lang}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(v) => {
          setCurrentView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        onOpenPrivacy={() => setPrivacyOpen(true)}
      />

      {/* Modals & Drawers */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onDeleteSingle={handleDeleteHistorySingle}
        onRenameSingle={handleRenameHistorySingle}
        onClearAll={handleClearAllHistory}
        lang={lang}
      />

      <PrivacyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />

    </div>
  );
}
