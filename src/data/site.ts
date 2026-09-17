/**
 * Single source of truth for site-wide configuration:
 * navigation, footer, social links and SEO defaults.
 * Header/Footer/SEO components read from here so the shell is
 * never duplicated across pages again.
 */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const site = {
  name: 'Goppo Guro',
  nameBn: 'গপ্পো গুঁড়ো',
  domain: 'https://goppoguro.com',
  tagline: 'Play, Paper, and Pause',
  description:
    'Goppo Guro is a space for Play, Paper, and Pause. Small stories and gentle beginnings that invite curiosity and connection through handcrafted paper experiences.',
  email: 'hello@goppoguro.com',
  locale: 'en',
  themeColor: '#ffffff',
  defaultOgImage: '/brand/og-default.jpg',
  social: {
    facebook: 'https://www.facebook.com/goppoguro',
  },
} as const;

export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Programme',
    href: '/programme/',
    children: [
      { label: 'All Programmes', href: '/programme/' },
      { label: 'Creative Learning Programme', href: '/gclp/' },
      { label: 'Women Makers Empowerment', href: '/women-empowerment/' },
      { label: 'Golpoka Club', href: '/golpoka-club/' },
      { label: 'Podcast', href: '/podcast/' },
    ],
  },
  {
    label: 'Project',
    href: '/projects/',
    children: [
      { label: 'Goppoguro Studio', href: '/creative-studio-network/' },
      { label: 'Golpoka Club', href: '/golpoka-club/' },
      { label: 'Little Joys', href: '/little-joys/' },
    ],
  },
  { label: 'Product', href: '/products/' },
  { label: 'Publications', href: '/publications/' },
  { label: 'About Us', href: '/about/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Contact', href: '/contact/' },
];

export const footer = {
  tagline: 'A Space for Play, Paper, and Pause',
  description:
    'Creating space for curiosity, connection, and shared discovery through handcrafted paper experiences.',
  navigate: [
    { label: 'Home', href: '/' },
    { label: 'Programme', href: '/programme/' },
    { label: 'Project', href: '/projects/' },
    { label: 'Product', href: '/products/' },
    { label: 'Publications', href: '/publications/' },
    { label: 'About Us', href: '/about/' },
    { label: 'Gallery', href: '/gallery/' },
    { label: 'Contact', href: '/contact/' },
  ] as NavItem[],
  programme: [
    { label: 'Creative Learning (GCLP)', href: '/gclp/' },
    { label: 'Women Makers', href: '/women-empowerment/' },
    { label: 'Golpoka Club', href: '/golpoka-club/' },
    { label: 'Podcast', href: '/podcast/' },
  ] as NavItem[],
  project: [
    { label: 'Goppoguro Studio', href: '/creative-studio-network/' },
    { label: 'Golpoka Club', href: '/golpoka-club/' },
    { label: 'Little Joys', href: '/little-joys/' },
  ] as NavItem[],
  sdgs: ['SDG 1', 'SDG 4', 'SDG 8', 'SDG 12'],
  legal: 'Handmade in Bangladesh · © 2026 Goppo Guro. All rights reserved.',
  promise: "Every purchase supports children's welfare.",
} as const;

/** Returns true when the given nav href is the active route. */
export function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href);
}
