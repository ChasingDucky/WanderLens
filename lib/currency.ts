// Currency conversion utilities

export const EXCHANGE_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  CNY: 7.24,
  AUD: 1.53,
  CAD: 1.36,
  CHF: 0.88,
};

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CNY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  CHF: 'CHF',
};

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number {
  const fromRate = EXCHANGE_RATES[fromCurrency] || 1;
  const toRate = EXCHANGE_RATES[toCurrency] || 1;

  // Convert to USD first, then to target currency
  const usdAmount = amount / fromRate;
  const convertedAmount = usdAmount * toRate;

  return Math.round(convertedAmount * 100) / 100;
}

export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  showSymbol: boolean = true
): string {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  const formattedAmount = amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return showSymbol ? `${symbol}${formattedAmount}` : formattedAmount;
}

export function getUserCurrency(): string {
  if (typeof window === 'undefined') return 'USD';

  const settings = localStorage.getItem('wanderlens_settings');
  if (settings) {
    const parsed = JSON.parse(settings);
    return parsed.currency || 'USD';
  }

  return 'USD';
}

export function convertPrice(price: number, fromCurrency: string = 'USD'): {
  amount: number;
  formatted: string;
  currency: string;
} {
  const userCurrency = getUserCurrency();
  const convertedAmount = convertCurrency(price, fromCurrency, userCurrency);

  return {
    amount: convertedAmount,
    formatted: formatCurrency(convertedAmount, userCurrency),
    currency: userCurrency,
  };
}
