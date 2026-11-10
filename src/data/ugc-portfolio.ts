// ===== UGC PORTFOLIO =====
// Clips shown on /ugc/. Each one is a public YouTube Short; the page shows the
// local poster and only loads the YouTube player when someone presses play.
//
// To add a clip:
//   1. Upload it as a YouTube Short (clean export, no TikTok watermark).
//   2. Save a 540x960 JPEG poster to public/assets/ugc/<slug>.jpg
//      e.g. ffmpeg -ss 2 -i reel.mp4 -frames:v 1 -vf scale=540:960 -q:v 5 public/assets/ugc/<slug>.jpg
//   3. Add a row below. Order here is the order on the page; lead with the strongest product work.

export type UgcCategory = 'Product' | 'Food' | 'Travel';

export interface UgcClip {
  slug: string;
  title: string;
  youtubeId: string;
  category: UgcCategory;
  /** The ad format a brand would recognize, e.g. "Unboxing" or "Talking head". */
  format: string;
  /** One sentence on what the clip shows a brand. */
  note: string;
  posterAlt: string;
}

export const UGC_CLIPS: UgcClip[] = [
  {
    slug: 'graniph-collab',
    title: 'Graniph × Chainsaw Man collab, day one',
    youtubeId: 'KlkSiAUjHCQ',
    category: 'Product',
    format: 'Shop-along and try-on',
    note: 'A walk through the store, close-ups of each piece, and a "which one would you get" close that asks viewers to weigh in.',
    posterAlt: 'Aydrian in a blue zip hoodie with the caption "I wasn\'t letting this one sell out."',
  },
  {
    slug: 'oddfresh-haul',
    title: 'Stray Kids ODD&FRESH pop-up haul',
    youtubeId: 'n3m99WWchv8',
    category: 'Product',
    format: 'Unboxing to camera',
    note: 'Opening everything on camera with kinetic captions, including the bit that went wrong: two blind charms, the same one twice.',
    posterAlt: 'The ODD&FRESH pop-up storefront with Stray Kids on the sign above the entrance.',
  },
  {
    slug: 'kusatsu-yakiimo',
    title: 'A hot sweet potato vending machine in Kusatsu Onsen',
    youtubeId: 'yc7oHYzb46Y',
    category: 'Food',
    format: 'Product discovery',
    note: 'A product most people have never seen, shown up close with captions doing the explaining.',
    posterAlt: 'A Japanese vending machine selling warm roasted sweet potatoes for 600 yen each.',
  },
  {
    slug: 'osaka-ramen',
    title: 'Me vs. a huge bowl of ramen in Osaka',
    youtubeId: 'rojoTvdETQg',
    category: 'Food',
    format: 'Restaurant review',
    note: 'A video-game health bar carries a full restaurant visit, and it ends on the receipt so the price is part of the story.',
    posterAlt: 'Aydrian at a ramen counter with a bowl topped with green onions and the caption "Before I even grab chopsticks."',
  },
  {
    slug: 'fukusaki-yokai',
    title: 'All 18 yokai in Fukusaki on a ¥500 e-bike',
    youtubeId: 'cheL8ZUDQUA',
    category: 'Travel',
    format: 'Destination challenge',
    note: 'A collect-them-all tracker turns a small-town day trip into a story with a built-in reason to keep watching.',
    posterAlt: 'Aydrian taking a selfie next to a blue Umibozu yokai statue holding a surfboard.',
  },
  {
    slug: 'travel-problems',
    title: 'A canceled flight, told in Mandarin',
    youtubeId: 'aK6VPJNXxa8',
    category: 'Travel',
    format: 'Walk-and-talk to camera',
    note: 'Talking straight to camera on the street at night, in Mandarin. The same format brands use for testimonial ads.',
    posterAlt: 'Aydrian on a city street at night under the caption "Travel advisor. Flight canceled."',
  },
];

// Brand testimonials. The section on /ugc/ stays hidden until this has at least one entry.
// Only add quotes a client has agreed to have published.
export interface UgcTestimonial {
  quote: string;
  name: string;
  brand: string;
}

export const UGC_TESTIMONIALS: UgcTestimonial[] = [];

// Shown in the hero and the location band. Update when the itinerary changes.
export const UGC_ON_LOCATION = {
  places: ['Korea', 'Japan', 'Taiwan', 'Thailand'],
  through: 'January 2027',
};
