/** Aydrian's public profiles: the author box links and Person.sameAs. */
export const AUTHOR_PROFILES = [
  { label: 'YouTube', href: 'https://www.youtube.com/@itsaydrian' },
  { label: 'Instagram', href: 'https://instagram.com/itsaydrian' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@itsaydrian' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/aydrian' },
];

/** Person entity for BlogPosting.author. Shares its @id with the home page's Person. */
export const AUTHOR_SCHEMA = {
  '@type': 'Person',
  '@id': 'https://itsaydrian.com/#person',
  name: 'Aydrian Howard',
  url: 'https://itsaydrian.com/',
  image: 'https://itsaydrian.com/assets/aydrian-avatar-192.webp',
  jobTitle: 'Travel Advisor',
  sameAs: [
    ...AUTHOR_PROFILES.map((p) => p.href),
    'https://x.com/itsaydrian',
    'https://github.com/aydrian',
  ],
};
