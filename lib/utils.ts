// Utility functions for WanderLens

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function calculateDays(start: Date | string, end: Date | string): number {
  const startDate = typeof start === 'string' ? new Date(start) : start;
  const endDate = typeof end === 'string' ? new Date(end) : end;
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getAirportName(code: string): string {
  const airports: Record<string, string> = {
    SFO: 'San Francisco',
    LAX: 'Los Angeles',
    JFK: 'New York JFK',
    NRT: 'Tokyo Narita',
    CDG: 'Paris CDG',
    DXB: 'Dubai',
    LHR: 'London Heathrow',
    SIN: 'Singapore',
    HKG: 'Hong Kong',
    BKK: 'Bangkok',
  };
  return airports[code] || code;
}

export function getCabinClassLabel(cabinClass: string): string {
  const labels: Record<string, string> = {
    economy: 'Economy',
    'premium-economy': 'Premium Economy',
    business: 'Business',
    first: 'First Class',
  };
  return labels[cabinClass] || cabinClass;
}

export function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
