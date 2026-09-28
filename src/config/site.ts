export const SITE = {
  name: 'eDesigrs.monster',
  brand: 'eDesigrs',
  tld: '.monster',
  title: 'eDesigrs.monster | Premium Domain for Sale | eDesigrs',
  description:
    'Buy eDesigrs.monster — premium .monster domain for sale at $125,000. Escrow-protected marketplace listing for electronic designers, generative artists, and AI creative studios. Make an offer or buy now.',
  url: 'https://edesigrs.monster',
  email: 'sales@desertrich.com',
  locale: 'en_US',
  location: 'Phoenix, AZ',
  price: 125000,
  priceDisplay: '$125,000',
  currency: 'USD',
  googleSiteVerification: 'zy9vP-Yd7va2ltlIS1wiP26T5J35LKvYzrWq_cWKeso',
  publishedDate: '2026-06-08',
  modifiedDate: '2026-09-28',
} as const;

export const CF_IMAGES = {
  accountHash: '-sPAUAWeA405NiWJ0SNIQA',
  heroImageId: 'fb7221d2-dd3f-4e87-8831-df2f1bc06b00',
} as const;

export function cfImageUrl(imageId: string, variant = 'public'): string {
  return `https://imagedelivery.net/${CF_IMAGES.accountHash}/${imageId}/${variant}`;
}

export const OG_IMAGE = cfImageUrl(CF_IMAGES.heroImageId);

export function acquisitionMailto(subjectExtra = ''): string {
  const subject = `eDesigrs.monster Domain Acquisition Inquiry${subjectExtra ? ` — ${subjectExtra}` : ''}`;
  const body =
    'Hello,\n\nI am interested in acquiring eDesigrs.monster.\n\nIntended use:\nBudget range:\nPreferred CTA: Buy Now / Make Offer / Contact Agent\n\nThank you.';
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const ACQUISITION_MAILTO = acquisitionMailto();
export const OFFER_MAILTO = acquisitionMailto('Make Offer');
export const AGENT_MAILTO = acquisitionMailto('Contact Agent');
