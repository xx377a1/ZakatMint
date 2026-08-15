import {
  GOLD_NISAB_GRAMS,
  GRAMS_PER_OUNCE,
  GRAMS_PER_TOLA,
  SILVER_NISAB_GRAMS
} from '../constants/metalDefaults';
import {
  AssetBreakdown,
  GoldAsset,
  SilverAsset,
  WeightUnit,
  ZakatFormData,
  ZakatResult
} from '../types/zakat';

export function getPurityFactor(purity: GoldAsset['purity'], customPct?: number): number {
  switch (purity) {
    case '24K':
      return 1.0;
    case '22K':
      return 22 / 24;
    case '21K':
      return 21 / 24;
    case '18K':
      return 18 / 24;
    case 'custom':
      return (customPct || 100) / 100;
    default:
      return 1.0;
  }
}

export function convertToGrams(weight: number, unit: WeightUnit): number {
  if (!weight || weight < 0 || isNaN(weight)) return 0;
  switch (unit) {
    case 'grams':
      return weight;
    case 'ounces':
      return weight * GRAMS_PER_OUNCE;
    case 'tolas':
      return weight * GRAMS_PER_TOLA;
    default:
      return weight;
  }
}

export function calculateGoldValue(gold: GoldAsset, pricePerGram24K: number): number {
  const weightInGrams = convertToGrams(gold.weight, gold.unit);
  if (weightInGrams <= 0) return 0;

  if (gold.manualPricePerGram && gold.manualPricePerGram > 0) {
    return weightInGrams * gold.manualPricePerGram;
  }

  const purityFactor = getPurityFactor(gold.purity, gold.customPurityPct);
  return weightInGrams * purityFactor * pricePerGram24K;
}

export function calculateSilverValue(silver: SilverAsset, pricePerGram: number): number {
  const weightInGrams = convertToGrams(silver.weight, silver.unit);
  if (weightInGrams <= 0) return 0;

  const actualPrice = silver.manualPricePerGram && silver.manualPricePerGram > 0
    ? silver.manualPricePerGram
    : pricePerGram;

  return weightInGrams * actualPrice;
}

export function calculateAssetBreakdown(
  data: ZakatFormData,
  goldPrice24K: number,
  silverPrice: number
): AssetBreakdown {
  const sanitize = (val: number) => (isNaN(val) || val < 0 ? 0 : val);

  const cashSubtotal =
    sanitize(data.cashHome) +
    sanitize(data.cashBankCurrent) +
    sanitize(data.cashBankSavings) +
    sanitize(data.cashBankOther) +
    sanitize(data.loanReceivable) +
    sanitize(data.moneyReceivable);

  const goldSubtotal = calculateGoldValue(data.gold, goldPrice24K);
  const silverSubtotal = calculateSilverValue(data.silver, silverPrice);

  const investmentsSubtotal =
    sanitize(data.shares) +
    sanitize(data.investmentFunds) +
    sanitize(data.crypto) +
    sanitize(data.otherInvestments);

  const businessSubtotal =
    sanitize(data.businessCash) +
    sanitize(data.tradingInventory) +
    sanitize(data.goodsForResale) +
    sanitize(data.tradeReceivables) +
    sanitize(data.otherBusinessAssets);

  const customSubtotal = (data.customAssets || []).reduce(
    (acc, curr) => acc + sanitize(curr.amount),
    0
  );

  const totalAssets =
    cashSubtotal +
    goldSubtotal +
    silverSubtotal +
    investmentsSubtotal +
    businessSubtotal +
    customSubtotal;

  const totalLiabilities =
    sanitize(data.shortTermDebts) +
    sanitize(data.immediateBills) +
    sanitize(data.otherLiabilities);

  const netZakatableWealth = Math.max(0, totalAssets - totalLiabilities);

  return {
    cashSubtotal,
    goldSubtotal,
    silverSubtotal,
    investmentsSubtotal,
    businessSubtotal,
    customSubtotal,
    totalAssets,
    totalLiabilities,
    netZakatableWealth
  };
}

export function calculateZakat(
  data: ZakatFormData,
  goldPrice24K: number,
  silverPrice: number
): ZakatResult {
  const breakdown = calculateAssetBreakdown(data, goldPrice24K, silverPrice);

  const nisabWeightGrams =
    data.nisabBasis === 'gold' ? GOLD_NISAB_GRAMS : SILVER_NISAB_GRAMS;
  
  const applicableMetalPrice =
    data.nisabBasis === 'gold' ? goldPrice24K : silverPrice;

  const nisabThresholdValue = nisabWeightGrams * applicableMetalPrice;

  const isAboveNisab = breakdown.netZakatableWealth >= nisabThresholdValue;
  const hawlMet = data.hawlStatus === 'yes';

  const zakatRate = 0.025; // 2.5%
  
  // Zakat is due if net zakatable wealth reaches or exceeds Nisab threshold
  const estimatedZakat = isAboveNisab ? breakdown.netZakatableWealth * zakatRate : 0;

  return {
    breakdown,
    nisabBasis: data.nisabBasis,
    nisabWeightGrams,
    nisabThresholdValue,
    isAboveNisab,
    hawlMet,
    estimatedZakat,
    zakatRate,
    calculatedAt: new Date().toISOString()
  };
}
