export type DomainCategory = 'brandable' | 'business' | 'crypto' | 'geo' | 'ai';

export interface PortfolioDomain {
  slug: string;
  name: string;
  tld: string;
  price: number;
  category: DomainCategory;
  length: number;
  keywords: string[];
  status: 'featured' | 'available' | 'reserved';
  blurb: string;
  featured?: boolean;
}

export const PORTFOLIO: PortfolioDomain[] = [
  {
    slug: 'edesigrs-monster',
    name: 'eDesigrs',
    tld: '.monster',
    price: 125000,
    category: 'ai',
    length: 8,
    keywords: ['design', 'ai', 'creative', 'electronic'],
    status: 'featured',
    blurb: 'Category-defining .monster domain for electronic designers and AI creatives.',
    featured: true,
  },
  {
    slug: 'pixelforge-ai',
    name: 'PixelForge',
    tld: '.ai',
    price: 48000,
    category: 'ai',
    length: 10,
    keywords: ['pixel', 'forge', 'ai', 'art'],
    status: 'available',
    blurb: 'Brandable AI art studio name with strong visual recall.',
  },
  {
    slug: 'brandvault',
    name: 'BrandVault',
    tld: '.com',
    price: 62000,
    category: 'business',
    length: 10,
    keywords: ['brand', 'vault', 'agency'],
    status: 'available',
    blurb: 'Premium .com for brand strategy and IP management firms.',
  },
  {
    slug: 'cryptocanvas',
    name: 'CryptoCanvas',
    tld: '.io',
    price: 35000,
    category: 'crypto',
    length: 12,
    keywords: ['crypto', 'canvas', 'nft'],
    status: 'available',
    blurb: 'Web3 creative marketplace domain with NFT energy.',
  },
  {
    slug: 'phoenixstudio',
    name: 'PhoenixStudio',
    tld: '.design',
    price: 18000,
    category: 'geo',
    length: 13,
    keywords: ['phoenix', 'studio', 'design'],
    status: 'available',
    blurb: 'Geo-anchored creative studio identity for Arizona markets.',
  },
  {
    slug: 'neonform',
    name: 'NeonForm',
    tld: '.co',
    price: 22000,
    category: 'brandable',
    length: 8,
    keywords: ['neon', 'form', 'brand'],
    status: 'available',
    blurb: 'Short brandable for product design and motion studios.',
  },
  {
    slug: 'signalcraft',
    name: 'SignalCraft',
    tld: '.tech',
    price: 27500,
    category: 'business',
    length: 11,
    keywords: ['signal', 'craft', 'tech'],
    status: 'reserved',
    blurb: 'Technical brand for creative infrastructure companies.',
  },
  {
    slug: 'artloop',
    name: 'ArtLoop',
    tld: '.ai',
    price: 41000,
    category: 'ai',
    length: 7,
    keywords: ['art', 'loop', 'generative'],
    status: 'available',
    blurb: 'Compact generative-art platform name with loop metaphor.',
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

export function getDomainBySlug(slug: string): PortfolioDomain | undefined {
  return PORTFOLIO.find((d) => d.slug === slug);
}

export function similarDomains(slug: string, limit = 3): PortfolioDomain[] {
  const current = getDomainBySlug(slug);
  if (!current) return PORTFOLIO.filter((d) => d.slug !== slug).slice(0, limit);
  return PORTFOLIO.filter((d) => d.slug !== slug && d.category === current.category)
    .concat(PORTFOLIO.filter((d) => d.slug !== slug && d.category !== current.category))
    .slice(0, limit);
}
