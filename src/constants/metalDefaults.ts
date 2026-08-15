import { CurrencyCode, MetalMarketData } from '../types/zakat';
import { getCurrency } from './currencies';

// Weight conversion factors
export const GRAMS_PER_TOLA = 11.6638;
export const GRAMS_PER_OUNCE = 31.1035;

// Nisab thresholds in pure grams
export const GOLD_NISAB_GRAMS = 87.48; // 7.5 Tolas
export const SILVER_NISAB_GRAMS = 612.36; // 52.5 Tolas

// Default reference prices in PKR per gram (24K Gold & Pure Silver)
// Based on current reference market rates (~Rs. 23,500/g Gold 24K, ~Rs. 280/g Silver in PKR)
export const DEFAULT_METAL_PRICES_PKR = {
  goldPricePerGram: 23500,
  silverPricePerGram: 280,
};

export function getReferenceMetalPrices(currencyCode: CurrencyCode): MetalMarketData {
  const currency = getCurrency(currencyCode);
  const pkrRate = currency.rateToPkr;

  // Convert PKR reference per gram into target currency
  const goldPrice = Math.round((DEFAULT_METAL_PRICES_PKR.goldPricePerGram / pkrRate) * 100) / 100;
  const silverPrice = Math.round((DEFAULT_METAL_PRICES_PKR.silverPricePerGram / pkrRate) * 100) / 100;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return {
    goldPricePerGram: goldPrice,
    silverPricePerGram: silverPrice,
    currency: currencyCode,
    lastUpdated: dateStr,
    source: 'Reference Market Index (Editable)',
    isLive: false
  };
}

/**
 * Fetches real-time live gold/silver spot prices and exchange rates from live price APIs
 */
export async function fetchLiveMetalPrices(currencyCode: CurrencyCode): Promise<MetalMarketData> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    // Fetch live Gold spot, Silver spot, and Exchange rates in parallel
    const [goldRes, silverRes, ratesRes] = await Promise.all([
      fetch('https://api.gold-api.com/price/XAU', { signal: controller.signal }),
      fetch('https://api.gold-api.com/price/XAG', { signal: controller.signal }),
      fetch('https://open.er-api.com/v6/latest/USD', { signal: controller.signal })
    ]);
    clearTimeout(timeoutId);

    if (goldRes.ok && silverRes.ok) {
      const goldData = await goldRes.json();
      const silverData = await silverRes.json();

      let exchangeRate = 1;
      if (ratesRes.ok) {
        const ratesData = await ratesRes.json();
        exchangeRate = ratesData.rates?.[currencyCode] || 1;
      } else {
        // Fallback currency conversion factor if exchange rate API is unavailable
        const currency = getCurrency(currencyCode);
        exchangeRate = (1 / currency.rateToPkr) * 278.5;
      }

      // goldData.price and silverData.price are in USD per Troy Ounce (31.1034768 grams)
      const troyOzGrams = 31.1034768;
      const goldUsdPerGram = goldData.price / troyOzGrams;
      const silverUsdPerGram = silverData.price / troyOzGrams;

      const goldTargetPerGram = Math.round(goldUsdPerGram * exchangeRate * 100) / 100;
      const silverTargetPerGram = Math.round(silverUsdPerGram * exchangeRate * 100) / 100;

      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      return {
        goldPricePerGram: goldTargetPerGram,
        silverPricePerGram: silverTargetPerGram,
        currency: currencyCode,
        lastUpdated: dateStr,
        source: 'Live Spot Market API (XAU/XAG)',
        isLive: true
      };
    }
  } catch (err) {
    console.warn('Live metal spot price fetch unavailable, using fallback index:', err);
  }

  return getReferenceMetalPrices(currencyCode);
}
