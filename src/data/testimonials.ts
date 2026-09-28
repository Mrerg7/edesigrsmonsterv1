export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface RecentSale {
  domain: string;
  priceLabel: string;
  note: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'The listing was clear, escrow was seamless, and transfer completed in under a week. Exactly how premium domain sales should work.',
    name: 'Maya Chen',
    role: 'Founder, generative design studio',
  },
  {
    quote:
      'We evaluated three marketplaces. This acquisition process was the most professional — pricing transparency and fast seller response mattered.',
    name: 'Andre Vos',
    role: 'CEO, creative tech startup',
  },
  {
    quote:
      'Owning a category-defining domain changed how partners perceived us overnight. Worth every dollar of the strategic premium.',
    name: 'Priya Nair',
    role: 'Creative director, AI art platform',
  },
];

export const RECENT_SALES: RecentSale[] = [
  { domain: 'FormSignal.io', priceLabel: '$42,000', note: 'Closed via Escrow.com' },
  { domain: 'NeonType.ai', priceLabel: '$67,500', note: 'Private treaty' },
  { domain: 'CraftGrid.design', priceLabel: '$19,800', note: '7-day transfer' },
];
