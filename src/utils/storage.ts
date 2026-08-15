import { CalculationHistoryItem, ZakatFormData } from '../types/zakat';

const STORAGE_KEY_HISTORY = 'zakatcalc_history_v1';
const STORAGE_KEY_DRAFT = 'zakatcalc_draft_v1';

export function getInitialFormData(): ZakatFormData {
  return {
    currency: 'PKR',
    cashHome: 0,
    cashBankCurrent: 0,
    cashBankSavings: 0,
    cashBankOther: 0,
    loanReceivable: 0,
    moneyReceivable: 0,
    gold: {
      weight: 0,
      unit: 'grams',
      purity: '24K',
      customPurityPct: 100,
      manualPricePerGram: 0
    },
    silver: {
      weight: 0,
      unit: 'grams',
      manualPricePerGram: 0
    },
    shares: 0,
    investmentFunds: 0,
    crypto: 0,
    otherInvestments: 0,
    businessCash: 0,
    tradingInventory: 0,
    goodsForResale: 0,
    tradeReceivables: 0,
    otherBusinessAssets: 0,
    customAssets: [],
    shortTermDebts: 0,
    immediateBills: 0,
    otherLiabilities: 0,
    nisabBasis: 'gold',
    methodology: 'standard',
    hawlStatus: 'yes'
  };
}

export function loadSavedDraft(): ZakatFormData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DRAFT);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load draft:', err);
    return null;
  }
}

export function saveDraft(data: ZakatFormData) {
  try {
    localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save draft:', err);
  }
}

export function loadHistory(): CalculationHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load history:', err);
    return [];
  }
}

export function saveHistoryItem(item: CalculationHistoryItem): CalculationHistoryItem[] {
  const current = loadHistory();
  const updated = [item, ...current];
  try {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save history item:', err);
  }
  return updated;
}

export function deleteHistoryItem(id: string): CalculationHistoryItem[] {
  const current = loadHistory();
  const updated = current.filter((i) => i.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete history item:', err);
  }
  return updated;
}

export function renameHistoryItem(id: string, newTitle: string): CalculationHistoryItem[] {
  const current = loadHistory();
  const updated = current.map((i) => (i.id === id ? { ...i, title: newTitle } : i));
  try {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to rename history item:', err);
  }
  return updated;
}

export function clearAllHistory(): CalculationHistoryItem[] {
  try {
    localStorage.removeItem(STORAGE_KEY_HISTORY);
  } catch (err) {
    console.error('Failed to clear history:', err);
  }
  return [];
}
