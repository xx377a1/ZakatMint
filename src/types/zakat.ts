export type CurrencyCode = 'PKR' | 'USD' | 'GBP' | 'AED' | 'SAR' | 'INR' | 'CAD' | 'EUR';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateToPkr: number; // Conversion rate to PKR for metal price defaults
}

export type WeightUnit = 'grams' | 'ounces' | 'tolas';

export type GoldPurity = '24K' | '22K' | '21K' | '18K' | 'custom';

export interface GoldAsset {
  weight: number;
  unit: WeightUnit;
  purity: GoldPurity;
  customPurityPct?: number; // e.g., 90 for 90%
  manualPricePerGram?: number;
}

export interface SilverAsset {
  weight: number;
  unit: WeightUnit;
  manualPricePerGram?: number;
}

export interface CustomAsset {
  id: string;
  name: string;
  amount: number;
  description?: string;
}

export interface ZakatFormData {
  currency: CurrencyCode;
  
  // Step 2: Cash & Money
  cashHome: number;
  cashBankCurrent: number;
  cashBankSavings: number;
  cashBankOther: number;
  loanReceivable: number;
  moneyReceivable: number;

  // Step 3: Gold & Silver
  gold: GoldAsset;
  silver: SilverAsset;

  // Step 4: Investments
  shares: number;
  investmentFunds: number;
  crypto: number;
  otherInvestments: number;

  // Step 5: Business Assets
  businessCash: number;
  tradingInventory: number;
  goodsForResale: number;
  tradeReceivables: number;
  otherBusinessAssets: number;

  // Step 6: Custom Assets
  customAssets: CustomAsset[];

  // Step 7: Liabilities
  shortTermDebts: number;
  immediateBills: number;
  otherLiabilities: number;

  // Step 8: Nisab & Methodology
  nisabBasis: 'gold' | 'silver';
  methodology: 'standard' | 'hanafi' | 'custom';
  hawlStatus: 'yes' | 'no' | 'not_sure';
}

export interface AssetBreakdown {
  cashSubtotal: number;
  goldSubtotal: number;
  silverSubtotal: number;
  investmentsSubtotal: number;
  businessSubtotal: number;
  customSubtotal: number;
  totalAssets: number;
  totalLiabilities: number;
  netZakatableWealth: number;
}

export interface MetalMarketData {
  goldPricePerGram: number; // in selected currency
  silverPricePerGram: number; // in selected currency
  currency: CurrencyCode;
  lastUpdated: string;
  source: string;
  isLive: boolean;
}

export interface ZakatResult {
  breakdown: AssetBreakdown;
  nisabBasis: 'gold' | 'silver';
  nisabWeightGrams: number;
  nisabThresholdValue: number;
  isAboveNisab: boolean;
  hawlMet: boolean;
  estimatedZakat: number;
  zakatRate: number; // 0.025
  calculatedAt: string;
}

export interface CalculationHistoryItem {
  id: string;
  title: string;
  savedAt: string;
  currency: CurrencyCode;
  formData: ZakatFormData;
  result: ZakatResult;
}

export type Language = 'en' | 'ur';

export type PageView = 'home' | 'calculator' | 'how-it-works' | 'guide' | 'faq' | 'about';
