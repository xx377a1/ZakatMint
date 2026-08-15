import { Currency, CurrencyCode } from '../types/zakat';

export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'PKR', symbol: 'Rs.', name: 'Pakistani Rupee (PKR)', rateToPkr: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar (USD)', rateToPkr: 278.5 },
  { code: 'GBP', symbol: '£', name: 'British Pound (GBP)', rateToPkr: 355.2 },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham (AED)', rateToPkr: 75.8 },
  { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal (SAR)', rateToPkr: 74.2 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee (INR)', rateToPkr: 3.32 },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar (CAD)', rateToPkr: 204.6 },
  { code: 'EUR', symbol: '€', name: 'Euro (EUR)', rateToPkr: 302.1 }
];

export function getCurrency(code: CurrencyCode): Currency {
  return SUPPORTED_CURRENCIES.find((c) => c.code === code) || SUPPORTED_CURRENCIES[0];
}

export function formatCurrency(amount: number, code: CurrencyCode = 'PKR'): string {
  if (isNaN(amount) || !isFinite(amount)) return `${getCurrency(code).symbol} 0`;
  
  const curr = getCurrency(code);
  const formattedNumber = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  }).format(amount);

  return `${curr.symbol} ${formattedNumber}`;
}
